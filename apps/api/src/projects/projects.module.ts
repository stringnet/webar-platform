import { Module } from '@nestjs/common';
import { ProjectsController } from './projects.controller';
import { ProjectsService } from './projects.service';
import { CloudinaryModule } from '../cloudinary/cloudinary.module';

@Module({
  imports: [CloudinaryModule], // <-- Añade CloudinaryModule aquí
  controllers: [ProjectsController],
  providers: [ProjectsService],
})
export class ProjectsModule {}