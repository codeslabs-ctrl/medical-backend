-- =====================================================
-- Script para crear la base de datos y usuario
-- Ejecutar como usuario postgres (root)
-- =====================================================
-- Uso: psql -U postgres -f create-database-and-user.sql
-- =====================================================

-- Crear la base de datos si no existe
SELECT 'CREATE DATABASE medicalassitant_db'
WHERE NOT EXISTS (SELECT FROM pg_database WHERE datname = 'medicalassitant_db')\gexec

-- Comentario de la base de datos
COMMENT ON DATABASE medicalassitant_db IS 'Base de datos para el sistema Medical Assistant';

-- Crear el usuario si no existe
DO $$
BEGIN
  IF NOT EXISTS (SELECT FROM pg_user WHERE usename = 'medicalassistant_user') THEN
    CREATE USER medicalassistant_user WITH PASSWORD 'MedAsst_2024!Secure#Pass';
    RAISE NOTICE 'Usuario medicalassistant_user creado exitosamente';
  ELSE
    RAISE NOTICE 'El usuario medicalassistant_user ya existe';
  END IF;
END
$$;

-- Otorgar privilegios en la base de datos
GRANT CONNECT ON DATABASE medicalassitant_db TO medicalassistant_user;
GRANT USAGE ON SCHEMA public TO medicalassistant_user;
GRANT CREATE ON SCHEMA public TO medicalassistant_user;

-- Comentario del usuario
COMMENT ON ROLE medicalassistant_user IS 'Usuario para la aplicación Medical Assistant';

-- Mostrar mensaje de confirmación
\echo '========================================'
\echo 'Base de datos y usuario creados exitosamente'
\echo 'Base de datos: medicalassitant_db'
\echo 'Usuario: medicalassistant_user'
\echo 'Contraseña: MedAsst_2024!Secure#Pass'
\echo '========================================'
\echo ''
\echo 'IMPORTANTE: Cambiar la contraseña antes de usar en producción'
\echo 'Siguiente paso: Ejecutar create-tables.sql conectado a medicalassitant_db'
\echo ''

