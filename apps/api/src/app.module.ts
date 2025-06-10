import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config'; // <-- Importar

@Module({
  imports: [
    ConfigModule.forRoot({ // <-- Añadir esto
      isGlobal: true, // <-- Hace que las variables estén disponibles en todos los módulos
    }),
    AuthModule,
  ],
})
export class AppModule {}
