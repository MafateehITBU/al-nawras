"use client";

import { GuardedLink } from "@/components/dashboard/guarded-link";
import { cn } from "@/lib/utils";
import { APP_NAME } from "@/constants";
import Image from "next/image";

const FALLBACK_LOGO = "/logo.png";

export interface LogoProps {
  collapsed?: boolean;
  className?: string;
  href?: string;
  /** Uploaded site logo from Website Settings; falls back to public/logo.png */
  logoUrl?: string | null;
}

export function Logo({
  collapsed = false,
  className,
  href = "/admin",
  logoUrl,
}: LogoProps) {
  const src = logoUrl?.trim() || FALLBACK_LOGO;

  return (
    <GuardedLink
      href={href}
      className={cn("focus-ring block w-full min-w-0", className)}
      aria-label={`${APP_NAME} dashboard home`}
    >
      <div className={cn("relative w-full", collapsed ? "h-9" : "h-10")}>
        <Image
          src={src}
          alt={APP_NAME}
          fill
          priority
          sizes={collapsed ? "4rem" : "(max-width: 1024px) 16rem, 16.5rem"}
          className={cn(
            "object-contain",
            collapsed ? "object-center" : "object-left",
          )}
        />
      </div>
    </GuardedLink>
  );
}
