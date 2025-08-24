import { ApiProperty } from '@nestjs/swagger';
import {
  IsString,
  IsNotEmpty,
  MaxLength,
  IsOptional,
  IsUUID,
  IsArray,
  ArrayNotEmpty,
} from 'class-validator';

export class CreateRecipeDto {
  @ApiProperty({
    description: 'Nom de la recette',
    example: 'Miel et eau tiède',
    maxLength: 200,
  })
  @IsString({ message: 'Le nom doit être une chaîne de caractères' })
  @IsNotEmpty({ message: 'Le nom est obligatoire' })
  @MaxLength(200, {
    message: 'Le nom ne doit pas dépasser 200 caractères',
  })
  name: string;

  @ApiProperty({
    description: 'Nom arabe de la recette',
    example: 'العسل والماء الدافئ',
    required: false,
  })
  @IsOptional()
  @IsString({ message: 'Le nom arabe doit être une chaîne de caractères' })
  arabicName?: string;

  @ApiProperty({
    description: 'Description de la recette',
    example: 'Une boisson prophétique recommandée pour ses bienfaits',
  })
  @IsString({ message: 'La description doit être une chaîne de caractères' })
  @IsNotEmpty({ message: 'La description est obligatoire' })
  description: string;

  @ApiProperty({
    description: 'Liste des ingrédients',
    example: [
      '1 cuillère à soupe de miel',
      "1 verre d'eau tiède",
      '1 pincée de cannelle (optionnel)',
    ],
    type: [String],
  })
  @IsArray({ message: 'Les ingrédients doivent être un tableau' })
  @ArrayNotEmpty({ message: 'Au moins un ingrédient est requis' })
  @IsString({
    each: true,
    message: 'Chaque ingrédient doit être une chaîne de caractères',
  })
  ingredients: string[];

  @ApiProperty({
    description: 'Étapes de préparation',
    example: [
      "Chauffer l'eau à température tiède",
      'Ajouter le miel et mélanger',
      'Boire immédiatement',
    ],
    type: [String],
  })
  @IsArray({ message: 'Les préparations doivent être un tableau' })
  @ArrayNotEmpty({ message: 'Au moins une étape de préparation est requise' })
  @IsString({
    each: true,
    message: 'Chaque étape doit être une chaîne de caractères',
  })
  preparations: string[];

  @ApiProperty({
    description: 'Source du hadith',
    example: 'Sahih Bukhari 5684',
    required: false,
  })
  @IsOptional()
  @IsString({
    message: 'La source du hadith doit être une chaîne de caractères',
  })
  hadithSource?: string;

  @ApiProperty({
    description: 'Texte du hadith',
    example:
      'Le Prophète (ﷺ) a dit : "Le miel est un remède pour toute maladie"',
    required: false,
  })
  @IsOptional()
  @IsString({
    message: 'Le texte du hadith doit être une chaîne de caractères',
  })
  hadithText?: string;

  @ApiProperty({
    description: 'Usage et bienfaits',
    example: [
      'À boire le matin à jeun',
      'Aide à la digestion',
      'Renforce le système immunitaire',
    ],
    type: [String],
    required: true,
  })
  @IsArray({ message: "L'usage doit être un tableau" })
  @IsString({
    each: true,
    message: 'Chaque usage doit être une chaîne de caractères',
  })
  usage: string[];

  @ApiProperty({
    description: 'Icône de la recette',
    example: '🍯',
    required: false,
  })
  @IsOptional()
  @IsString({ message: "L'icône doit être une chaîne de caractères" })
  icon?: string;

  @ApiProperty({
    description: 'UUID de la catégorie de recette',
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  @IsString({ message: 'La catégorie doit être une chaîne de caractères' })
  @IsNotEmpty({ message: 'La catégorie est obligatoire' })
  @IsUUID('4', { message: 'La catégorie doit être un UUID valide' })
  recipeCategoryUuid: string;
}
