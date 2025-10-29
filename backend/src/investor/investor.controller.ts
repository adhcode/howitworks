import { Controller, Get, Put, Post, Body, UseGuards, Query, Param } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth, ApiQuery } from '@nestjs/swagger';
import { InvestorService, UpdateInvestorDto, CreateInvestmentDto } from './investor.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../common/guards/roles.guard';
import { Roles } from '../common/decorators/roles.decorator';
import { CurrentUser } from '../common/decorators/current-user.decorator';

@ApiTags('investor')
@Controller('investor')
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles('INVESTOR')
@ApiBearerAuth()
export class InvestorController {
  constructor(private readonly investorService: InvestorService) {}

  @Get('profile')
  @ApiOperation({ summary: 'Get investor profile' })
  @ApiResponse({ status: 200, description: 'Profile retrieved successfully' })
  async getProfile(@CurrentUser() user: any) {
    return this.investorService.getProfile(user.id);
  }

  @Put('profile')
  @ApiOperation({ summary: 'Update investor profile' })
  @ApiResponse({ status: 200, description: 'Profile updated successfully' })
  async updateProfile(@CurrentUser() user: any, @Body() updateInvestorDto: UpdateInvestorDto) {
    return this.investorService.updateProfile(user.id, updateInvestorDto);
  }

  @Get('dashboard')
  @ApiOperation({ summary: 'Get investor dashboard data' })
  @ApiResponse({ status: 200, description: 'Dashboard data retrieved successfully' })
  async getDashboard(@CurrentUser() user: any) {
    return this.investorService.getDashboard(user.id);
  }

  @Get('investments')
  @ApiOperation({ summary: 'Get investor investments' })
  @ApiResponse({ status: 200, description: 'Investments retrieved successfully' })
  @ApiQuery({ name: 'page', required: false, type: Number })
  @ApiQuery({ name: 'limit', required: false, type: Number })
  async getInvestments(
    @CurrentUser() user: any,
    @Query('page') page?: string,
    @Query('limit') limit?: string,
  ) {
    return this.investorService.getInvestments(
      user.id,
      parseInt(page) || 1,
      parseInt(limit) || 10,
    );
  }

  @Post('investments')
  @ApiOperation({ summary: 'Create new investment' })
  @ApiResponse({ status: 201, description: 'Investment created successfully' })
  async createInvestment(@CurrentUser() user: any, @Body() createInvestmentDto: CreateInvestmentDto) {
    return this.investorService.createInvestment(user.id, createInvestmentDto);
  }

  @Get('investments/:id')
  @ApiOperation({ summary: 'Get investment by ID' })
  @ApiResponse({ status: 200, description: 'Investment retrieved successfully' })
  async getInvestmentById(@CurrentUser() user: any, @Param('id') id: string) {
    return this.investorService.getInvestmentById(user.id, id);
  }
}