import { Controller, Get, Post, Put, Body, Param, Query } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiQuery } from '@nestjs/swagger';
import { LeadService, CreateLeadDto } from './lead.service';

@ApiTags('leads')
@Controller('leads')
export class LeadController {
  constructor(private readonly leadService: LeadService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new lead' })
  @ApiResponse({ status: 201, description: 'Lead created successfully' })
  async create(@Body() createLeadDto: CreateLeadDto) {
    return this.leadService.create(createLeadDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all leads with pagination and filters' })
  @ApiResponse({ status: 200, description: 'Leads retrieved successfully' })
  @ApiQuery({ name: 'page', required: false, type: Number })
  @ApiQuery({ name: 'limit', required: false, type: Number })
  @ApiQuery({ name: 'status', required: false, type: String })
  @ApiQuery({ name: 'realtorId', required: false, type: String })
  @ApiQuery({ name: 'source', required: false, type: String })
  async findAll(@Query() query: any) {
    const { page, limit, ...filters } = query;
    return this.leadService.findAll(
      parseInt(page) || 1,
      parseInt(limit) || 10,
      filters,
    );
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get lead by ID' })
  @ApiResponse({ status: 200, description: 'Lead retrieved successfully' })
  async findOne(@Param('id') id: string) {
    return this.leadService.findOne(id);
  }

  @Put(':id/status')
  @ApiOperation({ summary: 'Update lead status' })
  @ApiResponse({ status: 200, description: 'Lead status updated successfully' })
  async updateStatus(@Param('id') id: string, @Body('status') status: string) {
    return this.leadService.updateStatus(id, status);
  }
}