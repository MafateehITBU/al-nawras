"use client";

import { useUnsavedChangesContext } from "@/components/providers/unsaved-changes-provider";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useRef } from "react";

export function useFormGuard<T>(current: T, options?: { enabled?: boolean }) {
  const enabled = options?.enabled ?? true;
  const { setIsDirty, confirmLeave } = useUnsavedChangesContext();
  const router = useRouter();
  const baselineRef = useRef<string | null>(null);
  const serializedRef = useRef(JSON.stringify(current));
  serializedRef.current = JSON.stringify(current);

  useEffect(() => {
    if (!enabled) {
      baselineRef.current = null;
      setIsDirty(false);
      return;
    }

    const serialized = serializedRef.current;

    if (baselineRef.current === null) {
      baselineRef.current = serialized;
      setIsDirty(false);
      return;
    }

    setIsDirty(baselineRef.current !== serialized);
  }, [enabled, current, setIsDirty]);

  const resetBaseline = useCallback(() => {
    baselineRef.current = serializedRef.current;
    setIsDirty(false);
  }, [setIsDirty]);

  const navigateAway = useCallback(
    async (href: string) => {
      const serialized = serializedRef.current;
      const isDirty =
        enabled && baselineRef.current !== null && baselineRef.current !== serialized;

      if (isDirty) {
        const canLeave = await confirmLeave();
        if (!canLeave) return false;
      }

      setIsDirty(false);
      router.push(href);
      return true;
    },
    [confirmLeave, enabled, router, setIsDirty],
  );

  return { navigateAway, resetBaseline };
}
