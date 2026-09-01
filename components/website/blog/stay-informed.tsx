"use client";

import { Icon } from "@iconify/react";
import { getBlogPageContent } from "@/lib/i18n/blog-page-content";
import type { SupportedLocale } from "@/lib/i18n/config";
import { emailSchema } from "@/lib/validations/common";
import { useState } from "react";

export function StayInformed({ locale }: { locale: SupportedLocale }) {
  const content = getBlogPageContent(locale);
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    setError(null);
    setMessage(null);

    const parsed = emailSchema.safeParse(email);
    if (!parsed.success) {
      setError(content.invalidEmail);
      return;
    }

    setMessage(content.newsletterPending);
    setEmail("");
  }

  return (
    <div className="overflow-hidden rounded-xl bg-website-footer p-5 text-white">
      <Icon icon="lucide:mail" className="size-6 text-website-secondary" aria-hidden />
      <h2 className="website-heading mt-3 text-lg font-bold">{content.stayInformed}</h2>
      <p className="website-body mt-2 text-sm leading-relaxed text-white/75">
        {content.stayInformedDescription}
      </p>

      <form onSubmit={handleSubmit} className="mt-4 space-y-3">
        <input
          type="email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          placeholder={content.emailPlaceholder}
          className="website-body w-full rounded-lg border border-white/10 bg-[#3A4853] px-3 py-2.5 text-sm text-white placeholder:text-white/50 website-focus-ring"
          aria-label={content.emailPlaceholder}
        />
        {error ? (
          <p className="website-body text-xs text-red-300" role="alert">
            {error}
          </p>
        ) : null}
        {message ? (
          <p className="website-body text-xs text-white/80" role="status">
            {message}
          </p>
        ) : null}
        <button
          type="submit"
          className="website-body w-full rounded-lg bg-website-secondary py-2.5 text-sm font-semibold uppercase tracking-wide text-white transition-colors hover:bg-website-secondary-hover website-focus-ring"
        >
          {content.subscribeNow}
        </button>
      </form>
    </div>
  );
}
