import {
  Injectable,
  NotFoundException,
  ConflictException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { AddFavoriteDto, FavoriteResponseDto } from './dto';

@Injectable()
export class DuaFavoritesService {
  constructor(private readonly prisma: PrismaService) {}

  async addFavorite(
    userUuid: string,
    addFavoriteDto: AddFavoriteDto,
  ): Promise<FavoriteResponseDto> {
    // Vérifier si le dua existe
    const duaExists = await this.prisma.dua.findUnique({
      where: { uuid: addFavoriteDto.duaUuid },
    });

    if (!duaExists) {
      throw new NotFoundException('Dua non trouvé');
    }

    // Vérifier si le dua n'est pas déjà en favori
    const existingFavorite = await this.prisma.duaFavorites.findFirst({
      where: {
        userUuid,
        duaUuid: addFavoriteDto.duaUuid,
      },
    });

    if (existingFavorite) {
      throw new ConflictException('Ce dua est déjà dans vos favoris');
    }

    const favorite = await this.prisma.duaFavorites.create({
      data: {
        userUuid,
        duaUuid: addFavoriteDto.duaUuid,
      },
      include: {
        dua: {
          select: {
            uuid: true,
            title: true,
            arabic: true,
            transliteration: true,
            translation: true,
            image: true,
            color: true,
          },
        },
      },
    });

    return new FavoriteResponseDto(favorite);
  }

  async getUserFavorites(userUuid: string): Promise<FavoriteResponseDto[]> {
    const favorites = await this.prisma.duaFavorites.findMany({
      where: { userUuid },
      include: {
        dua: {
          select: {
            uuid: true,
            title: true,
            arabic: true,
            transliteration: true,
            translation: true,
            image: true,
            color: true,
          },
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
    });

    return favorites.map((favorite) => new FavoriteResponseDto(favorite));
  }

  async removeFavorite(userUuid: string, duaUuid: string): Promise<void> {
    const favorite = await this.prisma.duaFavorites.findFirst({
      where: {
        userUuid,
        duaUuid,
      },
    });

    if (!favorite) {
      throw new NotFoundException("Ce dua n'est pas dans vos favoris");
    }

    await this.prisma.duaFavorites.delete({
      where: {
        uuid: favorite.uuid,
      },
    });
  }

  async isFavorite(userUuid: string, duaUuid: string): Promise<boolean> {
    const favorite = await this.prisma.duaFavorites.findFirst({
      where: {
        userUuid,
        duaUuid,
      },
    });

    return !!favorite;
  }
}
