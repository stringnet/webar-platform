import { Injectable, OnModuleInit, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as Minio from 'minio';

@Injectable()
export class StorageService implements OnModuleInit {
  private readonly logger = new Logger(StorageService.name);
  private readonly minioClient: Minio.Client;
  private readonly bucketName: string;

  constructor(private configService: ConfigService) {
    // Inicializamos el cliente de MinIO con las credenciales de las variables de entorno
    this.minioClient = new Minio.Client({
      endPoint: this.configService.get('MINIO_ENDPOINT'),
      port: parseInt(this.configService.get('MINIO_PORT'), 10),
      useSSL: this.configService.get('MINIO_USE_SSL') === 'true',
      accessKey: this.configService.get('MINIO_ACCESS_KEY'),
      secretKey: this.configService.get('MINIO_SECRET_KEY'),
    });

    this.bucketName = this.configService.get('MINIO_BUCKET_NAME');
  }

  // Esta función se ejecuta automáticamente cuando el módulo se inicia
  async onModuleInit() {
    await this.ensureBucketExists();
  }

  private async ensureBucketExists() {
    this.logger.log(`Verificando si el bucket '${this.bucketName}' existe...`);
    const bucketExists = await this.minioClient.bucketExists(this.bucketName);

    if (bucketExists) {
      this.logger.log(`Bucket '${this.bucketName}' ya existe.`);
    } else {
      this.logger.log(`Bucket '${this.bucketName}' no encontrado, creándolo...`);
      await this.minioClient.makeBucket(this.bucketName, 'us-east-1');
      this.logger.log(`Bucket '${this.bucketName}' creado exitosamente.`);
    }
  }

  // En el futuro, aquí añadiremos la función para generar las URLs de subida
}