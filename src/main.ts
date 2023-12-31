import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  
  const app = await NestFactory.create(AppModule);

  const configService = app.get(ConfigService)
  // console.log(configService.get('JWT_SECRET'));
  
  app.useGlobalPipes(new ValidationPipe(
    {
    whitelist: true,
    transform:true,
    transformOptions: {
      enableImplicitConversion: true
    }
  }
  )
  )

  await app.listen(Number(configService.get('PORT')) || 3001);   

}
bootstrap();
