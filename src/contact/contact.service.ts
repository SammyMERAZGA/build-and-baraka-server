import { Injectable, Logger } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { MailService } from '../mail/mail.service';
import { CreateContactDto, ContactResponseDto } from './dto';

@Injectable()
export class ContactService {
  private readonly logger = new Logger(ContactService.name);

  constructor(
    private readonly prisma: PrismaService,
    private readonly mailService: MailService,
  ) {}

  async create(
    createContactDto: CreateContactDto,
  ): Promise<ContactResponseDto> {
    // Sauvegarder le contact en base
    const contact = await this.prisma.contact.create({
      data: createContactDto,
    });

    // Envoyer l'email de notification
    try {
      await this.mailService.sendContactNotificationEmail(
        createContactDto.email,
        createContactDto.subject,
        createContactDto.message,
      );
      this.logger.log(
        `Contact notification email sent for ${createContactDto.email}`,
      );
    } catch (error) {
      this.logger.error('Failed to send contact notification email', error);
      // Ne pas faire échouer la création du contact si l'email échoue
    }

    return new ContactResponseDto(contact);
  }
}
