import { DEFAULT_LOCALE, isSupportedLocale } from "@/lib/i18n/config";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

export function redirectToLocaleHome(locale?: string): never {
  redirect(`/${locale && isSupportedLocale(locale) ? locale : DEFAULT_LOCALE}`);
}

export async function redirectToLocaleHomeFromPath(): Promise<never> {
  const pathname = (await headers()).get("x-pathname") ?? "";
  const locale = pathname.split("/").filter(Boolean)[0];
  redirectToLocaleHome(locale);
}
