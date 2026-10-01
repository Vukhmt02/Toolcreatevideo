@echo off
cd /d "%~dp0"
chcp 65001 >nul
echo.
echo ══════════════════════════════════════════
echo   🎬 ToolCreateVideo - Dang khoi dong...
echo ══════════════════════════════════════════
echo.

REM Check Python
python --version >nul 2>&1
if errorlevel 1 (
    echo [LOI] Python chua duoc cai dat!
    echo Tai tai: https://python.org
    pause
    exit /b 1
)

REM Check .env
if not exist ".env" (
    echo [INFO] Tao file .env tu .env.example...
    copy .env.example .env >nul
    echo [QUAN TRONG] Mo file .env va nhap API key cua ban!
    echo.
)

REM Install dependencies
echo [1/2] Cai dat thu vien...
python -m pip install -r requirements.txt --quiet
if errorlevel 1 (
    echo [LOI] Cai dat thu vien that bai.
    pause
    exit /b 1
)

REM Create directories
if not exist "storage\projects" mkdir "storage\projects"
if not exist "storage\temp" mkdir "storage\temp"

REM Start server
echo [2/2] Khoi dong server...
echo.
echo ══════════════════════════════════════════
echo   Mo trinh duyet: http://localhost:8000
echo   Nhan Ctrl+C de tat server
echo ══════════════════════════════════════════
echo.
python app.py
pause
