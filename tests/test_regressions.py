import asyncio
import base64
import io
import json
import subprocess
import wave
from pathlib import Path
from types import SimpleNamespace

from fastapi.testclient import TestClient
from PIL import Image

import app as app_module
from config import config
from core.timeline import get_audio_duration
from services.video_service import video_service
from services.image_service import image_service
from services.compositor import compositor
from core.prompt_builder import build_image_prompt
from core.script_parser import parse_script
import core.visual_analyzer as visual_analyzer
import services.voice_service as voice_module
from services.voice_service import VoiceService


def _script():
    return {
        "title": "Regression test",
        "characters": [{"id": "person", "name": "Person"}],
        "scenes": [{"id": "scene_01", "setting": "A room", "dialogues": []}],
    }


def test_asset_upload_stays_in_project_and_persists(tmp_path, monkeypatch):
    monkeypatch.setattr(config, "OUTPUT_DIR", tmp_path)
    app_module.projects.clear()
    client = TestClient(app_module.app)
    response = client.post("/api/project/create", data={"script_json": json.dumps(_script())})
    assert response.status_code == 200
    project_id = response.json()["project_id"]

    rejected = client.post(
        f"/api/project/{project_id}/upload-asset",
        data={"character_id": "..\\..\\outside", "asset_type": "image"},
        files={"file": ("a.png", b"not an image", "image/png")},
    )
    assert rejected.status_code == 404

    image = Image.new("RGB", (8, 8))
    buffer = io.BytesIO()
    image.save(buffer, format="PNG")
    accepted = client.post(
        f"/api/project/{project_id}/upload-asset",
        data={"character_id": "person", "asset_type": "image"},
        files={"file": ("a.png", buffer.getvalue(), "image/png")},
    )
    assert accepted.status_code == 200
    saved = Path(accepted.json()["file_path"])
    assert saved.is_relative_to((tmp_path / project_id / "assets").resolve())
    app_module.projects.clear()
    app_module._load_projects()
    assert str(saved) in app_module.projects[project_id]["script"].characters[0].reference_images


def test_retry_one_flow_scene_only_updates_that_scene(tmp_path, monkeypatch):
    monkeypatch.setattr(config, "OUTPUT_DIR", tmp_path)
    app_module.projects.clear()
    client = TestClient(app_module.app)
    script = _script()
    script["scenes"].append({"id": "scene_02", "setting": "A garden", "dialogues": []})
    created = client.post("/api/project/create", data={"script_json": json.dumps(script)})
    project_id = created.json()["project_id"]
    generated = tmp_path / "flow_scene_01.jpg"
    generated.write_bytes(b"valid test placeholder")

    async def browser_ready():
        return None

    async def submit_prompt(scene_id, prompt, reference_images=None):
        assert scene_id == "scene_01"
        assert prompt
        assert reference_images == []
        return {
            "scene_id": scene_id,
            "status": "done",
            "file_path": str(generated),
            "media_type": "image",
        }

    monkeypatch.setattr(app_module, "_ensure_flow_browser", browser_ready)
    monkeypatch.setattr(app_module.flow_service, "submit_prompt", submit_prompt)
    response = client.post(f"/api/project/{project_id}/scene/scene_01/flow-generate")

    assert response.status_code == 200
    scenes = app_module.projects[project_id]["script"].scenes
    assert scenes[0].flow_image_path == str(generated)
    assert scenes[1].flow_image_path == ""
    persisted = json.loads((tmp_path / project_id / "script.json").read_text(encoding="utf-8"))
    assert persisted["scenes"][0]["flow_image_path"] == str(generated)


def test_audio_duration_without_ffprobe(tmp_path, monkeypatch):
    audio_path = tmp_path / "silence.wav"
    with wave.open(str(audio_path), "wb") as wav:
        wav.setnchannels(1)
        wav.setsampwidth(2)
        wav.setframerate(24000)
        wav.writeframes(b"\0" * 24000 * 2 * 2)
    monkeypatch.setattr(config, "FFPROBE_PATH", "missing-ffprobe")
    assert abs(get_audio_duration(str(audio_path)) - 2.0) < 0.05


def test_omnivoice_uses_current_api_contract(tmp_path, monkeypatch):
    captured = {}

    class FakeResponse:
        status_code = 200
        content = b"RIFF" + (b"\0" * 200)
        headers = {"content-type": "audio/wav"}
        text = ""

    class FakeClient:
        def __init__(self, **kwargs):
            captured["timeout"] = kwargs.get("timeout")

        async def __aenter__(self):
            return self

        async def __aexit__(self, *_):
            return None

        async def post(self, url, headers, json):
            captured["calls"] = captured.get("calls", 0) + 1
            captured.update(url=url, headers=headers, payload=json)
            return FakeResponse()

    monkeypatch.setattr(voice_module.httpx, "AsyncClient", FakeClient)
    service = VoiceService()
    service.output_dir = tmp_path
    service.omnivoice_url = "https://voice.example"
    service.omnivoice_api_key = "secret"
    service.omnivoice_num_step = 32
    service.omnivoice_speed = 0.95

    result = asyncio.run(service._synthesize_omnivoice("Xin chào", "narrator"))

    assert captured["url"] == "https://voice.example/synthesize"
    assert captured["headers"]["X-TTS-API-Key"] == "secret"
    assert captured["payload"] == {"text": "Xin chào", "num_step": 32, "speed": 0.95}
    assert captured["timeout"] == 180
    assert result["method"] == "omnivoice"
    assert Path(result["file_path"]).read_bytes() == FakeResponse.content


def test_gemini_tts_uses_exact_transcript_and_speech_metadata(tmp_path, monkeypatch):
    captured = {}
    wav_buffer = io.BytesIO()
    with wave.open(wav_buffer, "wb") as wav_file:
        wav_file.setnchannels(1)
        wav_file.setsampwidth(2)
        wav_file.setframerate(24000)
        wav_file.writeframes(b"\0" * 48000)

    class FakeResponse:
        status_code = 200
        text = ""

        @staticmethod
        def json():
            return {"output_audio": {"data": base64.b64encode(wav_buffer.getvalue()).decode()}}

    class FakeClient:
        def __init__(self, **kwargs):
            captured["timeout"] = kwargs.get("timeout")

        async def __aenter__(self):
            return self

        async def __aexit__(self, *_):
            return None

        async def post(self, url, headers, json):
            captured["calls"] = captured.get("calls", 0) + 1
            captured.update(url=url, headers=headers, payload=json)
            return FakeResponse()

    monkeypatch.setattr(voice_module.httpx, "AsyncClient", FakeClient)
    monkeypatch.setattr(config, "GOOGLE_API_KEY", "google-test-key")
    service = VoiceService()
    service.output_dir = tmp_path
    service.gemini_tts_model = "gemini-3.8-flash-tts"
    service.gemini_tts_voice = "Gacrux"
    service.gemini_tts_style = "warm Vietnamese narrator"

    result = asyncio.run(service._synthesize_gemini_tts("Xin chào Việt Nam", "calm", "narrator"))

    content = captured["payload"]["input"][0]["content"][0]
    assert content["text"] == "Xin chào Việt Nam"
    assert "calm" in content["annotations"][0]["style"]
    assert captured["payload"]["generation_config"]["speech_config"] == [{"voice": "Gacrux"}]
    assert captured["payload"]["response_format"] == {"type": "audio"}
    assert captured["url"].endswith("/v1beta/interactions")
    assert captured["headers"]["x-goog-api-key"] == "google-test-key"
    assert result["method"] == "gemini_tts"
    assert result["duration_estimate"] == 1.0
    cached = asyncio.run(service._synthesize_gemini_tts("Xin chào Việt Nam", "calm", "narrator"))
    assert cached["cached"] is True
    assert captured["calls"] == 1
    assert VoiceService._retry_after_seconds("Please retry in 37s") == 38.0


def test_character_identity_lock_is_reused_across_scene_prompts():
    script = parse_script({
        "title": "Identity test",
        "characters": [{
            "id": "hero",
            "name": "An",
            "description": "Vietnamese woman",
            "appearance_signature": "28-year-old Vietnamese woman, oval face, long black hair, brown eyes",
            "wardrobe": "navy jacket and silver wristwatch",
        }],
        "scenes": [
            {"id": "s1", "setting": "Cafe", "visible_character_ids": ["hero"]},
            {"id": "s2", "setting": "Street", "visible_character_ids": ["hero"], "continuity": ["same navy jacket"]},
        ],
    })
    first = build_image_prompt(script.scenes[0], script)
    second = build_image_prompt(script.scenes[1], script)
    identity = script.characters[0].appearance_signature
    assert identity in first and identity in second
    assert "navy jacket and silver wristwatch" in first
    assert "same navy jacket" in second


def test_visual_analysis_chunks_large_scripts(monkeypatch):
    script = parse_script({
        "title": "Long story",
        "characters": [{"id": "hero", "name": "An", "description": "Vietnamese woman"}],
        "scenes": [
            {"id": f"scene_{index:02d}", "setting": f"Location {index}", "dialogues": []}
            for index in range(1, 26)
        ],
    })
    calls = []

    async def fake_generate(client, contents, instruction, schema):
        calls.append(schema)
        if schema is visual_analyzer.GlobalVisualPlan:
            return visual_analyzer.GlobalVisualPlan(
                visual_bible=visual_analyzer.VisualBiblePlan(
                    style="cinematic realism", color_palette="amber and blue",
                    lighting_language="soft motivated light", camera_language="35mm film grammar",
                    texture="natural skin", global_negative_prompt="identity drift",
                ),
                characters=[visual_analyzer.CharacterPlan(
                    id="hero", appearance_signature="same oval face and long black hair",
                    wardrobe="navy jacket", identity_markers=["brown eyes"],
                    consistency_rules=["same face"],
                )],
            )
        return visual_analyzer.SceneBatchPlan(scenes=[
            visual_analyzer.ScenePlan(
                id=item["id"], visible_character_ids=[], shot_type="Medium shot, 50mm",
                composition="rule of thirds", lighting="soft window light",
                action_beats=[], continuity=["continue previous time"], negative_prompt="no discontinuity",
            )
            for item in contents["scenes"]
        ])

    monkeypatch.setattr(config, "GOOGLE_API_KEY", "test-key")
    monkeypatch.setattr(visual_analyzer, "_generate_structured", fake_generate)
    analyzed, fallback, warning = asyncio.run(visual_analyzer.analyze_visual_consistency(script))
    assert not fallback and not warning
    assert len(calls) == 4  # one global call plus 3 scene batches (10 + 10 + 5)
    assert analyzed.characters[0].wardrobe == "navy jacket"
    assert analyzed.scenes[-1].composition == "rule of thirds"


def test_video_is_not_cut_to_short_audio(tmp_path, monkeypatch):
    monkeypatch.setattr(compositor, "output_dir", tmp_path)
    clip = tmp_path / "short.mp4"
    subprocess.run([
        config.FFMPEG_PATH, "-f", "lavfi", "-i", "color=c=blue:s=160x90:r=24",
        "-t", "1", "-c:v", "libx264", "-y", str(clip),
    ], check=True, capture_output=True)
    audio = tmp_path / "short.wav"
    with wave.open(str(audio), "wb") as wav:
        wav.setnchannels(1)
        wav.setsampwidth(2)
        wav.setframerate(24000)
        wav.writeframes(b"\0" * 24000 * 2)
    fitted = compositor.fit_video_duration(str(clip), 2.5)
    assert fitted
    swapped = compositor.swap_audio(fitted, str(audio))
    assert swapped
    assert get_audio_duration(swapped) >= 2.45
    timeline = compositor.build_timeline_video([swapped, str(clip)])
    assert timeline
    assert get_audio_duration(timeline) >= 3.40


def test_google_media_sdk_calls_use_configured_models(tmp_path, monkeypatch):
    calls = {}

    async def generate_videos(**kwargs):
        calls["video"] = kwargs
        return SimpleNamespace(done=True, response=SimpleNamespace(
            generated_videos=[SimpleNamespace(video="generated-file")]))

    async def download(**kwargs):
        return b"video bytes"

    video_client = SimpleNamespace(aio=SimpleNamespace(
        models=SimpleNamespace(generate_videos=generate_videos),
        files=SimpleNamespace(download=download),
    ))
    monkeypatch.setattr(video_service, "_get_client", lambda: video_client)
    monkeypatch.setattr(video_service, "output_dir", tmp_path)
    result = asyncio.run(video_service.generate_scene_video("A room", "scene_01", duration_seconds=17))
    assert result["status"] == "success"
    assert calls["video"]["model"] == config.VEO_MODEL
    assert calls["video"]["config"].duration_seconds == 8

    async def generate_content(**kwargs):
        calls["image"] = kwargs
        part = SimpleNamespace(inline_data=SimpleNamespace(data=b"image bytes"))
        return SimpleNamespace(candidates=[SimpleNamespace(
            content=SimpleNamespace(parts=[part]))])

    image_client = SimpleNamespace(aio=SimpleNamespace(
        models=SimpleNamespace(generate_content=generate_content)))
    output = tmp_path / "image.jpg"
    model = asyncio.run(image_service._try_google_image_models(image_client, "A room", output))
    assert model == config.IMAGE_MODEL
    assert output.read_bytes() == b"image bytes"
    assert calls["image"]["config"].response_modalities == ["IMAGE"]
