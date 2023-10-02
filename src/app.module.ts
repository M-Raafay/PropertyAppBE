import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { ForgotPasswordModule } from './forgot_password/forgot_password.module';
import { AgencyModule } from './agency/agency.module';
import { MembersModule } from './members/members.module';
import { AgencyMembersModule } from './agency_members/agency_members.module';
import { MailerModule } from './mailer/mailer.module';
import { PropertyModule } from './property/property.module';

@Module({
  imports: [ConfigModule.forRoot({isGlobal:true}),
    PrismaModule, AuthModule, 
    ForgotPasswordModule, AgencyModule, 
    MembersModule, AgencyMembersModule, 
    MailerModule, PropertyModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
 