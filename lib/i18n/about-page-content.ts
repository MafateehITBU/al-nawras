import type { SupportedLocale } from "@/lib/i18n/config";

export interface AboutExpertiseCard {
  icon: string;
  title: string;
  description: string;
}

export interface AboutFirmExpertisePoint {
  title: string;
  description: string;
}

export interface AboutPageContent {
  seo: {
    title: string;
    description: string;
  };
  hero: {
    titleLine1: string;
    titleLine2: string;
    description: string;
  };
  expertise: {
    label: string;
    title: string;
    description: string;
    cards: AboutExpertiseCard[];
  };
  firmExpertise: {
    label: string;
    title: string;
    descriptionParagraphs: string[];
    points: AboutFirmExpertisePoint[];
    contactCta: string;
    imageAlt: string;
  };
}

const aboutPageContent: Record<SupportedLocale, AboutPageContent> = {
  en: {
    seo: {
      title: "About Us",
      description:
        "Learn about Al Nawras Intellectual Property, our specialized expertise, and our approach to protecting, managing, and maximizing the value of intellectual property.",
    },
    hero: {
      titleLine1: "Our Legacy in Intellectual Property Expertise",
      titleLine2: "And a Vision That Keeps Pace with Business Growth.",
      description:
        "Over years of specialized practice, we have built our expertise around the needs of rights holders and businesses in protecting and managing their intellectual property. We believe effective protection begins with understanding the right itself and the business context surrounding it, extending well beyond registration and procedural requirements.",
    },
    expertise: {
      label: "OUR EXPERTISE",
      title: "Elite Intellectual Property Services",
      description:
        "Comprehensive solutions tailored to protect and maximize the value of your innovations.",
      cards: [
        {
          icon: "mdi:shield-check-outline",
          title: "Comprehensive Intellectual Property Expertise",
          description:
            "We provide specialized legal solutions to protect, manage, and maximize the value of intellectual property assets in line with your business objectives.",
        },
        {
          icon: "mdi:target",
          title: "Protection & Strategy",
          description:
            "We help you build a clear approach to protecting your intellectual property assets in line with the nature of your business, target markets, and future plans.",
        },
        {
          icon: "mdi:scale-balance",
          title: "Legal & Technical Expertise",
          description:
            "We combine legal knowledge with technical and commercial understanding to address intellectual property matters across different levels of complexity.",
        },
        {
          icon: "mdi:earth",
          title: "Local & International Knowledge",
          description:
            "We understand local and international legal frameworks and help our clients manage and protect their intellectual property rights across multiple markets and jurisdictions.",
        },
        {
          icon: "mdi:handshake-outline",
          title: "Comprehensive Support",
          description:
            "We support your intellectual property rights throughout every stage, from establishment and protection to management, transactions, and enforcement.",
        },
        {
          icon: "mdi:chart-line",
          title: "Commercial Perspective",
          description:
            "We view intellectual property as more than a set of legal rights; we consider its role in protecting businesses, supporting growth, and strengthening commercial value.",
        },
        {
          icon: "mdi:calendar-check-outline",
          title: "Proactive Monitoring & Follow-Up",
          description:
            "We provide ongoing management and monitoring of your intellectual property rights, helping you stay ahead of registrations, renewals, deadlines, risks, and opportunities while keeping your IP portfolio organised and effective.",
        },
        {
          icon: "mdi:web",
          title: "Digital Intellectual Property",
          description:
            "Specialized legal services for protecting intellectual property rights, trademarks, and digital assets in the online environment, including domain names and matters related to digital presence.",
        },
      ],
    },
    firmExpertise: {
      label: "FIRM EXPERTISE",
      title: "Specialized Expertise in Intellectual Property",
      descriptionParagraphs: [
        "Protecting intellectual property requires specialised expertise and a clear understanding of the legal and market factors that affect its value and enforceability. At Al Nawras, we support you at every stage, from protection and management to enforcement when needed.",
      ],
      points: [
        {
          title: "Meticulous Attention to Detail",
          description:
            "We carefully consider the details that may affect the scope and strength of your intellectual property protection.",
        },
        {
          title: "A Perspective Beyond Registration",
          description:
            "We treat intellectual property as a business asset, helping you protect its value and support your wider objectives.",
        },
        {
          title: "Solutions Tailored to Client Needs",
          description:
            "We understand your business and needs to provide legal solutions tailored to your specific situation.",
        },
      ],
      contactCta: "Contact Us",
      imageAlt: "Al Nawras Intellectual Property",
    },
  },
  ar: {
    seo: {
      title: "من نحن",
      description:
        "تعرّف على النورس للملكية الفكرية، وخبراتنا المتخصصة، ونهجنا في حماية وإدارة وتعظيم قيمة حقوق الملكية الفكرية.",
    },
    hero: {
      titleLine1: "إرث من الخبرة في الملكية الفكرية،",
      titleLine2: "ورؤية تواكب تطور الأعمال.",
      description:
        "على مدى سنوات من العمل المتخصص، بنينا خبرتنا حول احتياجات أصحاب الحقوق والشركات في حماية ملكيتهم الفكرية وإدارتها. نؤمن بأن الحماية الفعالة تبدأ بفهم الحق وطبيعة العمل من حوله، وتمتد إلى ما هو أبعد من التسجيل والإجراءات.",
    },
    expertise: {
      label: "خبراتنا",
      title: "خدمات متخصصة ونخبة في مجال الملكية الفكرية",
      description: "حلول شاملة مصممة لحماية ابتكاراتك وتعظيم قيمتها.",
      cards: [
        {
          icon: "mdi:shield-check-outline",
          title: "خبرة متكاملة في الملكية الفكرية",
          description:
            "نقدّم حلولًا قانونية متخصصة تساعد على حماية أصول الملكية الفكرية وإدارتها وتعظيم قيمتها بما يتناسب مع أهداف أعمالك.",
        },
        {
          icon: "mdi:target",
          title: "الحماية والاستراتيجية",
          description:
            "نساعدك على بناء نهج واضح لحماية أصولك الفكرية، بما يتوافق مع طبيعة أعمالك والأسواق التي تستهدفها وخططك المستقبلية.",
        },
        {
          icon: "mdi:scale-balance",
          title: "الخبرة القانونية والفنية",
          description:
            "نجمع بين المعرفة القانونية والفهم الفني والتجاري للتعامل مع مسائل الملكية الفكرية بمختلف مستوياتها وتعقيداتها.",
        },
        {
          icon: "mdi:earth",
          title: "المعرفة المحلية والدولية",
          description:
            "نمتلك فهمًا للأطر القانونية المحلية والدولية، ونساعد عملاءنا في إدارة حقوقهم وحمايتها عبر أسواق واختصاصات قضائية مختلفة.",
        },
        {
          icon: "mdi:handshake-outline",
          title: "الدعم المتكامل",
          description:
            "نواكب حقوقك الفكرية عبر مختلف مراحلها، من التأسيس والحماية إلى الإدارة والمعاملات والإنفاذ.",
        },
        {
          icon: "mdi:chart-line",
          title: "منظور تجاري",
          description:
            "لا نتعامل مع الملكية الفكرية كحقوق قانونية فقط، بل ننظر إلى دورها في حماية الأعمال ودعم النمو وتعزيز القيمة التجارية.",
        },
        {
          icon: "mdi:calendar-check-outline",
          title: "المتابعة والاستباقية",
          description:
            "نساعدك على التعامل مع المواعيد والمخاطر والتغييرات والفرص في الوقت المناسب، للحفاظ على محفظتك الفكرية منظمة وفعالة.\n\nإدارة ومتابعة حقوق الملكية الفكرية، بما في ذلك التسجيلات والتجديدات والمواعيد والملفات المتعددة.",
        },
        {
          icon: "mdi:web",
          title: "الملكية الفكرية الرقمية",
          description:
            "خدمات قانونية متخصصة في حماية الحقوق والعلامات والأصول الفكرية في البيئة الرقمية، بما في ذلك أسماء النطاقات والمسائل المرتبطة بالحضور الرقمي.",
        },
      ],
    },
    firmExpertise: {
      label: "على ماذا تقوم خبراتنا؟",
      title: "خبرة متخصصة في الملكية الفكرية",
      descriptionParagraphs: [
        "تتطلب حماية الملكية الفكرية أكثر من معرفة الإجراءات؛ فهي تحتاج إلى قراءة دقيقة للحق، وفهم للسوق، وقدرة على التعامل مع التفاصيل القانونية التي قد تؤثر في قيمته وقابليته للحماية والإنفاذ.",
        "في النورس، نجمع بين الخبرة المتخصصة والمتابعة الدقيقة لنقدم لعملائنا دعمًا قانونيًا يمتد عبر مختلف مراحل حقوقهم الفكرية، من الحماية الأولية إلى الإدارة والإنفاذ عند الحاجة.",
      ],
      points: [
        {
          title: "معرفة دقيقة بالتفاصيل",
          description:
            "نتعامل مع كل ملف وفق طبيعته ومتطلباته، مع عناية بالتفاصيل التي قد تؤثر في نطاق الحماية وقوة الحق.",
        },
        {
          title: "رؤية تتجاوز التسجيل",
          description:
            "ننظر إلى الملكية الفكرية كأصل من أصول العمل، ونساعد على اتخاذ قرارات تحافظ على قيمتها وتدعم أهداف صاحبها.",
        },
        {
          title: "حلول تراعي احتياجات العميل",
          description:
            "نبدأ بفهم طبيعة عملك واحتياجك، ثم نحدد المسار القانوني الأنسب بدل تقديم حلول نمطية لا تناسب جميع الحالات.",
        },
      ],
      contactCta: "تواصل معنا",
      imageAlt: "النورس للملكية الفكرية",
    },
  },
};

export function getAboutPageContent(locale: SupportedLocale): AboutPageContent {
  return aboutPageContent[locale];
}
