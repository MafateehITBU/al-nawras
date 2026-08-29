import { cn } from "@/lib/utils";
import { GuardedLink } from "@/components/dashboard/guarded-link";
import { ChevronRight } from "lucide-react";

export interface BreadcrumbItem {
  label: string;
  href?: string;
}

export function PageHeader({
  title,
  description,
  breadcrumbs,
  actions,
}: {
  title: string;
  description?: string;
  breadcrumbs?: BreadcrumbItem[];
  actions?: React.ReactNode;
}) {
  return (
    <div className="mb-6">
      {breadcrumbs && breadcrumbs.length > 0 && (
        <Breadcrumbs items={breadcrumbs} className="mb-3" />
      )}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight text-dashboard-text">
            {title}
          </h1>
          {description && (
            <p className="mt-1 text-sm text-dashboard-text-muted">{description}</p>
          )}
        </div>
        {actions && <div className="flex shrink-0 items-center gap-2">{actions}</div>}
      </div>
    </div>
  );
}

export function SectionHeader({
  title,
  description,
  actions,
}: {
  title: string;
  description?: string;
  actions?: React.ReactNode;
}) {
  return (
    <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
      <div>
        <h2 className="text-lg font-semibold text-dashboard-text">{title}</h2>
        {description && (
          <p className="mt-0.5 text-sm text-dashboard-text-muted">{description}</p>
        )}
      </div>
      {actions}
    </div>
  );
}

export function Breadcrumbs({
  items,
  className,
}: {
  items: BreadcrumbItem[];
  className?: string;
}) {
  return (
    <nav aria-label="Breadcrumb" className={cn("flex items-center gap-1 text-sm", className)}>
      {items.map((item, index) => {
        const isLast = index === items.length - 1;

        return (
          <span key={`${item.label}-${index}`} className="flex items-center gap-1">
            {index > 0 && (
              <ChevronRight className="size-3.5 text-dashboard-text-muted" aria-hidden />
            )}
            {item.href && !isLast ? (
              <GuardedLink
                href={item.href}
                className="text-dashboard-text-muted transition-colors hover:text-dashboard-primary"
              >
                {item.label}
              </GuardedLink>
            ) : (
              <span
                className={cn(
                  isLast ? "font-medium text-dashboard-text" : "text-dashboard-text-muted",
                )}
                aria-current={isLast ? "page" : undefined}
              >
                {item.label}
              </span>
            )}
          </span>
        );
      })}
    </nav>
  );
}
