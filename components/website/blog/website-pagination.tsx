import { Icon } from "@iconify/react";
import { cn } from "@/lib/utils";
import Link from "next/link";

export function WebsitePagination({
  page,
  totalPages,
  buildHref,
  previousLabel,
  nextLabel,
  className,
}: {
  page: number;
  totalPages: number;
  buildHref: (page: number) => string;
  previousLabel: string;
  nextLabel: string;
  className?: string;
}) {
  if (totalPages <= 1) return null;

  const pages = getVisiblePages(page, totalPages);

  return (
    <nav
      className={cn("flex items-center justify-center gap-2", className)}
      aria-label="Pagination"
    >
      <PaginationLink
        href={buildHref(page - 1)}
        disabled={page <= 1}
        ariaLabel={previousLabel}
        className="size-9"
      >
        <Icon icon="lucide:chevron-left" className="size-4 rtl:rotate-180" aria-hidden />
      </PaginationLink>

      {pages.map((item, index) =>
        item === "ellipsis" ? (
          <span
            key={`ellipsis-${index}`}
            className="website-body px-1 text-sm text-website-text"
            aria-hidden
          >
            …
          </span>
        ) : (
          <PaginationLink
            key={item}
            href={buildHref(item)}
            active={item === page}
            ariaLabel={`Page ${item}`}
            className="size-9"
          >
            {item}
          </PaginationLink>
        ),
      )}

      <PaginationLink
        href={buildHref(page + 1)}
        disabled={page >= totalPages}
        ariaLabel={nextLabel}
        className="size-9"
      >
        <Icon icon="lucide:chevron-right" className="size-4 rtl:rotate-180" aria-hidden />
      </PaginationLink>
    </nav>
  );
}

function PaginationLink({
  href,
  children,
  active,
  disabled,
  ariaLabel,
  className,
}: {
  href: string;
  children: React.ReactNode;
  active?: boolean;
  disabled?: boolean;
  ariaLabel: string;
  className?: string;
}) {
  if (disabled) {
    return (
      <span
        className={cn(
          "website-body inline-flex items-center justify-center rounded-md border border-website-border text-sm text-website-muted opacity-40",
          className,
        )}
        aria-hidden
      >
        {children}
      </span>
    );
  }

  return (
    <Link
      href={href}
      aria-label={ariaLabel}
      aria-current={active ? "page" : undefined}
      className={cn(
        "website-body inline-flex items-center justify-center rounded-md border text-sm font-medium transition-colors website-focus-ring",
        active
          ? "border-website-primary bg-website-primary text-white"
          : "border-website-border bg-transparent text-website-text hover:border-website-primary hover:text-website-primary",
        className,
      )}
    >
      {children}
    </Link>
  );
}

function getVisiblePages(page: number, totalPages: number): Array<number | "ellipsis"> {
  if (totalPages <= 5) {
    return Array.from({ length: totalPages }, (_, index) => index + 1);
  }

  const pages: Array<number | "ellipsis"> = [1];

  if (page > 3) pages.push("ellipsis");

  const start = Math.max(2, page - 1);
  const end = Math.min(totalPages - 1, page + 1);

  for (let current = start; current <= end; current += 1) {
    pages.push(current);
  }

  if (page < totalPages - 2) pages.push("ellipsis");

  pages.push(totalPages);
  return pages;
}
