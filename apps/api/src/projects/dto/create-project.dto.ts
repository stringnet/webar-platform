import { IsString, IsNotEmpty } from 'class-validator';

export class CreateProjectDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  // En el futuro aquí añadiremos markerUrl, contentUrl, etc.
}