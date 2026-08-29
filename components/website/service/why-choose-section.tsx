import { IconifyIcon } from "@/components/website/service/iconify-icon";
import {
  serviceDescriptionClassName,
  serviceSectionClassName,
} from "@/components/website/service/service-section-styles";
import { getServicePageContent } from "@/lib/i18n/service-page-content";
import type { SupportedLocale } from "@/lib/i18n/config";

export function WhyChooseSection({ locale }: { locale: SupportedLocale }) {
  const content = getServicePageContent(locale);

  return (
    <section
      className={`border-b border-[#D8E0E6] ${serviceSectionClassName}`}
      aria-labelledby="why-choose-title"
    >
      <div className="website-container">
        <h2
          id="why-choose-title"
          className="website-heading text-2xl font-bold text-website-text sm:text-3xl"
        >
          {content.whyChooseTitle}
        </h2>

        <ul
          className="mt-6 grid items-stretch gap-8 sm:mt-8 sm:grid-cols-2 lg:grid-cols-4 lg:gap-20 xl:gap-24"
          role="list"
        >
          {content.whyChooseItems.map((item) => (
            <li key={item.title} className="h-full">
              <article className="flex h-full flex-col">
                <IconifyIcon icon={item.icon} className="size-8 shrink-0 text-website-secondary" />
                <div className="mt-2 flex min-h-[4.5rem] flex-col justify-end lg:min-h-[5rem]">
                  <h3 className="website-heading text-lg font-semibold text-website-text">
                    {item.title}
                  </h3>
                </div>
                <p className={`mt-1.5 text-base ${serviceDescriptionClassName}`}>
                  {item.description}
                </p>
              </article>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
