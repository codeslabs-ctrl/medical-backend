-- Script para crear la base de datos medicalassitant_db
-- Ejecutar como usuario postgres o superusuario

-- Crear la base de datos si no existe
SELECT 'CREATE DATABASE medicalassitant_db'
WHERE NOT EXISTS (SELECT FROM pg_database WHERE datname = 'medicalassitant_db')\gexec

-- Comentario de la base de datos
COMMENT ON DATABASE medicalassitant_db IS 'Base de datos para el sistema Medical Assistant';

