import { DEFAULT_LOCALE } from "@/constants";
import { localizePath } from "@/lib/i18n/config";
import Link from "next/link";

export default function LocaleNotFound() {
  return (
    <div className="mx-auto flex max-w-6xl flex-col items-center px-4 py-24 text-center sm:px-6 lg:px-8">
      <h1 className="text-3xl font-bold text-website-text">404</h1>
      <p className="mt-4 text-website-muted">Page not found.</p>
      <Link
        href={localizePath("/", DEFAULT_LOCALE)}
        className="mt-8 rounded-lg bg-website-primary px-6 py-3 text-sm font-medium text-white hover:bg-website-primary-hover focus-ring"
      >
        Back to home
      </Link>
    </div>
  );
}
