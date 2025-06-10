import { Injectable, ForbiddenException } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { AuthDto } from './auth.dto';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  private prisma = new PrismaClient();

  constructor(private jwt: JwtService) {}

  async signup(dto: AuthDto) {
    // Generar el hash de la contraseña
    const hash = await bcrypt.hash(dto.password, 10);
    
    try {
      // Guardar el nuevo usuario en la DB
      const user = await this.prisma.user.create({
        data: {
          email: dto.email,
          password: hash,
        },
      });

      // No devolver la contraseña en la respuesta
      delete user.password;
      return user;
    } catch (error) {
      if (error.code === 'P2002') { // Código de Prisma para violación de constraint único
        throw new ForbiddenException('Credentials taken');
      }
      throw error;
    }
  }

  async login(dto: AuthDto) {
    // Encontrar el usuario por email
    const user = await this.prisma.user.findUnique({
      where: { email: dto.email },
    });
    if (!user) throw new ForbiddenException('Credentials incorrect');

    // Comparar contraseñas
    const pwMatches = await bcrypt.compare(dto.password, user.password);
    if (!pwMatches) throw new ForbiddenException('Credentials incorrect');

    // Si todo es correcto, generar y devolver el token JWT
    return this.signToken(user.id, user.email);
  }

  async signToken(userId: string, email: string): Promise<{ access_token: string }> {
    const payload = { sub: userId, email };
    const secret = 'SUPER_SECRET_KEY'; // ¡CAMBIAR ESTO POR UNA VARIABLE DE ENTORNO!

    const token = await this.jwt.signAsync(payload, {
      expiresIn: '15m', // El token expira en 15 minutos
      secret: secret,
    });

    return {
      access_token: token,
    };
  }
}
