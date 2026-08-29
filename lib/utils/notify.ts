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
      toast.error(error.message);
      return;
    }
    toast.error(fallback);
  },
};
