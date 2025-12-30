-- =====================================================
-- Script para otorgar permisos completos al usuario
-- Ejecutar como usuario postgres (root)
-- =====================================================
-- Uso: sudo -u postgres psql -f fix-permissions.sql
-- =====================================================

-- Conectar a la base de datos
\c medicalassitant_db

-- Otorgar permisos en el esquema public
GRANT ALL ON SCHEMA public TO medicalassistant_user;
GRANT CREATE ON SCHEMA public TO medicalassistant_user;

-- Otorgar permisos en la base de datos
GRANT CONNECT ON DATABASE medicalassitant_db TO medicalassistant_user;
GRANT USAGE ON SCHEMA public TO medicalassistant_user;

-- Otorgar permisos en todas las tablas existentes
GRANT ALL PRIVILEGES ON ALL TABLES IN SCHEMA public TO medicalassistant_user;
GRANT ALL PRIVILEGES ON ALL SEQUENCES IN SCHEMA public TO medicalassistant_user;
GRANT EXECUTE ON ALL FUNCTIONS IN SCHEMA public TO medicalassistant_user;

-- Otorgar permisos para objetos futuros
ALTER DEFAULT PRIVILEGES IN SCHEMA public GRANT ALL ON TABLES TO medicalassistant_user;
ALTER DEFAULT PRIVILEGES IN SCHEMA public GRANT ALL ON SEQUENCES TO medicalassistant_user;
ALTER DEFAULT PRIVILEGES IN SCHEMA public GRANT EXECUTE ON FUNCTIONS TO medicalassistant_user;
ALTER DEFAULT PRIVILEGES IN SCHEMA public GRANT ALL ON FUNCTIONS TO medicalassistant_user;

-- Hacer al usuario propietario del esquema (opcional, más permisos)
-- ALTER SCHEMA public OWNER TO medicalassistant_user;

\echo ''
\echo '========================================'
\echo 'Permisos otorgados exitosamente'
\echo '========================================'

