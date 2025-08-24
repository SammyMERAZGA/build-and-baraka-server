import {
  Injectable,
  NotFoundException,
  ConflictException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import {
  CreateRecipeCategoryDto,
  UpdateRecipeCategoryDto,
  RecipeCategoryResponseDto,
} from './dto';

@Injectable()
export class RecipeCategoryService {
  constructor(private readonly prisma: PrismaService) {}

  async create(
    createRecipeCategoryDto: CreateRecipeCategoryDto,
  ): Promise<RecipeCategoryResponseDto> {
    // Vérifier si une catégorie avec ce nom existe déjà
    const existingCategory = await this.prisma.recipeCategory.findFirst({
      where: {
        name: {
          equals: createRecipeCategoryDto.name,
          mode: 'insensitive',
        },
      },
    });

    if (existingCategory) {
      throw new ConflictException('Une catégorie avec ce nom existe déjà');
    }

    const recipeCategory = await this.prisma.recipeCategory.create({
      data: createRecipeCategoryDto,
    });

    return new RecipeCategoryResponseDto(recipeCategory);
  }

  async findAll(): Promise<RecipeCategoryResponseDto[]> {
    const recipeCategories = await this.prisma.recipeCategory.findMany({
      orderBy: {
        createdAt: 'desc',
      },
    });

    return recipeCategories.map(
      (category) => new RecipeCategoryResponseDto(category),
    );
  }

  async findOne(uuid: string): Promise<RecipeCategoryResponseDto> {
    const recipeCategory = await this.prisma.recipeCategory.findUnique({
      where: { uuid },
    });

    if (!recipeCategory) {
      throw new NotFoundException('Catégorie de recettes non trouvée');
    }

    return new RecipeCategoryResponseDto(recipeCategory);
  }

  async update(
    uuid: string,
    updateRecipeCategoryDto: UpdateRecipeCategoryDto,
  ): Promise<RecipeCategoryResponseDto> {
    // Vérifier si la catégorie existe
    const existingCategory = await this.prisma.recipeCategory.findUnique({
      where: { uuid },
    });

    if (!existingCategory) {
      throw new NotFoundException('Catégorie de recettes non trouvée');
    }

    // Si le nom est modifié, vérifier qu'il n'existe pas déjà
    if (
      updateRecipeCategoryDto.name &&
      updateRecipeCategoryDto.name !== existingCategory.name
    ) {
      const duplicateCategory = await this.prisma.recipeCategory.findFirst({
        where: {
          name: {
            equals: updateRecipeCategoryDto.name,
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

    const updatedCategory = await this.prisma.recipeCategory.update({
      where: { uuid },
      data: updateRecipeCategoryDto,
    });

    return new RecipeCategoryResponseDto(updatedCategory);
  }

  async remove(uuid: string): Promise<void> {
    const recipeCategory = await this.prisma.recipeCategory.findUnique({
      where: { uuid },
    });

    if (!recipeCategory) {
      throw new NotFoundException('Catégorie de recettes non trouvée');
    }

    await this.prisma.recipeCategory.delete({
      where: { uuid },
    });
  }
}
