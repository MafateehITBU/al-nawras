"use client";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from "react";

export interface ConfirmOptions {
  title: string;
  message: string;
  confirmLabel?: string;
  cancelLabel?: string;
  variant?: "default" | "danger";
}

interface ConfirmState extends ConfirmOptions {
  resolve: (value: boolean) => void;
}

const ConfirmContext = createContext<{
  confirm: (options: ConfirmOptions) => Promise<boolean>;
} | null>(null);

export function ConfirmDialogProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<ConfirmState | null>(null);
  const dialogRef = useRef<HTMLDialogElement>(null);

  const confirm = useCallback((options: ConfirmOptions) => {
    return new Promise<boolean>((resolve) => {
      setState({ ...options, resolve });
    });
  }, []);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    if (state) {
      if (!dialog.open) dialog.showModal();
    } else if (dialog.open) {
      dialog.close();
    }
  }, [state]);

  const close = (result: boolean) => {
    state?.resolve(result);
    setState(null);
  };

  return (
    <ConfirmContext.Provider value={{ confirm }}>
      {children}
      <dialog
        ref={dialogRef}
        className="w-[min(100vw-2rem,24rem)] rounded-xl border border-dashboard-border bg-dashboard-surface p-0 shadow-xl backdrop:bg-black/40"
        onCancel={(e) => {
          e.preventDefault();
          close(false);
        }}
      >
        {state && (
          <div className="p-6">
            <div className="flex items-start justify-between gap-4">
              <div>
                <h2 className="text-lg font-semibold text-dashboard-text">
                  {state.title}
                </h2>
                <p className="mt-2 text-sm text-dashboard-text-muted">
                  {state.message}
                </p>
              </div>
              <button
                type="button"
                onClick={() => close(false)}
                className="rounded-md p-1 text-dashboard-text-muted hover:bg-dashboard-bg focus-ring"
                aria-label="Close dialog"
              >
                <X className="size-4" />
              </button>
            </div>
            <div className="mt-6 flex justify-end gap-3">
              <Button variant="outline" onClick={() => close(false)}>
                {state.cancelLabel ?? "Cancel"}
              </Button>
              <Button
                variant={state.variant === "danger" ? "danger" : "primary"}
                onClick={() => close(true)}
              >
                {state.confirmLabel ?? "Confirm"}
              </Button>
            </div>
          </div>
        )}
      </dialog>
    </ConfirmContext.Provider>
  );
}

export function useConfirm() {
  const context = useContext(ConfirmContext);
  if (!context) {
    throw new Error("useConfirm must be used within ConfirmDialogProvider");
  }
  return context;
}

export function useDeleteConfirm() {
  const { confirm } = useConfirm();

  return useCallback(
    (itemName = "this item") =>
      confirm({
        title: "Delete confirmation",
        message: `Are you sure you want to delete ${itemName}? This action cannot be undone.`,
        confirmLabel: "Delete",
        cancelLabel: "Cancel",
        variant: "danger",
      }),
    [confirm],
  );
}

/** Pre-configured unsaved changes dialog */
export function useUnsavedChangesConfirm() {
  const { confirm } = useConfirm();

  return useCallback(
    () =>
      confirm({
        title: "Unsaved changes",
        message:
          "You have unsaved changes. Are you sure you want to leave? Your changes will be lost.",
        confirmLabel: "Leave",
        cancelLabel: "Stay",
        variant: "danger",
      }),
    [confirm],
  );
}
