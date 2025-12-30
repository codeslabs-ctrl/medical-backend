#!/bin/bash
# Script rápido para conectarse a PostgreSQL en Linux
# Soluciona el problema de "Peer authentication failed"

echo "=========================================="
echo "Conectando a PostgreSQL"
echo "=========================================="
echo ""

# Verificar si el usuario es root
if [ "$EUID" -eq 0 ]; then
    echo "Detectado: Eres usuario root"
    echo "Usando: sudo -u postgres psql"
    echo ""
    sudo -u postgres psql
else
    # Intentar como usuario actual primero
    echo "Intentando conexión como usuario actual..."
    if psql -U postgres -d postgres -c "SELECT 1;" > /dev/null 2>&1; then
        echo "Conexión exitosa como usuario actual"
        psql -U postgres
    else
        echo "Falló. Intentando con sudo -u postgres..."
        sudo -u postgres psql
    fi
fi

