"""
Timeline Manager — Tính toán timeline audio/video cho từng scene
"""

import subprocess
import json
import re
from pathlib import Path
from dataclasses import dataclass, field
from config import config


@dataclass
class AudioSegment:
    """Một đoạn audio trong timeline"""
    id: str
    scene_id: str
    character_id: str
    text: str
    file_path: str = ""
    duration: float = 0.0  # seconds
    start_time: float = 0.0
    end_time: float = 0.0


@dataclass
class SceneTimeline:
    """Timeline cho 1 scene"""
    scene_id: str
    segments: list[AudioSegment] = field(default_factory=list)
    total_duration: float = 0.0
    video_path: str = ""
    final_audio_path: str = ""


@dataclass
class ProjectTimeline:
    """Timeline toàn bộ project"""
    project_id: str
    scenes: list[SceneTimeline] = field(default_factory=list)
    total_duration: float = 0.0


def get_audio_duration(file_path: str) -> float:
    """Đo thời lượng file audio bằng ffprobe"""
    try:
        result = subprocess.run(
            [
                config.FFPROBE_PATH,
                "-v", "quiet",
                "-print_format", "json",
                "-show_format",
                str(file_path)
            ],
            capture_output=True,
            text=True,
            timeout=10
        )
        if result.returncode == 0:
            data = json.loads(result.stdout)
            return float(data.get("format", {}).get("duration", 0))
    except Exception:
        pass

    # imageio-ffmpeg may provide FFmpeg without ffprobe on Windows.
    try:
        result = subprocess.run(
            [config.FFMPEG_PATH, "-i", str(file_path)],
            capture_output=True, text=True, encoding="utf-8", errors="replace", timeout=10,
        )
        match = re.search(r"Duration:\s*(\d+):(\d+):(\d+(?:\.\d+)?)", result.stderr)
        if match:
            hours, minutes, seconds = match.groups()
            return int(hours) * 3600 + int(minutes) * 60 + float(seconds)
    except Exception:
        pass

    # Fallback: ước tính từ file size (rough estimate)
    try:
        size = Path(file_path).stat().st_size
        fpath = str(file_path).lower()
        if fpath.endswith(".mp3"):
            # MP3 128kbps ≈ 16000 bytes/giây
            return max(size / 16000, 1.0)
        elif fpath.endswith(".wav"):
            # WAV 24kHz mono ≈ 48000 bytes/giây
            return max(size / 48000, 1.0)
        else:
            # Generic fallback
            return max(size / 24000, 1.0)
    except Exception:
        return 3.0  # Default 3 seconds


def build_scene_timeline(scene_id: str, audio_files: list[dict]) -> SceneTimeline:
    """
    Xây dựng timeline cho 1 scene từ danh sách audio files.

    audio_files: [{"id": "d01", "scene_id": "s01", "character_id": "c01",
                   "text": "...", "file_path": "/path/to/audio.wav"}]
    """
    timeline = SceneTimeline(scene_id=scene_id)
    current_time = 0.0
    gap = 0.3  # 300ms gap giữa các dialogue

    for audio_info in audio_files:
        duration = get_audio_duration(audio_info["file_path"])

        segment = AudioSegment(
            id=audio_info["id"],
            scene_id=scene_id,
            character_id=audio_info.get("character_id", ""),
            text=audio_info.get("text", ""),
            file_path=audio_info["file_path"],
            duration=duration,
            start_time=current_time,
            end_time=current_time + duration,
        )
        timeline.segments.append(segment)
        current_time += duration + gap

    # Remove last gap
    if timeline.segments:
        current_time -= gap

    timeline.total_duration = current_time
    return timeline


def build_project_timeline(project_id: str, scene_timelines: list[SceneTimeline]) -> ProjectTimeline:
    """Xây dựng timeline toàn bộ project"""
    project = ProjectTimeline(project_id=project_id, scenes=scene_timelines)
    project.total_duration = sum(s.total_duration for s in scene_timelines)
    return project


def estimate_duration_from_text(text: str, chars_per_second: float = 4.0) -> float:
    """Ước tính thời lượng audio từ text (tiếng Việt ~4 ký tự/giây)"""
    # Remove spaces for more accurate Vietnamese character count
    clean_text = text.strip()
    estimated = len(clean_text) / chars_per_second
    return max(estimated, 1.0)  # Minimum 1 second
