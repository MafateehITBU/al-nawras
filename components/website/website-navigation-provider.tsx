"use client";

import { WebsiteNavigationLoader } from "@/components/website/website-navigation-loader";
import { isInternalWebsiteLink } from "@/lib/website/internal-link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useRef, useState, type ReactNode } from "react";

const LOADER_TIMEOUT_MS = 15000;

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

  useEffect(() => {
    setLoading(false);

    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
  }, [pathname]);

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
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

      if (
        nextUrl.pathname === currentUrl.pathname &&
        nextUrl.search === currentUrl.search &&
        nextUrl.hash === currentUrl.hash
      ) {
        return;
      }

      event.preventDefault();
      setLoading(true);

      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }

      timeoutRef.current = setTimeout(() => {
        setLoading(false);
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
