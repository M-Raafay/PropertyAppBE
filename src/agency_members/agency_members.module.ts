import { Module } from '@nestjs/common';
import { AgencyMembersService } from './agency_members.service';
import { AgencyMembersController } from './agency_members.controller';
import { MembersModule } from 'src/members/members.module';
import { PrismaModule } from 'src/prisma/prisma.module';
import { MailerModule } from 'src/mailer/mailer.module';

@Module({
  imports:[PrismaModule,MembersModule,MailerModule],
  controllers: [AgencyMembersController],
  providers: [AgencyMembersService],
})
export class AgencyMembersModule {}
