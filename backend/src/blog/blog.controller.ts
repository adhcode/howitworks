import { Controller, Get, Post, Put, Delete, Body, Param, Query, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiQuery, ApiBearerAuth } from '@nestjs/swagger';
import { BlogService, CreateBlogDto, UpdateBlogDto } from './blog.service';
import { AuthGuard } from '../common/guards/auth.guard';
import { AdminGuard } from '../common/guards/admin.guard';

@ApiTags('blog')
@Controller('blog')
export class BlogController {
  constructor(private readonly blogService: BlogService) {}

  @Post()
  @UseGuards(AuthGuard, AdminGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Create a new blog post (Admin only)' })
  @ApiResponse({ status: 201, description: 'Blog post created successfully' })
  async create(@Body() createBlogDto: CreateBlogDto) {
    return this.blogService.create(createBlogDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all blog posts with pagination' })
  @ApiResponse({ status: 200, description: 'Blog posts retrieved successfully' })
  @ApiQuery({ name: 'page', required: false, type: Number })
  @ApiQuery({ name: 'limit', required: false, type: Number })
  @ApiQuery({ name: 'published', required: false, type: Boolean })
  async findAll(@Query() query: any) {
    const { page, limit, published } = query;
    return this.blogService.findAll(
      parseInt(page) || 1,
      parseInt(limit) || 10,
      published === 'true',
    );
  }

  @Get('featured')
  @ApiOperation({ summary: 'Get featured blog posts' })
  @ApiResponse({ status: 200, description: 'Featured blog posts retrieved successfully' })
  @ApiQuery({ name: 'limit', required: false, type: Number })
  async getFeatured(@Query('limit') limit?: string) {
    return this.blogService.getFeatured(parseInt(limit) || 3);
  }

  @Get(':slug')
  @ApiOperation({ summary: 'Get blog post by slug' })
  @ApiResponse({ status: 200, description: 'Blog post retrieved successfully' })
  async findOne(@Param('slug') slug: string) {
    return this.blogService.findOne(slug);
  }

  @Put(':id')
  @UseGuards(AuthGuard, AdminGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Update blog post (Admin only)' })
  @ApiResponse({ status: 200, description: 'Blog post updated successfully' })
  async update(@Param('id') id: string, @Body() updateBlogDto: UpdateBlogDto) {
    return this.blogService.update(id, updateBlogDto);
  }

  @Delete(':id')
  @UseGuards(AuthGuard, AdminGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Delete blog post (Admin only)' })
  @ApiResponse({ status: 200, description: 'Blog post deleted successfully' })
  async remove(@Param('id') id: string) {
    return this.blogService.remove(id);
  }
}