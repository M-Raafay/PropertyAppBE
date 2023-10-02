import { Module } from '@nestjs/common';
import { PropertyService } from './property.service';
import { PropertyController } from './property.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
import { MembersModule } from 'src/members/members.module';

@Module({
  imports:[PrismaModule,MembersModule],
  controllers: [PropertyController],
  providers: [PropertyService],
})
export class PropertyModule {}
