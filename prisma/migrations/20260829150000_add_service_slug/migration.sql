-- Add slug column with temporary default for existing rows
ALTER TABLE "services" ADD COLUMN "slug" TEXT NOT NULL DEFAULT '';

-- Backfill slugs from English names with deduplication
WITH base AS (
  SELECT
    id,
    lower(
      regexp_replace(
        regexp_replace(trim("nameEn"), '[^a-zA-Z0-9]+', '-', 'g'),
        '(^-|-$)',
        '',
        'g'
      )
    ) AS base_slug
  FROM "services"
),
numbered AS (
  SELECT
    id,
    base_slug,
    row_number() OVER (PARTITION BY base_slug ORDER BY id) AS rn
  FROM base
)
UPDATE "services" AS s
SET "slug" = CASE
  WHEN n.rn = 1 THEN n.base_slug
  ELSE n.base_slug || '-' || n.rn
END
FROM numbered AS n
WHERE s.id = n.id;

ALTER TABLE "services" ALTER COLUMN "slug" DROP DEFAULT;

CREATE UNIQUE INDEX "services_slug_key" ON "services"("slug");
