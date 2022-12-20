/*
  Warnings:

  - You are about to alter the column `short_description` on the `Campaign` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(140)`.

*/
-- AlterTable
ALTER TABLE "Campaign" ALTER COLUMN "short_description" SET DATA TYPE VARCHAR(140);
