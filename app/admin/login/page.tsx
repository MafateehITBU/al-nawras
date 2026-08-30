import { Suspense } from "react";
import { LoginForm } from "@/components/dashboard/login-form";
import { LoadingState } from "@/components/ui/loading";
import { auth } from "@/lib/auth/config";
import { redirect } from "next/navigation";

export default async function AdminLoginPage() {
  const session = await auth();
  if (session?.admin?.isActive) {
    redirect("/admin");
  }

  return (
    <Suspense fallback={<LoadingState message="Loading login…" />}>
      <LoginForm />
    </Suspense>
  );
}
