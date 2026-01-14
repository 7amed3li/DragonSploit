// src/index.ts

// الطريقة الأكثر ضمانًا: استدعاء dotenv بشكل صريح في البداية
import dotenv from 'dotenv';
dotenv.config();

// الآن نستورد باقي المكتبات والملفات
import express, { Express, Request, Response, NextFunction } from 'express';
import { PrismaClient } from '@prisma/client';
import http from 'http';
import cors from 'cors';
import cookieParser from 'cookie-parser';

import { AppError } from './utils/errors';
import { setupSecurity } from './middleware/security';
import { logger } from './utils/logger';

// --- Import Routers ---
import authRouter from './routes/auth';
import organizationRouter from './routes/kurum';
import targetRouter from './routes/target';
import scanRouter from './routes/scans';
import vulnerabilityRouter from './routes/vulnerability';

// --- Import Swagger and Worker Loader ---
import { setupSwagger } from './swagger';
// المسار الصحيح لملف تحميل العمال
import { startWorkers } from './worker/worker-loader';

// --- Initialization ---
export const app: Express = express();
const prisma = new PrismaClient();

// --- Main Application Function ---
async function main() {
  // --- Database Connection ---
  console.log('Attempting to connect to the database...');
  await prisma.$connect();
  console.log('✅ Database connection successful!');

  // --- Middlewares ---
  app.use(cors({
    origin: true, // Allow all origins in dev or specifically localhost
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With', 'Accept'],
  }));

  setupSecurity(app); // 🛡️ Apply security middleware
  
  // Custom Request Logger
  app.use((req, res, next) => {
    console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
    if (req.method === 'OPTIONS') {
      return res.sendStatus(200);
    }
    next();
  });

  app.use(express.json());
  app.use(cookieParser());

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
  app.use('/api/vulnerabilities', vulnerabilityRouter);

  // --- Global Error Handler ---
  app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
    if (!(err instanceof AppError)) {
      console.log('!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!');
      console.log('!!!!!!!!!! AN ERROR WAS CAUGHT !!!!!!!!!!!!!');
      console.log('!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!');
      console.error(err);
      console.log('!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!');
      console.log('!!!!!!!!!! END OF ERROR !!!!!!!!!!!!!!!!!!');
      console.log('!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!');
    }
    if (err instanceof AppError) {
      return res.status(err.statusCode).json({ message: err.message });
    }
    return res.status(500).json({ message: 'An unexpected server error occurred.' });
  });

  // --- Start Server and Workers ---
  const PORT = process.env.PORT || 3001;
  const server = http.createServer(app);
  
  // Initialize Socket.io via our logger service
  logger.init(server);

  server.listen(PORT, () => {
    console.log(`🚀 API Server is running on http://localhost:${PORT}`);
    logger.log('DRAGONSPLOIT KERNEL v2.4 OPERATIONAL', 'success');
    logger.log('WEBSOCKET HANDSHAKE CHANNEL OPENED', 'info');
  });

  // --- Graceful Shutdown Handler ---
  const handleShutdown = (signal: string) => {
    console.log(`Signal received (${signal}). Shutting down gracefully...`);
    // يجب إغلاق الخادم والعمال هنا، لكن سنبسطها الآن
    process.exit(0);
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