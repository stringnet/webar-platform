import { Controller, Get, Post, UseGuards, UseInterceptors, UploadedFiles, Body } from '@nestjs/common';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import { User } from '@prisma/client';
import { GetUser } from '../auth/decorator';
import { JwtGuard } from '../auth/guard';
import { ProjectsService } from './projects.service';
import { CreateProjectDto } from './dto';
import { CloudinaryService } from '../cloudinary/cloudinary.service';

@UseGuards(JwtGuard)
@Controller('projects')
export class ProjectsController {
  constructor(
    private projectsService: ProjectsService,
    private cloudinaryService: CloudinaryService,
  ) {}

  @Get()
  getProjects(@GetUser() user: User) {
    return this.projectsService.getProjectsByUserId(user.id);
  }

  @Post()
  @UseInterceptors(FileFieldsInterceptor([
    { name: 'marker', maxCount: 1 },
    { name: 'content', maxCount: 1 },
  ]))
  async createProject(
    @UploadedFiles() files: { marker: Express.Multer.File[], content: Express.Multer.File[] },
    @GetUser('id') userId: string,
    @Body() dto: CreateProjectDto,
  ) {
    const markerUpload = await this.cloudinaryService.uploadFile(files.marker[0], 'markers');
    const contentUpload = await this.cloudinaryService.uploadFile(files.content[0], 'contents');

    const projectData: CreateProjectDto = {
      name: dto.name,
      markerUrl: markerUpload.secure_url,
      contentUrl: contentUpload.secure_url,
    };
    
    return this.projectsService.createProject(userId, projectData);
  }
}