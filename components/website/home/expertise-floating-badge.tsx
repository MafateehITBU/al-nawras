import { isRtlLocale, type SupportedLocale } from "@/lib/i18n/config";

export function ExpertiseFloatingBadge({
  header,
  description,
  locale,
}: {
  header: string;
  description: string;
  locale: SupportedLocale;
}) {
  return (
    <div
      dir={isRtlLocale(locale) ? "rtl" : "ltr"}
      className="animate-expertise-badge-float absolute bottom-6 z-10 flex h-[86px] w-[158px] items-center justify-center rounded-md bg-website-secondary px-3 text-white shadow-md sm:bottom-10 sm:h-[110px] sm:w-[210px] sm:px-4 lg:bottom-16 -start-[79px] sm:-start-[105px]"
    >
      <div className="text-start">
        <p className="website-heading text-sm font-semibold leading-tight sm:text-lg">{header}</p>
        <p
          className={`website-body mt-1 text-[9px] font-medium sm:text-xs ${
            locale === "en" ? "uppercase tracking-wide" : "leading-snug"
          }`}
        >
          {description}
        </p>
      </div>
    </div>
  );
}

export const EXPERTISE_IMAGE_WIDTH = 608;
export const EXPERTISE_IMAGE_HEIGHT = 581;
