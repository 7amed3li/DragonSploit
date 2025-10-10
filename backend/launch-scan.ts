// launch-scan.ts

// استيراد الـ Queue المركزي من موقعه الصحيح
import { sqliQueue } from './src/worker/queues/sqli';
import { randomUUID } from 'crypto';

async function launch() {
  console.log('🚀 Launching a new AI-powered SQLi scan...');

  const targetUrl = 'http://localhost:8080/rest/products/search';

  const jobData = {
    scanId: randomUUID( ),
    targetUrl: targetUrl,
    organizationId: 'clg-test-org-123',
    technologyFingerprint: {
        server: 'Express',
        language: 'Node.js',
        database: 'SQLite'
    },
  };

  // استخدم الـ Queue المستورد مباشرة لإضافة المهمة
  // اسم المهمة 'sqli-scan' يمكن أن يكون أي شيء، هو مجرد معرّف لنوع العمل
  await sqliQueue.add('sqli-scan-job', jobData);

  console.log('✅ Scan job added to the queue successfully!');
  console.log(`   - Queue Name: ${sqliQueue.name}`);
  console.log(`   - Scan ID: ${jobData.scanId}`);
  console.log(`   - Target: ${jobData.targetUrl}`);
  console.log('--------------------------------------------------');
  console.log('👀 Now, check the terminal where your DragonSploit API is running.');

  // أغلق الاتصال بالـ queue بعد إضافة المهمة
  await sqliQueue.close();
}

launch().catch(error => {
  console.error('❌ Failed to launch scan:', error);
  process.exit(1);
});
