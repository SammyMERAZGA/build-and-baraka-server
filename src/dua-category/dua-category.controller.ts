import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBearerAuth,
  ApiParam,
} from '@nestjs/swagger';
import { DuaCategoryService } from './dua-category.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import {
  CreateDuaCategoryDto,
  UpdateDuaCategoryDto,
  DuaCategoryResponseDto,
} from './dto';

@ApiTags('Catégories de Duas')
@Controller('dua-categories')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
export class DuaCategoryController {
  constructor(private readonly duaCategoryService: DuaCategoryService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({
    summary: 'Créer une catégorie de duas',
    description: 'Créer une nouvelle catégorie de duas',
  })
  @ApiResponse({
    status: 201,
    description: 'Catégorie créée avec succès',
    type: DuaCategoryResponseDto,
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
    status: 409,
    description: 'Une catégorie avec ce nom existe déjà',
  })
  async create(
    @Body() createDuaCategoryDto: CreateDuaCategoryDto,
  ): Promise<DuaCategoryResponseDto> {
    return this.duaCategoryService.create(createDuaCategoryDto);
  }

  @Get()
  @ApiOperation({
    summary: 'Récupérer toutes les catégories de duas',
    description: 'Récupérer la liste de toutes les catégories de duas',
  })
  @ApiResponse({
    status: 200,
    description: 'Liste des catégories récupérée avec succès',
    type: [DuaCategoryResponseDto],
  })
  @ApiResponse({
    status: 401,
    description: 'Non autorisé - Token JWT invalide ou manquant',
  })
  async findAll(): Promise<DuaCategoryResponseDto[]> {
    return this.duaCategoryService.findAll();
  }

  @Get(':uuid')
  @ApiOperation({
    summary: 'Récupérer une catégorie de duas',
    description: 'Récupérer une catégorie de duas par son identifiant',
  })
  @ApiParam({
    name: 'uuid',
    description: 'Identifiant unique de la catégorie',
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  @ApiResponse({
    status: 200,
    description: 'Catégorie récupérée avec succès',
    type: DuaCategoryResponseDto,
  })
  @ApiResponse({
    status: 401,
    description: 'Non autorisé - Token JWT invalide ou manquant',
  })
  @ApiResponse({
    status: 404,
    description: 'Catégorie non trouvée',
  })
  async findOne(@Param('uuid') uuid: string): Promise<DuaCategoryResponseDto> {
    return this.duaCategoryService.findOne(uuid);
  }

  @Patch(':uuid')
  @ApiOperation({
    summary: 'Modifier une catégorie de duas',
    description: 'Modifier une catégorie de duas existante',
  })
  @ApiParam({
    name: 'uuid',
    description: 'Identifiant unique de la catégorie',
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  @ApiResponse({
    status: 200,
    description: 'Catégorie modifiée avec succès',
    type: DuaCategoryResponseDto,
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
    description: 'Catégorie non trouvée',
  })
  @ApiResponse({
    status: 409,
    description: 'Une catégorie avec ce nom existe déjà',
  })
  async update(
    @Param('uuid') uuid: string,
    @Body() updateDuaCategoryDto: UpdateDuaCategoryDto,
  ): Promise<DuaCategoryResponseDto> {
    return this.duaCategoryService.update(uuid, updateDuaCategoryDto);
  }

  @Delete(':uuid')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({
    summary: 'Supprimer une catégorie de duas',
    description: 'Supprimer une catégorie de duas existante',
  })
  @ApiParam({
    name: 'uuid',
    description: 'Identifiant unique de la catégorie',
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  @ApiResponse({
    status: 204,
    description: 'Catégorie supprimée avec succès',
  })
  @ApiResponse({
    status: 401,
    description: 'Non autorisé - Token JWT invalide ou manquant',
  })
  @ApiResponse({
    status: 404,
    description: 'Catégorie non trouvée',
  })
  async remove(@Param('uuid') uuid: string): Promise<void> {
    return this.duaCategoryService.remove(uuid);
  }
}
