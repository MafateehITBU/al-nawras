"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { useRouter } from "next/navigation";
import { useUnsavedChangesConfirm } from "@/components/providers/confirm-dialog-provider";

interface UnsavedChangesContextValue {
  isDirty: boolean;
  setIsDirty: (dirty: boolean) => void;
  confirmLeave: () => Promise<boolean>;
}

const UnsavedChangesContext = createContext<UnsavedChangesContextValue | null>(
  null,
);

export function UnsavedChangesProvider({ children }: { children: ReactNode }) {
  const [isDirty, setIsDirty] = useState(false);
  const confirmUnsaved = useUnsavedChangesConfirm();
  const router = useRouter();
  const isDirtyRef = useRef(isDirty);
  isDirtyRef.current = isDirty;

  useEffect(() => {
    const handler = (event: BeforeUnloadEvent) => {
      if (!isDirtyRef.current) return;
      event.preventDefault();
      event.returnValue = "";
    };

    window.addEventListener("beforeunload", handler);
    return () => window.removeEventListener("beforeunload", handler);
  }, []);

  const confirmLeave = useCallback(async () => {
    if (!isDirtyRef.current) return true;
    return confirmUnsaved();
  }, [confirmUnsaved]);

  useEffect(() => {
    if (!isDirty) return;

    window.history.pushState({ unsavedChangesGuard: true }, "", window.location.href);

    const onPopState = () => {
      window.history.pushState({ unsavedChangesGuard: true }, "", window.location.href);

      void confirmLeave().then((canLeave) => {
        if (!canLeave) return;

        setIsDirty(false);
        window.removeEventListener("popstate", onPopState);
        window.history.back();
      });
    };

    window.addEventListener("popstate", onPopState);
    return () => window.removeEventListener("popstate", onPopState);
  }, [confirmLeave, isDirty]);

  useEffect(() => {
    if (!isDirty) return;

    const handleDocumentClick = (event: MouseEvent) => {
      if (!isDirtyRef.current) return;

      const target = event.target;
      if (!(target instanceof Element)) return;

      const anchor = target.closest("a[href]");
      if (!(anchor instanceof HTMLAnchorElement)) return;
      if (anchor.hasAttribute("data-guarded-link")) return;
      if (anchor.target === "_blank") return;

      const href = anchor.getAttribute("href");
      if (!href || href.startsWith("#") || href.startsWith("mailto:") || href.startsWith("tel:")) {
        return;
      }

      let url: URL;
      try {
        url = new URL(href, window.location.origin);
      } catch {
        return;
      }

      if (url.origin !== window.location.origin) return;
      if (url.pathname === window.location.pathname && url.search === window.location.search) {
        return;
      }

      event.preventDefault();
      event.stopPropagation();

      void confirmLeave().then((canLeave) => {
        if (!canLeave) return;
        setIsDirty(false);
        router.push(`${url.pathname}${url.search}${url.hash}`);
      });
    };

    document.addEventListener("click", handleDocumentClick, true);
    return () => document.removeEventListener("click", handleDocumentClick, true);
  }, [confirmLeave, isDirty, router]);

  const value = useMemo(
    () => ({ isDirty, setIsDirty, confirmLeave }),
    [isDirty, confirmLeave],
  );

  return (
    <UnsavedChangesContext.Provider value={value}>
      {children}
    </UnsavedChangesContext.Provider>
  );
}

export function useUnsavedChangesContext() {
  const context = useContext(UnsavedChangesContext);
  if (!context) {
    throw new Error(
      "useUnsavedChangesContext must be used within UnsavedChangesProvider",
    );
  }
  return context;
}

/**
 * Hook for create/edit forms — tracks dirty state and provides leave confirmation.
 */
export function useUnsavedChanges(initialDirty = false) {
  const { setIsDirty, confirmLeave, isDirty } = useUnsavedChangesContext();

  useEffect(() => {
    setIsDirty(initialDirty);
  }, [initialDirty, setIsDirty]);

  const markDirty = useCallback(() => setIsDirty(true), [setIsDirty]);
  const markClean = useCallback(() => setIsDirty(false), [setIsDirty]);

  return { isDirty, markDirty, markClean, confirmLeave };
}
