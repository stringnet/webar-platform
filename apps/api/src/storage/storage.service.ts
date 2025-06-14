import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as Minio from 'minio';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class StorageService {
  private readonly logger = new Logger(StorageService.name);
  private readonly minioClient: Minio.Client;
  private readonly bucketName: string;

  constructor(private configService: ConfigService) {
    this.minioClient = new Minio.Client({
      endPoint: this.configService.get('MINIO_ENDPOINT'),
      port: parseInt(this.configService.get('MINIO_PORT'), 10),
      useSSL: this.configService.get('MINIO_USE_SSL') === 'true',
      accessKey: this.configService.get('MINIO_ACCESS_KEY'),
      secretKey: this.configService.get('MINIO_SECRET_KEY'),
    });
    this.bucketName = this.configService.get('MINIO_BUCKET_NAME');
    this.ensureBucketExists(); // Llama a la verificación al iniciar
  }

  private async ensureBucketExists() {
    try {
      this.logger.log(`Verificando si el bucket '${this.bucketName}' existe...`);
      const bucketExists = await this.minioClient.bucketExists(this.bucketName);
      if (!bucketExists) {
        this.logger.log(`Bucket no encontrado, creándolo...`);
        await this.minioClient.makeBucket(this.bucketName, 'us-east-1');
        this.logger.log(`Bucket '${this.bucketName}' creado exitosamente.`);
      } else {
        this.logger.log(`Bucket '${this.bucketName}' ya existe.`);
      }
    } catch (err) {
        this.logger.error("Error al verificar/crear el bucket de MinIO:", err);
    }
  }

  async generatePresignedUploadUrl(originalFileName: string, userId: string) {
    const objectName = `${userId}/${uuidv4()}-${originalFileName}`;
    const expiryInSeconds = 60 * 5; // 5 minutos de validez

    const presignedUrl = await this.minioClient.presignedPutObject(
      this.bucketName,
      objectName,
      expiryInSeconds,
    );

    return { presignedUrl, objectName };
  }
}