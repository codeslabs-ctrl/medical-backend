#!/bin/bash
# Script para conectarse a PostgreSQL en Linux
# Uso: ./connect-postgres-linux.sh [usuario] [base_de_datos] [host]

# Configuración por defecto
PGUSER=${1:-postgres}
DBNAME=${2:-postgres}
PGHOST=${3:-localhost}
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

# Si es localhost y el usuario es postgres, intentar con autenticación peer primero
if [ "$PGHOST" = "localhost" ] || [ "$PGHOST" = "127.0.0.1" ]; then
    # Intentar conexión local (peer authentication)
    psql -U $PGUSER -d $DBNAME
else
    # Conexión remota (requiere contraseña)
    psql -h $PGHOST -p $PGPORT -U $PGUSER -d $DBNAME
fi

