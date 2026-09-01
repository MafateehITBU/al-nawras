import { getDictionary } from "@/lib/i18n/dictionaries";
import { localizePath } from "@/lib/i18n/config";
import type { SupportedLocale } from "@/lib/i18n/config";
import Link from "next/link";

export function ServiceCategoryBreadcrumb({
  locale,
  categoryName,
}: {
  locale: SupportedLocale;
  categoryName: string;
}) {
  const dictionary = getDictionary(locale);
  const homeHref = localizePath("/", locale);

  return (
    <nav aria-label="Breadcrumb">
      <ol className="website-body flex flex-wrap items-center gap-x-2 gap-y-1 text-sm text-white/80">
        <li>
          <Link
            href={homeHref}
            className="rounded-sm transition-colors hover:text-white website-focus-ring"
          >
            {dictionary.nav.home}
          </Link>
        </li>
        <li aria-hidden="true" className="text-white/60">
          &gt;
        </li>
        <li>
          <span className="text-white/90">{dictionary.nav.services}</span>
        </li>
        <li aria-hidden="true" className="text-white/60">
          &gt;
        </li>
        <li>
          <span className="text-white" aria-current="page">
            {categoryName}
          </span>
        </li>
      </ol>
    </nav>
  );
}
