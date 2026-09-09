"use client";

import type { WebsiteDictionary } from "@/lib/i18n/dictionaries";
import type { SiteRegion } from "@prisma/client";
import {
  COOKIE_CONSENT_COOKIE,
  SITE_REGION_COOKIE,
} from "@/lib/website/site-region";
import { useEffect, useState } from "react";

const ONE_YEAR_SECONDS = 60 * 60 * 24 * 365;

function setCookie(name: string, value: string) {
  document.cookie = `${name}=${encodeURIComponent(value)}; Max-Age=${ONE_YEAR_SECONDS}; Path=/; SameSite=Lax`;
}

function readCookie(name: string): string | null {
  if (typeof document === "undefined") return null;
  const match = document.cookie
    .split("; ")
    .find((entry) => entry.startsWith(`${name}=`));
  if (!match) return null;
  return decodeURIComponent(match.slice(name.length + 1));
}

export function CookieConsentBanner({
  dictionary,
  siteRegion,
}: {
  dictionary: WebsiteDictionary;
  siteRegion: SiteRegion;
}) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const consent = readCookie(COOKIE_CONSENT_COOKIE);
    if (!consent) setVisible(true);
  }, []);

  function accept() {
    setCookie(COOKIE_CONSENT_COOKIE, "accepted");
    setCookie(SITE_REGION_COOKIE, siteRegion);
    setVisible(false);
  }

  function reject() {
    setCookie(COOKIE_CONSENT_COOKIE, "rejected");
    setVisible(false);
  }

  if (!visible) return null;

  return (
    <div
      role="dialog"
      aria-live="polite"
      aria-label={dictionary.cookies.accept}
      className="fixed inset-x-0 bottom-0 z-[100] border-t border-website-border bg-website-surface/95 p-4 shadow-[0_-8px_30px_rgba(0,0,0,0.12)] backdrop-blur-md sm:p-5"
    >
      <div className="website-container flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <p className="website-body max-w-3xl text-sm font-light leading-relaxed text-website-text sm:text-[0.9375rem]">
          {dictionary.cookies.message}
        </p>
        <div className="flex shrink-0 flex-wrap gap-2">
          <button
            type="button"
            onClick={reject}
            className="website-body rounded-md border border-website-border bg-website-bg px-4 py-2.5 text-sm font-medium text-website-text transition-colors hover:border-website-primary hover:text-website-primary website-focus-ring"
          >
            {dictionary.cookies.reject}
          </button>
          <button
            type="button"
            onClick={accept}
            className="website-body rounded-md bg-website-primary px-4 py-2.5 text-sm font-medium text-white transition-colors hover:bg-website-primary-hover website-focus-ring"
          >
            {dictionary.cookies.accept}
          </button>
        </div>
      </div>
    </div>
  );
}
