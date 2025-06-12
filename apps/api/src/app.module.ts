import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { ProjectsModule } from './projects/projects.module';
import { StorageModule } from './storage/storage.module'; // <-- 1. Importa el nuevo módulo

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    AuthModule,
    ProjectsModule,
    StorageModule, // <-- 2. Añádelo a los imports
  ],
})
export class AppModule {}