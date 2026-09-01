import type { SupportedLocale } from "@/lib/i18n/config";

export function ContactMap({
  latitude,
  longitude,
  locale,
  title,
}: {
  latitude: number;
  longitude: number;
  locale: SupportedLocale;
  title: string;
}) {
  const hl = locale === "ar" ? "ar" : "en";
  const src = `https://maps.google.com/maps?q=${latitude},${longitude}&hl=${hl}&z=15&output=embed`;

  return (
    <iframe
      title={title}
      src={src}
      className="block h-72 w-full border-0 sm:h-80"
      loading="lazy"
      referrerPolicy="no-referrer-when-downgrade"
      allowFullScreen
    />
  );
}
