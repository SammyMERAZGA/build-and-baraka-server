import {
  Injectable,
  NotFoundException,
  ConflictException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateRecipeDto, UpdateRecipeDto, RecipeResponseDto } from './dto';

@Injectable()
export class RecipeService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createRecipeDto: CreateRecipeDto): Promise<RecipeResponseDto> {
    // Vérifier si la catégorie existe
    const categoryExists = await this.prisma.recipeCategory.findUnique({
      where: { uuid: createRecipeDto.recipeCategoryUuid },
    });

    if (!categoryExists) {
      throw new NotFoundException('Catégorie de recette non trouvée');
    }

    // Vérifier si une recette avec ce nom existe déjà dans cette catégorie
    const existingRecipe = await this.prisma.recipe.findFirst({
      where: {
        name: {
          equals: createRecipeDto.name,
          mode: 'insensitive',
        },
        recipeCategoryUuid: createRecipeDto.recipeCategoryUuid,
      },
    });

    if (existingRecipe) {
      throw new ConflictException(
        'Une recette avec ce nom existe déjà dans cette catégorie',
      );
    }

    const recipe = await this.prisma.recipe.create({
      data: createRecipeDto,
      include: {
        recipeCategory: true,
      },
    });

    return new RecipeResponseDto(recipe);
  }

  async findAll(): Promise<RecipeResponseDto[]> {
    const recipes = await this.prisma.recipe.findMany({
      include: {
        recipeCategory: true,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });

    return recipes.map((recipe) => new RecipeResponseDto(recipe));
  }

  async findByCategory(categoryUuid: string): Promise<RecipeResponseDto[]> {
    // Vérifier si la catégorie existe
    const categoryExists = await this.prisma.recipeCategory.findUnique({
      where: { uuid: categoryUuid },
    });

    if (!categoryExists) {
      throw new NotFoundException('Catégorie de recette non trouvée');
    }

    const recipes = await this.prisma.recipe.findMany({
      where: {
        recipeCategoryUuid: categoryUuid,
      },
      include: {
        recipeCategory: true,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });

    return recipes.map((recipe) => new RecipeResponseDto(recipe));
  }

  async findOne(uuid: string): Promise<RecipeResponseDto> {
    const recipe = await this.prisma.recipe.findUnique({
      where: { uuid },
      include: {
        recipeCategory: true,
      },
    });

    if (!recipe) {
      throw new NotFoundException('Recette non trouvée');
    }

    return new RecipeResponseDto(recipe);
  }

  async update(
    uuid: string,
    updateRecipeDto: UpdateRecipeDto,
  ): Promise<RecipeResponseDto> {
    // Vérifier si la recette existe
    const existingRecipe = await this.prisma.recipe.findUnique({
      where: { uuid },
    });

    if (!existingRecipe) {
      throw new NotFoundException('Recette non trouvée');
    }

    // Si la catégorie est modifiée, vérifier qu'elle existe
    if (
      updateRecipeDto.recipeCategoryUuid &&
      updateRecipeDto.recipeCategoryUuid !== existingRecipe.recipeCategoryUuid
    ) {
      const categoryExists = await this.prisma.recipeCategory.findUnique({
        where: { uuid: updateRecipeDto.recipeCategoryUuid },
      });

      if (!categoryExists) {
        throw new NotFoundException('Catégorie de recette non trouvée');
      }
    }

    // Si le nom est modifié, vérifier qu'il n'existe pas déjà dans la catégorie
    if (updateRecipeDto.name && updateRecipeDto.name !== existingRecipe.name) {
      const categoryUuid =
        updateRecipeDto.recipeCategoryUuid || existingRecipe.recipeCategoryUuid;

      const duplicateRecipe = await this.prisma.recipe.findFirst({
        where: {
          name: {
            equals: updateRecipeDto.name,
            mode: 'insensitive',
          },
          recipeCategoryUuid: categoryUuid,
          uuid: {
            not: uuid,
          },
        },
      });

      if (duplicateRecipe) {
        throw new ConflictException(
          'Une recette avec ce nom existe déjà dans cette catégorie',
        );
      }
    }

    const updatedRecipe = await this.prisma.recipe.update({
      where: { uuid },
      data: updateRecipeDto,
      include: {
        recipeCategory: true,
      },
    });

    return new RecipeResponseDto(updatedRecipe);
  }

  async remove(uuid: string): Promise<void> {
    const recipe = await this.prisma.recipe.findUnique({
      where: { uuid },
    });

    if (!recipe) {
      throw new NotFoundException('Recette non trouvée');
    }

    await this.prisma.recipe.delete({
      where: { uuid },
    });
  }
}
