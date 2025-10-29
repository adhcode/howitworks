import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

export interface CreateBlogDto {
  title: string;
  content: string;
  excerpt?: string;
  featuredImage?: string;
  published?: boolean;
}

export interface UpdateBlogDto {
  title?: string;
  content?: string;
  excerpt?: string;
  featuredImage?: string;
  published?: boolean;
}

@Injectable()
export class BlogService {
  constructor(private prisma: PrismaService) {}

  private generateSlug(title: string): string {
    return title
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-')
      .trim()
      .replace(/^-+|-+$/g, '');
  }

  async create(createBlogDto: CreateBlogDto) {
    let baseSlug = this.generateSlug(createBlogDto.title);
    let slug = baseSlug;
    let counter = 1;

    // Ensure unique slug
    while (await this.prisma.blog.findUnique({ where: { slug } })) {
      slug = `${baseSlug}-${counter}`;
      counter++;
    }

    const blog = await this.prisma.blog.create({
      data: {
        ...createBlogDto,
        slug,
      },
    });

    return {
      success: true,
      message: 'Blog post created successfully',
      blog,
    };
  }

  async findAll(page = 1, limit = 10, publishedOnly = false) {
    const skip = (page - 1) * limit;
    
    const where = publishedOnly ? { published: true } : {};

    const [blogs, total] = await Promise.all([
      this.prisma.blog.findMany({
        where,
        orderBy: { createdAt: 'desc' },
        skip,
        take: limit,
      }),
      this.prisma.blog.count({ where }),
    ]);

    return {
      blogs,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit),
      },
    };
  }

  async findOne(slug: string) {
    const blog = await this.prisma.blog.findUnique({
      where: { slug },
    });

    if (!blog) {
      throw new NotFoundException('Blog post not found');
    }

    return blog;
  }

  async findById(id: string) {
    const blog = await this.prisma.blog.findUnique({
      where: { id },
    });

    if (!blog) {
      throw new NotFoundException('Blog post not found');
    }

    return blog;
  }

  async update(id: string, updateBlogDto: UpdateBlogDto) {
    const existingBlog = await this.prisma.blog.findUnique({
      where: { id },
    });

    if (!existingBlog) {
      throw new NotFoundException('Blog post not found');
    }

    let slug = existingBlog.slug;

    // If title is being updated, generate new slug
    if (updateBlogDto.title && updateBlogDto.title !== existingBlog.title) {
      let baseSlug = this.generateSlug(updateBlogDto.title);
      slug = baseSlug;
      let counter = 1;

      // Ensure unique slug (excluding current blog)
      while (await this.prisma.blog.findFirst({ 
        where: { 
          slug,
          NOT: { id }
        } 
      })) {
        slug = `${baseSlug}-${counter}`;
        counter++;
      }
    }

    const blog = await this.prisma.blog.update({
      where: { id },
      data: {
        ...updateBlogDto,
        slug,
      },
    });

    return {
      success: true,
      message: 'Blog post updated successfully',
      blog,
    };
  }

  async remove(id: string) {
    const blog = await this.prisma.blog.findUnique({
      where: { id },
    });

    if (!blog) {
      throw new NotFoundException('Blog post not found');
    }

    await this.prisma.blog.delete({
      where: { id },
    });

    return {
      success: true,
      message: 'Blog post deleted successfully',
    };
  }

  async getFeatured(limit = 3) {
    const blogs = await this.prisma.blog.findMany({
      where: { published: true },
      orderBy: { createdAt: 'desc' },
      take: limit,
    });

    return blogs;
  }
}