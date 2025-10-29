-- DropForeignKey
ALTER TABLE "Lead" DROP CONSTRAINT "Lead_realtorId_fkey";

-- AlterTable
ALTER TABLE "Lead" ALTER COLUMN "realtorId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "Lead" ADD CONSTRAINT "Lead_realtorId_fkey" FOREIGN KEY ("realtorId") REFERENCES "Realtor"("id") ON DELETE SET NULL ON UPDATE CASCADE;
