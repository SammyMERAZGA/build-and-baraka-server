import { ApiProperty } from '@nestjs/swagger';
import {
  IsString,
  IsNotEmpty,
  IsOptional,
  IsUrl,
  MaxLength,
} from 'class-validator';

export class CreateLinkDto {
  @ApiProperty({
    description: 'URL du lien',
    example: 'https://example.com',
  })
  @IsString({ message: 'L\'URL doit être une chaîne de caractères' })
  @IsNotEmpty({ message: 'L\'URL est obligatoire' })
  @IsUrl({}, { message: 'L\'URL doit être valide' })
  url: string;

  @ApiProperty({
    description: 'Nom du lien',
    example: 'Mon site web',
    maxLength: 255,
  })
  @IsString({ message: 'Le nom doit être une chaîne de caractères' })
  @IsNotEmpty({ message: 'Le nom est obligatoire' })
  @MaxLength(255, {
    message: 'Le nom ne doit pas dépasser 255 caractères',
  })
  name: string;

  @ApiProperty({
    description: 'Description du lien',
    example: 'Description de mon site web',
    required: false,
  })
  @IsOptional()
  @IsString({ message: 'La description doit être une chaîne de caractères' })
  description?: string;
}