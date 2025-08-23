import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsString,
  MinLength,
  IsBoolean,
  IsOptional,
  Matches,
} from 'class-validator';

export class UpdateProfileDto {
  @ApiProperty({
    description: 'Nouvelle adresse email',
    example: 'nouveauemail@exemple.com',
    required: false,
  })
  @IsOptional()
  @IsEmail({}, { message: 'Veuillez fournir une adresse email valide' })
  @Matches(/^[^\s@]+@[^\s@]+\.[^\s@]+$/, { message: "Format d'email invalide" })
  @Matches(
    /^(?!.*@(yopmail|10minutemail|guerrillamail|mailinator|tempmail)\.)/i,
    {
      message: 'Les adresses email temporaires ne sont pas autorisées',
    },
  )
  email?: string;

  @ApiProperty({
    description: "Préférence d'abonnement à la newsletter",
    example: true,
    required: false,
  })
  @IsOptional()
  @IsBoolean({ message: "L'abonnement newsletter doit être un booléen" })
  newsletterSubscribed?: boolean;
}

export class ChangePasswordDto {
  @ApiProperty({
    description: 'Mot de passe actuel',
    example: 'monmotdepasseactuel',
  })
  @IsString({
    message: 'Le mot de passe actuel doit être une chaîne de caractères',
  })
  currentPassword: string;

  @ApiProperty({
    description: 'Nouveau mot de passe',
    example: 'monnouveaumotdepasse123',
    minLength: 8,
  })
  @IsString({
    message: 'Le nouveau mot de passe doit être une chaîne de caractères',
  })
  @MinLength(8, {
    message: 'Le mot de passe doit contenir au moins 8 caractères',
  })
  newPassword: string;
}
