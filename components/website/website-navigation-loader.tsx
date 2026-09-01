"use client";

import { APP_NAME } from "@/constants";
import { WEBSITE_ASSETS } from "@/constants/website-assets";
import Image from "next/image";
import { useEffect, useState } from "react";
import { createPortal } from "react-dom";

export function WebsiteNavigationLoader({ logoUrl }: { logoUrl?: string | null }) {
  const [mounted, setMounted] = useState(false);
  const src = logoUrl?.trim() || WEBSITE_ASSETS.logos.navbar;

  useEffect(() => {
    setMounted(true);
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, []);

  if (!mounted) return null;

  return createPortal(
    <div
      className="website-nav-loader fixed inset-0 z-[200] flex items-center justify-center bg-website-surface"
      role="status"
      aria-live="polite"
      aria-label="Loading page"
    >
      <div className="flex flex-col items-center gap-6 px-6">
        <div className="relative h-14 w-60 sm:h-16 sm:w-72">
          <Image
            src={src}
            alt={APP_NAME}
            fill
            priority
            className="object-contain"
            sizes="18rem"
          />
        </div>
        <div className="website-nav-loader-spinner" aria-hidden />
      </div>
    </div>,
    document.body,
  );
}
