"use client";

import { cn } from "@/lib/utils";
import { forwardRef, type ButtonHTMLAttributes } from "react";

export type ButtonVariant = "primary" | "secondary" | "outline" | "ghost" | "danger";
export type ButtonSize = "sm" | "md" | "lg" | "icon";

const variantClasses: Record<ButtonVariant, string> = {
  primary:
    "bg-dashboard-primary text-white hover:bg-dashboard-primary-hover disabled:bg-dashboard-disabled",
  secondary:
    "bg-dashboard-secondary text-dashboard-text hover:bg-dashboard-secondary-hover disabled:bg-dashboard-disabled",
  outline:
    "border border-dashboard-border bg-dashboard-surface text-dashboard-text hover:bg-dashboard-bg disabled:text-dashboard-disabled",
  ghost:
    "text-dashboard-text hover:bg-dashboard-bg disabled:text-dashboard-disabled",
  danger:
    "bg-dashboard-error text-white hover:bg-red-600 disabled:bg-dashboard-disabled",
};

const sizeClasses: Record<ButtonSize, string> = {
  sm: "h-8 px-3 text-xs gap-1.5",
  md: "h-10 px-4 text-sm gap-2",
  lg: "h-11 px-5 text-sm gap-2",
  icon: "h-10 w-10 p-0",
};

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  loading?: boolean;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant = "primary",
      size = "md",
      loading = false,
      disabled,
      children,
      ...props
    },
    ref,
  ) => (
    <button
      ref={ref}
      disabled={disabled || loading}
      className={cn(
        "inline-flex cursor-pointer items-center justify-center rounded-lg font-medium transition-colors focus-ring disabled:cursor-not-allowed",
        variantClasses[variant],
        sizeClasses[size],
        className,
      )}
      {...props}
    >
      {loading && (
        <span
          className="size-4 animate-spin rounded-full border-2 border-current border-t-transparent"
          aria-hidden
        />
      )}
      {children}
    </button>
  ),
);

Button.displayName = "Button";
