import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  // Create admin user
  const adminPassword = await bcrypt.hash('admin123', 12);
  
  const admin = await prisma.user.upsert({
    where: { email: 'admin@bankbroker.com' },
    update: {},
    create: {
      email: 'admin@bankbroker.com',
      name: 'Admin User',
      password: adminPassword,
      role: 'ADMIN',
      kycStatus: 'APPROVED',
    },
  });

  console.log('Admin user created:', admin);

  // Create a demo user
  const userPassword = await bcrypt.hash('demo1234', 12);
  
  const demoUser = await prisma.user.upsert({
    where: { email: 'demo@example.com' },
    update: {},
    create: {
      email: 'demo@example.com',
      name: 'Demo User',
      password: userPassword,
      role: 'USER',
      kycStatus: 'PENDING',
    },
  });

  // Create accounts for demo user
  await prisma.account.createMany({
    data: [
      {
        userId: demoUser.id,
        type: 'CHECKING',
        balance: 1500.00,
      },
      {
        userId: demoUser.id,
        type: 'SAVINGS',
        balance: 5000.00,
      },
    ],
  });

  console.log('Demo user created:', demoUser);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  }); 