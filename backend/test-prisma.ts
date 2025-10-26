// test-prisma.ts
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('Attempting to create a new organization directly...');
  try {
    const newOrg = await prisma.organization.create({
      data: {
        name: 'Direct Prisma Test',
        slug: 'direct-prisma-test',
      },
    });

    console.log('✅ SUCCESS! Organization created.');
    console.log('--- GENERATED DATA ---');
    console.log(newOrg); // اطبع الكائن بأكمله لنرى كل الحقول
    console.log('----------------------');

    if (!newOrg.id) {
        console.error('❌ CRITICAL FAILURE: The generated ID is null or undefined!');
    } else {
        console.log('✅ ID was generated successfully.');
    }

  } catch (error) {
    console.error('❌ FAILED to create organization:', error);
  } finally {
    await prisma.$disconnect();
  }
}

main();
