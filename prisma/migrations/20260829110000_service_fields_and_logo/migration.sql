-- Rename service content fields to hero/overview naming
ALTER TABLE "services" RENAME COLUMN "titleEn" TO "heroTitleEn";
ALTER TABLE "services" RENAME COLUMN "titleAr" TO "heroTitleAr";
ALTER TABLE "services" RENAME COLUMN "subtitleEn" TO "overviewTitleEn";
ALTER TABLE "services" RENAME COLUMN "subtitleAr" TO "overviewTitleAr";
ALTER TABLE "services" RENAME COLUMN "descriptionEn" TO "overviewDescriptionEn";
ALTER TABLE "services" RENAME COLUMN "descriptionAr" TO "overviewDescriptionAr";

-- Site logo on website settings
ALTER TABLE "website_settings" ADD COLUMN "logoUrl" TEXT;
ALTER TABLE "website_settings" ADD COLUMN "logoPublicId" TEXT;
