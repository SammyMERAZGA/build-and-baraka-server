/*
  Warnings:

  - You are about to drop the `islamic_bases` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `islamic_bases_favorites` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "public"."islamic_bases_favorites" DROP CONSTRAINT "islamic_bases_favorites_islamic_bases_uuid_fkey";

-- DropForeignKey
ALTER TABLE "public"."islamic_bases_favorites" DROP CONSTRAINT "islamic_bases_favorites_user_uuid_fkey";

-- DropTable
DROP TABLE "public"."islamic_bases";

-- DropTable
DROP TABLE "public"."islamic_bases_favorites";
