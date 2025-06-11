import { Controller, Get, UseGuards } from '@nestjs/common';
import { JwtGuard } from '../auth/guard'; // Importaremos el guardián de seguridad

@UseGuards(JwtGuard) // <-- ¡IMPORTANTE! Esto protege todas las rutas de este controlador
@Controller('projects')
export class ProjectsController {
  @Get()
  getProjects() {
    return { msg: 'Aquí estarán los proyectos' };
  }
}