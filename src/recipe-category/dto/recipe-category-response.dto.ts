import { ApiProperty } from '@nestjs/swagger';

export class RecipeCategoryResponseDto {
  @ApiProperty({
    description: 'Identifiant unique de la catégorie',
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  uuid: string;

  @ApiProperty({
    description: 'Nom de la catégorie de recettes',
    example: 'Boissons prophétiques',
  })
  name: string;

  @ApiProperty({
    description: 'Couleur de la catégorie',
    example: '#10B981',
    nullable: true,
  })
  color: string | null;

  @ApiProperty({
    description: 'Date de création de la catégorie',
    example: '2024-01-15T10:30:00.000Z',
  })
  createdAt: Date;

  @ApiProperty({
    description: 'Date de dernière mise à jour',
    example: '2024-01-15T10:30:00.000Z',
  })
  updatedAt: Date;

  constructor(recipeCategory: any) {
    this.uuid = recipeCategory.uuid;
    this.name = recipeCategory.name;
    this.color = recipeCategory.color;
    this.createdAt = recipeCategory.createdAt;
    this.updatedAt = recipeCategory.updatedAt;
  }
}
