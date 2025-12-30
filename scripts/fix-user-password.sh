#!/bin/bash
# Script para resetear la contraseña del usuario medicalassistant_user
# Uso: sudo ./fix-user-password.sh [nueva_contraseña]

NEW_PASSWORD=${1:-"MedAsst_2024!Secure#Pass"}

echo "=========================================="
echo "Reseteando contraseña del usuario"
echo "=========================================="
echo "Usuario: medicalassistant_user"
echo "Nueva contraseña: $NEW_PASSWORD"
echo "=========================================="
echo ""

# Ejecutar como usuario postgres
sudo -u postgres psql <<EOF
-- Cambiar la contraseña
ALTER USER medicalassistant_user WITH PASSWORD '$NEW_PASSWORD';

-- Verificar
\du medicalassistant_user
EOF

echo ""
echo "=========================================="
echo "Contraseña actualizada exitosamente"
echo "=========================================="
echo ""
echo "IMPORTANTE: Actualiza la contraseña en el archivo .env del backend"

