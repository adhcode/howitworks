import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Starting database seed...');

  // Create or get admin user
  let admin = await prisma.user.findUnique({
    where: { email: 'admin@example.com' },
  });

  if (!admin) {
    const hashedPassword = await bcrypt.hash('admin123', 10);
    admin = await prisma.user.create({
      data: {
        email: 'admin@example.com',
        password: hashedPassword,
        firstName: 'Admin',
        lastName: 'User',
        role: 'ADMIN',
        isActive: true,
      },
    });
    console.log('✅ Created admin user');
  }

  // Create or get a realtor
  let realtor = await prisma.user.findFirst({
    where: { role: 'REALTOR' },
  });

  if (!realtor) {
    const hashedPassword = await bcrypt.hash('realtor123', 10);
    realtor = await prisma.user.create({
      data: {
        email: 'realtor@example.com',
        password: hashedPassword,
        firstName: 'John',
        lastName: 'Realtor',
        role: 'REALTOR',
        isActive: true,
      },
    });
    console.log('✅ Created realtor user');
  }

  // Sample properties data
  const properties = [
    {
      title: 'Luxury Villa in Lekki Phase 1',
      description: 'Stunning 5-bedroom villa with modern amenities, swimming pool, and garden. Located in the heart of Lekki with easy access to major landmarks.',
      price: 85000000,
      location: 'Lekki Phase 1, Lagos',
      bedrooms: 5,
      bathrooms: 6,
      area: 450,
      propertyType: 'Villa',
      images: [
        'https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=800',
        'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800',
      ],
      featured: true,
      status: 'AVAILABLE',
      realtorId: realtor.id,
    },
    {
      title: 'Modern 3-Bedroom Apartment',
      description: 'Beautifully designed apartment with contemporary finishes. Features include fitted kitchen, spacious living area, and balcony.',
      price: 32000000,
      location: 'Victoria Island, Lagos',
      bedrooms: 3,
      bathrooms: 3,
      area: 180,
      propertyType: 'Apartment',
      images: [
        'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800',
        'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800',
      ],
      featured: true,
      status: 'AVAILABLE',
      realtorId: realtor.id,
    },
    {
      title: 'Spacious Duplex in Ikoyi',
      description: 'Elegant 4-bedroom duplex with premium finishing, large compound, and excellent security. Perfect for family living.',
      price: 120000000,
      location: 'Ikoyi, Lagos',
      bedrooms: 4,
      bathrooms: 5,
      area: 380,
      propertyType: 'Duplex',
      images: [
        'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?w=800',
        'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800',
      ],
      featured: true,
      status: 'AVAILABLE',
      realtorId: realtor.id,
    },
    {
      title: 'Cozy 2-Bedroom Flat',
      description: 'Affordable and comfortable 2-bedroom flat in a serene environment. Ideal for small families or young professionals.',
      price: 18000000,
      location: 'Ajah, Lagos',
      bedrooms: 2,
      bathrooms: 2,
      area: 110,
      propertyType: 'Flat',
      images: [
        'https://images.unsplash.com/photo-1502672260066-6bc32826c5e9?w=800',
        'https://images.unsplash.com/photo-1502672023488-70e25813eb80?w=800',
      ],
      featured: false,
      status: 'AVAILABLE',
      realtorId: realtor.id,
    },
    {
      title: 'Executive 6-Bedroom Mansion',
      description: 'Grand mansion with state-of-the-art facilities including cinema room, gym, and staff quarters. Ultimate luxury living.',
      price: 250000000,
      location: 'Banana Island, Lagos',
      bedrooms: 6,
      bathrooms: 7,
      area: 650,
      propertyType: 'Mansion',
      images: [
        'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=800',
        'https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?w=800',
      ],
      featured: true,
      status: 'AVAILABLE',
      realtorId: realtor.id,
    },
    {
      title: 'Penthouse with Ocean View',
      description: 'Luxurious penthouse with breathtaking ocean views. Features include rooftop terrace, infinity pool, and smart home technology.',
      price: 180000000,
      location: 'Eko Atlantic, Lagos',
      bedrooms: 4,
      bathrooms: 5,
      area: 420,
      propertyType: 'Penthouse',
      images: [
        'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800',
        'https://images.unsplash.com/photo-1600607687644-c7171b42498b?w=800',
      ],
      featured: true,
      status: 'AVAILABLE',
      realtorId: realtor.id,
    },
    {
      title: 'Townhouse in Gated Estate',
      description: 'Well-maintained townhouse in a secure gated estate with 24/7 security, playground, and recreational facilities.',
      price: 45000000,
      location: 'Lekki Gardens, Lagos',
      bedrooms: 4,
      bathrooms: 4,
      area: 220,
      propertyType: 'Townhouse',
      images: [
        'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800',
        'https://images.unsplash.com/photo-1600573472591-ee6b68d14f08?w=800',
      ],
      featured: false,
      status: 'AVAILABLE',
      realtorId: realtor.id,
    },
    {
      title: 'Studio Apartment - Prime Location',
      description: 'Compact and efficient studio apartment perfect for singles. Fully furnished with modern appliances.',
      price: 12000000,
      location: 'Yaba, Lagos',
      bedrooms: 1,
      bathrooms: 1,
      area: 45,
      propertyType: 'Studio',
      images: [
        'https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?w=800',
        'https://images.unsplash.com/photo-1536376072261-38c75010e6c9?w=800',
      ],
      featured: false,
      status: 'AVAILABLE',
      realtorId: realtor.id,
    },
  ];

  // Create properties
  for (const property of properties) {
    const existing = await prisma.property.findFirst({
      where: { title: property.title },
    });

    if (!existing) {
      await prisma.property.create({
        data: property,
      });
      console.log(`✅ Created property: ${property.title}`);
    } else {
      console.log(`⏭️  Property already exists: ${property.title}`);
    }
  }

  console.log('✨ Database seeding completed!');
  console.log(`📦 Total properties in database: ${await prisma.property.count()}`);
  console.log(`⭐ Featured properties: ${await prisma.property.count({ where: { featured: true } })}`);
}

main()
  .catch((e) => {
    console.error('❌ Error seeding database:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
