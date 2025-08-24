import { Module } from '@nestjs/common';
import { DuaCategoryService } from './dua-category.service';
import { DuaCategoryController } from './dua-category.controller';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [DuaCategoryController],
  providers: [DuaCategoryService],
  exports: [DuaCategoryService],
})
export class DuaCategoryModule {}
