import {
  Controller,
  Get,
  Post,
  Delete,
  Body,
  Param,
  UseGuards,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBearerAuth,
  ApiParam,
} from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { CurrentUser } from '../auth/decorators/current-user.decorator';
import { RecipeFavoritesService } from './recipe-favorites.service';
import { AddRecipeFavoriteDto, RecipeFavoriteResponseDto } from './dto';

@ApiTags('Favoris de Recettes')
@Controller('recipe-favorites')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
export class RecipeFavoritesController {
  constructor(
    private readonly recipeFavoritesService: RecipeFavoritesService,
  ) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({
    summary: 'Ajouter une recette aux favoris',
    description:
      "Ajouter une recette à la liste des favoris de l'utilisateur connecté",
  })
  @ApiResponse({
    status: 201,
    description: 'Recette ajoutée aux favoris avec succès',
    type: RecipeFavoriteResponseDto,
  })
  @ApiResponse({
    status: 400,
    description: "Données d'entrée invalides",
  })
  @ApiResponse({
    status: 401,
    description: 'Non autorisé - Token JWT invalide ou manquant',
  })
  @ApiResponse({
    status: 404,
    description: 'Recette non trouvée',
  })
  @ApiResponse({
    status: 409,
    description: 'Cette recette est déjà dans vos favoris',
  })
  async addFavorite(
    @CurrentUser() user: any,
    @Body() addRecipeFavoriteDto: AddRecipeFavoriteDto,
  ): Promise<RecipeFavoriteResponseDto> {
    return this.recipeFavoritesService.addFavorite(
      user.uuid,
      addRecipeFavoriteDto,
    );
  }

  @Get()
  @ApiOperation({
    summary: 'Récupérer mes favoris',
    description:
      "Récupérer la liste des recettes favorites de l'utilisateur connecté",
  })
  @ApiResponse({
    status: 200,
    description: 'Liste des favoris récupérée avec succès',
    type: [RecipeFavoriteResponseDto],
  })
  @ApiResponse({
    status: 401,
    description: 'Non autorisé - Token JWT invalide ou manquant',
  })
  async getUserFavorites(
    @CurrentUser() user: any,
  ): Promise<RecipeFavoriteResponseDto[]> {
    return this.recipeFavoritesService.getUserFavorites(user.uuid);
  }

  @Delete(':recipeUuid')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({
    summary: 'Retirer une recette des favoris',
    description:
      "Retirer une recette de la liste des favoris de l'utilisateur connecté",
  })
  @ApiParam({
    name: 'recipeUuid',
    description: 'Identifiant unique de la recette à retirer des favoris',
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  @ApiResponse({
    status: 204,
    description: 'Recette retirée des favoris avec succès',
  })
  @ApiResponse({
    status: 401,
    description: 'Non autorisé - Token JWT invalide ou manquant',
  })
  @ApiResponse({
    status: 404,
    description: "Cette recette n'est pas dans vos favoris",
  })
  async removeFavorite(
    @CurrentUser() user: any,
    @Param('recipeUuid') recipeUuid: string,
  ): Promise<void> {
    return this.recipeFavoritesService.removeFavorite(user.uuid, recipeUuid);
  }
}
