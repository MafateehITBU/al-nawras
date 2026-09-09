-- AlterTable
ALTER TABLE "partners" DROP COLUMN IF EXISTS "category";
ALTER TABLE "partners" DROP COLUMN IF EXISTS "websiteUrl";
ALTER TABLE "partners" DROP COLUMN IF EXISTS "isActive";

-- DropIndex
DROP INDEX IF EXISTS "partners_category_sortOrder_idx";
DROP INDEX IF EXISTS "partners_isActive_idx";

-- CreateIndex
CREATE INDEX IF NOT EXISTS "partners_sortOrder_idx" ON "partners"("sortOrder");

-- DropEnum
DROP TYPE IF EXISTS "PartnerCategory";
