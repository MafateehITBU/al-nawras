import Link from "next/link";

export default function AdminNotFound() {
  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center px-4 py-16 text-center">
      <p className="text-sm font-semibold uppercase tracking-[0.2em] text-dashboard-primary">
        404
      </p>
      <h1 className="mt-3 text-2xl font-semibold text-dashboard-text">Page not found</h1>
      <p className="mt-2 max-w-md text-sm text-dashboard-text-muted">
        This dashboard page does not exist, or the link you followed is incorrect.
      </p>
      <Link
        href="/admin"
        className="mt-8 inline-flex h-10 items-center justify-center rounded-lg bg-dashboard-primary px-4 text-sm font-medium text-white hover:bg-dashboard-primary-hover focus-ring"
      >
        Return to dashboard
      </Link>
    </div>
  );
}
