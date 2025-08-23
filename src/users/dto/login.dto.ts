import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString } from 'class-validator';

export class LoginDto {
  @ApiProperty({
    description: "Adresse email de l'utilisateur",
    example: 'utilisateur@exemple.com',
  })
  @IsEmail({}, { message: 'Veuillez fournir une adresse email valide' })
  email: string;

  @ApiProperty({
    description: 'Mot de passe du compte utilisateur',
    example: 'MonMotDePasseSecurise123!',
  })
  @IsString({ message: 'Le mot de passe doit être une chaîne de caractères' })
  password: string;
}
