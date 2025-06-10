import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Habilita CORS explícitamente para el dominio de tu frontend
  app.enableCors({
    origin: 'https://adminwebra.scanmee.io',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
  });

  // Activa la validación global para los datos de entrada (DTOs)
  app.useGlobalPipes(new ValidationPipe({
    whitelist: true,
  }));

  await app.listen(3000);
}
bootstrap();
