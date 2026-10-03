import asyncio
import base64
import io
import json
import subprocess
import wave
from pathlib import Path
from types import SimpleNamespace

import pytest
from fastapi.testclient import TestClient
from PIL import Image

import app as app_module
from config import config
from core.timeline import get_audio_duration
from services.video_service import video_service
from services.image_service import image_service
from services.compositor import compositor
from core.prompt_builder import build_image_prompt
from core.prompt_builder import build_scene_prompt
from core.script_parser import parse_script
import core.visual_analyzer as visual_analyzer
import services.voice_service as voice_module
from services.voice_service import VoiceService
from services.muse_service import MuseService
from services.content_verifier import _sample_frames
import services.content_verifier as content_verifier
import services.muse_service as muse_module


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


def test_retry_one_muse_scene_attaches_generic_video(tmp_path, monkeypatch):
    monkeypatch.setattr(config, "OUTPUT_DIR", tmp_path)
    app_module.projects.clear()
    client = TestClient(app_module.app)
    created = client.post("/api/project/create", data={"script_json": json.dumps(_script())})
    project_id = created.json()["project_id"]
    generated = tmp_path / "muse_scene_01.mp4"
    generated.write_bytes(b"valid video placeholder" * 100)

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
            "media_type": "video",
            "provider": "muse",
            "content_check": "match",
        }

    monkeypatch.setattr(app_module, "_ensure_muse_browser", browser_ready)
    monkeypatch.setattr(app_module.muse_service, "submit_prompt", submit_prompt)
    response = client.post(f"/api/project/{project_id}/scene/scene_01/muse-video-generate")

    assert response.status_code == 200
    scene = app_module.projects[project_id]["script"].scenes[0]
    assert scene.generated_media_path == str(generated)
    assert scene.generated_media_type == "video"
    assert scene.generated_media_provider == "muse"
    assert scene.flow_video_path == ""
    persisted = json.loads((tmp_path / project_id / "script.json").read_text(encoding="utf-8"))
    assert persisted["scenes"][0]["generated_media_provider"] == "muse"


def test_muse_batch_persists_each_success_and_each_error(tmp_path, monkeypatch):
    monkeypatch.setattr(config, "OUTPUT_DIR", tmp_path)
    app_module.projects.clear()
    client = TestClient(app_module.app)
    script = _script()
    script["scenes"].append({"id": "scene_02", "setting": "A garden", "dialogues": []})
    project_id = client.post(
        "/api/project/create", data={"script_json": json.dumps(script)}
    ).json()["project_id"]
    generated = tmp_path / "scene_01.mp4"
    generated.write_bytes(b"video" * 300)

    async def browser_ready():
        return None

    async def submit_many(prompts, on_result=None, on_progress=None):
        assert {item["scene_id"] for item in prompts} == {"scene_01", "scene_02"}
        done = {
            "scene_id": "scene_01", "status": "done", "file_path": str(generated),
            "media_type": "video", "provider": "muse", "content_check": "match",
        }
        failed = {
            "scene_id": "scene_02", "status": "error", "provider": "muse",
            "error": "Muse generation failed",
        }
        await on_progress({
            "scene_id": "scene_01", "status": "processing", "progress": 20,
            "message": "waiting",
        })
        await on_result(done)
        persisted_midway = json.loads(
            (tmp_path / project_id / "script.json").read_text(encoding="utf-8")
        )
        assert persisted_midway["scenes"][0]["generated_media_provider"] == "muse"
        await on_result(failed)
        return [done, failed]

    monkeypatch.setattr(app_module, "_ensure_muse_browser", browser_ready)
    monkeypatch.setattr(app_module.muse_service, "submit_many", submit_many)
    response = client.post(f"/api/project/{project_id}/muse-video-generate")

    assert response.status_code == 200
    assert response.json()["completed"] == 1
    assert response.json()["failed"] == 1
    persisted = json.loads((tmp_path / project_id / "script.json").read_text(encoding="utf-8"))
    assert persisted["scenes"][0]["generated_media_path"] == str(generated)
    assert persisted["scenes"][1]["media_generation_status"] == "error"
    assert persisted["scenes"][1]["media_generation_error"] == "Muse generation failed"
    preview = client.get(f"/api/project/{project_id}/scene/scene_01/media")
    assert preview.status_code == 200
    assert preview.headers["content-type"] == "video/mp4"
    assert preview.headers["content-disposition"].startswith("inline;")
    assert preview.content == generated.read_bytes()
    download = client.get(f"/api/project/{project_id}/scene/scene_01/media?download=true")
    assert download.headers["content-disposition"].startswith("attachment;")


def test_muse_rejects_duplicate_video_for_another_scene(tmp_path):
    script_data = _script()
    script_data["scenes"].append({"id": "scene_02", "setting": "A garden", "dialogues": []})
    script = app_module.Script.model_validate(script_data)
    first = tmp_path / "first.mp4"
    second = tmp_path / "second.mp4"
    first.write_bytes(b"same video bytes" * 100)
    second.write_bytes(first.read_bytes())
    assert app_module._attach_muse_result(script, {
        "scene_id": "scene_01", "status": "done", "file_path": str(first), "content_check": "match",
    })
    duplicate = {"scene_id": "scene_02", "status": "done", "file_path": str(second),
                 "content_check": "match"}
    assert not app_module._attach_muse_result(script, duplicate)
    assert "trùng với cảnh scene_01" in duplicate["error"]
    assert script.scenes[1].generated_media_path == ""


def test_muse_rejects_same_picture_after_reencoding(tmp_path):
    original = tmp_path / "original.mp4"
    reencoded = tmp_path / "reencoded.mp4"
    different = tmp_path / "different.mp4"
    for output, color in ((original, "red"), (different, "blue")):
        subprocess.run([
            config.FFMPEG_PATH, "-f", "lavfi", "-i", f"color=c={color}:s=640x360:r=10",
            "-t", "1", "-c:v", "libx264", "-y", str(output),
        ], check=True, capture_output=True)
    subprocess.run([
        config.FFMPEG_PATH, "-i", str(original), "-c:v", "mpeg4", "-q:v", "8",
        "-y", str(reencoded),
    ], check=True, capture_output=True)

    assert original.read_bytes() != reencoded.read_bytes()
    assert app_module._same_muse_video(original, reencoded, {}, {})
    assert not app_module._same_muse_video(original, different, {}, {})


def test_muse_does_not_attach_unverified_video(tmp_path):
    script = app_module.Script.model_validate(_script())
    video = tmp_path / "unverified.mp4"
    video.write_bytes(b"video" * 300)
    result = {"scene_id": "scene_01", "status": "done", "file_path": str(video)}
    assert not app_module._attach_muse_result(script, result)
    assert "chưa được xác minh" in result["error"]
    assert script.scenes[0].generated_media_path == ""


def test_muse_batch_marks_existing_duplicate_for_regeneration(tmp_path):
    script_data = _script()
    script_data["scenes"].append({"id": "scene_02", "setting": "A garden", "dialogues": []})
    script = app_module.Script.model_validate(script_data)
    first = tmp_path / "first.mp4"
    second = tmp_path / "second.mp4"
    first.write_bytes(b"same video bytes" * 100)
    second.write_bytes(first.read_bytes())
    for scene, path in zip(script.scenes, (first, second)):
        scene.generated_media_path = str(path)
        scene.generated_media_type = "video"
        scene.generated_media_provider = "muse"

    assert app_module._clear_duplicate_muse_assignments(script)
    assert script.scenes[0].generated_media_path == str(first)
    assert script.scenes[1].generated_media_path == ""
    assert script.scenes[1].media_generation_status == "error"


def test_muse_batch_checks_saved_video_before_skipping_it(tmp_path, monkeypatch):
    monkeypatch.setattr(config, "OUTPUT_DIR", tmp_path)
    app_module.projects.clear()
    client = TestClient(app_module.app)
    project_id = client.post("/api/project/create", data={"script_json": json.dumps(_script())}).json()["project_id"]
    video = tmp_path / "existing.mp4"
    video.write_bytes(b"video" * 300)
    scene = app_module.projects[project_id]["script"].scenes[0]
    scene.generated_media_path = str(video)
    scene.generated_media_type = "video"
    scene.generated_media_provider = "muse"
    checks = []

    async def browser_ready(): return None
    async def verify(path, prompt):
        checks.append((path, prompt))
        return SimpleNamespace(status="match", reason="Setting matches")

    monkeypatch.setattr(app_module, "_ensure_muse_browser", browser_ready)
    monkeypatch.setattr(app_module, "verify_scene_content", verify)
    response = client.post(f"/api/project/{project_id}/muse-video-generate")
    assert response.status_code == 200
    assert response.json()["results"] == []
    assert len(checks) == 1
    assert scene.media_content_check_status == "match"
    assert scene.media_content_check_prompt_hash
    assert client.post(f"/api/project/{project_id}/muse-video-generate").status_code == 200
    assert len(checks) == 1
    scene.setting = "A different room"
    assert client.post(f"/api/project/{project_id}/muse-video-generate").status_code == 200
    assert len(checks) == 2


def test_muse_batch_regenerates_saved_video_that_conflicts_with_script(tmp_path, monkeypatch):
    monkeypatch.setattr(config, "OUTPUT_DIR", tmp_path)
    app_module.projects.clear()
    client = TestClient(app_module.app)
    project_id = client.post("/api/project/create", data={"script_json": json.dumps(_script())}).json()["project_id"]
    old = tmp_path / "wrong.mp4"
    new = tmp_path / "correct.mp4"
    old.write_bytes(b"wrong video" * 150)
    new.write_bytes(b"correct video" * 150)
    scene = app_module.projects[project_id]["script"].scenes[0]
    scene.generated_media_path = str(old)
    scene.generated_media_type = "video"
    scene.generated_media_provider = "muse"

    async def browser_ready(): return None
    async def verify(path, prompt):
        return SimpleNamespace(status="mismatch", reason="The clip shows a beach")

    async def submit_many(prompts, on_result=None, on_progress=None):
        assert [item["scene_id"] for item in prompts] == ["scene_01"]
        result = {"scene_id": "scene_01", "status": "done", "file_path": str(new),
                  "provider": "muse", "content_check": "match"}
        await on_result(result)
        return [result]

    monkeypatch.setattr(app_module, "_ensure_muse_browser", browser_ready)
    monkeypatch.setattr(app_module, "verify_scene_content", verify)
    monkeypatch.setattr(app_module.muse_service, "submit_many", submit_many)
    response = client.post(f"/api/project/{project_id}/muse-video-generate")
    assert response.status_code == 200
    assert scene.generated_media_path == str(new)
    assert scene.media_content_check_status == "match"


def test_muse_serializes_prompts_across_requests(monkeypatch):
    service = MuseService()
    active = 0
    peak = 0

    async def fake_submit(scene_id, prompt, reference_images=None, progress_callback=None):
        nonlocal active, peak
        active += 1
        peak = max(peak, active)
        await asyncio.sleep(0.01)
        active -= 1
        return {"scene_id": scene_id}

    monkeypatch.setattr(service, "_submit_prompt_unlocked", fake_submit)

    async def run():
        return await asyncio.gather(
            service.submit_prompt("scene_01", "first"),
            service.submit_prompt("scene_02", "second"),
        )

    assert [item["scene_id"] for item in asyncio.run(run())] == ["scene_01", "scene_02"]
    assert peak == 1


def test_content_verifier_samples_video_frames(tmp_path):
    video = tmp_path / "sample.mp4"
    subprocess.run([
        config.FFMPEG_PATH, "-f", "lavfi", "-i", "color=c=blue:s=640x360:r=12",
        "-t", "1", "-c:v", "libx264", "-y", str(video),
    ], check=True, capture_output=True)
    frames = _sample_frames(str(video))
    assert len(frames) >= 2
    assert all(frame.startswith(b"\xff\xd8") for frame in frames)


def test_content_verifier_sends_script_and_frames_to_gemini(monkeypatch):
    from google import genai

    captured = {}

    async def generate_content(**kwargs):
        captured.update(kwargs)
        return SimpleNamespace(parsed={"status": "match", "reason": "Cafe and letter are visible"})

    async def close(): return None

    monkeypatch.setattr(content_verifier, "_sample_frames", lambda path: [b"\xff\xd8one", b"\xff\xd8two"])
    monkeypatch.setattr(config, "GOOGLE_API_KEY", "test-key")
    monkeypatch.setattr(genai, "Client", lambda **kwargs: SimpleNamespace(
        aio=SimpleNamespace(models=SimpleNamespace(generate_content=generate_content), aclose=close),
    ))
    verdict = asyncio.run(content_verifier.verify_scene_content("scene.mp4", "An opens a letter in a cafe"))
    assert verdict.status == "match"
    assert "An opens a letter in a cafe" in captured["contents"][0]
    assert len(captured["contents"]) == 3


def test_muse_rejects_video_when_content_check_finds_mismatch(tmp_path, monkeypatch):
    monkeypatch.setattr(config, "GOOGLE_API_KEY", "test-key")
    service = MuseService()
    video = tmp_path / "scene.mp4"
    video.write_bytes(b"video" * 300)

    class FakePage:
        url = "https://muse.ai/"
        async def goto(self, *args, **kwargs): return None
        async def wait_for_timeout(self, milliseconds): return None
        async def close(self): return None

    async def new_page(): return FakePage()
    async def connect(): return SimpleNamespace(contexts=[SimpleNamespace(new_page=new_page)])
    async def settled(page): return set()
    async def fill(page, prompt): return None
    async def submit(page): return None
    async def download(page, scene_id, previous_result_keys, progress_callback): return str(video)
    async def verify(path, prompt):
        return SimpleNamespace(status="mismatch", reason="Cảnh là quán cà phê nhưng video là bãi biển")

    monkeypatch.setattr(service, "_connect", connect)
    monkeypatch.setattr(service, "_settled_existing_result_keys", settled)
    monkeypatch.setattr(service, "_fill_prompt", fill)
    monkeypatch.setattr(service, "_submit", submit)
    monkeypatch.setattr(service, "_try_download_result", download)
    monkeypatch.setattr(muse_module, "verify_scene_content", verify)
    with pytest.raises(RuntimeError, match="chưa khớp kịch bản"):
        asyncio.run(service.submit_prompt("scene_01", "A quiet cafe"))


def test_location_reference_persists_and_reaches_scene_prompt(tmp_path, monkeypatch):
    monkeypatch.setattr(config, "OUTPUT_DIR", tmp_path)
    app_module.projects.clear()
    client = TestClient(app_module.app)
    project_id = client.post("/api/project/create", data={"script_json": json.dumps(_script())}).json()["project_id"]
    created = client.post(f"/api/project/{project_id}/locations", data={
        "name": "Living room", "description": "Blue sofa beside a tall window",
    })
    assert created.status_code == 200
    location_id = created.json()["location"]["id"]
    assigned = client.post(f"/api/project/{project_id}/scene/scene_01/location", data={"location_id": location_id})
    assert assigned.status_code == 200

    buffer = io.BytesIO()
    Image.new("RGB", (20, 20), "blue").save(buffer, format="PNG")
    uploaded = client.post(f"/api/project/{project_id}/location/{location_id}/reference", files={
        "file": ("room.png", buffer.getvalue(), "image/png"),
    })
    assert uploaded.status_code == 200
    script = app_module.projects[project_id]["script"]
    scene = script.scenes[0]
    assert app_module._scene_reference_images(scene, script) == []
    assert "Blue sofa beside a tall window" in build_scene_prompt(scene, script)
    scene.prompt_override = "A person walks into the room."
    assert "LOCATION LOCK" in build_scene_prompt(scene, script)
    assert "LOCATION LOCK" in build_image_prompt(scene, script)
    persisted = json.loads((tmp_path / project_id / "script.json").read_text(encoding="utf-8"))
    assert persisted["scenes"][0]["location_id"] == location_id
    assert persisted["locations"][0]["reference_images"] == [uploaded.json()["file_path"]]
    reparsed = parse_script(json.dumps(persisted))
    assert reparsed.scenes[0].location_id == location_id
    assert reparsed.get_location(location_id).name == "Living room"
    assert client.get(f"/api/project/{project_id}/location/{location_id}/reference").content == buffer.getvalue()


def test_character_and_location_reference_generation_use_saved_assets(tmp_path, monkeypatch):
    monkeypatch.setattr(config, "OUTPUT_DIR", tmp_path)
    app_module.projects.clear()
    client = TestClient(app_module.app)
    project_id = client.post("/api/project/create", data={"script_json": json.dumps(_script())}).json()["project_id"]
    location_id = client.post(f"/api/project/{project_id}/locations", data={
        "name": "Living room", "description": "Blue sofa",
    }).json()["location"]["id"]
    source = tmp_path / "generated.jpg"
    Image.new("RGB", (32, 24), "green").save(source)
    prompts = []

    async def fake_generate(prompt, scene_id, aspect_ratio="16:9", progress_callback=None):
        prompts.append((prompt, aspect_ratio))
        return {"status": "ok", "method": "test_model", "file_path": str(source)}

    monkeypatch.setattr(app_module.image_service, "generate_scene_image", fake_generate)
    character = client.post(f"/api/project/{project_id}/character/person/generate-reference")
    location = client.post(f"/api/project/{project_id}/location/{location_id}/generate-reference")
    assert character.status_code == 200
    assert location.status_code == 200
    assert prompts[0][1] == "4:3"
    assert "Blue sofa" in prompts[1][0]
    assert Path(character.json()["file_path"]).parent == tmp_path / project_id / "assets"
    assert Path(location.json()["file_path"]).parent == tmp_path / project_id / "assets"
    assert client.get(f"/api/project/{project_id}/character/person/reference").status_code == 200


def test_muse_plan_one_uses_saved_text_locks_without_image_upload(tmp_path, monkeypatch):
    monkeypatch.setattr(config, "OUTPUT_DIR", tmp_path)
    app_module.projects.clear()
    client = TestClient(app_module.app)
    project_id = client.post("/api/project/create", data={"script_json": json.dumps(_script())}).json()["project_id"]
    location_id = client.post(f"/api/project/{project_id}/locations", data={
        "name": "Living room", "description": "Blue sofa beside a tall window",
    }).json()["location"]["id"]
    assert client.post(f"/api/project/{project_id}/scene/scene_01/location", data={
        "location_id": location_id,
    }).status_code == 200
    details = client.post(f"/api/project/{project_id}/character/person/visual-details", data={
        "appearance_signature": "Short black hair and oval face",
        "wardrobe": "Dark green jacket",
        "identity_markers": "round glasses; silver watch",
    })
    assert details.status_code == 200
    script = app_module.projects[project_id]["script"]
    script.scenes[0].visible_character_ids = ["person"]
    script.scenes[0].prompt_override = "Person walks toward the window."
    reference = tmp_path / "existing.png"
    Image.new("RGB", (20, 20), "blue").save(reference)
    script.characters[0].reference_images = [str(reference)]
    script.locations[0].reference_images = [str(reference)]
    assert app_module._scene_reference_images(script.scenes[0], script)
    output = tmp_path / "scene.mp4"
    output.write_bytes(b"video" * 300)
    captured = {}

    async def browser_ready(): return None

    async def submit_prompt(scene_id, prompt, reference_images=None):
        captured.update(prompt=prompt, reference_images=reference_images)
        return {"scene_id": scene_id, "status": "done", "file_path": str(output),
                "content_check": "match"}

    monkeypatch.setattr(app_module, "_ensure_muse_browser", browser_ready)
    monkeypatch.setattr(app_module.muse_service, "submit_prompt", submit_prompt)
    response = client.post(f"/api/project/{project_id}/scene/scene_01/muse-video-generate")
    assert response.status_code == 200
    assert "Short black hair and oval face" in captured["prompt"]
    assert "Dark green jacket" in captured["prompt"]
    assert "round glasses" in captured["prompt"]
    assert "Blue sofa beside a tall window" in captured["prompt"]
    assert "Person walks toward the window" in captured["prompt"]
    assert captured["reference_images"] == []


def test_plan_one_location_lock_is_shared_and_editable(tmp_path, monkeypatch):
    monkeypatch.setattr(config, "OUTPUT_DIR", tmp_path)
    app_module.projects.clear()
    client = TestClient(app_module.app)
    script_data = _script()
    script_data["scenes"].append({"id": "scene_02", "setting": "Another view of the room", "dialogues": []})
    project_id = client.post("/api/project/create", data={"script_json": json.dumps(script_data)}).json()["project_id"]
    location_id = client.post(f"/api/project/{project_id}/locations", data={"name": "Living room"}).json()["location"]["id"]
    first = client.post(f"/api/project/{project_id}/scene/scene_01/location", data={"location_id": location_id})
    assert first.json()["location"]["description"] == "A room"
    second = client.post(f"/api/project/{project_id}/scene/scene_02/location", data={"location_id": location_id})
    assert second.json()["location"]["description"] == "A room"
    changed = client.post(f"/api/project/{project_id}/location/{location_id}/details", data={
        "name": "Living room", "description": "Blue sofa, round table, warm window light",
    })
    assert changed.status_code == 200
    script = app_module.projects[project_id]["script"]
    for scene in script.scenes:
        assert "Blue sofa, round table, warm window light" in build_scene_prompt(scene, script)
    saved = json.loads((tmp_path / project_id / "script.json").read_text(encoding="utf-8"))
    assert saved["locations"][0]["description"] == "Blue sofa, round table, warm window light"


def test_muse_only_reads_generated_video_wrappers():
    captured = {}

    class FakeLocator:
        async def evaluate_all(self, _script):
            return [{
                "key": "media-generation-scene-1.mp4",
                "source": "blob:https://muse.ai/generated",
            }]

    class FakePage:
        def locator(self, selector):
            captured["selector"] = selector
            return FakeLocator()

    sources = asyncio.run(MuseService._video_sources(FakePage()))
    assert sources == {"blob:https://muse.ai/generated"}
    assert captured["selector"] == '[data-hatch-video-wrapper="true"]'


def test_muse_tracks_history_by_stable_result_id_not_blob_url(monkeypatch):
    calls = 0

    async def changing_blob(_page):
        nonlocal calls
        calls += 1
        return [{
            "key": "media-generation-existing.mp4",
            "source": f"blob:https://muse.ai/rebuilt-{calls}",
        }]

    class FakePage:
        async def wait_for_timeout(self, _milliseconds):
            return None

    monkeypatch.setattr(MuseService, "_video_results", staticmethod(changing_blob))
    keys = asyncio.run(MuseService()._settled_existing_result_keys(FakePage()))
    assert keys == {"media-generation-existing.mp4"}
    assert calls >= 5


def test_muse_does_not_download_failed_source_repeatedly(monkeypatch):
    service = MuseService()
    attempts = 0

    async def results(_page):
        return [{"key": "media-generation-new.mp4", "source": "blob:https://muse.ai/new"}]

    async def save(*_args):
        nonlocal attempts
        attempts += 1
        raise RuntimeError("video not ready")

    class FakePage:
        async def wait_for_timeout(self, _milliseconds):
            return None

    monkeypatch.setattr(config, "MUSE_RESULT_TIMEOUT_SECONDS", 18)
    monkeypatch.setattr(service, "_video_results", results)
    monkeypatch.setattr(service, "_save_video_source", save)
    with pytest.raises(RuntimeError, match="Hết thời gian chờ Muse"):
        asyncio.run(service._try_download_result(FakePage(), "scene_01", set()))
    assert attempts == 1


def test_muse_rejects_square_avatar_video(tmp_path):
    square = tmp_path / "avatar.mp4"
    landscape = tmp_path / "result.mp4"
    subprocess.run([
        config.FFMPEG_PATH, "-f", "lavfi", "-i", "color=c=white:s=480x480:r=24",
        "-t", "0.2", "-c:v", "libx264", "-y", str(square),
    ], check=True, capture_output=True)
    subprocess.run([
        config.FFMPEG_PATH, "-f", "lavfi", "-i", "color=c=blue:s=1280x720:r=24",
        "-t", "0.2", "-c:v", "libx264", "-y", str(landscape),
    ], check=True, capture_output=True)

    valid_square, square_reason = MuseService.validate_generated_video(str(square))
    valid_landscape, _ = MuseService.validate_generated_video(str(landscape))
    assert valid_square is False
    assert "avatar/placeholder" in square_reason
    assert valid_landscape is True


def test_audio_duration_without_ffprobe(tmp_path, monkeypatch):
    audio_path = tmp_path / "silence.wav"
    with wave.open(str(audio_path), "wb") as wav:
        wav.setnchannels(1)
        wav.setsampwidth(2)
        wav.setframerate(24000)
        wav.writeframes(b"\0" * 24000 * 2 * 2)
    monkeypatch.setattr(config, "FFPROBE_PATH", "missing-ffprobe")
    assert abs(get_audio_duration(str(audio_path)) - 2.0) < 0.05


def test_elevenlabs_uses_current_api_contract_and_cache(tmp_path, monkeypatch):
    captured = {}

    class FakeResponse:
        status_code = 200
        content = b"ID3" + (b"\0" * 2048)
        headers = {"content-type": "audio/mpeg"}
        text = ""

    class FakeClient:
        def __init__(self, **kwargs):
            captured["timeout"] = kwargs.get("timeout")

        async def __aenter__(self):
            return self

        async def __aexit__(self, *_):
            return None

        async def post(self, url, params, headers, json):
            captured["calls"] = captured.get("calls", 0) + 1
            captured.update(url=url, params=params, headers=headers, payload=json)
            return FakeResponse()

    monkeypatch.setattr(voice_module.httpx, "AsyncClient", FakeClient)
    service = VoiceService()
    service.output_dir = tmp_path
    service.api_key = "eleven-test-key"
    service.voice_id = "voice_123"
    service.model_id = "eleven_multilingual_v2"
    service.output_format = "mp3_44100_128"

    result = asyncio.run(service.synthesize("Xin chào Việt Nam", emotion="calm"))

    assert captured["url"].endswith("/v1/text-to-speech/voice_123")
    assert captured["headers"]["xi-api-key"] == "eleven-test-key"
    assert captured["params"] == {"output_format": "mp3_44100_128"}
    assert captured["payload"]["text"] == "Xin chào Việt Nam"
    assert captured["payload"]["model_id"] == "eleven_multilingual_v2"
    assert captured["payload"]["voice_settings"]["stability"] == 0.5
    assert captured["timeout"] == 180
    assert result["method"] == "elevenlabs"
    assert Path(result["file_path"]).read_bytes() == FakeResponse.content
    cached = asyncio.run(service.synthesize("Xin chào Việt Nam", emotion="calm"))
    assert cached["cached"] is True
    assert captured["calls"] == 1


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


def test_scene_prompts_keep_script_actions_and_do_not_turn_dialogue_into_flashback():
    script = parse_script({
        "title": "Letter scene",
        "characters": [
            {"id": "an", "name": "An", "description": "Woman in a green coat"},
            {"id": "binh", "name": "Bình", "description": "Man in a dark shirt"},
        ],
        "scenes": [{
            "id": "scene_01", "setting": "Current day in a quiet cafe",
            "visible_character_ids": ["an", "binh"],
            "action_beats": ["An hands a sealed letter to Bình", "Bình opens the letter"],
            "dialogues": [{"character": "an", "text": "Ngày xưa ở khu rừng ấy...", "emotion": "sad"}],
            "narration": {"text": "Bình đọc lá thư và sững lại."},
            "prompt_override": "Close shot of the letter.",
        }],
    })
    scene = script.scenes[0]
    for prompt in (build_scene_prompt(scene, script), build_image_prompt(scene, script)):
        assert "Current day in a quiet cafe" in prompt
        assert "An hands a sealed letter to Bình" in prompt
        assert "Bình opens the letter" in prompt
        assert "Bình đọc lá thư và sững lại." in prompt
        assert "Ngày xưa ở khu rừng ấy..." in prompt
        assert "Close shot of the letter" in prompt
        assert "EXCLUDE unrelated actions, flashbacks" in prompt


def test_visual_analysis_cannot_replace_explicit_script_action():
    script = parse_script({
        "title": "Authored action",
        "characters": [],
        "scenes": [{"id": "scene_01", "setting": "Cafe", "action_beats": ["A letter is placed on the table"]}],
    })
    plan = visual_analyzer.SceneBatchPlan(scenes=[visual_analyzer.ScenePlan(
        id="scene_01", action_beats=["A dancer spins on the table"],
    )])
    visual_analyzer._merge_scene_batch(script, plan, {"scene_01"})
    assert script.scenes[0].action_beats == ["A letter is placed on the table"]


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


def test_visual_analysis_reports_network_failure_without_trying_scene_batches(monkeypatch):
    script = parse_script({
        "title": "Network test",
        "characters": [{"id": "hero", "name": "An"}],
        "scenes": [{"id": "scene_01", "setting": "Room", "dialogues": []}],
    })
    calls = []

    async def fail_network(client, contents, instruction, schema):
        calls.append(schema)
        raise RuntimeError("Cannot connect to host generativelanguage.googleapis.com:443; Access is denied")

    monkeypatch.setattr(config, "GOOGLE_API_KEY", "test-key")
    monkeypatch.setattr(visual_analyzer, "_generate_structured", fail_network)
    analyzed, fallback, warning = asyncio.run(visual_analyzer.analyze_visual_consistency(script))

    assert fallback is True
    assert "Không thể kết nối Google Gemini" in warning
    assert calls == [visual_analyzer.GlobalVisualPlan]
    assert analyzed.scenes[0].composition


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
