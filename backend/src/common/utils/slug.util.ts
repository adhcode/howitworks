import { PrismaService } from '../../prisma/prisma.service';

export class SlugUtil {
  static async generateUniqueSlug(prisma: PrismaService, fullName: string): Promise<string> {
    // Create base slug from full name
    let baseSlug = fullName
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, '') // Remove special characters
      .replace(/\s+/g, '-') // Replace spaces with hyphens
      .replace(/-+/g, '-') // Replace multiple hyphens with single
      .trim();

    // Remove leading/trailing hyphens
    baseSlug = baseSlug.replace(/^-+|-+$/g, '');

    let slug = baseSlug;
    let counter = 1;

    // Check if slug exists and increment if needed
    while (await prisma.realtor.findUnique({ where: { slug } })) {
      slug = `${baseSlug}-${counter}`;
      counter++;
    }

    return slug;
  }
}