import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Req, Query, ParseIntPipe, NotAcceptableException } from '@nestjs/common';
import { PropertyService } from './property.service';
import { CreatePropertyDto } from './dto/create-property.dto';
import { UpdatePropertyDto } from './dto/update-property.dto';
import { JwtGuard } from 'src/auth/guard/jwt.guard';
import { PropertyAction, PropertyType } from '@prisma/client';

@Controller('property')
export class PropertyController {
  constructor(private readonly propertyService: PropertyService) {}

  @UseGuards(JwtGuard)
  @Post()
  create(@Body() createPropertyDto: CreatePropertyDto , @Req() req) {
    return this.propertyService.addProperty(createPropertyDto, req.user);
  }

  @Get()
  async findAllProperties(
    @Query('page', ParseIntPipe) page: number = 1,
    @Query('pageSize', ParseIntPipe) pageSize: number = 10,
    @Query('action') action?: PropertyAction,
    @Query('action') type?: PropertyType,
    @Query('areaMin') areaMin?: number,
    @Query('areaMax') areaMax?: number,
    @Query('priceMin') priceMin?: number,
    @Query('priceMax') priceMax?: number,
    @Query('type') address?: string,
    @Query('type') mapLocation?: string) {// add aditional filters

      // console.log(page,pageSize,type);
      
      
      if(page === 0)
        throw new NotAcceptableException('page cannot be zero')
      
    return this.propertyService.findAllProperties(page,pageSize,action,type);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {   
    return this.propertyService.findAllPropertiesByMember(id);
  }


  @Get()
  async findAll(
    @Query('page', ParseIntPipe) page: number = 1,
    @Query('pageSize', ParseIntPipe) pageSize: number = 10,
    @Query('category') category?: string,
    @Query('search') search?: string,
  ) {
   // const result = await this.propertyService.findAllProperties(page, pageSize, category, search);
    return {
      // data: result.items,
      // page,
      // pageSize,
      // totalItems: result.totalItems,
    };
  }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updatePropertyDto: UpdatePropertyDto) {
  //   return this.propertyService.update(+id, updatePropertyDto);
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.propertyService.remove(+id);
  // }
}
