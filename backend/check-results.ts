
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function checkResults() {
    try {
        const lastScan = await prisma.scan.findFirst({
            orderBy: { createdAt: 'desc' },
            include: { vulnerabilities: true }
        });

        if (!lastScan) {
            console.log("No scans found.");
            return;
        }

        console.log(`\n🔎 Scan ID: ${lastScan.id}`);
        console.log(`📅 Date: ${lastScan.createdAt}`);
        console.log(`🚦 Status: ${lastScan.status}`);
        console.log(`🎯 Target: ${lastScan.targetId}`); // Ideally fetch target URL if needed

        console.log(`\n📊 Vulnerabilities Found: ${lastScan.vulnerabilities.length}`);

        lastScan.vulnerabilities.forEach((vuln, index) => {
            console.log(`\n[${index + 1}] ${vuln.type} (${vuln.severity})`);
            console.log(`    📝 Description: ${vuln.description}`);
            console.log(`    🧾 Proof: ${vuln.proof.substring(0, 100)}...`);
        });

    } catch (error) {
        console.error("Error checking results:", error);
    } finally {
        await prisma.$disconnect();
    }
}

checkResults();
