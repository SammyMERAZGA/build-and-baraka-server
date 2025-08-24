import {
  Injectable,
  NotFoundException,
  ConflictException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateDuaDto, UpdateDuaDto, DuaResponseDto } from './dto';

@Injectable()
export class DuaService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createDuaDto: CreateDuaDto): Promise<DuaResponseDto> {
    // Vérifier si la catégorie existe
    const categoryExists = await this.prisma.duaCategory.findUnique({
      where: { uuid: createDuaDto.duaCategoryUuid },
    });

    if (!categoryExists) {
      throw new NotFoundException('Catégorie de dua non trouvée');
    }

    // Vérifier si un dua avec ce titre existe déjà dans cette catégorie
    const existingDua = await this.prisma.dua.findFirst({
      where: {
        title: {
          equals: createDuaDto.title,
          mode: 'insensitive',
        },
        duaCategoryUuid: createDuaDto.duaCategoryUuid,
      },
    });

    if (existingDua) {
      throw new ConflictException(
        'Un dua avec ce titre existe déjà dans cette catégorie',
      );
    }

    const dua = await this.prisma.dua.create({
      data: createDuaDto,
      include: {
        duaCategory: true,
      },
    });

    return new DuaResponseDto(dua);
  }

  async findAll(): Promise<DuaResponseDto[]> {
    const duas = await this.prisma.dua.findMany({
      include: {
        duaCategory: true,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });

    return duas.map((dua) => new DuaResponseDto(dua));
  }

  async findByCategory(categoryUuid: string): Promise<DuaResponseDto[]> {
    // Vérifier si la catégorie existe
    const categoryExists = await this.prisma.duaCategory.findUnique({
      where: { uuid: categoryUuid },
    });

    if (!categoryExists) {
      throw new NotFoundException('Catégorie de dua non trouvée');
    }

    const duas = await this.prisma.dua.findMany({
      where: {
        duaCategoryUuid: categoryUuid,
      },
      include: {
        duaCategory: true,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });

    return duas.map((dua) => new DuaResponseDto(dua));
  }

  async findOne(uuid: string): Promise<DuaResponseDto> {
    const dua = await this.prisma.dua.findUnique({
      where: { uuid },
      include: {
        duaCategory: true,
      },
    });

    if (!dua) {
      throw new NotFoundException('Dua non trouvé');
    }

    return new DuaResponseDto(dua);
  }

  async update(
    uuid: string,
    updateDuaDto: UpdateDuaDto,
  ): Promise<DuaResponseDto> {
    // Vérifier si le dua existe
    const existingDua = await this.prisma.dua.findUnique({
      where: { uuid },
    });

    if (!existingDua) {
      throw new NotFoundException('Dua non trouvé');
    }

    // Si la catégorie est modifiée, vérifier qu'elle existe
    if (
      updateDuaDto.duaCategoryUuid &&
      updateDuaDto.duaCategoryUuid !== existingDua.duaCategoryUuid
    ) {
      const categoryExists = await this.prisma.duaCategory.findUnique({
        where: { uuid: updateDuaDto.duaCategoryUuid },
      });

      if (!categoryExists) {
        throw new NotFoundException('Catégorie de dua non trouvée');
      }
    }

    // Si le titre est modifié, vérifier qu'il n'existe pas déjà dans la catégorie
    if (updateDuaDto.title && updateDuaDto.title !== existingDua.title) {
      const categoryUuid =
        updateDuaDto.duaCategoryUuid || existingDua.duaCategoryUuid;

      const duplicateDua = await this.prisma.dua.findFirst({
        where: {
          title: {
            equals: updateDuaDto.title,
            mode: 'insensitive',
          },
          duaCategoryUuid: categoryUuid,
          uuid: {
            not: uuid,
          },
        },
      });

      if (duplicateDua) {
        throw new ConflictException(
          'Un dua avec ce titre existe déjà dans cette catégorie',
        );
      }
    }

    const updatedDua = await this.prisma.dua.update({
      where: { uuid },
      data: updateDuaDto,
      include: {
        duaCategory: true,
      },
    });

    return new DuaResponseDto(updatedDua);
  }

  async remove(uuid: string): Promise<void> {
    const dua = await this.prisma.dua.findUnique({
      where: { uuid },
    });

    if (!dua) {
      throw new NotFoundException('Dua non trouvé');
    }

    await this.prisma.dua.delete({
      where: { uuid },
    });
  }
}
