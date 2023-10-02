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



  // remove(id: number) {
  //   return `This action removes a #${id} member`;
  // }
}
