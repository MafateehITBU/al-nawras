-- AlterTable
ALTER TABLE "blogs" ADD COLUMN "isPublished" BOOLEAN NOT NULL DEFAULT true;

-- CreateIndex
CREATE INDEX "blogs_isPublished_idx" ON "blogs"("isPublished");
