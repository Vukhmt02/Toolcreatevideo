"""
Unit and Integration Test Suite
Kiểm tra toàn bộ pipeline:
1. Script Parsing & Scene Type (Key/Filler)
2. Image Prompt Builder (Imagen 3)
3. Ken Burns Video Generator (FFmpeg)
4. Timeline Video Compositor
5. FastAPI Endpoints (Status, Config, Upload, Format, Project, Toggle Type)
"""

import asyncio
from pathlib import Path
from PIL import Image

from config import config
from core.script_parser import (
    parse_script,
    format_script_to_complete_json,
    parse_narrative_story,
    Scene,
    Script,
)
from core.prompt_builder import build_scene_prompt, build_image_prompt
from services.image_service import image_service
from services.compositor import compositor
from fastapi.testclient import TestClient
from app import app


def test_script_parser_scene_type():
    print("--- [1] Test Script Parser Scene Type ---")
    raw_text = """
    Hành trình vượt bão
    Minh (nam): Một thuyền trưởng kiên cường.
    Lan (nữ): Một bác sĩ trẻ dũng cảm.

    Cảnh 1: Cảng biển lúc hoàng hôn trước cơn bão
    Minh: Chúng ta phải chuẩn bị ra khơi ngay bây giờ.
    Lan: Sóng biển bắt đầu lớn rồi, anh có chắc không?

    Cảnh 2: Biển khơi giông tố, mây đen cuồn cuộn
    Lời dẫn: Cơn bão ập đến nhanh hơn dự tính. Những con sóng cao ngút ngàn bổ xuống mạn tàu.

    Cảnh 3: Ánh đèn hải đăng ló rạng trong đêm
    Minh: Nhìn kìa, chúng ta đã thấy ngọn hải đăng rồi!
    """

    script = parse_script(raw_text)
    assert len(script.scenes) >= 3, f"Expected >= 3 scenes, got {len(script.scenes)}"
    print(f"Parsed {len(script.scenes)} scenes.")
    for sc in script.scenes:
        assert hasattr(sc, "scene_type"), f"Scene {sc.id} missing scene_type"
        assert sc.scene_type in ("key", "filler"), f"Invalid scene_type: {sc.scene_type}"
        print(f"  - {sc.id}: scene_type={sc.scene_type}, setting={sc.setting[:35]}...")

    # Test format_script_to_complete_json
    formatted = format_script_to_complete_json(raw_text)
    for sc in formatted["scenes"]:
        assert "scene_type" in sc
    print("format_script_to_complete_json scene_type OK.")


def test_narrative_story_key_filler_distribution():
    print("\n--- [2] Test Narrative Story Key/Filler Distribution ---")
    long_text = "\n\n".join([
        f"Đoạn văn tự sự số {i + 1}: Ngày xửa ngày xưa trên một đỉnh núi cao mây mù bao phủ, có một ngôi làng cổ kính với những mái ngói rêu phong. Người dân nơi đây sống yên bình qua bao thế hệ."
        for i in range(25)
    ])
    result = parse_narrative_story(long_text)
    scenes = result["scenes"]
    print(f"Parsed narrative story into {len(scenes)} scenes.")
    key_count = sum(1 for s in scenes if s["scene_type"] == "key")
    filler_count = sum(1 for s in scenes if s["scene_type"] == "filler")
    print(f"  KEY scenes: {key_count} | FILLER scenes: {filler_count}")
    assert key_count > 0, "Must have at least 1 key scene"
    assert filler_count > 0, "Must have at least 1 filler scene"
    assert scenes[0]["scene_type"] == "key", "Scene 1 should be KEY"


def test_scene_density_changes_narrative_scene_count_without_losing_text():
    body = " ".join([
        f"Nhịp truyện {index}: Nam đi qua con phố cũ và nhớ về gia đình trong buổi chiều mưa."
        for index in range(1, 19)
    ])
    source = f"Một chuyến trở về\n\n{body}"

    parsed = {
        density: parse_script(source, scene_density=density)
        for density in ("few", "balanced", "many")
    }

    assert len(parsed["few"].scenes) < len(parsed["balanced"].scenes)
    assert len(parsed["balanced"].scenes) < len(parsed["many"].scenes)
    narration_words = {
        density: " ".join(
            scene.narration.text for scene in script.scenes if scene.narration
        ).split()
        for density, script in parsed.items()
    }
    assert narration_words["few"] == narration_words["balanced"] == narration_words["many"]
    assert all(scene.duration_hint == "15s" for scene in parsed["few"].scenes)
    assert all(scene.duration_hint == "10s" for scene in parsed["balanced"].scenes)
    assert all(scene.duration_hint == "7s" for scene in parsed["many"].scenes)


def test_scene_density_does_not_merge_existing_json_scenes():
    source = {
        "title": "Cảnh đã biên tập",
        "scenes": [
            {"id": "scene_01", "setting": "Phòng khách", "dialogues": []},
            {"id": "scene_02", "setting": "Sân ga", "dialogues": []},
        ],
    }
    assert len(parse_script(source, scene_density="few").scenes) == 2


def test_semantic_scene_split_preserves_content_blocks_without_time_chunking():
    source = """Câu chuyện trở về

Nam đứng một mình ở sân ga cũ và nhìn đoàn tàu vừa rời bến.

Ba ngày sau, Nam bước vào căn nhà tuổi thơ và gặp lại mẹ.

Cuộc gặp khiến Nam quyết định ở lại quê hương."""

    script = parse_script(source, scene_density="semantic")

    assert len(script.scenes) == 3
    assert all(scene.duration_hint == "" for scene in script.scenes)
    narration = [scene.narration.text for scene in script.scenes]
    assert "Ba ngày sau" in narration[1]
    assert "quyết định ở lại" in narration[2]


def test_prompt_builders():
    print("\n--- [3] Test Prompt Builders ---")
    script = parse_script("""
    Bình minh trên biển
    Minh: 30 tuổi, áo khoác gió.
    Cảnh 1: Bãi biển hoang sơ, ánh nắng sớm vàng rực
    Minh: Một ngày mới lại bắt đầu.
    """)
    scene = script.scenes[0]
    veo_prompt = build_scene_prompt(scene, script)
    img_prompt = build_image_prompt(scene, script)

    assert "Cinematic" in veo_prompt
    assert "Award-winning" in img_prompt or "Cinematic" in img_prompt
    assert "no watermark" in img_prompt
    print("Veo prompt:", veo_prompt[:80], "...")
    print("Imagen prompt:", img_prompt[:80], "...")


def test_ken_burns_and_compositor():
    print("\n--- [4] Test Ken Burns & Compositor ---")
    # Tạo ảnh mẫu
    test_img = Path(config.TEMP_DIR) / "test_sample_kb.jpg"
    img = Image.new("RGB", (1280, 720), color=(40, 80, 120))
    img.save(test_img)

    # Test Ken Burns (zoom_in và pan_right)
    kb_clip1 = image_service.create_ken_burns_video(
        str(test_img), duration=2.5, scene_id="test_sc01", effect="zoom_in"
    )
    assert Path(kb_clip1).exists(), f"Ken Burns clip 1 failed to generate: {kb_clip1}"
    print(f"Created Ken Burns clip 1: {kb_clip1} (size: {Path(kb_clip1).stat().st_size} bytes)")

    kb_clip2 = image_service.create_ken_burns_video(
        str(test_img), duration=2.5, scene_id="test_sc02", effect="pan_right"
    )
    assert Path(kb_clip2).exists(), f"Ken Burns clip 2 failed to generate: {kb_clip2}"
    print(f"Created Ken Burns clip 2: {kb_clip2} (size: {Path(kb_clip2).stat().st_size} bytes)")

    # Test build_timeline_video
    stitched = compositor.build_timeline_video([kb_clip1, kb_clip2])
    assert Path(stitched).exists(), f"build_timeline_video failed: {stitched}"
    print(f"Stitched timeline video: {stitched} (size: {Path(stitched).stat().st_size} bytes)")

    # Cleanup
    test_img.unlink(missing_ok=True)
    Path(kb_clip1).unlink(missing_ok=True)
    Path(kb_clip2).unlink(missing_ok=True)
    Path(stitched).unlink(missing_ok=True)


def test_fastapi_endpoints():
    print("\n--- [5] Test FastAPI Endpoints ---")
    client = TestClient(app)

    # 1. /api/status
    res = client.get("/api/status")
    assert res.status_code == 200
    status_data = res.json()
    print("Status:", status_data)
    assert "imagen_api" in status_data
    assert "elevenlabs_api" in status_data
    assert "ffmpeg_ready" in status_data

    # 2. /api/project/create
    script_json = """{
        "title": "Test Project",
        "settings": {"default_language": "vi", "aspect_ratio": "16:9", "resolution": "720p"},
        "characters": [{"id": "char_01", "name": "Nam", "description": "Man 30s"}],
        "scenes": [
            {
                "id": "scene_01",
                "scene_type": "key",
                "setting": "Street morning",
                "camera": "Wide",
                "dialogues": [{"character": "char_01", "text": "Xin chào thế giới"}],
                "narration": null
            },
            {
                "id": "scene_02",
                "scene_type": "filler",
                "setting": "Coffee shop sunset",
                "camera": "Medium",
                "dialogues": [],
                "narration": {"text": "Trời dần chuyển về chiều"}
            }
        ]
    }"""
    res = client.post("/api/project/create", data={"script_json": script_json})
    assert res.status_code == 200
    proj_data = res.json()
    project_id = proj_data["project_id"]
    print(f"Created project: {project_id}")

    # 3. /api/project/{id}/scene/{id}/toggle-type
    res = client.post(f"/api/project/{project_id}/scene/scene_02/toggle-type")
    assert res.status_code == 200
    toggle_data = res.json()
    print("Toggle scene_02 result:", toggle_data)
    assert toggle_data["scene_type"] == "key"

    # Toggle back
    res = client.post(f"/api/project/{project_id}/scene/scene_02/toggle-type")
    assert res.status_code == 200
    assert res.json()["scene_type"] == "filler"
    print("Toggle scene_02 back to filler OK.")


if __name__ == "__main__":
    test_script_parser_scene_type()
    test_narrative_story_key_filler_distribution()
    test_prompt_builders()
    test_ken_burns_and_compositor()
    test_fastapi_endpoints()
    print("\n🎉 ALL TESTS PASSED SUCCESSFULLY! 🎉\n")
