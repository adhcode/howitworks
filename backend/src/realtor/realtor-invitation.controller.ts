import {
  Controller,
  Post,
  Get,
  Body,
  Param,
  UseGuards,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../common/guards/roles.guard';
import { Roles } from '../common/decorators/roles.decorator';
import { RealtorInvitationService, CreateInvitationDto, AcceptInvitationDto } from './realtor-invitation.service';

@Controller()
export class RealtorInvitationController {
  constructor(private readonly realtorInvitationService: RealtorInvitationService) {}

  // Admin endpoints
  @Post('admin/realtors/invite')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('ADMIN')
  @HttpCode(HttpStatus.CREATED)
  async createInvitation(@Body() createInvitationDto: CreateInvitationDto) {
    return this.realtorInvitationService.createInvitation(createInvitationDto);
  }

  @Get('admin/realtors/invitations')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('ADMIN')
  async getAllInvitations() {
    return this.realtorInvitationService.getAllInvitations();
  }

  @Post('admin/realtors/invitations/:id/resend')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('ADMIN')
  async resendInvitation(@Param('id') invitationId: string) {
    return this.realtorInvitationService.resendInvitation(invitationId);
  }

  // Public endpoints for realtor registration
  @Get('auth/realtor-invitation/:token')
  async validateInvitation(@Param('token') token: string) {
    return this.realtorInvitationService.validateInvitation(token);
  }

  @Post('auth/realtor-invitation/:token/accept')
  @HttpCode(HttpStatus.CREATED)
  async acceptInvitation(
    @Param('token') token: string,
    @Body() acceptInvitationDto: AcceptInvitationDto,
  ) {
    return this.realtorInvitationService.acceptInvitation(token, acceptInvitationDto);
  }
}