import { PrismaClient } from '@prisma/client';
import { seedRecipes } from './seed/recipes';
import { seedDuas } from './seed/duas';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Début du seeding...');

  // Seeder les recettes et leurs catégories
  await seedRecipes(prisma);

  // Seeder les duas et leurs catégories
  await seedDuas(prisma);

  console.log('🎉 Seeding terminé avec succès!');
}

main()
  .catch((e) => {
    console.error('❌ Erreur lors du seeding:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
