import { ConflictException, ForbiddenException, Injectable, InternalServerErrorException, NotAcceptableException, NotFoundException } from '@nestjs/common';
import { SignUpDto } from './dto/signup.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import * as bcrypt from 'bcrypt';
import { LogInDto } from './dto/login.dto';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { ResetPasswordDto } from './dto/reset_password.dto';
import { RequestUser } from './interface/auth.interface';

@Injectable()
export class AuthService {

  constructor(
    private prismaService:PrismaService,
    private configService:ConfigService,
    private jwt:JwtService
    ){}

  async signup(signupDto: SignUpDto) {

    try{
    const {password, ...userData} = signupDto
    const hashedPassword =  await bcrypt.hash(password,10)
      if (!hashedPassword)
        throw new InternalServerErrorException('password encryption issue');

      const userCreated = await this.prismaService.users.create({
        data :{
          ...userData,
          password:hashedPassword
        },
        select:{
          userId: true,
          firstName: true,
          lastName: true,
          email: true,
          createdAt: true,
          role: true
        }
      })

     return userCreated;// remove password
   }catch(error){
      if (error.code === 'P2002') {
        throw new ConflictException('Email already exists');
      }
      throw new InternalServerErrorException('Error occurred during signup', error.message)
   }
   
  }



  async login(loginDto: LogInDto) {
    try {
      const user = await this.prismaService.users.findUnique({
        where: {
          email: loginDto.email,
        },
      });
      
      if (!user) 
        throw new NotFoundException('User doesnot exist! : Check Email');

      const isPasswordMatch = await bcrypt.compare(loginDto.password,user.password);  

      if (!isPasswordMatch)
        throw new ForbiddenException('Credentials incorrect');

      const token =  this.generateToken(user.userId, user.email, user.role)
      return token;

    } catch (error) {

      throw error;
    }
  }


  async generateToken(
    id:string,
    email:string,
    role:string){

    const payload = {
      userId:id,
      email:email,
      role:role     
    }

    const jwt_secret = this.configService.get('JWT_SECRET')

    const token = await this.jwt.signAsync(payload, {
      expiresIn: '12h',
      secret: jwt_secret,
    });

    return {
      access_token: token,
    };
  }

  async resetPassword(resetpasswordDto: ResetPasswordDto, userDecoded:RequestUser) {
    if(resetpasswordDto.newPassword !== resetpasswordDto.confirmPassword){
      throw new NotAcceptableException('New password & old password does not match')
    }

    try {
      const user = await this.prismaService.users.findUnique({
        where: {
          userId: userDecoded.userId,
        },
      });
      
      if (!user) 
        throw new NotFoundException('User doesnot exist!');

      const isPasswordMatch = await bcrypt.compare(resetpasswordDto.oldPassword,user.password);  

      if (!isPasswordMatch)
        throw new NotAcceptableException('Old password incorrect');

      const hashedPassword =  await bcrypt.hash(resetpasswordDto.newPassword,10)

      const passwordUpdate =await this.prismaService.users.update({
        where:{
          userId:user.userId
        },
        data:{
          password:hashedPassword
        }
      })
      return {message: 'Password Updated'}// make him logout??
    } catch (error) {

      throw error;
    }
  }
  
  async findAll() {

    const data =  await this.prismaService.users.findMany()
    
    return data;
  }




}
