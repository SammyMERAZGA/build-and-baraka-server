import { IsString, IsNotEmpty, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class AdminLoginDto {
  @ApiProperty({
    description: 'Admin username',
    example: 'admin',
  })
  @IsString({
    message: "Le nom d'utilisateur doit être une chaîne de caractères",
  })
  @IsNotEmpty({ message: "Le nom d'utilisateur est requis" })
  username: string;

  @ApiProperty({
    description: 'Admin password',
    example: 'securePassword123',
    minLength: 6,
  })
  @IsString({ message: 'Le mot de passe doit être une chaîne de caractères' })
  @IsNotEmpty({ message: 'Le mot de passe est requis' })
  @MinLength(6, {
    message: 'Le mot de passe doit contenir au moins 6 caractères',
  })
  password: string;
}
