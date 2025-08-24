import {
  Injectable,
  NotFoundException,
  ConflictException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { AddRecipeFavoriteDto, RecipeFavoriteResponseDto } from './dto';

@Injectable()
export class RecipeFavoritesService {
  constructor(private readonly prisma: PrismaService) {}

  async addFavorite(
    userUuid: string,
    addRecipeFavoriteDto: AddRecipeFavoriteDto,
  ): Promise<RecipeFavoriteResponseDto> {
    // Vérifier si la recette existe
    const recipeExists = await this.prisma.recipe.findUnique({
      where: { uuid: addRecipeFavoriteDto.recipeUuid },
    });

    if (!recipeExists) {
      throw new NotFoundException('Recette non trouvée');
    }

    // Vérifier si la recette n'est pas déjà en favori
    const existingFavorite = await this.prisma.recipeFavorites.findFirst({
      where: {
        userUuid,
        recipeUuid: addRecipeFavoriteDto.recipeUuid,
      },
    });

    if (existingFavorite) {
      throw new ConflictException('Cette recette est déjà dans vos favoris');
    }

    const favorite = await this.prisma.recipeFavorites.create({
      data: {
        userUuid,
        recipeUuid: addRecipeFavoriteDto.recipeUuid,
      },
      include: {
        recipe: {
          select: {
            uuid: true,
            name: true,
            arabicName: true,
            description: true,
            icon: true,
            usage: true,
          },
        },
      },
    });

    return new RecipeFavoriteResponseDto(favorite);
  }

  async getUserFavorites(
    userUuid: string,
  ): Promise<RecipeFavoriteResponseDto[]> {
    const favorites = await this.prisma.recipeFavorites.findMany({
      where: { userUuid },
      include: {
        recipe: {
          select: {
            uuid: true,
            name: true,
            arabicName: true,
            description: true,
            icon: true,
            usage: true,
          },
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
    });

    return favorites.map((favorite) => new RecipeFavoriteResponseDto(favorite));
  }

  async removeFavorite(userUuid: string, recipeUuid: string): Promise<void> {
    const favorite = await this.prisma.recipeFavorites.findFirst({
      where: {
        userUuid,
        recipeUuid,
      },
    });

    if (!favorite) {
      throw new NotFoundException("Cette recette n'est pas dans vos favoris");
    }

    await this.prisma.recipeFavorites.delete({
      where: {
        uuid: favorite.uuid,
      },
    });
  }
}
