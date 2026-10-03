"""Check whether sampled Muse video frames depict the requested script scene."""

import asyncio
import json
import re
import subprocess
from pathlib import Path
from typing import Literal

from pydantic import BaseModel, Field

from config import config


class SceneContentVerdict(BaseModel):
    status: Literal["match", "mismatch", "uncertain"]
    reason: str = Field(default="")


def _visual_requirements(scene_prompt: str) -> str:
    prefixes = (
        "SCRIPT FIDELITY", "REQUIRED SETTING", "ON-SCREEN NAMED CHARACTERS",
        "REQUIRED VISIBLE ACTIONS", "SCRIPT NARRATION", "DIALOGUE CONTEXT",
        "When no explicit physical action", "LOCATION LOCK", "EXCLUDE",
    )
    selected = [block for block in scene_prompt.split("\n\n")
                if block.strip().startswith(prefixes)]
    return "\n\n".join(selected) if selected else scene_prompt


def _sample_frames(video_path: str) -> list[bytes]:
    path = Path(video_path)
    if not path.is_file():
        raise RuntimeError("Không tìm thấy video để kiểm tra nội dung")
    info = subprocess.run(
        [config.FFMPEG_PATH, "-hide_banner", "-i", str(path)],
        capture_output=True, text=True, timeout=20,
    )
    match = re.search(r"Duration:\s*(\d+):(\d+):(\d+(?:\.\d+)?)", info.stderr or "")
    if not match:
        raise RuntimeError("Không đọc được thời lượng video để kiểm tra nội dung")
    hours, minutes, seconds = match.groups()
    duration = int(hours) * 3600 + int(minutes) * 60 + float(seconds)
    if duration <= 0:
        raise RuntimeError("Video không có thời lượng hợp lệ")
    positions = sorted({round(min(duration * fraction, max(duration - 0.1, 0)), 2)
                        for fraction in (0.15, 0.5, 0.85)})
    frames = []
    for offset in positions:
        result = subprocess.run(
            [config.FFMPEG_PATH, "-hide_banner", "-loglevel", "error", "-ss", str(offset),
             "-i", str(path), "-frames:v", "1", "-vf", "scale=640:-2",
             "-f", "image2pipe", "-vcodec", "mjpeg", "pipe:1"],
            capture_output=True, timeout=30,
        )
        if result.returncode == 0 and result.stdout:
            frames.append(result.stdout)
    if len(frames) != len(positions):
        raise RuntimeError("Không trích đủ khung hình để kiểm tra nội dung video")
    return frames


async def verify_scene_content(video_path: str, scene_prompt: str) -> SceneContentVerdict:
    """Fail closed on unverified media; dialogue audio is intentionally excluded."""
    if not config.has_google_api():
        raise RuntimeError("Cần Google API Key để kiểm tra video có đúng kịch bản")
    frames = await asyncio.to_thread(_sample_frames, video_path)
    from google import genai
    from google.genai import types

    client = genai.Client(api_key=config.GOOGLE_API_KEY)
    try:
        instruction = (
            "You are checking whether frames sampled from one short generated video match its source "
            "script scene. Compare concrete visible facts: setting, named characters when shown, "
            "objects and required visible actions. The frames are in chronological order. "
            "Ignore visual style, camera quality, spoken words and abstract narration that cannot be "
            "verified visually. Do not infer missing events from the prompt. Return 'mismatch' for a "
            "clear contradictory setting, person, object or action; 'uncertain' if the frames do not "
            "show enough of the required visual content; otherwise 'match'. Give a short concrete reason."
        )
        response = await client.aio.models.generate_content(
            model=config.GEMINI_MODEL,
            contents=[
                f"SOURCE SCRIPT SCENE AND REQUIRED VISUALS:\n{_visual_requirements(scene_prompt)}",
                *(types.Part.from_bytes(data=frame, mime_type="image/jpeg") for frame in frames),
            ],
            config=types.GenerateContentConfig(
                system_instruction=instruction,
                response_mime_type="application/json",
                response_schema=SceneContentVerdict,
                temperature=0,
                max_output_tokens=512,
            ),
        )
        parsed = response.parsed
        if isinstance(parsed, SceneContentVerdict):
            return parsed
        if isinstance(parsed, dict):
            return SceneContentVerdict.model_validate(parsed)
        return SceneContentVerdict.model_validate(json.loads(response.text or ""))
    except Exception as exc:
        raise RuntimeError(f"Không xác minh được nội dung video: {exc}") from exc
    finally:
        await client.aio.aclose()
