# Solución: Error "Peer authentication failed" en Linux

## Problema

Cuando intentas conectarte como root del sistema:
```bash
psql -U postgres
```

Obtienes el error:
```
psql: error: connection to server on socket "/run/postgresql/.S.PGSQL.5432" failed: 
FATAL: Peer authentication failed for user "postgres"
```

## Causa

PostgreSQL en Linux usa autenticación "peer" por defecto para conexiones locales. Esto significa que el usuario del sistema operativo debe coincidir con el usuario de PostgreSQL.

Como eres `root` del sistema, pero intentas conectarte como usuario `postgres` de PostgreSQL, la autenticación falla.

## Soluciones

### ✅ Solución 1: Cambiar al usuario postgres del sistema (RECOMENDADO)

```bash
# Cambiar al usuario postgres del sistema
sudo -u postgres psql

# O si ya eres root:
su - postgres
psql
```

### ✅ Solución 2: Usar autenticación por contraseña (localhost)

Forzar autenticación por contraseña especificando el host:

```bash
# Esto pedirá la contraseña del usuario postgres
psql -U postgres -h localhost -W

# O con la base de datos específica
psql -U postgres -h localhost -d postgres -W
```

### ✅ Solución 3: Configurar contraseña para postgres (si no la tienes)

Si no conoces la contraseña del usuario postgres:

```bash
# Cambiar al usuario postgres
sudo -u postgres psql

# Dentro de psql, cambiar la contraseña
ALTER USER postgres WITH PASSWORD 'tu_contraseña_segura';
\q

# Ahora puedes usar autenticación por contraseña
psql -U postgres -h localhost -W
```

### ✅ Solución 4: Modificar pg_hba.conf (avanzado)

Si necesitas permitir conexiones desde root, edita el archivo de configuración:

```bash
# Ubicación típica del archivo
sudo nano /var/lib/pgsql/data/pg_hba.conf
# o
sudo nano /etc/postgresql/*/main/pg_hba.conf

# Cambiar la línea de "peer" a "md5" o "password"
# De:
local   all             all                                     peer
# A:
local   all             all                                     md5

# Reiniciar PostgreSQL
sudo systemctl restart postgresql
```

## Comandos Rápidos para tu Caso

### Para ejecutar el script de creación de base de datos:

```bash
# Opción A: Como usuario postgres
sudo -u postgres psql -f /ruta/al/script/create-all.sql

# Opción B: Con autenticación por contraseña
psql -U postgres -h localhost -f /ruta/al/script/create-all.sql -W
```

### Para conectarte y trabajar:

```bash
# Conectar como postgres
sudo -u postgres psql

# Dentro de psql, ejecutar script
\i /ruta/al/script/create-all.sql
```

## Verificar Usuario Actual

```bash
# Ver qué usuario eres
whoami

# Ver usuarios de PostgreSQL disponibles
sudo -u postgres psql -c "\du"
```

## Resumen

**El comando correcto para tu caso es:**

```bash
sudo -u postgres psql
```

O si necesitas especificar la base de datos:

```bash
sudo -u postgres psql -d postgres
```

