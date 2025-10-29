import { Module } from '@nestjs/common';
import { AdminService } from './admin.service';
import { AdminController } from './admin.controller';
import { RealtorModule } from '../realtor/realtor.module';

@Module({
  imports: [RealtorModule],
  controllers: [AdminController],
  providers: [AdminService],
})
export class AdminModule {}