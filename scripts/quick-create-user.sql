-- Crear usuario medicalassistant_user con contraseña Rg4027vi.
CREATE USER medicalassistant_user WITH PASSWORD 'Rg4027vi.';

-- Otorgar privilegios en la base de datos
GRANT CONNECT ON DATABASE medicalassitant_db TO medicalassistant_user;
GRANT USAGE ON SCHEMA public TO medicalassistant_user;
GRANT CREATE ON SCHEMA public TO medicalassistant_user;

-- Verificar
\du medicalassistant_user

