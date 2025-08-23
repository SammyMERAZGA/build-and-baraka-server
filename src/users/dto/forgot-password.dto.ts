import { ApiProperty } from '@nestjs/swagger';
import { IsEmail } from 'class-validator';

export class ForgotPasswordDto {
  @ApiProperty({
    description: 'Adresse email pour envoyer le code OTP de réinitialisation',
    example: 'utilisateur@exemple.com',
  })
  @IsEmail({}, { message: 'Veuillez fournir une adresse email valide' })
  email: string;
}
