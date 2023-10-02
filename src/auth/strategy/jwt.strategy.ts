import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor(config: ConfigService, private prismaService: PrismaService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: config.get('JWT_SECRET'),
    });
  }

  async validate(payload: { userId: string; email: string }) {
    const user = await this.prismaService.users.findUnique({
      where: {
        userId: payload.userId,
      },
      select: {
        userId: true,
        email: true,
        role: true
      },
    });
    if(!user)
      throw new UnauthorizedException('user doesnot exist')
    return user;
  }
}
