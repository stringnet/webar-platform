// apps/api/src/main.ts
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const configService = app.get(ConfigService);
  const clientUrl = configService.get<string>('CORS_ORIGIN');

  // --- ESTA ES LA PARTE CRÍTICA ---
  app.enableCors({
    origin: clientUrl,
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    credentials: true,
  });
  // --------------------------------

  app.useGlobalPipes(new ValidationPipe({
    whitelist: true,
    forbidNonWhitelisted: true,
    transform: true,
  }));

  const port = configService.get<number>('PORT') || 3000;
  await app.listen(port);
}
bootstrap();
