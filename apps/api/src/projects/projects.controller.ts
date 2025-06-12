import { Controller, Get, UseGuards, Post, Body } from '@nestjs/common';
import { User } from '@prisma/client';
import { GetUser } from '../auth/decorator';
import { JwtGuard } from '../auth/guard';
import { ProjectsService } from './projects.service';
import { CreateProjectDto } from './dto';

@UseGuards(JwtGuard)
@Controller('projects')
export class ProjectsController {
  constructor(private projectsService: ProjectsService) {}

  @Get()
  getProjects(@GetUser() user: User) {
    return this.projectsService.getProjectsByUserId(user.id);
  }

  // --- NUEVO ENDPOINT AÑADIDO ---
  @Post()
  createProject(@GetUser('id') userId: string, @Body() dto: CreateProjectDto) {
    // Usamos el decorador @GetUser('id') para obtener solo el ID del usuario
    // y @Body() para obtener los datos del formulario (el DTO).
    return this.projectsService.createProject(userId, dto);
  }
}