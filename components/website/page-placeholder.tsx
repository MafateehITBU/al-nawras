import { AnimateIn } from "@/components/website/animate-in";
import type { SupportedLocale } from "@/lib/i18n/config";

export function PagePlaceholder({
  locale,
  title,
}: {
  locale: SupportedLocale;
  title: string;
}) {
  return (
    <AnimateIn immediate variant="fade">
      <section className="website-container py-16">
        <h1 className="website-heading text-3xl font-semibold text-website-text">{title}</h1>
        <p className="website-body mt-4 text-base text-website-muted">
          {locale === "ar"
            ? "سيتم تنفيذ هذه الصفحة وفق تصميم واجهة المستخدم المقدم."
            : "This page will be implemented from the provided UX/UI design."}
        </p>
      </section>
    </AnimateIn>
  );
}
