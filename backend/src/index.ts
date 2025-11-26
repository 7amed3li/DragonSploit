// src/index.ts

// الطريقة الأكثر ضمانًا: استدعاء dotenv بشكل صريح في البداية
import dotenv from 'dotenv';
dotenv.config();

// الآن نستورد باقي المكتبات والملفات
import express, { Express, Request, Response, NextFunction } from 'express';
import { PrismaClient } from '@prisma/client';
import { Server } from 'http';
import cors from 'cors';
import cookieParser from 'cookie-parser';

import { AppError } from './utils/errors';

// --- Import Routers ---
import authRouter from './routes/auth';
import organizationRouter from './routes/kurum';
import targetRouter from './routes/target';
import scanRouter from './routes/scans';

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
  app.use(cors());
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
  app.listen(PORT, () => {
    console.log(`🚀 API Server is running on http://localhost:${PORT}`);

    // --- بداية التعديل الرئيسي ---
    // بعد أن يعمل الخادم بنجاح، قم ببدء تشغيل العمال
    // startWorkers(); // ❌ Disabled to prevent conflict with 'npm run dev:worker'
    // --- نهاية التعديل الرئيسي ---
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