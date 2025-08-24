import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsUUID } from 'class-validator';

export class AddFavoriteDto {
  @ApiProperty({
    description: 'UUID du dua à ajouter aux favoris',
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  @IsString({ message: 'Le dua doit être une chaîne de caractères' })
  @IsNotEmpty({ message: 'Le dua est obligatoire' })
  @IsUUID('4', { message: 'Le dua doit être un UUID valide' })
  duaUuid: string;
}
