# Configuración de Variables de Entorno

## Archivo .env

Crea un archivo `.env` en la raíz del proyecto `back-end/` con la siguiente configuración:

```env
# =====================================================
# Configuración de Base de Datos PostgreSQL
# =====================================================
DB_HOST=69.164.244.24
DB_PORT=5432
DB_NAME=medicalassitant_db
DB_USER=medicalassistant_user
DB_PASSWORD=TU_PASSWORD

# =====================================================
# Configuración del Servidor
# =====================================================
PORT=3003
NODE_ENV=development

# =====================================================
# Configuración CORS
# =====================================================
CORS_ORIGIN=http://localhost:4200

# =====================================================
# Upstream API Keys (Proxy MediAsistencia -> Clínicas)
# =====================================================
# Keys que MediAsistencia usará para llamar al External API de cada clínica.
# Para pruebas locales con FemiMed, usa las mismas keys que pusiste en config.env del backend FemiMed:
UPSTREAM_PATIENT_APP_API_KEY=TU_KEY_PACIENTES
UPSTREAM_N8N_API_KEY=TU_KEY_N8N
```

## Crear el archivo .env

### Windows (PowerShell)
```powershell
cd back-end
Copy-Item .env.example .env
```

### Windows (CMD)
```cmd
cd back-end
copy .env.example .env
```

### Linux/Mac
```bash
cd back-end
cp .env.example .env
```

## Variables de Entorno Explicadas

### Base de Datos
- `DB_HOST`: Dirección del servidor PostgreSQL (localhost para local, IP para remoto)
- `DB_PORT`: Puerto de PostgreSQL (por defecto 5432)
- `DB_NAME`: Nombre de la base de datos (`medicalassitant_db`)
- `DB_USER`: Usuario de PostgreSQL (`medicalassistant_user`)
- `DB_PASSWORD`: Contraseña del usuario (`Rg4027vi.`)

### Servidor
- `PORT`: Puerto donde correrá el servidor Express (3000)
- `NODE_ENV`: Entorno de ejecución (`development`, `production`, `test`)

### CORS
- `CORS_ORIGIN`: Origen permitido para CORS (URL del frontend Angular)

## Verificar Configuración

El servidor validará automáticamente las variables de entorno al iniciar. Si falta alguna variable requerida, mostrará un error y no iniciará.

## Para Servidor Remoto

Si tu base de datos está en un servidor remoto, actualiza:

```env
DB_HOST=192.168.1.100  # IP del servidor
DB_PORT=5432
DB_NAME=medicalassitant_db
DB_USER=medicalassistant_user
DB_PASSWORD=Rg4027vi.
```

## Seguridad

⚠️ **IMPORTANTE:**
- Nunca commitees el archivo `.env` al repositorio
- El archivo `.env` ya está en `.gitignore`
- Usa `.env.example` como plantilla
- En producción, usa variables de entorno del sistema o un gestor de secretos

## Probar la Conexión

El servidor probará automáticamente la conexión a la base de datos al iniciar. Verás mensajes como:

```
🔌 Testing database connection...
✅ Database connection test successful
   Time: 2024-01-15 10:30:45
   Database: medicalassitant_db
   User: medicalassistant_user
✅ Connected to PostgreSQL database
   Database: medicalassitant_db
   Host: localhost:5432
   User: medicalassistant_user
🚀 Server is running
   Port: 3000
   Environment: development
   API: http://localhost:3000/api
   Health: http://localhost:3000/health
```

Si hay un error, el servidor mostrará un mensaje descriptivo y no iniciará.

