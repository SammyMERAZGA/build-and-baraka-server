import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, MaxLength, IsEnum } from 'class-validator';
import { FeedbackType } from '../enums';

export class CreateFeedbackDto {
  @ApiProperty({
    description: 'Type de retour utilisateur',
    example: 'bug_report',
    enum: FeedbackType,
  })
  @IsEnum(FeedbackType, {
    message:
      'Le type doit être : general_feedback, suggestion, bug_report, improvement, partnership_request, content_suggestion ou other',
  })
  type: FeedbackType;

  @ApiProperty({
    description: 'Commentaire ou description du retour',
    example:
      "L'application plante quand j'essaie d'ouvrir la section des duas.",
    maxLength: 1000,
  })
  @IsString({ message: 'Le commentaire doit être une chaîne de caractères' })
  @IsNotEmpty({ message: 'Le commentaire est obligatoire' })
  @MaxLength(1000, {
    message: 'Le commentaire ne doit pas dépasser 1000 caractères',
  })
  comment: string;
}
