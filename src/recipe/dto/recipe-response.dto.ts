import { ApiProperty } from '@nestjs/swagger';

class RecipeCategoryInfoDto {
  @ApiProperty({
    description: 'Identifiant unique de la catégorie',
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  uuid: string;

  @ApiProperty({
    description: 'Nom de la catégorie',
    example: 'Boissons prophétiques',
  })
  name: string;

  @ApiProperty({
    description: 'Couleur de la catégorie',
    example: '#10B981',
    nullable: true,
  })
  color: string | null;

  constructor(category: any) {
    this.uuid = category.uuid;
    this.name = category.name;
    this.color = category.color;
  }
}

export class RecipeResponseDto {
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
    description: 'Liste des ingrédients',
    example: [
      '1 cuillère à soupe de miel',
      "1 verre d'eau tiède",
      '1 pincée de cannelle (optionnel)',
    ],
    type: [String],
  })
  ingredients: string[];

  @ApiProperty({
    description: 'Étapes de préparation',
    example: [
      "Chauffer l'eau à température tiède",
      'Ajouter le miel et mélanger',
      'Boire immédiatement',
    ],
    type: [String],
  })
  preparations: string[];

  @ApiProperty({
    description: 'Source du hadith',
    example: 'Sahih Bukhari 5684',
    nullable: true,
  })
  hadithSource: string | null;

  @ApiProperty({
    description: 'Texte du hadith',
    example:
      'Le Prophète (ﷺ) a dit : "Le miel est un remède pour toute maladie"',
    nullable: true,
  })
  hadithText: string | null;

  @ApiProperty({
    description: 'Usage et bienfaits',
    example: [
      'À boire le matin à jeun',
      'Aide à la digestion',
      'Renforce le système immunitaire',
    ],
    type: [String],
    nullable: true,
  })
  usage: string[] | null;

  @ApiProperty({
    description: 'Icône de la recette',
    example: '🍯',
    nullable: true,
  })
  icon: string | null;

  @ApiProperty({
    description: 'Date de création de la recette',
    example: '2024-01-15T10:30:00.000Z',
  })
  createdAt: Date;

  @ApiProperty({
    description: 'Date de dernière mise à jour',
    example: '2024-01-15T10:30:00.000Z',
  })
  updatedAt: Date;

  @ApiProperty({
    description: 'Catégorie de la recette',
    type: RecipeCategoryInfoDto,
  })
  recipeCategory: RecipeCategoryInfoDto;

  constructor(recipe: any) {
    this.uuid = recipe.uuid;
    this.name = recipe.name;
    this.arabicName = recipe.arabicName;
    this.description = recipe.description;
    this.ingredients = recipe.ingredients;
    this.preparations = recipe.preparations;
    this.hadithSource = recipe.hadithSource;
    this.hadithText = recipe.hadithText;
    this.usage = recipe.usage;
    this.icon = recipe.icon;
    this.createdAt = recipe.createdAt;
    this.updatedAt = recipe.updatedAt;
    this.recipeCategory = new RecipeCategoryInfoDto(recipe.recipeCategory);
  }
}
