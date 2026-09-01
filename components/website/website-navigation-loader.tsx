"use client";

import { APP_NAME } from "@/constants";
import { WEBSITE_ASSETS } from "@/constants/website-assets";
import { useEffect, useState } from "react";
import { createPortal } from "react-dom";

const NAVBAR_LOGO_WIDTH = 375;
const NAVBAR_LOGO_HEIGHT = 72;

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
        <img
          src={src}
          alt={APP_NAME}
          width={NAVBAR_LOGO_WIDTH}
          height={NAVBAR_LOGO_HEIGHT}
          decoding="async"
          className="block h-12 w-auto max-w-[min(90vw,22rem)] sm:h-14"
        />
        <div className="website-nav-loader-spinner" aria-hidden />
      </div>
    </div>,
    document.body,
  );
}
