import {
  Injectable,
  NotFoundException,
  ConflictException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import {
  CreateLinkDto,
  UpdateLinkDto,
  LinkResponseDto,
} from './dto';

@Injectable()
export class LinkService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createLinkDto: CreateLinkDto): Promise<LinkResponseDto> {
    const existingLink = await this.prisma.link.findFirst({
      where: {
        url: createLinkDto.url,
      },
    });

    if (existingLink) {
      throw new ConflictException('Un lien avec cette URL existe déjà');
    }

    const link = await this.prisma.link.create({
      data: createLinkDto,
    });

    return new LinkResponseDto(link);
  }

  async findAll(): Promise<LinkResponseDto[]> {
    const links = await this.prisma.link.findMany({
      orderBy: {
        createdAt: 'desc',
      },
    });

    return links.map((link) => new LinkResponseDto(link));
  }

  async findOne(uuid: string): Promise<LinkResponseDto> {
    const link = await this.prisma.link.findUnique({
      where: { uuid },
    });

    if (!link) {
      throw new NotFoundException('Lien non trouvé');
    }

    return new LinkResponseDto(link);
  }

  async update(
    uuid: string,
    updateLinkDto: UpdateLinkDto,
  ): Promise<LinkResponseDto> {
    const existingLink = await this.prisma.link.findUnique({
      where: { uuid },
    });

    if (!existingLink) {
      throw new NotFoundException('Lien non trouvé');
    }

    if (
      updateLinkDto.url &&
      updateLinkDto.url !== existingLink.url
    ) {
      const duplicateLink = await this.prisma.link.findFirst({
        where: {
          url: updateLinkDto.url,
          uuid: {
            not: uuid,
          },
        },
      });

      if (duplicateLink) {
        throw new ConflictException('Un lien avec cette URL existe déjà');
      }
    }

    const updatedLink = await this.prisma.link.update({
      where: { uuid },
      data: updateLinkDto,
    });

    return new LinkResponseDto(updatedLink);
  }

  async remove(uuid: string): Promise<void> {
    const link = await this.prisma.link.findUnique({
      where: { uuid },
    });

    if (!link) {
      throw new NotFoundException('Lien non trouvé');
    }

    await this.prisma.link.delete({
      where: { uuid },
    });
  }
}