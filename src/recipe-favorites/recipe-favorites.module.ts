import { Module } from '@nestjs/common';
import { RecipeFavoritesController } from './recipe-favorites.controller';
import { RecipeFavoritesService } from './recipe-favorites.service';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [RecipeFavoritesController],
  providers: [RecipeFavoritesService],
  exports: [RecipeFavoritesService],
})
export class RecipeFavoritesModule {}
