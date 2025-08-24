import { Controller, Post, Body, HttpCode, HttpStatus } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { Public } from '../auth/decorators/public.decorator';
import { ContactService } from './contact.service';
import { CreateContactDto, ContactResponseDto } from './dto';

@ApiTags('Contact')
@Controller('contact')
@Public()
export class ContactController {
  constructor(private readonly contactService: ContactService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({
    summary: 'Créer un contact',
    description: 'Envoyer un message de contact depuis le site vitrine',
  })
  @ApiResponse({
    status: 201,
    description: 'Contact créé avec succès et email de notification envoyé',
    type: ContactResponseDto,
  })
  @ApiResponse({
    status: 400,
    description: "Données d'entrée invalides",
  })
  async create(
    @Body() createContactDto: CreateContactDto,
  ): Promise<ContactResponseDto> {
    return this.contactService.create(createContactDto);
  }
}
