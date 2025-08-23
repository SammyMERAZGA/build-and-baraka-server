-- CreateTable
CREATE TABLE "public"."user" (
    "uuid" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "newsletter_subscribed" BOOLEAN NOT NULL DEFAULT false,
    "is_resetting_password" BOOLEAN NOT NULL DEFAULT false,
    "password_reset_token" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "user_pkey" PRIMARY KEY ("uuid")
);

-- CreateTable
CREATE TABLE "public"."feedback" (
    "uuid" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "comment" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "user_uuid" TEXT NOT NULL,

    CONSTRAINT "feedback_pkey" PRIMARY KEY ("uuid")
);

-- CreateTable
CREATE TABLE "public"."i18n" (
    "uuid" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "code" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "user_uuid" TEXT NOT NULL,

    CONSTRAINT "i18n_pkey" PRIMARY KEY ("uuid")
);

-- CreateTable
CREATE TABLE "public"."dua_category" (
    "uuid" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "color" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "dua_category_pkey" PRIMARY KEY ("uuid")
);

-- CreateTable
CREATE TABLE "public"."dua" (
    "uuid" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "image" TEXT,
    "arabic" TEXT NOT NULL,
    "transliteration" TEXT NOT NULL,
    "translation" TEXT NOT NULL,
    "reference" TEXT NOT NULL,
    "color" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "dua_category_uuid" TEXT NOT NULL,

    CONSTRAINT "dua_pkey" PRIMARY KEY ("uuid")
);

-- CreateTable
CREATE TABLE "public"."dua_favorites" (
    "uuid" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "user_uuid" TEXT NOT NULL,
    "dua_uuid" TEXT NOT NULL,

    CONSTRAINT "dua_favorites_pkey" PRIMARY KEY ("uuid")
);

-- CreateTable
CREATE TABLE "public"."recipe_category" (
    "uuid" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "color" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "recipe_category_pkey" PRIMARY KEY ("uuid")
);

-- CreateTable
CREATE TABLE "public"."recipe" (
    "uuid" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "arabic_name" TEXT,
    "description" TEXT NOT NULL,
    "ingredients" TEXT NOT NULL,
    "preparations" TEXT NOT NULL,
    "hadith_source" TEXT,
    "hadith_text" TEXT,
    "usage" TEXT,
    "icon" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "recipe_category_uuid" TEXT NOT NULL,

    CONSTRAINT "recipe_pkey" PRIMARY KEY ("uuid")
);

-- CreateTable
CREATE TABLE "public"."recipe_favorites" (
    "uuid" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "user_uuid" TEXT NOT NULL,
    "recipe_uuid" TEXT NOT NULL,

    CONSTRAINT "recipe_favorites_pkey" PRIMARY KEY ("uuid")
);

-- CreateTable
CREATE TABLE "public"."guide_category" (
    "uuid" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "color" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "guide_category_pkey" PRIMARY KEY ("uuid")
);

-- CreateTable
CREATE TABLE "public"."guide" (
    "uuid" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "arabic_title" TEXT,
    "icon" TEXT,
    "color" TEXT,
    "description" TEXT NOT NULL,
    "content" JSONB NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "guide_category_uuid" TEXT NOT NULL,

    CONSTRAINT "guide_pkey" PRIMARY KEY ("uuid")
);

-- CreateTable
CREATE TABLE "public"."guide_favorites" (
    "uuid" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "user_uuid" TEXT NOT NULL,
    "guide_uuid" TEXT NOT NULL,

    CONSTRAINT "guide_favorites_pkey" PRIMARY KEY ("uuid")
);

-- CreateTable
CREATE TABLE "public"."islamic_bases" (
    "uuid" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "arabic_title" TEXT,
    "icon" TEXT,
    "color" TEXT,
    "description" TEXT NOT NULL,
    "items" JSONB NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "islamic_bases_pkey" PRIMARY KEY ("uuid")
);

-- CreateTable
CREATE TABLE "public"."islamic_bases_favorites" (
    "uuid" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "user_uuid" TEXT NOT NULL,
    "islamic_bases_uuid" TEXT NOT NULL,

    CONSTRAINT "islamic_bases_favorites_pkey" PRIMARY KEY ("uuid")
);

-- CreateIndex
CREATE UNIQUE INDEX "user_email_key" ON "public"."user"("email");

-- CreateIndex
CREATE UNIQUE INDEX "dua_favorites_user_uuid_dua_uuid_key" ON "public"."dua_favorites"("user_uuid", "dua_uuid");

-- CreateIndex
CREATE UNIQUE INDEX "recipe_favorites_user_uuid_recipe_uuid_key" ON "public"."recipe_favorites"("user_uuid", "recipe_uuid");

-- CreateIndex
CREATE UNIQUE INDEX "guide_favorites_user_uuid_guide_uuid_key" ON "public"."guide_favorites"("user_uuid", "guide_uuid");

-- CreateIndex
CREATE UNIQUE INDEX "islamic_bases_favorites_user_uuid_islamic_bases_uuid_key" ON "public"."islamic_bases_favorites"("user_uuid", "islamic_bases_uuid");

-- AddForeignKey
ALTER TABLE "public"."feedback" ADD CONSTRAINT "feedback_user_uuid_fkey" FOREIGN KEY ("user_uuid") REFERENCES "public"."user"("uuid") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."i18n" ADD CONSTRAINT "i18n_user_uuid_fkey" FOREIGN KEY ("user_uuid") REFERENCES "public"."user"("uuid") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."dua" ADD CONSTRAINT "dua_dua_category_uuid_fkey" FOREIGN KEY ("dua_category_uuid") REFERENCES "public"."dua_category"("uuid") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."dua_favorites" ADD CONSTRAINT "dua_favorites_user_uuid_fkey" FOREIGN KEY ("user_uuid") REFERENCES "public"."user"("uuid") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."dua_favorites" ADD CONSTRAINT "dua_favorites_dua_uuid_fkey" FOREIGN KEY ("dua_uuid") REFERENCES "public"."dua"("uuid") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."recipe" ADD CONSTRAINT "recipe_recipe_category_uuid_fkey" FOREIGN KEY ("recipe_category_uuid") REFERENCES "public"."recipe_category"("uuid") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."recipe_favorites" ADD CONSTRAINT "recipe_favorites_user_uuid_fkey" FOREIGN KEY ("user_uuid") REFERENCES "public"."user"("uuid") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."recipe_favorites" ADD CONSTRAINT "recipe_favorites_recipe_uuid_fkey" FOREIGN KEY ("recipe_uuid") REFERENCES "public"."recipe"("uuid") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."guide" ADD CONSTRAINT "guide_guide_category_uuid_fkey" FOREIGN KEY ("guide_category_uuid") REFERENCES "public"."guide_category"("uuid") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."guide_favorites" ADD CONSTRAINT "guide_favorites_user_uuid_fkey" FOREIGN KEY ("user_uuid") REFERENCES "public"."user"("uuid") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."guide_favorites" ADD CONSTRAINT "guide_favorites_guide_uuid_fkey" FOREIGN KEY ("guide_uuid") REFERENCES "public"."guide"("uuid") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."islamic_bases_favorites" ADD CONSTRAINT "islamic_bases_favorites_user_uuid_fkey" FOREIGN KEY ("user_uuid") REFERENCES "public"."user"("uuid") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."islamic_bases_favorites" ADD CONSTRAINT "islamic_bases_favorites_islamic_bases_uuid_fkey" FOREIGN KEY ("islamic_bases_uuid") REFERENCES "public"."islamic_bases"("uuid") ON DELETE CASCADE ON UPDATE CASCADE;
