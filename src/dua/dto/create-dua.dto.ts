import { ApiProperty } from '@nestjs/swagger';
import {
  IsString,
  IsNotEmpty,
  MaxLength,
  IsOptional,
  IsHexColor,
  IsUUID,
} from 'class-validator';

export class CreateDuaDto {
  @ApiProperty({
    description: 'Titre du dua',
    example: 'Dua du matin',
    maxLength: 200,
  })
  @IsString({ message: 'Le titre doit être une chaîne de caractères' })
  @IsNotEmpty({ message: 'Le titre est obligatoire' })
  @MaxLength(200, {
    message: 'Le titre ne doit pas dépasser 200 caractères',
  })
  title: string;

  @ApiProperty({
    description: 'Image du dua (URL)',
    example: 'https://example.com/image.jpg',
    required: false,
  })
  @IsOptional()
  @IsString({ message: "L'image doit être une chaîne de caractères" })
  image?: string;

  @ApiProperty({
    description: 'Texte arabe du dua',
    example: 'اللَّهُمَّ بِكَ أَصْبَحْنَا',
  })
  @IsString({ message: 'Le texte arabe doit être une chaîne de caractères' })
  @IsNotEmpty({ message: 'Le texte arabe est obligatoire' })
  arabic: string;

  @ApiProperty({
    description: 'Translittération du dua',
    example: 'Allahumma bika asbahna',
  })
  @IsString({
    message: 'La translittération doit être une chaîne de caractères',
  })
  @IsNotEmpty({ message: 'La translittération est obligatoire' })
  transliteration: string;

  @ApiProperty({
    description: 'Traduction du dua',
    example: 'Ô Allah, par Toi nous entrons dans le matin',
  })
  @IsString({ message: 'La traduction doit être une chaîne de caractères' })
  @IsNotEmpty({ message: 'La traduction est obligatoire' })
  translation: string;

  @ApiProperty({
    description: 'Référence du dua (source)',
    example: 'Sahih Muslim 2723',
  })
  @IsString({ message: 'La référence doit être une chaîne de caractères' })
  @IsNotEmpty({ message: 'La référence est obligatoire' })
  reference: string;

  @ApiProperty({
    description: 'Couleur du dua (code hexadécimal)',
    example: '#3B82F6',
    required: false,
  })
  @IsOptional()
  @IsString({ message: 'La couleur doit être une chaîne de caractères' })
  @IsHexColor({
    message: 'La couleur doit être un code hexadécimal valide (ex: #3B82F6)',
  })
  color?: string;

  @ApiProperty({
    description: 'UUID de la catégorie de dua',
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  @IsString({ message: 'La catégorie doit être une chaîne de caractères' })
  @IsNotEmpty({ message: 'La catégorie est obligatoire' })
  @IsUUID('4', { message: 'La catégorie doit être un UUID valide' })
  duaCategoryUuid: string;
}
