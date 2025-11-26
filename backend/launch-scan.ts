// launch-scan.ts

import { PrismaClient } from '@prisma/client';
import { sqliQueue } from './src/worker/queues/sqli';

// إنشاء نسخة من Prisma Client للتفاعل مع قاعدة البيانات
const prisma = new PrismaClient();

async function launch() {
  console.log('🚀 Launching a new AI-powered SQLi scan...');

  // --- معلومات أساسية للاختبار ---
  const targetUrl = 'http://localhost:8080/rest/products/search'; // 👈 Reverted to Juice Shop Search API

  try {
    // --- الخطوة 0: الحصول على IDs صالحة تلقائيًا ---
    console.log('🔍 Fetching valid Organization and Target...');

    // البحث عن أو إنشاء منظمة
    let org = await prisma.organization.findFirst();
    if (!org) {
      console.log('   - No organization found. Creating default...');
      org = await prisma.organization.create({
        data: { name: 'Default Org', slug: 'default-org' }
      });
    }
    console.log(`   - Organization ID: ${org.id}`);

    // البحث عن أو إنشاء هدف
    let target = await prisma.target.findFirst({ where: { organizationId: org.id } });
    if (!target) {
      console.log('   - No target found. Creating default...');
      target = await prisma.target.create({
        data: {
          name: 'Local Test Target',
          url: targetUrl,
          organizationId: org.id
          // status: 'ACTIVE' // ❌ Removed: Field does not exist in schema
        }
      });
    }
    console.log(`   - Target ID: ${target.id}`);

    // --- الخطوة 1: إنشاء سجل الفحص في قاعدة البيانات ---
    console.log('Creating scan record in the database...');
    const newScan = await prisma.scan.create({
      data: {
        status: 'QUEUED',
        organizationId: org.id,
        targetId: target.id,
      },
    });
    console.log(`✅ Scan record created with ID: ${newScan.id}`);

    // --- الخطوة 2: تجهيز بيانات المهمة باستخدام الـ ID الحقيقي ---
    const jobData = {
      scanId: newScan.id,
      targetUrl: targetUrl,
      organizationId: newScan.organizationId,
      technologyFingerprint: {
        server: 'Express',
        language: 'Node.js',
        database: 'SQLite',
      },
    };

    // --- الخطوة 3: إضافة المهمة إلى الطابور ---
    console.log('[DEBUG] About to add job to queue...');
    console.log('[DEBUG] Queue name:', sqliQueue.name);
    console.log('[DEBUG] Job data:', JSON.stringify(jobData));

    const addPromise = sqliQueue.add('sqli-scan-job', jobData);
    const timeoutPromise = new Promise((_, reject) =>
      setTimeout(() => reject(new Error('Queue.add() timeout after 10s')), 10000)
    );

    await Promise.race([addPromise, timeoutPromise]);
    console.log('[DEBUG] Job added successfully!');

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
