import { Injectable, OnModuleInit, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as Minio from 'minio';
import { v4 as uuidv4 } from 'uuid'; // <-- Importamos la nueva librería

@Injectable()
export class StorageService implements OnModuleInit {
  private readonly logger = new Logger(StorageService.name);
  private readonly minioClient: Minio.Client;
  private readonly bucketName: string;

  constructor(private configService: ConfigService) {
    this.minioClient = new Minio.Client({
      endPoint: this.configService.get('MINIO_ENDPOINT'),
      useSSL: this.configService.get('MINIO_USE_SSL') === 'true',
      accessKey: this.configService.get('MINIO_ACCESS_KEY'),
      secretKey: this.configService.get('MINIO_SECRET_KEY'),
    });
    this.bucketName = this.configService.get('MINIO_BUCKET_NAME');
  }

  async onModuleInit() {
    await this.ensureBucketExists();
  }

  private async ensureBucketExists() {
    // ... (este método no cambia)
  }

  // --- ¡NUEVO MÉTODO AÑADIDO! ---
  async generatePresignedUploadUrl(originalFileName: string, userId: string) {
    // Creamos un nombre de objeto único para evitar colisiones
    const objectName = `${userId}/${uuidv4()}-${originalFileName}`;
    const expiryInSeconds = 60 * 5; // El enlace será válido por 5 minutos

    this.logger.log(`Generando URL pre-firmada para: ${objectName}`);

    const presignedUrl = await this.minioClient.presignedPutObject(
      this.bucketName,
      objectName,
      expiryInSeconds,
    );

    return {
      presignedUrl, // La URL que usará el frontend para subir el archivo
      objectName,   // El nombre final del archivo que guardaremos en la DB
    };
  }
}