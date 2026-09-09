-- CreateEnum
CREATE TYPE "PartnerCategory" AS ENUM (
  'CLIENT',
  'INTERNATIONAL_PARTNER',
  'PROFESSIONAL_MEMBERSHIP',
  'ORGANIZATION',
  'ACCREDITATION'
);

-- CreateTable
CREATE TABLE "partners" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "logoUrl" TEXT NOT NULL,
    "logoPublicId" TEXT NOT NULL,
    "category" "PartnerCategory" NOT NULL,
    "websiteUrl" TEXT,
    "sortOrder" INTEGER NOT NULL DEFAULT 0,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "partners_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "partners_category_sortOrder_idx" ON "partners"("category", "sortOrder");

-- CreateIndex
CREATE INDEX "partners_isActive_idx" ON "partners"("isActive");
