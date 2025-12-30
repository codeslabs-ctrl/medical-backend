-- =====================================================
-- Script para cambiar/resetear la contraseña del usuario
-- Ejecutar como usuario postgres (root)
-- =====================================================
-- Uso: sudo -u postgres psql -f reset-password.sql
-- =====================================================

-- Cambiar la contraseña del usuario medicalassistant_user
ALTER USER medicalassistant_user WITH PASSWORD 'MedAsst_2024!Secure#Pass';

-- Verificar que el usuario existe y mostrar información
\du medicalassistant_user

\echo ''
\echo '========================================'
\echo 'Contraseña actualizada exitosamente'
\echo 'Usuario: medicalassistant_user'
\echo 'Nueva contraseña: MedAsst_2024!Secure#Pass'
\echo '========================================'

