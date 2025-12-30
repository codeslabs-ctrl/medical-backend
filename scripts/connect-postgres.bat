@echo off
REM Script para conectarse a PostgreSQL en Windows
REM Uso: connect-postgres.bat [usuario] [base_de_datos] [host] [puerto]

REM Configuración por defecto
set PGUSER=%~1
if "%PGUSER%"=="" set PGUSER=postgres

set DBNAME=%~2
if "%DBNAME%"=="" set DBNAME=postgres

set PGHOST=%~3
if "%PGHOST%"=="" set PGHOST=localhost

set PGPORT=%~4
if "%PGPORT%"=="" set PGPORT=5432

echo ==========================================
echo Conectando a PostgreSQL
echo ==========================================
echo Host: %PGHOST%
echo Port: %PGPORT%
echo Usuario: %PGUSER%
echo Base de datos: %DBNAME%
echo ==========================================
echo.

REM Conectar
psql -h %PGHOST% -p %PGPORT% -U %PGUSER% -d %DBNAME%

