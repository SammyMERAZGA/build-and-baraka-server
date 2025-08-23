import { ApiProperty } from '@nestjs/swagger';
import { IsString, Matches, IsEmail } from 'class-validator';

export class VerifyOtpDto {
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
}
