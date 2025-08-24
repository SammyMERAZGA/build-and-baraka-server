/*
  Warnings:

  - The `ingredients` column on the `recipe` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `preparations` column on the `recipe` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `usage` column on the `recipe` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "public"."recipe" DROP COLUMN "ingredients",
ADD COLUMN     "ingredients" TEXT[],
DROP COLUMN "preparations",
ADD COLUMN     "preparations" TEXT[],
DROP COLUMN "usage",
ADD COLUMN     "usage" TEXT[];
