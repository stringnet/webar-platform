import { Controller, Post, UseGuards, Body } from '@nestjs/common';
import { JwtGuard } from '../auth/guard';
import { StorageService } from './storage.service';
import { GenerateUploadUrlDto } from './dto';
import { GetUser } from '../auth/decorator';
import { User } from '@prisma/client';

@UseGuards(JwtGuard) // Protegemos el controlador
@Controller('storage')
export class StorageController {
  constructor(private storageService: StorageService) {}

  @Post('upload-url')
  generateUploadUrl(
    @GetUser() user: User,
    @Body() dto: GenerateUploadUrlDto,
  ) {
    return this.storageService.generatePresignedUploadUrl(
      dto.fileName,
      user.id,
    );
  }
}