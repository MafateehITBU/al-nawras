import { cn } from "@/lib/utils";
import type { LabelHTMLAttributes } from "react";

export function Label({
  className,
  required,
  children,
  ...props
}: LabelHTMLAttributes<HTMLLabelElement> & { required?: boolean }) {
  return (
    <label
      className={cn(
        "text-sm font-medium text-dashboard-text",
        className,
      )}
      {...props}
    >
      {children}
      {required && (
        <span className="ml-0.5 text-dashboard-error" aria-hidden>
          *
        </span>
      )}
    </label>
  );
}

export function FormError({ message }: { message?: string }) {
  if (!message) return null;

  return (
    <p className="text-sm text-dashboard-error" role="alert">
      {message}
    </p>
  );
}

export function FormHint({ children }: { children: React.ReactNode }) {
  return (
    <p className="text-xs text-dashboard-text-muted">{children}</p>
  );
}

export function FormField({
  label,
  htmlFor,
  required,
  error,
  hint,
  children,
  className,
}: {
  label: string;
  htmlFor: string;
  required?: boolean;
  error?: string;
  hint?: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("space-y-1.5", className)}>
      <Label htmlFor={htmlFor} required={required}>
        {label}
      </Label>
      {children}
      {error ? <FormError message={error} /> : hint ? <FormHint>{hint}</FormHint> : null}
    </div>
  );
}
