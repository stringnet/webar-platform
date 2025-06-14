import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { CreateProjectDto } from './dto';

@Injectable()
export class ProjectsService {
  private prisma = new PrismaClient();

  getProjectsByUserId(userId: string) {
    // ... (este método no cambia)
  }

  // --- MÉTODO ACTUALIZADO ---
  createProject(userId: string, dto: CreateProjectDto) {
    return this.prisma.aRProject.create({
      data: {
        ownerId: userId,
        name: dto.name,
        // Ahora usamos los datos reales que vienen del frontend
        markerUrl: dto.markerUrl,
        contentUrl: dto.contentUrl,
      },
    });
  }
}