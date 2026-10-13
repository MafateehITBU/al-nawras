import { isSupportedLocale } from "@/lib/i18n/config";
import { redirectToLocaleHome } from "@/lib/i18n/redirect-home";
import { notFound } from "next/navigation";

export default async function UnknownPublicPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!isSupportedLocale(locale)) notFound();

  redirectToLocaleHome(locale);
}
