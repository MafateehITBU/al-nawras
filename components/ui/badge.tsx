import { cn } from "@/lib/utils";
import type { HTMLAttributes } from "react";

export function Badge({
  variant = "default",
  className,
  children,
  ...props
}: HTMLAttributes<HTMLSpanElement> & {
  variant?: "default" | "success" | "warning" | "error" | "secondary";
}) {
  const variants = {
    default: "bg-dashboard-bg text-dashboard-text",
    success: "bg-green-50 text-green-700",
    warning: "bg-amber-50 text-amber-700",
    error: "bg-red-50 text-red-700",
    secondary: "bg-orange-50 text-orange-700",
  };

  return (
    <span
      className={cn(
        "inline-flex items-center rounded-md px-2 py-0.5 text-xs font-medium",
        variants[variant],
        className,
      )}
      {...props}
    >
      {children}
    </span>
  );
}
