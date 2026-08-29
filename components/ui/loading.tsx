import { cn } from "@/lib/utils";
import { Loader2 } from "lucide-react";

export function Spinner({ className }: { className?: string }) {
  return (
    <Loader2
      className={cn("size-5 animate-spin text-dashboard-primary", className)}
      aria-label="Loading"
    />
  );
}

export function LoadingState({
  message = "Loading…",
}: {
  message?: string;
}) {
  return (
    <div className="flex flex-col items-center justify-center gap-3 py-16 text-dashboard-text-muted">
      <Spinner />
      <p className="text-sm">{message}</p>
    </div>
  );
}

export function Skeleton({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "animate-pulse rounded-md bg-dashboard-border/60",
        className,
      )}
      aria-hidden
    />
  );
}
