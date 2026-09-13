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
        title: "Legal & Commercial Expertise",
        description:
          "We combine legal knowledge with a practical understanding of corporate and commercial matters to provide advice aligned with your business needs.",
      },
      {
        icon: "mdi:earth",
        title: "International Presence & Experience",
        description:
          "A comprehensive understanding of local and international regulations, with experience addressing intellectual property requirements across multiple markets.",
      },
      {
        icon: "mdi:clipboard-check-outline",
        title: "Understanding of Regulatory Requirements",
        description:
          "We assist clients in navigating the legal and procedural requirements relevant to their businesses and corporate transactions.",
      },
      {
        icon: "mdi:handshake-outline",
        title: "Attention to Detail",
        description:
          "We carefully review the documents, requirements, and procedures relevant to each matter to reduce avoidable risks and delays.",
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
        title: "خبرة قانونية وتجارية",
        description:
          "نجمع بين المعرفة القانونية والفهم العملي لشؤون الشركات والمعاملات التجارية لتقديم مشورة تتوافق مع احتياجات أعمالك.",
      },
      {
        icon: "mdi:earth",
        title: "فهم المتطلبات التنظيمية",
        description:
          "نساعد عملاءنا على التعامل مع المتطلبات القانونية والإجرائية المرتبطة بأعمالهم ومعاملات شركاتهم.",
      },
      {
        icon: "mdi:clipboard-check-outline",
        title: "عناية دقيقة بالتفاصيل",
        description:
          "نراجع بعناية المستندات والمتطلبات والإجراءات المرتبطة بكل ملف للحد من المخاطر وحالات التأخير التي يمكن تجنبها.",
      },
      {
        icon: "mdi:handshake-outline",
        title: "دعم مستمر للشركات",
        description:
          "نقدم الدعم القانوني والإداري في مختلف مراحل عمل الشركة وتطورها.",
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
