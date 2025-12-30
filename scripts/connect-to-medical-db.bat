@echo off
REM Script para conectarse directamente a la base de datos medicalassitant_db
REM Uso: connect-to-medical-db.bat

echo ==========================================
echo Conectando a Medical Assistant Database
echo ==========================================
echo Base de datos: medicalassitant_db
echo Usuario: medicalassistant_user
echo ==========================================
echo.

REM Conectar como usuario de la aplicación
psql -h localhost -p 5432 -U medicalassistant_user -d medicalassitant_db

