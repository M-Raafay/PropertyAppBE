import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Req, HttpException, HttpStatus } from '@nestjs/common';
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

  private phoneRegex = /^\+92[345678]\d{9}$/;


  @Post('sendOTP')
  sendOtp(@Body('phoneNumber') phoneNumber: string) {
    if (!this.phoneRegex.test(phoneNumber)) {
      throw new HttpException('Invalid phone number', HttpStatus.BAD_REQUEST);
    }

    return this.authService.sendOtpHardcoded(phoneNumber);
    //return this.authService.sendOTP(phoneNumber);
  }

  @Post('verifyOTP')
  verifyOtp(@Body('phoneNumber') phoneNumber: string,@Body('code')  code:string) {
    if (!this.phoneRegex.test(phoneNumber)) {
      throw new HttpException('Invalid phone number', HttpStatus.BAD_REQUEST);
    }
    return this.authService.verifyOtpHardcoded(phoneNumber , code);
  }

  // remove after app is finalised. also change auth servie methods of sendotp & verifyotp from hardcoded to dynamic using twilio
  @Get('otpOfNumber')
  getOtpOfNumber(@Body('phoneNumber') phoneNumber: string) {
    if (!this.phoneRegex.test(phoneNumber)) {
      throw new HttpException('Invalid phone number', HttpStatus.BAD_REQUEST);
    }
    return this.authService.getOtpHardcoded(phoneNumber);
  }

  @Post('signup')
  signup(@Body() signupDto: SignUpDto) {
    return this.authService.signup(signupDto);
  }

  // @Post('login')
  // login(@Body() loginDto: LogInDto) {
  //   return this.authService.login(loginDto);
  // }

  // @UseGuards(JwtGuard)
  // @Post('reset_password')
  // resetPassword(@Body() resetpasswordDto: ResetPasswordDto, @Req() req: any) {
  //   return this.authService.resetPassword(resetpasswordDto,req.user)
  //}

  // @UseGuards(JwtGuard)
  // @Post('reset_password')
  // forgotPassword(@Body() resetpasswordDto: ResetPasswordDto, @Req() req: any) {
  //   return this.authService.forgotPassword(resetpasswordDto,req.user)
  // }

  //@UseGuards(JwtGuard)
  @Get()
  findAll() {
    return this.authService.findAll();
  }

}
