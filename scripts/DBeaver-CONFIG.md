# Configuración de DBeaver para Medical Assistant

## Problema Común: No se ven las tablas

Si no ves las tablas en DBeaver, verifica lo siguiente:

## 1. Verificar la Base de Datos Correcta

Las tablas deben estar en la base de datos `medicalassitant_db`, NO en `postgres`.

### Desde psql:
```sql
-- Ver en qué base de datos estás
SELECT current_database();

-- Si no estás en medicalassitant_db, conéctate:
\c medicalassitant_db

-- Ver las tablas
\dt
```

## 2. Configuración de Conexión en DBeaver

### Crear Nueva Conexión:

1. **Clic derecho en "Database Navigator" → New → Database Connection**

2. **Seleccionar PostgreSQL**

3. **Configuración:**
   - **Host:** `localhost` (o la IP de tu servidor)
   - **Port:** `5432`
   - **Database:** `medicalassitant_db` ⚠️ **IMPORTANTE: Debe ser medicalassitant_db**
   - **Username:** `medicalassistant_user`
   - **Password:** `Rg4027vi.`

4. **Clic en "Test Connection"** para verificar

5. **Guardar** la conexión

### Configuración Avanzada (si es necesario):

En la pestaña **"PostgreSQL"**:
- **Show all databases:** Desmarcar (solo muestra la base de datos seleccionada)
- **Show system databases:** Desmarcar

## 3. Verificar que las Tablas Existen

### Opción A: Desde DBeaver
1. Conéctate a `medicalassitant_db`
2. Expande la conexión
3. Expande "Schemas" → "public" → "Tables"
4. Deberías ver:
   - `clinicas`
   - `clinicas_config`

### Opción B: Desde SQL Editor en DBeaver
```sql
-- Ver todas las tablas
SELECT table_name 
FROM information_schema.tables 
WHERE table_schema = 'public' 
  AND table_type = 'BASE TABLE'
ORDER BY table_name;

-- Ver estructura de una tabla
SELECT column_name, data_type, is_nullable
FROM information_schema.columns
WHERE table_schema = 'public' 
  AND table_name = 'clinicas'
ORDER BY ordinal_position;
```

## 4. Si Aún No Ves las Tablas

### Verificar desde psql:
```bash
sudo -u postgres psql -d medicalassitant_db -c "\dt"
```

### Si las tablas están en otra base de datos:
```sql
-- Conectar a postgres
\c postgres

-- Ver si hay tablas aquí (no debería haber)
\dt

-- Conectar a medicalassitant_db
\c medicalassitant_db

-- Ver las tablas aquí (deberían estar)
\dt
```

## 5. Refrescar la Vista en DBeaver

1. **Clic derecho en la conexión** → "Refresh"
2. O presiona **F5** con la conexión seleccionada
3. Expande manualmente: **Schemas → public → Tables**

## 6. Verificar Permisos del Usuario

El usuario `medicalassistant_user` debe tener permisos para ver las tablas:

```sql
-- Como postgres, verificar permisos
\c medicalassitant_db
\dp clinicas
\dp clinicas_config
```

## 7. Configuración de Conexión Correcta

### Resumen de Parámetros:
```
Tipo: PostgreSQL
Host: localhost (o IP del servidor)
Port: 5432
Database: medicalassitant_db  ← MUY IMPORTANTE
Username: medicalassistant_user
Password: Rg4027vi.
```

## 8. Solución Rápida

Si las tablas no aparecen:

1. **Verifica que estás conectado a `medicalassitant_db`** (no a `postgres`)
2. **Refresca la vista** (F5 o clic derecho → Refresh)
3. **Verifica que el usuario tiene permisos** (ejecuta el script fix-permissions.sql si es necesario)
4. **Reconecta** cerrando y abriendo la conexión en DBeaver

## 9. Consulta de Verificación

Ejecuta esta consulta en DBeaver para verificar:

```sql
-- Ver todas las tablas en la base de datos actual
SELECT 
    schemaname as schema,
    tablename as table,
    tableowner as owner
FROM pg_tables
WHERE schemaname = 'public'
ORDER BY tablename;

-- Deberías ver:
-- schema | table            | owner
-- -------+------------------+----------------------
-- public | clinicas        | postgres
-- public | clinicas_config | postgres
```

## 10. Si las Tablas Están en Otra Base de Datos

Si accidentalmente creaste las tablas en `postgres` en lugar de `medicalassitant_db`:

```sql
-- Conectar a postgres
\c postgres

-- Ver si hay tablas aquí
\dt

-- Si las tablas están aquí, necesitas moverlas o recrearlas en medicalassitant_db
```

