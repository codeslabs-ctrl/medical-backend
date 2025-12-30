#!/bin/bash
# Script para conectarse como usuario postgres en Linux
# Uso: ./connect-as-postgres-linux.sh [base_de_datos]

DBNAME=${1:-postgres}

echo "=========================================="
echo "Conectando como usuario postgres"
echo "=========================================="
echo "Base de datos: $DBNAME"
echo "=========================================="
echo ""

# Opción 1: Intentar como usuario root del sistema (peer auth)
if [ "$EUID" -eq 0 ]; then
    echo "Conectando como root del sistema..."
    sudo -u postgres psql -d $DBNAME
else
    # Opción 2: Cambiar a usuario postgres
    echo "Cambiando a usuario postgres..."
    sudo -u postgres psql -d $DBNAME
fi

