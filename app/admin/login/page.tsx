import { Suspense } from "react";
import { LoginForm } from "@/components/dashboard/login-form";
import { LoadingState } from "@/components/ui/loading";

export default function AdminLoginPage() {
  return (
    <Suspense fallback={<LoadingState message="Loading login…" />}>
      <LoginForm />
    </Suspense>
  );
}
