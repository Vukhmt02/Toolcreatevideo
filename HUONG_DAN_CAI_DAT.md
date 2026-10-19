# Hướng dẫn cài đặt ToolCreateVideo

## 1. Yêu cầu

- Windows 10 hoặc Windows 11, bản 64 bit.
- Python 3.11 trở lên. Khi cài Python, chọn **Add Python to PATH**.
- Google Chrome.
- Kết nối Internet.
- API key và tài khoản dịch vụ của chính người sử dụng:
  - Google AI Studio nếu dùng Gemini/Veo.
  - ElevenLabs nếu tạo giọng đọc.
  - Tài khoản đã có quyền dùng Muse hoặc Google Flow nếu chạy các luồng trình duyệt.

## 2. Cài và chạy

1. Giải nén toàn bộ file ZIP vào một thư mục riêng. Không chạy trực tiếp bên trong file ZIP.
2. Bấm đúp `start.bat`.
3. Lần chạy đầu, chương trình tự tạo `.venv`, cài thư viện và tạo `.env` từ `.env.example`.
4. Nhập API key trong phần **Cấu hình API** trên giao diện hoặc đóng ứng dụng rồi điền vào file `.env`.
5. Mở `http://127.0.0.1:8000` nếu trình duyệt không tự mở.

Lần cài đầu có thể mất vài phút vì máy phải tải các thư viện Python và FFmpeg đi kèm `imageio-ffmpeg`.

## 3. Dùng Muse hoặc Google Flow

1. Trong giao diện, bấm nút mở Muse hoặc Flow.
2. Chrome điều khiển riêng sẽ mở bằng cổng `9222`.
3. Đăng nhập tài khoản của người sử dụng trong cửa sổ Chrome này ở lần đầu.
4. Phiên đăng nhập được giữ trên chính máy đó cho những lần sau.

Không sao chép hồ sơ Chrome từ máy người đóng gói sang máy khác. Mỗi người cần đăng nhập tài khoản của mình.

## 4. Dữ liệu được lưu ở đâu

- Dự án và video xuất: `storage/projects`.
- File tạm, giọng đọc và video trung gian: `storage/temp`.
- Phiên Chrome điều khiển: `storage/flow_chrome` và `storage/muse_chrome`.
- Cấu hình và API key: `.env`.

Muốn chuyển riêng một dự án sang máy khác, hãy đóng ứng dụng rồi sao chép đúng thư mục dự án trong `storage/projects` và các media liên quan.

## 5. Lỗi thường gặp

### Windows báo không tìm thấy Python

Cài lại Python và bật **Add Python to PATH**, sau đó mở lại `start.bat`.

### Cài thư viện thất bại

Mở Command Prompt trong thư mục tool rồi chạy:

```bat
.venv\Scripts\python.exe -m pip install --upgrade pip
.venv\Scripts\python.exe -m pip install -r requirements.txt
```

### Muse hoặc Flow yêu cầu đăng nhập

Đăng nhập trong đúng cửa sổ Chrome do tool mở. Phiên đăng nhập Chrome thông thường không tự chuyển sang hồ sơ điều khiển của tool.

### Cổng 8000 hoặc 9222 đang được sử dụng

Đóng phiên ToolCreateVideo hoặc cửa sổ Chrome điều khiển đang chạy trước đó, sau đó chạy lại `start.bat`.

## 6. Bảo mật

Không gửi cho người khác các mục sau:

- `.env` vì chứa API key.
- `storage/flow_chrome` và `storage/muse_chrome` vì chứa phiên đăng nhập trình duyệt.
- `storage/projects` và `storage/temp` nếu không muốn gửi nội dung, video và giọng đọc đã tạo.
- `.venv`, vì thư mục này lớn và được tạo riêng theo từng máy.

Mỗi người sử dụng nên nhập API key và đăng nhập bằng tài khoản của chính họ.
