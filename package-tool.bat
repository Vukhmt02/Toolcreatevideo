@echo off
setlocal
cd /d "%~dp0"
powershell.exe -NoProfile -ExecutionPolicy Bypass -File "%~dp0package-tool.ps1"
if errorlevel 1 (
    echo.
    echo [LOI] Khong the dong goi ToolCreateVideo.
    pause
    exit /b 1
)
echo.
echo File ZIP nam trong thu muc dist.
pause
