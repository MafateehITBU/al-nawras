"use client";

import { cn } from "@/lib/utils";
import { forwardRef, type InputHTMLAttributes } from "react";

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  error?: boolean;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, error, ...props }, ref) => (
    <input
      ref={ref}
      className={cn(
        "h-10 w-full rounded-lg border bg-dashboard-surface px-3 text-sm text-dashboard-text transition-colors placeholder:text-dashboard-text-muted focus-ring disabled:cursor-not-allowed disabled:bg-dashboard-bg disabled:text-dashboard-disabled",
        error ? "border-dashboard-error" : "border-dashboard-border",
        className,
      )}
      {...props}
    />
  ),
);

Input.displayName = "Input";
