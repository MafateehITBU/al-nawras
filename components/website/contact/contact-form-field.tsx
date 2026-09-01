import { cn } from "@/lib/utils";
import { forwardRef, type SelectHTMLAttributes, type TextareaHTMLAttributes } from "react";

const underlineClassName =
  "website-body w-full border-0 border-b-2 border-website-input-divider bg-transparent px-0 py-2 text-base text-website-text placeholder:text-website-muted transition-colors focus:border-website-primary focus:outline-none website-focus-ring rounded-none";

export const ContactUnderlineInput = forwardRef<
  HTMLInputElement,
  React.InputHTMLAttributes<HTMLInputElement>
>(function ContactUnderlineInput({ className, ...props }, ref) {
  return <input ref={ref} className={cn(underlineClassName, className)} {...props} />;
});

export const ContactUnderlineSelect = forwardRef<
  HTMLSelectElement,
  SelectHTMLAttributes<HTMLSelectElement>
>(function ContactUnderlineSelect({ className, children, ...props }, ref) {
  return (
    <select ref={ref} className={cn(underlineClassName, "cursor-pointer", className)} {...props}>
      {children}
    </select>
  );
});

export const ContactUnderlineTextarea = forwardRef<
  HTMLTextAreaElement,
  TextareaHTMLAttributes<HTMLTextAreaElement>
>(function ContactUnderlineTextarea({ className, ...props }, ref) {
  return (
    <textarea
      ref={ref}
      rows={4}
      className={cn(underlineClassName, "resize-y min-h-[6rem]", className)}
      {...props}
    />
  );
});

export function ContactFormField({
  label,
  htmlFor,
  required,
  error,
  children,
  className,
}: {
  label: string;
  htmlFor: string;
  required?: boolean;
  error?: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("space-y-1.5", className)}>
      <label htmlFor={htmlFor} className="website-body text-sm font-semibold text-website-text">
        {label}
        {required ? (
          <span className="text-website-primary" aria-hidden>
            *
          </span>
        ) : null}
      </label>
      {children}
      {error ? (
        <p className="website-body text-sm text-website-error" role="alert">
          {error}
        </p>
      ) : null}
    </div>
  );
}
