"use client";

import { cn } from "@/lib/utils";
import { forwardRef, type InputHTMLAttributes } from "react";

export const Checkbox = forwardRef<
  HTMLInputElement,
  InputHTMLAttributes<HTMLInputElement>
>(({ className, ...props }, ref) => (
  <input
    ref={ref}
    type="checkbox"
    className={cn(
      "size-4 rounded border-dashboard-border text-dashboard-primary focus-ring disabled:cursor-not-allowed",
      className,
    )}
    {...props}
  />
));

Checkbox.displayName = "Checkbox";

export const Switch = forwardRef<
  HTMLInputElement,
  InputHTMLAttributes<HTMLInputElement>
>(({ className, ...props }, ref) => (
  <input
    ref={ref}
    type="checkbox"
    role="switch"
    className={cn(
      "h-5 w-9 cursor-pointer appearance-none rounded-full bg-dashboard-border transition-colors checked:bg-dashboard-primary focus-ring disabled:cursor-not-allowed",
      className,
    )}
    {...props}
  />
));

Switch.displayName = "Switch";
