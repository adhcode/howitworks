import { Controller, Get, Put, Body, UseGuards, Param } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { RealtorService } from './realtor.service';
import { UpdateRealtorDto } from './dto/update-realtor.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../common/guards/roles.guard';
import { Roles } from '../common/decorators/roles.decorator';
import { CurrentUser } from '../common/decorators/current-user.decorator';

@ApiTags('realtor')
@Controller('realtor')
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles('REALTOR')
@ApiBearerAuth()
export class RealtorController {
  constructor(private readonly realtorService: RealtorService) {}

  @Get('profile')
  @ApiOperation({ summary: 'Get realtor profile' })
  @ApiResponse({ status: 200, description: 'Profile retrieved successfully' })
  async getProfile(@CurrentUser() user: any) {
    return this.realtorService.getProfile(user.id);
  }

  @Put('profile')
  @ApiOperation({ summary: 'Update realtor profile' })
  @ApiResponse({ status: 200, description: 'Profile updated successfully' })
  async updateProfile(@CurrentUser() user: any, @Body() updateRealtorDto: UpdateRealtorDto) {
    return this.realtorService.updateProfile(user.id, updateRealtorDto);
  }

  @Get('dashboard')
  @ApiOperation({ summary: 'Get realtor dashboard data' })
  @ApiResponse({ status: 200, description: 'Dashboard data retrieved successfully' })
  async getDashboard(@CurrentUser() user: any) {
    return this.realtorService.getDashboard(user.id);
  }

  @Get('performance')
  @ApiOperation({ summary: 'Get realtor performance metrics' })
  @ApiResponse({ status: 200, description: 'Performance data retrieved successfully' })
  async getPerformance(@CurrentUser() user: any) {
    return this.realtorService.getPerformance(user.id);
  }

  @Get('commissions')
  @ApiOperation({ summary: 'Get realtor commissions' })
  @ApiResponse({ status: 200, description: 'Commissions retrieved successfully' })
  async getCommissions(@CurrentUser() user: any) {
    return this.realtorService.getCommissions(user.id);
  }

  @Get('leads')
  @ApiOperation({ summary: 'Get realtor leads' })
  @ApiResponse({ status: 200, description: 'Leads retrieved successfully' })
  async getLeads(@CurrentUser() user: any) {
    return this.realtorService.getLeads(user.id);
  }

  @Put('leads/:leadId/status')
  @ApiOperation({ summary: 'Update lead status' })
  @ApiResponse({ status: 200, description: 'Lead status updated successfully' })
  async updateLeadStatus(
    @CurrentUser() user: any,
    @Param('leadId') leadId: string,
    @Body('status') status: string,
  ) {
    return this.realtorService.updateLeadStatus(user.id, leadId, status);
  }
}