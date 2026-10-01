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

    # OmniVoice TTS Service (self-host, github.com/Le-Ngoc-Tu/OmniVoice_TTS_Service_api)
    # URL server OmniVoice chạy trên Colab/GPU (ví dụ: https://xxxx.ngrok-free.app)
    OMNIVOICE_URL: str = os.getenv("OMNIVOICE_URL", "")
    # API key của OmniVoice server (khớp với TTS_API_KEY trong .env của server)
    OMNIVOICE_API_KEY: str = os.getenv("OMNIVOICE_API_KEY", "")
    OMNIVOICE_NUM_STEP: int = max(4, min(64, int(os.getenv("OMNIVOICE_NUM_STEP", "32"))))
    OMNIVOICE_SPEED: float = max(0.5, min(2.0, float(os.getenv("OMNIVOICE_SPEED", "1.0"))))

    # One narrator voice for the whole video
    VOICE_PROVIDER: str = os.getenv("VOICE_PROVIDER", "gemini").strip().lower()
    GEMINI_TTS_MODEL: str = os.getenv("GEMINI_TTS_MODEL", "gemini-3.8-flash-tts")
    GEMINI_TTS_VOICE: str = os.getenv("GEMINI_TTS_VOICE", "Gacrux")
    GEMINI_TTS_STYLE: str = os.getenv(
        "GEMINI_TTS_STYLE",
        "mature Vietnamese narrator, warm, clear, natural pacing, restrained emotion",
    )

    # Server
    HOST: str = os.getenv("HOST", "127.0.0.1")
    PORT: int = int(os.getenv("PORT", "8000"))

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

    @classmethod
    def has_google_api(cls) -> bool:
        return bool(cls.GOOGLE_API_KEY and cls.GOOGLE_API_KEY != "your_google_api_key_here")

    @classmethod
    def has_wavespeed_api(cls) -> bool:
        return bool(cls.WAVESPEED_API_KEY)

    @classmethod
    def has_omnivoice_api(cls) -> bool:
        """Kiểm tra OmniVoice server đã được cấu hình chưa"""
        return bool(cls.OMNIVOICE_URL)


config = Config()
config.ensure_dirs()
