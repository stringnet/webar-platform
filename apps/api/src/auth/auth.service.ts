import { Injectable, ForbiddenException } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { AuthDto } from './auth.dto';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config'; // <-- Importar ConfigService

@Injectable()
export class AuthService {
  private prisma = new PrismaClient();

  // Inyectar ConfigService en el constructor
  constructor(private jwt: JwtService, private config: ConfigService) {}

  // ... (el método signup no cambia)
  async signup(dto: AuthDto) {
    // ...
  }

  // ... (el método login no cambia)
  async login(dto: AuthDto) {
    // ...
  }
  
  async signToken(userId: string, email: string): Promise<{ access_token: string }> {
    const payload = { sub: userId, email };
    // Leer el secreto desde las variables de entorno
    const secret = this.config.get<string>('JWT_SECRET');

    const token = await this.jwt.signAsync(payload, {
      expiresIn: '15m',
      secret: secret, // <-- Usar la variable
    });

    return {
      access_token: token,
    };
  }
}
