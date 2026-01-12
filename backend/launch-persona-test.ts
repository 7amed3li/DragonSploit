// launch-persona-test.ts

import 'dotenv/config'; // <--- LOAD ENV VARS IMPORT
import { PrismaClient } from '@prisma/client';
import { scanQueue } from './src/worker/queues/scan'; // Make sure to export scanQueue from src/worker/queues/scan.ts

// Fallback for local testing - Only set if not already defined
if (!process.env.DATABASE_URL) {
    console.error('❌ DATABASE_URL is not defined in .env');
    process.exit(1);
}

console.log('🔧 [DEBUG] Using DB URL:', process.env.DATABASE_URL);

const prisma = new PrismaClient();

async function launch() {
    const args = process.argv.slice(2);
    const profile = args[0] || 'balanced'; // lightning, balanced, deep
    const targetUrl = args[1] || 'http://localhost:8080/rest/products/search';

    console.log(`\n🐉 TRIGGERING DRAGON SCAN: [${profile.toUpperCase()}]`);
    console.log(`🎯 Target: ${targetUrl}\n`);

    try {
        // 1. Get/Create Org & Target
        let org = await prisma.organization.findFirst();
        if (!org) org = await prisma.organization.create({ data: { name: 'Test Org', slug: 'test-org' } });

        let target = await prisma.target.findFirst({ where: { organizationId: org.id } });
        if (!target) target = await prisma.target.create({
            data: { name: 'Test Target', url: targetUrl, organizationId: org.id }
        });

        // 2. Create Scan Record
        const newScan = await prisma.scan.create({
            data: {
                status: 'QUEUED',
                organizationId: org.id,
                targetId: target.id,
            },
        });

        // 3. Dispatch Job with PROFILE
        const jobData = {
            scanId: newScan.id,
            targetId: target.id,
            targetUrl: targetUrl,
            profile: profile // <--- THIS IS KEY
        };

        await scanQueue.add('orchestration-job', jobData);

        console.log(`✅ Job Dispatched to Scan Queue!`);
        console.log(`   - Scan ID: ${newScan.id}`);
        console.log(`   - Profile: ${profile}`);
        console.log(`\n👉 Watch the worker logs to see the [${profile.toUpperCase()}] persona in action.`);

    } catch (error) {
        console.error('❌ Failed:', error);
    } finally {
        await prisma.$disconnect();
        await scanQueue.close();
    }
}

launch();
