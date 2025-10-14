import { IsString, IsNotEmpty, MinLength, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateAdminDto {
  @ApiProperty({
    description: 'Admin username',
    example: 'admin_sammy',
  })
  @IsString({
    message: "Le nom d'utilisateur doit être une chaîne de caractères",
  })
  @IsNotEmpty({ message: "Le nom d'utilisateur est requis" })
  @MinLength(3, {
    message: "Le nom d'utilisateur doit contenir au moins 3 caractères",
  })
  username: string;

  @ApiProperty({
    description: 'Admin password',
    example: 'SecureAdminPassword123!',
  })
  @IsString({ message: 'Le mot de passe doit être une chaîne de caractères' })
  @IsNotEmpty({ message: 'Le mot de passe est requis' })
  @MinLength(8, {
    message: 'Le mot de passe doit contenir au moins 8 caractères',
  })
  password: string;

  @ApiProperty({
    description: 'Admin description (optional)',
    example: 'Super administrateur du système',
    required: false,
  })
  @IsOptional()
  @IsString({ message: 'La description doit être une chaîne de caractères' })
  description?: string;
}
