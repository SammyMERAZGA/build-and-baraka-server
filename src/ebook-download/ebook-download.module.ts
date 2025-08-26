import { Module } from '@nestjs/common';
import { EbookDownloadController } from './ebook-download.controller';
import { EbookDownloadService } from './ebook-download.service';
import { PrismaModule } from '../prisma/prisma.module';
import { MailModule } from '../mail/mail.module';

@Module({
  imports: [PrismaModule, MailModule],
  controllers: [EbookDownloadController],
  providers: [EbookDownloadService],
})
export class EbookDownloadModule {}
