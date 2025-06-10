import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Habilitamos CORS directamente en NestJS.
  // Esta configuración ahora será la que reciba la petición del navegador.
  app.enableCors({
    origin: 'https://adminwebra.scanmee.io',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    credentials: true,
  });

  app.useGlobalPipes(new ValidationPipe({
    whitelist: true,
  }));

  // NestJS escuchará en el puerto 3000 dentro del contenedor
  await app.listen(3000);
}
bootstrap();
