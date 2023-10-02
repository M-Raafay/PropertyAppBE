import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ForgotPasswordService } from './forgot_password.service';
import { CreateForgotPasswordDto } from './dto/create-forgot_password.dto';
import { UpdateForgotPasswordDto } from './dto/update-forgot_password.dto';

@Controller('forgot-password')
export class ForgotPasswordController {
  constructor(private readonly forgotPasswordService: ForgotPasswordService) {}

  @Post()
  forgotPasswordMail(@Body() email: string) {
    return this.forgotPasswordService.sendMail(email);
  }

  @Get()
  findAll() {
    return this.forgotPasswordService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.forgotPasswordService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateForgotPasswordDto: UpdateForgotPasswordDto) {
    return this.forgotPasswordService.update(+id, updateForgotPasswordDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.forgotPasswordService.remove(+id);
  }
}
