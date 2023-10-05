import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Req } from '@nestjs/common';
import { AgencyService } from './agency.service';
import { CreateAgencyDto } from './dto/create-agency.dto';
import { JwtGuard } from 'src/auth/guard/jwt.guard';
import { RolesGuard } from 'src/roles/role.guard';
import { UserRole } from 'src/roles/role.enum';
import { Roles } from 'src/roles/role.decorator';
import { RequestUser } from 'src/auth/interface/auth.interface';

@Controller('agency')
export class AgencyController {
  constructor(private readonly agencyService: AgencyService) {}

  @UseGuards(JwtGuard,RolesGuard)
  @Roles(UserRole.Owner)
  @Post()
  create(@Body() createAgencyDto: CreateAgencyDto, @Req() req) {
    //console.log('in controller of agency\n',req.user, '\nend ha boss controller ka \n');
    
    return this.agencyService.create(createAgencyDto,req.user);
  }

  @Get()
  findAll() {
    return this.agencyService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.agencyService.findOne(id);
  }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateAgencyDto: UpdateAgencyDto) {
  //   return this.agencyService.update(+id, updateAgencyDto);
  // }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.agencyService.removeAgency(id);
  }
}
