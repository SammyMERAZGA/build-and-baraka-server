import { ApiProperty } from '@nestjs/swagger';

export class DuaCategoryResponseDto {
  @ApiProperty({
    description: 'Identifiant unique de la catégorie',
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  uuid: string;

  @ApiProperty({
    description: 'Nom de la catégorie de duas',
    example: 'Duas du matin',
  })
  name: string;

  @ApiProperty({
    description: 'Couleur de la catégorie',
    example: '#3B82F6',
    nullable: true,
  })
  color: string | null;

  @ApiProperty({
    description: 'Date de création de la catégorie',
    example: '2024-01-15T10:30:00.000Z',
  })
  createdAt: Date;

  @ApiProperty({
    description: 'Date de dernière mise à jour',
    example: '2024-01-15T10:30:00.000Z',
  })
  updatedAt: Date;

  constructor(duaCategory: any) {
    this.uuid = duaCategory.uuid;
    this.name = duaCategory.name;
    this.color = duaCategory.color;
    this.createdAt = duaCategory.createdAt;
    this.updatedAt = duaCategory.updatedAt;
  }
}
