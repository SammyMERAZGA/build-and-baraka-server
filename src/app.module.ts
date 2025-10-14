import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { APP_GUARD } from '@nestjs/core';
import { UsersModule } from './users/users.module';
import { PrismaModule } from './prisma/prisma.module';
import { MailModule } from './mail/mail.module';
import { FeedbackModule } from './feedback/feedback.module';
import { DuaCategoryModule } from './dua-category/dua-category.module';
import { DuaModule } from './dua/dua.module';
import { DuaFavoritesModule } from './dua-favorites/dua-favorites.module';
import { RecipeCategoryModule } from './recipe-category/recipe-category.module';
import { RecipeModule } from './recipe/recipe.module';
import { RecipeFavoritesModule } from './recipe-favorites/recipe-favorites.module';
import { ContactModule } from './contact/contact.module';
import { EbookDownloadModule } from './ebook-download/ebook-download.module';
import { LinkModule } from './link/link.module';
import { AdminModule } from './admin/admin.module';
import { JwtAuthGuard } from './auth/guards/jwt-auth.guard';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    PrismaModule,
    MailModule,
    UsersModule,
    FeedbackModule,
    DuaCategoryModule,
    DuaModule,
    DuaFavoritesModule,
    RecipeCategoryModule,
    RecipeModule,
    RecipeFavoritesModule,
    ContactModule,
    EbookDownloadModule,
    LinkModule,
    AdminModule,
  ],
  providers: [
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
  ],
})
export class AppModule {}
