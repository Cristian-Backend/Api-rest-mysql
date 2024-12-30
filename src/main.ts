import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

import * as dotenv from 'dotenv'
import { resolve } from 'path';


dotenv.config({ path: resolve(__dirname, '../.env') });

// Verificar las variables de entorno
console.log('DATABASE_HOST:', process.env.DATABASE_HOST);
console.log('DATABASE_PORT:', process.env.DATABASE_PORT);
console.log('DATABASE_USERNAME:', process.env.DATABASE_USERNAME);
console.log('DATABASE_PASSWORD:', process.env.DATABASE_PASSWORD);
console.log('DATABASE_NAME:', process.env.DATABASE_NAME);


async function bootstrap() {
  const app = await NestFactory.create(AppModule);


  app.setGlobalPrefix("api/v1");

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    })
  );



  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
