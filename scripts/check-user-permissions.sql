-- =====================================================
-- Script para verificar permisos del usuario medicalassistant_user
-- Ejecutar como usuario postgres
-- =====================================================

-- Conectar a la base de datos
\c medicalassitant_db

-- 1. Ver información del usuario
\echo '========================================'
\echo '1. INFORMACIÓN DEL USUARIO'
\echo '========================================'
\du medicalassistant_user

-- 2. Ver permisos en la base de datos
\echo ''
\echo '========================================'
\echo '2. PERMISOS EN LA BASE DE DATOS'
\echo '========================================'
SELECT 
    datname as database,
    datacl as permissions
FROM pg_database
WHERE datname = 'medicalassitant_db';

-- 3. Ver permisos en el esquema public
\echo ''
\echo '========================================'
\echo '3. PERMISOS EN EL ESQUEMA PUBLIC'
\echo '========================================'
SELECT 
    nspname as schema,
    nspacl as permissions
FROM pg_namespace
WHERE nspname = 'public';

-- 4. Ver permisos en las tablas
\echo ''
\echo '========================================'
\echo '4. PERMISOS EN LAS TABLAS'
\echo '========================================'
SELECT 
    schemaname,
    tablename,
    tableowner,
    hasindexes,
    hasrules,
    hastriggers
FROM pg_tables
WHERE schemaname = 'public'
ORDER BY tablename;

-- 5. Ver permisos específicos en cada tabla
\echo ''
\echo '========================================'
\echo '5. PERMISOS DETALLADOS EN TABLAS'
\echo '========================================'
SELECT 
    grantee,
    table_schema,
    table_name,
    privilege_type,
    is_grantable
FROM information_schema.table_privileges
WHERE grantee = 'medicalassistant_user'
  AND table_schema = 'public'
ORDER BY table_name, privilege_type;

-- 6. Ver permisos en secuencias
\echo ''
\echo '========================================'
\echo '6. PERMISOS EN SECUENCIAS'
\echo '========================================'
SELECT 
    grantee,
    sequence_schema,
    sequence_name,
    privilege_type,
    is_grantable
FROM information_schema.sequence_privileges
WHERE grantee = 'medicalassistant_user'
  AND sequence_schema = 'public'
ORDER BY sequence_name;

-- 7. Ver permisos en funciones
\echo ''
\echo '========================================'
\echo '7. PERMISOS EN FUNCIONES'
\echo '========================================'
SELECT 
    grantee,
    routine_schema,
    routine_name,
    privilege_type,
    is_grantable
FROM information_schema.routine_privileges
WHERE grantee = 'medicalassistant_user'
  AND routine_schema = 'public'
ORDER BY routine_name;

-- 8. Ver permisos por defecto para objetos futuros
\echo ''
\echo '========================================'
\echo '8. PERMISOS POR DEFECTO (OBJETOS FUTUROS)'
\echo '========================================'
SELECT 
    defaclrole::regrole as role,
    defaclnamespace::regnamespace as schema,
    defaclobjtype as object_type,
    defaclacl as default_permissions
FROM pg_default_acl
WHERE defaclrole = 'medicalassistant_user'::regrole
   OR 'medicalassistant_user' = ANY(defaclacl::text[]);

-- 9. Resumen de permisos
\echo ''
\echo '========================================'
\echo '9. RESUMEN DE PERMISOS'
\echo '========================================'
SELECT 
    'Tablas' as tipo,
    COUNT(*) as cantidad
FROM information_schema.table_privileges
WHERE grantee = 'medicalassistant_user'
  AND table_schema = 'public'

UNION ALL

SELECT 
    'Secuencias' as tipo,
    COUNT(*) as cantidad
FROM information_schema.sequence_privileges
WHERE grantee = 'medicalassistant_user'
  AND sequence_schema = 'public'

UNION ALL

SELECT 
    'Funciones' as tipo,
    COUNT(*) as cantidad
FROM information_schema.routine_privileges
WHERE grantee = 'medicalassistant_user'
  AND routine_schema = 'public';

-- 10. Verificar conexión
\echo ''
\echo '========================================'
\echo '10. VERIFICAR CONEXIÓN DEL USUARIO'
\echo '========================================'
\echo 'Para probar la conexión, ejecuta:'
\echo 'PGPASSWORD="Rg4027vi." psql -h localhost -U medicalassistant_user -d medicalassitant_db -c "SELECT current_user, current_database();"'

