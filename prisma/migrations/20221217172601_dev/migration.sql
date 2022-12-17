/*
  Warnings:

  - You are about to drop the `CampaignComment` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `CampaignPayment` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `short_description` to the `Campaign` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "CampaignDonationStatus" AS ENUM ('UNPAID', 'PAID', 'CANCELLED');

-- DropForeignKey
ALTER TABLE "CampaignComment" DROP CONSTRAINT "CampaignComment_user_id_fkey";

-- DropForeignKey
ALTER TABLE "CampaignPayment" DROP CONSTRAINT "CampaignPayment_user_id_fkey";

-- AlterTable
ALTER TABLE "Campaign" ADD COLUMN     "short_description" TEXT NOT NULL;

-- DropTable
DROP TABLE "CampaignComment";

-- DropTable
DROP TABLE "CampaignPayment";

-- CreateTable
CREATE TABLE "CampaignDonation" (
    "id" TEXT NOT NULL,
    "amount" INTEGER NOT NULL,
    "payment_method" TEXT NOT NULL,
    "status" "CampaignDonationStatus" NOT NULL,
    "user_id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "paid_at" TIMESTAMP(3),
    "campaign_id" TEXT NOT NULL,
    "payment_gateway_order_id" TEXT,

    CONSTRAINT "CampaignDonation_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "CampaignDonation" ADD CONSTRAINT "CampaignDonation_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CampaignDonation" ADD CONSTRAINT "CampaignDonation_campaign_id_fkey" FOREIGN KEY ("campaign_id") REFERENCES "Campaign"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
