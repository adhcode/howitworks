import { Injectable, BadRequestException, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { EmailService } from '../email/email.service';
import { randomBytes } from 'crypto';
import * as bcrypt from 'bcrypt';

export interface CreateInvitationDto {
  email: string;
  firstName: string;
  lastName: string;
}

export interface AcceptInvitationDto {
  phoneNumber: string;
  residentialAddress: string;
  password: string;
  bankName: string;
  accountNumber: string;
  accountName: string;
  profileImage?: string;
}

@Injectable()
export class RealtorInvitationService {
  constructor(
    private prisma: PrismaService,
    private emailService: EmailService,
  ) {}

  async createInvitation(createInvitationDto: CreateInvitationDto) {
    const { email, firstName, lastName } = createInvitationDto;

    // Check if user already exists
    const existingUser = await this.prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      throw new BadRequestException('A user with this email already exists');
    }

    // Check if there's already a pending invitation
    const existingInvitation = await this.prisma.realtorInvitation.findFirst({
      where: {
        email,
        status: 'PENDING',
        expiresAt: {
          gt: new Date(),
        },
      },
    });

    if (existingInvitation) {
      throw new BadRequestException('A pending invitation already exists for this email');
    }

    // Generate secure token
    const token = randomBytes(32).toString('hex');
    
    // Set expiration to 7 days from now
    const expiresAt = new Date();
    expiresAt.setDate(expiresAt.getDate() + 7);

    // Create invitation record
    const invitation = await this.prisma.realtorInvitation.create({
      data: {
        email,
        firstName,
        lastName,
        token,
        status: 'PENDING',
        expiresAt,
      },
    });

    // Send invitation email
    const emailSent = await this.emailService.sendRealtorInvitation(
      email,
      firstName,
      lastName,
      token
    );

    if (!emailSent) {
      // If email fails, we might want to delete the invitation or mark it as failed
      await this.prisma.realtorInvitation.update({
        where: { id: invitation.id },
        data: { status: 'FAILED' },
      });
      throw new BadRequestException('Failed to send invitation email');
    }

    return {
      id: invitation.id,
      email: invitation.email,
      firstName: invitation.firstName,
      lastName: invitation.lastName,
      token: invitation.token,
      status: invitation.status,
      createdAt: invitation.createdAt,
      expiresAt: invitation.expiresAt,
    };
  }

  async validateInvitation(token: string) {
    const invitation = await this.prisma.realtorInvitation.findUnique({
      where: { token },
    });

    if (!invitation) {
      throw new NotFoundException('Invitation not found');
    }

    if (invitation.status !== 'PENDING') {
      throw new BadRequestException('This invitation has already been used or expired');
    }

    if (new Date() > invitation.expiresAt) {
      // Mark as expired
      await this.prisma.realtorInvitation.update({
        where: { id: invitation.id },
        data: { status: 'EXPIRED' },
      });
      throw new BadRequestException('This invitation has expired');
    }

    return {
      id: invitation.id,
      email: invitation.email,
      firstName: invitation.firstName,
      lastName: invitation.lastName,
      status: invitation.status,
      expiresAt: invitation.expiresAt,
    };
  }

  async acceptInvitation(token: string, acceptInvitationDto: AcceptInvitationDto) {
    // Validate invitation first
    const invitation = await this.validateInvitation(token);

    // Check if user already exists (double-check)
    const existingUser = await this.prisma.user.findUnique({
      where: { email: invitation.email },
    });

    if (existingUser) {
      throw new BadRequestException('A user with this email already exists');
    }

    // Hash the password before storing
    const hashedPassword = await bcrypt.hash(acceptInvitationDto.password, 10);

    // Create user and realtor in a transaction
    const result = await this.prisma.$transaction(async (prisma) => {
      // Create user
      const user = await prisma.user.create({
        data: {
          email: invitation.email,
          firstName: invitation.firstName,
          lastName: invitation.lastName,
          password: hashedPassword,
          role: 'REALTOR',
          isActive: true,
        },
      });

      // Generate unique slug for realtor
      const baseSlug = `${invitation.firstName}-${invitation.lastName}`.toLowerCase().replace(/[^a-z0-9]/g, '-');
      let slug = baseSlug;
      let counter = 1;

      // Ensure slug is unique
      while (await prisma.realtor.findUnique({ where: { slug } })) {
        slug = `${baseSlug}-${counter}`;
        counter++;
      }

      // Create realtor profile
      const realtor = await prisma.realtor.create({
        data: {
          userId: user.id,
          phoneNumber: acceptInvitationDto.phoneNumber,
          residentialAddress: acceptInvitationDto.residentialAddress,
          bankName: acceptInvitationDto.bankName,
          accountNumber: acceptInvitationDto.accountNumber,
          accountName: acceptInvitationDto.accountName,
          profileImage: acceptInvitationDto.profileImage || '/dashboard/avatar.svg',
          slug,
        },
        include: {
          user: true,
        },
      });

      // Mark invitation as accepted
      await prisma.realtorInvitation.update({
        where: { id: invitation.id },
        data: { 
          status: 'ACCEPTED',
          acceptedAt: new Date(),
        },
      });

      return realtor;
    });

    // Send welcome email with referral link
    const frontendUrl = process.env.FRONTEND_URL || 'http://localhost:3000';
    const referralLink = `${frontendUrl}?ref=${result.slug}`;
    
    await this.emailService.sendWelcomeEmail(
      result.user.email,
      result.user.firstName,
      result.user.lastName,
      referralLink
    );

    return result;
  }

  async getAllInvitations() {
    return this.prisma.realtorInvitation.findMany({
      orderBy: { createdAt: 'desc' },
    });
  }

  async resendInvitation(invitationId: string) {
    const invitation = await this.prisma.realtorInvitation.findUnique({
      where: { id: invitationId },
    });

    if (!invitation) {
      throw new NotFoundException('Invitation not found');
    }

    if (invitation.status !== 'PENDING') {
      throw new BadRequestException('Can only resend pending invitations');
    }

    // Extend expiration by 7 days
    const newExpiresAt = new Date();
    newExpiresAt.setDate(newExpiresAt.getDate() + 7);

    await this.prisma.realtorInvitation.update({
      where: { id: invitationId },
      data: { expiresAt: newExpiresAt },
    });

    // Resend email
    const emailSent = await this.emailService.sendRealtorInvitation(
      invitation.email,
      invitation.firstName,
      invitation.lastName,
      invitation.token
    );

    if (!emailSent) {
      throw new BadRequestException('Failed to resend invitation email');
    }

    return { message: 'Invitation resent successfully' };
  }
}