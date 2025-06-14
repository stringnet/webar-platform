import { IsString, IsNotEmpty, IsUrl } from 'class-validator';

export class CreateProjectDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  markerUrl: string; // <-- AÑADIDO

  @IsString()
  @IsNotEmpty()
  contentUrl: string; // <-- AÑADIDO
}