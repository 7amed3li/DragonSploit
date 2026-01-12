// launch-scan.ts
// Multi-Target SQLi Scanner - يفحص كل الـ endpoints المهمة

import { PrismaClient } from '@prisma/client';
import { sqliQueue } from './src/worker/queues/sqli';

const prisma = new PrismaClient();

// ============================================================================
// 🎯 JUICE SHOP TARGET ENDPOINTS
// ============================================================================

interface ScanTarget {
  url: string;
  method: 'GET' | 'POST';
  body?: Record<string, string>;
  description: string;
  intent?: 'AUTH_BYPASS' | 'STANDARD';
}

const JUICE_SHOP_TARGETS: ScanTarget[] = [
  // 1. Auth Bypass (Login Page)
  {
    url: 'http://localhost:8080/rest/user/login',
    method: 'POST',
    body: { email: 'admin@juice-sh.op', password: process.env.SCAN_PASSWORD || '********' },
    description: 'Login API - Auth Bypass',
    intent: 'AUTH_BYPASS' // 👈 Tag this job for special handling
  },
  // 2. Product Search (UNION SQLi)
  {
    url: 'http://localhost:8080/rest/products/search?q=apple',
    method: 'GET',
    description: 'Product Search - UNION SQLi'
  },
  // 3. User Registration
  {
    url: 'http://localhost:8080/api/Users',
    method: 'POST',
    body: { email: 'test' + Date.now() + '@juice-sh.op', password: process.env.SCAN_PASSWORD || '********', passwordRepeat: process.env.SCAN_PASSWORD || '********' },
    description: 'User Registration API'
  },
  // 4. Feedback API
  {
    url: 'http://localhost:8080/api/Feedbacks',
    method: 'POST',
    body: { comment: 'test', rating: '5' },
    description: 'Feedback API - Injection'
  },
  // 5. Product Details
  {
    url: 'http://localhost:8080/api/Products/1',
    method: 'GET',
    description: 'Product Details API'
  },
  // 6. Basket API
  {
    url: 'http://localhost:8080/api/BasketItems',
    method: 'POST',
    body: { ProductId: '1', BasketId: '1', quantity: '1' },
    description: 'Basket API'
  }
];

// ============================================================================
// 🚀 LAUNCH FUNCTION
// ============================================================================

async function launch() {
  console.log('🐉 DragonSploit Multi-Target Scanner');
  console.log('═'.repeat(50));
  console.log(`📋 Targets to scan: ${JUICE_SHOP_TARGETS.length}`);
  JUICE_SHOP_TARGETS.forEach((t, i) => console.log(`   ${i + 1}. ${t.description}`));
  console.log('═'.repeat(50));

  try {
    // --- Setup Organization & Target ---
    let org = await prisma.organization.findFirst();
    if (!org) {
      org = await prisma.organization.create({
        data: { name: 'Default Org', slug: 'default-org' }
      });
    }

    let target = await prisma.target.findFirst({ where: { organizationId: org.id } });
    if (!target) {
      target = await prisma.target.create({
        data: {
          name: 'OWASP Juice Shop',
          url: 'http://localhost:8080',
          organizationId: org.id
        }
      });
    }

    // --- Launch scans for each target ---
    let jobCount = 0;
    
    // Handle graceful shutdown
    const cleanup = async () => {
        console.log('\n🛑 Received termination signal. Cleaning up...');
        await sqliQueue.obliterate({ force: true });
        console.log('🗑️ Queue flushed.');
        await prisma.$disconnect();
        await sqliQueue.close();
        process.exit(0);
    };
    process.on('SIGINT', cleanup);
    process.on('SIGTERM', cleanup);

    for (const scanTarget of JUICE_SHOP_TARGETS) {
      console.log(`\n🎯 Launching: ${scanTarget.description}`);
      
      const newScan = await prisma.scan.create({
        data: {
          status: 'QUEUED',
          organizationId: org.id,
          targetId: target.id,
        },
      });

      const jobData = {
        scanId: newScan.id,
        targetUrl: scanTarget.url,
        organizationId: org.id,
        requestMethod: scanTarget.method,
        requestBody: scanTarget.body || {},
        technologyFingerprint: {
          server: 'Express',
          language: 'Node.js',
          database: 'SQLite',
        },
        persona: {
          name: 'WARRIOR',
          maxAttempts: 12,
          maxSuccessFindings: 2
        },
        intent: scanTarget.intent // 👈 Pass intent to worker
      };

      await sqliQueue.add('sqli-scan-job', jobData);
      jobCount++;
      console.log(`   ✅ Job ${jobCount} queued: ${scanTarget.url}`);
    }

    console.log('\n' + '═'.repeat(50));
    console.log(`🚀 ${jobCount} scan jobs added to queue!`);
    console.log('👀 Check the worker terminal for progress.');
    console.log('═'.repeat(50));

  } catch (error) {
    console.error('❌ Failed to launch scan:', error);
    process.exit(1);
  } finally {
    // We don"t close immediately if we were a long-running service, but this is a script.
    // waiting a bit to allow Ctrl+C to trigger if user changes mind immediately?
    // No, standard script behavior is to exit.
    await prisma.$disconnect();
    await sqliQueue.close();
  }
}

launch();
