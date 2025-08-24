import { ApiProperty } from '@nestjs/swagger';
import {
  IsString,
  IsNotEmpty,
  IsEmail,
  MaxLength,
  MinLength,
  IsEnum,
} from 'class-validator';
import { ContactSubject } from '../enums';

export class CreateContactDto {
  @ApiProperty({
    description: 'Adresse email du contact',
    example: 'john.doe@example.com',
  })
  @IsEmail({}, { message: 'Veuillez fournir une adresse email valide' })
  @IsNotEmpty({ message: "L'email est obligatoire" })
  email: string;

  @ApiProperty({
    description: 'Motif de la prise de contact',
    enum: ContactSubject,
    example: ContactSubject.GENERAL_FEEDBACK,
  })
  @IsEnum(ContactSubject, {
    message:
      'Le motif doit être une valeur valide parmi les options disponibles',
  })
  @IsNotEmpty({ message: 'Le motif est obligatoire' })
  subject: ContactSubject;

  @ApiProperty({
    description: 'Message de contact',
    example:
      "Bonjour, j'aimerais en savoir plus sur les fonctionnalités de votre application Build & Baraka...",
  })
  @IsString({ message: 'Le message doit être une chaîne de caractères' })
  @IsNotEmpty({ message: 'Le message est obligatoire' })
  @MinLength(10, {
    message: 'Le message doit contenir au moins 10 caractères',
  })
  @MaxLength(2000, {
    message: 'Le message ne doit pas dépasser 2000 caractères',
  })
  message: string;
}
