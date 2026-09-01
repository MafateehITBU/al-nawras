import { TermsContent } from "@/components/website/legal/terms-content";
import { TermsHero } from "@/components/website/legal/terms-hero";
import type { SupportedLocale } from "@/lib/i18n/config";

export function TermsPage({ locale }: { locale: SupportedLocale }) {
  return (
    <>
      <TermsHero locale={locale} />
      <TermsContent locale={locale} />
    </>
  );
}
