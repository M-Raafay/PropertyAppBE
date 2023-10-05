import { ConflictException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { CreateMemberDto } from './dto/create-member.dto';
import { RequestUser } from 'src/auth/interface/auth.interface';
import { PrismaService } from 'src/prisma/prisma.service';
import { ConfigService } from '@nestjs/config';
import * as bcrypt from 'bcrypt';


@Injectable()
export class MembersService {
  constructor(
    private prismaService:PrismaService,
    private configService:ConfigService
    ){}
    


   async createUser(createMemberDto: CreateMemberDto) {

    const password = this.configService.get('DEFAULT_PASSWORD');
    
    const hashedPassword =  await bcrypt.hash(password,10);
      if (!hashedPassword)
        throw new InternalServerErrorException('password encryption issue');

    try{
      const member = await this.prismaService.users.create({
        data:{
        ...createMemberDto,
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

      return member;
    }catch(error){
      if (error.code === 'P2002') {
        throw new ConflictException('Email already exists');
      }
      throw new InternalServerErrorException(error.message)
    }

    //return member;
  }


  async allUsers() {

    try{
      const allMembers = await this.prismaService.users.findMany({
        select:{
          userId: true,
          firstName: true,
          lastName: true,
          email: true,
          role: true          
        }
      })
        if (!allMembers)
          throw new NotFoundException('data not found');
    
     return allMembers;

    }catch(error){
      throw error
    }
  }

  async findUser(id: string) {
    try{
      const member = await this.prismaService.users.findUnique({
        where:{
          userId:id
        },
        select:{
          userId: true,
          firstName: true,
          lastName: true,
          email: true,
          role: true
        }        
      });
      if (!member)
        throw new NotFoundException('member not found');
    
    return member;

    }catch(error){
      throw error
    }

  }

  async agencyOwner(id: string) {

    try{
      const member = await this.prismaService.agency.findUnique({

        where:{
          agencyOwnerId:id
        },
        select:{
          agencyId:true,
          address:true,
          location:true,
          logoURL:true,
          agencyOwner:{
            select:{
              userId: true,
              firstName: true,
              lastName: true,
              contactNumber:true,
              email: true,
              createdAt: true,
              role: true
            }
          }
        }
      });
      if (!member)
        throw new NotFoundException('Not an owner of Agency');
    
    return member;

    }catch(error){
      throw error
    }


  }

  async agencyMember(id: string) {

    try{
      const member = await this.prismaService.agencyMembers.findUnique({
        where:{
          user:id
        },
        select:{
          memberId:true,
          agencyIdFk:{
            select:{
              agencyId:true,
              name:true,
              address:true,
              location:true,
              logoURL:true,
              description:true,
              facebook:true,
              instagram:true,
              whatsapp:true,
              youtube:true
            }
          },
          userIdFk:{
            select:{
              userId:true,
              contactNumber:true,
              email:true,
              role:true              
            }
          },
          role:true
        }
      
      });
      if (!member)
        throw new NotFoundException('member doesnot belong to any Agency');
    
    return member;
    }catch(error){
      throw error
    }
  }

  async isUser(id: string) {

    try{
      const user = await this.prismaService.users.findUnique({
        where:{
          userId:id
        },
        select:{
          userId:true,
          contactNumber:true,
          email:true,
          role:true  
        }
      
      });
      if (!user)
        throw new NotFoundException('member doesnot belong to any Agency');
    
    return user;
    }catch(error){
      throw error
    }
  }





  async removeMember(id: string) {

    try{

      const isUser = await this.prismaService.users.findUnique({
        where:{
          userId:id
        }
      })
      if (!isUser)
        throw new NotFoundException('user doesnot exists');

      const userRole  = isUser.role;

      switch(userRole){

        case'Owner':{
          const deleteAgency= await this.prismaService.agency.delete({
            where:{
              agencyOwnerId:id
            }
          });
          const deleteOwner = await this.removeUser(id)

          return deleteOwner;
        }

        default:{
          const member = await this.prismaService.agencyMembers.delete({ // not necessary because if member is delted using user tabkle than cascade will remove it from agencymembers and their property listed as well
            where:{
              user:id
            }
          });      
          if (!member)
            throw new NotFoundException('member not deleted');
    
          const user =  await this.removeUser(id)
          if (!user)
            throw new NotFoundException('user not deleted');
      
        return {User:user,Member:member};
        }

      }

    }catch(error){
      throw error
    }
  }


  async removeUser(id: string) { /// can delete all user(either generaluser or agencymember. The delete is cascade so the deleted user is also removed form agencymembers and propertylisted by it)
// in case of user being owner, the user is deleted, the agency is removed and properties listed by that agency, but agency members exists as they are also seperate user(either delete them as well or update their role to General User)
    try{
        const user = await this.prismaService.users.delete({
          where:{
            userId:id
          }
        });
        if (!user)
          throw new NotFoundException('user doesnot exists');
  
    return {User:user};
    }catch(error){
      throw error
    }
  }
}
