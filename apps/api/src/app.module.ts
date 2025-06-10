// apps/api/src/app.module.ts
import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module'; // Esta ruta ahora es correcta

@Module({
  imports: [AuthModule],
})
export class AppModule {}
