@echo off
setlocal
cd /d "%~dp0"
chcp 65001 >nul

echo ============================================
echo   ToolCreateVideo - Dang khoi dong...
echo ============================================
echo.

python --version >nul 2>&1
if errorlevel 1 (
    echo [LOI] Python chua duoc cai dat.
    echo Tai Python tai: https://python.org
    pause
    exit /b 1
)

if not exist ".venv\Scripts\python.exe" (
    echo [INFO] Dang tao moi truong Python rieng .venv...
    python -m venv .venv
    if errorlevel 1 (
        echo [LOI] Khong the tao .venv.
        pause
        exit /b 1
    )
)

set "APP_PYTHON=.venv\Scripts\python.exe"

if not exist ".env" (
    echo [INFO] Tao file .env tu .env.example...
    copy .env.example .env >nul
    echo [QUAN TRONG] Mo file .env va nhap API key cua ban.
    echo.
)

echo [1/2] Kiem tra va cai dat thu vien trong .venv...
"%APP_PYTHON%" -m pip install -r requirements.txt --quiet
if errorlevel 1 (
    echo [LOI] Cai dat thu vien that bai.
    echo Thu chay: .venv\Scripts\python.exe -m pip install --upgrade pip
    pause
    exit /b 1
)

if not exist "storage\projects" mkdir "storage\projects"
if not exist "storage\temp" mkdir "storage\temp"

echo [2/2] Khoi dong server...
echo Mo trinh duyet: http://127.0.0.1:8000
echo Nhan Ctrl+C de tat server.
echo.
"%APP_PYTHON%" app.py
pause
