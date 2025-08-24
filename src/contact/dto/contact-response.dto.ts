import { ApiProperty } from '@nestjs/swagger';
import { ContactSubject } from '../enums';

export class ContactResponseDto {
  @ApiProperty({
    description: 'Identifiant unique du contact',
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  uuid: string;

  @ApiProperty({
    description: 'Adresse email du contact',
    example: 'john.doe@example.com',
  })
  email: string;

  @ApiProperty({
    description: 'Motif de la prise de contact',
    enum: ContactSubject,
    example: ContactSubject.GENERAL_FEEDBACK,
  })
  subject: ContactSubject;

  @ApiProperty({
    description: 'Message de contact',
    example: "Bonjour, j'aimerais en savoir plus sur les fonctionnalités...",
  })
  message: string;

  @ApiProperty({
    description: 'Date de création du contact',
    example: '2024-01-15T10:30:00.000Z',
  })
  createdAt: Date;

  constructor(contact: any) {
    this.uuid = contact.uuid;
    this.email = contact.email;
    this.subject = contact.subject;
    this.message = contact.message;
    this.createdAt = contact.createdAt;
  }
}
