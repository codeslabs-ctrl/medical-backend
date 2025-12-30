@echo off
REM Script para conectarse como usuario postgres (root)
REM Uso: connect-as-root.bat [base_de_datos]

set DBNAME=%~1
if "%DBNAME%"=="" set DBNAME=postgres

echo ==========================================
echo Conectando como usuario postgres (root)
echo ==========================================
echo Base de datos: %DBNAME%
echo Usuario: postgres
echo ==========================================
echo.

REM Conectar como postgres
psql -h localhost -p 5432 -U postgres -d %DBNAME%

