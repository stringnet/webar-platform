import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class ProjectsService {
  private prisma = new PrismaClient();

  // Obtiene todos los proyectos que pertenecen a un userId específico
  getProjectsByUserId(userId: string) {
    return this.prisma.aRProject.findMany({
      where: {
        ownerId: userId,
      },
    });
  }
}