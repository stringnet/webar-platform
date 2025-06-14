import { Controller, Post, UseGuards, Body } from '@nestjs/common';
import { JwtGuard } from '../auth/guard';
import { StorageService } from './storage.service';
import { GetUser } from '../auth/decorator';
import { User } from '@prisma/client';

// DTO para validar el request
import { IsNotEmpty, IsString } from 'class-validator';
export class UploadUrlDto {
  @IsString()
  @IsNotEmpty()
  fileName: string;
}

@UseGuards(JwtGuard)
@Controller('storage')
export class StorageController {
  constructor(private storageService: StorageService) {}

  @Post('upload-url')
  generateUploadUrl(@GetUser() user: User, @Body() dto: UploadUrlDto) {
    return this.storageService.generatePresignedUploadUrl(dto.fileName, user.id);
  }
}