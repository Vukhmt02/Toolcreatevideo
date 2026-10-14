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
python -m venv .venv
.\.venv\Scripts\Activate.ps1
python -m pip install --upgrade pip
python -m pip install -r requirements.txt
```

Nếu chưa có `.env`, sao chép `.env.example` thành `.env` rồi chỉnh các giá trị cần thiết.

## Chọn mức độ chia cảnh

Trước khi tải TXT, Markdown, DOCX hoặc bấm **Tách đoạn sang JSON**, chọn một chế độ:

- **Ít cảnh:** gộp nhiều nhịp kể liên tiếp, khoảng 12–20 giây/cảnh.
- **Cân bằng:** mặc định, khoảng 8–12 giây/cảnh.
- **Nhiều cảnh:** tách chi tiết theo hành động, khoảng 5–8 giây/cảnh.

Parser giữ nguyên toàn bộ lời dẫn và lời thoại khi gộp. Kịch bản JSON đã chia cảnh thủ công không bị thay đổi bởi lựa chọn này.

## Chạy ứng dụng

```powershell
cd D:\ToolCreateVideo
python app.py
```

Mở giao diện tại `http://127.0.0.1:8000`. `start.bat` cũng có thể dùng để cài dependency và chạy ứng dụng.

## Hàng đợi và tiếp tục tác vụ

- Mỗi yêu cầu ghép timeline được lưu vào `state.json` trước khi đưa vào hàng đợi.
- Mặc định chỉ có một timeline chạy cùng lúc để tránh quá tải FFmpeg, CPU và API.
- Nếu server dừng khi tác vụ đang chạy, lần khởi động sau tác vụ tự quay lại hàng đợi và tiếp tục từ cảnh hoàn thành gần nhất.
- Nếu người dùng chủ động bấm **Dừng**, tác vụ giữ trạng thái tạm dừng và chỉ chạy lại khi bấm **Tiếp tục tác vụ**.
- Có thể đặt `TIMELINE_CONCURRENCY=1`, `2` hoặc `3` trong `.env`; nên giữ giá trị `1` trên máy thông thường.

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

## Quy trình Muse tự phân tích và tạo video

Muse được điều khiển qua cửa sổ Chrome Remote Debugging và dùng phiên đăng nhập trong cùng hồ sơ Chrome với Flow.

```env
MUSE_ENABLED=true
MUSE_CDP_URL=http://127.0.0.1:9222
MUSE_URL=https://muse.ai/
MUSE_CONCURRENCY=1
MUSE_RESULT_TIMEOUT_SECONDS=900
```

1. Nhập kịch bản và tạo project.
2. Bấm **Muse phân tích & tạo video**.
3. Tool gửi nội dung gốc của từng cảnh, lời thoại, hành động, mô tả nhân vật, địa điểm và continuity sang Muse.
4. Muse được yêu cầu tự phân tích, chọn bố cục, tạo prompt nội bộ và tạo video ngay.
5. Tool tải video về, kiểm tra định dạng, kích thước, chống nhận nhầm avatar hoặc video trùng rồi gắn đúng cảnh.
6. Cảnh lỗi có thể chạy riêng bằng nút **Tạo lại Muse**.

Luồng Muse không cần Gemini API để phân tích hoặc xác minh lại video. Nút **AI phân tích bố cục & đồng bộ** vẫn là lựa chọn bổ sung nếu muốn khóa mô tả nhân vật và bối cảnh chi tiết hơn trước khi gửi Muse.

Sau khi nhận đủ video cảnh, chọn một trong hai cách ghép:

- **Tạo video có giọng:** gọi ElevenLabs, ghép lời thoại/lời dẫn và tạo phụ đề.
- **Tạo video không giọng:** không gọi ElevenLabs, không tạo phụ đề và giữ âm thanh gốc của video Muse/Flow nếu có.

Lựa chọn được lưu cùng hàng đợi và checkpoint, nên khi server khởi động lại hoặc tác vụ được tiếp tục, tool vẫn dùng đúng chế độ đã chọn.

## Google AI Studio/Gemini API

Gemini API là phương án dự phòng khi không dùng media từ Flow. Cấu hình trong `.env`:

```env
GOOGLE_API_KEY=your_google_api_key_here
IMAGE_MODEL=gemini-3.1-flash-image
VEO_MODEL=veo-3.1-generate-preview
```

Trong giao diện, bấm **Kiểm tra Google API** để kiểm tra khóa và model. Việc tạo nội dung còn phụ thuộc quyền truy cập, quota và billing của project Google.

## ElevenLabs: một giọng đọc cho toàn bộ video

ElevenLabs là dịch vụ tạo giọng duy nhất. Mỗi đoạn âm thanh được cache theo nội dung, Voice ID, model và thông số giọng. Chạy lại timeline sẽ dùng cache nếu cấu hình và lời thoại không đổi.

```env
ELEVENLABS_API_KEY=your_api_key
ELEVENLABS_VOICE_ID=your_voice_id
ELEVENLABS_MODEL_ID=eleven_multilingual_v2
ELEVENLABS_OUTPUT_FORMAT=mp3_44100_128
ELEVENLABS_STABILITY=0.5
ELEVENLABS_SIMILARITY_BOOST=0.75
ELEVENLABS_STYLE=0.0
ELEVENLABS_SPEAKER_BOOST=true
```

Trong tab **Cài đặt**:

1. Nhập ElevenLabs API Key và Voice ID.
2. Chọn `Multilingual v2` cho lời dẫn dài và ổn định.
3. Bấm **Lưu Cấu Hình** rồi **Kiểm tra ElevenLabs**.
4. Dùng **Nghe thử** trước khi chạy toàn bộ dự án.

Nếu API dừng giữa chừng, các tệp và checkpoint đã tạo vẫn nằm trong cache. Tác vụ chuyển sang trạng thái dừng do lỗi và có thể tiếp tục từ cảnh còn thiếu sau khi quota hoặc cấu hình đã được xử lý.

## Xử lý lỗi thường gặp

### `ResolutionImpossible` khi cài package

```powershell
cd D:\ToolCreateVideo
python -m venv .venv
.\.venv\Scripts\Activate.ps1
python -m pip install --upgrade pip
python -m pip install -r requirements.txt
```

Không cài dependency của dự án vào Python toàn hệ thống. Môi trường `.venv` riêng tránh xung đột với các package Google hoặc YOLO của ứng dụng khác.

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
