import { Controller, Get, Post, Put, Delete, Param, Query, Body, UseGuards, UseInterceptors, UploadedFiles } from '@nestjs/common';
import { FilesInterceptor } from '@nestjs/platform-express';
import { ApiTags, ApiOperation, ApiResponse, ApiQuery, ApiBearerAuth, ApiConsumes } from '@nestjs/swagger';
import { PropertyService, CreatePropertyDto, UpdatePropertyDto } from './property.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../common/guards/roles.guard';
import { Roles } from '../common/decorators/roles.decorator';

@ApiTags('properties')
@Controller('properties')
export class PropertyController {
  constructor(private readonly propertyService: PropertyService) {}

  @Get()
  @ApiOperation({ summary: 'Get all properties with pagination and filters' })
  @ApiResponse({ status: 200, description: 'Properties retrieved successfully' })
  @ApiQuery({ name: 'page', required: false, type: Number })
  @ApiQuery({ name: 'limit', required: false, type: Number })
  @ApiQuery({ name: 'location', required: false, type: String })
  @ApiQuery({ name: 'propertyType', required: false, type: String })
  @ApiQuery({ name: 'minPrice', required: false, type: Number })
  @ApiQuery({ name: 'maxPrice', required: false, type: Number })
  @ApiQuery({ name: 'status', required: false, type: String })
  async findAll(@Query() query: any) {
    const { page, limit, ...filters } = query;
    return this.propertyService.findAll(
      parseInt(page) || 1,
      parseInt(limit) || 10,
      filters,
    );
  }

  @Get('featured')
  @ApiOperation({ summary: 'Get featured properties' })
  @ApiResponse({ status: 200, description: 'Featured properties retrieved successfully' })
  @ApiQuery({ name: 'limit', required: false, type: Number })
  async getFeatured(@Query('limit') limit?: string) {
    return this.propertyService.getFeatured(parseInt(limit) || 6);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get property by ID' })
  @ApiResponse({ status: 200, description: 'Property retrieved successfully' })
  async findOne(@Param('id') id: string) {
    return this.propertyService.findOne(id);
  }

  @Post()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('ADMIN', 'REALTOR')
  @UseInterceptors(FilesInterceptor('images', 10))
  @ApiBearerAuth()
  @ApiConsumes('multipart/form-data')
  @ApiOperation({ summary: 'Create a new property with images' })
  @ApiResponse({ status: 201, description: 'Property created successfully' })
  async create(
    @Body() body: any,
    @UploadedFiles() files: Express.Multer.File[]
  ) {
    // Convert string numbers to actual numbers
    const createPropertyDto: CreatePropertyDto = {
      title: body.title,
      description: body.description,
      price: body.price ? parseFloat(body.price) : undefined,
      location: body.location,
      bedrooms: body.bedrooms ? parseInt(body.bedrooms) : undefined,
      bathrooms: body.bathrooms ? parseInt(body.bathrooms) : undefined,
      area: body.area ? parseFloat(body.area) : undefined,
      propertyType: body.propertyType,
      images: [], // Will be populated by service
      featured: body.featured === 'true' || body.featured === true,
      realtorId: body.realtorId,
    };
    
    return this.propertyService.create(createPropertyDto, files);
  }

  @Post('upload-images/:id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('ADMIN', 'REALTOR')
  @UseInterceptors(FilesInterceptor('images', 10))
  @ApiBearerAuth()
  @ApiConsumes('multipart/form-data')
  @ApiOperation({ summary: 'Upload additional images to existing property' })
  @ApiResponse({ status: 200, description: 'Images uploaded successfully' })
  async uploadImages(
    @Param('id') id: string,
    @UploadedFiles() files: Express.Multer.File[]
  ) {
    return this.propertyService.uploadImages(id, files);
  }

  @Put(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('ADMIN', 'REALTOR')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Update property by ID' })
  @ApiResponse({ status: 200, description: 'Property updated successfully' })
  async update(@Param('id') id: string, @Body() updatePropertyDto: UpdatePropertyDto) {
    return this.propertyService.update(id, updatePropertyDto);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('ADMIN')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Delete property by ID' })
  @ApiResponse({ status: 200, description: 'Property deleted successfully' })
  async remove(@Param('id') id: string) {
    return this.propertyService.remove(id);
  }

  @Put(':id/featured')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('ADMIN')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Toggle property featured status' })
  @ApiResponse({ status: 200, description: 'Property featured status updated successfully' })
  async toggleFeatured(@Param('id') id: string) {
    return this.propertyService.toggleFeatured(id);
  }
}