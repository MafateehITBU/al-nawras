"use client";

import Image from "next/image";
import Link from "next/link";
import { APP_NAME } from "@/constants";
import { cn } from "@/lib/utils";

const FALLBACK_LOGO = "/logo.png";

export function WebsiteLogo({
  logoUrl,
  className,
  href = "/",
}: {
  logoUrl?: string | null;
  className?: string;
  href?: string;
}) {
  const src = logoUrl?.trim() || FALLBACK_LOGO;

  return (
    <Link
      href={href}
      className={cn("focus-ring block shrink-0", className)}
      aria-label={APP_NAME}
    >
      <div className="relative h-10 w-36 sm:h-11 sm:w-40">
        <Image
          src={src}
          alt={APP_NAME}
          fill
          priority
          sizes="(max-width: 640px) 9rem, 10rem"
          className="object-contain object-left rtl:object-right"
        />
      </div>
    </Link>
  );
}
