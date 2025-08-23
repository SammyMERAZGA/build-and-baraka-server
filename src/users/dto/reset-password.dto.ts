import { ApiProperty } from '@nestjs/swagger';
import { IsString, MinLength, Matches, IsEmail } from 'class-validator';

export class ResetPasswordDto {
  @ApiProperty({
    description: "Adresse email de l'utilisateur",
    example: 'utilisateur@exemple.com',
  })
  @IsEmail({}, { message: 'Veuillez fournir une adresse email valide' })
  email: string;

  @ApiProperty({
    description: 'Code OTP reçu par email (6 chiffres)',
    example: '123456',
  })
  @IsString({ message: 'Le code OTP doit être une chaîne de caractères' })
  @Matches(/^\d{6}$/, {
    message: 'Le code OTP doit contenir exactement 6 chiffres',
  })
  otpCode: string;

  @ApiProperty({
    description: 'Nouveau mot de passe pour le compte utilisateur',
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
