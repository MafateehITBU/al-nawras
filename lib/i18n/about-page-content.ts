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
  owner: {
    label: string;
    name: string;
    role: string;
    intro: string;
    points: { title: string; description: string }[];
    highlights: { label: string; value: string }[];
    readMoreCta: string;
    portfolioUrl: string;
    imageAlt: string;
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
      titleLine1: "Specialised Expertise in Intellectual Property",
      titleLine2: "A Vision Aligned with Business Growth",
      description:
        "Through years of specialised practice, we have developed our expertise around the needs of rights holders and businesses seeking to protect and manage their intellectual property. We believe that effective protection begins with understanding the nature of each right and the business context in which it operates, extending far beyond registration and procedural requirements.",
    },
    expertise: {
      label: "OUR EXPERTISE",
      title: "Comprehensive Intellectual Property Expertise",
      description:
        "Integrated legal and advisory services designed to protect, manage, enforce, and maximise the commercial value of your intellectual property.",
      cards: [
        {
          icon: "mdi:shield-check-outline",
          title: "Comprehensive IP Services",
          description:
            "We provide specialised legal and advisory services to protect, manage, enforce, and maximise the value of intellectual property assets in line with your business objectives.",
        },
        {
          icon: "mdi:target",
          title: "IP Protection & Strategy",
          description:
            "We develop intellectual property protection strategies based on the nature of your rights, business activities, target markets, and future plans.",
        },
        {
          icon: "mdi:scale-balance",
          title: "Legal, Technical & Commercial Expertise",
          description:
            "We combine legal expertise with technical and commercial understanding to address intellectual property matters of varying scope and complexity.",
        },
        {
          icon: "mdi:earth",
          title: "Local & International Knowledge",
          description:
            "We understand the legal frameworks and procedural requirements of different jurisdictions, helping clients protect and manage their intellectual property rights across local and international markets.",
        },
        {
          icon: "mdi:handshake-outline",
          title: "Support Across the IP Lifecycle",
          description:
            "We support intellectual property rights throughout their lifecycle, from searches, filing, and registration to portfolio management, transactions, renewal, enforcement, and dispute resolution.",
        },
        {
          icon: "mdi:chart-line",
          title: "Commercial Perspective",
          description:
            "We approach intellectual property as both a legal right and a business asset, considering its role in managing risk, supporting growth, and creating commercial value.",
        },
        {
          icon: "mdi:calendar-check-outline",
          title: "Proactive IP Portfolio Management",
          description:
            "We proactively manage and monitor intellectual property portfolios, including applications, registrations, renewals, deadlines, risks, and relevant developments across jurisdictions.",
        },
        {
          icon: "mdi:web",
          title: "Online IP & Brand Protection",
          description:
            "We provide specialised services to protect intellectual property rights and brand identity in the digital environment, including domain name matters, online monitoring, infringement detection, and enforcement.",
        },
      ],
    },
    owner: {
      label: "THE FOUNDER",
      name: "Awwad Al Zboon",
      role: "Founder, Manager & Authorized Signatory",
      intro:
        "More than 30 years of practical experience in intellectual property, corporate law, and economic legislation, developed through senior roles in Jordan and the UAE.",
      points: [
        {
          title: "Intellectual property enforcement",
          description:
            "Extensive practical experience in intellectual property enforcement, dispute resolution, trade marks, copyright, industrial designs, and related legal matters",
        },
        {
          title: "Public-sector expertise",
          description:
            "Served at Jordan’s Ministry of Industry and Trade and the Companies Control Department.",
        },
        {
          title: "UAE Ministry of Economy",
          description:
            "Served as a Legal Affairs Expert in Intellectual Property at the UAE Ministry of Economy from November 2009 to December 2024, providing advice on intellectual property and regulatory matters.",
        },
        {
          title: "Broader legal practice",
          description:
            "Previously worked as a legal adviser at a leading UAE law firm, with extensive experience in corporate law, contracts, and commercial agreements.",
        },
      ],
      highlights: [
        { label: "Place of birth", value: "Hashemite Kingdom of Jordan" },
        { label: "Years of experience", value: "30+" },
      ],
      readMoreCta: "Read more",
      portfolioUrl: "https://portfolio.aipmcae.com/en",
      imageAlt: "Awwad Al Zboon, Founder of Alnawras Intellectual Property",
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
            "We carefully assess the legal and procedural details that may affect the validity, scope, and strength of intellectual property protection.",
        },
        {
          title: "A Perspective Beyond Registration",
          description:
            "We treat intellectual property as a business asset, helping clients protect its value and align it with their broader commercial objectives.",
        },
        {
          title: "Solutions Tailored to Client Needs",
          description:
            "We begin by understanding each client’s business, rights, and objectives before recommending the most appropriate legal and commercial course of action",
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
      titleLine1: "خبرة متخصصة في الملكية الفكرية،",
      titleLine2: "ورؤية تواكب نمو الأعمال.",
      description:
        "على مدى سنوات من العمل المتخصص، بنينا خبرتنا حول احتياجات أصحاب الحقوق والشركات في حماية ملكيتهم الفكرية وإدارتها. ونؤمن بأن الحماية الفعالة تبدأ بفهم طبيعة كل حق والسياق التجاري المرتبط به، وتمتد إلى ما هو أبعد من التسجيل واستكمال الإجراءات.",
    },
    expertise: {
      label: "خبراتنا",
      title: "خبرة متكاملة في الملكية الفكرية",
      description: "خدمات قانونية واستشارية متكاملة تهدف إلى حماية ملكيتك الفكرية وإدارتها وإنفاذ حقوقها وتعظيم قيمتها التجارية.",
      cards: [
        {
          icon: "mdi:shield-check-outline",
          title: "خدمات متكاملة في الملكية الفكرية",
          description:
            "نقدم خدمات قانونية واستشارية متخصصة لحماية أصول الملكية الفكرية وإدارتها وإنفاذ حقوقها وتعظيم قيمتها بما يتوافق مع أهداف أعمالك.",
        },
        {
          icon: "mdi:target",
          title: "حماية الملكية الفكرية واستراتيجيتها",
          description:
            "نضع استراتيجيات لحماية الملكية الفكرية تستند إلى طبيعة حقوقك ونشاطك التجاري والأسواق المستهدفة وخططك المستقبلية.",
        },
        {
          icon: "mdi:scale-balance",
          title: "خبرة قانونية وفنية وتجارية",
          description:
            "نجمع بين الخبرة القانونية والفهم الفني والتجاري للتعامل مع مسائل الملكية الفكرية، باختلاف نطاقها ودرجة تعقيدها.",
        },
        {
          icon: "mdi:earth",
          title: "معرفة محلية ودولية",
          description:
          "نمتلك فهمًا للأطر القانونية والمتطلبات الإجرائية في مختلف الاختصاصات القضائية، ونساعد عملاءنا على حماية حقوق الملكية الفكرية وإدارتها في الأسواق المحلية والدولية.",
        },
        {
          icon: "mdi:handshake-outline",
          title: "الدعم المتكامل",
          description:
            "نقدم الدعم في مختلف مراحل حقوق الملكية الفكرية، بدءًا من البحث وإيداع الطلبات والتسجيل، ووصولًا إلى إدارة المحافظ والمعاملات والتجديد والإنفاذ وتسوية المنازعات.",
        },
        {
          icon: "mdi:chart-line",
          title: "منظور تجاري",
          description:
            "نتعامل مع الملكية الفكرية بوصفها حقًا قانونيًا وأصلًا من أصول الأعمال، مع مراعاة دورها في إدارة المخاطر ودعم النمو وتحقيق القيمة التجارية.",
        },
        {
          icon: "mdi:calendar-check-outline",
          title: "إدارة استباقية لمحافظ الملكية الفكرية", 
          description:
            "ندير محافظ الملكية الفكرية ونتابعها بصورة استباقية، بما يشمل الطلبات والتسجيلات والتجديدات والمواعيد والمخاطر والتطورات ذات الصلة في مختلف الاختصاصات القضائية.",
        },
        {
          icon: "mdi:web",
          title: "حماية الملكية الفكرية والعلامات التجارية عبر الإنترنت",
          description:
            "نقدم خدمات متخصصة لحماية حقوق الملكية الفكرية وهوية العلامات التجارية في البيئة الرقمية، بما يشمل المسائل المتعلقة بأسماء النطاقات، والمراقبة الإلكترونية، ورصد التعديات، والإنفاذ.",
        },
      ],
    },
    owner: {
      label: "المؤسس",
      name: "عواد الزبون",
      role: "المالك والمدير والمفوض بالتوقيع",
      intro:
        "أكثر من 30 عامًا من الخبرة العملية في الملكية الفكرية وقانون الشركات والتشريعات الاقتصادية، اكتسبها من خلال توليه مناصب رفيعة في الأردن ودولة الإمارات العربية المتحدة.",
      points: [
        {
          title: "إنفاذ حقوق الملكية الفكرية",
          description:
            "خبرة عملية واسعة في إنفاذ حقوق الملكية الفكرية، وتسوية المنازعات، والعلامات التجارية، وحقوق المؤلف، والتصاميم الصناعية، والمسائل القانونية ذات الصلة.",
        },
        {
          title: "خبرة في القطاع العام",
          description:
            "عمل لدى وزارة الصناعة والتجارة ودائرة مراقبة الشركات في المملكة الأردنية الهاشمية.",
        },
        {
          title: "وزارة الاقتصاد في الإمارات",
          description:
            "شغل منصب خبير شؤون قانونية في الملكية الفكرية لدى وزارة الاقتصاد في دولة الإمارات العربية المتحدة، خلال الفترة من نوفمبر 2009 إلى ديسمبر 2024، وقدم المشورة في مسائل الملكية الفكرية والشؤون التنظيمية.",
        },
        {
          title: "ممارسة قانونية أوسع",
          description:
            "عمل سابقًا مستشارًا قانونيًا لدى إحدى شركات المحاماة الرائدة في دولة الإمارات، ويتمتع بخبرة واسعة في قانون الشركات والعقود والاتفاقيات التجارية.",
        },
      ],
      highlights: [
        { label: "مكان الميلاد", value: "المملكة الأردنية الهاشمية" },
        { label: "سنوات الخبرة", value: "30+" },
      ],
      readMoreCta: "اقرأ المزيد",
      portfolioUrl: "https://portfolio.aipmcae.com/ar",
      imageAlt: "عواد الزبون، مؤسس النورس للملكية الفكرية",
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
          title: "عناية دقيقة بالتفاصيل",
          description:
            "نقيّم بعناية التفاصيل القانونية والإجرائية التي قد تؤثر في صحة الحق ونطاق حمايته وقوتها.",
        },
        {
          title: "رؤية تتجاوز التسجيل",
          description:
            "نتعامل مع الملكية الفكرية بوصفها أصلًا من أصول الأعمال، ونساعد عملاءنا على حماية قيمتها وربطها بأهدافهم التجارية الأوسع.",
        },
        {
          title: "حلول تراعي احتياجات العميل",
          description:
            "نبدأ بفهم أعمال كل عميل وحقوقه وأهدافه قبل اقتراح المسار القانوني والتجاري الأنسب لحالته.",
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
