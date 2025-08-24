import {
  Injectable,
  NotFoundException,
  ConflictException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import {
  CreateDuaCategoryDto,
  UpdateDuaCategoryDto,
  DuaCategoryResponseDto,
} from './dto';

@Injectable()
export class DuaCategoryService {
  constructor(private readonly prisma: PrismaService) {}

  async create(
    createDuaCategoryDto: CreateDuaCategoryDto,
  ): Promise<DuaCategoryResponseDto> {
    // Vérifier si une catégorie avec ce nom existe déjà
    const existingCategory = await this.prisma.duaCategory.findFirst({
      where: {
        name: {
          equals: createDuaCategoryDto.name,
          mode: 'insensitive',
        },
      },
    });

    if (existingCategory) {
      throw new ConflictException('Une catégorie avec ce nom existe déjà');
    }

    const duaCategory = await this.prisma.duaCategory.create({
      data: createDuaCategoryDto,
    });

    return new DuaCategoryResponseDto(duaCategory);
  }

  async findAll(): Promise<DuaCategoryResponseDto[]> {
    const duaCategories = await this.prisma.duaCategory.findMany({
      orderBy: {
        createdAt: 'desc',
      },
    });

    return duaCategories.map(
      (category) => new DuaCategoryResponseDto(category),
    );
  }

  async findOne(uuid: string): Promise<DuaCategoryResponseDto> {
    const duaCategory = await this.prisma.duaCategory.findUnique({
      where: { uuid },
    });

    if (!duaCategory) {
      throw new NotFoundException('Catégorie de duas non trouvée');
    }

    return new DuaCategoryResponseDto(duaCategory);
  }

  async update(
    uuid: string,
    updateDuaCategoryDto: UpdateDuaCategoryDto,
  ): Promise<DuaCategoryResponseDto> {
    // Vérifier si la catégorie existe
    const existingCategory = await this.prisma.duaCategory.findUnique({
      where: { uuid },
    });

    if (!existingCategory) {
      throw new NotFoundException('Catégorie de duas non trouvée');
    }

    // Si le nom est modifié, vérifier qu'il n'existe pas déjà
    if (
      updateDuaCategoryDto.name &&
      updateDuaCategoryDto.name !== existingCategory.name
    ) {
      const duplicateCategory = await this.prisma.duaCategory.findFirst({
        where: {
          name: {
            equals: updateDuaCategoryDto.name,
            mode: 'insensitive',
          },
          uuid: {
            not: uuid,
          },
        },
      });

      if (duplicateCategory) {
        throw new ConflictException('Une catégorie avec ce nom existe déjà');
      }
    }

    const updatedCategory = await this.prisma.duaCategory.update({
      where: { uuid },
      data: updateDuaCategoryDto,
    });

    return new DuaCategoryResponseDto(updatedCategory);
  }

  async remove(uuid: string): Promise<void> {
    const duaCategory = await this.prisma.duaCategory.findUnique({
      where: { uuid },
    });

    if (!duaCategory) {
      throw new NotFoundException('Catégorie de duas non trouvée');
    }

    await this.prisma.duaCategory.delete({
      where: { uuid },
    });
  }
}
