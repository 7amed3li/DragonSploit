import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function checkDb() {
  console.log(`Listing all Organizations...`);
  
  const orgs = await prisma.organization.findMany({
    include: {
      members: {
        include: { user: true }
      }
    }
  });

  if (orgs.length === 0) {
    console.log('❌ NO ORGANIZATIONS FOUND IN DB');
    return;
  }

  orgs.forEach(org => {
     console.log(`✅ [${org.id}] ${org.name}`);
     org.members.forEach(m => {
        console.log(`   - Member: ${m.user.email} (ID: ${m.userId})`);
     });
  });
}

checkDb()
  .catch(e => console.error(e))
  .finally(() => prisma.$disconnect());
