import express, { Express, Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
import kurumRouter from './routes/kurum';
import authRouter from './routes/auth';
import setupSwagger from './swagger';
import { Server } from 'http';

// --- تهيئة ---
const uygulama: Express = express( );
const prisma = new PrismaClient(); // (1) إنشاء نسخة واحدة من Prisma Client

// --- الدالة الرئيسية للتطبيق ---
async function main() {
  // Middleware لتحليل الطلبات القادمة بصيغة JSON
  uygulama.use(express.json());

  // --- المسارات (Routes) ---
  uygulama.get('/', (req: Request, res: Response) => {
    res.status(200).json({ mesaj: 'DragonSploit API\'ye Hoş Geldiniz!' });
  });
  uygulama.use('/api/auth', authRouter);
  uygulama.use('/api/kurumlar', kurumRouter);

  // إعداد Swagger
  setupSwagger(uygulama);

  // --- تشغيل الخادم ---
  const sunucu: Server = uygulama.listen(PORT, () => {
    console.log(`🚀 Sunucu http://localhost:${PORT} adresinde çalışıyor` );
    console.log('Bu sunucu stabil bir şekilde çalışmaya devam etmelidir.');
    console.log('Durdurmak için Ctrl+C tuşlarına basın.');
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
const PORT = process.env.PORT || 3000;

main()
  .catch((e) => {
    console.error('Uygulama başlatılırken kritik bir hata oluştu:', e);
    process.exit(1);
  })
  .finally(async () => {
    // هذا الجزء مهم: نحن لا نغلق الاتصال هنا
    // await prisma.$disconnect(); // <-- لا تقم بإلغاء التعليق على هذا السطر
  });
