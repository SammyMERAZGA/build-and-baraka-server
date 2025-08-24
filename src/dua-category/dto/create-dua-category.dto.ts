import { ApiProperty } from '@nestjs/swagger';
import {
  IsString,
  IsNotEmpty,
  MaxLength,
  IsOptional,
  IsHexColor,
} from 'class-validator';

export class CreateDuaCategoryDto {
  @ApiProperty({
    description: 'Nom de la catégorie de duas',
    example: 'Duas du matin',
    maxLength: 100,
  })
  @IsString({ message: 'Le nom doit être une chaîne de caractères' })
  @IsNotEmpty({ message: 'Le nom est obligatoire' })
  @MaxLength(100, {
    message: 'Le nom ne doit pas dépasser 100 caractères',
  })
  name: string;

  @ApiProperty({
    description: 'Couleur de la catégorie (code hexadécimal)',
    example: '#3B82F6',
    required: false,
  })
  @IsOptional()
  @IsString({ message: 'La couleur doit être une chaîne de caractères' })
  @IsHexColor({
    message: 'La couleur doit être un code hexadécimal valide (ex: #3B82F6)',
  })
  color?: string;
}
