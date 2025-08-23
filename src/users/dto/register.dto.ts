import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsString,
  MinLength,
  IsBoolean,
  IsOptional,
  Matches,
} from 'class-validator';

export class RegisterDto {
  @ApiProperty({
    description: "Adresse email de l'utilisateur",
    example: 'utilisateur@exemple.com',
    required: true,
  })
  @IsEmail({}, { message: 'Veuillez fournir une adresse email valide' })
  @Matches(/^[^\s@]+@[^\s@]+\.[^\s@]+$/, { message: "Format d'email invalide" })
  @Matches(
    /^(?!.*@(yopmail|10minutemail|guerrillamail|mailinator|tempmail)\.)/i,
    {
      message: 'Les adresses email temporaires ne sont pas autorisées',
    },
  )
  email: string;

  @ApiProperty({
    description: 'Mot de passe du compte utilisateur',
    example: 'monmotdepasse123',
    minLength: 8,
    required: true,
  })
  @IsString({ message: 'Le mot de passe doit être une chaîne de caractères' })
  @MinLength(8, {
    message: 'Le mot de passe doit contenir au moins 8 caractères',
  })
  password: string;

  @ApiProperty({
    description: "S'abonner à la newsletter",
    example: true,
    required: false,
    default: false,
  })
  @IsOptional()
  @IsBoolean({ message: "L'abonnement newsletter doit être un booléen" })
  newsletterSubscribed?: boolean = false;
}
