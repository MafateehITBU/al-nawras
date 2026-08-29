"use client";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { X } from "lucide-react";
import { useEffect, useRef, type ReactNode } from "react";

const sizeClasses = {
  sm: "w-[min(100vw-2rem,24rem)] h-[min(22rem,85vh)]",
  md: "w-[min(100vw-2rem,36rem)] h-[min(32rem,85vh)]",
  lg: "w-[min(100vw-2rem,42rem)] h-[min(36rem,85vh)]",
} as const;

export function Modal({
  open,
  onClose,
  title,
  description,
  children,
  footer,
  className,
  size = "md",
}: {
  open: boolean;
  onClose: () => void;
  title: string;
  description?: string;
  children: ReactNode;
  footer?: ReactNode;
  className?: string;
  size?: keyof typeof sizeClasses;
}) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const bodyRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    if (open && !dialog.open) {
      dialog.showModal();
      if (bodyRef.current) bodyRef.current.scrollTop = 0;
    } else if (!open && dialog.open) {
      dialog.close();
    }
  }, [open]);

  return (
    <dialog
      ref={dialogRef}
      className={cn(
        "rounded-xl border border-dashboard-border bg-dashboard-surface p-0 shadow-xl backdrop:bg-black/40",
        sizeClasses[size],
        className,
      )}
      onCancel={(e) => {
        e.preventDefault();
        onClose();
      }}
    >
      <div className="flex h-full flex-col">
        <div className="flex shrink-0 items-start justify-between border-b border-dashboard-border px-6 py-4">
          <div>
            <h2 className="text-lg font-semibold text-dashboard-text">{title}</h2>
            {description && (
              <p className="mt-1 text-sm text-dashboard-text-muted">{description}</p>
            )}
          </div>
          <button
            type="button"
            onClick={onClose}
            className="cursor-pointer rounded-md p-1 text-dashboard-text-muted hover:bg-dashboard-bg focus-ring"
            aria-label="Close"
          >
            <X className="size-4" />
          </button>
        </div>
        <div ref={bodyRef} className="min-h-0 flex-1 overflow-y-auto px-6 py-4">
          {children}
        </div>
        {footer && (
          <div className="flex shrink-0 justify-end gap-3 border-t border-dashboard-border px-6 py-4">
            {footer}
          </div>
        )}
      </div>
    </dialog>
  );
}

export function ModalFooter({
  onCancel,
  onSubmit,
  submitLabel = "Save",
  cancelLabel = "Cancel",
  loading = false,
  submitVariant = "primary" as const,
}: {
  onCancel: () => void;
  onSubmit: () => void;
  submitLabel?: string;
  cancelLabel?: string;
  loading?: boolean;
  submitVariant?: "primary" | "danger";
}) {
  return (
    <>
      <Button variant="outline" onClick={onCancel} disabled={loading}>
        {cancelLabel}
      </Button>
      <Button variant={submitVariant} onClick={onSubmit} loading={loading}>
        {submitLabel}
      </Button>
    </>
  );
}
