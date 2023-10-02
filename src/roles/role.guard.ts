import { Injectable, CanActivate, ExecutionContext, InternalServerErrorException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { UserRole } from './role.enum';
// import { JwtService } from '@nestjs/jwt';
// import { ConfigService } from '@nestjs/config';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    // private jwt:JwtService,
    // private configService:ConfigService,
    ) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredRoles = this.reflector.get<UserRole[]>('roles', context.getHandler());

    if (!requiredRoles) {
      return true; 
    }
    
    const request = context.switchToHttp().getRequest();
    
    // const token = request.headers.authorization?.split('Bearer ')[1];

    // const jwt_secret = this.configService.get('JWT_SECRET')
    // if (token) {
    //     try {
    //       const decodedToken = this.jwt.verify(token,{secret: jwt_secret}); 
    //       request.userRole= decodedToken.role; // change it to user from userRole
    //     } catch (error) {
    //         throw new InternalServerErrorException(error.message)
    //     }
    // }

    //const { userRole } = context.switchToHttp().getRequest();

    const user = request.user
    return requiredRoles.some((role) => user.role.includes(role));
  }
}
