"""
Voice Service — Tạo giọng nói từ text
- Primary: OmniVoice TTS Service API (self-host trên Colab GPU)
  Repo: github.com/Le-Ngoc-Tu/OmniVoice_TTS_Service_api
  API: POST /synthesize  {text, num_step, speed}
       Header: X-TTS-API-Key: <TTS_API_KEY>
- Fallback: Edge TTS (miễn phí, không cần GPU)
"""

import asyncio
import base64
import hashlib
import re
import uuid
import wave
from pathlib import Path
from typing import Optional

import edge_tts
import httpx

from config import config


class VoiceService:
    """Service quản lý tạo giọng nói"""

    # Edge TTS voices cho tiếng Việt (fallback)
    EDGE_VOICES = {
        "female": "vi-VN-HoaiMyNeural",
        "male": "vi-VN-NamMinhNeural",
    }

    def __init__(self):
        self.output_dir = config.TEMP_DIR / "voices"
        self.output_dir.mkdir(parents=True, exist_ok=True)

        # OmniVoice server URL và API key (từ .env)
        self.omnivoice_url = getattr(config, "OMNIVOICE_URL", "").rstrip("/")
        self.omnivoice_api_key = getattr(config, "OMNIVOICE_API_KEY", "")
        self.omnivoice_num_step = getattr(config, "OMNIVOICE_NUM_STEP", 32)
        self.omnivoice_speed = getattr(config, "OMNIVOICE_SPEED", 1.0)
        self.voice_provider = getattr(config, "VOICE_PROVIDER", "gemini")
        self.gemini_tts_model = getattr(config, "GEMINI_TTS_MODEL", "gemini-3.8-flash-tts")
        self.gemini_tts_voice = getattr(config, "GEMINI_TTS_VOICE", "Gacrux")
        self.gemini_tts_style = getattr(config, "GEMINI_TTS_STYLE", "warm, clear Vietnamese narration")

    def _omnivoice_headers(self) -> dict[str, str]:
        headers = {}
        if self.omnivoice_api_key:
            headers["X-TTS-API-Key"] = self.omnivoice_api_key
        return headers

    def has_omnivoice(self) -> bool:
        """Kiểm tra OmniVoice server đã được cấu hình chưa"""
        return bool(self.omnivoice_url)

    async def check_omnivoice_health(self) -> dict:
        """
        Kiểm tra trạng thái OmniVoice server.
        GET /health
        """
        if not self.has_omnivoice():
            return {"status": "not_configured"}
        try:
            async with httpx.AsyncClient(timeout=10) as client:
                resp = await client.get(
                    f"{self.omnivoice_url}/health",
                    headers=self._omnivoice_headers(),
                )
                resp.raise_for_status()
                result = resp.json()
                if not isinstance(result, dict):
                    return {"status": "error", "error": "OmniVoice health response is not an object"}
                return result
        except Exception as e:
            return {"status": "error", "error": str(e)}

    async def synthesize(
        self,
        text: str,
        character_id: str = "default",
        gender: str = "female",
        emotion: str = "neutral",
        voice_ref_path: str = "",
        use_clone: bool = False,
    ) -> dict:
        """
        Tạo audio từ text.

        Thứ tự ưu tiên:
        1. OmniVoice server (nếu OMNIVOICE_URL đã cấu hình)
        2. Edge TTS (fallback miễn phí)

        Returns: {"file_path": str, "duration_estimate": float, "method": str}
        """
        # Ưu tiên OmniVoice nếu đã cấu hình
        provider = (self.voice_provider or "gemini").lower()
        failures = []
        if provider == "gemini":
            if config.has_google_api():
                try:
                    return await self._synthesize_gemini_tts(text, emotion, character_id)
                except Exception as exc:
                    failures.append(f"Gemini TTS: {exc}")
                    print(f"[VOICE] Gemini TTS failed: {exc}, trying fallback")
                    if "per day on Free Tier" in str(exc) and not self.has_omnivoice():
                        raise RuntimeError(
                            "Gemini TTS đã hết giới hạn Free Tier (10 yêu cầu/ngày). "
                            "Dự án nhiều cảnh cần bật billing/nâng quota Gemini hoặc chọn OmniVoice. "
                            f"Chi tiết: {exc}"
                        ) from exc
            else:
                failures.append("Gemini TTS: Google API key is not configured")

        if provider == "edge_tts":
            return await self._synthesize_edge_tts(text, gender, emotion, character_id)

        if self.has_omnivoice():
            try:
                result = await self._synthesize_omnivoice(text, character_id)
                if failures:
                    result["warning"] = "; ".join(failures)
                return result
            except Exception as e:
                failures.append(f"OmniVoice: {e}")
                print(f"[VOICE] OmniVoice failed: {e}, falling back to Edge TTS")

        # Fallback: Edge TTS
        try:
            result = await self._synthesize_edge_tts(text, gender, emotion, character_id)
        except Exception as edge_error:
            if failures:
                raise RuntimeError(
                    "Gemini/OmniVoice failed: " + "; ".join(failures)
                    + f"; Edge TTS fallback failed: {edge_error}"
                ) from edge_error
            raise
        if failures:
            result["warning"] = "; ".join(failures)
        return result

    def _gemini_style_for_emotion(self, emotion: str) -> str:
        styles = {
            "neutral": "natural and balanced",
            "happy": "warm and cheerful",
            "sad": "soft, reflective and slightly slower",
            "angry": "firm and tense without shouting",
            "excited": "energetic with a slightly faster pace",
            "calm": "calm, measured and reassuring",
            "nostalgic": "warm, reflective and nostalgic",
            "gentle": "gentle and intimate",
            "contemplative": "thoughtful with natural pauses",
        }
        selected = "natural and balanced"
        lowered = (emotion or "neutral").lower()
        for key, value in styles.items():
            if key in lowered:
                selected = value
                break
        return f"{self.gemini_tts_style.strip().strip(',')}, {selected}"

    @staticmethod
    def _ensure_wav(audio: bytes, output_path: Path) -> None:
        if audio.startswith(b"RIFF"):
            output_path.write_bytes(audio)
            return
        with wave.open(str(output_path), "wb") as wav_file:
            wav_file.setnchannels(1)
            wav_file.setsampwidth(2)
            wav_file.setframerate(24000)
            wav_file.writeframes(audio)

    @staticmethod
    def _wav_duration(path: Path) -> float:
        with wave.open(str(path), "rb") as wav_file:
            return wav_file.getnframes() / max(wav_file.getframerate(), 1)

    @staticmethod
    def _retry_after_seconds(message: str) -> float:
        match = re.search(r"retry in\s+(\d+(?:\.\d+)?)s", message, re.IGNORECASE)
        if match:
            return min(float(match.group(1)) + 1.0, 60.0)
        return 15.0

    @staticmethod
    def _find_audio_data(value):
        if isinstance(value, dict):
            direct_audio = value.get("output_audio")
            if isinstance(direct_audio, dict) and direct_audio.get("data"):
                return direct_audio["data"]
            value_type = str(value.get("type", "")).lower()
            mime_type = str(value.get("mime_type", value.get("mimeType", ""))).lower()
            if value.get("data") and (value_type in {"audio", "output_audio"} or mime_type.startswith("audio/")):
                return value["data"]
            for child in value.values():
                found = VoiceService._find_audio_data(child)
                if found:
                    return found
        elif isinstance(value, list):
            for child in value:
                found = VoiceService._find_audio_data(child)
                if found:
                    return found
        return None

    async def _synthesize_gemini_tts(
        self,
        text: str,
        emotion: str = "neutral",
        character_id: str = "default",
    ) -> dict:
        """Create exact Vietnamese narration with Gemini single-speaker TTS."""
        cache_source = "|".join([
            self.gemini_tts_model,
            self.gemini_tts_voice,
            self.gemini_tts_style,
            emotion or "neutral",
            text,
        ])
        cache_key = hashlib.sha256(cache_source.encode("utf-8")).hexdigest()[:24]
        output_path = self.output_dir / f"gemini_{cache_key}.wav"
        if output_path.exists() and output_path.stat().st_size > 44:
            try:
                return {
                    "file_path": str(output_path),
                    "duration_estimate": max(self._wav_duration(output_path), 1.0),
                    "method": "gemini_tts",
                    "model": self.gemini_tts_model,
                    "voice": self.gemini_tts_voice,
                    "cached": True,
                }
            except (OSError, wave.Error):
                output_path.unlink(missing_ok=True)
        models = []
        for model in (self.gemini_tts_model, "gemini-3.8-flash-lite-tts"):
            if model and model not in models:
                models.append(model)

        last_error = None
        async with httpx.AsyncClient(timeout=180) as client:
            for model in models:
                for attempt in range(3):
                    try:
                        payload = {
                            "model": model,
                            "input": [{
                                "type": "user_input",
                                "content": [{
                                    "type": "text",
                                    "text": text,
                                    "annotations": [{
                                        "type": "speech_metadata",
                                        "style": self._gemini_style_for_emotion(emotion),
                                    }],
                                }],
                            }],
                            "response_format": {"type": "audio"},
                            "generation_config": {
                                "speech_config": [{"voice": self.gemini_tts_voice}],
                            },
                        }
                        response = await client.post(
                            "https://generativelanguage.googleapis.com/v1beta/interactions",
                            headers={
                                "x-goog-api-key": config.GOOGLE_API_KEY,
                                "Content-Type": "application/json",
                            },
                            json=payload,
                        )
                        if response.status_code != 200:
                            raise RuntimeError(f"HTTP {response.status_code}: {response.text[:500]}")
                        interaction = response.json()
                        data = self._find_audio_data(interaction)
                        if not data:
                            steps = interaction.get("steps") or []
                            step_keys = [sorted(step.keys()) for step in steps if isinstance(step, dict)]
                            raise RuntimeError(
                                f"Gemini TTS returned no audio; status={interaction.get('status')}; "
                                f"step_keys={step_keys}"
                            )
                        audio = base64.b64decode(data) if isinstance(data, str) else bytes(data)
                        if len(audio) <= 44:
                            raise RuntimeError("Gemini TTS returned an empty audio file")
                        self._ensure_wav(audio, output_path)
                        duration = self._wav_duration(output_path)
                        return {
                            "file_path": str(output_path),
                            "duration_estimate": max(duration, 1.0),
                            "method": "gemini_tts",
                            "model": model,
                            "voice": self.gemini_tts_voice,
                            "cached": False,
                        }
                    except Exception as exc:
                        last_error = exc
                        output_path.unlink(missing_ok=True)
                        message = str(exc)
                        print(f"[VOICE] Gemini TTS model {model} attempt {attempt + 1} failed: {message}")
                        daily_free_limit = "per day on Free Tier" in message
                        if not daily_free_limit and ("HTTP 429" in message or "HTTP 503" in message) and attempt < 2:
                            await asyncio.sleep(self._retry_after_seconds(message))
                            continue
                        break
        raise RuntimeError(str(last_error or "Gemini TTS failed"))

    async def _synthesize_omnivoice(
        self,
        text: str,
        character_id: str = "default",
    ) -> dict:
        """
        Tạo giọng nói bằng OmniVoice TTS Service API.

        Endpoint: POST /synthesize
        Headers:  X-TTS-API-Key: <key>
        Body:     {"text": "...", "num_step": 32, "speed": 1.0}
        Response: audio/wav binary

        Ref: github.com/Le-Ngoc-Tu/OmniVoice_TTS_Service_api
        """
        file_id = f"{character_id}_{uuid.uuid4().hex[:8]}"
        output_path = self.output_dir / f"{file_id}.wav"

        headers = {"Content-Type": "application/json", **self._omnivoice_headers()}

        payload = {
            "text": text,
            "num_step": self.omnivoice_num_step,
            "speed": self.omnivoice_speed,
        }

        async with httpx.AsyncClient(timeout=180) as client:
            response = await client.post(
                f"{self.omnivoice_url}/synthesize",
                headers=headers,
                json=payload,
            )

            if response.status_code != 200:
                raise Exception(
                    f"OmniVoice API error {response.status_code}: {response.text[:200]}"
                )

            # Response là binary audio (WAV)
            content_type = response.headers.get("content-type", "").lower()
            if "audio" not in content_type and "octet-stream" not in content_type:
                raise Exception(f"OmniVoice returned unexpected content type: {content_type or 'unknown'}")
            if len(response.content) <= 44:
                raise Exception("OmniVoice returned an empty audio file")

            with open(output_path, "wb") as f:
                f.write(response.content)

        # Tính thời lượng từ kích thước file WAV
        # WAV 24kHz mono 16-bit: duration = filesize / (24000 * 2)
        wav_size = output_path.stat().st_size
        # Header WAV ~44 bytes, còn lại là audio data
        audio_data_size = max(0, wav_size - 44)
        duration_estimate = max(audio_data_size / (24000 * 2), 1.0)

        # Fallback estimate nếu file quá nhỏ
        if duration_estimate < 0.5:
            duration_estimate = max(len(text) / 8.0, 1.0)

        return {
            "file_path": str(output_path),
            "duration_estimate": duration_estimate,
            "method": "omnivoice",
        }

    async def _synthesize_edge_tts(
        self,
        text: str,
        gender: str = "female",
        emotion: str = "neutral",
        character_id: str = "default",
    ) -> dict:
        """Tạo giọng nói bằng Edge TTS (miễn phí, fallback)"""
        voice = self.EDGE_VOICES.get(gender, self.EDGE_VOICES["female"])
        file_id = f"{character_id}_{uuid.uuid4().hex[:8]}"
        output_path = self.output_dir / f"{file_id}.mp3"

        # Điều chỉnh rate/pitch theo emotion
        rate, pitch = self._emotion_to_params(emotion)

        last_error = None
        for attempt in range(3):
            try:
                communicate = edge_tts.Communicate(
                    text=text,
                    voice=voice,
                    rate=rate,
                    pitch=pitch,
                )
                await communicate.save(str(output_path))
                if output_path.exists() and output_path.stat().st_size > 1024:
                    break
                raise RuntimeError("Edge TTS trả về tệp âm thanh rỗng")
            except Exception as exc:
                last_error = exc
                output_path.unlink(missing_ok=True)
                if attempt < 2:
                    await asyncio.sleep(1.5 * (attempt + 1))
        else:
            message = str(last_error)
            if "403" in message or "Invalid response status" in message:
                raise RuntimeError(
                    "Edge TTS bị từ chối kết nối (403). Hãy cập nhật edge-tts và thử lại."
                ) from last_error
            raise RuntimeError(f"Không thể tạo giọng đọc bằng Edge TTS: {message}") from last_error

        # Ước tính duration (tiếng Việt ~4 chars/sec với Edge TTS)
        duration_estimate = max(len(text) / 4.0, 1.0)

        return {
            "file_path": str(output_path),
            "duration_estimate": duration_estimate,
            "method": "edge_tts",
            "voice": voice,
        }

    def _emotion_to_params(self, emotion: str) -> tuple[str, str]:
        """Chuyển emotion thành rate/pitch cho Edge TTS"""
        emotion_map = {
            "neutral": ("+0%", "+0Hz"),
            "happy": ("+10%", "+20Hz"),
            "sad": ("-15%", "-15Hz"),
            "angry": ("+5%", "+10Hz"),
            "excited": ("+15%", "+25Hz"),
            "calm": ("-10%", "-5Hz"),
            "nostalgic": ("-10%", "-10Hz"),
            "gentle": ("-5%", "-5Hz"),
            "contemplative": ("-10%", "-8Hz"),
            "warm": ("+0%", "+5Hz"),
        }

        emotion_lower = emotion.lower()
        for key, params in emotion_map.items():
            if key in emotion_lower:
                return params

        return ("+0%", "+0Hz")  # Default neutral

    async def list_available_voices(self) -> list[dict]:
        """Liệt kê các giọng có sẵn (Edge TTS)"""
        voices = await edge_tts.list_voices()
        vi_voices = [v for v in voices if v["Locale"].startswith("vi")]
        return vi_voices


# Singleton instance
voice_service = VoiceService()
