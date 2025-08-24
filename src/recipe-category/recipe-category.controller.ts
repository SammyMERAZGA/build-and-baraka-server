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
import { RecipeCategoryService } from './recipe-category.service';
import {
  CreateRecipeCategoryDto,
  UpdateRecipeCategoryDto,
  RecipeCategoryResponseDto,
} from './dto';

@ApiTags('Catégories de Recettes')
@Controller('recipe-categories')
@Public()
export class RecipeCategoryController {
  constructor(private readonly recipeCategoryService: RecipeCategoryService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({
    summary: 'Créer une catégorie de recettes',
    description: 'Créer une nouvelle catégorie de recettes',
  })
  @ApiResponse({
    status: 201,
    description: 'Catégorie créée avec succès',
    type: RecipeCategoryResponseDto,
  })
  @ApiResponse({
    status: 400,
    description: "Données d'entrée invalides",
  })
  @ApiResponse({
    status: 409,
    description: 'Une catégorie avec ce nom existe déjà',
  })
  async create(
    @Body() createRecipeCategoryDto: CreateRecipeCategoryDto,
  ): Promise<RecipeCategoryResponseDto> {
    return this.recipeCategoryService.create(createRecipeCategoryDto);
  }

  @Get()
  @ApiOperation({
    summary: 'Récupérer toutes les catégories de recettes',
    description: 'Récupérer la liste de toutes les catégories de recettes',
  })
  @ApiResponse({
    status: 200,
    description: 'Liste des catégories récupérée avec succès',
    type: [RecipeCategoryResponseDto],
  })
  async findAll(): Promise<RecipeCategoryResponseDto[]> {
    return this.recipeCategoryService.findAll();
  }

  @Get(':uuid')
  @ApiOperation({
    summary: 'Récupérer une catégorie de recettes',
    description: 'Récupérer une catégorie de recettes par son identifiant',
  })
  @ApiParam({
    name: 'uuid',
    description: 'Identifiant unique de la catégorie',
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  @ApiResponse({
    status: 200,
    description: 'Catégorie récupérée avec succès',
    type: RecipeCategoryResponseDto,
  })
  @ApiResponse({
    status: 404,
    description: 'Catégorie non trouvée',
  })
  async findOne(
    @Param('uuid') uuid: string,
  ): Promise<RecipeCategoryResponseDto> {
    return this.recipeCategoryService.findOne(uuid);
  }

  @Patch(':uuid')
  @ApiOperation({
    summary: 'Modifier une catégorie de recettes',
    description: 'Modifier une catégorie de recettes existante',
  })
  @ApiParam({
    name: 'uuid',
    description: 'Identifiant unique de la catégorie',
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  @ApiResponse({
    status: 200,
    description: 'Catégorie modifiée avec succès',
    type: RecipeCategoryResponseDto,
  })
  @ApiResponse({
    status: 400,
    description: "Données d'entrée invalides",
  })
  @ApiResponse({
    status: 404,
    description: 'Catégorie non trouvée',
  })
  @ApiResponse({
    status: 409,
    description: 'Une catégorie avec ce nom existe déjà',
  })
  async update(
    @Param('uuid') uuid: string,
    @Body() updateRecipeCategoryDto: UpdateRecipeCategoryDto,
  ): Promise<RecipeCategoryResponseDto> {
    return this.recipeCategoryService.update(uuid, updateRecipeCategoryDto);
  }

  @Delete(':uuid')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({
    summary: 'Supprimer une catégorie de recettes',
    description: 'Supprimer une catégorie de recettes existante',
  })
  @ApiParam({
    name: 'uuid',
    description: 'Identifiant unique de la catégorie',
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  @ApiResponse({
    status: 204,
    description: 'Catégorie supprimée avec succès',
  })
  @ApiResponse({
    status: 404,
    description: 'Catégorie non trouvée',
  })
  async remove(@Param('uuid') uuid: string): Promise<void> {
    return this.recipeCategoryService.remove(uuid);
  }
}
