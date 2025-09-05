import { ApiProperty } from '@nestjs/swagger';
import { Link } from '@prisma/client';

export class LinkResponseDto {
  @ApiProperty({
    description: 'Identifiant unique du lien',
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  uuid: string;

  @ApiProperty({
    description: 'URL du lien',
    example: 'https://example.com',
  })
  url: string;

  @ApiProperty({
    description: 'Nom du lien',
    example: 'Mon site web',
  })
  name: string;

  @ApiProperty({
    description: 'Description du lien',
    example: 'Description de mon site web',
    nullable: true,
  })
  description: string | null;

  @ApiProperty({
    description: 'Date de création',
    example: '2023-01-01T00:00:00.000Z',
  })
  createdAt: Date;

  @ApiProperty({
    description: 'Date de dernière modification',
    example: '2023-01-01T00:00:00.000Z',
  })
  updatedAt: Date;

  constructor(link: Link) {
    this.uuid = link.uuid;
    this.url = link.url;
    this.name = link.name;
    this.description = link.description;
    this.createdAt = link.createdAt;
    this.updatedAt = link.updatedAt;
  }
}