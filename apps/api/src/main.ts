// apps/api/src/main.ts
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
// Ya no necesitamos ConfigService para esta prueba
// import { ConfigService } from '@nestjs/config'; 

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // --- CONFIGURACIÓN DE CORS SIMPLIFICADA ---
  // En lugar de leer de una variable, ponemos la URL directamente para la prueba.
  app.enableCors({
    origin: 'https://adminwebra.scanmee.io', // URL escrita directamente
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    credentials: true,
  });
  // -----------------------------------------

  app.useGlobalPipes(new ValidationPipe({
    whitelist: true,
    forbidNonWhitelisted: true,
    transform: true,
  }));

  // Para esta prueba, también podemos fijar el puerto.
  await app.listen(3000);
}
bootstrap();
