import Link from "next/link";
import { cn } from "@/lib/utils";

type SecondaryButtonProps = {
  href: string;
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
};

export function SecondaryButton({ href, children, className, onClick }: SecondaryButtonProps) {
  return (
    <Link
      href={href}
      onClick={onClick}
      className={cn(
        "website-secondary-btn website-body inline-flex items-center justify-center rounded-md px-5 py-2.5 text-base font-medium text-website-primary website-focus-ring",
        className,
      )}
    >
      <span className="relative z-[1]">{children}</span>
    </Link>
  );
}
