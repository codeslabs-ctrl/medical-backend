-- =====================================================
-- Script para cambiar la contraseña del usuario
-- Ejecutar como usuario postgres (root)
-- =====================================================
-- Uso: sudo -u postgres psql -f change-password.sql
-- =====================================================

-- Cambiar la contraseña del usuario medicalassistant_user
-- IMPORTANTE: Cambia 'NuevaContraseñaSegura123!' por la contraseña que desees
ALTER USER medicalassistant_user WITH PASSWORD 'NuevaContraseñaSegura123!';

-- Verificar que el usuario existe
\du medicalassistant_user

\echo ''
\echo '========================================'
\echo 'Contraseña actualizada exitosamente'
\echo 'Usuario: medicalassistant_user'
\echo 'Nueva contraseña: NuevaContraseñaSegura123!'
\echo '========================================'
\echo ''
\echo 'IMPORTANTE: Actualiza la contraseña en el archivo .env del backend'

