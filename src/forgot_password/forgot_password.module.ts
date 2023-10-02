import { Module } from '@nestjs/common';
import { ForgotPasswordService } from './forgot_password.service';
import { ForgotPasswordController } from './forgot_password.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
import { JwtModule } from '@nestjs/jwt';
import { MailerService } from './mailer/mailer.service';

@Module({
  imports:[PrismaModule, JwtModule],
  controllers: [ForgotPasswordController],
  providers: [ForgotPasswordService, MailerService],
})
export class ForgotPasswordModule {}
