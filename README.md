# ToolCreateVideo

ToolCreateVideo là ứng dụng tạo video từ kịch bản. Ứng dụng hỗ trợ phân tích kịch bản JSON/TXT/Markdown/DOCX, chia cảnh KEY/FILLER, gửi prompt sang Google Flow, nhận media từ Flow, tạo giọng đọc, phụ đề, chuyển động Ken Burns và ghép video bằng FFmpeg.

## Yêu cầu

- Windows 10/11.
- Python 3.11 trở lên.
- Google Chrome.
- FFmpeg. Ứng dụng có thể dùng bản FFmpeg đi kèm `imageio-ffmpeg` nếu không tìm thấy FFmpeg trong PATH.
- Tài khoản Google đã truy cập được Google Flow nếu dùng chế độ Flow.

## Cài đặt

Mở PowerShell:

```powershell
cd D:\ToolCreateVideo
python -m pip install -r requirements.txt
python -m playwright install chromium
```

Nếu chưa có `.env`, sao chép `.env.example` thành `.env` rồi chỉnh các giá trị cần thiết.

## Chạy ứng dụng

```powershell
cd D:\ToolCreateVideo
python app.py
```

Mở giao diện tại `http://127.0.0.1:8000`. `start.bat` cũng có thể dùng để cài dependency và chạy ứng dụng.

## Cấu hình Google Flow tự động

Ứng dụng điều khiển Flow qua Chrome Remote Debugging. Đây là cầu nối trình duyệt, không phải Google Flow API.

Trong `.env`:

```env
FLOW_ENABLED=true
FLOW_CDP_URL=http://127.0.0.1:9222
FLOW_URL=https://flow.google.com/
FLOW_CONCURRENCY=3
```

### Phiên đăng nhập Flow

Khi bạn bấm **Gửi prompt vào Flow (3 luồng)**, ứng dụng tự mở một cửa sổ Chrome có cổng điều khiển `9222`. Chrome này dùng hồ sơ riêng tại `storage/flow_chrome`, vì vậy không ảnh hưởng đến cửa sổ Chrome bạn đang dùng.

Trong lần chạy đầu tiên, bấm **Mở các cửa sổ Flow** và đăng nhập Google trong cửa sổ vừa mở. Phiên đăng nhập được lưu lại trong hồ sơ này; các lần sau nút **Gửi prompt vào Flow (3 luồng)** sẽ tự mở Chrome và chạy ngay.

## Quy trình tạo bằng Flow

1. Nhập hoặc tải kịch bản.
2. Bấm **Tạo Project**.
3. Upload ảnh reference cho từng nhân vật.
4. Bấm **AI phân tích bố cục & đồng bộ** để tạo Visual Bible, Character Bible và continuity.
5. Mở **Prompt** tại từng cảnh để xem hoặc chỉnh prompt đã ghép.
6. Bấm **Gửi prompt vào Flow (3 luồng)**. Ứng dụng tự đính kèm ảnh reference của nhân vật xuất hiện trong cảnh.
7. Ứng dụng tải ảnh kết quả từ Flow và gắn vào đúng cảnh.
8. Cảnh nào lỗi có thể chạy lại riêng bằng nút **Tạo lại Flow**.
9. Bấm **Bắt đầu tạo Video** để ghép video cuối cùng.

Prompt được ghép theo cấu trúc cố định gồm phong cách toàn project, nhận dạng và trang phục nhân vật, bố cục, ánh sáng, action beats, continuity và negative prompt. AI chỉ thiết kế dữ liệu hình ảnh; lời thoại và lời dẫn gốc không bị sửa ở bước phân tích bố cục.

Nếu giao diện Flow thay đổi hoặc nút Download không được nhận diện, tác vụ sẽ báo lỗi để bạn kiểm tra lại kết nối và selector Flow.

## Google AI Studio/Gemini API

Gemini API là phương án dự phòng khi không dùng media từ Flow. Cấu hình trong `.env`:

```env
GOOGLE_API_KEY=your_google_api_key_here
IMAGE_MODEL=gemini-3.1-flash-image
VEO_MODEL=veo-3.1-generate-preview
```

Trong giao diện, bấm **Kiểm tra Google API** để kiểm tra khóa và model. Việc tạo nội dung còn phụ thuộc quyền truy cập, quota và billing của project Google.

## Gemini TTS: một giọng đọc cho toàn bộ video

Gemini TTS là provider giọng mặc định. Ứng dụng gửi nguyên văn từng lời dẫn hoặc câu thoại, còn phong cách đọc được đặt riêng trong `speech_metadata` để mô hình không đọc thành tiếng phần chỉ dẫn.

```env
VOICE_PROVIDER=gemini
GEMINI_TTS_MODEL=gemini-3.8-flash-tts
GEMINI_TTS_VOICE=Gacrux
GEMINI_TTS_STYLE=mature Vietnamese narrator, warm, clear, natural pacing, restrained emotion
```

Trong tab **Cài đặt**, chọn model, giọng và phong cách rồi bấm **Lưu Cấu Hình**. Nút **Nghe thử** trả về đúng provider đã dùng. Gemini TTS xuất WAV 24 kHz để ứng dụng đo thời lượng và ghép trực tiếp vào timeline.

Chuỗi dự phòng khi chọn Gemini là:

```text
Gemini TTS → OmniVoice (nếu đã cấu hình) → Edge TTS
```

`gemini-3.8-flash-tts` ưu tiên chất lượng và khả năng diễn đạt. `gemini-3.8-flash-lite-tts` phù hợp khi cần xử lý nhanh hoặc số lượng lớn.

## OmniVoice: một giọng đọc cho toàn bộ video

Ứng dụng dùng một voice clone đã được nạp trên OmniVoice server cho toàn bộ lời dẫn và lời thoại. Nếu OmniVoice không kết nối được, ứng dụng tự chuyển sang Edge TTS và hiển thị cảnh báo khi nghe thử.

### Chuẩn bị OmniVoice server

Theo hướng dẫn của `OmniVoice_TTS_Service_api`, đặt file giọng mẫu trên server và cấu hình:

```env
TTS_API_KEY=your-secret-key
TTS_REF_AUDIO=./voice_sample.wav
TTS_REF_TEXT=Nội dung chính xác được nói trong file mẫu
```

File mẫu nên là WAV rõ tiếng, một người nói, ít tạp âm. Khởi động server và chờ `GET /health` trả về `status: ready` cùng `voice_prompt_ready: true`.

### Kết nối ToolCreateVideo

Trong tab **Cài đặt**:

1. Nhập URL OmniVoice, ví dụ `http://127.0.0.1:8100` hoặc URL HTTPS của Colab/Ngrok.
2. Nhập API key trùng với `TTS_API_KEY` trên server.
3. Đặt `num_step`: 16 để ưu tiên tốc độ, 32 để cân bằng, hoặc 48–64 để tăng chất lượng.
4. Đặt tốc độ đọc, mặc định `1.0`.
5. Bấm **Lưu Cấu Hình**, sau đó **Kiểm tra OmniVoice**.
6. Dùng **Nghe thử** và kiểm tra thông báo xác nhận audio được tạo bằng OmniVoice.

Cấu hình tương ứng trong `.env`:

```env
OMNIVOICE_URL=http://127.0.0.1:8100
OMNIVOICE_API_KEY=your-secret-key
OMNIVOICE_NUM_STEP=32
OMNIVOICE_SPEED=1.0
```

Client gọi `POST /synthesize` với header `X-TTS-API-Key`. Voice clone được quản lý ở OmniVoice server; ToolCreateVideo chỉ gửi nội dung cần đọc và nhận WAV để ghép timeline.

## Xử lý lỗi thường gặp

### `ResolutionImpossible` khi cài package

```powershell
python -m pip install --upgrade pip
python -m pip install -r requirements.txt
```

Project đã đặt các phiên bản tương thích với Google GenAI và Python 3.13.

### Flow không mở hoặc không nhận prompt

- Kiểm tra `.env` có `FLOW_ENABLED=true`.
- Đảm bảo đã đăng nhập trong đúng cửa sổ Chrome Flow do ứng dụng mở.
- Đóng cửa sổ Chrome Flow, khởi động lại `python app.py`, rồi bấm gửi lại.
- Thông báo lỗi trên giao diện sẽ hiển thị nguyên nhân của cảnh thất bại đầu tiên.

### `Google image generation failed` hoặc `quota exceeded`

Đây là lỗi quota hoặc quyền truy cập model của Google API. Flow credits và Gemini API quota là hai hệ thống riêng.

## Bảo mật

- Không đưa `.env` lên GitHub.
- Chrome Remote Debugging chỉ nên lắng nghe trên `127.0.0.1`.
- Không chia sẻ cổng `9222` ra Internet.
- Không tắt CAPTCHA hoặc vượt qua bước xác thực Google.

## Kiểm tra project

```powershell
python -m pytest -q
python -m compileall -q app.py core services
node --check static\js\app.js
```
