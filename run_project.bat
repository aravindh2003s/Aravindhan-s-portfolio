@echo off
echo Starting the Spring Boot Backend...
cd backend
start cmd /k "call mvnw.cmd spring-boot:run"

echo Waiting for backend to start...
timeout /t 10 /nobreak

echo Opening the Frontend...
cd ..\frontend
start index.html

echo Project is running!
pause
