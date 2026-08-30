import { CoreValueItem } from "@/components/website/home/core-value-item";
import type { HomeCoreValue } from "@/lib/i18n/home-page-content";

export function CoreValues({
  title,
  values,
}: {
  title: string;
  values: HomeCoreValue[];
}) {
  return (
    <aside className="border-s-4 border-s-website-secondary bg-website-bg p-6 sm:p-8">
      <h3 className="website-heading text-[1.375rem] font-bold text-website-text sm:text-2xl">
        {title}
      </h3>
      <ul className="mt-6 space-y-7 sm:mt-8 sm:space-y-8" role="list">
        {values.map((value) => (
          <li key={value.title}>
            <CoreValueItem value={value} />
          </li>
        ))}
      </ul>
    </aside>
  );
}
