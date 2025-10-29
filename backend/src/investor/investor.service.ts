import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

export interface UpdateInvestorDto {
  phoneNumber?: string;
  address?: string;
  investmentBudget?: number;
  preferredLocation?: string;
  profileImage?: string;
}

export interface CreateInvestmentDto {
  propertyId: string;
  amount: number;
  investmentType: 'full_purchase' | 'partial_investment' | 'rental_income';
  expectedReturn?: number;
}

@Injectable()
export class InvestorService {
  constructor(private prisma: PrismaService) {}

  async getProfile(userId: string) {
    const investor = await this.prisma.investor.findUnique({
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

    if (!investor) {
      throw new NotFoundException('Investor profile not found');
    }

    return { success: true, investor };
  }

  async updateProfile(userId: string, updateInvestorDto: UpdateInvestorDto) {
    const investor = await this.prisma.investor.update({
      where: { userId },
      data: {
        ...updateInvestorDto,
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

    return { success: true, investor };
  }

  async getDashboard(userId: string) {
    const investor = await this.prisma.investor.findUnique({
      where: { userId },
      include: {
        user: {
          select: {
            firstName: true,
            lastName: true,
            email: true,
          },
        },
        investments: {
          include: {
            property: {
              select: {
                title: true,
                location: true,
                price: true,
                images: true,
              },
            },
          },
          orderBy: { createdAt: 'desc' },
        },
        inquiries: {
          include: {
            property: {
              select: {
                title: true,
                location: true,
              },
            },
            realtor: {
              select: {
                user: {
                  select: {
                    firstName: true,
                    lastName: true,
                  },
                },
              },
            },
          },
          orderBy: { createdAt: 'desc' },
          take: 10,
        },
      },
    });

    if (!investor) {
      throw new NotFoundException('Investor not found');
    }

    // Calculate stats
    const totalInvestments = investor.investments.reduce((sum, inv) => sum + inv.amount, 0);
    const activeInvestments = investor.investments.filter(inv => inv.status === 'approved' || inv.status === 'completed').length;
    const pendingInvestments = investor.investments.filter(inv => inv.status === 'pending').length;
    const totalExpectedReturns = investor.investments.reduce((sum, inv) => sum + (inv.expectedReturn || 0), 0);

    return {
      investor: {
        id: investor.id,
        firstName: investor.user.firstName,
        lastName: investor.user.lastName,
        email: investor.user.email,
        profileImage: investor.profileImage,
        investmentBudget: investor.investmentBudget,
        preferredLocation: investor.preferredLocation,
      },
      stats: {
        totalInvestments,
        activeInvestments,
        pendingInvestments,
        totalExpectedReturns,
      },
      recentInvestments: investor.investments.slice(0, 5),
      recentInquiries: investor.inquiries,
    };
  }

  async getInvestments(userId: string, page = 1, limit = 10) {
    const skip = (page - 1) * limit;

    const investor = await this.prisma.investor.findUnique({
      where: { userId },
      select: { id: true },
    });

    if (!investor) {
      throw new NotFoundException('Investor not found');
    }

    const [investments, total] = await Promise.all([
      this.prisma.investment.findMany({
        where: { investorId: investor.id },
        include: {
          property: {
            select: {
              title: true,
              location: true,
              price: true,
              images: true,
              realtor: {
                select: {
                  user: {
                    select: {
                      firstName: true,
                      lastName: true,
                    },
                  },
                },
              },
            },
          },
        },
        orderBy: { createdAt: 'desc' },
        skip,
        take: limit,
      }),
      this.prisma.investment.count({
        where: { investorId: investor.id },
      }),
    ]);

    return {
      investments,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit),
      },
    };
  }

  async createInvestment(userId: string, createInvestmentDto: CreateInvestmentDto) {
    const investor = await this.prisma.investor.findUnique({
      where: { userId },
      select: { id: true },
    });

    if (!investor) {
      throw new NotFoundException('Investor not found');
    }

    const investment = await this.prisma.investment.create({
      data: {
        investorId: investor.id,
        propertyId: createInvestmentDto.propertyId,
        amount: createInvestmentDto.amount,
        investmentType: createInvestmentDto.investmentType,
        expectedReturn: createInvestmentDto.expectedReturn,
        investmentDate: new Date(),
        status: 'pending',
      },
      include: {
        property: {
          select: {
            title: true,
            location: true,
            price: true,
          },
        },
      },
    });

    return {
      success: true,
      message: 'Investment request created successfully',
      investment,
    };
  }

  async getInvestmentById(userId: string, investmentId: string) {
    const investor = await this.prisma.investor.findUnique({
      where: { userId },
      select: { id: true },
    });

    if (!investor) {
      throw new NotFoundException('Investor not found');
    }

    const investment = await this.prisma.investment.findFirst({
      where: {
        id: investmentId,
        investorId: investor.id,
      },
      include: {
        property: {
          include: {
            realtor: {
              select: {
                user: {
                  select: {
                    firstName: true,
                    lastName: true,
                    email: true,
                  },
                },
                phoneNumber: true,
              },
            },
          },
        },
      },
    });

    if (!investment) {
      throw new NotFoundException('Investment not found');
    }

    return investment;
  }
}