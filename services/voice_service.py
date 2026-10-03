"""ElevenLabs-only text-to-speech service."""

import asyncio
import hashlib
import re
from pathlib import Path

import httpx

from config import config


class VoiceService:
    """Generate and cache narration through ElevenLabs."""

    API_BASE = "https://api.elevenlabs.io/v1"

    def __init__(self):
        self.output_dir = config.TEMP_DIR / "voices"
        self.output_dir.mkdir(parents=True, exist_ok=True)
        self.api_key = getattr(config, "ELEVENLABS_API_KEY", "")
        self.voice_id = getattr(config, "ELEVENLABS_VOICE_ID", "")
        self.model_id = getattr(config, "ELEVENLABS_MODEL_ID", "eleven_multilingual_v2")
        self.output_format = getattr(config, "ELEVENLABS_OUTPUT_FORMAT", "mp3_44100_128")
        self.stability = getattr(config, "ELEVENLABS_STABILITY", 0.5)
        self.similarity_boost = getattr(config, "ELEVENLABS_SIMILARITY_BOOST", 0.75)
        self.style = getattr(config, "ELEVENLABS_STYLE", 0.0)
        self.use_speaker_boost = getattr(config, "ELEVENLABS_SPEAKER_BOOST", True)

    def is_configured(self) -> bool:
        return bool(self.api_key and self.voice_id)

    def _headers(self) -> dict[str, str]:
        return {
            "xi-api-key": self.api_key,
            "Content-Type": "application/json",
            "Accept": "audio/mpeg",
        }

    @staticmethod
    def _retry_after_seconds(response: httpx.Response, message: str) -> float:
        header = response.headers.get("retry-after", "").strip()
        if header:
            try:
                return min(max(float(header), 1.0), 60.0)
            except ValueError:
                pass
        match = re.search(r"(?:retry|try again).*?(\d+(?:\.\d+)?)\s*s", message, re.I)
        return min(float(match.group(1)) + 1.0, 60.0) if match else 5.0

    @staticmethod
    def _error_message(response: httpx.Response) -> str:
        try:
            payload = response.json()
            detail = payload.get("detail", payload) if isinstance(payload, dict) else payload
            if isinstance(detail, dict):
                message = detail.get("message") or detail.get("status") or str(detail)
            else:
                message = str(detail)
        except Exception:
            message = response.text[:500]
        lowered = message.lower()
        if "missing the permission" in lowered:
            permission_match = re.search(r"permission\s+([a-z0-9_]+)", message, re.I)
            permission = permission_match.group(1) if permission_match else "cần thiết"
            return (
                f"API Key ElevenLabs thiếu quyền `{permission}`. "
                "Hãy mở ElevenLabs → Developers → API Keys, sửa khóa và bật "
                "Voices: Read cùng Text to Speech: Access."
            )
        if response.status_code in {401, 403}:
            return f"ElevenLabs từ chối API Key hoặc Voice ID ({response.status_code}): {message}"
        if response.status_code == 402:
            return f"Tài khoản ElevenLabs không đủ credit hoặc gói hiện tại không hỗ trợ yêu cầu này: {message}"
        if response.status_code == 429:
            return f"ElevenLabs đang giới hạn tốc độ hoặc đã hết quota: {message}"
        if response.status_code == 422:
            return f"Cấu hình ElevenLabs không hợp lệ: {message}"
        return f"ElevenLabs API lỗi {response.status_code}: {message}"

    async def check_health(self) -> dict:
        if not self.api_key:
            return {"status": "not_configured", "error": "Chưa nhập ElevenLabs API Key"}
        if not self.voice_id:
            return {"status": "not_configured", "error": "Chưa nhập ElevenLabs Voice ID"}
        try:
            async with httpx.AsyncClient(timeout=20) as client:
                response = await client.get(
                    f"{self.API_BASE}/voices/{self.voice_id}",
                    headers={"xi-api-key": self.api_key},
                )
            if response.status_code != 200:
                return {"status": "error", "error": self._error_message(response)}
            voice = response.json()
            return {
                "status": "ok",
                "voice_id": self.voice_id,
                "voice_name": voice.get("name", ""),
                "category": voice.get("category", ""),
                "model_id": self.model_id,
            }
        except Exception as exc:
            return {"status": "error", "error": f"Không thể kết nối ElevenLabs: {exc}"}

    async def synthesize(
        self,
        text: str,
        character_id: str = "default",
        gender: str = "female",
        emotion: str = "neutral",
        voice_ref_path: str = "",
        use_clone: bool = False,
    ) -> dict:
        del character_id, gender, voice_ref_path, use_clone
        clean_text = (text or "").strip()
        if not clean_text:
            raise RuntimeError("Nội dung tạo giọng đang trống")
        if not self.is_configured():
            raise RuntimeError("Chưa cấu hình ElevenLabs API Key và Voice ID")

        cache_source = "|".join([
            self.voice_id,
            self.model_id,
            self.output_format,
            str(self.stability),
            str(self.similarity_boost),
            str(self.style),
            str(self.use_speaker_boost),
            emotion or "neutral",
            clean_text,
        ])
        cache_key = hashlib.sha256(cache_source.encode("utf-8")).hexdigest()[:24]
        output_path = self.output_dir / f"elevenlabs_{cache_key}.mp3"
        if output_path.exists() and output_path.stat().st_size > 1024:
            return {
                "file_path": str(output_path),
                "duration_estimate": max(len(clean_text) / 14.0, 1.0),
                "method": "elevenlabs",
                "model": self.model_id,
                "voice": self.voice_id,
                "cached": True,
            }

        payload = {
            "text": clean_text,
            "model_id": self.model_id,
            "voice_settings": {
                "stability": self.stability,
                "similarity_boost": self.similarity_boost,
                "style": self.style,
                "use_speaker_boost": self.use_speaker_boost,
            },
        }
        url = f"{self.API_BASE}/text-to-speech/{self.voice_id}"
        last_error = ""
        async with httpx.AsyncClient(timeout=180) as client:
            for attempt in range(3):
                try:
                    response = await client.post(
                        url,
                        params={"output_format": self.output_format},
                        headers=self._headers(),
                        json=payload,
                    )
                    if response.status_code == 200:
                        if len(response.content) <= 1024:
                            raise RuntimeError("ElevenLabs trả về tệp âm thanh rỗng")
                        output_path.write_bytes(response.content)
                        return {
                            "file_path": str(output_path),
                            "duration_estimate": max(len(clean_text) / 14.0, 1.0),
                            "method": "elevenlabs",
                            "model": self.model_id,
                            "voice": self.voice_id,
                            "cached": False,
                        }
                    last_error = self._error_message(response)
                    if response.status_code == 429 and attempt < 2:
                        await asyncio.sleep(self._retry_after_seconds(response, last_error))
                        continue
                    raise RuntimeError(last_error)
                except httpx.RequestError as exc:
                    last_error = f"Không thể kết nối ElevenLabs: {exc}"
                    if attempt < 2:
                        await asyncio.sleep(2.0 * (attempt + 1))
                        continue
                    raise RuntimeError(last_error) from exc
                finally:
                    if output_path.exists() and output_path.stat().st_size <= 1024:
                        output_path.unlink(missing_ok=True)
        raise RuntimeError(last_error or "Không thể tạo giọng bằng ElevenLabs")


voice_service = VoiceService()
