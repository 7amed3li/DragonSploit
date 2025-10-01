import express, { Express, Request, Response, NextFunction } from 'express';
import { PrismaClient } from '@prisma/client';
import { Server } from 'http';
import cors from 'cors';
import 'dotenv/config';
import { AppError } from './utils/errors';

// --- Import Routers ---
import authRouter from './routes/auth';
import organizationRouter from './routes/kurum';
import targetRouter from './routes/target';
import scanRouter from './routes/scans';

// --- Import Swagger Setup ---
import { setupSwagger } from './swagger';

// --- Initialization ---
const app: Express = express( );
const prisma = new PrismaClient();

// --- Main Application Function ---
async function main() {
  // --- Database Connection ---
  console.log('Attempting to connect to the database...');
  await prisma.$connect();
  console.log('✅ Database connection successful!');

  // --- Middlewares ---
  app.use(cors());
  app.use(express.json());

  // --- Swagger Setup ---
  setupSwagger(app);

  // --- API Routes ---
  app.get('/', (req: Request, res: Response) => {
    res.status(200).json({ message: "Welcome to the DragonSploit API!" });
  });
  app.use('/api/auth', authRouter);
  app.use('/api/organizations', organizationRouter);
  app.use('/api/targets', targetRouter);
  app.use('/api/scans', scanRouter);

  // --- Global Error Handler (LOUD VERSION) ---
  // --- بداية التعديل ---
  app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
    console.log('!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!');
    console.log('!!!!!!!!!! AN ERROR WAS CAUGHT !!!!!!!!!!!!!');
    console.log('!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!');
    console.error(err); // اطبع الخطأ الكامل
    console.log('!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!');
    console.log('!!!!!!!!!! END OF ERROR !!!!!!!!!!!!!!!!!!');
    console.log('!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!');

    if (err instanceof AppError) {
      return res.status(err.statusCode).json({ message: err.message });
    }

    return res.status(500).json({ message: 'An unexpected server error occurred.' });
  });
  // --- نهاية التعديل ---

  // --- Start Server ---
  const PORT = process.env.PORT || 3001;
  const server: Server = app.listen(PORT, () => {
    console.log(`🚀 API Server is running on http://localhost:${PORT}` );
  });

  // --- Graceful Shutdown Handler ---
  const handleShutdown = (signal: string) => {
    console.log(`Signal received (${signal}). Shutting down gracefully...`);
    server.close(() => {
      console.log('HTTP server closed.');
      prisma.$disconnect().then(() => {
        console.log('Database connection disconnected.');
        process.exit(0);
      });
    });
  };

  process.on('SIGTERM', () => handleShutdown('SIGTERM'));
  process.on('SIGINT', () => handleShutdown('SIGINT'));
}

// --- Application Entry Point ---
main().catch((e) => {
  console.error('A critical error occurred while starting the application:', e);
  prisma.$disconnect();
  process.exit(1);
});
