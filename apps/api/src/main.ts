import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config'; // <-- Importar ConfigService

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Obtener el servicio de configuración
  const configService = app.get(ConfigService);

  // Leer la variable de entorno para el origen de CORS
  const clientUrl = configService.get<string>('CORS_ORIGIN');

  app.enableCors({
    origin: clientUrl, // <-- Usar la variable
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
  });

  app.useGlobalPipes(new ValidationPipe({
    whitelist: true,
  }));

  await app.listen(3000);
}
bootstrap();
