-- AlterTable
ALTER TABLE "Commission" ADD COLUMN     "leadId" TEXT,
ADD COLUMN     "notes" TEXT;

-- AlterTable
ALTER TABLE "Property" ADD COLUMN     "commissionRate" DOUBLE PRECISION DEFAULT 3.0,
ADD COLUMN     "commissionType" TEXT DEFAULT 'percentage';

-- AddForeignKey
ALTER TABLE "Commission" ADD CONSTRAINT "Commission_leadId_fkey" FOREIGN KEY ("leadId") REFERENCES "Lead"("id") ON DELETE SET NULL ON UPDATE CASCADE;
