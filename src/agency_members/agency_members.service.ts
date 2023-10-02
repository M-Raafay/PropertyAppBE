import { ConflictException, ImATeapotException, Injectable, InternalServerErrorException, NotAcceptableException, NotFoundException } from '@nestjs/common';
import { CreateAgencyMemberDto } from './dto/create-agency_member.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { MembersService } from 'src/members/members.service';
import { RequestUser } from 'src/auth/interface/auth.interface';
import { CreateMemberDto } from 'src/members/dto/create-member.dto';
import { ConfigService } from '@nestjs/config';
import * as bcrypt from 'bcrypt';
import {  UserRole } from '@prisma/client';
import { VirtualTimeScheduler } from 'rxjs';
import { MailerService } from 'src/mailer/mailer.service';

@Injectable()
export class AgencyMembersService {

  constructor(
    private prismaService:PrismaService,
    private membersService:MembersService,
    private configService:ConfigService,
    private mailService:MailerService,
  ){}
  
  
  async addAgencyMember(createAgencyMemberDto: CreateAgencyMemberDto, requestUser:RequestUser, rrrrrrr:UserRole) {

    const role = requestUser.role
    const memberRole = createAgencyMemberDto.role
    const randomPassword = this.generateRandomPassword()
    
    const emailSubject = 'Your login credentials for property app';
    const emailBody =`<html>
      <head>
        <title>Password Email</title>
      </head>
      <body>
        <p>Your password for property app is:</p>
        <p><strong>${randomPassword}</strong></p>
      </body>
    </html>`


    try {
      switch(role){
        case 'Owner':{// can create all sort of members

          //retrieves agency details and owner details usinf jwt id
          const owner = await this.membersService.agencyOwner(requestUser.userId);
          const newUser = await this.createUser(createAgencyMemberDto, randomPassword)
          const addAgencyMember = await this.prismaService.agencyMembers.create({
            data:{
              agency:owner.agencyId,
              user:newUser.userId,
              role:newUser.role

            }
          })
          const email = await this.mailService.sendEmail(newUser.email, emailSubject,emailBody)
          return addAgencyMember; 
        }

        case 'Manager':{
                    
          if(memberRole!== 'AssistantManager' && memberRole!== 'Agent')
            throw new NotAcceptableException('User can only add AssistantManager & Agent')

          const createrData =  await this.membersService.agencyMember(requestUser.userId)
          const newUser = await this.createUser(createAgencyMemberDto , randomPassword)
          const addAgencyMember = this.addMember(createrData.agencyIdFk.agencyId, newUser.userId, newUser.role)
          const email = await this.mailService.sendEmail(newUser.email, emailSubject,emailBody)
          return addAgencyMember;
        }

        case 'AssistantManager':{
          
          if(memberRole!== 'Agent')
            throw new NotAcceptableException('User can only add Agent')

          const createrData =  await this.membersService.agencyMember(requestUser.userId)
          const newUser = await this.createUser(createAgencyMemberDto, randomPassword)
          const addAgencyMember = this.addMember(createrData.agencyIdFk.agencyId, newUser.userId, newUser.role)
          const email = await this.mailService.sendEmail(newUser.email, emailSubject,emailBody)
          return addAgencyMember;
        }
        
      }


      // const agencyOf =  await this.prismaService.agency.findUnique({
      //   where:{
      //     agencyOwnerId:requestUser.userId
      //   }
      // })

      // if(!agencyOf){
      //   throw new NotAcceptableException('Not an Owner of agency : Cannot add a Manager')
      // }
      // console.log(agencyOf);
      
      // return memberCreater;


    } catch(error) {
      throw error;
    }

  }

  


  // used in addAgencyMember fucntion above for creating a user(member) in Users table
  async createUser(createAgencyMemberDto: CreateAgencyMemberDto, randomPassword:string) {
    
    const hashedPassword =  await bcrypt.hash(randomPassword,10);
      if (!hashedPassword)
        throw new InternalServerErrorException('password encryption issue');

    try{
      const member = await this.prismaService.users.create({
        data:{
        ...createAgencyMemberDto,
        password:hashedPassword
      },
      select:{
          userId: true,
          firstName: true,
          lastName: true,
          email: true,
          role: true
      }
      })
      if(!member)
        throw new NotAcceptableException()

      return member;
    }catch(error){
      if (error.code === 'P2002') {
        throw new ConflictException('Email already exists');
      }
      throw new InternalServerErrorException(error.message)
    }

    //return member;
  }

  // used in addAgencyMember fucntion above for adding aggencyid, userid in AgencyMembers table
  async addMember(agencyId:string,userId:string,userRole:UserRole){
    
      try{
        const addAgencyMember = await this.prismaService.agencyMembers.create({
          data:{
          agency:agencyId,
          user:userId,
          role:userRole
        }
     })
     if(!addAgencyMember)
        throw new InternalServerErrorException('error adding member in agency')

     return addAgencyMember;
    }catch(error){
      throw error;
    }
  }

  // used in addAgencyMember fucntion above for creating a randompassword for user
  generateRandomPassword() {
    const charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_-+=";
    let password = "";
  
    for (let i = 0; i < 15; i++) {
      const randomIndex = Math.floor(Math.random() * charset.length);
      password += charset.charAt(randomIndex);
    }
    return password;
  }


  async allAgencyMembers(agencyId:string){
    try{
      const agencyMembers = await this.prismaService.agencyMembers.findMany({
      where:{
        agency:agencyId
      },
      select:{
        memberId:true,
        agencyIdFk:{
          select:{
            agencyId:true,
            name:true,
            address:true,
            location:true,
            contactNo:true,
            email:true,
            logoURL:true,
            description:true,
            facebook:true //add more fields form table
          }  
        },
        userIdFk:{
          select:{
            userId:true,
            firstName:true,
            lastName:true,
            contactNumber:true,
            email:true,
          }
        },
        role:true
      }

    })
    if(agencyMembers.length === 0){
      throw new NotFoundException('Agency doesnot exists : check Agency Id')
    }

    return agencyMembers;
  }catch(error){
    throw error
  }


  }

  // not used for now. Gets data from agencyMember table using userIdForeignKey
  async getSingleAgencyMemberData(id:string){
    try{
        const memberData = await this.prismaService.agencyMembers.findUnique({
        where:{
          user:id
        }
      })

      if(!memberData){
        throw new NotFoundException('Agency Member doesnot exists ')
      }

      return memberData;
    }catch(error){
      throw error
    }

  }

  
  


}
