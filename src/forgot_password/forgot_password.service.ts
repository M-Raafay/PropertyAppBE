import { Injectable } from '@nestjs/common';
import { CreateForgotPasswordDto } from './dto/create-forgot_password.dto';
import { UpdateForgotPasswordDto } from './dto/update-forgot_password.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class ForgotPasswordService {

  constructor(
    private prismaService:PrismaService,
    private configService:ConfigService,
    private jwt:JwtService
    ){}
    
  sendMail(email:string) {


  }

  findAll() {
    return `This action returns all forgotPassword`;
  }

  findOne(id: number) {
    return `This action returns a #${id} forgotPassword`;
  }

  update(id: number, updateForgotPasswordDto: UpdateForgotPasswordDto) {
    return `This action updates a #${id} forgotPassword`;
  }

  remove(id: number) {
    return `This action removes a #${id} forgotPassword`;
  }
}
