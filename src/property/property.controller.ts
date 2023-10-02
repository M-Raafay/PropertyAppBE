import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Req } from '@nestjs/common';
import { PropertyService } from './property.service';
import { CreatePropertyDto } from './dto/create-property.dto';
import { UpdatePropertyDto } from './dto/update-property.dto';
import { JwtGuard } from 'src/auth/guard/jwt.guard';

@Controller('property')
export class PropertyController {
  constructor(private readonly propertyService: PropertyService) {}

  @UseGuards(JwtGuard)
  @Post()
  create(@Body() createPropertyDto: CreatePropertyDto , @Req() req) {
    return this.propertyService.addProperty(createPropertyDto, req.user);
  }

  @Get()
  findAllProperties() {
    return this.propertyService.findAllProperties();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {   
    return this.propertyService.findAllPropertiesByMember(id);
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
