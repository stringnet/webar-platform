import { Module } from '@nestjs/common';
import { StorageService } from './storage.service';
import { StorageController } from './storage.controller'; // <-- 1. Importa el controlador

@Module({
  controllers: [StorageController], // <-- 2. Añádelo aquí
  providers: [StorageService],
  exports: [StorageService],
})
export class StorageModule {}