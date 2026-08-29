-- Add service image columns with temporary defaults for existing rows
ALTER TABLE "services" ADD COLUMN "overviewImageUrl" TEXT NOT NULL DEFAULT '';
ALTER TABLE "services" ADD COLUMN "overviewImagePublicId" TEXT NOT NULL DEFAULT '';
ALTER TABLE "services" ADD COLUMN "strategicBenefitsImageUrl" TEXT NOT NULL DEFAULT '';
ALTER TABLE "services" ADD COLUMN "strategicBenefitsImagePublicId" TEXT NOT NULL DEFAULT '';

ALTER TABLE "services" ALTER COLUMN "overviewImageUrl" DROP DEFAULT;
ALTER TABLE "services" ALTER COLUMN "overviewImagePublicId" DROP DEFAULT;
ALTER TABLE "services" ALTER COLUMN "strategicBenefitsImageUrl" DROP DEFAULT;
ALTER TABLE "services" ALTER COLUMN "strategicBenefitsImagePublicId" DROP DEFAULT;
