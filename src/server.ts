import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import dotenv from 'dotenv';
import { errorHandler } from './middleware/errorHandler';
import { clinicasRouter } from './routes/clinicas.routes';
import { clinicasConfigRouter } from './routes/clinicas-config.routes';
import { proxyRouter } from './routes/proxy.routes';
import { resolveRouter } from './routes/resolve.routes';
import { testConnection } from './config/database';

// Load environment variables
dotenv.config();

const app: Application = express();
// Por defecto usamos 3003 para no colisionar con FemiMed (3000).
const PORT = process.env.PORT || 3003;

// Middleware
app.use(helmet());
app.use(cors({
  origin: process.env.CORS_ORIGIN || 'http://localhost:4200',
  credentials: true
}));
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Health check endpoint
app.get('/health', (_req: Request, res: Response) => {
  res.status(200).json({ status: 'OK', message: 'Server is running' });
});

// API Routes
app.use('/api/clinicas', clinicasRouter);
app.use('/api/clinicas-config', clinicasConfigRouter);
app.use('/api/proxy', proxyRouter);
app.use('/api/resolve', resolveRouter);

// 404 handler
app.use((_req: Request, res: Response) => {
  res.status(404).json({ error: 'Route not found' });
});

// Error handler
app.use(errorHandler);

// Start server
const startServer = async () => {
  // Test database connection before starting server
  console.log('🔌 Testing database connection...');
  const dbConnected = await testConnection();
  
  if (!dbConnected) {
    console.error('❌ Failed to connect to database. Server will not start.');
    process.exit(1);
  }

  app.listen(PORT, () => {
    console.log('');
    console.log('🚀 Server is running');
    console.log(`   Port: ${PORT}`);
    console.log(`   Environment: ${process.env.NODE_ENV || 'development'}`);
    console.log(`   API: http://localhost:${PORT}/api`);
    console.log(`   Health: http://localhost:${PORT}/health`);
    console.log('');
  });
};

startServer();

export default app;

