// apps/api/src/app.module.ts
import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [AuthModule], // <-- AÑADIR ESTO
})
export class AppModule {}
