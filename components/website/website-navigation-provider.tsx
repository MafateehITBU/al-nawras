"use client";

import { WebsiteNavigationLoader } from "@/components/website/website-navigation-loader";
import { resetBodyScrollLock } from "@/lib/website/body-scroll-lock";
import { isInternalWebsiteLink } from "@/lib/website/internal-link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useRef, useState, type ReactNode } from "react";

const LOADER_TIMEOUT_MS = 15000;
const LOADER_MIN_VISIBLE_MS = 1000;

export function WebsiteNavigationProvider({
  children,
  logoUrl,
}: {
  children: ReactNode;
  logoUrl?: string | null;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const [loading, setLoading] = useState(false);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const hideTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const shownAtRef = useRef<number | null>(null);

  function clearTimers() {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
    if (hideTimeoutRef.current) {
      clearTimeout(hideTimeoutRef.current);
      hideTimeoutRef.current = null;
    }
  }

  useEffect(() => {
    if (!shownAtRef.current) {
      setLoading(false);
      resetBodyScrollLock();
      return;
    }

    const remaining = Math.max(
      0,
      LOADER_MIN_VISIBLE_MS - (Date.now() - shownAtRef.current),
    );

    hideTimeoutRef.current = setTimeout(() => {
      setLoading(false);
      shownAtRef.current = null;
      resetBodyScrollLock();
      clearTimers();
    }, remaining);

    return () => {
      if (hideTimeoutRef.current) {
        clearTimeout(hideTimeoutRef.current);
        hideTimeoutRef.current = null;
      }
    };
  }, [pathname]);

  useEffect(() => {
    return () => {
      clearTimers();
    };
  }, []);

  useEffect(() => {
    function handleClick(event: MouseEvent) {
      if (
        event.defaultPrevented ||
        event.button !== 0 ||
        event.metaKey ||
        event.ctrlKey ||
        event.shiftKey ||
        event.altKey
      ) {
        return;
      }

      const anchor = (event.target as HTMLElement).closest("a");
      if (!anchor || !isInternalWebsiteLink(anchor)) {
        return;
      }

      const href = anchor.getAttribute("href");
      if (!href) return;

      const nextUrl = new URL(href, window.location.href);
      const currentUrl = new URL(window.location.href);

      if (nextUrl.pathname === currentUrl.pathname) {
        return;
      }

      event.preventDefault();
      if (hideTimeoutRef.current) {
        clearTimeout(hideTimeoutRef.current);
        hideTimeoutRef.current = null;
      }
      shownAtRef.current = Date.now();
      setLoading(true);

      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }

      timeoutRef.current = setTimeout(() => {
        setLoading(false);
        shownAtRef.current = null;
        timeoutRef.current = null;
      }, LOADER_TIMEOUT_MS);

      router.push(href as Parameters<typeof router.push>[0]);
    }

    document.addEventListener("click", handleClick, true);
    return () => document.removeEventListener("click", handleClick, true);
  }, [router]);

  return (
    <>
      {children}
      {loading ? <WebsiteNavigationLoader logoUrl={logoUrl} /> : null}
    </>
  );
}
