import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { UpdateRealtorDto } from './dto/update-realtor.dto';

@Injectable()
export class RealtorService {
  constructor(private prisma: PrismaService) {}

  async getProfile(userId: string) {
    const realtor = await this.prisma.realtor.findUnique({
      where: { userId },
      include: {
        user: {
          select: {
            id: true,
            email: true,
            firstName: true,
            lastName: true,
            role: true,
            createdAt: true,
          },
        },
      },
    });

    if (!realtor) {
      throw new NotFoundException('Realtor profile not found');
    }

    return { success: true, realtor };
  }

  async updateProfile(userId: string, updateRealtorDto: UpdateRealtorDto) {
    const realtor = await this.prisma.realtor.update({
      where: { userId },
      data: {
        ...updateRealtorDto,
        updatedAt: new Date(),
      },
      include: {
        user: {
          select: {
            id: true,
            email: true,
            firstName: true,
            lastName: true,
            role: true,
          },
        },
      },
    });

    return { success: true, realtor };
  }

  async getDashboard(userId: string) {
    let realtor;
    try {
      realtor = await this.prisma.realtor.findUnique({
        where: { userId },
        include: {
          user: {
            select: {
              firstName: true,
              lastName: true,
              email: true,
            },
          },
          properties: {
            orderBy: { createdAt: 'desc' },
          },
          leads: {
            orderBy: { createdAt: 'desc' },
            take: 10,
            include: {
              property: {
                select: {
                  title: true,
                  location: true,
                },
              },
            },
          },
          commissions: {
            orderBy: { createdAt: 'desc' },
          },
        },
      });
    } catch (error) {
      // Fallback to basic realtor data if relationships don't exist
      realtor = await this.prisma.realtor.findUnique({
        where: { userId },
        include: {
          user: {
            select: {
              firstName: true,
              lastName: true,
              email: true,
            },
          },
        },
      });
    }

    if (!realtor) {
      throw new NotFoundException('Realtor not found');
    }

    const properties = (realtor as any).properties || [];
    const leads = (realtor as any).leads || [];
    const commissions = (realtor as any).commissions || [];

    // Calculate current month stats
    const currentMonth = new Date().getMonth();
    const currentYear = new Date().getFullYear();
    const monthStart = new Date(currentYear, currentMonth, 1);
    const monthEnd = new Date(currentYear, currentMonth + 1, 0);

    const leadsThisMonth = leads.filter((lead: any) => {
      const createdAt = new Date(lead.createdAt);
      return createdAt >= monthStart && createdAt <= monthEnd;
    }).length;

    const referralClicks = leads.length * 2;

    const commissionsThisMonth = commissions
      .filter((commission: any) => {
        const transactionDate = new Date(commission.transactionDate);
        return transactionDate >= monthStart && transactionDate <= monthEnd;
      })
      .reduce((sum: number, commission: any) => sum + commission.amount, 0);

    const recentLeads = leads.slice(0, 10).map((lead: any) => {
      let status: 'Connected' | 'Not Connected' | 'Converted';
      switch (lead.status) {
        case 'converted':
          status = 'Converted';
          break;
        case 'contacted':
        case 'qualified':
          status = 'Connected';
          break;
        default:
          status = 'Not Connected';
      }

      return {
        id: lead.id,
        name: lead.name,
        email: lead.email,
        phone: lead.phone,
        propertyEnquired: lead.property?.title || 'General Enquiry',
        location: lead.property?.location || 'Lekki Phase 1, Lagos',
        enquiryDate: lead.createdAt,
        status,
      };
    });

    const referralLink = `${process.env.FRONTEND_URL || 'http://localhost:3000'}/r/${realtor.slug}`;

    return {
      realtor: {
        id: realtor.id,
        firstName: realtor.user.firstName,
        lastName: realtor.user.lastName,
        email: realtor.user.email,
        profileImage: realtor.profileImage,
        slug: realtor.slug,
      },
      stats: {
        leadsGenerated: leadsThisMonth,
        referralClicks,
        commissionsEarned: commissionsThisMonth,
      },
      recentLeads,
      referralLink,
    };
  }

  async getPerformance(userId: string) {
    const realtor = await this.prisma.realtor.findUnique({
      where: { userId },
      include: {
        leads: true,
        commissions: true,
      },
    });

    if (!realtor) {
      throw new NotFoundException('Realtor not found');
    }

    return {
      totalLeads: realtor.leads?.length || 0,
      totalCommissions: realtor.commissions?.reduce((sum, c) => sum + c.amount, 0) || 0,
      conversionRate: realtor.leads?.length ? 
        (realtor.leads.filter(l => l.status === 'converted').length / realtor.leads.length) * 100 : 0,
    };
  }

  async getCommissions(userId: string) {
    const realtor = await this.prisma.realtor.findUnique({
      where: { userId },
      include: {
        commissions: {
          orderBy: { createdAt: 'desc' },
          include: {
            property: {
              select: {
                title: true,
                location: true,
              },
            },
          },
        },
      },
    });

    if (!realtor) {
      throw new NotFoundException('Realtor not found');
    }

    return realtor.commissions || [];
  }

  async getLeads(userId: string) {
    const realtor = await this.prisma.realtor.findUnique({
      where: { userId },
      include: {
        leads: {
          orderBy: { createdAt: 'desc' },
          include: {
            property: {
              select: {
                title: true,
                location: true,
              },
            },
          },
        },
      },
    });

    if (!realtor) {
      throw new NotFoundException('Realtor not found');
    }

    return realtor.leads || [];
  }

  async updateLeadStatus(userId: string, leadId: string, status: string) {
    // First verify the lead belongs to this realtor
    const lead = await this.prisma.lead.findFirst({
      where: {
        id: leadId,
        realtor: { userId },
      },
    });

    if (!lead) {
      throw new NotFoundException('Lead not found');
    }

    const updatedLead = await this.prisma.lead.update({
      where: { id: leadId },
      data: { status },
      include: {
        property: {
          select: {
            title: true,
            location: true,
          },
        },
      },
    });

    return { success: true, lead: updatedLead };
  }

  async findAll() {
    return this.prisma.realtor.findMany({
      include: {
        user: {
          select: {
            id: true,
            email: true,
            firstName: true,
            lastName: true,
            role: true,
            isActive: true,
            createdAt: true,
          },
        },
        _count: {
          select: {
            properties: true,
            leads: true,
            commissions: true,
          },
        },
      },
      orderBy: { createdAt: 'desc' },
    });
  }

  async findById(id: string) {
    return this.prisma.realtor.findUnique({
      where: { id },
      include: {
        user: {
          select: {
            id: true,
            email: true,
            firstName: true,
            lastName: true,
            role: true,
            isActive: true,
            createdAt: true,
          },
        },
        properties: {
          orderBy: { createdAt: 'desc' },
        },
        leads: {
          orderBy: { createdAt: 'desc' },
          include: {
            property: {
              select: {
                title: true,
                location: true,
              },
            },
          },
        },
        commissions: {
          orderBy: { createdAt: 'desc' },
        },
      },
    });
  }
}