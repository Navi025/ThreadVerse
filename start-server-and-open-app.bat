@echo off
REM Start local server to serve src directory on port 8081 and open default browser

REM Start http-server in background
start /b npx http-server src -p 8081

REM Wait a few seconds for server to start
timeout /t 3 /nobreak >nul

REM Open default browser to app URL
start http://127.0.0.1:8081/index.html

REM Keep the terminal open
pause
