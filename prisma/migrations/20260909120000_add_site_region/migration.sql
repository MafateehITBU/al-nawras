-- CreateEnum
CREATE TYPE "SiteRegion" AS ENUM ('JO', 'AE');

-- AlterTable
ALTER TABLE "website_phones" ADD COLUMN "region" "SiteRegion" NOT NULL DEFAULT 'AE';

-- AlterTable
ALTER TABLE "website_addresses" ADD COLUMN "region" "SiteRegion" NOT NULL DEFAULT 'AE';

-- AlterTable
ALTER TABLE "website_map_locations" ADD COLUMN "region" "SiteRegion" NOT NULL DEFAULT 'AE';

-- CreateIndex
CREATE INDEX "website_phones_region_sortOrder_idx" ON "website_phones"("region", "sortOrder");

-- CreateIndex
CREATE INDEX "website_addresses_region_sortOrder_idx" ON "website_addresses"("region", "sortOrder");

-- CreateIndex
CREATE INDEX "website_map_locations_region_sortOrder_idx" ON "website_map_locations"("region", "sortOrder");
