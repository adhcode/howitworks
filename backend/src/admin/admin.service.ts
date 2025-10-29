import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { RealtorService } from '../realtor/realtor.service';

@Injectable()
export class AdminService {
  constructor(
    private prisma: PrismaService,
    private realtorService: RealtorService,
  ) {}

  async getAllRealtors() {
    return this.realtorService.findAll();
  }

  async getRealtorById(id: string) {
    return this.realtorService.findById(id);
  }

  async updateRealtor(id: string, data: any) {
    const { user, ...realtorData } = data;
    
    return this.prisma.realtor.update({
      where: { id },
      data: {
        ...realtorData,
        ...(user && {
          user: {
            update: user,
          },
        }),
      },
      include: {
        user: {
          select: {
            id: true,
            email: true,
            firstName: true,
            lastName: true,
            isActive: true,
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
    });
  }

  async deleteRealtor(id: string) {
    // This will cascade delete the user as well due to the schema relationship
    return this.prisma.realtor.delete({
      where: { id },
    });
  }

  async updateRealtorStatus(id: string, isActive: boolean) {
    const realtor = await this.prisma.realtor.findUnique({
      where: { id },
      select: { userId: true },
    });

    if (!realtor) {
      throw new Error('Realtor not found');
    }

    await this.prisma.user.update({
      where: { id: realtor.userId },
      data: { isActive },
    });

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
        },
        commissions: {
          orderBy: { createdAt: 'desc' },
        },
        _count: {
          select: {
            properties: true,
            leads: true,
            commissions: true,
          },
        },
      },
    });
  }

  async getAllInvestors() {
    return this.prisma.investor.findMany({
      include: {
        user: {
          select: {
            id: true,
            email: true,
            firstName: true,
            lastName: true,
            createdAt: true,
          },
        },
        _count: {
          select: {
            investments: true,
            inquiries: true,
          },
        },
      },
      orderBy: { createdAt: 'desc' },
    });
  }

  async getInvestorById(id: string) {
    return this.prisma.investor.findUnique({
      where: { id },
      include: {
        user: {
          select: {
            id: true,
            email: true,
            firstName: true,
            lastName: true,
            createdAt: true,
          },
        },
        investments: {
          orderBy: { createdAt: 'desc' },
          include: {
            property: {
              select: {
                title: true,
                location: true,
                price: true,
              },
            },
          },
        },
        inquiries: {
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
  }

  async getDashboardStats() {
    const [
      totalRealtors,
      totalInvestors,
      totalProperties,
      totalLeads,
      totalInvestments,
      totalCommissions,
      recentRealtors,
      recentLeads,
      recentInvestments,
    ] = await Promise.all([
      this.prisma.realtor.count(),
      this.prisma.investor.count(),
      this.prisma.property.count(),
      this.prisma.lead.count(),
      this.prisma.investment.aggregate({
        _sum: { amount: true },
        _count: true,
      }),
      this.prisma.commission.aggregate({
        _sum: { amount: true },
      }),
      this.prisma.realtor.findMany({
        take: 5,
        where: {
          user: {
            isActive: true,
          },
        },
        orderBy: { createdAt: 'desc' },
        include: {
          user: {
            select: {
              id: true,
              firstName: true,
              lastName: true,
              email: true,
              isActive: true,
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
      }),
      this.prisma.lead.findMany({
        take: 10,
        orderBy: { createdAt: 'desc' },
        include: {
          realtor: {
            include: {
              user: {
                select: {
                  firstName: true,
                  lastName: true,
                },
              },
            },
          },
          property: {
            select: {
              title: true,
            },
          },
        },
      }),
      this.prisma.investment.findMany({
        take: 5,
        orderBy: { createdAt: 'desc' },
        include: {
          investor: {
            include: {
              user: {
                select: {
                  firstName: true,
                  lastName: true,
                },
              },
            },
          },
          property: {
            select: {
              title: true,
              location: true,
              price: true,
            },
          },
        },
      }),
    ]);

    // Count active realtors
    const activeRealtors = await this.prisma.realtor.count({
      where: {
        user: {
          isActive: true,
        },
      },
    });

    return {
      stats: {
        totalRealtors,
        activeRealtors,
        totalInvestors,
        totalProperties,
        totalLeads,
        totalInvestments: totalInvestments._count || 0,
        totalInvestmentAmount: totalInvestments._sum.amount || 0,
        totalCommissions: totalCommissions._sum.amount || 0,
        recentRealtors,
        recentLeads,
        recentInvestments,
      },
    };
  }

  async getAnalytics() {
    // Get monthly data for the last 12 months
    const months = [];
    const now = new Date();
    
    for (let i = 11; i >= 0; i--) {
      const date = new Date(now.getFullYear(), now.getMonth() - i, 1);
      const nextMonth = new Date(now.getFullYear(), now.getMonth() - i + 1, 1);
      
      const [realtors, leads, commissions] = await Promise.all([
        this.prisma.realtor.count({
          where: {
            createdAt: {
              gte: date,
              lt: nextMonth,
            },
          },
        }),
        this.prisma.lead.count({
          where: {
            createdAt: {
              gte: date,
              lt: nextMonth,
            },
          },
        }),
        this.prisma.commission.aggregate({
          where: {
            createdAt: {
              gte: date,
              lt: nextMonth,
            },
          },
          _sum: { amount: true },
        }),
      ]);

      months.push({
        month: date.toLocaleString('default', { month: 'short', year: 'numeric' }),
        realtors,
        leads,
        commissions: commissions._sum.amount || 0,
      });
    }

    return { monthlyData: months };
  }

  // Investment Management
  async getAllInvestments(query: any = {}) {
    const { page = 1, limit = 10, status, investorId, propertyId } = query;
    const skip = (page - 1) * limit;

    const where: any = {};
    if (status) where.status = status;
    if (investorId) where.investorId = investorId;
    if (propertyId) where.propertyId = propertyId;

    const [investments, total] = await Promise.all([
      this.prisma.investment.findMany({
        where,
        skip,
        take: parseInt(limit),
        orderBy: { createdAt: 'desc' },
        include: {
          investor: {
            include: {
              user: {
                select: {
                  id: true,
                  firstName: true,
                  lastName: true,
                  email: true,
                },
              },
            },
          },
          property: {
            select: {
              id: true,
              title: true,
              location: true,
              price: true,
              propertyType: true,
            },
          },
        },
      }),
      this.prisma.investment.count({ where }),
    ]);

    return {
      investments,
      pagination: {
        total,
        page: parseInt(page),
        limit: parseInt(limit),
        totalPages: Math.ceil(total / limit),
      },
    };
  }

  async createInvestment(data: {
    investorId: string;
    propertyId: string;
    amount: number;
    investmentType: string;
    expectedReturn?: number;
    investmentDate: string;
  }) {
    return this.prisma.investment.create({
      data: {
        ...data,
        investmentDate: new Date(data.investmentDate),
        status: 'pending',
      },
      include: {
        investor: {
          include: {
            user: {
              select: {
                firstName: true,
                lastName: true,
                email: true,
              },
            },
          },
        },
        property: {
          select: {
            title: true,
            location: true,
            price: true,
          },
        },
      },
    });
  }

  async updateInvestment(id: string, data: any) {
    return this.prisma.investment.update({
      where: { id },
      data,
      include: {
        investor: {
          include: {
            user: {
              select: {
                firstName: true,
                lastName: true,
                email: true,
              },
            },
          },
        },
        property: {
          select: {
            title: true,
            location: true,
            price: true,
          },
        },
      },
    });
  }

  async deleteInvestment(id: string) {
    return this.prisma.investment.delete({
      where: { id },
    });
  }

  // Enhanced Investor Management
  async updateInvestor(id: string, data: any) {
    const { user, ...investorData } = data;
    
    return this.prisma.investor.update({
      where: { id },
      data: {
        ...investorData,
        ...(user && {
          user: {
            update: user,
          },
        }),
      },
      include: {
        user: {
          select: {
            id: true,
            email: true,
            firstName: true,
            lastName: true,
            isActive: true,
          },
        },
        _count: {
          select: {
            investments: true,
            inquiries: true,
          },
        },
      },
    });
  }

  async deleteInvestor(id: string) {
    // This will cascade delete the user as well due to the schema relationship
    return this.prisma.investor.delete({
      where: { id },
    });
  }

  async updateInvestorStatus(id: string, isActive: boolean) {
    const investor = await this.prisma.investor.findUnique({
      where: { id },
      select: { userId: true },
    });

    if (!investor) {
      throw new Error('Investor not found');
    }

    await this.prisma.user.update({
      where: { id: investor.userId },
      data: { isActive },
    });

    return this.prisma.investor.findUnique({
      where: { id },
      include: {
        user: {
          select: {
            id: true,
            email: true,
            firstName: true,
            lastName: true,
            isActive: true,
          },
        },
      },
    });
  }

  // Properties Management
  async getAllProperties(query: any = {}) {
    const { page = 1, limit = 10, status, propertyType, realtorId } = query;
    const skip = (page - 1) * limit;

    const where: any = {};
    if (status) where.status = status;
    if (propertyType) where.propertyType = propertyType;
    if (realtorId) where.realtorId = realtorId;

    const [properties, total] = await Promise.all([
      this.prisma.property.findMany({
        where,
        skip,
        take: parseInt(limit),
        orderBy: { createdAt: 'desc' },
        include: {
          realtor: {
            include: {
              user: {
                select: {
                  firstName: true,
                  lastName: true,
                  email: true,
                },
              },
            },
          },
          _count: {
            select: {
              investments: true,
              leads: true,
            },
          },
        },
      }),
      this.prisma.property.count({ where }),
    ]);

    return {
      properties,
      pagination: {
        total,
        page: parseInt(page),
        limit: parseInt(limit),
        totalPages: Math.ceil(total / limit),
      },
    };
  }

  // Commission Management
  async getAllCommissions() {
    return this.prisma.commission.findMany({
      orderBy: { createdAt: 'desc' },
      include: {
        realtor: {
          include: {
            user: {
              select: {
                id: true,
                firstName: true,
                lastName: true,
                email: true,
              },
            },
          },
        },
        lead: {
          include: {
            property: {
              select: {
                id: true,
                title: true,
                location: true,
                price: true,
              },
            },
          },
        },
      },
    });
  }

  async updateCommissionStatus(id: string, status: string) {
    return this.prisma.commission.update({
      where: { id },
      data: { status },
      include: {
        realtor: {
          include: {
            user: {
              select: {
                firstName: true,
                lastName: true,
                email: true,
              },
            },
          },
        },
        lead: {
          include: {
            property: true,
          },
        },
      },
    });
  }
}