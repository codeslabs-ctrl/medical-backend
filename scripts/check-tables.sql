-- =====================================================
-- Script para verificar en qué base de datos están las tablas
-- Ejecutar como usuario postgres
-- =====================================================

-- Ver todas las bases de datos
\l

-- Ver en qué base de datos estás actualmente
SELECT current_database();

-- Conectar a medicalassitant_db
\c medicalassitant_db

-- Ver las tablas en esta base de datos
\dt

-- Ver todas las tablas con más detalles
SELECT 
    schemaname,
    tablename,
    tableowner
FROM pg_tables
WHERE schemaname = 'public'
ORDER BY tablename;

-- Verificar que las tablas tienen datos (debería estar vacío)
SELECT COUNT(*) as total_clinicas FROM clinicas;
SELECT COUNT(*) as total_configs FROM clinicas_config;

