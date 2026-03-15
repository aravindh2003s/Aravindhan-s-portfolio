@echo off
echo Installing Backend Dependencies...
cd backend
call mvnw.cmd clean install -DskipTests
cd ..
echo Dependencies installed successfully!
pause
