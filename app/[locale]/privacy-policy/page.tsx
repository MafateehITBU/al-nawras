import { isSupportedLocale, localizePath } from "@/lib/i18n/config";
import { notFound, redirect } from "next/navigation";

export default async function PrivacyPolicyRedirect({
  params,
}: PageProps<"/[locale]/privacy-policy">) {
  const { locale: localeParam } = await params;
  if (!isSupportedLocale(localeParam)) notFound();

  redirect(localizePath("/terms-and-conditions", localeParam));
}
