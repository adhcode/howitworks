import { Injectable, NotFoundException, Inject } from '@nestjs/common';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Cache } from 'cache-manager';
import { PrismaService } from '../prisma/prisma.service';
import { CloudinaryService } from '../cloudinary/cloudinary.service';

export interface CreatePropertyDto {
  title: string;
  description?: string;
  price: number;
  location: string;
  bedrooms?: number;
  bathrooms?: number;
  area?: number;
  propertyType: string;
  images: string[];
  featured?: boolean;
  realtorId?: string;
}

export interface UpdatePropertyDto {
  title?: string;
  description?: string;
  price?: number;
  location?: string;
  bedrooms?: number;
  bathrooms?: number;
  area?: number;
  propertyType?: string;
  images?: string[];
  status?: string;
  featured?: boolean;
}

@Injectable()
export class PropertyService {
  constructor(
    private prisma: PrismaService,
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
    private cloudinaryService: CloudinaryService,
  ) {}

  async create(createPropertyDto: CreatePropertyDto, files?: Express.Multer.File[]) {
    let imageUrls: string[] = [];
    
    // Upload images to Cloudinary if files are provided
    if (files && files.length > 0) {
      try {
        imageUrls = await this.cloudinaryService.uploadMultipleImages(files);
      } catch (error) {
        console.error('Error uploading images to Cloudinary:', error);
        throw new Error('Failed to upload images');
      }
    }

    const property = await this.prisma.property.create({
      data: {
        title: createPropertyDto.title,
        description: createPropertyDto.description,
        price: createPropertyDto.price,
        location: createPropertyDto.location,
        bedrooms: createPropertyDto.bedrooms,
        bathrooms: createPropertyDto.bathrooms,
        area: createPropertyDto.area,
        propertyType: createPropertyDto.propertyType,
        images: imageUrls.length > 0 ? imageUrls : (createPropertyDto.images || []),
        featured: createPropertyDto.featured || false,
        realtorId: createPropertyDto.realtorId || null,
      },
      include: {
        realtor: createPropertyDto.realtorId ? {
          include: {
            user: {
              select: {
                firstName: true,
                lastName: true,
                email: true,
              },
            },
          },
        } : false,
        _count: {
          select: {
            investments: true,
            leads: true,
          },
        },
      },
    });

    // Clear properties cache when new property is created
    await this.clearPropertiesCache();

    return {
      success: true,
      message: 'Property created successfully',
      property,
    };
  }

  async uploadImages(propertyId: string, files: Express.Multer.File[]) {
    if (!files || files.length === 0) {
      throw new Error('No files provided');
    }

    try {
      const imageUrls = await this.cloudinaryService.uploadMultipleImages(files);
      
      // Get current property to append new images
      const currentProperty = await this.prisma.property.findUnique({
        where: { id: propertyId },
        select: { images: true }
      });

      if (!currentProperty) {
        throw new NotFoundException('Property not found');
      }

      // Append new images to existing ones
      const updatedImages = [...(currentProperty.images || []), ...imageUrls];

      const property = await this.prisma.property.update({
        where: { id: propertyId },
        data: { images: updatedImages },
        include: {
          realtor: {
            include: {
              user: {
                select: {
                  firstName: true,
                  lastName: true,
                  email: true,
                },
              },
            },
          },
          _count: {
            select: {
              investments: true,
              leads: true,
            },
          },
        },
      });

      // Clear cache
      await this.cacheManager.del(`property:${propertyId}`);
      await this.clearPropertiesCache();

      return {
        success: true,
        message: 'Images uploaded successfully',
        property,
        newImages: imageUrls,
      };
    } catch (error) {
      console.error('Error uploading images:', error);
      throw new Error('Failed to upload images');
    }
  }

  async findAll(page = 1, limit = 10, filters?: any) {
    const cacheKey = `properties:${page}:${limit}:${JSON.stringify(filters || {})}`;
    
    // Try to get from cache first
    const cached = await this.cacheManager.get(cacheKey);
    if (cached) {
      return cached;
    }

    const skip = (page - 1) * limit;
    
    const where = {};
    if (filters?.location) {
      (where as any).location = { contains: filters.location, mode: 'insensitive' };
    }
    if (filters?.propertyType) {
      (where as any).propertyType = filters.propertyType;
    }
    if (filters?.status) {
      (where as any).status = filters.status;
    }
    if (filters?.minPrice) {
      (where as any).price = { gte: filters.minPrice };
    }
    if (filters?.maxPrice) {
      (where as any).price = { ...(where as any).price, lte: filters.maxPrice };
    }

    const [properties, total] = await Promise.all([
      this.prisma.property.findMany({
        where,
        include: {
          realtor: {
            include: {
              user: {
                select: {
                  firstName: true,
                  lastName: true,
                  email: true,
                },
              },
            },
          },
          _count: {
            select: {
              investments: true,
              leads: true,
            },
          },
        },
        orderBy: { createdAt: 'desc' },
        skip,
        take: limit,
      }),
      this.prisma.property.count({ where }),
    ]);

    const result = {
      properties,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit),
      },
    };

    // Cache the result for 5 minutes
    await this.cacheManager.set(cacheKey, result, 300);
    
    return result;
  }

  async findOne(id: string) {
    const cacheKey = `property:${id}`;
    
    // Try to get from cache first
    const cached = await this.cacheManager.get(cacheKey);
    if (cached) {
      return cached;
    }

    const property = await this.prisma.property.findUnique({
      where: { id },
      include: {
        realtor: {
          include: {
            user: {
              select: {
                firstName: true,
                lastName: true,
                email: true,
              },
            },
          },
        },
        _count: {
          select: {
            investments: true,
            leads: true,
          },
        },
      },
    });

    if (!property) {
      throw new NotFoundException('Property not found');
    }

    // Cache the result for 10 minutes
    await this.cacheManager.set(cacheKey, property, 600);

    return property;
  }

  async update(id: string, updatePropertyDto: UpdatePropertyDto) {
    const property = await this.prisma.property.update({
      where: { id },
      data: updatePropertyDto,
      include: {
        realtor: {
          include: {
            user: {
              select: {
                firstName: true,
                lastName: true,
                email: true,
              },
            },
          },
        },
        _count: {
          select: {
            investments: true,
            leads: true,
          },
        },
      },
    });

    // Clear cache for this property and properties list
    await this.cacheManager.del(`property:${id}`);
    await this.clearPropertiesCache();

    return {
      success: true,
      message: 'Property updated successfully',
      property,
    };
  }

  async remove(id: string) {
    await this.prisma.property.delete({
      where: { id },
    });

    // Clear cache for this property and properties list
    await this.cacheManager.del(`property:${id}`);
    await this.clearPropertiesCache();

    return {
      success: true,
      message: 'Property deleted successfully',
    };
  }

  private async clearPropertiesCache() {
    // Clear properties cache by deleting common cache patterns
    // This is a simple approach for cache invalidation
    try {
      // We'll manually track and clear common cache keys
      // In a production environment, you might want to use cache tags or a more sophisticated approach
      const commonCacheKeys = [
        'properties:1:10:{}',
        'properties:1:20:{}',
        'properties:2:10:{}',
        'properties:1:10:{"status":"active"}',
        'properties:1:10:{"status":"sold"}',
        'properties:1:10:{"status":"pending"}',
      ];
      
      await Promise.all(
        commonCacheKeys.map(key => this.cacheManager.del(key).catch(() => {}))
      );
    } catch (error) {
      console.warn('Failed to clear properties cache:', error);
    }
  }

  async getFeatured(limit = 6) {
    const cacheKey = `featured-properties:${limit}`;
    
    // Try to get from cache first
    const cached = await this.cacheManager.get(cacheKey);
    if (cached) {
      return cached;
    }

    const featuredProperties = await this.prisma.property.findMany({
      where: { 
        status: 'active',
        featured: true 
      },
      include: {
        realtor: {
          include: {
            user: {
              select: {
                firstName: true,
                lastName: true,
                email: true,
              },
            },
          },
        },
        _count: {
          select: {
            investments: true,
            leads: true,
          },
        },
      },
      orderBy: { createdAt: 'desc' },
      take: limit,
    });

    // Cache the result for 10 minutes
    await this.cacheManager.set(cacheKey, featuredProperties, 600);

    return featuredProperties;
  }

  async toggleFeatured(id: string) {
    const property = await this.prisma.property.findUnique({
      where: { id },
      select: { featured: true }
    });

    if (!property) {
      throw new NotFoundException('Property not found');
    }

    const updatedProperty = await this.prisma.property.update({
      where: { id },
      data: { featured: !property.featured },
      include: {
        realtor: {
          include: {
            user: {
              select: {
                firstName: true,
                lastName: true,
                email: true,
              },
            },
          },
        },
        _count: {
          select: {
            investments: true,
            leads: true,
          },
        },
      },
    });

    // Clear cache for this property and featured properties
    await this.cacheManager.del(`property:${id}`);
    await this.cacheManager.del(`featured-properties:6`);
    await this.clearPropertiesCache();

    return {
      success: true,
      message: `Property ${updatedProperty.featured ? 'added to' : 'removed from'} featured list`,
      property: updatedProperty,
    };
  }
}