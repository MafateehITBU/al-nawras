import type { SupportedLocale } from "@/lib/i18n/config";

export interface WhyChooseItem {
  title: string;
  description: string;
  icon: string;
}

export interface ServicePageContent {
  expertise: string;
  at: string;
  strategicBenefits: string;
  whyChooseTitle: string;
  relatedServices: string;
  categoryServicesTitle: string;
  categoryServicesDescription: string;
  viewService: string;
  serviceLabel: string;
  categoryCtaTitle: string;
  categoryCtaDescription: string;
  categoryCtaButton: string;
  whyChooseItems: WhyChooseItem[];
}

const servicePageContent: Record<SupportedLocale, ServicePageContent> = {
  en: {
    expertise: "EXPERTISE",
    at: "at",
    strategicBenefits: "Strategic Benefits",
    whyChooseTitle: "Why Choose Al Nawras",
    relatedServices: "Related Services",
    categoryServicesTitle: "Our Services",
    categoryServicesDescription:
      "Explore our specialised services within this category, each designed to protect and strengthen your intellectual property.",
    viewService: "View service",
    serviceLabel: "Service",
    categoryCtaTitle: "Ready to protect your intellectual property?",
    categoryCtaDescription:
      "Speak with our specialists to find the right service for your needs and start building a stronger protection strategy.",
    categoryCtaButton: "Get in touch",
    whyChooseItems: [
      {
        icon: "mdi:scale-balance",
        title: "Legal & Technical Expertise",
        description:
          "A specialized team combining legal expertise with the technical knowledge required to handle intellectual property matters with precision.",
      },
      {
        icon: "mdi:earth",
        title: "International Presence & Experience",
        description:
          "A comprehensive understanding of local and international regulations, with experience addressing intellectual property requirements across multiple markets.",
      },
      {
        icon: "mdi:clipboard-check-outline",
        title: "Attention to Every Detail",
        description:
          "We handle every matter with care, from legal and procedural details to technical requirements, ensuring the strongest possible protection.",
      },
      {
        icon: "mdi:handshake-outline",
        title: "Comprehensive Support",
        description:
          "We support you throughout the entire journey, from consultation and registration to ongoing follow-up and enforcement, with continuous assistance whenever needed.",
      },
    ],
  },
  ar: {
    expertise: "الخبرة",
    at: "في",
    strategicBenefits: "الفوائد الاستراتيجية",
    whyChooseTitle: "لماذا تختار النورس",
    relatedServices: "خدمات ذات صلة",
    categoryServicesTitle: "خدماتنا",
    categoryServicesDescription:
      "استكشف خدماتنا المتخصصة ضمن هذه الفئة، المصممة لحماية ملكيتك الفكرية وتعزيزها.",
    viewService: "عرض الخدمة",
    serviceLabel: "خدمة",
    categoryCtaTitle: "هل أنت مستعد لحماية ملكيتك الفكرية؟",
    categoryCtaDescription:
      "تحدث مع متخصصينا لاختيار الخدمة المناسبة لاحتياجاتك والبدء في بناء استراتيجية حماية أقوى.",
    categoryCtaButton: "تواصل معنا",
    whyChooseItems: [
      {
        icon: "mdi:scale-balance",
        title: "خبرة قانونية وتقنية",
        description:
          "فريق متخصص يجمع بين الخبرة القانونية والمعرفة الفنية اللازمة للتعامل مع قضايا الملكية الفكرية بدقة.",
      },
      {
        icon: "mdi:earth",
        title: "حضور وخبرة دولية",
        description:
          "فهم متكامل للتشريعات المحلية والدولية، مع خبرة في التعامل مع متطلبات الملكية الفكرية عبر أسواق متعددة.",
      },
      {
        icon: "mdi:clipboard-check-outline",
        title: "دقة في كل التفاصيل",
        description:
          "نتعامل مع كل ملف بعناية، من التفاصيل القانونية والإجرائية إلى المتطلبات الفنية، لضمان أفضل حماية ممكنة.",
      },
      {
        icon: "mdi:handshake-outline",
        title: "دعم متكامل",
        description:
          "نرافقك في مختلف مراحل العمل، من الاستشارة والتسجيل إلى المتابعة والإنفاذ، مع دعم مستمر عند الحاجة.",
      },
    ],
  },
};

export function getServicePageContent(locale: SupportedLocale): ServicePageContent {
  return servicePageContent[locale];
}

export function getCompanyDisplayName(locale: SupportedLocale): string {
  return locale === "ar" ? "النورس للملكية الفكرية" : "Al Nawras Intellectual Property";
}
