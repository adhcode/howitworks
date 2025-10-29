import { Module } from '@nestjs/common';
import { RealtorService } from './realtor.service';
import { RealtorController } from './realtor.controller';
import { RealtorInvitationService } from './realtor-invitation.service';
import { RealtorInvitationController } from './realtor-invitation.controller';
import { EmailModule } from '../email/email.module';

@Module({
  imports: [EmailModule],
  controllers: [RealtorController, RealtorInvitationController],
  providers: [RealtorService, RealtorInvitationService],
  exports: [RealtorService, RealtorInvitationService],
})
export class RealtorModule {}