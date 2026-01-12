
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const allVulns = await prisma.vulnerability.findMany();
  
  const uniqueParams = new Set<string>();
  allVulns.forEach(v => {
      if (!v.description) return;
      
      // Clean extraction of parameter name
      // Matches 'id', 'q', etc. inside single quotes
      const match = v.description.match(/'([^']+)'/);
      if (match && match[1]) {
          uniqueParams.add(match[1].trim());
      } else if (v.description.includes('Authentication Bypass')) {
          uniqueParams.add('Auth_Bypass');
      }
  });

  console.log(`\n📊 Total Database Entries: ${allVulns.length}`);
  console.log(`🎯 Truly Unique Vulnerable Parameters: ${uniqueParams.size}`);
  console.log('📝 Unified List:', Array.from(uniqueParams).join(', '));
}

main()
  .catch(e => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => await prisma.$disconnect());
