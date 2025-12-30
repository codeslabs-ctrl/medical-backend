# Scripts de Conexión a PostgreSQL

Este directorio contiene scripts para conectarse a PostgreSQL de diferentes maneras.

## Scripts Disponibles

### Windows (`.bat`)

#### 1. `connect-as-root.bat` - Conectar como postgres (root)
Conecta como usuario postgres (superusuario) a cualquier base de datos.

```bash
# Conectar a postgres (por defecto)
connect-as-root.bat

# Conectar a una base de datos específica
connect-as-root.bat medicalassitant_db
```

#### 2. `connect-to-medical-db.bat` - Conectar a la base de datos de la aplicación
Conecta directamente a `medicalassitant_db` como `medicalassistant_user`.

```bash
connect-to-medical-db.bat
```

#### 3. `connect-postgres.bat` - Conectar con parámetros personalizados
Conecta con parámetros personalizables.

```bash
# Valores por defecto (postgres@localhost:5432/postgres)
connect-postgres.bat

# Especificar usuario y base de datos
connect-postgres.bat postgres medicalassitant_db

# Especificar todo
connect-postgres.bat postgres medicalassitant_db localhost 5432
```

#### 4. `connect-remote.bat` - Conectar a servidor remoto
Conecta a un servidor PostgreSQL remoto.

```bash
# Ejemplo básico
connect-remote.bat 192.168.1.100

# Ejemplo completo
connect-remote.bat 192.168.1.100 5432 postgres medicalassitant_db
```

### Linux/Mac (`.sh`)

#### 1. `connect-as-postgres-linux.sh` - Conectar como postgres (recomendado para Linux)
Conecta como usuario postgres usando sudo (evita problemas de autenticación peer).

```bash
# Dar permisos de ejecución
chmod +x connect-as-postgres-linux.sh

# Conectar a postgres (por defecto)
sudo ./connect-as-postgres-linux.sh

# Conectar a base de datos específica
sudo ./connect-as-postgres-linux.sh medicalassitant_db
```

#### 2. `connect-postgres-linux.sh` - Script universal para Linux
```bash
# Dar permisos de ejecución
chmod +x connect-postgres-linux.sh

# Usar con valores por defecto
./connect-postgres-linux.sh

# Especificar usuario y base de datos
./connect-postgres-linux.sh postgres medicalassitant_db
```

#### 3. `connect-postgres.sh` - Script universal (genérico)
```bash
# Dar permisos de ejecución
chmod +x connect-postgres.sh

# Usar con valores por defecto
./connect-postgres.sh

# Especificar usuario y base de datos
./connect-postgres.sh postgres medicalassitant_db
```

## Comandos Manuales

### Linux - Conectar como postgres (root)

**IMPORTANTE:** En Linux, PostgreSQL usa autenticación "peer" por defecto. El usuario del sistema debe coincidir con el usuario de PostgreSQL.

```bash
# Opción 1: Cambiar a usuario postgres del sistema (RECOMENDADO)
sudo -u postgres psql

# Opción 2: Si eres root, puedes usar directamente
psql -U postgres

# Opción 3: Con autenticación por contraseña (si está configurado)
psql -U postgres -h localhost -W
```

### Windows - Conectar como postgres (root)
```bash
psql -U postgres
```

### Conectar a base de datos específica
```bash
psql -U postgres -d medicalassitant_db
```

### Conectar como usuario de la aplicación
```bash
psql -U medicalassistant_user -d medicalassitant_db
```

### Conectar a servidor remoto
```bash
psql -h 192.168.1.100 -p 5432 -U postgres -d medicalassitant_db
```

### Conectar con contraseña en línea de comandos (no recomendado)
```bash
psql -h localhost -p 5432 -U postgres -d medicalassitant_db -W
```

## Variables de Entorno

Puedes configurar variables de entorno para evitar especificar parámetros cada vez:

### Windows (PowerShell)
```powershell
$env:PGHOST="localhost"
$env:PGPORT="5432"
$env:PGUSER="postgres"
$env:PGPASSWORD="tu_contraseña"
```

### Windows (CMD)
```cmd
set PGHOST=localhost
set PGPORT=5432
set PGUSER=postgres
set PGPASSWORD=tu_contraseña
```

### Linux/Mac
```bash
export PGHOST=localhost
export PGPORT=5432
export PGUSER=postgres
export PGPASSWORD=tu_contraseña
```

## Ejecutar Scripts SQL

### Desde línea de comandos
```bash
# Como postgres
psql -U postgres -f create-all.sql

# Conectado a base de datos específica
psql -U postgres -d medicalassitant_db -f 03-create-tables.sql
```

### Desde psql (ya conectado)
```sql
\i create-all.sql
\i 03-create-tables.sql
```

## Verificar Conexión

### Verificar que PostgreSQL está corriendo
```bash
# Windows
netstat -an | findstr 5432

# Linux/Mac
netstat -an | grep 5432
# o
ss -tuln | grep 5432
```

### Probar conexión sin entrar a psql
```bash
psql -U postgres -c "SELECT version();"
```

## Solución de Problemas

### Error: "psql: no se reconoce como comando"
- Asegúrate de que PostgreSQL esté instalado
- Agrega PostgreSQL al PATH:
  - Windows: `C:\Program Files\PostgreSQL\XX\bin`
  - Linux/Mac: Ya debería estar en el PATH si está instalado

### Error: "password authentication failed"
- Verifica el usuario y contraseña
- Revisa el archivo `pg_hba.conf` si es servidor remoto

### Error: "could not connect to server"
- Verifica que PostgreSQL esté corriendo
- Verifica el host y puerto
- Revisa el firewall si es servidor remoto

