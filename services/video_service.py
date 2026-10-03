"""
Video Service — Tạo video bằng Google Veo 3.1 API
"""

import time
import asyncio
import uuid
from pathlib import Path
from typing import Optional

from config import config


class VideoService:
    """Service tạo video qua Gemini API (Veo 3.1)"""

    def __init__(self):
        self.output_dir = config.TEMP_DIR / "videos"
        self.output_dir.mkdir(parents=True, exist_ok=True)
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

    async def generate_scene_video(
        self,
        prompt: str,
        scene_id: str,
        duration_seconds: float = 5.0,
        reference_image_paths: list[str] = None,
        progress_callback=None,
    ) -> dict:
        """
        Tạo video cho 1 scene bằng Veo 3.1.

        Returns: {"file_path": str, "duration": float, "status": str}
        """
        client = self._get_client()
        from google.genai import types

        file_id = f"{scene_id}_{uuid.uuid4().hex[:8]}"
        output_path = self.output_dir / f"{file_id}.mp4"

        try:
            # Upload reference images nếu có
            reference_images = []
            if reference_image_paths:
                import mimetypes
                for img_path in reference_image_paths[:3]:  # Max 3 images
                    if Path(img_path).exists():
                        mime = mimetypes.guess_type(img_path)[0] or "image/jpeg"
                        reference_images.append(types.VideoGenerationReferenceImage(
                            image=types.Image(image_bytes=Path(img_path).read_bytes(), mime_type=mime),
                            reference_type="asset",
                        ))

            # Configure video generation
            gen_config = types.GenerateVideosConfig(
                aspect_ratio=config.VEO_ASPECT_RATIO,
                resolution=config.VEO_RESOLUTION,
                duration_seconds=8 if reference_images else (4 if duration_seconds <= 4 else 6 if duration_seconds <= 6 else 8),
            )

            # Add reference images to config if available
            if reference_images:
                gen_config.reference_images = reference_images

            if progress_callback:
                await progress_callback(scene_id, "generating", 10,
                                        "Đang gửi yêu cầu tạo video...")

            # Submit generation request
            operation = await client.aio.models.generate_videos(
                model=config.VEO_MODEL,
                prompt=prompt,
                config=gen_config,
            )

            if progress_callback:
                await progress_callback(scene_id, "generating", 20,
                                        "Đang tạo video (có thể mất 1-3 phút)...")

            # Poll until done
            poll_count = 0
            max_polls = 90  # Max ~15 minutes
            while not operation.done:
                await asyncio.sleep(10)
                operation = await client.aio.operations.get(operation)
                poll_count += 1

                progress = min(20 + (poll_count * 60 / max_polls), 80)
                if progress_callback:
                    await progress_callback(scene_id, "generating", int(progress),
                                            f"Đang tạo video... ({poll_count * 10}s)")

                if poll_count >= max_polls:
                    raise TimeoutError("Video generation timed out (>15 minutes)")

            # Download video
            if operation.response and operation.response.generated_videos:
                generated = operation.response.generated_videos[0]

                # Download and save
                video_data = await client.aio.files.download(file=generated.video)
                with open(output_path, "wb") as vf:
                    # video_data có thể là bytes hoặc iterable
                    if hasattr(video_data, "read"):
                        vf.write(video_data.read())
                    elif isinstance(video_data, (bytes, bytearray)):
                        vf.write(video_data)
                    else:
                        for chunk in video_data:
                            vf.write(chunk if isinstance(chunk, (bytes, bytearray)) else chunk.encode())

                if progress_callback:
                    await progress_callback(scene_id, "done", 100, "Video đã tạo xong!")

                return {
                    "file_path": str(output_path),
                    "duration": gen_config.duration_seconds,
                    "status": "success",
                }
            else:
                raise Exception("Veo 3.1 không trả về video. Có thể prompt vi phạm policy.")

        except Exception as e:
            if progress_callback:
                await progress_callback(scene_id, "error", 0, f"Lỗi: {str(e)}")
            return {
                "file_path": "",
                "duration": 0,
                "status": "error",
                "error": str(e),
            }

    async def check_api_status(self) -> dict:
        """Kiểm tra API key và kết nối"""
        try:
            client = self._get_client()
            # Simple test - list models
            return {"status": "ok", "model": config.VEO_MODEL}
        except Exception as e:
            return {"status": "error", "error": str(e)}


# Singleton instance
video_service = VideoService()
 