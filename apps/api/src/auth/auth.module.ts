// apps/api/src/auth/auth.module.ts

import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [
    // Registramos el JwtModule de forma asíncrona para que
    // pueda usar el ConfigService para leer las variables de entorno.
    JwtModule.registerAsync({
      imports: [ConfigModule], // Hacemos que ConfigModule esté disponible aquí
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get<string>('JWT_SECRET'),
        signOptions: { expiresIn: '60m' }, // Definimos que el token expira en 60 minutos
      }),
      inject: [ConfigService], // Inyectamos el ConfigService
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
