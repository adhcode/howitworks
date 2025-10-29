import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

export interface CreateLeadDto {
  name: string;
  email: string;
  phone?: string;
  message?: string;
  realtorId?: string;
  realtorSlug?: string;
  propertyId?: string;
  source?: string;
}

@Injectable()
export class LeadService {
  constructor(private prisma: PrismaService) {}

  async create(createLeadDto: CreateLeadDto) {
    let realtorId: string | null = null;

    // Priority 1: Referral link (realtorSlug from URL parameter)
    if (createLeadDto.realtorSlug) {
      const realtor = await this.prisma.realtor.findUnique({
        where: { slug: createLeadDto.realtorSlug },
      });
      if (realtor) {
        realtorId = realtor.id;
        console.log(`✅ Lead assigned to realtor via referral link: ${realtor.slug}`);
      }
    }

    // Priority 2: Direct realtor ID (if provided)
    if (!realtorId && createLeadDto.realtorId && createLeadDto.realtorId.trim() !== '') {
      const realtor = await this.prisma.realtor.findUnique({
        where: { id: createLeadDto.realtorId },
      });
      if (realtor) {
        realtorId = realtor.id;
        console.log(`✅ Lead assigned to realtor via ID: ${realtor.id}`);
      }
    }

    // Priority 3: Property's assigned realtor
    if (!realtorId && createLeadDto.propertyId) {
      const property = await this.prisma.property.findUnique({
        where: { id: createLeadDto.propertyId },
        select: { realtorId: true },
      });
      if (property?.realtorId) {
        realtorId = property.realtorId;
        console.log(`✅ Lead assigned to property's realtor: ${property.realtorId}`);
      }
    }

    // If no realtor assigned, leave as null (admin can assign later)
    if (!realtorId) {
      console.log(`ℹ️ Lead created without realtor assignment - will be assigned by admin`);
    }

    const lead = await this.prisma.lead.create({
      data: {
        name: createLeadDto.name,
        email: createLeadDto.email,
        phone: createLeadDto.phone,
        message: createLeadDto.message,
        realtorId: realtorId, // Can be null now
        propertyId: createLeadDto.propertyId,
        source: createLeadDto.source || 'website',
        status: 'new',
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
      message: 'Lead created successfully',
      lead,
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
    if (filters?.source) {
      (where as any).source = filters.source;
    }

    const [leads, total] = await Promise.all([
      this.prisma.lead.findMany({
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
      this.prisma.lead.count({ where }),
    ]);

    return {
      leads,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit),
      },
    };
  }

  async findOne(id: string) {
    const lead = await this.prisma.lead.findUnique({
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

    if (!lead) {
      throw new NotFoundException('Lead not found');
    }

    return lead;
  }

  async updateStatus(id: string, status: string) {
    const lead = await this.prisma.lead.update({
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
            location: true,
            price: true,
            commissionRate: true,
            commissionType: true,
          },
        },
      },
    });

    // If lead is converted, create commission automatically
    if (status === 'converted' && lead.realtorId && lead.propertyId && lead.property) {
      await this.createCommissionFromLead(lead);
    }

    return {
      success: true,
      message: 'Lead status updated successfully',
      lead,
    };
  }

  private async createCommissionFromLead(lead: any) {
    try {
      const property = lead.property;
      
      // Calculate commission amount
      const commissionAmount = this.calculateCommission(property);
      
      console.log(`💰 Creating commission for lead ${lead.id}`);
      console.log(`   Property: ${property.title} (₦${property.price.toLocaleString()})`);
      console.log(`   Commission: ₦${commissionAmount.toLocaleString()}`);
      console.log(`   Realtor: ${lead.realtor.user.firstName} ${lead.realtor.user.lastName}`);
      
      // Create commission record
      const commission = await this.prisma.commission.create({
        data: {
          client: lead.name,
          amount: commissionAmount,
          status: 'pending',
          transactionDate: new Date(),
          realtorId: lead.realtorId,
          propertyId: lead.propertyId,
          leadId: lead.id,
          notes: `Auto-generated from lead conversion. Source: ${lead.source || 'unknown'}`,
        },
      });
      
      console.log(`✅ Commission created: ${commission.id} (₦${commission.amount.toLocaleString()})`);
      
      return commission;
    } catch (error) {
      console.error('❌ Error creating commission from lead:', error);
      // Don't throw error - commission creation failure shouldn't block lead update
    }
  }

  private calculateCommission(property: any): number {
    const rate = property.commissionRate || 3.0;
    const type = property.commissionType || 'percentage';
    
    if (type === 'fixed') {
      return rate;
    }
    
    // Percentage calculation
    return property.price * (rate / 100);
  }

  async getRealtorLeads(realtorId: string, page = 1, limit = 10) {
    const skip = (page - 1) * limit;

    const [leads, total] = await Promise.all([
      this.prisma.lead.findMany({
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
      this.prisma.lead.count({ where: { realtorId } }),
    ]);

    return {
      leads,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit),
      },
    };
  }
}