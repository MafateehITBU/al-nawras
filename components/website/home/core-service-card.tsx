"use client";

import { IconifyIcon } from "@/components/website/service/iconify-icon";
import type { HomeCoreService } from "@/lib/i18n/home-page-content";

export function CoreServiceCard({ service }: { service: HomeCoreService }) {
  return (
    <article className="group flex h-[300px] w-[290px] flex-col border border-website-card-dark-border bg-website-card-dark p-5 transition-colors duration-300 hover:border-website-primary sm:h-[340px] sm:w-[328px] sm:p-6 lg:h-[376px] lg:w-[363px]">
      <div className="transition-transform duration-300 group-hover:-translate-y-1">
        <IconifyIcon
          icon={service.icon}
          className="size-9 text-website-primary sm:size-10"
        />
      </div>
      <h3 className="website-heading mt-4 text-xl font-semibold text-white sm:mt-5 sm:text-[1.375rem]">
        {service.title}
      </h3>
      <p className="website-body mt-3 flex-1 text-sm font-light leading-relaxed text-website-muted sm:text-[0.9375rem]">
        {service.description}
      </p>
    </article>
  );
}
