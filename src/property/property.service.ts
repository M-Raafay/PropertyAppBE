import { Injectable, NotFoundException } from '@nestjs/common';
import { CreatePropertyDto } from './dto/create-property.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { RequestUser } from 'src/auth/interface/auth.interface';
import { MembersService } from 'src/members/members.service';
import { NotFoundError } from 'rxjs';
import { selectedFields } from './fieldsFetched/propertyFields';
import { PropertyAction, PropertyType } from '@prisma/client';

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
        console.log(userId,contactNumber,email,role);
        
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

  async findAllProperties(page:number, pageSize:number,action:PropertyAction, type:PropertyType) {
    console.log(page,pageSize,type);
    try{     
      // const where = {}; 
      // where['propertyType'] = type;
      // where['propertyAction'] = action;

      const countPropertiesListed = await this.prismaService.property.count()
      if(countPropertiesListed < pageSize)
        return countPropertiesListed;

      const allListedProperties = await this.prismaService.property.findMany({
      
      where:{
        propertyAction:{
          equals : action,
          // mode : 'insensitive'
        },
        propertyType:{
          equals : type
        }
    
      },
      skip:(page-1) * pageSize,
      take: pageSize,

      select:selectedFields

      })
      if(allListedProperties.length === 0)
        throw new NotFoundException('No data found ')
      const filteredRecords = allListedProperties.length;
      return {allListedProperties,countPropertiesListed,filteredRecords};
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
        select:selectedFields
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
