// apps/api/src/auth/auth.service.ts

import { Injectable, ForbiddenException } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { AuthDto } from './auth.dto';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthService {
  private prisma = new PrismaClient();

  constructor(private jwt: JwtService, private config: ConfigService) {}

  async signup(dto: AuthDto) {
    const hash = await bcrypt.hash(dto.password, 10);
    try {
      const user = await this.prisma.user.create({
        data: {
          email: dto.email,
          password: hash,
        },
      });
      delete user.password;
      return user;
    } catch (error) {
      if (error.code === 'P2002') {
        throw new ForbiddenException('Credentials taken');
      }
      throw error;
    }
  }

  async login(dto: AuthDto) {
    const user = await this.prisma.user.findUnique({
      where: { email: dto.email },
    });
    if (!user) throw new ForbiddenException('Credentials incorrect');

    const pwMatches = await bcrypt.compare(dto.password, user.password);
    if (!pwMatches) throw new ForbiddenException('Credentials incorrect');

    return this.signToken(user.id, user.email);
  }

  // Ahora este método es más simple porque el módulo ya tiene el secreto y la expiración
  async signToken(userId: string, email: string): Promise<{ access_token: string }> {
    const payload = { sub: userId, email };
    
    const token = await this.jwt.signAsync(payload);

    return {
      access_token: token,
    };
  }
}
