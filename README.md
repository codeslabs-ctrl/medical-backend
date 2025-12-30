# Medical Assistant Backend

Backend API desarrollado con Node.js, Express y TypeScript para el sistema Medical Assistant.

## Características

- ✅ TypeScript para type safety
- ✅ Express.js como framework web
- ✅ PostgreSQL como base de datos
- ✅ Arquitectura MVC (Model-View-Controller)
- ✅ Validación de datos con express-validator
- ✅ Manejo de errores centralizado
- ✅ Seguridad con Helmet y CORS
- ✅ Logging con Morgan
- ✅ Estructura profesional y escalable

## Requisitos Previos

- Node.js (v18 o superior)
- PostgreSQL (v12 o superior)
- npm o yarn

## Instalación

1. Instalar dependencias:

```bash
npm install
```

2. Configurar variables de entorno:

Crea un archivo `.env` en la raíz del proyecto basándote en `.env.example`:

```env
DB_HOST=localhost
DB_PORT=5432
DB_NAME=medicalassitant_db
DB_USER=medicalassistant_user
DB_PASSWORD=tu_contraseña_aqui
PORT=3000
NODE_ENV=development
CORS_ORIGIN=http://localhost:4200
```

3. Configurar la base de datos:

Ejecuta los scripts SQL en el directorio `scripts/` en el orden indicado:

```bash
# Ver instrucciones detalladas en scripts/README.md
psql -U postgres -f scripts/01-create-database.sql
psql -U postgres -f scripts/02-create-user.sql
psql -U postgres -d medicalassitant_db -f scripts/03-create-tables.sql
```

## Scripts Disponibles

- `npm run dev` - Inicia el servidor en modo desarrollo con nodemon
- `npm run build` - Compila TypeScript a JavaScript
- `npm start` - Inicia el servidor en modo producción
- `npm run lint` - Ejecuta el linter ESLint

## Estructura del Proyecto

```
back-end/
├── src/
│   ├── config/          # Configuración (base de datos, etc.)
│   ├── controllers/     # Controladores (lógica de negocio)
│   ├── middleware/      # Middleware personalizado
│   ├── models/          # Modelos/interfaces TypeScript
│   ├── routes/          # Definición de rutas
│   ├── services/        # Servicios (acceso a datos)
│   └── server.ts        # Punto de entrada de la aplicación
├── scripts/             # Scripts SQL para la base de datos
├── dist/                # Código compilado (generado)
└── package.json
```

## API Endpoints

### Clínicas

- `GET /api/clinicas` - Obtener todas las clínicas
- `GET /api/clinicas/:id` - Obtener una clínica por ID
- `POST /api/clinicas` - Crear una nueva clínica
- `PUT /api/clinicas/:id` - Actualizar una clínica
- `DELETE /api/clinicas/:id` - Eliminar una clínica

### Configuración de Clínicas

- `GET /api/clinicas-config` - Obtener todas las configuraciones (opcional: `?clinica_id=1`)
- `GET /api/clinicas-config/:id` - Obtener una configuración por ID
- `POST /api/clinicas-config` - Crear una nueva configuración
- `PUT /api/clinicas-config/:id` - Actualizar una configuración
- `DELETE /api/clinicas-config/:id` - Eliminar una configuración

### Health Check

- `GET /health` - Verificar el estado del servidor

## Ejemplos de Uso

### Crear una clínica

```bash
curl -X POST http://localhost:3000/api/clinicas \
  -H "Content-Type: application/json" \
  -d '{
    "nombre_clinica": "Clínica San José",
    "clinica_alias": "CSJ001",
    "direccion": "Av. Principal 123",
    "telefono": "+1234567890",
    "email": "contacto@clinicasanjose.com",
    "activo": true
  }'
```

### Crear una configuración de endpoint

```bash
curl -X POST http://localhost:3000/api/clinicas-config \
  -H "Content-Type: application/json" \
  -d '{
    "clinica_id": 1,
    "endpoint_url": "https://api.externa.com/pacientes",
    "nombre_endpoint": "API de Pacientes",
    "descripcion": "Endpoint para consultar información de pacientes",
    "metodo_http": "GET",
    "activo": true
  }'
```

## Desarrollo

El proyecto utiliza TypeScript con configuración estricta. Asegúrate de:

1. Mantener los tipos correctos en todas las funciones
2. Validar todos los inputs con express-validator
3. Manejar errores apropiadamente
4. Seguir las convenciones de código establecidas

## Seguridad

- Las contraseñas de la base de datos deben ser seguras
- Nunca commitees el archivo `.env` al repositorio
- Usa variables de entorno para información sensible
- El servidor está configurado con Helmet para seguridad HTTP

## Licencia

ISC

