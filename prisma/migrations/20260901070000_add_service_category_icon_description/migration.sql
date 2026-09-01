-- Add core-service fields used by the home section and mega menu
ALTER TABLE "service_categories" ADD COLUMN "icon" TEXT NOT NULL DEFAULT 'mdi:briefcase-outline';
ALTER TABLE "service_categories" ADD COLUMN "descriptionEn" TEXT NOT NULL DEFAULT '';
ALTER TABLE "service_categories" ADD COLUMN "descriptionAr" TEXT NOT NULL DEFAULT '';

-- Patents
UPDATE "service_categories"
SET
  "icon" = 'mdi:certificate-outline',
  "descriptionEn" = 'We help innovators protect their inventions through specialised advice and precise legal procedures, from preparing and filing patent applications to monitoring and maintaining their rights.',
  "descriptionAr" = 'نساعد أصحاب الابتكارات على حماية اختراعاتهم من خلال استشارات متخصصة وإجراءات دقيقة تمتد من إعداد طلبات البراءات وتقديمها إلى متابعتها والحفاظ على حقوقها.'
WHERE lower("nameEn") LIKE '%patent%'
   OR "nameAr" LIKE '%براءات%';

-- Trademarks
UPDATE "service_categories"
SET
  "icon" = 'mdi:shield-check-outline',
  "descriptionEn" = 'We protect trademarks throughout their lifecycle, from searching and registration to monitoring, renewals, and addressing potential infringements—helping preserve your brand''s identity and commercial value.',
  "descriptionAr" = 'نحمي العلامات التجارية في مختلف مراحلها، من البحث والتسجيل إلى المراقبة والتجديد والتعامل مع التعديات، بما يساعد على الحفاظ على هوية العلامة وقيمتها التجارية.'
WHERE lower("nameEn") LIKE '%trademark%'
   OR "nameAr" LIKE '%علامات%';

-- Legal advisory
UPDATE "service_categories"
SET
  "icon" = 'mdi:scale-balance',
  "descriptionEn" = 'We provide specialised legal advice on intellectual property and related matters, helping rights holders and businesses make informed decisions and reduce legal risks.',
  "descriptionAr" = 'نقدم استشارات قانونية متخصصة في الملكية الفكرية والمسائل المرتبطة بها، لمساعدة أصحاب الحقوق والشركات على اتخاذ قرارات واضحة ومدروسة، وتقليل المخاطر القانونية.'
WHERE lower("nameEn") LIKE '%legal%'
   OR lower("nameEn") LIKE '%advisor%'
   OR "nameAr" LIKE '%استشار%';

ALTER TABLE "service_categories" ALTER COLUMN "icon" DROP DEFAULT;
ALTER TABLE "service_categories" ALTER COLUMN "descriptionEn" DROP DEFAULT;
ALTER TABLE "service_categories" ALTER COLUMN "descriptionAr" DROP DEFAULT;
