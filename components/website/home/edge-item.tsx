import type { HomeEdgeItem } from "@/lib/i18n/home-page-content";
import type { SupportedLocale } from "@/lib/i18n/config";

export function EdgeItem({
  item,
  locale,
}: {
  item: HomeEdgeItem;
  locale: SupportedLocale;
}) {
  return (
    <article className="flex h-full flex-col p-5 sm:p-6">
      <span className="website-heading text-2xl font-normal text-website-primary">
        {item.number}
      </span>
      <span
        className={`website-body mt-5 text-xs font-semibold text-website-text sm:mt-6 ${
          locale === "en" ? "uppercase tracking-[0.12em]" : "tracking-wide"
        }`}
      >
        {item.label}
      </span>
      <h3 className="website-heading mt-3 text-base font-semibold text-website-text sm:text-lg">
        {item.title}
      </h3>
      <p className="website-body mt-2 flex-1 text-sm font-light leading-relaxed text-website-hero-description">
        {item.description}
      </p>
    </article>
  );
}
