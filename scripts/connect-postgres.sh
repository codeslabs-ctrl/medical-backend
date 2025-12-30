#!/bin/bash
# Script para conectarse a PostgreSQL
# Uso: ./connect-postgres.sh [usuario] [base_de_datos]

# Configuración por defecto
PGUSER=${1:-postgres}
DBNAME=${2:-postgres}
PGHOST=${PGHOST:-localhost}
PGPORT=${PGPORT:-5432}

echo "=========================================="
echo "Conectando a PostgreSQL"
echo "=========================================="
echo "Host: $PGHOST"
echo "Port: $PGPORT"
echo "Usuario: $PGUSER"
echo "Base de datos: $DBNAME"
echo "=========================================="
echo ""

# Conectar
psql -h $PGHOST -p $PGPORT -U $PGUSER -d $DBNAME

