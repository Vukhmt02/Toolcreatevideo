"""
ToolCreateVideo - Configuration
Đọc API keys và settings từ file .env
"""

import os
from pathlib import Path
from dotenv import load_dotenv

# Load .env file
BASE_DIR = Path(__file__).parent
load_dotenv(BASE_DIR / ".env")


import shutil

def _detect_ffmpeg() -> str:
    """Tự động phát hiện đường dẫn ffmpeg"""
    custom = os.getenv("FFMPEG_PATH", "")
    if custom and (Path(custom).exists() or shutil.which(custom)):
        return custom
    if shutil.which("ffmpeg"):
        return "ffmpeg"
    try:
        import imageio_ffmpeg
        exe = imageio_ffmpeg.get_ffmpeg_exe()
        if exe and Path(exe).exists():
            return exe
    except Exception:
        pass
    return "ffmpeg"


class Config:
    """Application configuration"""

    BASE_DIR: Path = BASE_DIR

    # Google AI Studio API Key (Veo 3.1 & Gemini image)
    GOOGLE_API_KEY: str = os.getenv("GOOGLE_API_KEY", "")

    # WaveSpeed API Key (legacy)
    WAVESPEED_API_KEY: str = os.getenv("WAVESPEED_API_KEY", "")

    # ElevenLabs is the only narration provider.
    ELEVENLABS_API_KEY: str = os.getenv("ELEVENLABS_API_KEY", "")
    ELEVENLABS_VOICE_ID: str = os.getenv("ELEVENLABS_VOICE_ID", "")
    ELEVENLABS_MODEL_ID: str = os.getenv("ELEVENLABS_MODEL_ID", "eleven_multilingual_v2")
    ELEVENLABS_OUTPUT_FORMAT: str = os.getenv("ELEVENLABS_OUTPUT_FORMAT", "mp3_44100_128")
    ELEVENLABS_STABILITY: float = max(0.0, min(1.0, float(os.getenv("ELEVENLABS_STABILITY", "0.5"))))
    ELEVENLABS_SIMILARITY_BOOST: float = max(
        0.0, min(1.0, float(os.getenv("ELEVENLABS_SIMILARITY_BOOST", "0.75")))
    )
    ELEVENLABS_STYLE: float = max(0.0, min(1.0, float(os.getenv("ELEVENLABS_STYLE", "0.0"))))
    ELEVENLABS_SPEAKER_BOOST: bool = os.getenv("ELEVENLABS_SPEAKER_BOOST", "true").lower() == "true"

    # Server
    HOST: str = os.getenv("HOST", "127.0.0.1")
    PORT: int = int(os.getenv("PORT", "8000"))
    TIMELINE_CONCURRENCY: int = max(1, min(3, int(os.getenv("TIMELINE_CONCURRENCY", "1"))))

    # FFmpeg
    FFMPEG_PATH: str = _detect_ffmpeg()
    FFPROBE_PATH: str = os.getenv("FFPROBE_PATH", "ffprobe")

    # Storage
    OUTPUT_DIR: Path = BASE_DIR / os.getenv("OUTPUT_DIR", "storage/projects")
    TEMP_DIR: Path = BASE_DIR / os.getenv("TEMP_DIR", "storage/temp")

    # Veo 3.1 settings
    VEO_MODEL: str = os.getenv("VEO_MODEL", "veo-3.1-generate-preview")
    VEO_ASPECT_RATIO: str = "16:9"
    VEO_RESOLUTION: str = "720p"

    # Gemini script refinement settings
    GEMINI_MODEL: str = os.getenv("GEMINI_MODEL", "gemini-3.8-flash")

    # Script analysis can use OpenAI independently from Google media creation.
    SCRIPT_AI_PROVIDER: str = os.getenv(
        "SCRIPT_AI_PROVIDER", "openai" if os.getenv("OPENAI_API_KEY") else "gemini"
    ).strip().lower()
    OPENAI_API_KEY: str = os.getenv("OPENAI_API_KEY", "")
    OPENAI_MODEL: str = os.getenv("OPENAI_MODEL", "gpt-5-mini")

    # Gemini image settings (Filler scenes)
    IMAGE_MODEL: str = os.getenv("IMAGE_MODEL", "gemini-3.1-flash-image")
    IMAGEN_MODEL: str = os.getenv("IMAGEN_MODEL", "")
    ALLOW_IMAGE_FALLBACK: bool = os.getenv("ALLOW_IMAGE_FALLBACK", "false").lower() == "true"
    IMAGEN_ASPECT_RATIO: str = "16:9"

    # Google Flow browser bridge (requires Chrome launched with remote debugging)
    FLOW_ENABLED: bool = os.getenv("FLOW_ENABLED", "false").lower() == "true"
    FLOW_CDP_URL: str = os.getenv("FLOW_CDP_URL", "http://127.0.0.1:9222")
    FLOW_URL: str = os.getenv("FLOW_URL", "https://flow.google.com/")
    FLOW_CONCURRENCY: int = max(1, min(6, int(os.getenv("FLOW_CONCURRENCY", "3"))))

    # Muse browser bridge. Muse Video does not have a public generation API yet.
    MUSE_ENABLED: bool = os.getenv("MUSE_ENABLED", "true").lower() == "true"
    MUSE_CDP_URL: str = os.getenv("MUSE_CDP_URL", "http://127.0.0.1:9222")
    MUSE_URL: str = os.getenv("MUSE_URL", "https://muse.ai/")
    MUSE_CONCURRENCY: int = max(1, min(3, int(os.getenv("MUSE_CONCURRENCY", "1"))))
    MUSE_RESULT_TIMEOUT_SECONDS: int = max(
        30, min(1800, int(os.getenv("MUSE_RESULT_TIMEOUT_SECONDS", "900")))
    )

    # Voice settings
    DEFAULT_VOICE_VI_FEMALE: str = "vi-VN-HoaiMyNeural"
    DEFAULT_VOICE_VI_MALE: str = "vi-VN-NamMinhNeural"
    DEFAULT_LANGUAGE: str = "vi"

    # Limits
    MAX_SCENES: int = 20
    MAX_CHARACTERS: int = 10
    MAX_DIALOGUE_LENGTH: int = 500  # characters per dialogue

    @classmethod
    def ensure_dirs(cls):
        """Create necessary directories"""
        cls.OUTPUT_DIR.mkdir(parents=True, exist_ok=True)
        cls.TEMP_DIR.mkdir(parents=True, exist_ok=True)
        (cls.TEMP_DIR / "images").mkdir(parents=True, exist_ok=True)
        (cls.TEMP_DIR / "videos").mkdir(parents=True, exist_ok=True)
        (cls.TEMP_DIR / "voices").mkdir(parents=True, exist_ok=True)
        (cls.TEMP_DIR / "composed").mkdir(parents=True, exist_ok=True)

    def has_google_api(self) -> bool:
        return bool(self.GOOGLE_API_KEY and self.GOOGLE_API_KEY != "your_google_api_key_here")

    def has_openai_api(self) -> bool:
        return bool(self.OPENAI_API_KEY and self.OPENAI_API_KEY != "your_openai_api_key_here")

    def has_wavespeed_api(self) -> bool:
        return bool(self.WAVESPEED_API_KEY)

    def has_elevenlabs_api(self) -> bool:
        return bool(self.ELEVENLABS_API_KEY and self.ELEVENLABS_VOICE_ID)


config = Config()
config.ensure_dirs()
