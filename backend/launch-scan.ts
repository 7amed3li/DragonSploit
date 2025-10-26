// launch-scan.ts

import { PrismaClient } from '@prisma/client';
import { sqliQueue } from './src/worker/queues/sqli';

// إنشاء نسخة من Prisma Client للتفاعل مع قاعدة البيانات
const prisma = new PrismaClient( );

async function launch() {
  console.log('🚀 Launching a new AI-powered SQLi scan...');

  // --- معلومات أساسية للاختبار ---
  const targetUrl = 'http://localhost:8080/rest/products/search';
  
  // ⚠️ استبدل هذه بالـ IDs الحقيقية من Prisma Studio
  const ORGANIZATION_ID = 'cmh7pb7j60000egkkpiewdl4v'; // 👈 الصق معرّف المنظمة هنا
  const TARGET_ID = 'cmh7pcum00000egicu33l5kji';       // 👈 الصق معرّف الهدف هنا

  try {
    // --- الخطوة 1: إنشاء سجل الفحص في قاعدة البيانات ---
    console.log('Creating scan record in the database...' );
    const newScan = await prisma.scan.create({
      data: {
        status: 'QUEUED',
        organizationId: ORGANIZATION_ID,
        targetId: TARGET_ID,
      },
    });
    console.log(`✅ Scan record created with ID: ${newScan.id}`);

    // --- الخطوة 2: تجهيز بيانات المهمة باستخدام الـ ID الحقيقي ---
    const jobData = {
      scanId: newScan.id, // ⭐️ الأهم: استخدام الـ ID الحقيقي من قاعدة البيانات
      targetUrl: targetUrl,
      organizationId: newScan.organizationId,
      technologyFingerprint: {
        server: 'Express',
        language: 'Node.js',
        database: 'SQLite',
      },
    };

    // --- الخطوة 3: إضافة المهمة إلى الطابور ---
    await sqliQueue.add('sqli-scan-job', jobData);

    console.log('✅ Scan job added to the queue successfully!');
    console.log(`   - Queue Name: ${sqliQueue.name}`);
    console.log(`   - Scan ID: ${jobData.scanId}`);
    console.log(`   - Target: ${jobData.targetUrl}`);
    console.log('--------------------------------------------------');
    console.log('👀 Now, check the terminal where your workers are running.');

  } catch (error) {
    console.error('❌ Failed to launch scan:', error);
    process.exit(1);
  } finally {
    // التأكد من إغلاق الاتصالات
    await prisma.$disconnect();
    await sqliQueue.close();
  }
}

launch();
