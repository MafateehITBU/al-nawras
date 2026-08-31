/** Body copy for Home page sections. */
export const homeBodyClassName =
  "website-body font-light leading-relaxed text-website-hero-description";

/** Shared intro/description text size — hero, Edge, Expertise, etc. */
export const homeDescriptionSizeClassName = "text-base sm:text-[1.0625rem]";

/** Primary body text on light backgrounds. */
export const homeTextClassName =
  "website-body font-light leading-relaxed text-website-text";

/** Vertical padding for Home page content sections (legacy / non-viewport sections). */
export const homeSectionClassName = "py-14 sm:py-16 lg:py-20";

/** Full viewport section — desktop fills at least the space below the h-20 header. */
export const homeViewportSectionClassName =
  "flex flex-col justify-center py-10 sm:py-12 lg:min-h-[calc(100dvh-5rem)] lg:py-12";

/** Inner wrapper — no nested scroll; page scrolls naturally. */
export const homeViewportSectionContentClassName = "website-container w-full";

/** Small uppercase-style section label. */
export function homeLabelClassName(locale: "en" | "ar") {
  return locale === "en"
    ? "website-body text-xs font-semibold uppercase tracking-[0.15em]"
    : "website-body text-xs font-semibold tracking-wide";
}
