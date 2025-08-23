import { ApiProperty } from '@nestjs/swagger';
import { Exclude, Expose, Type } from 'class-transformer';
import { FeedbackType } from '../enums';

class UserInfoDto {
  @ApiProperty({
    description: "Identifiant unique de l'utilisateur",
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  @Expose()
  uuid: string;

  @ApiProperty({
    description: "Adresse email de l'utilisateur",
    example: 'user@example.com',
  })
  @Expose()
  email: string;

  @ApiProperty({
    description: "Statut d'abonnement à la newsletter",
    example: true,
  })
  @Expose()
  newsletterSubscribed: boolean;

  @ApiProperty({
    description: 'Date de création du compte utilisateur',
    example: '2024-01-15T10:30:00.000Z',
  })
  @Expose()
  createdAt: Date;

  @ApiProperty({
    description: 'Date de dernière mise à jour du compte',
    example: '2024-01-15T10:30:00.000Z',
  })
  @Expose()
  updatedAt: Date;

  // Exclude sensitive fields
  @Exclude()
  password: string;

  @Exclude()
  passwordResetToken: string;

  @Exclude()
  isResettingPassword: boolean;

  constructor(partial: Partial<UserInfoDto>) {
    Object.assign(this, partial);
  }
}

export class FeedbackResponseDto {
  @ApiProperty({
    description: 'Identifiant unique du retour utilisateur',
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  uuid: string;

  @ApiProperty({
    description: 'Type de retour utilisateur',
    example: 'bug_report',
    enum: FeedbackType,
  })
  type: FeedbackType;

  @ApiProperty({
    description: 'Commentaire du retour utilisateur',
    example:
      "L'application plante quand j'essaie d'ouvrir la section des duas.",
  })
  comment: string;

  @ApiProperty({
    description: 'Date de création du retour',
    example: '2024-01-15T10:30:00.000Z',
  })
  createdAt: Date;

  @ApiProperty({
    description: 'Utilisateur qui a créé le retour',
    type: UserInfoDto,
  })
  @Type(() => UserInfoDto)
  user: UserInfoDto;

  constructor(feedback: any) {
    this.uuid = feedback.uuid;
    this.type = feedback.type;
    this.comment = feedback.comment;
    this.createdAt = feedback.createdAt;
    this.user = new UserInfoDto(feedback.user);
  }
}
