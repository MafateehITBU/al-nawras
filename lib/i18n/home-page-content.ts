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
  id: string;
  slug: string;
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

export interface HomePartner {
  id: string;
  name: string;
  logoUrl: string;
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
  };
  alNawrasEdge: {
    titleBefore: string;
    titleHighlight: string;
    description: string;
    items: HomeEdgeItem[];
  };
  partners: {
    label: string;
    titleBefore: string;
    titleHighlight: string;
    description: string;
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
      titleLine2: "We Protect It.",
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
            "We understand our clients’ needs and provide legal solutions aligned with their business objectives.",
        },
      ],
    },
    coreServices: {
      label: "OUR CORE SERVICES",
      title: "Specialised Legal and Advisory Services",
      description:
        "We provide integrated services for protecting and managing intellectual property rights, from searches, filing, and registration to portfolio management, enforcement, and related legal and commercial matters.",
    },
    alNawrasEdge: {
      titleBefore: "The Al Nawras ",
      titleHighlight: "Edge.",
      description:
        "We combine specialised intellectual property expertise with a practical understanding of business needs. Our services extend beyond protecting rights to managing intellectual property assets, preserving their value, and supporting businesses as they evolve.",
      items: [
        {
          number: "01",
          label: "EXPERTISE",
          title: "Specialised Knowledge",
          description:
            "Our intellectual property expertise enables us to handle matters with precision, from routine filings to complex legal disputes.",
        },
        {
          number: "02",
          label: "PARTNERSHIP",
          title: "Support Built Around Your Needs",
          description:
            "We take the time to understand your business, rights, and objectives, providing support throughout every stage of your matter.",
        },
        {
          number: "03",
          label: "SOLUTIONS",
          title: "Strategies Tailored to Your Business",
          description:
            "We develop tailored strategies based on the nature of your rights, target markets, potential risks, and business objectives.",
        },
        {
          number: "04",
          label: "RELIABILITY",
          title: "Protection Built on Precision",
          description:
            "We manage every matter carefully, monitoring procedures, requirements, and deadlines to maintain effective and continuous protection.",
        },
      ],
    },
    partners: {
      label: "OUR PARTNERS",
      titleBefore: "Trusted ",
      titleHighlight: "Collaborations.",
      description:
        "We work with respected organisations and institutions that share our commitment to protecting intellectual property and supporting innovation across markets.",
    },
    approach: {
      label: "OUR APPROACH",
      title: "A Clear Approach to Protecting Your Rights",
      description:
        "We handle every matter through a structured process that begins with understanding your needs, followed by developing the appropriate strategy, managing its implementation, and providing ongoing support.",
      steps: [
        {
          number: "01",
          label: "DISCOVERY",
          title: "Understanding Your Needs",
          description: "We identify your intellectual property rights, business needs, target markets, and protection objectives.",
          position: "above",
        },
        {
          number: "02",
          label: "STRATEGY",
          title: "Defining the Appropriate Course of Action",
          description:
            "We develop a clear strategy based on the nature of your rights, applicable jurisdictions, objectives, and potential risks.",
          position: "on-line",
        },
        {
          number: "03",
          label: "IMPLEMENTATION",
          title: "Managing the Process",
          description:
            "We prepare and file applications and supporting documents and follow up on the relevant legal and administrative procedures.",
          position: "above",
        },
        {
          number: "04",
          label: "ONGOING SUPPORT",
          title: "Protecting What Matters",
          description:
            "We monitor your rights, deadlines, renewals, and relevant legal developments to help maintain effective protection.",
          position: "on-line",
        },
      ],
    },
    expertise: {
      titleLine1: "Expertise That Builds Trust.",
      titleHighlight: "Protection Grounded in Knowledge",
      descriptionParagraphs: [
        "In intellectual property, procedural knowledge is only part of the picture. Effective protection requires a clear understanding of each intellectual asset, the applicable legal framework, and the risks it may face.",
        "At Al Nawras Intellectual Property, we help rights holders and businesses make informed decisions, from protecting and managing their intellectual assets to addressing related challenges and disputes. We develop practical protection strategies tailored to each business and its evolving needs.",
      ],
      badgeHeader: "Strategic Defence",
      badgeDescription: "At Every Stage",
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
      "في عالم تتسارع فيه الابتكارات وتتغير فيه الأسواق، تصبح حماية الملكية الفكرية جزءًا أساسيًا من حماية الأعمال. في النورس للملكية الفكرية، نقدم خدمات قانونية واستشارية متكاملة لحماية حقوق الملكية الفكرية وإدارتها وإنفاذها في الأسواق المحلية والدولية.",
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
            "نتعامل مع كل ملف بمهنية وشفافية، ونقدم مشورة قانونية واضحة ومسؤولة.",
        },
        {
          icon: "mdi:crosshairs-gps",
          title: "الدقة",
          supportingStatement: "كل تفصيل يصنع فرقًا في الملكية الفكرية.",
          description:
            "ندير كل مرحلة بعناية، بدءًا من البحث وإيداع الطلبات، ووصولًا إلى المراقبة والتجديد والإنفاذ. ",
        },
        {
          icon: "mdi:account-group-outline",
          title: "الشراكة",
          supportingStatement: "نجاح عملائنا جزء من نجاحنا.",
          description:
            "نفهم احتياجات عملائنا ونقدم حلولًا قانونية تتوافق مع أهداف أعمالهم.",
        },
      ],
    },
    coreServices: {
      label: "خدماتنا الأساسية",
      title: "خدمات قانونية واستشارية متخصصة",
      description:
        "نقدم خدمات متكاملة لحماية حقوق الملكية الفكرية وإدارتها، بدءًا من البحث وإيداع الطلبات والتسجيل، ووصولًا إلى إدارة المحافظ والإنفاذ والمسائل القانونية والتجارية المرتبطة بها.",
    },
    alNawrasEdge: {
      titleBefore: "ما الذي يميز ",
      titleHighlight: "النورس؟",
      description:
        "نجمع بين الخبرة المتخصصة في الملكية الفكرية والفهم العملي لاحتياجات الأعمال. ولا تقتصر خدماتنا على حماية الحقوق، بل تمتد إلى إدارة أصول الملكية الفكرية والحفاظ على قيمتها ودعم الأعمال في مختلف مراحل تطورها.",
      items: [
        {
          number: "01",
          label: "الخبرة",
          title: "معرفة متخصصة",
          description:
            "تمكّننا خبرتنا في الملكية الفكرية من التعامل مع الملفات بدقة، بدءًا من الطلبات والإجراءات المعتادة ووصولًا إلى النزاعات القانونية المعقدة.",
        },
        {
          number: "02",
          label: "الشراكة",
          title: "متابعة تنطلق من احتياجاتك",
          description:
            "نحرص على فهم أعمالك وحقوقك وأهدافك، ونقدم الدعم اللازم في جميع مراحل الملف.",
        },
        {
          number: "03",
          label: "الحلول",
          title: "استراتيجيات مصممة لأعمالك",
          description:
            "نضع استراتيجيات تتناسب مع طبيعة حقوقك والأسواق المستهدفة والمخاطر المحتملة وأهداف أعمالك.",
        },
        {
          number: "04",
          label: "الموثوقية",
          title: "حماية قائمة على الدقة",
          description:
            "ندير كل ملف بعناية، ونتابع الإجراءات والمتطلبات والمواعيد للحفاظ على حماية فعالة ومستمرة.",
        },
      ],
    },
    partners: {
      label: "شركاؤنا",
      titleBefore: "شراكات ",
      titleHighlight: "موثوقة.",
      description:
        "نعمل مع مؤسسات وجهات مرموقة تشاركنا الالتزام بحماية الملكية الفكرية ودعم الابتكار في مختلف الأسواق.",
    },
    approach: {
      label: "منهجية العمل",
      title: "منهج واضح لحماية حقوقك",
      description:
        "نتعامل مع كل ملف وفق منهج منظم يبدأ بفهم احتياجاتك، ثم وضع الاستراتيجية المناسبة وإدارة تنفيذها وتقديم المتابعة المستمرة.",
      steps: [
        {
          number: "01",
          label: "الاستكشاف",
          title: "فهم احتياجاتك",
          description:
            "نحدد حقوق الملكية الفكرية المرتبطة بأعمالك واحتياجاتك والأسواق المستهدفة وأولويات الحماية.",
          position: "above",
        },
        {
          number: "02",
          label: "الاستراتيجية",
          title: "تحديد المسار المناسب",
          description:
            "نضع استراتيجية واضحة تستند إلى طبيعة الحقوق والأنظمة القانونية المعنية والأهداف والمخاطر المحتملة.",
          position: "on-line",
        },
        {
          number: "03",
          label: "التنفيذ",
          title: "إدارة الإجراءات",
          description:
            "نُعد الطلبات والمستندات المؤيدة ونودعها، ونتابع الإجراءات القانونية والإدارية ذات الصلة.",
          position: "above",
        },
        {
          number: "04",
          label: "المتابعة",
          title: "الحفاظ على حقوقك",
          description:
            "نتابع حقوقك ومواعيدها وتجديداتها والتطورات القانونية ذات الصلة للمساعدة على استمرار حمايتها بفاعلية.",
          position: "on-line",
        },
      ],
    },
    expertise: {
      titleLine1: "خبرة تُبنى الثقة.",
      titleHighlight: "وحماية تستند إلى المعرفة.",
      descriptionParagraphs: [
        "في مجال الملكية الفكرية، لا تكفي معرفة الإجراءات وحدها لتحقيق الحماية الفعالة؛ إذ تتطلب حماية الحق فهمًا واضحًا لطبيعة أصل الملكية الفكرية والإطار القانوني المنطبق والمخاطر التي قد يتعرض لها.",
        " في النورس للملكية الفكرية، نساعد أصحاب الحقوق والشركات على اتخاذ قرارات مدروسة، بدءًا من حماية أصول الملكية الفكرية وإدارتها، ووصولًا إلى التعامل مع التعديات وإجراءات الإنفاذ والنزاعات. نضع استراتيجيات حماية عملية تتناسب مع طبيعة كل عمل واحتياجاته المتغيرة.",
        "نعمل على بناء حماية تتناسب مع طبيعة كل عمل، وتواكب احتياجاته مع تطوره وتوسعه.",
      ],
      badgeHeader: "حماية استراتيجية",
      badgeDescription: "في كل مرحلة",
      imageAlt: "مستندات قانونية وقلم حبر يمثل خبرة الملكية الفكرية",
    },
  },
};

export function getHomePageContent(locale: SupportedLocale): HomePageContent {
  return homePageContent[locale];
}
