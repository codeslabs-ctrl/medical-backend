-- =====================================================
-- Script para verificar que todo está configurado correctamente
-- Ejecutar como usuario postgres
-- =====================================================

-- Verificar que estás en la base de datos correcta
SELECT current_database();

-- Verificar que las tablas existen
\dt

-- Ver la estructura de las tablas
\d clinicas
\d clinicas_config

-- Verificar que el usuario tiene permisos
\du medicalassistant_user

-- Verificar que los triggers están creados
SELECT trigger_name, event_object_table, action_statement 
FROM information_schema.triggers 
WHERE event_object_schema = 'public';

-- Verificar que la función existe
\df update_updated_at_column

-- Probar la conexión con el usuario de la aplicación
\echo ''
\echo '========================================'
\echo 'Para probar la conexión con medicalassistant_user:'
\echo 'Sal de psql y ejecuta:'
\echo 'PGPASSWORD="Rg4027vi." psql -h localhost -U medicalassistant_user -d medicalassitant_db'
\echo '========================================'

