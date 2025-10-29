import { Controller, Get, Post, Put, Delete, Param, Body, UseGuards, Query } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { AdminService } from './admin.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../common/guards/roles.guard';
import { Roles } from '../common/decorators/roles.decorator';

@ApiTags('admin')
@Controller('admin')
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles('ADMIN')
@ApiBearerAuth()
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  @Get('realtors')
  @ApiOperation({ summary: 'Get all realtors (Admin only)' })
  @ApiResponse({ status: 200, description: 'Realtors retrieved successfully' })
  async getAllRealtors() {
    return this.adminService.getAllRealtors();
  }

  @Get('realtors/:id')
  @ApiOperation({ summary: 'Get realtor by ID (Admin only)' })
  @ApiResponse({ status: 200, description: 'Realtor retrieved successfully' })
  async getRealtorById(@Param('id') id: string) {
    return this.adminService.getRealtorById(id);
  }

  @Put('realtors/:id')
  @ApiOperation({ summary: 'Update realtor (Admin only)' })
  @ApiResponse({ status: 200, description: 'Realtor updated successfully' })
  async updateRealtor(@Param('id') id: string, @Body() updateRealtorDto: any) {
    return this.adminService.updateRealtor(id, updateRealtorDto);
  }

  @Delete('realtors/:id')
  @ApiOperation({ summary: 'Delete realtor (Admin only)' })
  @ApiResponse({ status: 200, description: 'Realtor deleted successfully' })
  async deleteRealtor(@Param('id') id: string) {
    return this.adminService.deleteRealtor(id);
  }

  @Put('realtors/:id/status')
  @ApiOperation({ summary: 'Update realtor status (Admin only)' })
  @ApiResponse({ status: 200, description: 'Realtor status updated successfully' })
  async updateRealtorStatus(@Param('id') id: string, @Body() statusDto: { isActive: boolean }) {
    return this.adminService.updateRealtorStatus(id, statusDto.isActive);
  }

  @Get('investors')
  @ApiOperation({ summary: 'Get all investors (Admin only)' })
  @ApiResponse({ status: 200, description: 'Investors retrieved successfully' })
  async getAllInvestors() {
    return this.adminService.getAllInvestors();
  }

  @Get('investors/:id')
  @ApiOperation({ summary: 'Get investor by ID (Admin only)' })
  @ApiResponse({ status: 200, description: 'Investor retrieved successfully' })
  async getInvestorById(@Param('id') id: string) {
    return this.adminService.getInvestorById(id);
  }

  @Get('dashboard')
  @ApiOperation({ summary: 'Get admin dashboard stats' })
  @ApiResponse({ status: 200, description: 'Dashboard stats retrieved successfully' })
  async getDashboardStats() {
    return this.adminService.getDashboardStats();
  }

  @Get('analytics')
  @ApiOperation({ summary: 'Get admin analytics data' })
  @ApiResponse({ status: 200, description: 'Analytics data retrieved successfully' })
  async getAnalytics() {
    return this.adminService.getAnalytics();
  }

  // Investment Management
  @Get('investments')
  @ApiOperation({ summary: 'Get all investments (Admin only)' })
  @ApiResponse({ status: 200, description: 'Investments retrieved successfully' })
  async getAllInvestments(@Query() query: any) {
    return this.adminService.getAllInvestments(query);
  }

  @Post('investments')
  @ApiOperation({ summary: 'Create new investment (Admin only)' })
  @ApiResponse({ status: 201, description: 'Investment created successfully' })
  async createInvestment(@Body() createInvestmentDto: any) {
    return this.adminService.createInvestment(createInvestmentDto);
  }

  @Put('investments/:id')
  @ApiOperation({ summary: 'Update investment (Admin only)' })
  @ApiResponse({ status: 200, description: 'Investment updated successfully' })
  async updateInvestment(@Param('id') id: string, @Body() updateInvestmentDto: any) {
    return this.adminService.updateInvestment(id, updateInvestmentDto);
  }

  @Delete('investments/:id')
  @ApiOperation({ summary: 'Delete investment (Admin only)' })
  @ApiResponse({ status: 200, description: 'Investment deleted successfully' })
  async deleteInvestment(@Param('id') id: string) {
    return this.adminService.deleteInvestment(id);
  }

  // Investor Management
  @Put('investors/:id')
  @ApiOperation({ summary: 'Update investor (Admin only)' })
  @ApiResponse({ status: 200, description: 'Investor updated successfully' })
  async updateInvestor(@Param('id') id: string, @Body() updateInvestorDto: any) {
    return this.adminService.updateInvestor(id, updateInvestorDto);
  }

  @Delete('investors/:id')
  @ApiOperation({ summary: 'Delete investor (Admin only)' })
  @ApiResponse({ status: 200, description: 'Investor deleted successfully' })
  async deleteInvestor(@Param('id') id: string) {
    return this.adminService.deleteInvestor(id);
  }

  @Put('investors/:id/status')
  @ApiOperation({ summary: 'Update investor status (Admin only)' })
  @ApiResponse({ status: 200, description: 'Investor status updated successfully' })
  async updateInvestorStatus(@Param('id') id: string, @Body() statusDto: { isActive: boolean }) {
    return this.adminService.updateInvestorStatus(id, statusDto.isActive);
  }

  // Properties Management
  @Get('properties')
  @ApiOperation({ summary: 'Get all properties (Admin only)' })
  @ApiResponse({ status: 200, description: 'Properties retrieved successfully' })
  async getAllProperties(@Query() query: any) {
    return this.adminService.getAllProperties(query);
  }

  // Commission Management
  @Get('commissions')
  @ApiOperation({ summary: 'Get all commissions (Admin only)' })
  @ApiResponse({ status: 200, description: 'Commissions retrieved successfully' })
  async getAllCommissions() {
    return this.adminService.getAllCommissions();
  }

  @Put('commissions/:id/status')
  @ApiOperation({ summary: 'Update commission status (Admin only)' })
  @ApiResponse({ status: 200, description: 'Commission status updated successfully' })
  async updateCommissionStatus(@Param('id') id: string, @Body() statusDto: { status: string }) {
    return this.adminService.updateCommissionStatus(id, statusDto.status);
  }
}