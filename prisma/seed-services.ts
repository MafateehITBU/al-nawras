const SEED_SERVICE_IMAGES = {
  overviewImageUrl: "/images/about.png",
  overviewImagePublicId: "seed/about",
  strategicBenefitsImageUrl: "/images/home-expertise.png",
  strategicBenefitsImagePublicId: "seed/home-expertise",
} as const;

export { SEED_SERVICE_IMAGES };

type SeedBenefit = {
  icon: string;
  titleEn: string;
  titleAr: string;
  descriptionEn: string;
  descriptionAr: string;
};

export type SeedService = {
  slug: string;
  nameEn: string;
  nameAr: string;
  heroTitleEn: string;
  heroTitleAr: string;
  heroDescriptionEn: string;
  heroDescriptionAr: string;
  overviewTitleEn: string;
  overviewTitleAr: string;
  overviewDescriptionEn: string;
  overviewDescriptionAr: string;
  benefits: SeedBenefit[];
};

function service(input: {
  slug: string;
  nameEn: string;
  nameAr: string;
  taglineEn: string;
  taglineAr: string;
  descriptionEn: string;
  descriptionAr: string;
  overviewEn: string;
  overviewAr: string;
  benefits: SeedBenefit[];
}): SeedService {
  return {
    slug: input.slug,
    nameEn: input.nameEn,
    nameAr: input.nameAr,
    heroTitleEn: input.taglineEn,
    heroTitleAr: input.taglineAr,
    heroDescriptionEn: input.descriptionEn,
    heroDescriptionAr: input.descriptionAr,
    overviewTitleEn: input.nameEn,
    overviewTitleAr: input.nameAr,
    overviewDescriptionEn: input.overviewEn,
    overviewDescriptionAr: input.overviewAr,
    benefits: input.benefits,
  };
}

export const seedCategories: Array<{
  slug: string;
  nameEn: string;
  nameAr: string;
  icon: string;
  descriptionEn: string;
  descriptionAr: string;
  services: SeedService[];
}> = [
  {
    slug: "patents",
    nameEn: "Patents",
    nameAr: "براءات الاختراع",
    icon: "mdi:certificate-outline",
    descriptionEn:
      "We help innovators protect their inventions through specialised advice and precise legal procedures, from preparing and filing patent applications to monitoring and maintaining their rights.",
    descriptionAr:
      "نساعد أصحاب الابتكارات على حماية اختراعاتهم من خلال استشارات متخصصة وإجراءات دقيقة تمتد من إعداد طلبات البراءات وتقديمها إلى متابعتها والحفاظ على حقوقها.",
    services: [
      service({
        slug: "patent-search-and-analysis",
        nameEn: "Patent Search & Analysis",
        nameAr: "البحث والتحليل في البراءات",
        taglineEn: "Know the landscape before you file.",
        taglineAr: "اعرف المشهد القانوني قبل الإيداع.",
        descriptionEn:
          "We assess prior art and patentability so you can file with a clear view of risks, opportunities, and the strongest path to protection.",
        descriptionAr:
          "نقيّم التقنية السابقة وقابلية الحماية، لنساعدك على الإيداع برؤية واضحة للمخاطر والفرص وأفضل مسار لحماية اختراعك.",
        overviewEn:
          "A focused patent search reduces uncertainty before drafting and filing. We review relevant prior art, assess novelty and inventive step, and advise on the scope of protection that is realistically available in your target markets.",
        overviewAr:
          "يقلل البحث المتخصص في البراءات حالة عدم اليقين قبل الصياغة والإيداع. نراجع التقنية السابقة ذات الصلة، ونقيّم الجدة والخطوة الابتكارية، ونقدّم المشورة حول نطاق الحماية المتاح في الأسواق المستهدفة.",
        benefits: [
          {
            icon: "mdi:magnify",
            titleEn: "Informed Filing Decisions",
            titleAr: "قرارات إيداع مبنية على معرفة",
            descriptionEn:
              "Identify existing rights and similar inventions early, so you can refine the invention or filing strategy before costs accumulate.",
            descriptionAr:
              "تحديد الحقوق القائمة والاختراعات المشابهة مبكرًا، بما يتيح تعديل الاختراع أو استراتيجية الإيداع قبل تراكم التكاليف.",
          },
          {
            icon: "mdi:lightbulb-on-outline",
            titleEn: "Clearer Scope of Protection",
            titleAr: "نطاق حماية أوضح",
            descriptionEn:
              "Search findings help shape claims and jurisdictions around what can actually be protected.",
            descriptionAr:
              "تساعد نتائج البحث على صياغة عناصر الحماية وتحديد الدول وفق ما يمكن حمايته فعليًا.",
          },
        ],
      }),
      service({
        slug: "patent-drafting-and-filing",
        nameEn: "Patent Drafting & Filing",
        nameAr: "صياغة وتقديم طلبات البراءات",
        taglineEn: "Precise applications, filed with care.",
        taglineAr: "طلبات دقيقة تُودع بعناية.",
        descriptionEn:
          "We prepare and file patent applications that describe the invention clearly and support a strong, enforceable set of claims.",
        descriptionAr:
          "نعدّ طلبات البراءات ونودعها بصياغة واضحة للاختراع، بما يدعم عناصر حماية قوية وقابلة للإنفاذ.",
        overviewEn:
          "Drafting quality determines how well a patent can be examined, enforced, and commercialised. We prepare specifications and claims aligned with your invention, business goals, and the procedural requirements of each filing office.",
        overviewAr:
          "جودة الصياغة تحدد مدى قدرة البراءة على اجتياز الفحص والإنفاذ والاستثمار التجاري. نعدّ الوصف وعناصر الحماية بما يتوافق مع اختراعك وأهداف عملك ومتطلبات مكاتب الإيداع.",
        benefits: [
          {
            icon: "mdi:file-document-edit-outline",
            titleEn: "Technically Accurate Drafting",
            titleAr: "صياغة دقيقة فنيًا",
            descriptionEn:
              "The invention is described with the detail needed for examination and later enforcement.",
            descriptionAr:
              "يُوصف الاختراع بالتفصيل اللازم للفحص ولإنفاذ الحق لاحقًا.",
          },
          {
            icon: "mdi:file-upload-outline",
            titleEn: "Compliant Local & International Filing",
            titleAr: "إيداع متوافق محليًا ودوليًا",
            descriptionEn:
              "Applications are prepared to meet office formalities and timelines in your chosen jurisdictions.",
            descriptionAr:
              "تُعد الطلبات بما يستوفي الشكليات والمواعيد في الدول التي تختارها.",
          },
        ],
      }),
      service({
        slug: "patent-prosecution",
        nameEn: "Patent Prosecution",
        nameAr: "متابعة طلبات البراءات",
        taglineEn: "From examination to grant.",
        taglineAr: "من الفحص حتى المنح.",
        descriptionEn:
          "We manage office actions, examiner communications, and responses so your application keeps moving toward grant.",
        descriptionAr:
          "ندير تقارير الفحص ومراسلات المكتب والردود عليها، ليبقي طلبك في مسار واضح نحو المنح.",
        overviewEn:
          "Prosecution is where filing strategy meets examination. We track deadlines, respond to objections, and advise on claim amendments that protect the commercial core of the invention without unnecessary delay.",
        overviewAr:
          "متابعة الطلب هي المرحلة التي تلتقي فيها استراتيجية الإيداع مع الفحص. نتابع المواعيد، ونرد على الاعتراضات، وننصح بتعديلات عناصر الحماية التي تحفظ الجوهر التجاري للاختراع دون تأخير غير لازم.",
        benefits: [
          {
            icon: "mdi:calendar-clock",
            titleEn: "Deadline Control",
            titleAr: "ضبط المواعيد",
            descriptionEn:
              "Examination dates and response windows are monitored so rights are not lost to missed formalities.",
            descriptionAr:
              "نراقب مواعيد الفحص وآجال الرد حتى لا تضيع الحقوق بسبب شكليات فائتة.",
          },
          {
            icon: "mdi:comment-text-outline",
            titleEn: "Targeted Examiner Responses",
            titleAr: "ردود موجّهة على تقارير الفحص",
            descriptionEn:
              "Objections are addressed with legal and technical arguments that support grant on commercially useful claims.",
            descriptionAr:
              "نعالج الاعتراضات بحجج قانونية وفنية تدعم المنح بعناصر حماية ذات قيمة تجارية.",
          },
        ],
      }),
      service({
        slug: "patent-annuities-and-maintenance",
        nameEn: "Annuities & Maintenance",
        nameAr: "الرسوم السنوية وصيانة البراءات",
        taglineEn: "Keep granted rights in force.",
        taglineAr: "أبقِ الحقوق الممنوحة سارية.",
        descriptionEn:
          "We monitor annuity dates and maintenance requirements so granted patents remain valid across your portfolio.",
        descriptionAr:
          "نراقب مواعيد الرسوم السنوية ومتطلبات الصيانة، لتبقى البراءات الممنوحة سارية ضمن محفظتك.",
        overviewEn:
          "A granted patent only remains valuable if it stays in force. We track renewal calendars, advise on which rights to maintain, and handle the filings needed to preserve protection in each jurisdiction.",
        overviewAr:
          "لا تبقى البراءة الممنوحة ذات قيمة إلا إذا ظلت سارية. نتابع جداول التجديد، وننصح بالحقوق التي يستحسن الإبقاء عليها، ونتولى الإجراءات اللازمة للحفاظ على الحماية في كل دولة.",
        benefits: [
          {
            icon: "mdi:calendar-check-outline",
            titleEn: "Portfolio Calendar",
            titleAr: "جدول زمني للمحفظة",
            descriptionEn:
              "Annuity and maintenance dates are organised so renewals are planned rather than urgent.",
            descriptionAr:
              "تُنظَّم مواعيد الرسوم والصيانة ليكون التجديد مخططًا لا عاجلًا.",
          },
          {
            icon: "mdi:shield-lock-outline",
            titleEn: "Continuous Protection",
            titleAr: "حماية مستمرة",
            descriptionEn:
              "Rights stay enforceable because formal maintenance steps are completed on time.",
            descriptionAr:
              "تبقى الحقوق قابلة للإنفاذ لأن إجراءات الصيانة تُستكمل في مواعيدها.",
          },
        ],
      }),
      service({
        slug: "international-pct-filings",
        nameEn: "International PCT Filings",
        nameAr: "الإيداع الدولي (PCT)",
        taglineEn: "One filing, broader options.",
        taglineAr: "إيداع واحد وخيارات أوسع.",
        descriptionEn:
          "We advise on PCT strategy and manage international applications so you can decide later where to pursue national protection.",
        descriptionAr:
          "نقدم المشورة حول استراتيجية معاهدة التعاون بشأن البراءات وندير الطلبات الدولية، لتقرر لاحقًا أين تتابع الحماية الوطنية.",
        overviewEn:
          "The PCT route can preserve options while you assess markets, partners, and budget. We prepare international filings, monitor the international phase, and help you plan national-phase entries with a clear timeline.",
        overviewAr:
          "يمكن لمسار معاهدة التعاون بشأن البراءات أن يحفظ الخيارات ريثما تقيّم الأسواق والشركاء والميزانية. نعدّ الطلبات الدولية، ونتابع المرحلة الدولية، ونساعدك على تخطيط الدخول الوطني وفق جدول زمني واضح.",
        benefits: [
          {
            icon: "mdi:earth",
            titleEn: "Time to Choose Markets",
            titleAr: "وقت لاختيار الأسواق",
            descriptionEn:
              "International filing delays national costs until you have a clearer view of where protection is needed.",
            descriptionAr:
              "يؤجل الإيداع الدولي التكاليف الوطنية إلى أن تتضح الأسواق التي تحتاج الحماية.",
          },
          {
            icon: "mdi:map-marker-path",
            titleEn: "Coordinated National Entry",
            titleAr: "دخول وطني منسّق",
            descriptionEn:
              "National-phase deadlines and requirements are planned as one process, not isolated filings.",
            descriptionAr:
              "تُخطط مواعيد ومتطلبات المرحلة الوطنية كمسار واحد، لا كإيداعات منفصلة.",
          },
        ],
      }),
    ],
  },
  {
    slug: "trademarks",
    nameEn: "Trademarks",
    nameAr: "العلامات التجارية",
    icon: "mdi:shield-check-outline",
    descriptionEn:
      "We protect trademarks throughout their lifecycle, from searching and registration to monitoring, renewals, and addressing potential infringements—helping preserve your brand's identity and commercial value.",
    descriptionAr:
      "نحمي العلامات التجارية في مختلف مراحلها، من البحث والتسجيل إلى المراقبة والتجديد والتعامل مع التعديات، بما يساعد على الحفاظ على هوية العلامة وقيمتها التجارية.",
    services: [
      service({
        slug: "trademark-search",
        nameEn: "Trademark Search",
        nameAr: "بحث العلامات التجارية",
        taglineEn: "Check availability before you brand.",
        taglineAr: "تحقق من التوافر قبل بناء العلامة.",
        descriptionEn:
          "We search existing marks and advise on registrability so you can adopt a brand with fewer collision and refusal risks.",
        descriptionAr:
          "نبحث العلامات القائمة ونقيّم قابلية التسجيل، لتختار علامة بمخاطر أقل للتعارض والرفض.",
        overviewEn:
          "A trademark search is the first practical step in protecting a brand. We review relevant registers and similar signs, then advise on distinctiveness, class coverage, and whether the proposed mark can proceed with acceptable risk.",
        overviewAr:
          "بحث العلامة هو الخطوة العملية الأولى لحماية الهوية التجارية. نراجع السجلات والعلامات المشابهة، ثم نقدّم المشورة حول التمييز ونطاق الفئات وما إذا كان يمكن المضي في العلامة بمخاطر مقبولة.",
        benefits: [
          {
            icon: "mdi:magnify",
            titleEn: "Fewer Filing Surprises",
            titleAr: "مفاجآت أقل عند الإيداع",
            descriptionEn:
              "Conflicts and weak distinctiveness are identified before you invest in filing and brand rollout.",
            descriptionAr:
              "يُكشف التعارض وضعف التمييز قبل الاستثمار في الإيداع وإطلاق العلامة.",
          },
          {
            icon: "mdi:shape-outline",
            titleEn: "Smarter Class Selection",
            titleAr: "اختيار أدق للفئات",
            descriptionEn:
              "Search results support choosing goods and services classes that match how the brand will actually be used.",
            descriptionAr:
              "تدعم نتائج البحث اختيار فئات السلع والخدمات وفق الاستخدام الفعلي للعلامة.",
          },
        ],
      }),
      service({
        slug: "trademark-registration",
        nameEn: "Trademark Registration",
        nameAr: "تسجيل العلامات التجارية",
        taglineEn: "Secure the mark that identifies your business.",
        taglineAr: "أمّن العلامة التي تميز أعمالك.",
        descriptionEn:
          "We prepare and file trademark applications and follow them through examination until the mark is registered.",
        descriptionAr:
          "نعدّ طلبات تسجيل العلامات ونودعها ونتابعها خلال الفحص حتى تمام التسجيل.",
        overviewEn:
          "Registration turns a brand into a legal right. We define the mark, classes, and jurisdictions, prepare the application, and manage examination so you obtain protection that matches how the brand is used in the market.",
        overviewAr:
          "يحول التسجيل العلامة إلى حق قانوني. نحدد شكل العلامة والفئات والدول، ونعدّ الطلب، وندير الفحص للحصول على حماية تناسب استخدام العلامة في السوق.",
        benefits: [
          {
            icon: "mdi:certificate-outline",
            titleEn: "Formal Brand Rights",
            titleAr: "حقوق رسمية للعلامة",
            descriptionEn:
              "A registered mark gives a clearer basis to stop unauthorised use and to license or assign the brand.",
            descriptionAr:
              "تمنح العلامة المسجلة أساسًا أوضح لوقف الاستخدام غير المصرح به وترخيص العلامة أو نقلها.",
          },
          {
            icon: "mdi:domain",
            titleEn: "Protection Where You Trade",
            titleAr: "حماية حيث تعمل",
            descriptionEn:
              "Filings can be aligned with current markets and planned expansion, not only a single office.",
            descriptionAr:
              "يمكن مواءمة الإيداعات مع الأسواق الحالية وخطط التوسع، لا مع مكتب واحد فقط.",
          },
        ],
      }),
      service({
        slug: "trademark-monitoring",
        nameEn: "Trademark Monitoring",
        nameAr: "مراقبة العلامات التجارية",
        taglineEn: "Spot conflicting filings early.",
        taglineAr: "اكتشف الإيداعات المتعارضة مبكرًا.",
        descriptionEn:
          "We watch new applications and marketplace use so you can act before a conflicting mark becomes established.",
        descriptionAr:
          "نراقب الطلبات الجديدة والاستخدام في السوق، ليمكنك التدخل قبل أن تستقر علامة متعارضة.",
        overviewEn:
          "Registration is not the end of brand protection. Monitoring helps you detect similar filings, lookalike use, and risks that can dilute the mark if left unanswered.",
        overviewAr:
          "التسجيل ليس نهاية حماية العلامة. تساعد المراقبة على اكتشاف الإيداعات المشابهة والاستخدام المقلّد والمخاطر التي قد تضعف العلامة إن تُركت دون رد.",
        benefits: [
          {
            icon: "mdi:eye-outline",
            titleEn: "Early Conflict Alerts",
            titleAr: "تنبيه مبكر للتعارض",
            descriptionEn:
              "New applications that resemble your mark can be reviewed while opposition windows are still open.",
            descriptionAr:
              "يمكن مراجعة الطلبات الجديدة المشابهة لعلامتك بينما تكون مواعيد الاعتراض ما تزال مفتوحة.",
          },
          {
            icon: "mdi:alert-decagram-outline",
            titleEn: "Protect Brand Distinctiveness",
            titleAr: "حماية تمييز العلامة",
            descriptionEn:
              "Acting on close marks helps keep the brand identifiable and commercially valuable.",
            descriptionAr:
              "التدخل تجاه العلامات القريبة يساعد على إبقاء علامتك مميزة وذات قيمة تجارية.",
          },
        ],
      }),
      service({
        slug: "trademark-renewals",
        nameEn: "Trademark Renewals",
        nameAr: "تجديد العلامات التجارية",
        taglineEn: "Do not let registered rights lapse.",
        taglineAr: "لا تدع الحقوق المسجلة تسقط.",
        descriptionEn:
          "We track renewal dates and complete the filings needed to keep your registered trademarks in force.",
        descriptionAr:
          "نتابع مواعيد التجديد ونستكمل الإجراءات اللازمة لإبقاء علاماتك المسجلة سارية.",
        overviewEn:
          "Trademark rights depend on timely renewal and, in many systems, continued use. We maintain a renewal calendar, prepare the required documents, and advise when a mark should be kept, limited, or allowed to lapse.",
        overviewAr:
          "تعتمد حقوق العلامة على التجديد في موعده، وفي كثير من الأنظمة على استمرار الاستخدام. نحتفظ بجدول للتجديد، ونعدّ المستندات المطلوبة، وننصح بما إذا كان ينبغي الإبقاء على العلامة أو تضييقها أو تركها.",
        benefits: [
          {
            icon: "mdi:calendar-refresh-outline",
            titleEn: "No Missed Renewal Windows",
            titleAr: "لا تفويت لمواعيد التجديد",
            descriptionEn:
              "Dates are tracked across jurisdictions so protection is not lost through an administrative gap.",
            descriptionAr:
              "تُتابع المواعيد عبر الدول حتى لا تضيع الحماية بسبب ثغرة إدارية.",
          },
          {
            icon: "mdi:briefcase-check-outline",
            titleEn: "Portfolio Hygiene",
            titleAr: "ترتيب المحفظة",
            descriptionEn:
              "Renewal reviews are a chance to confirm that each mark still matches the business that uses it.",
            descriptionAr:
              "مراجعة التجديد فرصة للتأكد من أن كل علامة ما تزال تطابق النشاط الذي يستخدمها.",
          },
        ],
      }),
      service({
        slug: "trademark-opposition-and-infringement",
        nameEn: "Opposition & Infringement",
        nameAr: "الاعتراض والتعدي",
        taglineEn: "Defend the mark when it is challenged or copied.",
        taglineAr: "ادفع عن العلامة عند الاعتراض أو التقليد.",
        descriptionEn:
          "We handle oppositions, cancellations, and infringement matters to protect registered and well-established brands.",
        descriptionAr:
          "نتولى الاعتراضات والشطب وقضايا التعدي لحماية العلامات المسجلة والعلامات ذات الحضور الراسخ.",
        overviewEn:
          "When a conflicting application appears, or when a third party uses a similar sign, timely action can preserve the brand. We assess the strength of the case, prepare filings, and support enforcement in line with your commercial priorities.",
        overviewAr:
          "عندما يظهر طلب متعارض أو يستخدم الغير إشارة مشابهة، يمكن للتدخل في الوقت المناسب أن يحفظ العلامة. نقيّم قوة الموقف، ونعدّ الإجراءات، وندعم الإنفاذ وفق أولوياتك التجارية.",
        benefits: [
          {
            icon: "mdi:gavel",
            titleEn: "Structured Enforcement Options",
            titleAr: "خيارات إنفاذ منظمة",
            descriptionEn:
              "Opposition, cancellation, and infringement routes are weighed against cost, evidence, and business impact.",
            descriptionAr:
              "تُوزن مسارات الاعتراض والشطب والتعدي مقابل التكلفة والأدلة والأثر على العمل.",
          },
          {
            icon: "mdi:shield-alert-outline",
            titleEn: "Protect Market Position",
            titleAr: "حماية الموقع في السوق",
            descriptionEn:
              "Stopping confusingly similar marks helps customers keep identifying your goods and services.",
            descriptionAr:
              "وقف العلامات المضللة يساعد العملاء على الاستمرار في تمييز سلعك وخدماتك.",
          },
        ],
      }),
    ],
  },
  {
    slug: "legal-advisory",
    nameEn: "Legal Advisory",
    nameAr: "الاستشارات القانونية",
    icon: "mdi:scale-balance",
    descriptionEn:
      "We provide specialised legal advice on intellectual property and related matters, helping rights holders and businesses make informed decisions and reduce legal risks.",
    descriptionAr:
      "نقدم استشارات قانونية متخصصة في الملكية الفكرية والمسائل المرتبطة بها، لمساعدة أصحاب الحقوق والشركات على اتخاذ قرارات واضحة ومدروسة، وتقليل المخاطر القانونية.",
    services: [
      service({
        slug: "ip-legal-opinions",
        nameEn: "IP Legal Opinions",
        nameAr: "الآراء والاستشارات القانونية",
        taglineEn: "Clear advice before you commit.",
        taglineAr: "مشورة واضحة قبل اتخاذ القرار.",
        descriptionEn:
          "We provide written and practical opinions on ownership, validity, freedom to operate, and IP risk in transactions and day-to-day decisions.",
        descriptionAr:
          "نقدم آراء قانونية عملية ومكتوبة حول الملكية والصحة وحرية العمل ومخاطر الملكية الفكرية في الصفقات والقرارات اليومية.",
        overviewEn:
          "Specialised opinions help boards, founders, and counsel act with a documented view of IP risk. We analyse the rights involved, the legal framework, and the practical options so decisions are not based on assumption.",
        overviewAr:
          "تساعد الآراء المتخصصة مجالس الإدارة والمؤسسين والمستشارين على التصرف برؤية موثّقة لمخاطر الملكية الفكرية. نحلل الحقوق المعنية والإطار القانوني والخيارات العملية حتى لا تُبنى القرارات على الافتراض.",
        benefits: [
          {
            icon: "mdi:text-box-check-outline",
            titleEn: "Documented Risk Assessment",
            titleAr: "تقييم موثّق للمخاطر",
            descriptionEn:
              "Advice is set out in a form you can share internally and use when planning filings, launches, or deals.",
            descriptionAr:
              "تُصاغ المشورة بشكل يمكن مشاركته داخليًا واستخدامه عند التخطيط للإيداع أو الإطلاق أو الصفقات.",
          },
          {
            icon: "mdi:scale-balance",
            titleEn: "Decisions Grounded in IP Law",
            titleAr: "قرارات مبنية على قانون الملكية الفكرية",
            descriptionEn:
              "Commercial choices are tested against registrability, enforceability, and third-party rights.",
            descriptionAr:
              "تُختبر الخيارات التجارية مقابل قابلية التسجيل والإنفاذ وحقوق الغير.",
          },
        ],
      }),
      service({
        slug: "licensing-and-agreements",
        nameEn: "Licensing & Agreements",
        nameAr: "التراخيص والاتفاقيات",
        taglineEn: "Put IP to work under the right terms.",
        taglineAr: "فعّل حقوقك بشروط واضحة.",
        descriptionEn:
          "We draft and review licences, assignments, coexistence agreements, and related contracts so IP can be used, shared, or transferred with defined rights.",
        descriptionAr:
          "نصيغ ونراجع التراخيص والتنازلات واتفاقيات التعايش والعقود المرتبطة بها، لاستخدام الحقوق أو مشاركتها أو نقلها بنطاق محدد.",
        overviewEn:
          "Intellectual property often creates value through collaboration. We help you define what is licensed, by whom, in which territory, and on what commercial terms, so the agreement supports the business rather than creating later disputes.",
        overviewAr:
          "كثيرًا ما تنشأ قيمة الملكية الفكرية من التعاون. نساعدك على تحديد ما يُرخَّص، ولمن، وفي أي نطاق جغرافي، وبأي شروط تجارية، ليدعم الاتفاق العمل بدل أن يولّد نزاعًا لاحقًا.",
        benefits: [
          {
            icon: "mdi:file-sign",
            titleEn: "Clear Scope of Rights",
            titleAr: "نطاق حقوق واضح",
            descriptionEn:
              "Licensed uses, exclusivity, and reserved rights are stated so both sides know what is permitted.",
            descriptionAr:
              "يُحدَّد الاستخدام المرخّص والحصرية والحقوق المحتفظ بها حتى يعرف الطرفان ما هو مسموح.",
          },
          {
            icon: "mdi:handshake-outline",
            titleEn: "Terms That Match the Deal",
            titleAr: "شروط توافق الصفقة",
            descriptionEn:
              "Payment, quality control, termination, and enforcement clauses are aligned with how the relationship will actually run.",
            descriptionAr:
              "تُواءَم بنود المقابل ورقابة الجودة والإنهاء والإنفاذ مع كيفية سير العلاقة فعليًا.",
          },
        ],
      }),
      service({
        slug: "ip-disputes-and-enforcement",
        nameEn: "IP Disputes & Enforcement",
        nameAr: "النزاعات والإنفاذ",
        taglineEn: "Act when rights are threatened.",
        taglineAr: "تدخل عندما تتعرض حقوقك للتهديد.",
        descriptionEn:
          "We support enforcement strategy, correspondence, and dispute handling when intellectual property rights are copied, challenged, or ignored.",
        descriptionAr:
          "ندعم استراتيجية الإنفاذ والمراسلات وإدارة النزاع عندما تُقلَّد حقوق الملكية الفكرية أو تُعترض أو تُتجاهل.",
        overviewEn:
          "Enforcement should match the harm and the evidence. We help you assess options, prepare a measured first response, and pursue the path that protects the right without unnecessary escalation.",
        overviewAr:
          "ينبغي أن يتناسب الإنفاذ مع الضرر والأدلة. نساعدك على تقييم الخيارات، وإعداد ردّ أول مدروس، واتباع المسار الذي يحمي الحق دون تصعيد غير لازم.",
        benefits: [
          {
            icon: "mdi:shield-account-outline",
            titleEn: "Proportionate Action",
            titleAr: "إجراء متناسب",
            descriptionEn:
              "Letters, negotiations, and formal proceedings are chosen according to risk, evidence, and commercial goals.",
            descriptionAr:
              "تُختار الخطابات والتفاوض والإجراءات الرسمية وفق المخاطر والأدلة والأهداف التجارية.",
          },
          {
            icon: "mdi:timeline-alert-outline",
            titleEn: "Preserve the Right While You Act",
            titleAr: "حفظ الحق أثناء التحرك",
            descriptionEn:
              "Deadlines, use evidence, and ownership records are organised so enforcement is not weakened by gaps in the file.",
            descriptionAr:
              "تُنظَّم المواعيد وأدلة الاستخدام وسجلات الملكية حتى لا يضعف الإنفاذ بسبب نقص في الملف.",
          },
        ],
      }),
      service({
        slug: "ip-portfolio-advisory",
        nameEn: "IP Portfolio Advisory",
        nameAr: "إدارة محفظة الملكية الفكرية",
        taglineEn: "Treat intellectual assets as a managed portfolio.",
        taglineAr: "أدر الأصول الفكرية كمحفظة منظمة.",
        descriptionEn:
          "We help you organise, prioritise, and maintain patents, trademarks, and related rights so the portfolio supports growth rather than accumulating unused filings.",
        descriptionAr:
          "نساعدك على تنظيم حقوق البراءات والعلامات وما يرتبط بها وترتيب أولوياتها وصيانتها، لتخدم المحفظة النمو بدل أن تتراكم فيها إيداعات غير مستخدمة.",
        overviewEn:
          "A coherent portfolio is easier to budget, license, and enforce. We review what you own, where it is protected, and whether coverage still matches products, markets, and business plans.",
        overviewAr:
          "المحفظة المتماسكة أسهل في الميزانية والترخيص والإنفاذ. نراجع ما تملكه، وأين هو محمي، وما إذا كانت التغطية ما تزال توافق المنتجات والأسواق وخطط العمل.",
        benefits: [
          {
            icon: "mdi:view-dashboard-outline",
            titleEn: "Visibility Across Rights",
            titleAr: "رؤية شاملة للحقوق",
            descriptionEn:
              "Filings, deadlines, and ownership are brought into one view so decisions are not made file by file in isolation.",
            descriptionAr:
              "تُجمع الإيداعات والمواعيد والملكية في نظرة واحدة حتى لا تُتخذ القرارات ملفًا بملف بمعزل عن الباقي.",
          },
          {
            icon: "mdi:chart-timeline-variant",
            titleEn: "Spend Aligned With Value",
            titleAr: "إنفاق يوافق القيمة",
            descriptionEn:
              "Maintenance and new filings can be directed to rights that still support the business.",
            descriptionAr:
              "يمكن توجيه الصيانة والإيداعات الجديدة نحو الحقوق التي ما تزال تخدم العمل.",
          },
        ],
      }),
      service({
        slug: "digital-ip-and-domain-names",
        nameEn: "Digital IP & Domain Names",
        nameAr: "الملكية الفكرية الرقمية وأسماء النطاقات",
        taglineEn: "Protect the brand online as well as on the register.",
        taglineAr: "احمِ العلامة على الإنترنت كما في السجل.",
        descriptionEn:
          "We advise on domain names, online brand use, and digital assets so your intellectual property is not left exposed in the online environment.",
        descriptionAr:
          "نقدم المشورة حول أسماء النطاقات واستخدام العلامة عبر الإنترنت والأصول الرقمية، حتى لا تبقى حقوقك مكشوفة في البيئة الرقمية.",
        overviewEn:
          "Brands and content now live as much online as they do in official registers. We help you address domain disputes, digital impersonation, and the IP issues that arise from websites, platforms, and online commercial use.",
        overviewAr:
          "العلامات والمحتوى يعيشان اليوم على الإنترنت بقدر ما هما في السجلات الرسمية. نساعدك على التعامل مع نزاعات النطاقات والانتحال الرقمي ومسائل الملكية الفكرية الناشئة عن المواقع والمنصات والاستخدام التجاري عبر الإنترنت.",
        benefits: [
          {
            icon: "mdi:web",
            titleEn: "Online Identity Protection",
            titleAr: "حماية الهوية الرقمية",
            descriptionEn:
              "Domain and naming issues are handled together with trademark strategy, not as a separate afterthought.",
            descriptionAr:
              "تُعالَج مسائل النطاقات والأسماء مع استراتيجية العلامة، لا كأمر لاحق منفصل.",
          },
          {
            icon: "mdi:cellphone-link",
            titleEn: "Coverage for Digital Use",
            titleAr: "تغطية للاستخدام الرقمي",
            descriptionEn:
              "Advice takes into account platforms, websites, and online channels where the brand actually appears.",
            descriptionAr:
              "تراعي المشورة المنصات والمواقع والقنوات التي تظهر فيها العلامة فعليًا.",
          },
        ],
      }),
    ],
  },
];
