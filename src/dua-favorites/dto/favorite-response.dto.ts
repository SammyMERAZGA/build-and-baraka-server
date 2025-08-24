import { ApiProperty } from '@nestjs/swagger';

class DuaInfoDto {
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
    description: 'Image du dua',
    example: 'https://example.com/image.jpg',
    nullable: true,
  })
  image: string | null;

  @ApiProperty({
    description: 'Couleur du dua',
    example: '#3B82F6',
    nullable: true,
  })
  color: string | null;

  constructor(dua: any) {
    this.uuid = dua.uuid;
    this.title = dua.title;
    this.arabic = dua.arabic;
    this.transliteration = dua.transliteration;
    this.translation = dua.translation;
    this.image = dua.image;
    this.color = dua.color;
  }
}

export class FavoriteResponseDto {
  @ApiProperty({
    description: 'Identifiant unique du favori',
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  uuid: string;

  @ApiProperty({
    description: "Date d'ajout aux favoris",
    example: '2024-01-15T10:30:00.000Z',
  })
  createdAt: Date;

  @ApiProperty({
    description: 'Informations du dua favori',
    type: DuaInfoDto,
  })
  dua: DuaInfoDto;

  constructor(favorite: any) {
    this.uuid = favorite.uuid;
    this.createdAt = favorite.createdAt;
    this.dua = new DuaInfoDto(favorite.dua);
  }
}
