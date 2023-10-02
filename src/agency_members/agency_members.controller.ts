import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Req } from '@nestjs/common';
import { AgencyMembersService } from './agency_members.service';
import { CreateAgencyMemberDto } from './dto/create-agency_member.dto';
import { JwtGuard } from 'src/auth/guard/jwt.guard';
import {  UserRole } from '@prisma/client';

//@UseGuards(JwtGuard)
@Controller('agency-members')
export class AgencyMembersController {
  constructor(private readonly agencyMembersService: AgencyMembersService) {}

  @UseGuards(JwtGuard)
  @Post()
  addAgencyMember(@Body() createAgencyMemberDto:CreateAgencyMemberDto, @Req() req, memberRole:UserRole) {
    // send email to the account created
    return this.agencyMembersService.addAgencyMember(createAgencyMemberDto , req.user,memberRole);
  }


  @Get(':id')
  allMembers(@Param('id') id: string)   //agenyId 
  {
    return this.agencyMembersService.allAgencyMembers(id);
  }









  // @Get()
  // findAll() {
  //   return this.agencyMembersService.generateRandomPassword();
  // }

  

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateAgencyMemberDto: UpdateAgencyMemberDto) {
  //   return this.agencyMembersService.update(+id, updateAgencyMemberDto);
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.agencyMembersService.remove(+id);
  // }
}
