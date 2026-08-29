import Image from "next/image";
import Link from "next/link";
import { APP_NAME } from "@/constants";
import { WEBSITE_ASSETS } from "@/constants/website-assets";
import { cn } from "@/lib/utils";

export function FooterLogo({
  href,
  className,
}: {
  href: string;
  className?: string;
}) {
  return (
    <Link
      href={href}
      className={cn("website-focus-ring block shrink-0", className)}
      aria-label={APP_NAME}
    >
      <div className="relative h-16 w-52 sm:h-[4.5rem] sm:w-56">
        <Image
          src={WEBSITE_ASSETS.logos.footer}
          alt={APP_NAME}
          fill
          sizes="(max-width: 640px) 13rem, 14rem"
          className="object-contain object-start"
        />
      </div>
    </Link>
  );
}
