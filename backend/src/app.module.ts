import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ThrottlerModule, ThrottlerGuard } from '@nestjs/throttler';
import { APP_GUARD } from '@nestjs/core';
import { PrismaModule } from './prisma/prisma.module';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { RealtorModule } from './realtor/realtor.module';
import { InvestorModule } from './investor/investor.module';
import { AdminModule } from './admin/admin.module';
import { PropertyModule } from './property/property.module';
import { LeadModule } from './lead/lead.module';
import { CommissionModule } from './commission/commission.module';
import { BlogModule } from './blog/blog.module';
import { RedisCacheModule } from './cache/cache.module';
import { EmailModule } from './email/email.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    // Add rate limiting: 100 requests per minute per IP
    ThrottlerModule.forRoot([{
      ttl: 60000, // 1 minute
      limit: 100, // 100 requests per minute
    }]),
    // Add Redis caching
    RedisCacheModule,
    PrismaModule,
    AuthModule,
    UserModule,
    RealtorModule,
    InvestorModule,
    AdminModule,
    PropertyModule,
    LeadModule,
    CommissionModule,
    BlogModule,
    EmailModule,
  ],
  providers: [
    {
      provide: APP_GUARD,
      useClass: ThrottlerGuard,
    },
  ],
})
export class AppModule {}