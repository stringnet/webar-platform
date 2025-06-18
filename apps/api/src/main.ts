// apps/api/src/main.ts
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);
  const clientUrl = configService.get<string>('CORS_ORIGIN');

  // --- LÍNEA CLAVE AÑADIDA / VERIFICADA ---
  // Habilitamos CORS para que el admin pueda hablar con la API.
  app.enableCors({
    origin: clientUrl, // Lee el dominio del admin desde las variables de entorno
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
  });
  // ------------------------------------

  app.useGlobalPipes(new ValidationPipe({ whitelist: true }));
  await app.listen(3000);
}
bootstrap();