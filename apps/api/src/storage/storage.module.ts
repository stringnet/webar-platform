import { Module } from '@nestjs/common';
import { StorageService } from './storage.service';

@Module({
  providers: [StorageService],
  exports: [StorageService], // Lo exportamos para usarlo en otros módulos más adelante
})
export class StorageModule {}