import { Injectable, NotFoundException } from '@nestjs/common';
import { CreatePropertyDto } from './dto/create-property.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { RequestUser } from 'src/auth/interface/auth.interface';
import { MembersService } from 'src/members/members.service';
import { NotFoundError } from 'rxjs';

@Injectable()
export class PropertyService {
  constructor(
    private prismaService:PrismaService,
    private membersService:MembersService,
  ){}



  async addProperty(createPropertyDto: CreatePropertyDto, requestUser:RequestUser) {

    const userRole = requestUser.role
    switch(userRole){
      case 'GeneralUser':{
        const creater = await this.membersService.isUser(requestUser.userId);
        const {userId,contactNumber,email,role} = creater
        console.log(userId);
        
        const property = await this.prismaService.property.create({
          data:{
            ...createPropertyDto,
            agencyID:null,
            agencyLogo:null,
            listedByUserID:userId,
            listedByContact:contactNumber,
            listedByRole:role
          }
        })
        return property;
      }

      case 'Owner':{
        const creater = await this.membersService.agencyOwner(requestUser.userId);
        const {agencyId, logoURL, agencyOwner:{userId,contactNumber,email,role},...restData} = creater
        const property = await this.prismaService.property.create({
          data:{
            ...createPropertyDto,
            agencyID:agencyId,
            agencyLogo:logoURL,
            listedByUserID:userId,
            listedByContact:contactNumber,
            listedByRole:role
          }
        })
        return property;
      }

      default:{
        const creater = await this.membersService.agencyMember(requestUser.userId);
        const {agencyIdFk:{agencyId, logoURL}, userIdFk:{userId,contactNumber,email,role},...restData} = creater
        const property = await this.prismaService.property.create({
          data:{
            ...createPropertyDto,
            agencyID:agencyId,
            agencyLogo:logoURL,
            listedByUserID:userId,
            listedByContact:contactNumber,
            listedByRole:role
          }
        })
        return property;
      }
    }   
  }

  async findAllProperties() {
      try{      
        const allProperties = await this.prismaService.property.findMany({
        select:{
          propertyId:true,
          propertyType:true,
          propertyAction:true,
          agency:{
            select:{
              agencyId:true,
              name:true,
              address:true,
              location:true,
              contactNo:true,
              email:true,
              description:true,
            }
          },
          listedByUser:{
            select:{
              userId:true,
              firstName:true,
              lastName:true,
            }
          },
          address:true,
          area:true,
          amenitiesFacilities:true,
          features:true,
          price:true,
          images:true,
          description:true,
          mapLocation:true,
        }
      })
      if(allProperties.length === 0)
        throw new NotFoundException('No data found ')

      return allProperties;
    }catch(error){
      throw error;
    }
  }

  async findAllPropertiesByMember(id: string) {
    try{
      const allProperties = await this.prismaService.property.findMany({
        where:{
          listedByUserID:id
        },
        select:{
          propertyId:true,
          propertyType:true,
          propertyAction:true,
          agency:{
            select:{
              agencyId:true,
              name:true,
              address:true,
              location:true,
              contactNo:true,
              email:true,
              description:true,
            }
          },
          listedByUser:{
            select:{
              userId:true,
              firstName:true,
              lastName:true,
            }
          },
          address:true,
          area:true,
          amenitiesFacilities:true,
          features:true,
          price:true,
          images:true,
          description:true,
          mapLocation:true,
        }
      })

      if(allProperties.length === 0)
        throw new NotFoundException('No data found for this user : Check Id')

      return allProperties;
    }catch(error){
      throw error;
    }
  }
  

  // findOne(id: number) {
  //   return `This action returns a #${id} property`;
  // }

  // update(id: number, updatePropertyDto: UpdatePropertyDto) {
  //   return `This action updates a #${id} property`;
  // }

  // remove(id: number) {
  //   return `This action removes a #${id} property`;
  // }
}
