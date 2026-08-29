"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
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

  useEffect(() => {
    const handler = (event: BeforeUnloadEvent) => {
      if (!isDirty) return;
      event.preventDefault();
      event.returnValue = "";
    };

    window.addEventListener("beforeunload", handler);
    return () => window.removeEventListener("beforeunload", handler);
  }, [isDirty]);

  const confirmLeave = useCallback(async () => {
    if (!isDirty) return true;
    return confirmUnsaved();
  }, [isDirty, confirmUnsaved]);

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
