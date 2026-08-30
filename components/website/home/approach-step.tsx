import type { HomeApproachStep } from "@/lib/i18n/home-page-content";
import type { SupportedLocale } from "@/lib/i18n/config";

const APPROACH_LINE_COLOR = "#27A8E133";

function formatStepNumber(number: string) {
  return String(Number.parseInt(number, 10));
}

function StepBadge({ number }: { number: string }) {
  return (
    <div className="flex size-10 items-center justify-center rounded-md bg-website-primary text-sm font-semibold text-white shadow-sm sm:size-11">
      {formatStepNumber(number)}
    </div>
  );
}

function StepLabel({
  step,
  locale,
}: {
  step: HomeApproachStep;
  locale: SupportedLocale;
}) {
  return (
    <span
      className={`website-body text-sm font-semibold text-website-primary sm:text-base ${
        locale === "en" ? "uppercase tracking-[0.1em]" : "tracking-wide"
      }`}
    >
      {step.label}
    </span>
  );
}

function StepDescriptionOnLine({ description }: { description: string }) {
  return (
    <p className="website-body bg-website-bg px-3 py-2 text-center text-sm font-light leading-relaxed text-website-hero-description sm:px-4 sm:text-[0.9375rem]">
      {description}
    </p>
  );
}

export function ApproachStep({
  step,
  locale,
}: {
  step: HomeApproachStep;
  locale: SupportedLocale;
}) {
  if (step.position === "above") {
    return (
      <article className="flex h-full min-h-[280px] flex-col items-center xl:min-h-[300px]">
        <div className="flex flex-1 flex-col items-center justify-end gap-2 pb-2">
          <StepBadge number={step.number} />
          <div className="relative z-20 text-center">
            <StepLabel step={step} locale={locale} />
            <h3 className="website-heading mt-1 text-base font-semibold text-website-text">
              {step.title}
            </h3>
          </div>
        </div>

        <div className="relative z-10 w-full shrink-0 px-1">
          <StepDescriptionOnLine description={step.description} />
        </div>

        <div className="flex-1" aria-hidden="true" />
      </article>
    );
  }

  return (
    <article className="flex h-full min-h-[280px] flex-col items-center xl:min-h-[300px]">
      <div className="flex-1" aria-hidden="true" />

      <div className="relative z-10 shrink-0">
        <StepBadge number={step.number} />
      </div>

      <div className="flex flex-1 flex-col pt-4 text-center sm:pt-5">
        <StepLabel step={step} locale={locale} />
        <h3 className="website-heading mt-1 text-base font-semibold text-website-text">
          {step.title}
        </h3>
        <p className="website-body mt-2 text-sm font-light leading-relaxed text-website-hero-description sm:text-[0.9375rem]">
          {step.description}
        </p>
      </div>
    </article>
  );
}

export function ApproachStepMobile({
  step,
  locale,
}: {
  step: HomeApproachStep;
  locale: SupportedLocale;
}) {
  return (
    <article className="relative flex gap-4 ps-2">
      <div className="flex flex-col items-center">
        <StepBadge number={step.number} />
        <div
          className="mt-2 h-full w-px flex-1"
          style={{ backgroundColor: APPROACH_LINE_COLOR }}
          aria-hidden="true"
        />
      </div>
      <div className="pb-8">
        <StepLabel step={step} locale={locale} />
        <h3 className="website-heading mt-1 text-base font-semibold text-website-text">
          {step.title}
        </h3>
        <p className="website-body mt-2 text-sm font-light leading-relaxed text-website-hero-description sm:text-[0.9375rem]">
          {step.description}
        </p>
      </div>
    </article>
  );
}

export { APPROACH_LINE_COLOR };
