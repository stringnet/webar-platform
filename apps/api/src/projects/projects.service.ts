import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { CreateProjectDto } from './dto';

@Injectable()
export class ProjectsService {
  private prisma = new PrismaClient();

  getProjectsByUserId(userId: string) {
    return this.prisma.aRProject.findMany({
      where: {
        ownerId: userId,
      },
    });
  }

  // --- NUEVO MÉTODO AÑADIDO ---
  createProject(userId: string, dto: CreateProjectDto) {
    return this.prisma.aRProject.create({
      data: {
        ownerId: userId,
        name: dto.name,
        // Por ahora, usamos valores de marcador de posición para las URLs.
        // Más adelante, esto vendrá de la subida de archivos a MinIO.
        markerUrl: 'placeholder/marker.jpg',
        contentUrl: 'placeholder/model.glb',
      },
    });
  }
}