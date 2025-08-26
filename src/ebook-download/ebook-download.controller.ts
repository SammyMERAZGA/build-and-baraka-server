import {
  Controller,
  Post,
  Body,
  Get,
  ValidationPipe,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { EbookDownloadService } from './ebook-download.service';
import { CreateEbookDownloadDto } from './dto/create-ebook-download.dto';
import { Public } from '../auth/decorators/public.decorator';

@Controller('ebook-download')
@Public()
export class EbookDownloadController {
  constructor(private readonly ebookDownloadService: EbookDownloadService) {}

  @Post()
  @HttpCode(HttpStatus.OK)
  async requestDownload(
    @Body(ValidationPipe) createEbookDownloadDto: CreateEbookDownloadDto,
  ) {
    return this.ebookDownloadService.requestEbookDownload(
      createEbookDownloadDto,
    );
  }

  @Get('stats')
  async getStats() {
    return this.ebookDownloadService.getDownloadStats();
  }
}
