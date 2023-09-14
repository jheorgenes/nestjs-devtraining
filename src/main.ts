import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true, //Transforma os dados do JSON em seus respectivos tipos do DTO.
      whitelist: true, //Só Identifica o que está nos DTOS para converter em entidades.
      forbidNonWhitelisted: true //Não permite inserir atributos inesperados da requisição
    }));
  await app.listen(3000);
}
bootstrap();
