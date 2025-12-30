import { Pool, PoolConfig } from 'pg';
import dotenv from 'dotenv';

// Cargar variables de entorno
dotenv.config();

// Validar variables de entorno requeridas
const requiredEnvVars = ['DB_HOST', 'DB_NAME', 'DB_USER', 'DB_PASSWORD'];
const missingVars = requiredEnvVars.filter((varName) => !process.env[varName]);

if (missingVars.length > 0) {
  console.error('❌ Error: Faltan variables de entorno requeridas:');
  missingVars.forEach((varName) => console.error(`   - ${varName}`));
  console.error('\nPor favor, crea un archivo .env basándote en .env.example');
  process.exit(1);
}

const dbConfig: PoolConfig = {
  host: process.env.DB_HOST!,
  port: parseInt(process.env.DB_PORT || '5432', 10),
  database: process.env.DB_NAME!,
  user: process.env.DB_USER!,
  password: process.env.DB_PASSWORD!,
  max: 20,
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 2000,
};

export const pool = new Pool(dbConfig);

// Test connection
pool.on('connect', () => {
  console.log('✅ Connected to PostgreSQL database');
  console.log(`   Database: ${dbConfig.database}`);
  console.log(`   Host: ${dbConfig.host}:${dbConfig.port}`);
  console.log(`   User: ${dbConfig.user}`);
});

pool.on('error', (err) => {
  console.error('❌ Unexpected error on idle client', err);
  process.exit(-1);
});

// Helper function to test connection
export const testConnection = async (): Promise<boolean> => {
  try {
    const result = await pool.query('SELECT NOW(), current_database(), current_user');
    console.log('✅ Database connection test successful');
    console.log('   Time:', result.rows[0].now);
    console.log('   Database:', result.rows[0].current_database);
    console.log('   User:', result.rows[0].current_user);
    return true;
  } catch (error: any) {
    console.error('❌ Database connection test failed:');
    console.error('   Error:', error.message);
    if (error.code === '28P01') {
      console.error('   → Error de autenticación. Verifica usuario y contraseña en .env');
    } else if (error.code === '3D000') {
      console.error('   → La base de datos no existe. Ejecuta los scripts SQL de creación.');
    } else if (error.code === 'ECONNREFUSED') {
      console.error('   → No se puede conectar al servidor. Verifica que PostgreSQL esté corriendo.');
    }
    return false;
  }
};

