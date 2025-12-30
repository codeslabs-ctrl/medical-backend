-- Script para crear el usuario medicalassistant_user
-- Ejecutar como usuario postgres o superusuario
-- IMPORTANTE: Cambiar la contraseña antes de usar en producción

-- Crear el usuario si no existe
DO $$
BEGIN
  IF NOT EXISTS (SELECT FROM pg_user WHERE usename = 'medicalassistant_user') THEN
    CREATE USER medicalassistant_user WITH PASSWORD 'MedAsst_2024!Secure#Pass';
  END IF;
END
$$;

-- Otorgar privilegios en la base de datos
GRANT CONNECT ON DATABASE medicalassitant_db TO medicalassistant_user;
GRANT USAGE ON SCHEMA public TO medicalassistant_user;
GRANT CREATE ON SCHEMA public TO medicalassistant_user;

-- Comentario del usuario
COMMENT ON ROLE medicalassistant_user IS 'Usuario para la aplicación Medical Assistant';

