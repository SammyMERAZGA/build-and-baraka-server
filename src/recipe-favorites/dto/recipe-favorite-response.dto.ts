import { ApiProperty } from '@nestjs/swagger';

class RecipeInfoDto {
  @ApiProperty({
    description: 'Identifiant unique de la recette',
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  uuid: string;

  @ApiProperty({
    description: 'Nom de la recette',
    example: 'Miel et eau tiède',
  })
  name: string;

  @ApiProperty({
    description: 'Nom arabe de la recette',
    example: 'العسل والماء الدافئ',
    nullable: true,
  })
  arabicName: string | null;

  @ApiProperty({
    description: 'Description de la recette',
    example: 'Une boisson prophétique recommandée pour ses bienfaits',
  })
  description: string;

  @ApiProperty({
    description: 'Icône de la recette',
    example: '🍯',
    nullable: true,
  })
  icon: string | null;

  @ApiProperty({
    description: 'Usage et bienfaits',
    example: "À boire le matin à jeun pour purifier l'organisme",
    nullable: true,
  })
  usage: string | null;

  constructor(recipe: any) {
    this.uuid = recipe.uuid;
    this.name = recipe.name;
    this.arabicName = recipe.arabicName;
    this.description = recipe.description;
    this.icon = recipe.icon;
    this.usage = recipe.usage;
  }
}

export class RecipeFavoriteResponseDto {
  @ApiProperty({
    description: 'Identifiant unique du favori',
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  uuid: string;

  @ApiProperty({
    description: "Date d'ajout aux favoris",
    example: '2024-01-15T10:30:00.000Z',
  })
  createdAt: Date;

  @ApiProperty({
    description: 'Informations de la recette favorite',
    type: RecipeInfoDto,
  })
  recipe: RecipeInfoDto;

  constructor(favorite: any) {
    this.uuid = favorite.uuid;
    this.createdAt = favorite.createdAt;
    this.recipe = new RecipeInfoDto(favorite.recipe);
  }
}
