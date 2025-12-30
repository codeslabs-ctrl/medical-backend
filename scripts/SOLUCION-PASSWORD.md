# Solución: Usuario creado pero no acepta la contraseña

## Problema

El usuario `medicalassistant_user` fue creado pero no puedes conectarte con la contraseña.

## Soluciones

### ✅ Solución 1: Resetear la contraseña (Rápido)

**Opción A: Usando script SQL**
```bash
sudo -u postgres psql -f reset-password.sql
```

**Opción B: Usando script bash**
```bash
chmod +x fix-user-password.sh
sudo ./fix-user-password.sh
```

**Opción C: Manualmente desde psql**
```bash
sudo -u postgres psql
```

Dentro de psql:
```sql
ALTER USER medicalassistant_user WITH PASSWORD 'Rg4027vi.';
\q
```

### ✅ Solución 2: Cambiar a una contraseña personalizada

```bash
sudo -u postgres psql
```

Dentro de psql:
```sql
ALTER USER medicalassistant_user WITH PASSWORD 'TuNuevaContraseñaSegura123!';
\q
```

**IMPORTANTE:** Después de cambiar la contraseña, actualiza el archivo `.env` del backend.

### ✅ Solución 3: Verificar que el usuario existe

```bash
sudo -u postgres psql -c "\du medicalassistant_user"
```

### ✅ Solución 4: Probar la conexión

```bash
# Dar permisos de ejecución
chmod +x test-connection.sh

# Probar con contraseña por defecto
./test-connection.sh

# O con contraseña personalizada
./test-connection.sh "TuContraseña"
```

## Verificar Configuración de Autenticación

Si después de resetear la contraseña aún no funciona, puede ser un problema de `pg_hba.conf`:

```bash
# Ubicación típica del archivo
sudo nano /var/lib/pgsql/data/pg_hba.conf
# o
sudo nano /etc/postgresql/*/main/pg_hba.conf

# Buscar líneas como:
# local   all             all                                     peer
# host    all             all             127.0.0.1/32            md5

# Asegúrate de que para conexiones locales (host) use md5 o password:
host    all             all             127.0.0.1/32            md5
host    all             all             ::1/128                   md5

# Reiniciar PostgreSQL después de cambios
sudo systemctl restart postgresql
```

## Comandos Rápidos

### Resetear contraseña a la por defecto:
```bash
sudo -u postgres psql -c "ALTER USER medicalassistant_user WITH PASSWORD 'MedAsst_2024!Secure#Pass';"
```

### Probar conexión:
```bash
PGPASSWORD='MedAsst_2024!Secure#Pass' psql -h localhost -U medicalassistant_user -d medicalassitant_db
```

### Ver todos los usuarios:
```bash
sudo -u postgres psql -c "\du"
```

## Actualizar .env del Backend

Después de cambiar la contraseña, actualiza el archivo `.env`:

```env
DB_HOST=localhost
DB_PORT=5432
DB_NAME=medicalassitant_db
DB_USER=medicalassistant_user
DB_PASSWORD=MedAsst_2024!Secure#Pass
```

## Checklist

- [ ] Usuario existe: `sudo -u postgres psql -c "\du medicalassistant_user"`
- [ ] Contraseña reseteada: `ALTER USER medicalassistant_user WITH PASSWORD '...';`
- [ ] pg_hba.conf configurado para md5
- [ ] PostgreSQL reiniciado (si se modificó pg_hba.conf)
- [ ] Contraseña actualizada en .env del backend
- [ ] Conexión probada exitosamente

