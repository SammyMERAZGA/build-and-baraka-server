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
import { DuaFavoritesService } from './dua-favorites.service';
import { AddFavoriteDto, FavoriteResponseDto } from './dto';

@ApiTags('Favoris de Duas')
@Controller('dua-favorites')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
export class DuaFavoritesController {
  constructor(private readonly duaFavoritesService: DuaFavoritesService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({
    summary: 'Ajouter un dua aux favoris',
    description:
      "Ajouter un dua à la liste des favoris de l'utilisateur connecté",
  })
  @ApiResponse({
    status: 201,
    description: 'Dua ajouté aux favoris avec succès',
    type: FavoriteResponseDto,
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
    description: 'Dua non trouvé',
  })
  @ApiResponse({
    status: 409,
    description: 'Ce dua est déjà dans vos favoris',
  })
  async addFavorite(
    @CurrentUser() user: any,
    @Body() addFavoriteDto: AddFavoriteDto,
  ): Promise<FavoriteResponseDto> {
    return this.duaFavoritesService.addFavorite(user.uuid, addFavoriteDto);
  }

  @Get()
  @ApiOperation({
    summary: 'Récupérer mes favoris',
    description:
      "Récupérer la liste des duas favoris de l'utilisateur connecté",
  })
  @ApiResponse({
    status: 200,
    description: 'Liste des favoris récupérée avec succès',
    type: [FavoriteResponseDto],
  })
  @ApiResponse({
    status: 401,
    description: 'Non autorisé - Token JWT invalide ou manquant',
  })
  async getUserFavorites(
    @CurrentUser() user: any,
  ): Promise<FavoriteResponseDto[]> {
    return this.duaFavoritesService.getUserFavorites(user.uuid);
  }

  @Delete(':duaUuid')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({
    summary: 'Retirer un dua des favoris',
    description:
      "Retirer un dua de la liste des favoris de l'utilisateur connecté",
  })
  @ApiParam({
    name: 'duaUuid',
    description: 'Identifiant unique du dua à retirer des favoris',
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  @ApiResponse({
    status: 204,
    description: 'Dua retiré des favoris avec succès',
  })
  @ApiResponse({
    status: 401,
    description: 'Non autorisé - Token JWT invalide ou manquant',
  })
  @ApiResponse({
    status: 404,
    description: "Ce dua n'est pas dans vos favoris",
  })
  async removeFavorite(
    @CurrentUser() user: any,
    @Param('duaUuid') duaUuid: string,
  ): Promise<void> {
    return this.duaFavoritesService.removeFavorite(user.uuid, duaUuid);
  }
}
