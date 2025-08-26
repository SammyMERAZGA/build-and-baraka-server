import { Injectable, BadRequestException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { MailService } from '../mail/mail.service';
import { CreateEbookDownloadDto } from './dto/create-ebook-download.dto';

@Injectable()
export class EbookDownloadService {
  constructor(
    private prisma: PrismaService,
    private mailService: MailService,
  ) {}

  async requestEbookDownload(createEbookDownloadDto: CreateEbookDownloadDto) {
    const { email } = createEbookDownloadDto;

    // Vérifier que ce n'est pas un email temporaire/jetable
    this.validateEmailDomain(email);

    try {
      // Créer ou mettre à jour l'entrée
      await this.prisma.ebookDownload.upsert({
        where: { email },
        update: { updatedAt: new Date() },
        create: { email },
      });

      // Envoyer l'email avec le lien de téléchargement
      await this.mailService.sendEbookDownloadEmail(email);

      return {
        message:
          'Email envoyé avec succès ! Vérifiez votre boîte de réception.',
        success: true,
      };
    } catch {
      throw new BadRequestException(
        "Une erreur est survenue lors de l'envoi de l'email",
      );
    }
  }

  private validateEmailDomain(email: string) {
    const blockedDomains = [
      'yopmail.com',
      '10minutemail.com',
      'tempmail.org',
      'guerrillamail.com',
      'mailinator.com',
      'throwaway.email',
      'temp-mail.org',
      'getnada.com',
      'maildrop.cc',
      'sharklasers.com',
    ];

    const domain = email.split('@')[1]?.toLowerCase();

    if (blockedDomains.includes(domain)) {
      throw new BadRequestException(
        'Les adresses email temporaires ne sont pas autorisées',
      );
    }
  }

  async getDownloadStats() {
    const totalDownloads = await this.prisma.ebookDownload.count();
    const recentDownloads = await this.prisma.ebookDownload.count({
      where: {
        createdAt: {
          gte: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000), // 30 derniers jours
        },
      },
    });

    return {
      totalDownloads,
      recentDownloads,
    };
  }
}
