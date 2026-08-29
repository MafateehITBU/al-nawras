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

function resolveHref(href: GuardedLinkProps["href"]): string {
  if (typeof href === "string") return href;
  if ("pathname" in href && href.pathname) return href.pathname;
  return "";
}

export function GuardedLink({ href, onClick, ...props }: GuardedLinkProps) {
  const { confirmLeave, setIsDirty } = useUnsavedChangesContext();
  const router = useRouter();

  const handleClick = useCallback(
    async (event: MouseEvent<HTMLAnchorElement>) => {
      const opensNewTab =
        event.metaKey ||
        event.ctrlKey ||
        event.shiftKey ||
        event.button === 1 ||
        props.target === "_blank";

      if (opensNewTab) {
        onClick?.(event);
        return;
      }

      onClick?.(event);
      if (event.defaultPrevented) return;

      event.preventDefault();

      const canLeave = await confirmLeave();
      if (!canLeave) return;

      setIsDirty(false);
      router.push(resolveHref(href));
    },
    [confirmLeave, href, onClick, props.target, router, setIsDirty],
  );

  return (
    <Link href={href} data-guarded-link onClick={handleClick} {...props} />
  );
}
