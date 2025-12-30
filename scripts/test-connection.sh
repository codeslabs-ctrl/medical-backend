#!/bin/bash
# Script para probar la conexión con el usuario medicalassistant_user
# Uso: ./test-connection.sh [contraseña]

PASSWORD=${1:-"MedAsst_2024!Secure#Pass"}

echo "=========================================="
echo "Probando conexión con medicalassistant_user"
echo "=========================================="
echo ""

# Exportar contraseña como variable de entorno
export PGPASSWORD=$PASSWORD

# Intentar conexión
psql -h localhost -U medicalassistant_user -d medicalassitant_db -c "SELECT current_user, current_database();"

if [ $? -eq 0 ]; then
    echo ""
    echo "=========================================="
    echo "✓ Conexión exitosa!"
    echo "=========================================="
else
    echo ""
    echo "=========================================="
    echo "✗ Error en la conexión"
    echo "=========================================="
    echo ""
    echo "Posibles causas:"
    echo "1. La contraseña es incorrecta"
    echo "2. El usuario no existe"
    echo "3. La base de datos no existe"
    echo "4. Problema de permisos en pg_hba.conf"
    echo ""
    echo "Solución: Ejecuta fix-user-password.sh para resetear la contraseña"
fi

# Limpiar variable de entorno
unset PGPASSWORD

