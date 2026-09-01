import { getTermsPageContent, type TermsSection } from "@/lib/i18n/terms-page-content";
import type { SupportedLocale } from "@/lib/i18n/config";

function TermsSectionBlock({ section, index }: { section: TermsSection; index: number }) {
  const isEven = index % 2 === 0;

  return (
    <section
      id={section.id}
      className={`scroll-mt-28 rounded-xl border border-website-border/60 p-5 sm:p-6 ${
        isEven ? "bg-website-surface" : "bg-website-bg/80"
      }`}
      aria-labelledby={`${section.id}-title`}
    >
      <div className="flex items-start gap-4">
        <span
          className="website-heading flex size-10 shrink-0 items-center justify-center rounded-lg bg-website-primary text-sm font-bold text-white sm:size-11 sm:text-base"
          aria-hidden="true"
        >
          {section.number.replace(".", "")}
        </span>

        <div className="min-w-0 flex-1 border-s-2 border-website-secondary/40 ps-4 sm:ps-5">
          <h2
            id={`${section.id}-title`}
            className="website-heading text-lg font-bold text-website-text sm:text-xl"
          >
            {section.title}
          </h2>

          <div className="website-body mt-3 space-y-3 text-sm font-light leading-relaxed text-website-hero-description sm:text-[0.9375rem]">
            {section.paragraphs.map((paragraph, paragraphIndex) => (
              <p key={paragraphIndex} className="whitespace-pre-line">
                {paragraph}
              </p>
            ))}

            {section.numberedItems ? (
              <ol className="list-decimal space-y-2 ps-5 marker:font-medium marker:text-website-primary">
                {section.numberedItems.map((item, itemIndex) => (
                  <li key={itemIndex}>{item}</li>
                ))}
              </ol>
            ) : null}

            {section.bullets ? (
              <ul className="space-y-2.5">
                {section.bullets.map((item, itemIndex) => (
                  <li key={itemIndex} className="flex gap-2.5">
                    <span
                      className="mt-2 size-1.5 shrink-0 rounded-full bg-website-primary"
                      aria-hidden
                    />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            ) : null}

            {section.contact ? (
              <div className="mt-4 rounded-xl border border-website-primary/20 bg-website-primary/5 p-4 sm:p-5">
                <p>
                  <a
                    href={`mailto:${section.contact.email}`}
                    className="font-medium text-website-primary transition-colors hover:text-website-primary-hover website-focus-ring rounded-sm"
                  >
                    {section.contact.email}
                  </a>
                </p>
                <ul className="mt-3 space-y-1.5">
                  {section.contact.phones.map((phone) => (
                    <li key={phone.label}>
                      <span className="font-medium text-website-text">{phone.label}: </span>
                      <a
                        href={phone.href}
                        className="text-website-primary transition-colors hover:text-website-primary-hover website-focus-ring rounded-sm"
                        dir="ltr"
                      >
                        {phone.value}
                      </a>
                    </li>
                  ))}
                </ul>
                {section.contact.closingLines.map((line) => (
                  <p key={line} className="mt-3 font-medium text-website-text">
                    {line}
                  </p>
                ))}
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </section>
  );
}

export function TermsContent({ locale }: { locale: SupportedLocale }) {
  const content = getTermsPageContent(locale);

  return (
    <section className="bg-website-bg py-12 sm:py-16 lg:py-20" aria-label={content.title}>
      <div className="website-container">
        <div className="mx-auto max-w-4xl space-y-5 sm:space-y-6">
          {content.sections.map((section, index) => (
            <TermsSectionBlock key={section.id} section={section} index={index} />
          ))}

          <p className="website-body pt-4 text-center text-sm font-medium text-website-text/80">
            {content.allRightsReserved}
          </p>
        </div>
      </div>
    </section>
  );
}
