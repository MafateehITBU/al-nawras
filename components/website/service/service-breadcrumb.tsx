import { getDictionary } from "@/lib/i18n/dictionaries";
import { localizePath } from "@/lib/i18n/config";
import type { SupportedLocale } from "@/lib/i18n/config";
import Link from "next/link";

export function ServiceBreadcrumb({
  locale,
  serviceName,
}: {
  locale: SupportedLocale;
  serviceName: string;
}) {
  const dictionary = getDictionary(locale);
  const homeHref = localizePath("/", locale);

  return (
    <nav aria-label="Breadcrumb">
      <ol className="website-body flex flex-wrap items-center gap-x-2 gap-y-1 text-sm text-white/80">
        <li>
          <Link
            href={homeHref}
            className="transition-colors hover:text-white website-focus-ring rounded-sm"
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
            {serviceName}
          </span>
        </li>
      </ol>
    </nav>
  );
}
