"use client";

import Link from "next/link";
import { useUnsavedChangesContext } from "@/components/providers/unsaved-changes-provider";
import { useRouter } from "next/navigation";
import {
  type ComponentProps,
  type MouseEvent,
  useCallback,
} from "react";

type GuardedLinkProps = ComponentProps<typeof Link>;

export function GuardedLink({ href, onClick, ...props }: GuardedLinkProps) {
  const { confirmLeave } = useUnsavedChangesContext();
  const router = useRouter();

  const handleClick = useCallback(
    async (event: MouseEvent<HTMLAnchorElement>) => {
      onClick?.(event);
      if (event.defaultPrevented) return;

      const targetHref = typeof href === "string" ? href : href.pathname ?? "";
      const canLeave = await confirmLeave();

      if (!canLeave) {
        event.preventDefault();
        return;
      }

      if (event.metaKey || event.ctrlKey || event.shiftKey) return;

      event.preventDefault();
      router.push(targetHref);
    },
    [confirmLeave, href, onClick, router],
  );

  return <Link href={href} onClick={handleClick} {...props} />;
}
