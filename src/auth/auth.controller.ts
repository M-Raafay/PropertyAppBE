import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Req } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignUpDto } from './dto/signup.dto';
import { LogInDto } from './dto/login.dto';
import { JwtGuard } from './guard/jwt.guard';
import { ResetPasswordDto } from './dto/reset_password.dto';
//import { JwtUserPayload } from './entities/auth.entity';
//import { UpdateAuthDto } from './dto/update-auth.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signup')
  signup(@Body() signupDto: SignUpDto) {
    return this.authService.signup(signupDto);
  }

  @Post('login')
  login(@Body() loginDto: LogInDto) {
    return this.authService.login(loginDto);
  }

  @UseGuards(JwtGuard)
  @Post('reset_password')
  resetPassword(@Body() resetpasswordDto: ResetPasswordDto, @Req() req: any) {
    return this.authService.resetPassword(resetpasswordDto,req.user)
  }

  // @UseGuards(JwtGuard)
  // @Post('reset_password')
  // forgotPassword(@Body() resetpasswordDto: ResetPasswordDto, @Req() req: any) {
  //   return this.authService.forgotPassword(resetpasswordDto,req.user)
  // }

  @UseGuards(JwtGuard)
  @Get()
  findAll() {
    return this.authService.findAll();
  }

}
