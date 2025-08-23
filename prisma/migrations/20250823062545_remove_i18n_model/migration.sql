/*
  Warnings:

  - You are about to drop the `guide` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `guide_category` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `guide_favorites` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `i18n` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "public"."guide" DROP CONSTRAINT "guide_guide_category_uuid_fkey";

-- DropForeignKey
ALTER TABLE "public"."guide_favorites" DROP CONSTRAINT "guide_favorites_guide_uuid_fkey";

-- DropForeignKey
ALTER TABLE "public"."guide_favorites" DROP CONSTRAINT "guide_favorites_user_uuid_fkey";

-- DropForeignKey
ALTER TABLE "public"."i18n" DROP CONSTRAINT "i18n_user_uuid_fkey";

-- DropTable
DROP TABLE "public"."guide";

-- DropTable
DROP TABLE "public"."guide_category";

-- DropTable
DROP TABLE "public"."guide_favorites";

-- DropTable
DROP TABLE "public"."i18n";
