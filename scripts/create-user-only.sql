-- =====================================================
-- Script para crear SOLO el usuario medicalassistant_user
-- Ejecutar como usuario postgres (root)
-- =====================================================
-- Uso: sudo -u postgres psql -f create-user-only.sql
-- =====================================================

-- Crear el usuario si no existe
DO $$
BEGIN
  IF NOT EXISTS (SELECT FROM pg_user WHERE usename = 'medicalassistant_user') THEN
    CREATE USER medicalassistant_user WITH PASSWORD 'Rg4027vi.';
    RAISE NOTICE 'Usuario medicalassistant_user creado exitosamente';
  ELSE
    RAISE NOTICE 'El usuario medicalassistant_user ya existe';
    -- Actualizar la contraseña si ya existe
    ALTER USER medicalassistant_user WITH PASSWORD 'Rg4027vi.';
    RAISE NOTICE 'Contraseña actualizada';
  END IF;
END
$$;

-- Otorgar privilegios en la base de datos (si existe)
DO $$
BEGIN
  IF EXISTS (SELECT FROM pg_database WHERE datname = 'medicalassitant_db') THEN
    GRANT CONNECT ON DATABASE medicalassitant_db TO medicalassistant_user;
    GRANT USAGE ON SCHEMA public TO medicalassistant_user;
    GRANT CREATE ON SCHEMA public TO medicalassistant_user;
    RAISE NOTICE 'Privilegios otorgados en medicalassitant_db';
  ELSE
    RAISE NOTICE 'La base de datos medicalassitant_db no existe aún';
  END IF;
END
$$;

-- Verificar que el usuario fue creado
\du medicalassistant_user

\echo ''
\echo '========================================'
\echo 'Usuario creado/actualizado exitosamente'
\echo 'Usuario: medicalassistant_user'
\echo 'Contraseña: Rg4027vi.'
\echo '========================================'

