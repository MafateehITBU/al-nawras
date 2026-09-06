import { Icon } from "@iconify/react";
import type { SupportedLocale } from "@/lib/i18n/config";

const WHATSAPP_NUMBER = "971564633944";
const WHATSAPP_HREF = `https://wa.me/${WHATSAPP_NUMBER}`;

export function WhatsAppFloat({ locale }: { locale: SupportedLocale }) {
  const label = locale === "ar" ? "تواصل عبر واتساب" : "Chat on WhatsApp";

  return (
    <a
      href={WHATSAPP_HREF}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      className="website-whatsapp-float website-focus-ring fixed bottom-5 z-[90] inline-flex size-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-lg transition-transform hover:scale-105 hover:bg-[#1ebe57] active:scale-95 end-4 sm:bottom-6 sm:end-6 sm:size-16"
    >
      <Icon icon="mdi:whatsapp" className="size-8 sm:size-9" aria-hidden />
    </a>
  );
}
