"use client";

import { cn } from "@/lib/utils";
import { forwardRef, type TextareaHTMLAttributes } from "react";

export interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  error?: boolean;
}

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, error, ...props }, ref) => (
    <textarea
      ref={ref}
      className={cn(
        "min-h-24 w-full rounded-lg border bg-dashboard-surface px-3 py-2 text-sm text-dashboard-text transition-colors placeholder:text-dashboard-text-muted focus-ring disabled:cursor-not-allowed disabled:bg-dashboard-bg",
        error ? "border-dashboard-error" : "border-dashboard-border",
        className,
      )}
      {...props}
    />
  ),
);

Textarea.displayName = "Textarea";
