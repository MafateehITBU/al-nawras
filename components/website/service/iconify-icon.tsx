"use client";

import { Icon } from "@iconify/react";
import { cn } from "@/lib/utils";

export function IconifyIcon({
  icon,
  className,
  "aria-hidden": ariaHidden = true,
}: {
  icon: string;
  className?: string;
  "aria-hidden"?: boolean;
}) {
  return (
    <Icon
      icon={icon}
      className={cn("shrink-0", className)}
      aria-hidden={ariaHidden}
    />
  );
}
