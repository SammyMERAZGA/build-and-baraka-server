import { ApiProperty } from '@nestjs/swagger';

class DuaCategoryInfoDto {
  @ApiProperty({
    description: 'Identifiant unique de la catégorie',
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  uuid: string;

  @ApiProperty({
    description: 'Nom de la catégorie',
    example: 'Duas du matin',
  })
  name: string;

  @ApiProperty({
    description: 'Couleur de la catégorie',
    example: '#3B82F6',
    nullable: true,
  })
  color: string | null;

  constructor(category: any) {
    this.uuid = category.uuid;
    this.name = category.name;
    this.color = category.color;
  }
}

export class DuaResponseDto {
  @ApiProperty({
    description: 'Identifiant unique du dua',
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  uuid: string;

  @ApiProperty({
    description: 'Titre du dua',
    example: 'Dua du matin',
  })
  title: string;

  @ApiProperty({
    description: 'Image du dua',
    example: 'https://example.com/image.jpg',
    nullable: true,
  })
  image: string | null;

  @ApiProperty({
    description: 'Texte arabe du dua',
    example: 'اللَّهُمَّ بِكَ أَصْبَحْنَا',
  })
  arabic: string;

  @ApiProperty({
    description: 'Translittération du dua',
    example: 'Allahumma bika asbahna',
  })
  transliteration: string;

  @ApiProperty({
    description: 'Traduction du dua',
    example: 'Ô Allah, par Toi nous entrons dans le matin',
  })
  translation: string;

  @ApiProperty({
    description: 'Référence du dua',
    example: 'Sahih Muslim 2723',
  })
  reference: string;

  @ApiProperty({
    description: 'Couleur du dua',
    example: '#3B82F6',
    nullable: true,
  })
  color: string | null;

  @ApiProperty({
    description: 'Date de création du dua',
    example: '2024-01-15T10:30:00.000Z',
  })
  createdAt: Date;

  @ApiProperty({
    description: 'Date de dernière mise à jour',
    example: '2024-01-15T10:30:00.000Z',
  })
  updatedAt: Date;

  @ApiProperty({
    description: 'Catégorie du dua',
    type: DuaCategoryInfoDto,
  })
  duaCategory: DuaCategoryInfoDto;

  constructor(dua: any) {
    this.uuid = dua.uuid;
    this.title = dua.title;
    this.image = dua.image;
    this.arabic = dua.arabic;
    this.transliteration = dua.transliteration;
    this.translation = dua.translation;
    this.reference = dua.reference;
    this.color = dua.color;
    this.createdAt = dua.createdAt;
    this.updatedAt = dua.updatedAt;
    this.duaCategory = new DuaCategoryInfoDto(dua.duaCategory);
  }
}
