import type { SupportedLocale } from "@/lib/i18n/config";

export interface WebsiteDictionary {
  nav: {
    home: string;
    about: string;
    services: string;
    blog: string;
    contact: string;
  };
  footer: {
    tagline: string;
    company: string;
    quickLinks: string;
    contactsUs: string;
    rights: string;
    allRightsReserved: string;
    termsAndConditions: string;
    privacyPolicy: string;
    copyrightPrefix: string;
  };
  actions: {
    getInTouch: string;
    menu: string;
    closeMenu: string;
    switchLanguage: string;
    noServicesInCategory: string;
    noServiceCategories: string;
  };
}

const dictionaries: Record<SupportedLocale, WebsiteDictionary> = {
  en: {
    nav: {
      home: "Home",
      about: "About Us",
      services: "Services",
      blog: "Blog",
      contact: "Contact Us",
    },
    footer: {
      tagline:
        "Professional intellectual property services across the Middle East.",
      company: "Company",
      quickLinks: "Quick Links",
      contactsUs: "Contacts us",
      rights: "All rights reserved.",
      allRightsReserved: "All Rights Reserved",
      termsAndConditions: "Terms and Conditions",
      privacyPolicy: "Privacy Policy",
      copyrightPrefix: "Copyright ©",
    },
    actions: {
      getInTouch: "Get in touch",
      menu: "Open menu",
      closeMenu: "Close menu",
      switchLanguage: "Switch language",
      noServicesInCategory: "No services in this category yet.",
      noServiceCategories: "No service categories available.",
    },
  },
  ar: {
    nav: {
      home: "الرئيسية",
      about: "من نحن",
      services: "الخدمات",
      blog: "المدونة",
      contact: "تواصل معنا",
    },
    footer: {
      tagline: "خدمات احترافية في الملكية الفكرية في جميع أنحاء الشرق الأوسط.",
      company: "الشركة",
      quickLinks: "روابط سريعة",
      contactsUs: "تواصل معنا",
      rights: "جميع الحقوق محفوظة.",
      allRightsReserved: "جميع الحقوق محفوظة",
      termsAndConditions: "الشروط والأحكام",
      privacyPolicy: "سياسة الخصوصية",
      copyrightPrefix: "حقوق النشر ©",
    },
    actions: {
      getInTouch: "تواصل معنا",
      menu: "فتح القائمة",
      closeMenu: "إغلاق القائمة",
      switchLanguage: "تغيير اللغة",
      noServicesInCategory: "لا توجد خدمات في هذه الفئة بعد.",
      noServiceCategories: "لا توجد فئات خدمات متاحة.",
    },
  },
};

export function getDictionary(locale: SupportedLocale): WebsiteDictionary {
  return dictionaries[locale];
}

export function getAlternateLocaleLabel(locale: SupportedLocale): string {
  return locale === "en" ? "AR" : "EN";
}
