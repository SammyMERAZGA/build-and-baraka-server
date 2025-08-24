import { Module } from '@nestjs/common';
import { DuaService } from './dua.service';
import { DuaController } from './dua.controller';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [DuaController],
  providers: [DuaService],
  exports: [DuaService],
})
export class DuaModule {}
