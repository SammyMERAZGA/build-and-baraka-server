import { Module } from '@nestjs/common';
import { RecipeCategoryController } from './recipe-category.controller';
import { RecipeCategoryService } from './recipe-category.service';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [RecipeCategoryController],
  providers: [RecipeCategoryService],
  exports: [RecipeCategoryService],
})
export class RecipeCategoryModule {}
