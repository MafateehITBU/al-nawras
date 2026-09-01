import Link from "next/link";
import { APP_NAME } from "@/constants";
import { WEBSITE_ASSETS } from "@/constants/website-assets";
import { cn } from "@/lib/utils";

const NAVBAR_LOGO_WIDTH = 375;
const NAVBAR_LOGO_HEIGHT = 72;

export function NavbarLogo({
  logoUrl,
  href,
  className,
}: {
  logoUrl?: string | null;
  href: string;
  className?: string;
}) {
  const src = logoUrl?.trim() || WEBSITE_ASSETS.logos.navbar;

  return (
    <Link
      href={href}
      className={cn(
        "website-focus-ring inline-flex shrink-0 items-center overflow-visible",
        className,
      )}
      aria-label={APP_NAME}
    >
      {/* Native img keeps the full wide wordmark visible; next/image wrappers crop panoramic logos. */}
      <img
        src={src}
        alt={APP_NAME}
        width={NAVBAR_LOGO_WIDTH}
        height={NAVBAR_LOGO_HEIGHT}
        decoding="async"
        fetchPriority="high"
        className="block h-11 w-auto max-w-none sm:h-12 lg:h-[3.25rem]"
      />
    </Link>
  );
}
