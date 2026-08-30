import type { SupportedLocale } from "@/lib/i18n/config";

export interface HomeHeroStat {
  title: string;
  description: string;
}

export interface HomeCoreValue {
  icon: string;
  title: string;
  supportingStatement: string;
  description: string;
}

export interface HomeCoreService {
  icon: string;
  title: string;
  description: string;
}

export interface HomeEdgeItem {
  number: string;
  label: string;
  title: string;
  description: string;
}

export interface HomeApproachStep {
  number: string;
  label: string;
  title: string;
  description: string;
  position: "above" | "on-line";
}

export interface HomePageContent {
  seo: {
    title: string;
    description: string;
  };
  hero: {
    titleLine1: string;
    titleLine2: string;
    description: string;
    primaryCta: string;
    secondaryCta: string;
    stats: HomeHeroStat[];
    imageAlt: string;
  };
  whoWeAre: {
    label: string;
    titleBefore: string;
    titleHighlight: string;
    history: { title: string; description: string };
    mission: { title: string; description: string };
    coreValuesTitle: string;
    coreValues: HomeCoreValue[];
  };
  coreServices: {
    label: string;
    title: string;
    description: string;
    cards: HomeCoreService[];
  };
  alNawrasEdge: {
    titleBefore: string;
    titleHighlight: string;
    description: string;
    items: HomeEdgeItem[];
  };
  approach: {
    label: string;
    title: string;
    description: string;
    steps: HomeApproachStep[];
  };
  expertise: {
    titleLine1: string;
    titleHighlight: string;
    descriptionParagraphs: string[];
    badgeHeader: string;
    badgeDescription: string;
    imageAlt: string;
  };
}

const homePageContent: Record<SupportedLocale, HomePageContent> = {
  en: {
    seo: {
      title: "Al Nawras Intellectual Property | Protecting Ideas, Building Secure Futures",
      description:
        "Al Nawras Intellectual Property provides specialised legal and advisory expertise to protect, manage, and defend intellectual property, trademarks, innovations, and intellectual assets across local and international markets.",
    },
    hero: {
      titleLine1: "What Sets You Apart.",
      titleLine2: "We Protect and Secure Its Future.",
      description:
        "In a fast-changing world, protecting intellectual property means protecting your business. Al Nawras provides integrated legal and advisory expertise to protect, manage, and defend your innovations, trademarks, and IP assets across local and international markets.",
      primaryCta: "Contact Us",
      secondaryCta: "Who We Are",
      stats: [
        {
          title: "IP Expertise",
          description: "In Intellectual Property",
        },
        {
          title: "Full Protection",
          description: "From Registration to Enforcement",
        },
        {
          title: "Local & Global",
          description: "Supporting Your Business Needs",
        },
        {
          title: "Ongoing Support",
          description: "For Your Rights and Matters",
        },
      ],
      imageAlt: "Dubai skyline representing innovation and intellectual property protection",
    },
    whoWeAre: {
      label: "WHO WE ARE",
      titleBefore: "From an Idea Worth Protecting,",
      titleHighlight: "to an Asset That Creates Value.",
      history: {
        title: "Our History",
        description:
          "Al Nawras Intellectual Property was founded to provide specialised intellectual property services combining legal expertise, precision, and a strong understanding of business needs. Today, we support individuals and businesses in protecting and managing their ideas, innovations, brands, and intellectual assets.",
      },
      mission: {
        title: "Our Mission",
        description:
          "We help rights holders and businesses protect and manage their intellectual assets through tailored legal and advisory services. Our role goes beyond legal procedures. We help protect rights, reduce risks, and support long-term business growth.",
      },
      coreValuesTitle: "Our Core Values",
      coreValues: [
        {
          icon: "mdi:handshake-outline",
          title: "Integrity",
          supportingStatement: "Trust Through Clarity and Commitment.",
          description:
            "We handle every matter with professionalism and transparency, providing clear, responsible advice.",
        },
        {
          icon: "mdi:crosshairs-gps",
          title: "Precision",
          supportingStatement: "Details Matter in Intellectual Property.",
          description:
            "We manage every stage carefully, from searching and registration to monitoring and enforcement.",
        },
        {
          icon: "mdi:account-group-outline",
          title: "Partnership",
          supportingStatement: "Our Clients' Success Is Our Success.",
          description:
            "We understand our clients' needs and provide legal solutions aligned with their goals.",
        },
      ],
    },
    coreServices: {
      label: "OUR CORE SERVICES",
      title: "Specialised Intellectual Property Services",
      description:
        "We provide integrated services for protecting and managing intellectual property rights, from registration and legal advice to ongoing monitoring, enforcement, and related legal matters.",
      cards: [
        {
          icon: "mdi:certificate-outline",
          title: "Patents",
          description:
            "We help innovators protect their inventions through specialised advice and precise legal procedures, from preparing and filing patent applications to monitoring and maintaining their rights.",
        },
        {
          icon: "mdi:shield-check-outline",
          title: "Trademarks",
          description:
            "We protect trademarks throughout their lifecycle, from searching and registration to monitoring, renewals, and addressing potential infringements—helping preserve your brand's identity and commercial value.",
        },
        {
          icon: "mdi:scale-balance",
          title: "Legal Advisory",
          description:
            "We provide specialised legal advice on intellectual property and related matters, helping rights holders and businesses make informed decisions and reduce legal risks.",
        },
      ],
    },
    alNawrasEdge: {
      titleBefore: "The Al Nawras ",
      titleHighlight: "Edge.",
      description:
        "We combine specialised intellectual property expertise with a practical\nunderstanding of business needs to deliver precise legal services that go beyond protecting rights. We help you manage your intellectual assets, preserve their value, and support your business as it evolves.",
      items: [
        {
          number: "01",
          label: "EXPERTISE",
          title: "Specialised Knowledge",
          description:
            "Our intellectual property expertise enables us to handle every matter with precision, from basic rights to complex legal issues.",
        },
        {
          number: "02",
          label: "PARTNERSHIP",
          title: "Support Built Around Your Needs",
          description:
            "We understand your business, rights, and objectives, providing support throughout every stage of your matter.",
        },
        {
          number: "03",
          label: "SOLUTIONS",
          title: "Strategies That Fit Your Business",
          description:
            "We develop tailored strategies based on your rights, target markets, and business needs.",
        },
        {
          number: "04",
          label: "RELIABILITY",
          title: "Protection Built on Precision",
          description:
            "We manage every matter carefully, monitoring deadlines and procedures to maintain effective protection.",
        },
      ],
    },
    approach: {
      label: "OUR APPROACH",
      title: "A Clear Approach to Protecting Your Rights",
      description:
        "We begin by understanding your needs, defining the right strategy, implementing it effectively, and providing ongoing support to protect your rights.",
      steps: [
        {
          number: "01",
          label: "DISCOVERY",
          title: "Understanding Your Needs",
          description: "We identify your rights, business needs, and protection priorities.",
          position: "above",
        },
        {
          number: "02",
          label: "STRATEGY",
          title: "Defining the Right Path",
          description:
            "We develop a clear strategy based on your rights, markets, and objectives.",
          position: "on-line",
        },
        {
          number: "03",
          label: "IMPLEMENTATION",
          title: "Managing the Process",
          description:
            "We manage applications, documentation, filing, and follow-up with precision.",
          position: "above",
        },
        {
          number: "04",
          label: "ONGOING SUPPORT",
          title: "Protecting What Matters",
          description:
            "We monitor your rights, deadlines, and relevant legal developments.",
          position: "on-line",
        },
      ],
    },
    expertise: {
      titleLine1: "Expertise That Builds Trust.",
      titleHighlight: "Grounded in Knowledge.",
      descriptionParagraphs: [
        "In intellectual property, procedural knowledge is only part of the picture. Effective protection requires a clear understanding of each intellectual asset, the applicable legal framework, and the risks it may face.",
        "At Al Nawras Intellectual Property, we help rights holders and businesses make informed decisions, from protecting and managing their intellectual assets to addressing related challenges and disputes. We develop practical protection strategies tailored to each business and its evolving needs.",
      ],
      badgeHeader: "Strategic Defence",
      badgeDescription: "IN EVERY JURISDICTION",
      imageAlt: "Legal documents and fountain pen representing intellectual property expertise",
    },
  },
  ar: {
    seo: {
      title: "النورس للملكية الفكرية | نحمي ما يميّزك ونبني له مستقبلًا أكثر أمانًا",
      description:
        "تقدم النورس للملكية الفكرية خدمات قانونية واستشارية متخصصة لحماية وإدارة والدفاع عن حقوق الملكية الفكرية والعلامات التجارية والابتكارات والأصول الفكرية في الأسواق المحلية والدولية.",
    },
    hero: {
      titleLine1: "نحمي ما يميّزك.",
      titleLine2: "ونبني له مستقبلًا أكثر أمانًا.",
      description:
        "في عالم تتسارع فيه الأفكار وتتغير فيه الأسواق، تصبح حماية الملكية الفكرية جزءًا أساسيًا من حماية الأعمال نفسها. في النورس للملكية الفكرية، نقدم خبرة قانونية واستشارية متكاملة تساعدك على حماية ابتكاراتك، علاماتك التجارية وأصولك الفكرية، وإدارتها والدفاع عنها في الأسواق المحلية والدولية.",
      primaryCta: "تواصل معنا",
      secondaryCta: "من نحن",
      stats: [
        {
          title: "خبرة متخصصة",
          description: "في الملكية الفكرية",
        },
        {
          title: "حماية متكاملة",
          description: "من التسجيل إلى التنفيذ",
        },
        {
          title: "خدمات محلية ودولية",
          description: "تلبي احتياجات أعمالك",
        },
        {
          title: "متابعة مستمرة",
          description: "لحقوقك وملفاتك",
        },
      ],
      imageAlt: "أفق دبي يمثل الابتكار وحماية الملكية الفكرية",
    },
    whoWeAre: {
      label: "من نحن",
      titleBefore: "من فكرة تستحق الحماية",
      titleHighlight: "إلى أصل يصنع قيمة.",
      history: {
        title: "تاريخنا",
        description:
          "تأسست النورس للملكية الفكرية برؤية تقوم على تقديم خدمات متخصصة في مجال الملكية الفكرية، تجمع بين المعرفة القانونية والمتابعة الدقيقة وفهم احتياجات أصحاب الأعمال. ومع تطور أعمالنا، توسع نطاق خدماتنا ليشمل مختلف مراحل حماية الحقوق الفكرية وإدارتها، لنكون شريكًا يعتمد عليه الأفراد والشركات في حماية ما يملكونه من أفكار وابتكارات وعلامات وأصول فكرية.",
      },
      mission: {
        title: "رسالتنا",
        description:
          "نعمل على تمكين أصحاب الحقوق والأعمال من حماية أصولهم الفكرية وإدارتها بثقة، من خلال خدمات قانونية واستشارية متخصصة تراعي طبيعة كل حق، ومتطلبات كل سوق، والأهداف التي يسعى إليها العميل. ونؤمن أن دورنا لا يتوقف عند إنجاز الإجراء القانوني، بل يمتد إلى تقديم رؤية تساعد على حماية الحقوق وتقليل المخاطر ودعم نمو الأعمال على المدى الطويل.",
      },
      coreValuesTitle: "قيمنا",
      coreValues: [
        {
          icon: "mdi:handshake-outline",
          title: "الأمانة",
          supportingStatement: "نبني الثقة على الوضوح والالتزام.",
          description:
            "نتعامل مع كل ملف بمهنية وشفافية، ونحرص على أن تكون قرارات عملائنا مبنية على معلومات واضحة ومشورة مسؤولة.",
        },
        {
          icon: "mdi:crosshairs-gps",
          title: "الدقة",
          supportingStatement: "لأن التفاصيل تصنع فرقًا في الملكية الفكرية.",
          description:
            "نولي كل مرحلة من مراحل العمل عناية دقيقة، من البحث والتسجيل إلى المتابعة والحماية والإنفاذ.",
        },
        {
          icon: "mdi:account-group-outline",
          title: "الشراكة",
          supportingStatement: "نجاح عملائنا هو جزء من نجاحنا.",
          description:
            "نتعامل مع عملائنا كشركاء، ونحرص على فهم أعمالهم واحتياجاتهم لنقدم حلولًا قانونية تتناسب مع أهدافهم الحالية والمستقبلية.",
        },
      ],
    },
    coreServices: {
      label: "خدماتنا الأساسية",
      title: "خدمات متخصصة في الملكية الفكرية",
      description:
        "نقدم خدمات متكاملة لحماية حقوق الملكية الفكرية وإدارتها، بدءًا من التسجيل والاستشارات، وصولًا إلى المتابعة والإنفاذ والتعامل مع المسائل القانونية المرتبطة بها.",
      cards: [
        {
          icon: "mdi:certificate-outline",
          title: "براءات الاختراع",
          description:
            "نساعد أصحاب الابتكارات على حماية اختراعاتهم من خلال استشارات متخصصة وإجراءات دقيقة تمتد من إعداد طلبات البراءات وتقديمها إلى متابعتها والحفاظ على حقوقها.",
        },
        {
          icon: "mdi:shield-check-outline",
          title: "العلامات التجارية",
          description:
            "نحمي العلامات التجارية في مختلف مراحلها، من البحث والتسجيل إلى المراقبة والتجديد والتعامل مع التعديات، بما يساعد على الحفاظ على هوية العلامة وقيمتها التجارية.",
        },
        {
          icon: "mdi:scale-balance",
          title: "الاستشارات القانونية",
          description:
            "نقدم استشارات قانونية متخصصة في الملكية الفكرية والمسائل المرتبطة بها، لمساعدة أصحاب الحقوق والشركات على اتخاذ قرارات واضحة ومدروسة، وتقليل المخاطر القانونية.",
        },
      ],
    },
    alNawrasEdge: {
      titleBefore: "ما الذي يميز ",
      titleHighlight: "النورس؟",
      description:
        "نجمع بين التخصص في الملكية الفكرية والفهم العملي\nلاحتياجات الأعمال، لنقدم خدمة قانونية دقيقة لا تكتفي بحماية الحق، بل تساعد على إدارته والحفاظ على قيمته مع تطور أعمالك.",
      items: [
        {
          number: "01",
          label: "الخبرة",
          title: "معرفة متخصصة",
          description:
            "فهم عميق للملكية الفكرية وإجراءاتها القانونية، يتيح لنا التعامل مع الملفات بدقة ووضوح، من الحقوق الأساسية إلى المسائل الأكثر تعقيدًا.",
        },
        {
          number: "02",
          label: "الشراكة",
          title: "متابعة تبدأ من احتياجك",
          description:
            "نعمل إلى جانبك لفهم طبيعة أعمالك وحقوقك وأهدافك، ونوفر المتابعة اللازمة عبر مختلف مراحل الملف.",
        },
        {
          number: "03",
          label: "الحلول",
          title: "استراتيجيات تناسب أعمالك",
          description:
            "لا توجد حماية واحدة تناسب الجميع. نحدد المسار القانوني الأنسب وفق طبيعة الحق، والسوق المستهدف، والاحتياجات الحالية، والمستقبلية.",
        },
        {
          number: "04",
          label: "الموثوقية",
          title: "حماية مبنية على الدقة",
          description:
            "نتعامل مع كل طلب وملف ومستند بعناية، مع متابعة المواعيد والإجراءات والتفاصيل التي تضمن استمرارية حماية حقوقك.",
        },
      ],
    },
    approach: {
      label: "منهجية العمل",
      title: "منهج واضح لحماية حقوقك",
      description:
        "نتعامل مع كل ملف بخطوات مدروسة تبدأ بفهم احتياجك، ثم تحديد المسار الأنسب وتنفيذه ومتابعته لضمان حماية فعالة ومستدامة.",
      steps: [
        {
          number: "01",
          label: "الاستكشاف",
          title: "نفهم احتياجك",
          description:
            "نبدأ بفهم طبيعة حقوقك، ونشاطك التجاري، وأهدافك، لنحدد الجوانب التي تحتاج إلى حماية أو معالجة قانونية.",
          position: "above",
        },
        {
          number: "02",
          label: "الاستراتيجية",
          title: "نحدد المسار الأنسب",
          description:
            "نقيّم الخيارات المتاحة ونضع خطة واضحة تتناسب مع طبيعة الحق والأسواق التي تستهدفها، مع مراعاة المخاطر والفرص المرتبطة به.",
          position: "on-line",
        },
        {
          number: "03",
          label: "التنفيذ",
          title: "نتولى الإجراءات",
          description:
            "من إعداد الطلبات والمستندات إلى تقديمها ومتابعتها، نتولى التفاصيل القانونية والإجرائية بدقة لضمان سير الملف بالشكل الصحيح.",
          position: "above",
        },
        {
          number: "04",
          label: "المتابعة",
          title: "نحافظ على حقوقك",
          description:
            "لا تنتهي مهمتنا عند إتمام التسجيل أو الإجراء. نواصل متابعة الحقوق والملفات والمواعيد والتطورات التي قد تؤثر في نطاق الحماية أو استمراريتها.",
          position: "on-line",
        },
      ],
    },
    expertise: {
      titleLine1: "خبرة تُبنى عليها الثقة.",
      titleHighlight: "وحماية تستند إلى المعرفة.",
      descriptionParagraphs: [
        "في مجال الملكية الفكرية، لا تكفي معرفة الإجراءات وحدها. حماية الحقوق تتطلب فهمًا دقيقًا لطبيعة كل أصل فكري، والبيئة القانونية التي تحكمه، والمخاطر التي قد تواجهه.",
        "في النورس للملكية الفكرية، نوظف خبرتنا المتخصصة لمساعدة أصحاب الحقوق والشركات على اتخاذ قرارات قانونية مدروسة، من حماية أصولهم الفكرية وإدارتها، إلى التعامل مع التحديات والنزاعات التي قد تؤثر فيها.",
        "نعمل على بناء حماية تتناسب مع طبيعة كل عمل، وتواكب احتياجاته مع تطوره وتوسعه.",
      ],
      badgeHeader: "دفاع استراتيجي",
      badgeDescription: "لحماية حقوقك في كل مرحلة",
      imageAlt: "مستندات قانونية وقلم حبر يمثل خبرة الملكية الفكرية",
    },
  },
};

export function getHomePageContent(locale: SupportedLocale): HomePageContent {
  return homePageContent[locale];
}
