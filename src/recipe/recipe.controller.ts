import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiParam } from '@nestjs/swagger';
import { Public } from '../auth/decorators/public.decorator';
import { RecipeService } from './recipe.service';
import { CreateRecipeDto, UpdateRecipeDto, RecipeResponseDto } from './dto';

@ApiTags('Recettes')
@Controller('recipes')
@Public()
export class RecipeController {
  constructor(private readonly recipeService: RecipeService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({
    summary: 'Créer une recette',
    description: 'Créer une nouvelle recette',
  })
  @ApiResponse({
    status: 201,
    description: 'Recette créée avec succès',
    type: RecipeResponseDto,
  })
  @ApiResponse({
    status: 400,
    description: "Données d'entrée invalides",
  })
  @ApiResponse({
    status: 404,
    description: 'Catégorie de recette non trouvée',
  })
  @ApiResponse({
    status: 409,
    description: 'Une recette avec ce nom existe déjà dans cette catégorie',
  })
  async create(
    @Body() createRecipeDto: CreateRecipeDto,
  ): Promise<RecipeResponseDto> {
    return this.recipeService.create(createRecipeDto);
  }

  @Get()
  @ApiOperation({
    summary: 'Récupérer toutes les recettes',
    description:
      'Récupérer la liste de toutes les recettes avec leurs catégories',
  })
  @ApiResponse({
    status: 200,
    description: 'Liste des recettes récupérée avec succès',
    type: [RecipeResponseDto],
  })
  async findAll(): Promise<RecipeResponseDto[]> {
    return this.recipeService.findAll();
  }

  @Get('category/:categoryUuid')
  @ApiOperation({
    summary: 'Récupérer les recettes par catégorie',
    description:
      'Récupérer toutes les recettes appartenant à une catégorie spécifique',
  })
  @ApiParam({
    name: 'categoryUuid',
    description: 'Identifiant unique de la catégorie',
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  @ApiResponse({
    status: 200,
    description: 'Liste des recettes de la catégorie récupérée avec succès',
    type: [RecipeResponseDto],
  })
  @ApiResponse({
    status: 404,
    description: 'Catégorie non trouvée',
  })
  async findByCategory(
    @Param('categoryUuid') categoryUuid: string,
  ): Promise<RecipeResponseDto[]> {
    return this.recipeService.findByCategory(categoryUuid);
  }

  @Get(':uuid')
  @ApiOperation({
    summary: 'Récupérer une recette',
    description: 'Récupérer une recette par son identifiant',
  })
  @ApiParam({
    name: 'uuid',
    description: 'Identifiant unique de la recette',
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  @ApiResponse({
    status: 200,
    description: 'Recette récupérée avec succès',
    type: RecipeResponseDto,
  })
  @ApiResponse({
    status: 404,
    description: 'Recette non trouvée',
  })
  async findOne(@Param('uuid') uuid: string): Promise<RecipeResponseDto> {
    return this.recipeService.findOne(uuid);
  }

  @Patch(':uuid')
  @ApiOperation({
    summary: 'Modifier une recette',
    description: 'Modifier une recette existante',
  })
  @ApiParam({
    name: 'uuid',
    description: 'Identifiant unique de la recette',
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  @ApiResponse({
    status: 200,
    description: 'Recette modifiée avec succès',
    type: RecipeResponseDto,
  })
  @ApiResponse({
    status: 400,
    description: "Données d'entrée invalides",
  })
  @ApiResponse({
    status: 404,
    description: 'Recette ou catégorie non trouvée',
  })
  @ApiResponse({
    status: 409,
    description: 'Une recette avec ce nom existe déjà dans cette catégorie',
  })
  async update(
    @Param('uuid') uuid: string,
    @Body() updateRecipeDto: UpdateRecipeDto,
  ): Promise<RecipeResponseDto> {
    return this.recipeService.update(uuid, updateRecipeDto);
  }

  @Delete(':uuid')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({
    summary: 'Supprimer une recette',
    description: 'Supprimer une recette existante',
  })
  @ApiParam({
    name: 'uuid',
    description: 'Identifiant unique de la recette',
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  @ApiResponse({
    status: 204,
    description: 'Recette supprimée avec succès',
  })
  @ApiResponse({
    status: 404,
    description: 'Recette non trouvée',
  })
  async remove(@Param('uuid') uuid: string): Promise<void> {
    return this.recipeService.remove(uuid);
  }
}
