-- Script para crear las tablas en la base de datos medicalassitant_db
-- Ejecutar conectado a la base de datos medicalassitant_db como medicalassistant_user o postgres

-- Conectar a la base de datos correcta
\c medicalassitant_db

-- Crear extensión para UUID si es necesario (opcional)
-- CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Tabla: clinicas
CREATE TABLE IF NOT EXISTS clinicas (
    id SERIAL PRIMARY KEY,
    nombre_clinica VARCHAR(255) NOT NULL,
    clinica_alias VARCHAR(100) NOT NULL UNIQUE,
    direccion VARCHAR(500),
    telefono VARCHAR(20),
    email VARCHAR(255),
    activo BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Índices para la tabla clinicas
CREATE INDEX IF NOT EXISTS idx_clinicas_nombre ON clinicas(nombre_clinica);
CREATE INDEX IF NOT EXISTS idx_clinicas_alias ON clinicas(clinica_alias);
CREATE INDEX IF NOT EXISTS idx_clinicas_activo ON clinicas(activo);

-- Comentarios para la tabla clinicas
COMMENT ON TABLE clinicas IS 'Tabla que almacena la información de las clínicas';
COMMENT ON COLUMN clinicas.id IS 'Identificador único de la clínica';
COMMENT ON COLUMN clinicas.nombre_clinica IS 'Nombre completo de la clínica';
COMMENT ON COLUMN clinicas.clinica_alias IS 'Alias o código único de la clínica';
COMMENT ON COLUMN clinicas.direccion IS 'Dirección física de la clínica';
COMMENT ON COLUMN clinicas.telefono IS 'Número de teléfono de contacto';
COMMENT ON COLUMN clinicas.email IS 'Correo electrónico de contacto';
COMMENT ON COLUMN clinicas.activo IS 'Indica si la clínica está activa';
COMMENT ON COLUMN clinicas.created_at IS 'Fecha y hora de creación del registro';
COMMENT ON COLUMN clinicas.updated_at IS 'Fecha y hora de última actualización';

-- Tabla: clinicas_config
CREATE TABLE IF NOT EXISTS clinicas_config (
    id SERIAL PRIMARY KEY,
    clinica_id INTEGER NOT NULL,
    endpoint_url VARCHAR(500) NOT NULL,
    nombre_endpoint VARCHAR(255),
    descripcion TEXT,
    metodo_http VARCHAR(10) DEFAULT 'GET',
    activo BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_clinica FOREIGN KEY (clinica_id) REFERENCES clinicas(id) ON DELETE CASCADE
);

-- Índices para la tabla clinicas_config
CREATE INDEX IF NOT EXISTS idx_clinicas_config_clinica_id ON clinicas_config(clinica_id);
CREATE INDEX IF NOT EXISTS idx_clinicas_config_activo ON clinicas_config(activo);
CREATE INDEX IF NOT EXISTS idx_clinicas_config_metodo ON clinicas_config(metodo_http);

-- Comentarios para la tabla clinicas_config
COMMENT ON TABLE clinicas_config IS 'Tabla que almacena la configuración de endpoints para cada clínica';
COMMENT ON COLUMN clinicas_config.id IS 'Identificador único de la configuración';
COMMENT ON COLUMN clinicas_config.clinica_id IS 'Referencia a la clínica (FK)';
COMMENT ON COLUMN clinicas_config.endpoint_url IS 'URL del endpoint al que puede acceder la clínica';
COMMENT ON COLUMN clinicas_config.nombre_endpoint IS 'Nombre descriptivo del endpoint';
COMMENT ON COLUMN clinicas_config.descripcion IS 'Descripción detallada del endpoint';
COMMENT ON COLUMN clinicas_config.metodo_http IS 'Método HTTP permitido (GET, POST, PUT, PATCH, DELETE)';
COMMENT ON COLUMN clinicas_config.activo IS 'Indica si la configuración está activa';
COMMENT ON COLUMN clinicas_config.created_at IS 'Fecha y hora de creación del registro';
COMMENT ON COLUMN clinicas_config.updated_at IS 'Fecha y hora de última actualización';

-- Función para actualizar automáticamente updated_at
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Triggers para actualizar updated_at automáticamente
CREATE TRIGGER update_clinicas_updated_at
    BEFORE UPDATE ON clinicas
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_clinicas_config_updated_at
    BEFORE UPDATE ON clinicas_config
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

-- Otorgar permisos al usuario
GRANT ALL PRIVILEGES ON ALL TABLES IN SCHEMA public TO medicalassistant_user;
GRANT ALL PRIVILEGES ON ALL SEQUENCES IN SCHEMA public TO medicalassistant_user;
GRANT EXECUTE ON ALL FUNCTIONS IN SCHEMA public TO medicalassistant_user;

-- Otorgar permisos para tablas futuras
ALTER DEFAULT PRIVILEGES IN SCHEMA public GRANT ALL ON TABLES TO medicalassistant_user;
ALTER DEFAULT PRIVILEGES IN SCHEMA public GRANT ALL ON SEQUENCES TO medicalassistant_user;
ALTER DEFAULT PRIVILEGES IN SCHEMA public GRANT EXECUTE ON FUNCTIONS TO medicalassistant_user;

