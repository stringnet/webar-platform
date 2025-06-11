// apps/api/src/projects/projects.controller.ts
import { Controller, Get, UseGuards } from '@nestjs/common';
import { JwtGuard } from '../auth/guard'; // <-- Esta línea ahora funciona

@UseGuards(JwtGuard)
@Controller('projects')
export class ProjectsController {
  @Get()
  getProjects() {
    return { msg: 'Aquí estarán los proyectos' };
  }
}