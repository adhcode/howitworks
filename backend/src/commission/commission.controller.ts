import { Controller, Get, Post, Put, Body, Param, Query, UseGuards, Req } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiQuery, ApiBearerAuth } from '@nestjs/swagger';
import { CommissionService, CreateCommissionDto } from './commission.service';
import { AuthGuard } from '../common/guards/auth.guard';
import { AdminGuard } from '../common/guards/admin.guard';
import { Request } from 'express';

@ApiTags('commissions')
@Controller('commissions')
export class CommissionController {
  constructor(private readonly commissionService: CommissionService) {}

  @Post()
  @UseGuards(AuthGuard, AdminGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Create a new commission (Admin only)' })
  @ApiResponse({ status: 201, description: 'Commission created successfully' })
  async create(@Body() createCommissionDto: CreateCommissionDto) {
    return this.commissionService.create(createCommissionDto);
  }

  @Get()
  @UseGuards(AuthGuard, AdminGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get all commissions with pagination and filters (Admin only)' })
  @ApiResponse({ status: 200, description: 'Commissions retrieved successfully' })
  @ApiQuery({ name: 'page', required: false, type: Number })
  @ApiQuery({ name: 'limit', required: false, type: Number })
  @ApiQuery({ name: 'status', required: false, type: String })
  @ApiQuery({ name: 'realtorId', required: false, type: String })
  async findAll(@Query() query: any) {
    const { page, limit, ...filters } = query;
    return this.commissionService.findAll(
      parseInt(page) || 1,
      parseInt(limit) || 10,
      filters,
    );
  }

  @Get('realtor/:realtorId')
  @UseGuards(AuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get commissions for a specific realtor' })
  @ApiResponse({ status: 200, description: 'Realtor commissions retrieved successfully' })
  @ApiQuery({ name: 'page', required: false, type: Number })
  @ApiQuery({ name: 'limit', required: false, type: Number })
  async getRealtorCommissions(
    @Param('realtorId') realtorId: string,
    @Query() query: any,
  ) {
    const { page, limit } = query;
    return this.commissionService.getRealtorCommissions(
      realtorId,
      parseInt(page) || 1,
      parseInt(limit) || 10,
    );
  }

  @Post(':id/request-payout')
  @UseGuards(AuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Request payout for a commission' })
  @ApiResponse({ status: 200, description: 'Payout request submitted successfully' })
  async requestPayout(@Param('id') id: string, @Req() req: Request) {
    const userId = (req as any).userId;
    return this.commissionService.requestPayout(id, userId);
  }

  @Get(':id')
  @UseGuards(AuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get commission by ID' })
  @ApiResponse({ status: 200, description: 'Commission retrieved successfully' })
  async findOne(@Param('id') id: string) {
    return this.commissionService.findOne(id);
  }

  @Put(':id/status')
  @UseGuards(AuthGuard, AdminGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Update commission status (Admin only)' })
  @ApiResponse({ status: 200, description: 'Commission status updated successfully' })
  async updateStatus(@Param('id') id: string, @Body('status') status: string) {
    return this.commissionService.updateStatus(id, status);
  }
}