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
      className="animate-expertise-badge-float absolute bottom-10 z-10 flex h-[94px] w-[175px] max-w-[72vw] items-center justify-center rounded-md bg-website-secondary px-3 text-white shadow-md sm:bottom-14 sm:h-[110px] sm:w-[210px] sm:px-4 lg:bottom-16 -start-[87px] sm:-start-[105px]"
    >
      <div className="text-start">
        <p className="website-heading text-base font-semibold leading-tight sm:text-lg">{header}</p>
        <p
          className={`website-body mt-1 text-[10px] font-medium sm:text-xs ${
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
