"""Google Flow browser bridge.

This uses a user-launched Chrome session over CDP. It never handles passwords,
CAPTCHAs, or Google cookies. Flow's DOM can change, so selectors are kept
configurable and failures are reported with a useful message.
"""

import asyncio
import base64
import re
import uuid
from pathlib import Path

from config import config


class FlowService:
    def __init__(self):
        self._browser = None
        self._lock = asyncio.Lock()

    async def _connect(self):
        if not config.FLOW_ENABLED:
            raise RuntimeError("FLOW_ENABLED=false. Enable it in .env first.")
        try:
            from playwright.async_api import TimeoutError as PlaywrightTimeoutError  # noqa: F401
            from playwright.async_api import async_playwright
        except ImportError as exc:
            raise RuntimeError("Playwright is not installed. Run: pip install -r requirements.txt && playwright install chromium") from exc
        async with self._lock:
            if self._browser is not None and self._browser.is_connected():
                return self._browser

            self._browser = None
            old_playwright = getattr(self, "_playwright", None)
            if old_playwright is not None:
                try:
                    await old_playwright.stop()
                except Exception:
                    pass
                self._playwright = None

            self._playwright = await async_playwright().start()
            try:
                self._browser = await self._playwright.chromium.connect_over_cdp(config.FLOW_CDP_URL)
            except Exception as exc:
                await self._playwright.stop()
                self._playwright = None
                raise RuntimeError(
                    f"Không thể kết nối Chrome tại {config.FLOW_CDP_URL}. "
                    "Hãy đóng toàn bộ Chrome rồi bấm Gửi prompt vào Flow lần nữa."
                ) from exc
            return self._browser

    async def _fill_prompt(self, page, prompt: str):
        candidates = [
            page.locator('textarea:not([name="g-recaptcha-response"])').first,
            page.locator('[contenteditable="true"]').first,
            page.get_by_placeholder(re.compile("what do you want|bạn muốn tạo|prompt", re.I)).first,
        ]
        for locator in candidates:
            try:
                await locator.wait_for(state="visible", timeout=5000)
                await locator.fill(prompt)
                return
            except Exception:
                continue
        raise RuntimeError("Không tìm thấy ô prompt của Google Flow. Giao diện Flow có thể đã thay đổi.")

    async def _open_project(self, page):
        """Open a Flow workspace because the home page has no prompt editor."""
        await page.goto(config.FLOW_URL, wait_until="domcontentloaded", timeout=60000)
        prompt_editor = page.locator('textarea:not([name="g-recaptcha-response"]), [contenteditable="true"]').first
        try:
            await prompt_editor.wait_for(state="visible", timeout=5000)
            return
        except Exception:
            pass

        new_project = page.get_by_role("button", name=re.compile("new project|dự án mới", re.I)).last
        try:
            await new_project.wait_for(state="visible", timeout=15000)
            await new_project.click()
            await page.wait_for_url(re.compile(r"/project/"), timeout=30000)
            await prompt_editor.wait_for(state="visible", timeout=30000)
        except Exception as exc:
            raise RuntimeError(
                "Không thể mở workspace Google Flow. Hãy kiểm tra tài khoản đã đăng nhập và còn quyền dùng Flow."
            ) from exc

    async def _click_generate(self, page):
        candidates = [
            page.get_by_role("button", name=re.compile("start generation|generate|generation|create|tạo|tạo ảnh", re.I)).last,
            page.locator('button[type="submit"]').last,
            page.locator('button').filter(has_text=re.compile("generate|generation|create|tạo", re.I)).last,
        ]
        for locator in candidates:
            try:
                await locator.wait_for(state="visible", timeout=5000)
                await locator.click()
                return
            except Exception:
                continue
        raise RuntimeError("Không tìm thấy nút tạo ảnh của Google Flow.")

    async def _attach_reference_images(self, page, reference_images: list[str]):
        paths = [str(Path(value).resolve()) for value in reference_images if Path(value).is_file()]
        if not paths:
            return

        # Flow currently keeps a hidden image file input near "Add ingredients".
        image_input = page.locator('input[type="file"][accept*="image"]').last
        try:
            if await image_input.count():
                multiple = await image_input.get_attribute("multiple")
                await image_input.set_input_files(paths if multiple is not None else paths[0])
                await page.wait_for_timeout(1500)
                if multiple is None and len(paths) > 1:
                    for path in paths[1:]:
                        await self._upload_reference_with_menu(page, path)
                return
        except Exception:
            pass

        for path in paths:
            await self._upload_reference_with_menu(page, path)

    async def _upload_reference_with_menu(self, page, path: str):
        add_button = page.get_by_role(
            "button", name=re.compile("add ingredients|add media|thêm thành phần|thêm phương tiện", re.I)
        ).last
        try:
            await add_button.wait_for(state="visible", timeout=10000)
            await add_button.click()
            upload = page.get_by_role(
                "button", name=re.compile("upload media|upload|tải lên", re.I)
            ).last
            await upload.wait_for(state="visible", timeout=5000)
            async with page.expect_file_chooser(timeout=10000) as chooser_info:
                await upload.click()
            chooser = await chooser_info.value
            await chooser.set_files(path)
            add_to_prompt = page.get_by_role(
                "button", name=re.compile("add to prompt|thêm vào câu lệnh|thêm vào prompt", re.I)
            ).last
            await add_to_prompt.wait_for(state="visible", timeout=15000)
            await add_to_prompt.click()
            await page.wait_for_timeout(1200)
        except Exception as exc:
            raise RuntimeError(
                "Flow không nhận được ảnh tham chiếu. Giao diện nút Add ingredients/Upload có thể đã thay đổi."
            ) from exc

    async def submit_prompt(self, scene_id: str, prompt: str, reference_images: list[str] | None = None) -> dict:
        browser = await self._connect()
        context = browser.contexts[0] if browser.contexts else await browser.new_context()
        page = await context.new_page()
        try:
            await self._open_project(page)
            await self._attach_reference_images(page, reference_images or [])
            await self._fill_prompt(page, prompt)
            await self._click_generate(page)
            # Flow generation is asynchronous. Try to download the first generated
            # media when its Download button appears; otherwise leave the tab open.
            media_path = await self._try_download_result(page, scene_id)
            result = {"scene_id": scene_id, "status": "done" if media_path else "submitted",
                      "message": "Đã tạo và tải media từ Flow" if media_path else "Prompt đã được gửi vào Flow"}
            if media_path:
                result["file_path"] = media_path
                result["media_type"] = "image" if media_path.lower().endswith(('.jpg', '.jpeg', '.png', '.webp')) else "video"
            return result
        except Exception:
            await page.close()
            raise

    async def _try_download_result(self, page, scene_id: str) -> str:
        output_dir = config.TEMP_DIR / "flow"
        output_dir.mkdir(parents=True, exist_ok=True)
        # The current Flow UI exposes Download as a menu and does not emit a
        # browser download when that menu is opened. The generated image itself
        # uses a signed flow-content.google URL, so fetch it inside the logged-in
        # page and return the bytes to Python.
        for _ in range(180):
            image = page.locator('img[src*="flow-content.google"]').last
            try:
                if await image.is_visible(timeout=250):
                    source = await image.get_attribute("src")
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
                        }""",
                        source,
                    )
                    media_type = (payload.get("type") or "image/jpeg").lower()
                    suffixes = {
                        "image/jpeg": ".jpg",
                        "image/png": ".png",
                        "image/webp": ".webp",
                    }
                    suffix = suffixes.get(media_type, ".jpg")
                    encoded = payload["dataUrl"].split(",", 1)[1]
                    content = base64.b64decode(encoded)
                    if len(content) < 1024:
                        raise RuntimeError("Flow returned an empty image")
                    target = output_dir / f"{scene_id}_{uuid.uuid4().hex[:8]}{suffix}"
                    target.write_bytes(content)
                    return str(target)
            except Exception:
                pass
            await page.wait_for_timeout(1000)
        return ""

    async def submit_many(self, prompts: list[dict]) -> list[dict]:
        semaphore = asyncio.Semaphore(config.FLOW_CONCURRENCY)

        async def worker(item):
            async with semaphore:
                try:
                    return await self.submit_prompt(
                        item["scene_id"],
                        item["prompt"],
                        reference_images=item.get("reference_images") or [],
                    )
                except Exception as exc:
                    return {"scene_id": item["scene_id"], "status": "error", "error": str(exc)}

        return await asyncio.gather(*(worker(item) for item in prompts))


flow_service = FlowService()
