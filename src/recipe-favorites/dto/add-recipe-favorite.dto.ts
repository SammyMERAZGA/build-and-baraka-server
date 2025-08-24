import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsUUID } from 'class-validator';

export class AddRecipeFavoriteDto {
  @ApiProperty({
    description: 'UUID de la recette à ajouter aux favoris',
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  @IsString({ message: 'La recette doit être une chaîne de caractères' })
  @IsNotEmpty({ message: 'La recette est obligatoire' })
  @IsUUID('4', { message: 'La recette doit être un UUID valide' })
  recipeUuid: string;
}
