"""
ToolCreateVideo — Main Application
FastAPI server + API endpoints + WebSocket progress
"""

import sys
if sys.platform == "win32":
    try:
        sys.stdout.reconfigure(encoding="utf-8", errors="replace")
        sys.stderr.reconfigure(encoding="utf-8", errors="replace")
    except Exception:
        pass

import asyncio
import json
import re
import os
import shutil
import subprocess
import urllib.request
import uuid
import webbrowser
from pathlib import Path
from typing import Optional
from PIL import Image

from fastapi import FastAPI, UploadFile, File, Form, WebSocket, WebSocketDisconnect, HTTPException
from fastapi.staticfiles import StaticFiles
from fastapi.responses import HTMLResponse, FileResponse, JSONResponse

from config import config
from core.script_parser import (
    parse_script,
    Script,
    refine_script_with_ai,
    format_script_to_complete_json,
    FULL_SCRIPT_TEMPLATE,
)
from core.prompt_builder import build_scene_prompt, build_image_prompt
from core.visual_analyzer import analyze_visual_consistency, ensure_visual_defaults
from core.timeline import build_scene_timeline, get_audio_duration, estimate_duration_from_text
from services.voice_service import voice_service
from services.video_service import video_service
from services.image_service import image_service
from services.compositor import compositor
from services.flow_service import flow_service

# ═══════════════════════════════════════════
#  App Setup
# ═══════════════════════════════════════════

app = FastAPI(title="ToolCreateVideo", version="1.0.0")

# Mount static files
app.mount("/static", StaticFiles(directory=str(config.BASE_DIR / "static")), name="static")

# In-memory project storage
projects: dict = {}
# Active WebSocket connections
ws_connections: dict[str, WebSocket] = {}


def _save_project_state(project_id: str) -> None:
    project = projects[project_id]
    project_dir = config.OUTPUT_DIR / project_id
    state_path = project_dir / "state.json"
    temporary = project_dir / "state.json.tmp"
    temporary.write_text(json.dumps({
        "status": project["status"],
        "scenes_status": project["scenes_status"],
        "output_path": project.get("output_path", ""),
    }, ensure_ascii=False), encoding="utf-8")
    temporary.replace(state_path)


def _load_projects() -> None:
    for script_path in config.OUTPUT_DIR.glob("*/script.json"):
        try:
            project_id = script_path.parent.name
            if not re.fullmatch(r"[0-9a-f]{12}", project_id):
                continue
            script = Script.model_validate_json(script_path.read_text(encoding="utf-8"))
            state_path = script_path.parent / "state.json"
            state = json.loads(state_path.read_text(encoding="utf-8")) if state_path.exists() else {}
            status = state.get("status", "created")
            if not state_path.exists():
                existing_videos = list(script_path.parent.glob("*.mp4"))
                if existing_videos:
                    latest = max(existing_videos, key=lambda path: path.stat().st_mtime)
                    state["output_path"] = str(latest)
                    status = "done"
            if status == "generating":
                status = "error"  # A task cannot survive a server restart.
            projects[project_id] = {
                "id": project_id,
                "script": script,
                "status": status,
                "scenes_status": state.get("scenes_status") or {s.id: "pending" for s in script.scenes},
                "output_path": state.get("output_path", ""),
            }
        except (OSError, ValueError, json.JSONDecodeError) as exc:
            print(f"[PROJECT LOAD] Skipping {script_path}: {exc}")


_load_projects()


def launch_flow_chrome() -> dict:
    """Start the controllable Flow Chrome only when requested by the UI."""
    if not config.FLOW_ENABLED:
        raise RuntimeError("FLOW_ENABLED=false")
    try:
        with urllib.request.urlopen(f"{config.FLOW_CDP_URL}/json/version", timeout=1) as response:
            if response.status == 200:
                return {"status": "connected", "message": "Đang dùng Chrome Flow đã mở"}
    except Exception:
        pass
    chrome_candidates = [
        shutil.which("chrome.exe"),
        os.getenv("PROGRAMFILES", "") + r"\Google\Chrome\Application\chrome.exe",
        os.getenv("LOCALAPPDATA", "") + r"\Google\Chrome\Application\chrome.exe",
    ]
    chrome = next((path for path in chrome_candidates if path and Path(path).exists()), None)
    if not chrome:
        raise RuntimeError("Không tìm thấy Google Chrome")
    flow_profile = config.BASE_DIR / "storage" / "flow_chrome"
    flow_profile.mkdir(parents=True, exist_ok=True)
    subprocess.Popen([
        chrome,
        "--remote-debugging-port=9222",
        "--remote-allow-origins=*",
        f"--user-data-dir={flow_profile}",
        config.FLOW_URL,
    ], stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL)
    return {"status": "started", "message": "Đã mở Chrome Flow"}


# ═══════════════════════════════════════════
#  WebSocket for real-time progress
# ═══════════════════════════════════════════

@app.websocket("/ws/{project_id}")
async def websocket_endpoint(websocket: WebSocket, project_id: str):
    await websocket.accept()
    ws_connections[project_id] = websocket
    try:
        while True:
            await websocket.receive_text()
    except WebSocketDisconnect:
        ws_connections.pop(project_id, None)


async def send_progress(project_id: str, scene_id: str, status: str,
                        progress: int, message: str):
    """Gửi progress update qua WebSocket"""
    ws = ws_connections.get(project_id)
    if ws:
        try:
            await ws.send_json({
                "scene_id": scene_id,
                "status": status,
                "progress": progress,
                "message": message,
            })
        except Exception:
            pass


# ═══════════════════════════════════════════
#  Pages
# ═══════════════════════════════════════════

@app.get("/", response_class=HTMLResponse)
async def home():
    """Trang chủ"""
    html_path = config.BASE_DIR / "templates" / "index.html"
    return HTMLResponse(content=html_path.read_text(encoding="utf-8"))


# ═══════════════════════════════════════════
#  API Endpoints
# ═══════════════════════════════════════════

@app.get("/api/status")
async def api_status():
    """Kiểm tra trạng thái hệ thống"""
    provider = config.VOICE_PROVIDER
    voice_method = "edge_tts"
    if provider == "gemini" and config.has_google_api():
        voice_method = "gemini_tts"
    elif provider in {"gemini", "omnivoice"} and config.has_omnivoice_api():
        voice_method = "omnivoice"

    return {
        "status": "ok",
        "google_api": config.has_google_api(),
        "imagen_api": config.has_google_api(),
        "image_model": config.IMAGE_MODEL,
        "video_model": config.VEO_MODEL,
        "gemini_model": getattr(config, "GEMINI_MODEL", "gemini-3.8-flash"),
        "omnivoice_api": config.has_omnivoice_api(),
        "omnivoice_url": config.OMNIVOICE_URL,
        "omnivoice_num_step": config.OMNIVOICE_NUM_STEP,
        "omnivoice_speed": config.OMNIVOICE_SPEED,
        "voice_provider": config.VOICE_PROVIDER,
        "gemini_tts_model": config.GEMINI_TTS_MODEL,
        "gemini_tts_voice": config.GEMINI_TTS_VOICE,
        "gemini_tts_style": config.GEMINI_TTS_STYLE,
        "wavespeed_api": config.has_wavespeed_api(),
        "voice_method": voice_method,
        "ffmpeg_path": config.FFMPEG_PATH,
        "ffmpeg_ready": bool(shutil.which(config.FFMPEG_PATH) or Path(config.FFMPEG_PATH).is_file()),
    }


@app.get("/api/google/test")
async def test_google_connection():
    """Verify the configured key and model names without generating media."""
    if not config.has_google_api():
        raise HTTPException(status_code=400, detail="Google API key is not configured")
    from google import genai
    client = genai.Client(api_key=config.GOOGLE_API_KEY)
    try:
        image = await client.aio.models.get(model=config.IMAGE_MODEL)
        video = await client.aio.models.get(model=config.VEO_MODEL)
        return {"status": "ok", "image_model": image.name, "video_model": video.name}
    except Exception as exc:
        raise HTTPException(status_code=502, detail=f"Google API connection failed: {exc}")
    finally:
        await client.aio.aclose()


@app.post("/api/flow/browser/start")
async def start_flow_browser():
    try:
        return launch_flow_chrome()
    except RuntimeError as exc:
        raise HTTPException(status_code=503, detail=str(exc))


@app.post("/api/config/save")
async def save_config(
    google_api_key: str = Form(""),
    gemini_model: str = Form(""),
    wavespeed_api_key: str = Form(""),
    omnivoice_url: str = Form(""),
    omnivoice_api_key: str = Form(""),
    omnivoice_num_step: int = Form(32),
    omnivoice_speed: float = Form(1.0),
    voice_provider: str = Form("gemini"),
    gemini_tts_model: str = Form("gemini-3.8-flash-tts"),
    gemini_tts_voice: str = Form("Gacrux"),
    gemini_tts_style: str = Form("mature Vietnamese narrator, warm, clear, natural pacing"),
):
    """Lưu API keys và cấu hình OmniVoice / Google"""
    for value in (
        google_api_key, gemini_model, wavespeed_api_key, omnivoice_url, omnivoice_api_key,
        voice_provider, gemini_tts_model, gemini_tts_voice, gemini_tts_style,
    ):
        if len(value) > 2048 or "\n" in value or "\r" in value:
            raise HTTPException(status_code=400, detail="Invalid configuration value")
    if omnivoice_url and not omnivoice_url.startswith(("https://", "http://")):
        raise HTTPException(status_code=400, detail="OmniVoice URL must start with http:// or https://")
    if not 4 <= omnivoice_num_step <= 64:
        raise HTTPException(status_code=400, detail="OmniVoice num_step must be between 4 and 64")
    if not 0.5 <= omnivoice_speed <= 2.0:
        raise HTTPException(status_code=400, detail="OmniVoice speed must be between 0.5 and 2.0")
    voice_provider = voice_provider.strip().lower()
    if voice_provider not in {"gemini", "omnivoice", "edge_tts"}:
        raise HTTPException(status_code=400, detail="Invalid voice provider")
    if not re.fullmatch(r"[A-Za-z0-9._-]{1,128}", gemini_tts_model.strip()):
        raise HTTPException(status_code=400, detail="Invalid Gemini TTS model")
    if not re.fullmatch(r"[A-Za-z0-9_-]{1,128}", gemini_tts_voice.strip()):
        raise HTTPException(status_code=400, detail="Invalid Gemini TTS voice")
    try:
        base_dir = getattr(config, "BASE_DIR", Path(__file__).parent)
        env_path = base_dir / ".env"
        lines = []

        if env_path.exists():
            lines = env_path.read_text(encoding="utf-8").splitlines()

        # Update or add keys
        env_dict = {}
        for line in lines:
            if "=" in line and not line.startswith("#"):
                key, val = line.split("=", 1)
                env_dict[key.strip()] = val.strip()

        if google_api_key:
            clean_gkey = google_api_key.strip()
            env_dict["GOOGLE_API_KEY"] = clean_gkey
            config.GOOGLE_API_KEY = clean_gkey
        if gemini_model:
            clean_model = gemini_model.strip()
            env_dict["GEMINI_MODEL"] = clean_model
            config.GEMINI_MODEL = clean_model
        if wavespeed_api_key:
            clean_wkey = wavespeed_api_key.strip()
            env_dict["WAVESPEED_API_KEY"] = clean_wkey
            config.WAVESPEED_API_KEY = clean_wkey
        if omnivoice_url is not None:
            clean_url = omnivoice_url.strip().rstrip("/")
            env_dict["OMNIVOICE_URL"] = clean_url
            config.OMNIVOICE_URL = clean_url
            voice_service.omnivoice_url = clean_url
        if omnivoice_api_key:
            clean_okey = omnivoice_api_key.strip()
            env_dict["OMNIVOICE_API_KEY"] = clean_okey
            config.OMNIVOICE_API_KEY = clean_okey
            voice_service.omnivoice_api_key = clean_okey
        env_dict["OMNIVOICE_NUM_STEP"] = str(omnivoice_num_step)
        config.OMNIVOICE_NUM_STEP = omnivoice_num_step
        voice_service.omnivoice_num_step = omnivoice_num_step
        env_dict["OMNIVOICE_SPEED"] = str(omnivoice_speed)
        config.OMNIVOICE_SPEED = omnivoice_speed
        voice_service.omnivoice_speed = omnivoice_speed
        env_dict["VOICE_PROVIDER"] = voice_provider
        config.VOICE_PROVIDER = voice_provider
        voice_service.voice_provider = voice_provider
        env_dict["GEMINI_TTS_MODEL"] = gemini_tts_model.strip()
        config.GEMINI_TTS_MODEL = gemini_tts_model.strip()
        voice_service.gemini_tts_model = gemini_tts_model.strip()
        env_dict["GEMINI_TTS_VOICE"] = gemini_tts_voice.strip()
        config.GEMINI_TTS_VOICE = gemini_tts_voice.strip()
        voice_service.gemini_tts_voice = gemini_tts_voice.strip()
        env_dict["GEMINI_TTS_STYLE"] = gemini_tts_style.strip()
        config.GEMINI_TTS_STYLE = gemini_tts_style.strip()
        voice_service.gemini_tts_style = gemini_tts_style.strip()

        with open(env_path, "w", encoding="utf-8") as f:
            for k, v in env_dict.items():
                f.write(f"{k}={v}\n")

        return {"status": "ok", "message": "Cấu hình API keys đã được lưu thành công!"}
    except Exception as e:
        print(f"[SAVE CONFIG ERROR] {e}")
        return JSONResponse(status_code=500, content={"status": "error", "message": f"Lỗi lưu file cấu hình: {str(e)}"})


@app.post("/api/script/upload")
async def upload_script_file(file: UploadFile = File(...)):
    """Upload file kịch bản (.json, .txt, .docx, .md)"""
    try:
        content_bytes = await file.read(5 * 1024 * 1024 + 1)
        if len(content_bytes) > 5 * 1024 * 1024:
            raise HTTPException(status_code=413, detail="Script file is too large (max 5 MB)")
        raw_text = None

        # Hỗ trợ file Word (.docx)
        if file.filename and file.filename.lower().endswith(".docx"):
            import io
            try:
                import docx
            except ImportError:
                raise HTTPException(status_code=400, detail="Thư viện python-docx chưa được cài. Chạy: pip install python-docx")
            doc = docx.Document(io.BytesIO(content_bytes))
            raw_text = "\n".join([p.text for p in doc.paragraphs if p.text.strip()])
        else:
            # File text thông thường hoặc json
            for enc in ["utf-8", "utf-8-sig", "utf-16", "cp1252", "latin1"]:
                try:
                    raw_text = content_bytes.decode(enc)
                    break
                except UnicodeDecodeError:
                    continue

        if raw_text is None:
            raise HTTPException(status_code=400, detail="Không thể đọc nội dung file. Vui lòng lưu file ở định dạng UTF-8 hoặc Word .docx.")

        # Lưu bản sao file tải lên để lưu trữ
        save_dir = config.TEMP_DIR / "uploaded_scripts"
        save_dir.mkdir(parents=True, exist_ok=True)
        safe_fname = re.sub(r'[^\w\.-]', '_', file.filename or "script.txt")
        (save_dir / safe_fname).write_text(raw_text, encoding="utf-8")

        script = parse_script(raw_text)
        script_dict = script.model_dump()

        # Tạo danh sách tóm tắt từng đoạn đã tách
        scenes_preview = []
        for i, s in enumerate(script.scenes):
            first_dialogue = s.dialogues[0].text if s.dialogues else ""
            narration_text = s.narration.text if s.narration else ""
            summary = first_dialogue or narration_text or s.setting
            scenes_preview.append({
                "id": s.id,
                "scene_type": getattr(s, "scene_type", "filler"),
                "title": f"Cảnh {i + 1}",
                "setting": s.setting,
                "dialogues_count": len(s.dialogues),
                "has_narration": bool(s.narration),
                "sample_text": (summary[:80] + "...") if len(summary) > 80 else summary
            })

        return {
            "status": "ok",
            "title": script.title,
            "scenes": len(script.scenes),
            "characters": len(script.characters),
            "script_json": json.dumps(script_dict, ensure_ascii=False, indent=2),
            "script": script_dict,
            "filename": file.filename,
            "scenes_preview": scenes_preview,
        }
    except ValueError as e:
        raise HTTPException(status_code=400, detail=str(e))
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Lỗi khi xử lý file: {str(e)}")


@app.post("/api/script/ai-refine")
async def ai_refine_script(script_text: str = Form(...)):
    """Dùng Gemini AI để chuẩn hóa kịch bản thô sang JSON điện ảnh (có fallback thông minh)"""
    try:
        data = await refine_script_with_ai(script_text)
        is_fallback = data.pop("_used_fallback", False)
        fallback_notice = data.pop("_fallback_notice", "")
        script = Script(**data)
        script, visual_fallback, visual_warning = await analyze_visual_consistency(script)
        script_dict = script.model_dump()
        return {
            "status": "ok",
            "title": script.title,
            "scenes": len(script.scenes),
            "characters": len(script.characters),
            "script_json": json.dumps(script_dict, ensure_ascii=False, indent=2),
            "script": script_dict,
            "is_fallback": is_fallback,
            "warning": " ".join(filter(None, [fallback_notice, visual_warning])),
            "visual_fallback": visual_fallback,
        }
    except ValueError as e:
        raise HTTPException(status_code=400, detail=str(e))
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Lỗi AI chuẩn hóa kịch bản: {str(e)}")


@app.post("/api/script/format")
async def format_script(script_text: str = Form("")):
    """Format kịch bản thành JSON chuẩn và tách từng đoạn/cảnh đầy đủ các trường"""
    try:
        data = format_script_to_complete_json(script_text)
        formatted_json = json.dumps(data, ensure_ascii=False, indent=2)

        # Danh sách tóm tắt từng đoạn/cảnh đã tách
        scenes_preview = []
        for i, s in enumerate(data.get("scenes", [])):
            dialogues = s.get("dialogues", [])
            first_dialogue = dialogues[0].get("text", "") if dialogues else ""
            narration_text = s.get("narration", {}).get("text", "") if s.get("narration") else ""
            summary = first_dialogue or narration_text or s.get("setting", "")
            scenes_preview.append({
                "id": s.get("id", f"scene_{i+1:02d}"),
                "scene_type": s.get("scene_type", "filler"),
                "title": f"Cảnh {i + 1}",
                "setting": s.get("setting", ""),
                "dialogues_count": len(dialogues),
                "has_narration": bool(s.get("narration")),
                "sample_text": (summary[:80] + "...") if len(summary) > 80 else summary
            })

        return {
            "status": "ok",
            "script_json": formatted_json,
            "data": data,
            "title": data.get("title", ""),
            "characters": len(data.get("characters", [])),
            "scenes": len(data.get("scenes", [])),
            "scenes_preview": scenes_preview,
        }
    except Exception as e:
        raise HTTPException(status_code=400, detail=f"Lỗi format JSON: {str(e)}")


@app.get("/api/script/template")
async def get_full_template():
    """Lấy mẫu kịch bản JSON chuẩn và đầy đủ nhất"""
    return FULL_SCRIPT_TEMPLATE


@app.post("/api/script/validate")
async def validate_script(script_json: str = Form(...)):
    """Validate kịch bản JSON hoặc text"""
    try:
        script = parse_script(script_json)
        script_dict = script.model_dump()
        return {
            "valid": True,
            "title": script.title,
            "characters": len(script.characters),
            "scenes": len(script.scenes),
            "total_dialogues": sum(len(s.dialogues) for s in script.scenes),
            "character_names": [c.name for c in script.characters],
            "script": script_dict,
            "script_json": json.dumps(script_dict, ensure_ascii=False, indent=2),
        }
    except ValueError as e:
        return {"valid": False, "error": str(e)}


@app.get("/api/script/sample")
async def get_sample_script():
    """Lấy kịch bản mẫu"""
    sample_path = Path("examples/sample_script.json")
    if sample_path.exists():
        return json.loads(sample_path.read_text(encoding="utf-8"))
    return {"error": "Sample script not found"}


@app.post("/api/project/create")
async def create_project(script_json: str = Form(...)):
    """Tạo project mới từ kịch bản"""
    try:
        script = ensure_visual_defaults(parse_script(script_json))
    except ValueError as e:
        raise HTTPException(status_code=400, detail=str(e))

    project_id = uuid.uuid4().hex[:12]

    # Save project
    project_dir = config.OUTPUT_DIR / project_id
    project_dir.mkdir(parents=True, exist_ok=True)

    # Save script
    script_dict = script.model_dump()
    with open(project_dir / "script.json", "w", encoding="utf-8") as f:
        f.write(json.dumps(script_dict, ensure_ascii=False, indent=2))

    projects[project_id] = {
        "id": project_id,
        "script": script,
        "status": "created",
        "scenes_status": {s.id: "pending" for s in script.scenes},
        "output_path": "",
    }
    _save_project_state(project_id)

    return {
        "project_id": project_id,
        "title": script.title,
        "scenes": len(script.scenes),
        "characters": len(script.characters),
        "script": script_dict,
    }


@app.post("/api/project/{project_id}/visual-analyze")
async def analyze_project_visuals(project_id: str):
    """Create the Visual Bible, Character Bible and per-scene continuity plan."""
    if project_id not in projects:
        raise HTTPException(status_code=404, detail="Project không tồn tại")
    script: Script = projects[project_id]["script"]
    script, used_fallback, warning = await analyze_visual_consistency(script)
    projects[project_id]["script"] = script
    (config.OUTPUT_DIR / project_id / "script.json").write_text(
        script.model_dump_json(indent=2), encoding="utf-8")
    return {
        "status": "ok",
        "script": script.model_dump(),
        "used_fallback": used_fallback,
        "warning": warning,
    }


@app.get("/api/project/{project_id}/scene/{scene_id}/prompt")
async def get_scene_prompt(project_id: str, scene_id: str):
    if project_id not in projects:
        raise HTTPException(status_code=404, detail="Project không tồn tại")
    script: Script = projects[project_id]["script"]
    scene = next((item for item in script.scenes if item.id == scene_id), None)
    if not scene:
        raise HTTPException(status_code=404, detail="Không tìm thấy cảnh")
    prompt = build_scene_prompt(scene, script) if scene.scene_type == "key" else build_image_prompt(scene, script)
    return {"scene_id": scene_id, "prompt": prompt, "is_override": bool(scene.prompt_override.strip())}


@app.post("/api/project/{project_id}/scene/{scene_id}/prompt")
async def save_scene_prompt(project_id: str, scene_id: str, prompt: str = Form(...)):
    if project_id not in projects:
        raise HTTPException(status_code=404, detail="Project không tồn tại")
    if len(prompt) > 20000:
        raise HTTPException(status_code=400, detail="Prompt quá dài")
    script: Script = projects[project_id]["script"]
    scene = next((item for item in script.scenes if item.id == scene_id), None)
    if not scene:
        raise HTTPException(status_code=404, detail="Không tìm thấy cảnh")
    scene.prompt_override = prompt.strip()
    (config.OUTPUT_DIR / project_id / "script.json").write_text(
        script.model_dump_json(indent=2), encoding="utf-8")
    return {"status": "ok", "scene_id": scene_id, "is_override": bool(scene.prompt_override)}


@app.post("/api/project/{project_id}/upload-asset")
async def upload_asset(
    project_id: str,
    character_id: str = Form(...),
    asset_type: str = Form(...),  # "image" or "voice"
    file: UploadFile = File(...),
):
    """Upload ảnh reference hoặc voice sample cho nhân vật"""
    if project_id not in projects:
        raise HTTPException(status_code=404, detail="Project không tồn tại")

    script: Script = projects[project_id]["script"]
    char = script.get_character(character_id)
    if char is None or char.id != character_id:
        raise HTTPException(status_code=404, detail="Character not found")
    if asset_type not in {"image", "voice"}:
        raise HTTPException(status_code=400, detail="Invalid asset type")
    allowed = {"image": {".jpg", ".jpeg", ".png", ".webp"},
               "voice": {".mp3", ".wav", ".m4a"}}
    ext = Path(file.filename or "").suffix.lower()
    if ext not in allowed[asset_type]:
        raise HTTPException(status_code=400, detail="Invalid file extension")
    max_bytes = 20 * 1024 * 1024 if asset_type == "image" else 30 * 1024 * 1024
    content = await file.read(max_bytes + 1)
    if not content or len(content) > max_bytes:
        raise HTTPException(status_code=413, detail="File is empty or too large")
    if asset_type == "image":
        import io
        if len(char.reference_images) >= 4:
            raise HTTPException(status_code=400, detail="Mỗi nhân vật được dùng tối đa 4 ảnh reference")
        try:
            with Image.open(io.BytesIO(content)) as img:
                img.verify()
        except Exception:
            raise HTTPException(status_code=400, detail="Invalid image file")

    project_dir = config.OUTPUT_DIR / project_id / "assets"
    project_dir.mkdir(parents=True, exist_ok=True)

    # Save file
    suffix = f"_{uuid.uuid4().hex[:8]}" if asset_type == "image" else ""
    file_path = (project_dir / f"{char.id}_{asset_type}{suffix}{ext}").resolve()
    if not file_path.is_relative_to(project_dir.resolve()):
        raise HTTPException(status_code=400, detail="Invalid asset path")

    with open(file_path, "wb") as f:
        f.write(content)

    # Update character in project
    if asset_type == "image":
        if str(file_path) not in char.reference_images:
            char.reference_images.append(str(file_path))
    else:
        char.voice_ref = str(file_path)
    (config.OUTPUT_DIR / project_id / "script.json").write_text(
        script.model_dump_json(indent=2), encoding="utf-8")

    return {"status": "ok", "file_path": str(file_path), "asset_type": asset_type}


@app.post("/api/project/{project_id}/flow-generate")
async def generate_in_flow(project_id: str):
    """Open up to FLOW_CONCURRENCY Flow tabs and submit scene prompts."""
    if project_id not in projects:
        raise HTTPException(status_code=404, detail="Project not found")
    await _ensure_flow_browser()
    script = projects[project_id]["script"]
    prompts = []
    for scene in script.scenes:
        if scene.flow_video_path or scene.flow_image_path:
            continue
        prompt = build_scene_prompt(scene, script) if scene.scene_type == "key" else build_image_prompt(scene, script)
        prompts.append({
            "scene_id": scene.id,
            "prompt": prompt,
            "reference_images": _scene_reference_images(scene, script),
        })
    if not prompts:
        return {"status": "ok", "results": [], "message": "Không còn cảnh chưa gửi vào Flow"}
    results = await flow_service.submit_many(prompts)
    for result in results:
        _attach_flow_result(script, result)
    (config.OUTPUT_DIR / project_id / "script.json").write_text(
        script.model_dump_json(indent=2), encoding="utf-8")
    return {"status": "ok", "results": results, "concurrency": config.FLOW_CONCURRENCY}


async def _ensure_flow_browser() -> None:
    """Start the controlled Chrome instance and wait for its CDP endpoint."""
    try:
        await asyncio.to_thread(launch_flow_chrome)
        connected = False
        for _ in range(60):
            try:
                await asyncio.to_thread(
                    lambda: urllib.request.urlopen(
                        f"{config.FLOW_CDP_URL}/json/version", timeout=1
                    ).close()
                )
                connected = True
                break
            except Exception:
                await asyncio.sleep(0.5)
        if not connected:
            raise RuntimeError(
                "Chrome Flow đã được yêu cầu mở nhưng cổng 9222 chưa sẵn sàng. "
                "Hãy đóng cửa sổ Chrome Flow do ứng dụng mở rồi thử lại."
            )
    except RuntimeError as exc:
        raise HTTPException(status_code=503, detail=str(exc))


def _attach_flow_result(script: Script, result: dict) -> bool:
    """Attach one downloaded Flow result to its scene."""
    if result.get("status") != "done" or not result.get("file_path"):
        return False
    scene = next((item for item in script.scenes if item.id == result.get("scene_id")), None)
    if not scene:
        return False
    if result.get("media_type") == "video":
        scene.flow_video_path, scene.flow_image_path = result["file_path"], ""
    else:
        scene.flow_image_path, scene.flow_video_path = result["file_path"], ""
    return True


def _scene_reference_images(scene, script: Script) -> list[str]:
    """Return de-duplicated reference images for visible speaking characters."""
    paths = []
    character_ids = list(scene.visible_character_ids) or [dialogue.character for dialogue in scene.dialogues]
    for character_id in character_ids:
        character = script.get_character(character_id)
        if not character:
            continue
        for value in character.reference_images:
            path = str(Path(value).resolve())
            if Path(path).is_file() and path not in paths:
                paths.append(path)
    return paths[:4]


@app.post("/api/project/{project_id}/scene/{scene_id}/flow-generate")
async def regenerate_scene_in_flow(project_id: str, scene_id: str):
    """Regenerate and download media from Flow for one scene only."""
    if project_id not in projects:
        raise HTTPException(status_code=404, detail="Project không tồn tại")
    script: Script = projects[project_id]["script"]
    scene = next((item for item in script.scenes if item.id == scene_id), None)
    if not scene:
        raise HTTPException(status_code=404, detail="Không tìm thấy cảnh")

    await _ensure_flow_browser()
    prompt = build_scene_prompt(scene, script) if scene.scene_type == "key" else build_image_prompt(scene, script)
    try:
        result = await flow_service.submit_prompt(
            scene.id,
            prompt,
            reference_images=_scene_reference_images(scene, script),
        )
    except Exception as exc:
        raise HTTPException(status_code=502, detail=str(exc))

    if not _attach_flow_result(script, result):
        detail = result.get("error") or "Flow đã nhận prompt nhưng tool chưa tải được kết quả"
        raise HTTPException(status_code=502, detail=detail)
    (config.OUTPUT_DIR / project_id / "script.json").write_text(
        script.model_dump_json(indent=2), encoding="utf-8")
    return result


@app.post("/api/project/{project_id}/scene/{scene_id}/toggle-type")
async def toggle_scene_type(project_id: str, scene_id: str):
    """Chuyển đổi loại cảnh giữa KEY (Veo 3.1) và FILLER (Gemini tạo ảnh)"""
    if project_id not in projects:
        raise HTTPException(status_code=404, detail="Project không tồn tại")
    script: Script = projects[project_id]["script"]
    target_scene = None
    for sc in script.scenes:
        if sc.id == scene_id:
            target_scene = sc
            break
    if not target_scene:
        raise HTTPException(status_code=404, detail="Không tìm thấy cảnh")

    current_type = getattr(target_scene, "scene_type", "filler")
    new_type = "filler" if current_type == "key" else "key"
    target_scene.scene_type = new_type

    # Lưu lại vào disk
    project_dir = config.OUTPUT_DIR / project_id
    with open(project_dir / "script.json", "w", encoding="utf-8") as f:
        f.write(json.dumps(script.model_dump(), ensure_ascii=False, indent=2))

    return {"status": "ok", "scene_id": scene_id, "scene_type": new_type}


@app.post("/api/project/{project_id}/generate")
async def generate_video(project_id: str):
    """Bắt đầu tạo video cho project"""
    if project_id not in projects:
        raise HTTPException(status_code=404, detail="Project không tồn tại")

    project = projects[project_id]
    if project["status"] == "generating":
        raise HTTPException(status_code=400, detail="Project đang được tạo")

    project["status"] = "generating"
    project["output_path"] = ""
    project["scenes_status"] = {s.id: "pending" for s in project["script"].scenes}
    _save_project_state(project_id)

    # Run generation in background
    asyncio.create_task(_generate_project_video(project_id))

    return {"status": "generating", "message": "Đang bắt đầu tạo video..."}


async def _generate_project_video(project_id: str):
    """Background task: tạo video cho toàn bộ project"""
    project = projects[project_id]
    script: Script = project["script"]

    try:
        all_scene_videos = []
        all_subtitles = []
        cumulative_time = 0.0

        for scene_idx, scene in enumerate(script.scenes):
            scene_id = scene.id
            subtitle_start_index = len(all_subtitles)
            project["scenes_status"][scene_id] = "processing"
            _save_project_state(project_id)

            await send_progress(project_id, scene_id, "voice", 0,
                                f"Cảnh {scene_idx + 1}/{len(script.scenes)}: Đang tạo giọng nói...")

            # ── STEP 1: Tạo audio cho scene ──
            scene_audio_files = []

            if scene.has_dialogue:
                for d_idx, dialogue in enumerate(scene.dialogues):
                    char = script.get_character(dialogue.character)
                    gender = char.voice_gender if char else "female"
                    voice_ref = char.voice_ref if char else ""
                    use_clone = bool(voice_ref and config.has_wavespeed_api())

                    audio_result = await voice_service.synthesize(
                        text=dialogue.text,
                        character_id=dialogue.character,
                        gender=gender,
                        emotion=dialogue.emotion,
                        voice_ref_path=voice_ref,
                        use_clone=use_clone,
                    )

                    actual_duration = await asyncio.to_thread(get_audio_duration, audio_result["file_path"])
                    if actual_duration <= 0:
                        actual_duration = audio_result["duration_estimate"]

                    scene_audio_files.append({
                        "id": f"{scene_id}_d{d_idx}",
                        "file_path": audio_result["file_path"],
                        "character_id": dialogue.character,
                        "text": dialogue.text,
                        "duration": actual_duration,
                    })

                    all_subtitles.append({
                        "text": dialogue.text,
                        "character_name": char.name if char else "",
                        "start_time": 0,  # Will be calculated
                        "end_time": 0,
                    })

                    progress = int((d_idx + 1) / len(scene.dialogues) * 40)
                    await send_progress(project_id, scene_id, "voice", progress,
                                        f"Giọng nói {d_idx + 1}/{len(scene.dialogues)} xong")

            if scene.has_narration:
                char = script.get_character(scene.narration.voice) if scene.narration.voice else None
                gender = char.voice_gender if char else "female"
                voice_ref = char.voice_ref if char else ""

                audio_result = await voice_service.synthesize(
                    text=scene.narration.text,
                    character_id=scene.narration.voice or "narrator",
                    gender=gender,
                    emotion=scene.narration.emotion,
                    voice_ref_path=voice_ref,
                    use_clone=bool(voice_ref and config.has_wavespeed_api()),
                )

                actual_duration = await asyncio.to_thread(get_audio_duration, audio_result["file_path"])
                if actual_duration <= 0:
                    actual_duration = audio_result["duration_estimate"]

                scene_audio_files.append({
                    "id": f"{scene_id}_narr",
                    "file_path": audio_result["file_path"],
                    "character_id": scene.narration.voice or "narrator",
                    "text": scene.narration.text,
                    "duration": actual_duration,
                })

                all_subtitles.append({
                    "text": scene.narration.text,
                    "character_name": char.name if char else "Narrator",
                    "start_time": 0,
                    "end_time": 0,
                })

            # ── STEP 2: Build timeline ──
            timeline = await asyncio.to_thread(build_scene_timeline, scene_id, scene_audio_files)

            # Update subtitle times
            sub_offset = len(all_subtitles) - len(scene_audio_files)
            for i, seg in enumerate(timeline.segments):
                if sub_offset + i < len(all_subtitles):
                    all_subtitles[sub_offset + i]["start_time"] = cumulative_time + seg.start_time
                    all_subtitles[sub_offset + i]["end_time"] = cumulative_time + seg.end_time

            # ── STEP 3: Merge scene audio ──
            scene_audio_path = ""
            if scene_audio_files:
                merge_data = [
                    {"file_path": seg.file_path, "start_time": seg.start_time}
                    for seg in timeline.segments
                ]
                scene_audio_path = await asyncio.to_thread(compositor.merge_audio_files, merge_data)
                if not scene_audio_path:
                    raise RuntimeError(f"Audio merge failed for {scene_id}")

            await send_progress(project_id, scene_id, "video", 40,
                                "Đang tạo video bằng Veo 3.1...")

            # ── STEP 4: Tạo video (Veo 3.1 cho KEY, Gemini + Ken Burns cho FILLER) ──
            scene_type = getattr(scene, "scene_type", "filler")
            target_duration = max(timeline.total_duration, 3.0) if timeline.total_duration > 0 else 5.0

            raw_video_path = ""
            img_result = {}

            # Prefer media returned from Google Flow when the scene already has one.
            if scene.flow_video_path and Path(scene.flow_video_path).exists():
                raw_video_path = scene.flow_video_path
            elif scene.flow_image_path and Path(scene.flow_image_path).exists():
                raw_video_path = await asyncio.to_thread(
                    image_service.create_ken_burns_video,
                    image_path=scene.flow_image_path,
                    duration=target_duration,
                    scene_id=scene_id,
                    effect="auto",
                )

            if not raw_video_path and scene_type == "key":
                await send_progress(project_id, scene_id, "video", 40,
                                    f"Cảnh KEY {scene_idx + 1}: Đang tạo video Veo 3.1...")
                prompt = build_scene_prompt(scene, script, target_duration)

                # Collect reference images
                ref_images = []
                for char_id in set(d.character for d in scene.dialogues):
                    char = script.get_character(char_id)
                    if char and char.reference_images:
                        ref_images.extend(char.reference_images[:2])

                async def progress_cb(sid, status, prog, msg):
                    adjusted = 40 + int(prog * 0.5)  # 40-90%
                    await send_progress(project_id, sid, status, adjusted, f"[KEY Veo] {msg}")

                try:
                    video_result = await video_service.generate_scene_video(
                        prompt=prompt,
                        scene_id=scene_id,
                        duration_seconds=target_duration,
                        reference_image_paths=ref_images,
                        progress_callback=progress_cb,
                    )
                    if video_result.get("status") != "error" and video_result.get("file_path"):
                        raw_video_path = video_result["file_path"]
                    else:
                        print(f"[WARN] Veo failed for {scene_id}: {video_result.get('error')}, falling back to Gemini image + Ken Burns")
                except Exception as ve:
                    print(f"[WARN] Veo exception for {scene_id}: {ve}, falling back to Gemini image + Ken Burns")

            # Nếu là FILLER hoặc Veo lỗi/hết quota -> dùng Gemini image + Ken Burns
            if not raw_video_path:
                is_fallback = (scene_type == "key")
                badge_name = "FILLER (Gemini tạo ảnh)" if not is_fallback else "KEY (Dự phòng Gemini)"
                await send_progress(project_id, scene_id, "video", 45,
                                    f"Cảnh {scene_idx + 1} [{badge_name}]: Đang tạo ảnh AI...")

                async def img_progress_cb(sid, step, p, msg):
                    await send_progress(project_id, sid, "video", 45 + int(p * 0.25),
                                        f"Cảnh {scene_idx + 1} [{badge_name}]: {msg}")

                img_prompt = build_image_prompt(scene, script)
                img_result = await image_service.generate_scene_image(
                    prompt=img_prompt,
                    scene_id=scene_id,
                    progress_callback=img_progress_cb,
                )

                if img_result.get("status") == "ok" and img_result.get("file_path"):
                    method_name = img_result.get("method", "ai")
                    await send_progress(project_id, scene_id, "video", 75,
                                        f"Cảnh {scene_idx + 1} [{badge_name}]: Ảnh ({method_name}) sẵn sàng, đang tạo chuyển động Ken Burns ({target_duration:.1f}s)...")
                    kb_path = await asyncio.to_thread(image_service.create_ken_burns_video,
                        image_path=img_result["file_path"],
                        duration=target_duration,
                        scene_id=scene_id,
                        effect="auto",
                    )
                    raw_video_path = kb_path

            if not raw_video_path:
                del all_subtitles[subtitle_start_index:]
                await send_progress(project_id, scene_id, "error", 0,
                                    img_result.get("error", f"Không thể tạo hình ảnh hoặc video cho cảnh {scene_idx + 1}"))
                project["scenes_status"][scene_id] = "error"
                _save_project_state(project_id)
                continue

            # ── STEP 5: Swap audio ──
            await send_progress(project_id, scene_id, "compositing", 90,
                                "Đang ghép âm thanh và video...")

            fitted_path = await asyncio.to_thread(compositor.fit_video_duration, raw_video_path, target_duration)
            if not fitted_path:
                raise RuntimeError(f"Video duration adjustment failed for {scene_id}")
            final_scene_path = fitted_path
            if scene_audio_path:
                swapped = await asyncio.to_thread(compositor.swap_audio, fitted_path, scene_audio_path)
                if not swapped:
                    raise RuntimeError(f"Audio swap failed for {scene_id}")
                final_scene_path = swapped

            all_scene_videos.append(final_scene_path)
            cumulative_time += target_duration

            project["scenes_status"][scene_id] = "done"
            _save_project_state(project_id)
            await send_progress(project_id, scene_id, "done", 100,
                                f"Cảnh {scene_idx + 1} ({scene_type.upper()}) hoàn thành!")

        # ── STEP 6: Stitch all scenes ──
        if all_scene_videos:
            await send_progress(project_id, "final", "compositing", 50,
                                f"Đang ghép {len(all_scene_videos)} cảnh thành video hoàn chỉnh...")

            stitched = await asyncio.to_thread(compositor.build_timeline_video, all_scene_videos)

            # Generate subtitles
            if all_subtitles and stitched:
                srt_path = str(config.TEMP_DIR / f"{project_id}_subs.srt")
                await asyncio.to_thread(compositor.generate_srt, all_subtitles, srt_path)
                stitched = await asyncio.to_thread(compositor.add_subtitles, stitched, srt_path)

            # Export final
            if stitched:
                final_path = await asyncio.to_thread(compositor.export_final, stitched, project_id, script.title)
                if not final_path:
                    raise RuntimeError("Final video export failed")
                project["output_path"] = final_path
                project["status"] = "partial" if any(
                    status == "error" for status in project["scenes_status"].values()) else "done"
                _save_project_state(project_id)

                await send_progress(project_id, "final", project["status"], 100,
                                    "Video hoàn thành! 🎬")
            else:
                project["status"] = "error"
                _save_project_state(project_id)
                await send_progress(project_id, "final", "error", 0,
                                    "Lỗi khi ghép video cuối cùng")
        else:
            project["status"] = "error"
            _save_project_state(project_id)
            await send_progress(project_id, "final", "error", 0,
                                "Không có scene nào được tạo thành công")

    except Exception as e:
        project["status"] = "error"
        _save_project_state(project_id)
        await send_progress(project_id, "final", "error", 0, f"Lỗi: {str(e)}")
        print(f"[ERROR] Generate failed: {e}")
        import traceback
        traceback.print_exc()


@app.get("/api/project/{project_id}/status")
async def get_project_status(project_id: str):
    """Lấy trạng thái project"""
    if project_id not in projects:
        raise HTTPException(status_code=404, detail="Project không tồn tại")

    project = projects[project_id]
    return {
        "status": project["status"],
        "scenes_status": project["scenes_status"],
        "output_path": project.get("output_path", ""),
    }


@app.get("/api/project/{project_id}/download")
async def download_video(project_id: str):
    """Tải video hoàn chỉnh"""
    if project_id not in projects:
        raise HTTPException(status_code=404, detail="Project không tồn tại")

    project = projects[project_id]
    output_path = project.get("output_path", "")

    if not output_path or not Path(output_path).exists():
        raise HTTPException(status_code=404, detail="Video chưa được tạo")

    return FileResponse(
        path=output_path,
        media_type="video/mp4",
        filename=f"{project['script'].title}.mp4",
    )


@app.get("/api/voice/health")
async def omnivoice_health():
    """Kiểm tra server OmniVoice và voice clone đã sẵn sàng."""
    result = await voice_service.check_omnivoice_health()
    if result.get("status") in {"ready", "ok"}:
        return result
    status_code = 400 if result.get("status") == "not_configured" else 503
    return JSONResponse(status_code=status_code, content=result)


@app.post("/api/voice/test")
async def test_voice(
    text: str = Form("Xin chào, đây là giọng nói thử nghiệm."),
    gender: str = Form("female"),
    emotion: str = Form("neutral"),
):
    """Test giọng nói"""
    try:
        result = await voice_service.synthesize(
            text=text,
            character_id="test",
            gender=gender,
            emotion=emotion,
        )
    except Exception as exc:
        raise HTTPException(status_code=502, detail=str(exc)) from exc

    if Path(result["file_path"]).exists():
        media_type = "audio/wav" if Path(result["file_path"]).suffix.lower() == ".wav" else "audio/mpeg"
        headers = {"X-Voice-Method": result.get("method", "unknown")}
        if result.get("warning"):
            headers["X-Voice-Fallback"] = "true"
        return FileResponse(
            path=result["file_path"],
            media_type=media_type,
            filename=Path(result["file_path"]).name,
            headers=headers,
        )
    raise HTTPException(status_code=500, detail="Không thể tạo giọng nói")


# ═══════════════════════════════════════════
#  Start Server
# ═══════════════════════════════════════════

if __name__ == "__main__":
    import uvicorn

    print("\n" + "=" * 50)
    print("  ToolCreateVideo v1.0")
    print("  http://localhost:8000")
    print("=" * 50 + "\n")

    # Auto open local app browser
    webbrowser.open("http://localhost:8000")

    uvicorn.run(app, host=config.HOST, port=config.PORT, log_level="info")
