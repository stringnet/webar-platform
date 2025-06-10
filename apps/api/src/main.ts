import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Obtenemos el servicio de configuración para leer las variables de entorno
  const configService = app.get(ConfigService);

  // Leemos la URL del cliente desde las variables de entorno
  const clientUrl = configService.get<string>('CORS_ORIGIN');

  // Habilitamos CORS usando la variable de entorno
  // Esto es lo que soluciona el error que estás viendo
  app.enableCors({
    origin: clientUrl,
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS', // Es buena idea incluir OPTIONS
    credentials: true,
  });

  // Habilitamos la validación global para que los DTOs funcionen
  app.useGlobalPipes(new ValidationPipe({
    whitelist: true, // Ignora propiedades que no estén en el DTO
    forbidNonWhitelisted: true, // Lanza un error si hay propiedades no permitidas
    transform: true, // Transforma los payloads al tipo del DTO
  }));

  const port = configService.get<number>('PORT') || 3000;
  await app.listen(port);
}
bootstrap();
