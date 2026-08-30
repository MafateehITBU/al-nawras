import type { HomeHeroStat } from "@/lib/i18n/home-page-content";

export function HeroStats({ stats }: { stats: HomeHeroStat[] }) {
  return (
    <dl className="mt-8 grid grid-cols-2 gap-x-4 gap-y-5 overflow-visible sm:mt-10 sm:grid-cols-4 sm:gap-x-6 lg:mt-8 lg:gap-x-8">
      {stats.map((stat) => (
        <div key={stat.title} className="min-w-0 overflow-visible">
          <dt className="website-heading text-base font-semibold leading-snug text-website-primary sm:text-lg lg:whitespace-nowrap">
            {stat.title}
          </dt>
          <dd className="website-body mt-1 text-sm font-light text-website-hero-description sm:text-[0.9375rem]">
            {stat.description}
          </dd>
        </div>
      ))}
    </dl>
  );
}
