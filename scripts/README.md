# Scripts de Base de Datos PostgreSQL

Este directorio contiene los scripts SQL necesarios para configurar la base de datos del proyecto Medical Assistant.

## Orden de Ejecución

Los scripts deben ejecutarse en el siguiente orden:

1. **01-create-database.sql** - Crea la base de datos `medicalassitant_db`
2. **02-create-user.sql** - Crea el usuario `medicalassistant_user` con contraseña
3. **03-create-tables.sql** - Crea las tablas `clinicas` y `clinicas_config`

## Instrucciones de Ejecución

### Opción 1: Ejecutar desde psql (Recomendado)

```bash
# Conectarse como usuario postgres
psql -U postgres

# Ejecutar los scripts en orden
\i scripts/01-create-database.sql
\i scripts/02-create-user.sql
\c medicalassitant_db
\i scripts/03-create-tables.sql
```

### Opción 2: Ejecutar desde línea de comandos

```bash
# Crear base de datos
psql -U postgres -f scripts/01-create-database.sql

# Crear usuario
psql -U postgres -f scripts/02-create-user.sql

# Crear tablas (conectándose a la base de datos)
psql -U postgres -d medicalassitant_db -f scripts/03-create-tables.sql
```

### Opción 3: Ejecutar todo en un solo comando

```bash
psql -U postgres -f scripts/01-create-database.sql && \
psql -U postgres -f scripts/02-create-user.sql && \
psql -U postgres -d medicalassitant_db -f scripts/03-create-tables.sql
```

## Configuración de Contraseña

**IMPORTANTE**: Antes de usar en producción, cambia la contraseña en el archivo `02-create-user.sql`.

La contraseña por defecto es: `MedAsst_2024!Secure#Pass`

Para cambiar la contraseña después de crear el usuario:

```sql
ALTER USER medicalassistant_user WITH PASSWORD 'tu_nueva_contraseña_segura';
```

## Estructura de las Tablas

### Tabla: clinicas
- `id` (SERIAL PRIMARY KEY)
- `nombre_clinica` (VARCHAR(255) NOT NULL)
- `clinica_alias` (VARCHAR(100) NOT NULL UNIQUE)
- `direccion` (VARCHAR(500))
- `telefono` (VARCHAR(20))
- `email` (VARCHAR(255))
- `activo` (BOOLEAN DEFAULT TRUE)
- `created_at` (TIMESTAMP)
- `updated_at` (TIMESTAMP)

### Tabla: clinicas_config
- `id` (SERIAL PRIMARY KEY)
- `clinica_id` (INTEGER NOT NULL, FK a clinicas)
- `endpoint_url` (VARCHAR(500) NOT NULL)
- `nombre_endpoint` (VARCHAR(255))
- `descripcion` (TEXT)
- `metodo_http` (VARCHAR(10) DEFAULT 'GET')
- `activo` (BOOLEAN DEFAULT TRUE)
- `created_at` (TIMESTAMP)
- `updated_at` (TIMESTAMP)

## Verificación

Para verificar que todo se creó correctamente:

```sql
-- Conectarse a la base de datos
\c medicalassitant_db

-- Ver las tablas
\dt

-- Ver la estructura de una tabla
\d clinicas
\d clinicas_config

-- Verificar permisos del usuario
\du medicalassistant_user
```

