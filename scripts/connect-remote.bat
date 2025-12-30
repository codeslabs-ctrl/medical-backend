@echo off
REM Script para conectarse a PostgreSQL en servidor remoto
REM Uso: connect-remote.bat [host] [puerto] [usuario] [base_de_datos]
REM Ejemplo: connect-remote.bat 192.168.1.100 5432 postgres medicalassitant_db

set PGHOST=%~1
if "%PGHOST%"=="" (
    echo Error: Debes especificar el host del servidor
    echo Uso: connect-remote.bat [host] [puerto] [usuario] [base_de_datos]
    echo Ejemplo: connect-remote.bat 192.168.1.100 5432 postgres medicalassitant_db
    pause
    exit /b 1
)

set PGPORT=%~2
if "%PGPORT%"=="" set PGPORT=5432

set PGUSER=%~3
if "%PGUSER%"=="" set PGUSER=postgres

set DBNAME=%~4
if "%DBNAME%"=="" set DBNAME=postgres

echo ==========================================
echo Conectando a PostgreSQL Remoto
echo ==========================================
echo Host: %PGHOST%
echo Port: %PGPORT%
echo Usuario: %PGUSER%
echo Base de datos: %DBNAME%
echo ==========================================
echo.

REM Conectar
psql -h %PGHOST% -p %PGPORT% -U %PGUSER% -d %DBNAME%

