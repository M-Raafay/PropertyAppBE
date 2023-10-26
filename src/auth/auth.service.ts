import { BadRequestException, ConflictException, ForbiddenException, HttpException, HttpStatus, Injectable, InternalServerErrorException, NotAcceptableException, NotFoundException, ServiceUnavailableException } from '@nestjs/common';
import { SignUpDto } from './dto/signup.dto';
import { PrismaService } from 'src/prisma/prisma.service';
// import * as bcrypt from 'bcrypt';
// import { LogInDto } from './dto/login.dto';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { ResetPasswordDto } from './dto/reset_password.dto';
import { RequestUser } from './interface/auth.interface';
import { Prisma } from '@prisma/client';
import { Twilio } from 'twilio';
import { ImageService } from 'src/image/image.service';

@Injectable()
export class AuthService {
  private twilioClient: Twilio
  constructor(
    private prismaService:PrismaService,
    private configService:ConfigService,
    private jwt:JwtService,
    private imageService: ImageService
    //private readonly twilioService: TwilioService,

    ){
      const accountSid = this.configService.get<string>('TWILIO_ACCOUNT_SID');
      const authToken = this.configService.get<string>('TWILIO_AUTH_TOKEN');
      this.twilioClient = new Twilio(accountSid, authToken);
      // this.twilioClient = new Twilio(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);
      // const accountSid = this.configService.get<string>('twilio.accountSid');
      // const authToken = this.configService.get<string>('twilio.authToken');
      // this.client = new Twilio(accountSid, authToken);
    }


  // }

  private service = this.configService.get<string>('TWILIO_ACCOUNT_Service_SID')

  // async sendOtpHardcoded(phoneNumber: string){ // change phoneNumber to contactNumber in controller
  //   try{

  //     const existingUser = await this.prismaService.users.findUnique({
  //       where:{contactNumber:phoneNumber}
  //     })

  //     const generatedOtp = this.generateRandom4DigitNumber();

  //     if (existingUser){
  //       const existingUserLogin = await this.prismaService.users.update({
  //         where:{contactNumber:phoneNumber},
  //         data:{
  //           otp:generatedOtp
  //         },
  //         select:{
  //           userId:true,
  //           contactNumber:true,
  //           isNumberVerified:true,
  //           isSignedUp:true,
  //           otp:true
  //         }
  //       })

  //       return {message : 'OTP created',user:existingUserLogin }
  //     }
      
  //     const userCreated = await this.prismaService.users.create({
  //       data  :{
  //         contactNumber:phoneNumber,
  //         otp:generatedOtp
  //       },
  //       select:{
  //         userId:true,
  //         contactNumber:true,
  //         isNumberVerified:true,
  //         isSignedUp:true,
  //         otp:true
  //       }
  //     })

  //     return {message : 'OTP created', user:userCreated}
  //   }catch (error){
  //     throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
  //   }
  // }

  async sendOtpHardcoded(phoneNumber: string){ // change phoneNumber to contactNumber in controller
    try{
    
      const existingNumber = await this.prismaService.verifyNumber.findUnique({
        where:{contactNumber:phoneNumber}
      })
      const generatedOtp = this.generateRandom4DigitNumber();

      if (existingNumber){
          const existingUserLogin = await this.prismaService.verifyNumber.update({
            where:{contactNumber:phoneNumber},
            data:{
              otp:generatedOtp
            },
            // select:{
              
            //   contactNumber:true,
            //   isNumberVerified:true,
            //   isSignedUp:true,
            //   otp:true
            // }
          })

        return {message : 'OTP created',user:existingUserLogin }
      }
      
      const newNumberOtp = await this.prismaService.verifyNumber.create({
        data  :{
          contactNumber:phoneNumber,
          otp:generatedOtp
        }
      })
      return {message : 'OTP created', user:newNumberOtp}
    }catch (error){
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }



  async getOtpHardcoded(phoneNumber:string){
    try{
      const userCreated = await this.prismaService.verifyNumber.findUnique({
        where:{
          contactNumber:phoneNumber
        },
        select:{
          otp:true
        }
      })

      return userCreated
  }catch (error){
    throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
  }
  }

  async verifyOtpHardcoded(phoneNumber: string, usercode : string){
    try{
      const existingNumber = await this.prismaService.verifyNumber.findUnique({
        where:{
          contactNumber:phoneNumber
        },
        select:{
          contactNumber:true,
          //isNumberVerified:true,
          otp:true
        }
      })
      if(!existingNumber){
        throw new NotFoundException('Number with OTP doesnot exists')
      }

      if(existingNumber.otp !== usercode){
       throw new NotAcceptableException('OTP is incorrect')
      }

      await this.prismaService.verifyNumber.delete({
        where:{
          contactNumber:phoneNumber,
          otp:usercode
        }
      })

      const previousUser = await this.prismaService.users.findUnique({
        where:{
          contactNumber:phoneNumber
        }
      })

      if(previousUser.email === null && previousUser.role=== null){
        return {message:'OTP Verified' }
      }

      if(previousUser){
        const token =  await this.generateToken(previousUser.userId,previousUser.contactNumber, previousUser.email , previousUser.role)
        return {message:'OTP Verified' , JWTtoken:token}
      }

      const createUserWithNum = await this.prismaService.users.create({
        data:{
          contactNumber:phoneNumber,
          isNumberVerified:true,   
        }, 
        // select:{
        //   userId:true,
        //   contactNumber:true,
        //   isNumberVerified:true
        // }
      })

      //const token =  await this.generateToken(createUserWithNum.userId,createUserWithNum.contactNumber, createUserWithNum.email , createUserWithNum.role)

      return {message:'OTP Verified' }
  }catch (error){
    throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
  } 
  }

  generateRandom4DigitNumber() {
    const random4DigitNumber = Math.floor(Math.random() * 10000);
    const formattedNumber = String(random4DigitNumber).padStart(4, '0');
    return formattedNumber;
  }


  //using twilio 
  async sendOTP(phoneNumber: string){
    const serviceSid = this.service
    console.log(serviceSid)
    try {
      // return await this.twilioClient.verify.v2.services(serviceSid)
      //   .verifications
      //   .create({ to: phoneNumber, channel: 'sms' //, customFriendlyName : 'PropertyApp' , customMessage:'Your OTP for Jaidad App is : '
      // });

      const sendCode = await this.twilioClient.verify.v2.services(serviceSid)
        .verifications
        .create({ to: phoneNumber, channel: 'sms' //, customFriendlyName : 'PropertyApp' , customMessage:'Your OTP for Jaidad App is : '
      });

      //console.log(sendCode.sendCodeAttempts.length);

      const userCreated = await this.prismaService.users.create({
        data  :{
          contactNumber:phoneNumber
        } // remove this and add it after user is verified
      //   where:{contactNumber:phoneNumber},
      //   update : {},
      //  create : {
      //   contactNumber:phoneNumber
      //  }
      })

      return sendCode
    } catch (error) {
      if(error.code ===60203){
        throw new BadRequestException('Maximum attempts reached')
      }
      console.error('Error sending SMS:', error);
      throw new Error('Unable to send OTP');
    }
  }

  async verifyOTP(phoneNumber: string, usercode : string){
    const serviceSid = this.service
    try {
      const verification = await this.twilioClient.verify.v2
        .services(serviceSid)
        .verificationChecks.create({ to: phoneNumber, code: usercode });

        console.log(verification);
        

      return verification.status === 'approved';
    } catch (error) {
      if(error.code ===20404){
        throw new NotAcceptableException(error.message)
      }
      console.error('Error verifying OTP:', error);
      return false;
    }
  }


  // {
  //   sid: 'VE57b825d97681cc5488b8562dc4e75d16',
  //   serviceSid: 'VAc55526bed4160399bc503cb6cf9909fb',
  //   accountSid: 'AC058b74b3af54b7354cc6fe8d4edb7498',
  //   to: '+923096209869',
  //   channel: 'sms',
  //   status: 'approved',
  //   valid: true,
  //   amount: null,
  //   payee: null,
  //   dateCreated: 2023-10-24T13:52:37.000Z,
  //   dateUpdated: 2023-10-24T13:55:40.000Z,
  //   snaAttemptsErrorCodes: undefined
  // }


// {
//   sid: 'VE57b825d97681cc5488b8562dc4e75d16',
//   serviceSid: 'VAc55526bed4160399bc503cb6cf9909fb',
//   accountSid: 'AC058b74b3af54b7354cc6fe8d4edb7498',
//   to: '+923096209869',
//   channel: 'sms',
//   status: 'pending',
//   valid: false,
//   amount: null,
//   payee: null,
//   dateCreated: 2023-10-24T13:52:37.000Z,
//   dateUpdated: 2023-10-24T13:54:04.000Z,
//   snaAttemptsErrorCodes: undefined
// }
  


  async signup(signupDto: SignUpDto) { // add picture upload // remove fields from prisma schema and seed

    try{
    const {contactNumber, ...userData} = signupDto
    const existingUser = await this.prismaService.users.findUnique({
      where:{
        contactNumber:contactNumber
      }
    })
    if(!existingUser ){
      throw new NotFoundException('user doesnot exists')

    }
    if(existingUser.email && existingUser.role){
      throw new ConflictException('User already signed up')
    }

    if (signupDto.profileImage) {
      const avatarUrl = await this.imageService.uploadImage(signupDto.profileImage);
      if (!avatarUrl) throw new BadRequestException("Error uploading image");

      userData["profileImage"] = avatarUrl;
    }    
      const userCreated = await this.prismaService.users.update({
        where:{ contactNumber:contactNumber},
        data:{
          ...userData 
        },
        // select:{
        //   userId: true,
        //   firstName: true,
        //   lastName: true,
        //   email: true,
        //   createdAt: true,
        //   role: true
        // }
      })

      const token =  await this.generateToken(userCreated.userId,userCreated.contactNumber, userCreated.email , userCreated.role)
      return token

     //return userCreated;// remove password // return jwt token
   }catch(error){
      if (error.code === 'P2002') {
        throw new ConflictException('Email already exists');
      }
      throw new InternalServerErrorException('Error occurred during signup', error.message)
   }
   
  }



  // async login(loginDto: LogInDto) {
  //   try {
  //     const user = await this.prismaService.users.findUnique({
  //       where: {
  //         email: loginDto.email,
  //       },
  //     });
      
  //     if (!user) 
  //       throw new NotFoundException('User doesnot exist! : Check Email');

  //     const isPasswordMatch = await bcrypt.compare(loginDto.password,user.password);  

  //     if (!isPasswordMatch)
  //       throw new ForbiddenException('Credentials incorrect');

  //     // const token =  this.generateToken(user.userId, user.email, user.role)
  //     // return token;

  //   } catch (error) {
  //     if (error instanceof Prisma.PrismaClientUnknownRequestError) {
  //       // Handle database-related errors, such as connectivity issues or database constraints.
  //       // You can log the error for debugging or return an appropriate response to the client.
  //       throw new ServiceUnavailableException(`Database error: The server is temporarily unable to process the request. Error : ${error.message} `);
  //     } else {
  //       // Handle other types of errors, such as NotFoundException and ForbiddenException.
  //       throw new InternalServerErrorException(error.message)
  //     }
  //     // throw error;
  //   }
  // }


  async generateToken(
    id:string,
    contactNumber:string,
    email:string,
    role:string){

    const payload = {
      userId:id,
      contactNumber:contactNumber,
      email:email,
      role:role     
    }

    const jwt_secret = this.configService.get('JWT_SECRET')

    const token = await this.jwt.signAsync(payload, {
      //expiresIn: '12h',
      secret: jwt_secret,
    });

    return {
      access_token: token,
    };
  }

  // async resetPassword(resetpasswordDto: ResetPasswordDto, userDecoded:RequestUser) {
  //   if(resetpasswordDto.newPassword !== resetpasswordDto.confirmPassword){
  //     throw new NotAcceptableException('New password & old password does not match')
  //   }

  //   try {
  //     const user = await this.prismaService.users.findUnique({
  //       where: {
  //         userId: userDecoded.userId,
  //       },
  //     });
      
  //     if (!user) 
  //       throw new NotFoundException('User doesnot exist!');

  //     const isPasswordMatch = await bcrypt.compare(resetpasswordDto.oldPassword,user.password);  

  //     if (!isPasswordMatch)
  //       throw new NotAcceptableException('Old password incorrect');

  //     const hashedPassword =  await bcrypt.hash(resetpasswordDto.newPassword,10)

  //     const passwordUpdate =await this.prismaService.users.update({
  //       where:{
  //         userId:user.userId
  //       },
  //       data:{
  //         password:hashedPassword
  //       }
  //     })
  //     return {message: 'Password Updated'}// make him logout??
  //   } catch (error) {

  //     throw error;
  //   }
  // }
  
  async findAll() {

    const data =  await this.prismaService.users.findMany({
      select:{
        userId: true,
        firstName: true,
        lastName: true,
        contactNumber: true,
        email: true,
        createdAt: true,
        role: true,
        profileImage:true
        // agency: true,
        // member: true,
        // Properties: true
      }
    })
    
    return data;
  }

}