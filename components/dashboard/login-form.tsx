"use client";

import { Button } from "@/components/ui/button";
import { FormField } from "@/components/ui/form-field";
import { Input } from "@/components/ui/input";
import { Logo } from "@/components/dashboard/logo";
import { notify } from "@/lib/utils/notify";
import { signIn } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";

export function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") ?? "/admin";

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const result = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });

    setLoading(false);

    if (result?.error) {
      setError("Invalid email or password. Please try again.");
      notify.error("Login failed");
      return;
    }

    notify.success("Welcome back");
    router.push(callbackUrl);
    router.refresh();
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-dashboard-bg px-4 py-12">
      <div className="w-full max-w-md">
        <div className="mb-8 flex justify-center">
          <Logo href="/admin/login" />
        </div>

        <div className="rounded-xl border border-dashboard-border bg-dashboard-surface p-8 shadow-sm">
          <h1 className="text-2xl font-semibold text-dashboard-text">Sign in</h1>
          <p className="mt-1 text-sm text-dashboard-text-muted">
            Access the Al Nawras admin dashboard
          </p>

          <form onSubmit={handleSubmit} className="mt-8 space-y-5">
            <FormField label="Email" htmlFor="email" required error={error ?? undefined}>
              <Input
                id="email"
                type="email"
                autoComplete="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@alnawras.com"
                required
              />
            </FormField>

            <FormField label="Password" htmlFor="password" required>
              <Input
                id="password"
                type="password"
                autoComplete="current-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </FormField>

            {error && (
              <p className="text-sm text-dashboard-error" role="alert">
                {error}
              </p>
            )}

            <Button type="submit" className="w-full" loading={loading}>
              Sign in
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}
