-- =====================================================
-- Verificación rápida de permisos
-- Ejecutar como usuario postgres
-- =====================================================

\c medicalassitant_db

-- Ver información básica del usuario
\du medicalassistant_user

-- Ver permisos en tablas
\dp clinicas
\dp clinicas_config

-- Ver permisos en secuencias
SELECT 
    sequence_name,
    sequence_owner
FROM information_schema.sequences
WHERE sequence_schema = 'public';

-- Ver permisos en funciones
\df update_updated_at_column

-- Verificar que puede conectarse
\echo ''
\echo 'Usuario: medicalassistant_user'
\echo 'Base de datos: medicalassitant_db'
\echo ''
\echo 'Para probar conexión:'
\echo 'PGPASSWORD="Rg4027vi." psql -h localhost -U medicalassistant_user -d medicalassitant_db'

