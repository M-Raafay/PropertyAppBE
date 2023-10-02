import { ExecutionContext, Inject, UnauthorizedException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { AuthGuard } from '@nestjs/passport';

export class JwtGuard extends AuthGuard('jwt') {
  
  handleRequest(err, user, info?:Error) {

    if (err || !user) {
      throw err || new UnauthorizedException(info.message);
    }
    return user;
  }

}
