"use client";

import { SessionProvider } from "next-auth/react";
import { Toaster } from "sonner";
import { ConfirmDialogProvider } from "@/components/providers/confirm-dialog-provider";
import { UnsavedChangesProvider } from "@/components/providers/unsaved-changes-provider";

export function DashboardProviders({ children }: { children: React.ReactNode }) {
  return (
    <SessionProvider>
      <ConfirmDialogProvider>
        <UnsavedChangesProvider>
          {children}
          <Toaster
            position="top-right"
            richColors
            closeButton
            toastOptions={{
              classNames: {
                toast: "border border-dashboard-border shadow-lg",
              },
            }}
          />
        </UnsavedChangesProvider>
      </ConfirmDialogProvider>
    </SessionProvider>
  );
}
