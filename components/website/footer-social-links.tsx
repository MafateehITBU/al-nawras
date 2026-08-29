"use client";

import { Icon } from "@iconify/react";
import { SocialPlatform } from "@prisma/client";

const SOCIAL_ICONS: Record<SocialPlatform, string> = {
  [SocialPlatform.FACEBOOK]: "mdi:facebook",
  [SocialPlatform.X]: "mdi:twitter",
  [SocialPlatform.INSTAGRAM]: "mdi:instagram",
  [SocialPlatform.LINKEDIN]: "mdi:linkedin",
};

const SOCIAL_LABELS: Record<SocialPlatform, string> = {
  [SocialPlatform.FACEBOOK]: "Facebook",
  [SocialPlatform.X]: "X",
  [SocialPlatform.INSTAGRAM]: "Instagram",
  [SocialPlatform.LINKEDIN]: "LinkedIn",
};

export function FooterSocialLinks({
  links,
}: {
  links: Array<{ id: string; platform: SocialPlatform; url: string }>;
}) {
  const activeLinks = links.filter((link) => link.url.trim().length > 0);
  if (activeLinks.length === 0) return null;

  return (
    <ul className="flex flex-wrap items-center gap-3" role="list">
      {activeLinks.map((link) => (
        <li key={link.id}>
          <a
            href={link.url}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={SOCIAL_LABELS[link.platform]}
            className="website-focus-ring inline-flex rounded-sm text-website-primary transition-opacity hover:opacity-80"
          >
            <Icon icon={SOCIAL_ICONS[link.platform]} className="size-5" aria-hidden />
          </a>
        </li>
      ))}
    </ul>
  );
}
