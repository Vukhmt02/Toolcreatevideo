"""Browser bridge for generating and downloading video from Muse."""

import asyncio
import base64
import hashlib
import inspect
import re
import subprocess
import uuid
from collections.abc import Callable
from pathlib import Path

from config import config
from services.content_verifier import verify_scene_content


class MuseService:
    CAPTURE_VERSION = "muse-result-v3"

    def __init__(self):
        self._browser = None
        self._playwright = None
        self._lock = asyncio.Lock()
        # Muse tabs share one signed-in conversation/history. A result from a
        # concurrent prompt can otherwise appear as a "new" result in both tabs.
        self._generation_lock = asyncio.Lock()
        self._used_result_keys: set[str] = set()

    @staticmethod
    async def _notify(callback: Callable | None, payload: dict) -> None:
        """Run a callback without allowing a disconnected UI to stop Muse."""
        if callback is None:
            return
        try:
            result = callback(payload)
            if inspect.isawaitable(result):
                await result
        except Exception:
            pass

    @staticmethod
    def validate_generated_video(path_value: str) -> tuple[bool, str]:
        """Reject Muse's square avatar/placeholder clips and corrupt downloads."""
        path = Path(path_value)
        if not path.is_file() or path.stat().st_size < 1024:
            return False, "tệp video không tồn tại hoặc bị rỗng"
        try:
            probe = subprocess.run(
                [config.FFMPEG_PATH, "-hide_banner", "-i", str(path)],
                capture_output=True, text=True, timeout=20,
            )
            details = (probe.stderr or "") + (probe.stdout or "")
        except Exception as exc:
            return False, f"không đọc được thông tin video: {exc}"
        dimensions = [
            (int(width), int(height))
            for width, height in re.findall(r"(?<!\d)(\d{3,5})x(\d{3,5})(?!\d)", details)
        ]
        if not dimensions:
            return False, "không xác định được kích thước video"
        width, height = max(dimensions, key=lambda item: item[0] * item[1])
        if width < 640 or height < 360 or width / max(height, 1) < 1.3:
            return False, f"video {width}x{height} là avatar/placeholder, không phải kết quả 16:9"
        return True, ""

    async def _connect(self):
        if not config.MUSE_ENABLED:
            raise RuntimeError("MUSE_ENABLED=false. Hãy bật Muse trong file .env trước.")
        try:
            from playwright.async_api import async_playwright
        except ImportError as exc:
            raise RuntimeError("Playwright chưa được cài đặt. Chạy: pip install -r requirements.txt") from exc
        async with self._lock:
            if self._browser is not None and self._browser.is_connected():
                return self._browser
            if self._playwright is not None:
                try:
                    await self._playwright.stop()
                except Exception:
                    pass
            self._playwright = await async_playwright().start()
            try:
                self._browser = await self._playwright.chromium.connect_over_cdp(config.MUSE_CDP_URL)
            except Exception as exc:
                await self._playwright.stop()
                self._playwright = None
                raise RuntimeError(
                    f"Không thể kết nối Chrome Muse tại {config.MUSE_CDP_URL}. Hãy bấm Mở Muse rồi thử lại."
                ) from exc
            return self._browser

    async def open_home(self) -> dict:
        browser = await self._connect()
        context = browser.contexts[0] if browser.contexts else await browser.new_context()
        for page in context.pages:
            if "muse.ai" in (page.url or ""):
                await page.bring_to_front()
                return {"status": "connected", "message": "Đã chuyển tới tab Muse đang mở."}
        page = await context.new_page()
        await page.goto(config.MUSE_URL, wait_until="domcontentloaded", timeout=60000)
        await page.bring_to_front()
        return {"status": "started", "message": "Đã mở Muse trong Chrome đang đăng nhập Google."}

    @staticmethod
    async def _fill_prompt(page, prompt: str) -> None:
        candidates = [
            page.locator('textarea:not([name="g-recaptcha-response"])').last,
            page.get_by_placeholder(re.compile("message|ask muse|what.*do|describe|prompt|nhắn|mô tả", re.I)).last,
            page.locator('[contenteditable="true"]').last,
        ]
        for locator in candidates:
            try:
                await locator.wait_for(state="visible", timeout=5000)
                await locator.fill(prompt)
                return
            except Exception:
                continue
        raise RuntimeError("Không tìm thấy ô nhập lệnh của Muse. Hãy kiểm tra đăng nhập và giao diện Muse.")

    @staticmethod
    async def _submit(page) -> None:
        candidates = [
            page.get_by_role("button", name=re.compile(
                "create video|generate video|generate|send|submit|tạo video|gửi", re.I
            )).last,
            page.locator('button[type="submit"]').last,
            page.locator('button[aria-label*="send" i]').last,
        ]
        for locator in candidates:
            try:
                await locator.wait_for(state="visible", timeout=4000)
                if await locator.is_enabled():
                    await locator.click()
                    return
            except Exception:
                continue
        try:
            await page.keyboard.press("Enter")
        except Exception as exc:
            raise RuntimeError("Không tìm thấy nút gửi lệnh trên Muse.") from exc

    @staticmethod
    async def _video_results(page) -> list[dict]:
        try:
            # Muse also has a looping avatar video. Only media-generation
            # wrappers represent results created from a user prompt.
            values = await page.locator(
                '[data-hatch-video-wrapper="true"]'
            ).evaluate_all(
                """wrappers => wrappers.map((wrapper) => {
                    const video = wrapper.querySelector('video');
                    const source = video?.currentSrc || video?.src ||
                        video?.querySelector('source')?.src || '';
                    const identity = [wrapper.getAttribute('aria-label') || '',
                        wrapper.getAttribute('data-testid') || '',
                        wrapper.querySelector('a[download]')?.href || '', source].join(' ');
                    const stableName = identity.match(/media-generation-[^\\s]+\\.(?:mp4|webm|mov)/i)?.[0] || '';
                    return {key: stableName, source};
                }).filter(item => item.key && item.source)"""
            )
            return values
        except Exception:
            return []

    @classmethod
    async def _video_sources(cls, page) -> set[str]:
        return {item["source"] for item in await cls._video_results(page)}

    async def _settled_existing_result_keys(self, page) -> set[str]:
        """Let lazy chat history load, then freeze every pre-prompt video as old."""
        seen: set[str] = set()
        unchanged_rounds = 0
        previous_count = -1
        for _ in range(15):
            current = await self._video_results(page)
            seen.update(item["key"] for item in current)
            if len(seen) == previous_count:
                unchanged_rounds += 1
            else:
                unchanged_rounds = 0
                previous_count = len(seen)
            if unchanged_rounds >= 4:
                break
            await page.wait_for_timeout(1000)
        return seen

    async def _save_video_source(self, page, source: str, scene_id: str) -> str:
        mime = "video/mp4"
        content = b""
        if source.startswith(("http://", "https://")):
            try:
                response = await page.context.request.get(source, headers={"Referer": page.url}, timeout=60000)
                if response.ok:
                    mime = (response.headers.get("content-type") or mime).split(";", 1)[0].lower()
                    content = await response.body()
            except Exception:
                content = b""
        if not content:
            payload = await page.evaluate(
                """async (url) => {
                    const response = await fetch(url);
                    if (!response.ok) throw new Error(`HTTP ${response.status}`);
                    const blob = await response.blob();
                    const dataUrl = await new Promise((resolve, reject) => {
                        const reader = new FileReader();
                        reader.onload = () => resolve(reader.result);
                        reader.onerror = () => reject(reader.error);
                        reader.readAsDataURL(blob);
                    });
                    return {type: blob.type, dataUrl};
                }""", source
            )
            mime = (payload.get("type") or mime).split(";", 1)[0].lower()
            content = base64.b64decode(payload["dataUrl"].split(",", 1)[1])
        if len(content) < 1024:
            raise RuntimeError("Muse trả về tệp video rỗng")
        suffix = {"video/webm": ".webm", "video/quicktime": ".mov"}.get(mime, ".mp4")
        output_dir = config.TEMP_DIR / "muse"
        output_dir.mkdir(parents=True, exist_ok=True)
        target = output_dir / f"{scene_id}_{uuid.uuid4().hex[:8]}{suffix}"
        target.write_bytes(content)
        valid, reason = self.validate_generated_video(str(target))
        if not valid:
            target.unlink(missing_ok=True)
            raise RuntimeError(f"Muse trả về media không hợp lệ: {reason}")
        return str(target)

    @staticmethod
    async def _visible_generation_error(page) -> str:
        """Read a Muse failure toast instead of waiting until the full timeout."""
        try:
            messages = await page.locator(
                '[role="alert"], [aria-live="assertive"], [data-sonner-toast]'
            ).all_inner_texts()
        except Exception:
            return ""
        failure = re.compile(
            r"failed|couldn['’]?t generate|unable to generate|generation error|"
            r"insufficient credits|out of credits|content policy|safety policy|"
            r"không thể tạo|tạo thất bại|hết.*credit",
            re.I,
        )
        for message in reversed(messages):
            cleaned = " ".join(message.split())
            if cleaned and failure.search(cleaned):
                return cleaned[:500]
        return ""

    async def _try_download_result(
        self, page, scene_id: str, previous_result_keys: set[str],
        progress_callback: Callable | None = None,
    ) -> str:
        last_error = ""
        attempted_sources: set[tuple[str, str]] = set()
        attempts_by_key: dict[str, int] = {}
        for elapsed in range(config.MUSE_RESULT_TIMEOUT_SECONDS):
            if elapsed % 10 == 0:
                progress = min(90, 20 + int(70 * elapsed / config.MUSE_RESULT_TIMEOUT_SECONDS))
                await self._notify(progress_callback, {
                    "scene_id": scene_id,
                    "status": "processing",
                    "progress": progress,
                    "message": f"Muse đang tạo hoặc chuẩn bị video ({elapsed}s)...",
                })
                visible_error = await self._visible_generation_error(page)
                if visible_error:
                    raise RuntimeError(f"Muse báo lỗi: {visible_error}")
            # Lazy history media commonly appears during the first seconds.
            # A newly generated Muse video takes longer and is appended after it.
            if elapsed < 15:
                await page.wait_for_timeout(1000)
                continue
            results = await self._video_results(page)
            new_results = [item for item in results
                           if item["key"] not in previous_result_keys
                           and item["key"] not in self._used_result_keys]
            for item in reversed(new_results):
                candidate = (item["key"], item["source"])
                if candidate in attempted_sources or attempts_by_key.get(item["key"], 0) >= 3:
                    continue
                attempted_sources.add(candidate)
                attempts_by_key[item["key"]] = attempts_by_key.get(item["key"], 0) + 1
                try:
                    media_path = await self._save_video_source(page, item["source"], scene_id)
                    self._used_result_keys.add(item["key"])
                    return media_path
                except Exception as exc:
                    last_error = f"{type(exc).__name__}: {exc}"
            await page.wait_for_timeout(1000)
        detail = f" Chi tiết cuối: {last_error}" if last_error else ""
        raise RuntimeError(
            f"Hết thời gian chờ Muse sau {config.MUSE_RESULT_TIMEOUT_SECONDS} giây; "
            f"tool chưa tìm thấy video để tải về.{detail}"
        )

    async def submit_prompt(self, scene_id: str, prompt: str,
                            reference_images: list[str] | None = None,
                            progress_callback: Callable | None = None) -> dict:
        async with self._generation_lock:
            return await self._submit_prompt_unlocked(
                scene_id, prompt, reference_images, progress_callback,
            )

    async def _submit_prompt_unlocked(self, scene_id: str, prompt: str,
                                      reference_images: list[str] | None = None,
                                      progress_callback: Callable | None = None) -> dict:
        if not config.has_google_api():
            raise RuntimeError("Cần Google API Key để kiểm tra video Muse có đúng kịch bản trước khi tạo")
        await self._notify(progress_callback, {
            "scene_id": scene_id, "status": "processing", "progress": 5,
            "message": "Đang mở một tab Muse cho cảnh này...",
        })
        browser = await self._connect()
        context = browser.contexts[0] if browser.contexts else await browser.new_context()
        page = await context.new_page()
        try:
            await page.goto(config.MUSE_URL, wait_until="domcontentloaded", timeout=60000)
            await page.wait_for_timeout(1500)
            previous_result_keys = await self._settled_existing_result_keys(page)
            video_prompt = (
                "Create one downloadable cinematic video clip that depicts only the scene below. "
                "Use 16:9 landscape, no captions, no visible logo, no spoken dialogue. "
                "Follow the required setting, named characters and visible actions in order. "
                "Dialogue supplies current-scene emotion, not an instruction to show a flashback. "
                "Preserve identity, wardrobe, location layout, lighting and fixed props. "
                "Do not substitute stock footage or unrelated action. Scene prompt:\n" + prompt
            )
            await self._fill_prompt(page, video_prompt)
            await self._submit(page)
            await self._notify(progress_callback, {
                "scene_id": scene_id, "status": "processing", "progress": 20,
                "message": "Đã gửi prompt; đang chờ Muse tạo video...",
            })
            media_path = await self._try_download_result(
                page, scene_id, previous_result_keys, progress_callback,
            )
            await self._notify(progress_callback, {
                "scene_id": scene_id, "status": "processing", "progress": 94,
                "message": "Đang đối chiếu hình ảnh video với kịch bản cảnh...",
            })
            verdict = await verify_scene_content(media_path, prompt)
            if verdict.status != "match":
                raise RuntimeError(
                    f"Video Muse chưa khớp kịch bản ({verdict.status}): {verdict.reason}"
                )
            return {"scene_id": scene_id, "status": "done", "file_path": media_path,
                    "media_type": "video", "provider": "muse",
                    "content_check": verdict.status,
                    "content_check_reason": verdict.reason,
                    "content_check_prompt_hash": hashlib.sha256(prompt.encode("utf-8")).hexdigest(),
                    "message": "Đã tạo và tải video từ Muse"}
        finally:
            await page.close()

    async def submit_many(self, prompts: list[dict], on_result: Callable | None = None,
                          on_progress: Callable | None = None) -> list[dict]:
        semaphore = asyncio.Semaphore(1)

        async def worker(item):
            await self._notify(on_progress, {
                "scene_id": item["scene_id"], "status": "processing", "progress": 1,
                "message": "Đang xếp hàng gửi sang Muse...",
            })
            async with semaphore:
                try:
                    result = await self.submit_prompt(
                        item["scene_id"], item["prompt"], item.get("reference_images") or [],
                        progress_callback=on_progress,
                    )
                except Exception as exc:
                    result = {"scene_id": item["scene_id"], "status": "error",
                              "provider": "muse", "error": str(exc)}
                await self._notify(on_result, result)
                return result
        return await asyncio.gather(*(worker(item) for item in prompts))


muse_service = MuseService()
