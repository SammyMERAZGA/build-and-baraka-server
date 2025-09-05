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
import { LinkService } from './link.service';
import { CreateLinkDto, UpdateLinkDto, LinkResponseDto } from './dto';

@ApiTags('Liens')
@Controller('links')
@Public()
export class LinkController {
  constructor(private readonly linkService: LinkService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({
    summary: 'Créer un lien',
    description: 'Créer un nouveau lien',
  })
  @ApiResponse({
    status: 201,
    description: 'Lien créé avec succès',
    type: LinkResponseDto,
  })
  @ApiResponse({
    status: 400,
    description: "Données d'entrée invalides",
  })
  @ApiResponse({
    status: 409,
    description: 'Un lien avec cette URL existe déjà',
  })
  async create(@Body() createLinkDto: CreateLinkDto): Promise<LinkResponseDto> {
    return this.linkService.create(createLinkDto);
  }

  @Get()
  @ApiOperation({
    summary: 'Récupérer tous les liens',
    description: 'Récupérer la liste de tous les liens',
  })
  @ApiResponse({
    status: 200,
    description: 'Liste des liens récupérée avec succès',
    type: [LinkResponseDto],
  })
  async findAll(): Promise<LinkResponseDto[]> {
    return this.linkService.findAll();
  }

  @Get(':uuid')
  @ApiOperation({
    summary: 'Récupérer un lien',
    description: 'Récupérer un lien par son identifiant',
  })
  @ApiParam({
    name: 'uuid',
    description: 'Identifiant unique du lien',
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  @ApiResponse({
    status: 200,
    description: 'Lien récupéré avec succès',
    type: LinkResponseDto,
  })
  @ApiResponse({
    status: 404,
    description: 'Lien non trouvé',
  })
  async findOne(@Param('uuid') uuid: string): Promise<LinkResponseDto> {
    return this.linkService.findOne(uuid);
  }

  @Patch(':uuid')
  @ApiOperation({
    summary: 'Modifier un lien',
    description: 'Modifier un lien existant',
  })
  @ApiParam({
    name: 'uuid',
    description: 'Identifiant unique du lien',
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  @ApiResponse({
    status: 200,
    description: 'Lien modifié avec succès',
    type: LinkResponseDto,
  })
  @ApiResponse({
    status: 400,
    description: "Données d'entrée invalides",
  })
  @ApiResponse({
    status: 404,
    description: 'Lien non trouvé',
  })
  @ApiResponse({
    status: 409,
    description: 'Un lien avec cette URL existe déjà',
  })
  async update(
    @Param('uuid') uuid: string,
    @Body() updateLinkDto: UpdateLinkDto,
  ): Promise<LinkResponseDto> {
    return this.linkService.update(uuid, updateLinkDto);
  }

  @Delete(':uuid')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({
    summary: 'Supprimer un lien',
    description: 'Supprimer un lien existant',
  })
  @ApiParam({
    name: 'uuid',
    description: 'Identifiant unique du lien',
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  @ApiResponse({
    status: 204,
    description: 'Lien supprimé avec succès',
  })
  @ApiResponse({
    status: 404,
    description: 'Lien non trouvé',
  })
  async remove(@Param('uuid') uuid: string): Promise<void> {
    return this.linkService.remove(uuid);
  }
}
