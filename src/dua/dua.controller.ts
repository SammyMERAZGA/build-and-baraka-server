import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiParam } from '@nestjs/swagger';
import { Public } from '../auth/decorators/public.decorator';
import { DuaService } from './dua.service';
import { CreateDuaDto, UpdateDuaDto, DuaResponseDto } from './dto';

@ApiTags('Duas')
@Controller('duas')
@Public()
export class DuaController {
  constructor(private readonly duaService: DuaService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({
    summary: 'Créer un dua',
    description: 'Créer un nouveau dua',
  })
  @ApiResponse({
    status: 201,
    description: 'Dua créé avec succès',
    type: DuaResponseDto,
  })
  @ApiResponse({
    status: 400,
    description: "Données d'entrée invalides",
  })
  @ApiResponse({
    status: 404,
    description: 'Catégorie de dua non trouvée',
  })
  @ApiResponse({
    status: 409,
    description: 'Un dua avec ce titre existe déjà dans cette catégorie',
  })
  async create(@Body() createDuaDto: CreateDuaDto): Promise<DuaResponseDto> {
    return this.duaService.create(createDuaDto);
  }

  @Get()
  @ApiOperation({
    summary: 'Récupérer tous les duas',
    description: 'Récupérer la liste de tous les duas avec leurs catégories',
  })
  @ApiResponse({
    status: 200,
    description: 'Liste des duas récupérée avec succès',
    type: [DuaResponseDto],
  })
  async findAll(): Promise<DuaResponseDto[]> {
    return this.duaService.findAll();
  }

  @Get('category/:categoryUuid')
  @ApiOperation({
    summary: 'Récupérer les duas par catégorie',
    description:
      'Récupérer tous les duas appartenant à une catégorie spécifique',
  })
  @ApiParam({
    name: 'categoryUuid',
    description: 'Identifiant unique de la catégorie',
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  @ApiResponse({
    status: 200,
    description: 'Liste des duas de la catégorie récupérée avec succès',
    type: [DuaResponseDto],
  })
  @ApiResponse({
    status: 404,
    description: 'Catégorie non trouvée',
  })
  async findByCategory(
    @Param('categoryUuid') categoryUuid: string,
  ): Promise<DuaResponseDto[]> {
    return this.duaService.findByCategory(categoryUuid);
  }

  @Get(':uuid')
  @ApiOperation({
    summary: 'Récupérer un dua',
    description: 'Récupérer un dua par son identifiant',
  })
  @ApiParam({
    name: 'uuid',
    description: 'Identifiant unique du dua',
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  @ApiResponse({
    status: 200,
    description: 'Dua récupéré avec succès',
    type: DuaResponseDto,
  })
  @ApiResponse({
    status: 404,
    description: 'Dua non trouvé',
  })
  async findOne(@Param('uuid') uuid: string): Promise<DuaResponseDto> {
    return this.duaService.findOne(uuid);
  }

  @Patch(':uuid')
  @ApiOperation({
    summary: 'Modifier un dua',
    description: 'Modifier un dua existant',
  })
  @ApiParam({
    name: 'uuid',
    description: 'Identifiant unique du dua',
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  @ApiResponse({
    status: 200,
    description: 'Dua modifié avec succès',
    type: DuaResponseDto,
  })
  @ApiResponse({
    status: 400,
    description: "Données d'entrée invalides",
  })
  @ApiResponse({
    status: 404,
    description: 'Dua ou catégorie non trouvé(e)',
  })
  @ApiResponse({
    status: 409,
    description: 'Un dua avec ce titre existe déjà dans cette catégorie',
  })
  async update(
    @Param('uuid') uuid: string,
    @Body() updateDuaDto: UpdateDuaDto,
  ): Promise<DuaResponseDto> {
    return this.duaService.update(uuid, updateDuaDto);
  }

  @Delete(':uuid')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({
    summary: 'Supprimer un dua',
    description: 'Supprimer un dua existant',
  })
  @ApiParam({
    name: 'uuid',
    description: 'Identifiant unique du dua',
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  @ApiResponse({
    status: 204,
    description: 'Dua supprimé avec succès',
  })
  @ApiResponse({
    status: 404,
    description: 'Dua non trouvé',
  })
  async remove(@Param('uuid') uuid: string): Promise<void> {
    return this.duaService.remove(uuid);
  }
}
