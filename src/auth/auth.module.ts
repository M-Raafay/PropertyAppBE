import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './strategy/jwt.strategy';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TwilioModule, TwilioService } from 'nestjs-twilio';
import { ImageModule } from 'src/image/image.module';

@Module({
  imports:[JwtModule.register({}),PrismaModule, ImageModule
    // TwilioModule.forRootAsync({
    //   imports: [ConfigModule],
    //   useFactory: (cfg: ConfigService) => ({
    //     accountSid: cfg.get('TWILIO_ACCOUNT_SID'),
    //     authToken: cfg.get('TWILIO_AUTH_TOKEN'),
    //   }),
    //   inject: [ConfigService],
    // })
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy],
})
export class AuthModule {}
