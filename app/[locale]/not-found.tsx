import { redirectToLocaleHomeFromPath } from "@/lib/i18n/redirect-home";

export default async function LocaleNotFound() {
  await redirectToLocaleHomeFromPath();
}
