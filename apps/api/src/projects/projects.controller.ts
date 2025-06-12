import { Controller, Get, UseGuards } from '@nestjs/common';
import { User } from '@prisma/client';
import { GetUser } from '../auth/decorator';
import { JwtGuard } from '../auth/guard';
import { ProjectsService } from './projects.service';

@UseGuards(JwtGuard)
@Controller('projects')
export class ProjectsController {
  constructor(private projectsService: ProjectsService) {}

  @Get()
  getProjects(@GetUser() user: User) {
    // Usamos el decorador para obtener el usuario y pasamos su ID al servicio
    return this.projectsService.getProjectsByUserId(user.id);
  }
}