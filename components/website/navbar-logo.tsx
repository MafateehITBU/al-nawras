import Image from "next/image";
import Link from "next/link";
import { APP_NAME } from "@/constants";
import { WEBSITE_ASSETS } from "@/constants/website-assets";
import { cn } from "@/lib/utils";

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
      className={cn("website-focus-ring block shrink-0", className)}
      aria-label={APP_NAME}
    >
      <div className="relative h-12 w-52 sm:h-14 sm:w-60 lg:h-[3.75rem] lg:w-72">
        <Image
          src={src}
          alt={APP_NAME}
          fill
          priority
          sizes="(max-width: 640px) 13rem, (max-width: 1024px) 15rem, 18rem"
          className="object-contain object-start"
        />
      </div>
    </Link>
  );
}
