import {
  Controller,
  Get,
  Post,
  Body,
  UseGuards,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBearerAuth,
  ApiBody,
} from '@nestjs/swagger';
import { FeedbackService } from './feedback.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { CurrentUser } from '../auth/decorators/current-user.decorator';
import { CreateFeedbackDto } from './dto/create-feedback.dto';
import { FeedbackResponseDto } from './dto/feedback-response.dto';

@ApiTags('Retours utilisateurs')
@Controller('feedback')
@UseGuards(JwtAuthGuard)
export class FeedbackController {
  constructor(private readonly feedbackService: FeedbackService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiBearerAuth()
  @ApiOperation({
    summary: 'Créer un retour utilisateur',
    description: "Créer un nouveau retour utilisateur pour l'application",
  })
  @ApiBody({ type: CreateFeedbackDto })
  @ApiResponse({
    status: 201,
    description: 'Retour utilisateur créé avec succès',
    type: FeedbackResponseDto,
  })
  @ApiResponse({
    status: 400,
    description: "Données d'entrée invalides",
  })
  @ApiResponse({
    status: 401,
    description: 'Non autorisé - Token JWT invalide ou manquant',
  })
  @ApiResponse({
    status: 404,
    description: 'Utilisateur non trouvé',
  })
  async create(
    @CurrentUser() user: any,
    @Body() createFeedbackDto: CreateFeedbackDto,
  ): Promise<FeedbackResponseDto> {
    return this.feedbackService.create(user.uuid, createFeedbackDto);
  }

  @Get()
  @ApiBearerAuth()
  @ApiOperation({
    summary: 'Récupérer tous les retours utilisateurs',
    description:
      'Récupérer tous les retours utilisateurs avec les informations utilisateur (accès admin)',
  })
  @ApiResponse({
    status: 200,
    description: 'Liste des retours utilisateurs récupérée avec succès',
    type: [FeedbackResponseDto],
  })
  @ApiResponse({
    status: 401,
    description: 'Non autorisé - Token JWT invalide ou manquant',
  })
  async findAll(): Promise<FeedbackResponseDto[]> {
    return this.feedbackService.findAll();
  }
}
