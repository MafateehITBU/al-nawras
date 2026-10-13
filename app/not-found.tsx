import AdminNotFound from "@/app/admin/not-found";
import { WebsiteNotFoundPage } from "@/components/website/not-found-page";
import { websiteFontVariables } from "@/lib/fonts/website";
import { redirectToLocaleHomeFromPath } from "@/lib/i18n/redirect-home";
import { cn } from "@/lib/utils";
import { headers } from "next/headers";

const STATIC_ASSET =
  /\.(?:svg|png|jpg|jpeg|gif|webp|ico|ttf|woff|woff2|css|js|map|txt|xml|json)$/i;

export default async function RootNotFound() {
  const pathname = (await headers()).get("x-pathname") ?? "";

  if (pathname === "/admin" || pathname.startsWith("/admin/")) {
    return <AdminNotFound />;
  }

  if (pathname && !STATIC_ASSET.test(pathname)) {
    await redirectToLocaleHomeFromPath();
  }

  return (
    <div className={cn("website-root flex min-h-dvh flex-col", websiteFontVariables)}>
      <WebsiteNotFoundPage />
    </div>
  );
}
