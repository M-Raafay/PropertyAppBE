import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { CreateAgencyDto } from './dto/create-agency.dto';
import { RequestUser } from 'src/auth/interface/auth.interface';
import { PrismaService } from 'src/prisma/prisma.service';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AgencyService {

  constructor(
    private prismaService:PrismaService,
    private configService:ConfigService,
    private jwt:JwtService
    ){}


  async create(createAgencyDto: CreateAgencyDto, user:RequestUser) {
      // discuss about setting a flag for disbaling owner from creating second agency. The relation throws error of P2014(prisma error) which enforces 1-1 relation
    try{
      const userData = await this.prismaService.users.findUnique({
        where:{
          userId:user.userId
        },
      select:{
        userId:true,
        firstName:true
      }
      })
      if (!userData) 
        throw new NotFoundException('User doesnot exist! : Check Email');

      const agency = await this.prismaService.agency.create({
        data:{
          ...createAgencyDto,
          ownerName:userData.firstName,
          agencyOwnerId:userData.userId
        }
    })

    return agency;
    }catch(error){
      throw new InternalServerErrorException(error.message)
    }

  }

  async findAll() {
    try{
      const allAgencies = await this.prismaService.agency.findMany({
        include:{
          agencyOwner:{
            select:{
              userId: true,
              firstName: true,
              lastName: true,
              email: true,
              createdAt: true,
              role: true
            }
          }
        }
      })
      return allAgencies;
    }catch(error){
      throw new InternalServerErrorException(error.message)
    }

  }

  async findOne(id: string) {
    try{
      const agencyData = await this.prismaService.agency.findUnique({
        where:{
          agencyId:id
        },
        include:{
          agencyOwner:{
            select:{
              userId: true,
              firstName: true,
              lastName: true,
              email: true,
              createdAt: true,
              role: true
            }
          }
        }
      })
      if (!agencyData) 
        throw new NotFoundException('Agency doesnot exist! : Check id');
      return agencyData;
    }catch(error){
      throw new InternalServerErrorException(error.message)
    }

  }

  // update(id: number, updateAgencyDto: UpdateAgencyDto) {
  //   return `This action updates a #${id} agency`;
  // }

  async removeAgency(id: string) {

    try{

      return await this.prismaService.$transaction(async(prisma) =>{
      const isAgency = await this.prismaService.agency.findUnique({
        where:{
          agencyId:id
        }
      })
      if(!isAgency)
        throw new NotFoundException('Agency doesnot exists')

      const userMember = await this.prismaService.agencyMembers.findMany({
        where:{
          agency:id
        },
        select:{
          user:true,
          userIdFk:{
            select:{
              userId:true,
              firstName:true
            }
          },
        }
      });
      // if(userMember.length === 0)
      //   throw new NotFoundException('AgencyMembers doesnot exists')

      const userIdsToDelete = userMember.map((userMember) => userMember.user);      
      const deleteUserMembers = await this.prismaService.users.deleteMany({
        where:{
          userId:{
            in:userIdsToDelete
          }
        }
      })

      const agency = await this.prismaService.agency.delete({
        where:{
          agencyId:id
        },
        select:{
          name:true,
          agencyOwner:{
            select:{
              firstName:true,
            },
          },
        },       
      });
      
      if (!agency)
        throw new NotFoundException('no Agency');
    
     return {deleted:`DELETED \n Agency : ${agency.name} \n Owner : ${agency.agencyOwner.firstName}`};
    })

    }catch(error){
      throw error
    }

  }

}
