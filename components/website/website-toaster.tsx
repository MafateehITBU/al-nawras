import { Toaster } from "sonner";

export function WebsiteToaster() {
  return (
    <Toaster
      position="top-center"
      toastOptions={{
        classNames: {
          toast: "website-body border border-website-border bg-website-surface text-website-text shadow-lg",
          success: "border-website-success/30",
          error: "border-website-error/30",
        },
      }}
    />
  );
}
