import Link from "next/link";
import { cn } from "@/lib/utils";
import type { ButtonHTMLAttributes } from "react";

const primaryButtonClassName =
  "website-primary-btn website-body inline-flex items-center justify-center whitespace-nowrap rounded-md bg-website-primary px-5 py-2.5 text-base font-medium uppercase tracking-wide text-white transition-colors hover:bg-website-primary-hover website-focus-ring disabled:cursor-not-allowed disabled:opacity-60";

type PrimaryButtonProps = {
  href: string;
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
};

export function PrimaryButton({ href, children, className, onClick }: PrimaryButtonProps) {
  return (
    <Link href={href} onClick={onClick} className={cn(primaryButtonClassName, className)}>
      <span className="relative z-[1] inline-flex items-center gap-2 whitespace-nowrap">
        {children}
      </span>
    </Link>
  );
}

export function PrimarySubmitButton({
  children,
  className,
  ...props
}: ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button type="submit" className={cn(primaryButtonClassName, className)} {...props}>
      <span className="relative z-[1] inline-flex items-center gap-2 whitespace-nowrap">
        {children}
      </span>
    </button>
  );
}
