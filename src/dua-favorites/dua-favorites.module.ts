import { Module } from '@nestjs/common';
import { DuaFavoritesService } from './dua-favorites.service';
import { DuaFavoritesController } from './dua-favorites.controller';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [DuaFavoritesController],
  providers: [DuaFavoritesService],
  exports: [DuaFavoritesService],
})
export class DuaFavoritesModule {}
