"use client";

import { toast } from "sonner";
import { ApiClientError } from "@/lib/api/client";

export const notify = {
  success: (message: string) => toast.success(message),
  error: (message: string) => toast.error(message),
  warning: (message: string) => toast.warning(message),
  info: (message: string) => toast.info(message),
  fromError: (error: unknown, fallback = "Something went wrong") => {
    if (error instanceof ApiClientError) {
      const fieldMessage = formatValidationDetails(error.details);
      toast.error(fieldMessage || error.message);
      return;
    }
    toast.error(fallback);
  },
};

function formatValidationDetails(details: unknown): string | null {
  if (!details || typeof details !== "object") return null;

  const fieldErrors = (details as { fieldErrors?: Record<string, string[] | undefined> })
    .fieldErrors;
  if (!fieldErrors) return null;

  const messages = Object.entries(fieldErrors).flatMap(([field, errors]) =>
    (errors ?? []).map((message) => `${field}: ${message}`),
  );

  return messages.length > 0 ? messages.join(" · ") : null;
}
