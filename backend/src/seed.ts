import { PrismaClient, UserRole } from '@prisma/client';
import * as bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Starting minimal database seeding...');

  // Check if admin user already exists
  const existingAdmin = await prisma.user.findFirst({
    where: { role: UserRole.ADMIN },
  });

  if (existingAdmin) {
    console.log('✅ Admin user already exists');
    return;
  }

  // Create default admin user
  const adminEmail = process.env.DEFAULT_ADMIN_EMAIL || 'admin@example.com';
  const adminPassword = process.env.DEFAULT_ADMIN_PASSWORD || 'admin123';
  const adminFirstName = process.env.DEFAULT_ADMIN_FIRST_NAME || 'Admin';
  const adminLastName = process.env.DEFAULT_ADMIN_LAST_NAME || 'User';

  const hashedPassword = await bcrypt.hash(adminPassword, 10);

  const adminUser = await prisma.user.create({
    data: {
      email: adminEmail,
      password: hashedPassword,
      firstName: adminFirstName,
      lastName: adminLastName,
      role: UserRole.ADMIN,
    },
  });

  console.log('✅ Default admin user created:');
  console.log(`   Email: ${adminEmail}`);
  console.log(`   Password: ${adminPassword}`);
  console.log(`   ID: ${adminUser.id}`);

  // Create sample realtor user
  const realtorPassword = await bcrypt.hash('realtor123', 10);
  const realtorUser = await prisma.user.create({
    data: {
      email: 'realtor@example.com',
      password: realtorPassword,
      firstName: 'John',
      lastName: 'Doe',
      role: UserRole.REALTOR,
    },
  });

  await prisma.realtor.create({
    data: {
      userId: realtorUser.id,
      slug: 'john-doe',
      phoneNumber: '+234 123 456 7890',
      residentialAddress: '123 Main Street, Lagos',
      bankName: 'First Bank',
      accountNumber: '1234567890',
      accountName: 'John Doe',
    },
  });

  console.log('✅ Sample realtor user created:');
  console.log(`   Email: realtor@example.com`);
  console.log(`   Password: realtor123`);

  // Create sample investor user
  const investorPassword = await bcrypt.hash('investor123', 10);
  const investorUser = await prisma.user.create({
    data: {
      email: 'investor@example.com',
      password: investorPassword,
      firstName: 'Jane',
      lastName: 'Smith',
      role: UserRole.INVESTOR,
    },
  });

  await prisma.investor.create({
    data: {
      userId: investorUser.id,
      phoneNumber: '+234 987 654 3210',
      address: '456 Investment Street, Lagos',
      investmentBudget: 50000000, // 50M Naira
      preferredLocation: 'Lekki, Lagos',
    },
  });

  console.log('✅ Sample investor user created:');
  console.log(`   Email: investor@example.com`);
  console.log(`   Password: investor123`);

  console.log('🎉 Minimal database seeding completed!');
  console.log('📝 You can now log in as admin and add properties through the UI');
}

main()
  .catch((e) => {
    console.error('❌ Error during seeding:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });