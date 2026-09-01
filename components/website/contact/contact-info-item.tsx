import { Icon } from "@iconify/react";

export function ContactInfoItem({
  icon,
  label,
  children,
}: {
  icon: string;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className="border-s-2 border-website-input-divider ps-5">
      <div className="flex items-center gap-2 text-website-primary">
        <Icon icon={icon} className="size-4 shrink-0" aria-hidden />
        <span className="website-body text-xs font-semibold uppercase tracking-[0.14em]">
          {label}
        </span>
      </div>
      <div className="website-body mt-2 text-base leading-relaxed text-website-text">{children}</div>
    </div>
  );
}
