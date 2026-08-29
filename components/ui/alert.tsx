import { cn } from "@/lib/utils";
import { AlertCircle, CheckCircle2, Info, AlertTriangle } from "lucide-react";
import type { HTMLAttributes } from "react";

const icons = {
  info: Info,
  success: CheckCircle2,
  warning: AlertTriangle,
  error: AlertCircle,
} as const;

export function Alert({
  variant = "info",
  title,
  children,
  className,
}: HTMLAttributes<HTMLDivElement> & {
  variant?: keyof typeof icons;
  title?: string;
}) {
  const Icon = icons[variant];

  const styles = {
    info: "border-dashboard-border bg-dashboard-bg text-dashboard-text",
    success: "border-green-200 bg-green-50 text-green-800",
    warning: "border-amber-200 bg-amber-50 text-amber-800",
    error: "border-red-200 bg-red-50 text-red-800",
  };

  return (
    <div
      role="alert"
      className={cn(
        "flex gap-3 rounded-lg border p-4 text-sm",
        styles[variant],
        className,
      )}
    >
      <Icon className="mt-0.5 size-4 shrink-0" aria-hidden />
      <div>
        {title && <p className="mb-1 font-medium">{title}</p>}
        {children && <div className="text-current/90">{children}</div>}
      </div>
    </div>
  );
}
