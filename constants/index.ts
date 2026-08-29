export const APP_NAME = "Al Nawras Intellectual Property";

export const APP_NAME_AR = "النورس للملكية الفكرية";

export const APP_DESCRIPTION =
  "Professional intellectual property services in the Middle East.";

export const SUPPORTED_LOCALES = ["en", "ar"] as const;
export type SupportedLocale = (typeof SUPPORTED_LOCALES)[number];

export const DEFAULT_LOCALE: SupportedLocale = "en";

export const LOCALE_LABELS: Record<SupportedLocale, string> = {
  en: "English",
  ar: "العربية",
};

export const RTL_LOCALES: SupportedLocale[] = ["ar"];

export function isRtlLocale(locale: string): boolean {
  return RTL_LOCALES.includes(locale as SupportedLocale);
}

export const PAGINATION = {
  DEFAULT_PAGE: 1,
  DEFAULT_LIMIT: 10,
  MAX_LIMIT: 100,
} as const;

export const FILE_UPLOAD = {
  MAX_IMAGE_SIZE_BYTES: 5 * 1024 * 1024, // 5 MB
  MAX_DOCUMENT_SIZE_BYTES: 10 * 1024 * 1024, // 10 MB
  ALLOWED_IMAGE_TYPES: ["image/jpeg", "image/png", "image/webp", "image/gif"],
  ALLOWED_DOCUMENT_TYPES: [
    "application/pdf",
    "application/msword",
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  ],
} as const;

export const CLOUDINARY_FOLDERS = {
  ADMIN_PROFILES: "al-nawras/admin-profiles",
  BLOG_IMAGES: "al-nawras/blogs/images",
  BLOG_ATTACHMENTS: "al-nawras/blogs/attachments",
  WEBSITE_LOGO: "al-nawras/website/logo",
  SERVICE_IMAGES: "al-nawras/services/images",
} as const;

export type CloudinaryFolder =
  (typeof CLOUDINARY_FOLDERS)[keyof typeof CLOUDINARY_FOLDERS];
