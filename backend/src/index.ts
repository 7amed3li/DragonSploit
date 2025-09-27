import express, { Express, Request, Response, NextFunction } from 'express';
import { PrismaClient } from '@prisma/client';
import { Server } from 'http';
import cors from 'cors';
import { AppError } from './utils/errors';

// --- استيراد المسارات (Routers ) ---
import authRouter from './routes/auth';
import kurumRouter from './routes/kurum';
import targetRouter from './routes/target';
import scanRouter from './routes/scans';

import setupSwagger from './swagger';

// --- تهيئة ---
const uygulama: Express = express();
const prisma = new PrismaClient();

// --- الدالة الرئيسية للتطبيق ---
async function main() {
  // --- Middlewares ---
  uygulama.use(cors());
  uygulama.use(express.json());

  // --- المسارات (Routes) ---
  uygulama.get('/', (req: Request, res: Response) => {
    res.status(200).json({ mesaj: "DragonSploit API'ye Hoş Geldiniz!" });
  });
  uygulama.use('/api/auth', authRouter);
  uygulama.use('/api/kurumlar', kurumRouter);
  uygulama.use('/api/targets', targetRouter);
  uygulama.use('/api/scans', scanRouter);

  // إعداد Swagger
  setupSwagger(uygulama);

  // --- معالج الأخطاء (Error Handler) ---
  // 2. <<<--- هذا هو الجزء المهم الناقص الذي تمت إضافته
  // يجب أن يكون هذا الوسيط (middleware) هو الأخير قبل تشغيل الخادم
  uygulama.use((err: Error, req: Request, res: Response, next: NextFunction) => {
    console.error('Bir hata oluştu:', err); // تسجيل الخطأ في الكونسول

    if (err instanceof AppError) {
      // إذا كان الخطأ من نوع الأخطاء المخصصة التي أنشأناها (NotFoundError, ForbiddenError, etc.)
      return res.status(err.statusCode).json({ message: err.message });
    }

    // لأي خطأ آخر غير متوقع
    return res.status(500).json({ message: 'Sunucuda beklenmedik bir hata oluştu.' });
  });

  // --- تشغيل الخادم ---
  const PORT = process.env.PORT || 3000;
  const sunucu: Server = uygulama.listen(PORT, () => {
    console.log(`🚀 Sunucu http://localhost:${PORT} adresinde çalışıyor` );
  });

  // --- التعامل مع إشارات الإيقاف ---
  const handleShutdown = (sinyal: string) => {
    console.log(`Sinyal alındı (${sinyal}). Kapatılıyor...`);
    sunucu.close(() => {
      console.log('HTTP sunucusu kapatıldı.');
      prisma.$disconnect().then(() => {
        console.log('Veritabanı bağlantısı kesildi.');
        process.exit(0);
      });
    });
  };

  process.on('SIGTERM', () => handleShutdown('SIGTERM'));
  process.on('SIGINT', () => handleShutdown('SIGINT'));
}

// --- نقطة بداية التطبيق ---
main().catch((e) => {
  console.error('Uygulama başlatılırken kritik bir hata oluştu:', e);
  process.exit(1);
});
