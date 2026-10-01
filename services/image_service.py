"""
Image Service — Tạo ảnh bằng Gemini API & hiệu ứng Ken Burns (pan/zoom) bằng FFmpeg
Dành cho các cảnh FILLER (và dự phòng khi Veo 3.1 không khả dụng)
"""

import asyncio
import base64
import os
import subprocess
import urllib.parse
import uuid
from pathlib import Path
from typing import Optional

import httpx
from google.genai import types
from config import config


class ImageService:
    """Service tạo ảnh bằng Gemini và tạo chuyển động Ken Burns cho video"""

    def __init__(self):
        self.image_dir = config.TEMP_DIR / "images"
        self.video_dir = config.TEMP_DIR / "videos"
        self.image_dir.mkdir(parents=True, exist_ok=True)
        self.video_dir.mkdir(parents=True, exist_ok=True)
        self._client = None
        self._client_key = None

    def _get_client(self):
        """Lazy init Google GenAI client"""
        if self._client is None or self._client_key != config.GOOGLE_API_KEY:
            if not config.has_google_api():
                raise ValueError(
                    "Google API Key chưa được cấu hình! "
                    "Vui lòng thêm GOOGLE_API_KEY vào file .env"
                )
            from google import genai
            self._client = genai.Client(api_key=config.GOOGLE_API_KEY)
            self._client_key = config.GOOGLE_API_KEY
        return self._client

    async def generate_scene_image(
        self,
        prompt: str,
        scene_id: str,
        aspect_ratio: str = "16:9",
        progress_callback=None,
    ) -> dict:
        """
        Tạo ảnh cho 1 scene:
        1. Tạo ảnh bằng model Gemini được cấu hình.
        2. Tự động chuyển đổi: AI FLUX / Turbo Generator (chất lượng điện ảnh cao 1280x720, 100% miễn phí).
        3. Dự phòng tối thiểu: Ảnh placeholder nghệ thuật nội bộ (offline).
        """
        file_id = f"{scene_id}_{uuid.uuid4().hex[:8]}"
        output_path = self.image_dir / f"{file_id}.jpg"
        google_error = "Google API key is not configured"

        # ── 1. Tạo ảnh bằng Google Gemini ──
        if config.has_google_api():
            try:
                if progress_callback:
                    await progress_callback(scene_id, "image", 20, "Đang tạo ảnh bằng Google Gemini...")

                client = self._get_client()
                google_model_used = await self._try_google_image_models(client, prompt, output_path, aspect_ratio)
                if google_model_used:
                    if progress_callback:
                        await progress_callback(scene_id, "image", 80, f"Tạo ảnh {google_model_used} thành công!")
                    return {
                        "file_path": str(output_path),
                        "status": "ok",
                        "method": google_model_used,
                    }
                else:
                    google_error = f"{config.IMAGE_MODEL} returned no image"
                    print(f"[GOOGLE IMAGE] {google_error}")
            except Exception as e:
                google_error = str(e)
                print(f"[GOOGLE IMAGE ERROR] {scene_id}: {e}")

            # Imagen is a separate Google image endpoint and may have quota
            # even when the Gemini image model is unavailable.
            if config.IMAGEN_MODEL and config.IMAGEN_MODEL != config.IMAGE_MODEL:
                try:
                    imagen_model_used = await self._try_google_imagen(
                        client, prompt, output_path, aspect_ratio)
                    if imagen_model_used:
                        return {
                            "file_path": str(output_path),
                            "status": "ok",
                            "method": imagen_model_used,
                        }
                except Exception as e:
                    google_error = f"{google_error}; Imagen: {e}"
                    print(f"[GOOGLE IMAGEN ERROR] {scene_id}: {e}")

        # ── 2. AI Fallback: Pollinations API (Tạo ảnh điện ảnh chân thực 16:9) ──
        # Hoạt động mượt mà, ảnh sắc nét 1280x720, không phụ thuộc Google billing
        if not config.ALLOW_IMAGE_FALLBACK:
            return {"file_path": "", "status": "error",
                    "error": f"Google image generation failed: {google_error}"}
        try:
            if progress_callback:
                await progress_callback(scene_id, "image", 40, "Đang tạo ảnh nghệ thuật với AI Generator...")

            ok = await self._generate_ai_fallback_image(prompt, scene_id, output_path)
            if ok and output_path.exists() and output_path.stat().st_size > 5000:
                if progress_callback:
                    await progress_callback(scene_id, "image", 80, "Tạo ảnh AI thành công!")
                return {
                    "file_path": str(output_path),
                    "status": "ok",
                    "method": "ai_generator",
                }
        except Exception as fe:
            print(f"[AI GENERATOR ERROR] {scene_id}: {fe}")

        # ── 3. Dự phòng cuối cùng: Placeholder cục bộ khi mất mạng hoàn toàn ──
        fallback_path = self._generate_fallback_image(scene_id, prompt)
        if fallback_path:
            return {
                "file_path": fallback_path,
                "status": "ok",
                "method": "fallback_local",
                "warning": "Dung anh placeholder du phong do khong co ket noi tao anh AI."
            }

        return {"file_path": "", "status": "error", "error": "Khong the tao anh cho canh"}

    async def _try_google_image_models(self, client, prompt: str, output_path: Path, aspect_ratio: str = "16:9") -> Optional[str]:
        """
        Tạo ảnh bằng model Gemini được cấu hình
        qua API generate_content nếu tài khoản Google có hạn mức tạo ảnh.
        """
        models = []
        for model_name in (
            config.IMAGE_MODEL,
            "gemini-3.1-flash-image-preview",
            "gemini-2.5-flash-image",
        ):
            if model_name and model_name not in models:
                models.append(model_name)
        last_error = None
        for model_name in models:
            try:
                res = await client.aio.models.generate_content(
                    model=model_name,
                    contents=f"Generate a high quality cinematic 16:9 photo: {prompt}",
                    config=types.GenerateContentConfig(
                        response_modalities=["IMAGE"],
                        image_config=types.ImageConfig(aspect_ratio=aspect_ratio),
                    ),
                )
                if res and res.candidates:
                    for candidate in res.candidates:
                        if candidate.content and candidate.content.parts:
                            for part in candidate.content.parts:
                                if hasattr(part, "inline_data") and part.inline_data and part.inline_data.data:
                                    data = part.inline_data.data
                                    if isinstance(data, str):
                                        data = base64.b64decode(data)
                                    with open(output_path, "wb") as f:
                                        f.write(data)
                                    return model_name
            except Exception as e:
                last_error = e
                print(f"[GOOGLE IMAGE MODEL ERROR] {model_name}: {e}")
                continue
        if last_error:
            raise last_error
        return None

    async def _try_google_imagen(self, client, prompt: str, output_path: Path,
                                 aspect_ratio: str = "16:9") -> Optional[str]:
        """Try Google's Imagen generateImages endpoint."""
        result = await asyncio.to_thread(
            client.models.generate_images,
            model=config.IMAGEN_MODEL,
            prompt=f"Create a high quality cinematic photo: {prompt}",
            config=types.GenerateImagesConfig(
                number_of_images=1,
                aspect_ratio=aspect_ratio,
                output_mime_type="image/jpeg",
            ),
        )
        for generated in result.generated_images or []:
            image = generated.image
            if image and image.image_bytes:
                output_path.write_bytes(image.image_bytes)
                return config.IMAGEN_MODEL
        return None

    async def _generate_ai_fallback_image(self, prompt: str, scene_id: str, output_path: Path) -> bool:
        """
        Tạo ảnh AI điện ảnh chất lượng cao bằng Pollinations API.
        Độ phân giải 1280x720 (16:9), sắc nét, không watermark.
        """
        clean_prompt = prompt.replace("\n", " ").strip()
        short_prompt = clean_prompt[:320].strip()
        encoded = urllib.parse.quote(short_prompt)
        seed = int(uuid.uuid4().int % 1000000)

        # Thứ tự các endpoint ưu tiên cao, đã kiểm tra hoạt động ổn định
        urls = [
            f"https://image.pollinations.ai/prompt/{encoded}?width=1280&height=720&nologo=true&seed={seed}",
            f"https://image.pollinations.ai/prompt/{encoded}?width=1024&height=576&nologo=true&seed={seed}",
            f"https://image.pollinations.ai/prompt/{encoded}?model=turbo&nologo=true&seed={seed}",
        ]

        for url in urls:
            try:
                async with httpx.AsyncClient(timeout=35, follow_redirects=True) as http_client:
                    resp = await http_client.get(url)
                    if resp.status_code == 200 and len(resp.content) > 8000:
                        with open(output_path, "wb") as f:
                            f.write(resp.content)
                        return True
            except Exception as ex:
                print(f"[AI IMAGE URL FAILED] {scene_id} -> {ex}")
                continue
        return False

    def _generate_fallback_image(self, scene_id: str, prompt: str) -> str:
        """Tạo ảnh nền dự phòng nếu không có mạng hoặc API key hết quota"""
        try:
            from PIL import Image, ImageDraw, ImageFont

            width, height = 1280, 720
            # Gradient màu điện ảnh tối
            img = Image.new("RGB", (width, height), color=(20, 24, 35))
            draw = ImageDraw.Draw(img)

            # Vẽ các dải gradient mờ
            for y in range(height):
                r = int(18 + (30 - 18) * (y / height))
                g = int(24 + (38 - 24) * (y / height))
                b = int(45 + (60 - 45) * (y / height))
                draw.line([(0, y), (width, y)], fill=(r, g, b))

            # Text bối cảnh
            text_preview = prompt[:120] + ("..." if len(prompt) > 120 else "")
            draw.text((60, height - 100), f"Scene: {scene_id}", fill=(180, 200, 230))
            draw.text((60, height - 70), text_preview, fill=(120, 140, 160))

            out_path = self.image_dir / f"{scene_id}_fallback_{uuid.uuid4().hex[:6]}.jpg"
            img.save(out_path, quality=90)
            return str(out_path)
        except Exception as ex:
            print(f"[FALLBACK IMG ERROR] {ex}")
            return ""

    def create_ken_burns_video(
        self,
        image_path: str,
        duration: float,
        scene_id: str,
        effect: str = "auto",
        output_path: str = "",
    ) -> str:
        """
        Tạo clip MP4 từ ảnh tĩnh với hiệu ứng Ken Burns (pan / zoom chậm) bằng FFmpeg.
        duration: Thời lượng tính bằng giây (khớp với thời lượng audio).
        effect: 'zoom_in', 'zoom_out', 'pan_right', 'pan_left', 'auto'
        """
        if not image_path or not Path(image_path).exists():
            return ""

        duration = max(float(duration), 2.0)
        fps = 24
        total_frames = int(duration * fps)

        if not output_path:
            file_id = f"{scene_id}_kb_{uuid.uuid4().hex[:8]}"
            output_path = str(self.video_dir / f"{file_id}.mp4")

        # Tự động luân phiên hiệu ứng nếu chọn 'auto'
        if effect == "auto":
            effects_pool = ["zoom_in", "zoom_out", "pan_right", "pan_left"]
            idx = sum(ord(c) for c in scene_id) % len(effects_pool)
            effect = effects_pool[idx]

        # Xây dựng zoompan filter
        # scale=1920:1080 trước để zoompan có độ phân giải cao, tránh vỡ hạt
        if effect == "zoom_out":
            zoom_expr = f"max(1.0, 1.15 - 0.15*on/{total_frames})"
            x_expr = "iw/2-(iw/zoom/2)"
            y_expr = "ih/2-(ih/zoom/2)"
        elif effect == "pan_right":
            zoom_expr = "1.15"
            x_expr = f"(iw-iw/zoom)*(on/{total_frames})"
            y_expr = "ih/2-(ih/zoom/2)"
        elif effect == "pan_left":
            zoom_expr = "1.15"
            x_expr = f"(iw-iw/zoom)*(1-on/{total_frames})"
            y_expr = "ih/2-(ih/zoom/2)"
        else:
            # Mặc định: zoom_in (từ 1.0 đến 1.15 mượt mà)
            zoom_expr = f"min(1.0 + 0.15*on/{total_frames}, 1.15)"
            x_expr = "iw/2-(iw/zoom/2)"
            y_expr = "ih/2-(ih/zoom/2)"

        filter_str = (
            f"scale=1920:1080,"
            f"zoompan=z='{zoom_expr}':x='{x_expr}':y='{y_expr}':"
            f"d={total_frames}:s=1280x720:fps={fps}"
        )

        ffmpeg_bin = config.FFMPEG_PATH
        cmd = [
            ffmpeg_bin,
            "-loop", "1",
            "-i", str(image_path),
            "-vf", filter_str,
            "-c:v", "libx264",
            "-t", f"{duration:.3f}",
            "-pix_fmt", "yuv420p",
            "-r", str(fps),
            "-y",
            output_path,
        ]

        try:
            result = subprocess.run(
                cmd,
                capture_output=True,
                text=True,
                encoding="utf-8",
                errors="replace",
                timeout=180,
            )
            if result.returncode != 0:
                print(f"[KEN BURNS ERROR] FFmpeg returned {result.returncode}: {result.stderr[:300]}")
                return ""
            return output_path if Path(output_path).exists() else ""
        except Exception as e:
            print(f"[KEN BURNS EXCEPTION] {e}")
            return ""


# Singleton instance
image_service = ImageService()
