@echo off
cd /d "%~dp0"
echo Starting Chrome for Google Flow automation...
start "Flow Chrome" chrome.exe --remote-debugging-port=9222 --user-data-dir="%~dp0storage\flow_chrome"
echo.
echo 1. Log in to https://flow.google.com in the opened Chrome window.
echo 2. Set FLOW_ENABLED=true in .env.
echo 3. Start the app with start.bat, then click "Gui prompt vao Flow (3 luong)".
pause
