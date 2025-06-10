import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // Habilitar CORS aquí en el futuro si es necesario
  await app.listen(3000);
}
bootstrap();
