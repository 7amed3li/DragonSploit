// src/index.ts

import express, { Express, Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
import { Server } from 'http';

// --- استيراد المسارات (Routers ) ---
import authRouter from './routes/auth';
import kurumRouter from './routes/kurum';
// 1. <<<--- هذا هو السطر الجديد الذي تمت إضافته
import targetRouter from './routes/target'; 

import setupSwagger from './swagger';

// --- تهيئة ---
const uygulama: Express = express();
const prisma = new PrismaClient();

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
  // 2. <<<--- هذا هو السطر الجديد الذي تمت إضافته
  uygulama.use('/api/targets', targetRouter);

  // إعداد Swagger
  setupSwagger(uygulama);

  // --- تشغيل الخادم ---
  const PORT = process.env.PORT || 3000;
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
main()
  .catch((e) => {
    console.error('Uygulama başlatılırken kritik bir hata oluştu:', e);
    process.exit(1);
  })
  .finally(async () => {
    // هذا الجزء مهم: نحن لا نغلق الاتصال هنا
    // await prisma.$disconnect();
  });
