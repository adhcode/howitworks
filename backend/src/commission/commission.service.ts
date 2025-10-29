import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

export interface CreateCommissionDto {
  client: string;
  amount: number;
  transactionDate: string;
  realtorId: string;
  propertyId?: string;
}

@Injectable()
export class CommissionService {
  constructor(private prisma: PrismaService) {}

  async create(createCommissionDto: CreateCommissionDto) {
    const commission = await this.prisma.commission.create({
      data: {
        client: createCommissionDto.client,
        amount: createCommissionDto.amount,
        transactionDate: new Date(createCommissionDto.transactionDate),
        realtorId: createCommissionDto.realtorId,
        propertyId: createCommissionDto.propertyId,
        status: 'pending',
      },
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
        property: {
          select: {
            title: true,
            location: true,
          },
        },
      },
    });

    return {
      success: true,
      message: 'Commission created successfully',
      commission,
    };
  }

  async findAll(page = 1, limit = 10, filters?: any) {
    const skip = (page - 1) * limit;
    
    const where = {};
    if (filters?.status) {
      (where as any).status = filters.status;
    }
    if (filters?.realtorId) {
      (where as any).realtorId = filters.realtorId;
    }

    const [commissions, total] = await Promise.all([
      this.prisma.commission.findMany({
        where,
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
          property: {
            select: {
              title: true,
              location: true,
            },
          },
        },
        orderBy: { createdAt: 'desc' },
        skip,
        take: limit,
      }),
      this.prisma.commission.count({ where }),
    ]);

    return {
      commissions,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit),
      },
    };
  }

  async findOne(id: string) {
    const commission = await this.prisma.commission.findUnique({
      where: { id },
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
          select: {
            bankName: true,
            accountNumber: true,
            accountName: true,
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

    if (!commission) {
      throw new NotFoundException('Commission not found');
    }

    return commission;
  }

  async updateStatus(id: string, status: string) {
    const commission = await this.prisma.commission.update({
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
        property: {
          select: {
            title: true,
          },
        },
      },
    });

    return {
      success: true,
      message: 'Commission status updated successfully',
      commission,
    };
  }

  async getRealtorCommissions(realtorId: string, page = 1, limit = 10) {
    const skip = (page - 1) * limit;

    const [commissions, total] = await Promise.all([
      this.prisma.commission.findMany({
        where: { realtorId },
        include: {
          property: {
            select: {
              title: true,
              location: true,
            },
          },
        },
        orderBy: { createdAt: 'desc' },
        skip,
        take: limit,
      }),
      this.prisma.commission.count({ where: { realtorId } }),
    ]);

    return {
      commissions,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit),
      },
    };
  }

  async requestPayout(commissionId: string, realtorUserId: string) {
    // First verify the commission belongs to this realtor
    const commission = await this.prisma.commission.findFirst({
      where: {
        id: commissionId,
        realtor: { userId: realtorUserId },
        status: 'pending',
      },
    });

    if (!commission) {
      throw new NotFoundException('Commission not found or already processed');
    }

    // In a real app, you'd integrate with a payment processor here
    // For now, we'll just mark it as requested
    const updatedCommission = await this.prisma.commission.update({
      where: { id: commissionId },
      data: { 
        status: 'requested',
        updatedAt: new Date(),
      },
    });

    return {
      success: true,
      message: 'Payout request submitted successfully',
      commission: updatedCommission,
    };
  }
}