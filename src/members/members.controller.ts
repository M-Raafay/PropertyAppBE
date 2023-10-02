import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Req } from '@nestjs/common';
import { MembersService } from './members.service';
import { CreateMemberDto } from './dto/create-member.dto';
import { JwtGuard } from 'src/auth/guard/jwt.guard';

@Controller('members')
export class MembersController {
  constructor(private readonly membersService: MembersService) {}

//  @UseGuards(JwtGuard)
  @Post('add')
  create(@Body() createMemberDto: CreateMemberDto) {
    return this.membersService.createUser(createMemberDto);
  }

  @Get('allmembers')
  findAll() {
    return this.membersService.allUsers();
  }

  @Get('ownerOf/:id')
  ownerOf(@Param('id') id: string) {
   return this.membersService.agencyOwner(id);
  }

  @Post('memberOf/:id')
  memberOf(@Param('id') id: string) {
   return this.membersService.agencyMember(id);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.membersService.findUser(id);
  }



  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateMemberDto: UpdateMemberDto) {
  //   return this.membersService.update(+id, updateMemberDto);
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.membersService.remove(+id);
  // }
}
