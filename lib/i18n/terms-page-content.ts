import type { SupportedLocale } from "@/lib/i18n/config";

export interface TermsContactInfo {
  email: string;
  phones: { label: string; value: string; href: string }[];
  closingLines: string[];
}

export interface TermsSection {
  id: string;
  number: string;
  title: string;
  paragraphs: string[];
  bullets?: string[];
  numberedItems?: string[];
  contact?: TermsContactInfo;
}

export interface TermsPageContent {
  title: string;
  companyLine: string;
  lastUpdated: string;
  allRightsReserved: string;
  sections: TermsSection[];
}

const termsPageContent: Record<SupportedLocale, TermsPageContent> = {
  en: {
    title: "Terms and Conditions",
    companyLine: "Alnawras Intellectual Property",
    lastUpdated: "Last Updated: August 2026",
    allRightsReserved: "All Rights Reserved.",
    sections: [
      {
        id: "introduction",
        number: "1.",
        title: "Introduction",
        paragraphs: [
          'Welcome to the website of Alnawras Intellectual Property ("Alnawras", "the Company", "we", "our", or "us").',
          'These Terms and Conditions ("Terms") govern your access to and use of the Company\'s website and any content, services, forms, tools, or other electronic services made available through the website.',
          "By accessing or using the website, or by submitting any inquiry or request through it, you acknowledge that you have read, understood, and agreed to be bound by these Terms. If you do not agree with any part of these Terms, you must discontinue your use of the website.",
        ],
      },
      {
        id: "company-information",
        number: "2.",
        title: "Company Information",
        paragraphs: [
          "The website is operated and services may be provided through the relevant registered entities of Alnawras Intellectual Property, depending on the nature of the service and the applicable jurisdiction, including:",
          "Jordan:\nAl Nawras Intellectual Property and Management Consultancies\nNational Establishment No.: 100480298\nCommercial Register No.: 371718\nRegistered Address: Chicago Complex, Al-Abdali, Amman, Hashemite Kingdom of Jordan.",
          "United Arab Emirates:\nAlnawras Intellectual Property – Sole Proprietorship L.L.C.\nLicence No.: CN-5690760\nUnified Registration No.: 101-2025-200029909\nUnified Licence No.: 501-2025-200018037\nRegistered Address: Al Nahyan East 25, Abu Dhabi, United Arab Emirates.",
          "Owner, Manager and Authorized Signatory:\nMr. Awwad Mohammad Hussein Al Zboon.",
        ],
      },
      {
        id: "scope-of-services",
        number: "3.",
        title: "Scope of Services",
        paragraphs: [
          "Alnawras provides professional intellectual property, legal consultancy, and related services, which may include, depending on the nature of the engagement and applicable jurisdiction:",
          "The listing of any service on the website does not constitute an obligation on the Company to provide such service unless the request is expressly accepted and the scope, fees, and applicable terms have been agreed in writing.",
        ],
        bullets: [
          "Trademark registration and prosecution.",
          "Patent filing and prosecution.",
          "Industrial design registration and protection.",
          "Copyright and related rights registration.",
          "Intellectual property portfolio management.",
          "Domain name disputes.",
          "Intellectual property searches and consultations.",
          "Preparation and review of intellectual property-related agreements and documents.",
          "Legal and commercial consultancy relating to intellectual property.",
          "Representation and follow-up before relevant authorities, where expressly agreed and duly authorized.",
          "Any other services expressly agreed with the client in writing.",
        ],
      },
      {
        id: "no-professional-relationship",
        number: "4.",
        title: "No Professional or Attorney-Client Relationship",
        paragraphs: [
          "Accessing or browsing the website, submitting an inquiry, completing an online form, or sending documents to the Company does not, by itself, create a contractual, professional, or attorney-client relationship between the user and the Company.",
          "A professional relationship shall only arise upon the Company's express acceptance of the engagement and completion of the required documentation, including an engagement letter, fee agreement, or other applicable contractual document and, where required, execution of an official Power of Attorney or other authorization.",
        ],
      },
      {
        id: "website-content",
        number: "5.",
        title: "Website Content and Information",
        paragraphs: [
          "All information, articles, publications, and materials made available on the website are provided for general informational and educational purposes only.",
          "Unless expressly stated otherwise, such content does not constitute legal advice or a legal opinion tailored to any particular matter and should not be relied upon as a substitute for professional advice based on the specific circumstances of a case.",
          "Laws, regulations, procedures, fees, deadlines, and official requirements may change from time to time. Accordingly, the Company does not warrant that all information published on the website will always be complete, current, accurate, or error-free.",
        ],
      },
      {
        id: "user-responsibilities",
        number: "6.",
        title: "User Information and Responsibilities",
        paragraphs: [
          "When submitting any request, inquiry, information, or document to the Company, the user represents and undertakes that:",
          "The Company shall not be responsible for any delay, loss, or adverse outcome resulting from inaccurate, incomplete, misleading, or late information or documentation provided by the user or client.",
        ],
        numberedItems: [
          "All information provided is true, accurate, and complete.",
          "The user is legally authorized to provide such information and documents.",
          "Documents submitted are genuine and are not fraudulent, misleading, or unlawfully altered.",
          "The user will provide all information and documents reasonably required by the Company in a timely manner.",
          "The user will promptly notify the Company of any change that may affect the relevant matter or service.",
        ],
      },
      {
        id: "fees",
        number: "7.",
        title: "Professional Fees, Government Fees and Expenses",
        paragraphs: [
          "Professional fees and service charges shall be governed by the quotation, engagement letter, fee agreement, or other written arrangement issued or agreed by the Company.",
          "Depending on the nature of the service, additional charges may apply, including government fees, registration fees, publication fees, renewal fees, official charges, translation and legalization costs, courier charges, and other third-party expenses.",
          "Official fees paid to government authorities or intellectual property offices shall be subject to the applicable policies of those authorities and shall generally be non-refundable once paid, unless otherwise permitted by the relevant authority.",
          "Any prices, estimates, or indicative fees published on the website shall not constitute a final or binding offer unless expressly confirmed in writing by the Company.",
        ],
      },
      {
        id: "payment",
        number: "8.",
        title: "Payment, Cancellation and Refunds",
        paragraphs: [
          "Payment terms and deadlines shall be specified in the relevant quotation, engagement letter, fee agreement, or other applicable agreement.",
          "Where a client requests cancellation before the Company has commenced work, the Company may, depending on the nature of the service, consider refunding amounts received after deducting any work performed, administrative costs, expenses, or other costs already incurred.",
          "Once filings have been submitted to an official authority, professional or legal work has commenced, or government or third-party fees have been paid, the relevant fees may become non-refundable, subject to the nature of the service and the agreement with the client.",
          "A rejection, objection, refusal, or other decision issued by a government authority or intellectual property office shall not automatically entitle the client to a refund where the Company has performed the agreed services.",
        ],
      },
      {
        id: "timeframes",
        number: "9.",
        title: "Timeframes and Results",
        paragraphs: [
          "The Company will use reasonable professional efforts to perform and follow up on services in a timely manner.",
          "However, timeframes, procedures, and outcomes may depend on government authorities, intellectual property offices, courts, registries, and other third parties.",
          "The Company does not guarantee the acceptance or registration of any trademark, patent, industrial design, copyright, or other intellectual property right, nor does it guarantee any particular decision or outcome.",
          "The Company shall not be responsible for delays, decisions, actions, system failures, or other circumstances attributable to governmental authorities, third parties, or circumstances beyond the Company's reasonable control.",
        ],
      },
      {
        id: "confidentiality",
        number: "10.",
        title: "Confidentiality",
        paragraphs: [
          "The Company shall maintain the confidentiality of information and documents received in the course of its professional relationship with clients, in accordance with applicable laws, regulations, professional obligations, and contractual commitments.",
          "Information may be disclosed to the extent reasonably necessary to perform the requested services, pursuant to the client's instructions or authorization, or where disclosure is required by applicable law or an order of a competent authority.",
          "Personal data shall also be handled in accordance with the Company's Privacy Policy.",
        ],
      },
      {
        id: "website-ip",
        number: "11.",
        title: "Intellectual Property Rights in the Website",
        paragraphs: [
          "All intellectual property rights relating to the website and its content, including its name, trademarks, logos, text, designs, images, graphics, software, databases, publications, and audio-visual materials, are owned by the Company or used under lawful license.",
          "No part of the website may be copied, reproduced, modified, distributed, published, or commercially exploited without the Company's prior written consent.",
        ],
      },
      {
        id: "trademarks",
        number: "12.",
        title: "Trademarks and Trade Names",
        paragraphs: [
          "The Company's name, trademarks, logos, and related branding elements may not be used in any manner that suggests an unauthorized partnership, endorsement, affiliation, representation, or official relationship with the Company.",
        ],
      },
      {
        id: "acceptable-use",
        number: "13.",
        title: "Acceptable Use of the Website",
        paragraphs: ["The user agrees not to:"],
        bullets: [
          "Use the website for any unlawful, fraudulent, or unauthorized purpose.",
          "Provide false, misleading, or inaccurate information.",
          "Impersonate any individual or entity.",
          "Attempt unauthorized access to the website, servers, systems, or networks.",
          "Interfere with the operation, security, or performance of the website.",
          "Upload or transmit harmful, malicious, or unlawful content.",
          "Use automated means to extract, reproduce, or copy website content without authorization.",
          "Use the website in a manner that infringes the rights of the Company or any third party.",
        ],
      },
      {
        id: "third-party",
        number: "14.",
        title: "Third-Party Links and Services",
        paragraphs: [
          "The website may contain links to websites, platforms, or services operated by third parties.",
          "Such links are provided for convenience only and do not constitute an endorsement or approval by the Company of the content, services, policies, or practices of those third parties.",
          "The Company shall not be responsible for the availability, content, security, privacy practices, or services of any third-party website or platform.",
        ],
      },
      {
        id: "data-protection",
        number: "15.",
        title: "Data Protection",
        paragraphs: [
          "The Company processes personal data in accordance with its Privacy Policy and applicable data protection laws.",
          "Data may be processed or transferred between the Company's relevant entities, intellectual property offices, government authorities, or third-party service providers to the extent reasonably necessary to perform the requested services or comply with applicable legal and regulatory obligations.",
        ],
      },
      {
        id: "disclaimer",
        number: "16.",
        title: "Disclaimer",
        paragraphs: [
          "The Company makes reasonable efforts to maintain the accuracy and availability of the website. However, the website and its electronic content and services are provided to the extent permitted by law, without any absolute guarantee that the website will be continuously available, uninterrupted, secure, or free from errors.",
          "Nothing contained on the website shall be interpreted as a guarantee of any particular legal, commercial, administrative, or regulatory outcome.",
        ],
      },
      {
        id: "limitation",
        number: "17.",
        title: "Limitation of Liability",
        paragraphs: [
          "To the maximum extent permitted by applicable law, the Company shall not be liable for any indirect, incidental, consequential, special, or similar loss or damage arising from or relating to the use of, or inability to use, the website or reliance upon its content.",
          "Nothing in these Terms shall exclude or limit any liability that cannot lawfully be excluded or limited under applicable law.",
        ],
      },
      {
        id: "indemnification",
        number: "18.",
        title: "Indemnification",
        paragraphs: [
          "The user shall be responsible for any claims, losses, costs, or expenses arising from the user's unlawful use of the website, violation of these Terms, or infringement of the rights of the Company or any third party, to the extent permitted by applicable law.",
        ],
      },
      {
        id: "suspension",
        number: "19.",
        title: "Suspension or Termination of Access",
        paragraphs: [
          "The Company may suspend, restrict, or terminate a user's access to the website, to the extent permitted by law, where the user violates these Terms or applicable laws or where such use threatens the security of the website or the rights of the Company or any third party.",
        ],
      },
      {
        id: "amendments",
        number: "20.",
        title: "Amendments to These Terms",
        paragraphs: [
          "The Company may amend or update these Terms from time to time to reflect legal, technical, operational, or commercial developments.",
          "Any amendments shall become effective upon publication of the updated Terms on the website, unless a different effective date is specified.",
        ],
      },
      {
        id: "governing-law",
        number: "21.",
        title: "Governing Law and Jurisdiction",
        paragraphs: [
          "These Terms shall be governed by and construed in accordance with the laws applicable to the jurisdiction in which the relevant contracting entity is registered or in which the relevant services are provided, taking into account the nature of the service and the applicable jurisdictional rules.",
          "Any dispute arising from or relating to the use of the website or the services shall be subject to the jurisdiction of the competent courts of the relevant jurisdiction, unless otherwise agreed in writing.",
        ],
      },
      {
        id: "severability",
        number: "22.",
        title: "Severability",
        paragraphs: [
          "If any provision of these Terms is found to be invalid, unlawful, or unenforceable, such provision shall be enforced to the maximum extent permitted by law, and the remaining provisions shall continue in full force and effect.",
        ],
      },
      {
        id: "client-agreements",
        number: "23.",
        title: "Client-Specific Agreements",
        paragraphs: [
          "In the event of any conflict between these Terms and a specific engagement letter, fee agreement, contract, or other written agreement signed with a client, the provisions of the specific agreement shall prevail with respect to the subject matter covered by that agreement.",
        ],
      },
      {
        id: "contact",
        number: "24.",
        title: "Contact Us",
        paragraphs: [
          "For any questions or inquiries regarding these Terms and Conditions, please contact us through:",
        ],
        contact: {
          email: "info@aipmcae.com",
          phones: [
            { label: "UAE", value: "+971 50 660 9757", href: "tel:+971506609757" },
            { label: "Jordan", value: "+962 77 725 9606", href: "tel:+962777259606" },
          ],
          closingLines: ["Alnawras Intellectual Property"],
        },
      },
    ],
  },
  ar: {
    title: "الشروط والأحكام",
    companyLine: "شركة النورس للملكية الفكرية",
    lastUpdated: "تاريخ آخر تحديث: أغسطس 2026",
    allRightsReserved: "جميع الحقوق محفوظة.",
    sections: [
      {
        id: "introduction",
        number: "١.",
        title: "مقدمة",
        paragraphs: [
          'مرحبا بكم في الموقع الإلكتروني لشركة النورس للملكية الفكرية ("النورس" أو "الشركة" أو "نحن" أو "لنا").',
          'تنظم هذه الشروط والأحكام ("الشروط") استخدامك للموقع الإلكتروني للشركة وأي محتوى أو خدمات أو نماذج أو أدوات إلكترونية متاحة من خلاله.',
          "باستخدامك الموقع أو الدخول إليه أو إرسال أي طلب أو استفسار من خلاله، فإنك تقر بأنك قرأت هذه الشروط وفهمتها ووافقت على الالتزام بها. وفي حال عدم موافقتك على أي من أحكامها، يجب عليك التوقف عن استخدام الموقع.",
        ],
      },
      {
        id: "company-information",
        number: "٢.",
        title: "تعريف الشركة",
        paragraphs: [
          "يدار الموقع وتقدم الخدمات من خلال الجهات المسجلة التابعة لشركة النورس للملكية الفكرية، بحسب طبيعة الخدمة والاختصاص القضائي المعني، وتشمل:",
          "الأردن:\nAl Nawras Intellectual Property and Management Consultancies\nرقم المنشأة الوطني: 100480298\nرقم السجل التجاري: 371718\nالعنوان المسجل: Chicago Complex, Al-Abdali, Amman, Hashemite Kingdom of Jordan.",
          "الإمارات العربية المتحدة:\nAlnawras Intellectual Property – Sole Proprietorship L.L.C.\nرقم الرخصة: CN-5690760\nرقم التسجيل الموحد: 101-2025-200029909\nرقم الرخصة الموحد: 501-2025-200018037\nالعنوان المسجل: Al Nahyan East 25, Abu Dhabi, United Arab Emirates.",
          "المالك والمدير والمفوض بالتوقيع:\nالسيد/ عواد محمد حسين الزبون.",
        ],
      },
      {
        id: "scope-of-services",
        number: "٣.",
        title: "نطاق الخدمات",
        paragraphs: [
          "تقدم الشركة خدمات مهنية في مجال الملكية الفكرية والاستشارات القانونية والمرتبطة بها، والتي قد تشمل، بحسب طبيعة الخدمة والاختصاص:",
          "ولا يعد عرض أي خدمة على الموقع التزاماً من الشركة بتقديمها، ما لم يتم قبول الطلب والاتفاق على نطاق العمل والأتعاب والشروط ذات الصلة كتابة.",
        ],
        bullets: [
          "تسجيل ومتابعة العلامات التجارية.",
          "تسجيل ومتابعة براءات الاختراع.",
          "حماية وتسجيل النماذج الصناعية.",
          "تسجيل حقوق المؤلف والحقوق المرتبطة بها.",
          "إدارة محافظ حقوق الملكية الفكرية.",
          "منازعات أسماء النطاقات.",
          "البحث والاستشارات المتعلقة بالملكية الفكرية.",
          "إعداد ومراجعة الاتفاقيات والمستندات ذات الصلة بالملكية الفكرية.",
          "الاستشارات القانونية والتجارية ذات الصلة.",
          "خدمات التمثيل والمتابعة أمام الجهات الرسمية، متى تم الاتفاق عليها وتفويض الشركة بذلك.",
          "أي خدمات أخرى يتم الاتفاق عليها كتابة مع العميل.",
        ],
      },
      {
        id: "no-professional-relationship",
        number: "٤.",
        title: "عدم نشوء علاقة مهنية بمجرد استخدام الموقع",
        paragraphs: [
          "لا يؤدي الدخول إلى الموقع أو تصفحه أو إرسال استفسار أو تعبئة نموذج إلكتروني أو إرسال مستندات إلى إنشاء علاقة تعاقدية أو مهنية أو علاقة محامٍ وموكل بين المستخدم والشركة.",
          "تنشأ العلاقة المهنية فقط بعد قبول الشركة تقديم الخدمة بصورة صريحة، وإتمام المستندات المطلوبة، بما في ذلك اتفاقية الأتعاب أو خطاب التكليف أو أي اتفاقية أخرى، وتنفيذ الوكالة أو التفويض الرسمي متى كان ذلك مطلوبا.",
        ],
      },
      {
        id: "website-content",
        number: "٥.",
        title: "المعلومات والمحتوى المنشور",
        paragraphs: [
          "يتم توفير المعلومات والمقالات والمواد المنشورة على الموقع لأغراض عامة وتثقيفية فقط.",
          "ولا تشكل هذه المعلومات، ما لم ينص صراحة على خلاف ذلك، استشارة قانونية أو رأيا قانونيا مخصصا لحالة معينة، ولا ينبغي الاعتماد عليها باعتبارها بديلا عن الحصول على استشارة مهنية تتناسب مع ظروف الحالة.",
          "كما أن القوانين واللوائح والإجراءات والرسوم والمواعيد قد تتغير من وقت لآخر، ولا تضمن الشركة أن تكون جميع المعلومات المنشورة على الموقع محدثة أو مكتملة أو خالية من الأخطاء في جميع الأوقات.",
        ],
      },
      {
        id: "user-responsibilities",
        number: "٦.",
        title: "طلبات المستخدم ومسؤوليته",
        paragraphs: [
          "يتعهد المستخدم عند تقديم أي طلب أو استفسار أو مستند إلى الشركة بأن:",
          "ولا تتحمل الشركة مسؤولية أي تأخير أو خسارة أو نتيجة سلبية ناتجة عن معلومات غير صحيحة أو ناقصة أو متأخرة يقدمها المستخدم أو العميل.",
        ],
        numberedItems: [
          "تكون المعلومات المقدمة صحيحة ودقيقة وكاملة.",
          "يكون مخولا قانونا بتقديم المعلومات والمستندات.",
          "تكون المستندات المقدمة أصلية أو صحيحة وغير مزورة أو مضللة.",
          "يقوم بتزويد الشركة بالمعلومات والمستندات المطلوبة في الوقت المناسب.",
          "يبلغ الشركة فوراً بأي تغيير قد يؤثر على الطلب أو الخدمة.",
        ],
      },
      {
        id: "fees",
        number: "٧.",
        title: "الأتعاب والرسوم والمصاريف",
        paragraphs: [
          "تخضع الأتعاب المهنية ورسوم الخدمات للعرض أو الاتفاقية أو خطاب التكليف الصادر عن الشركة.",
          "وقد تضاف إلى الأتعاب المهنية، بحسب طبيعة الخدمة، رسوم حكومية أو رسوم تسجيل أو نشر أو تجديد أو رسوم جهات رسمية أو مصاريف ترجمة وتصديق وشحن أو أي تكاليف أخرى تتعلق بتنفيذ الخدمة.",
          "وتعامل الرسوم الرسمية التي يتم سدادها للجهات الحكومية أو مكاتب الملكية الفكرية وفقاً لسياسات تلك الجهات، ولا تعتبر قابلة للاسترداد بمجرد سدادها، ما لم تسمح الجهة المختصة بخلاف ذلك.",
          "ولا تعتبر أي أسعار أو تقديرات منشورة على الموقع عرضا نهائيا أو ملزما ما لم يتم تأكيدها كتابيا من الشركة.",
        ],
      },
      {
        id: "payment",
        number: "٨.",
        title: "الدفع والإلغاء والاسترداد",
        paragraphs: [
          "تحدد شروط الدفع ومواعيده في العرض أو اتفاقية الأتعاب أو خطاب التكليف.",
          "في حال طلب العميل إلغاء الخدمة قبل البدء في تنفيذها، يجوز للشركة، وفقاً لطبيعة الخدمة، النظر في رد المبالغ المستلمة بعد خصم أي أعمال أو مصاريف أو تكاليف تم تكبدها.",
          "أما بعد تقديم الطلبات إلى الجهات الرسمية أو بدء الأعمال القانونية أو المهنية أو سداد الرسوم الحكومية أو رسوم الأطراف الثالثة، فقد تصبح الأتعاب والرسوم غير قابلة للاسترداد، بحسب طبيعة الخدمة والاتفاق المبرم مع العميل.",
          "ولا يترتب على رفض طلب أو اعتراض أو قرار صادر عن جهة حكومية أو مكتب ملكية فكرية التزام تلقائي على الشركة برد الأتعاب، متى كانت الشركة قد نفذت الأعمال المتفق عليها.",
        ],
      },
      {
        id: "timeframes",
        number: "٩.",
        title: "المدد والنتائج",
        paragraphs: [
          "تبذل الشركة جهودا مهنية معقولة لتنفيذ الخدمات ومتابعة الملفات في الوقت المناسب.",
          "ومع ذلك، فإن المدد والإجراءات والنتائج تعتمد، في كثير من الحالات، على الجهات الحكومية ومكاتب الملكية الفكرية والمحاكم والجهات الأخرى المختصة.",
          "ولا تضمن الشركة قبول أو تسجيل أي علامة تجارية أو براءة اختراع أو تصميم أو حق من حقوق الملكية الفكرية، ولا تضمن صدور قرار معين أو تحقيق نتيجة محددة.",
          "كما لا تتحمل الشركة مسؤولية التأخير أو النتائج الناشئة عن قرارات أو إجراءات أو أعطال أو تأخيرات لدى الجهات الرسمية أو الأطراف الثالثة أو بسبب ظروف خارجة عن سيطرتها المعقولة.",
        ],
      },
      {
        id: "confidentiality",
        number: "١٠.",
        title: "السرية",
        paragraphs: [
          "تلتزم الشركة بالمحافظة على سرية المعلومات والمستندات التي تحصل عليها في إطار علاقتها المهنية مع عملائها، وفقا للقوانين والأنظمة والالتزامات المهنية والتعاقدية ذات الصلة.",
          "ويجوز الإفصاح عن المعلومات بالقدر اللازم لتنفيذ الخدمة أو بناء على تعليمات العميل أو تفويضه أو متى كان الإفصاح مطلوبا بموجب القانون أو قرار صادر عن جهة مختصة.",
          "وتخضع البيانات الشخصية أيضاً لسياسة الخصوصية المنشورة على الموقع.",
        ],
      },
      {
        id: "website-ip",
        number: "١١.",
        title: "الملكية الفكرية للموقع",
        paragraphs: [
          "جميع حقوق الملكية الفكرية المتعلقة بالموقع ومحتواه، بما في ذلك الاسم والعلامات والشعارات والنصوص والتصميمات والصور والرسومات والبرمجيات وقواعد البيانات والمقالات والمحتوى المرئي والمسموع، مملوكة للشركة أو مستخدمة بموجب ترخيص قانوني.",
          "ولا يجوز نسخ أو إعادة إنتاج أو تعديل أو توزيع أو نشر أو استغلال أي جزء من محتوى الموقع لأغراض تجارية دون موافقة كتابية مسبقة من الشركة.",
        ],
      },
      {
        id: "trademarks",
        number: "١٢.",
        title: "العلامات والأسماء التجارية",
        paragraphs: [
          "لا يجوز استخدام اسم الشركة أو علاماتها التجارية أو شعاراتها أو أي عناصر مرتبطة بها بطريقة توحي بوجود شراكة أو اعتماد أو تمثيل أو علاقة رسمية غير موجودة فعليا.",
        ],
      },
      {
        id: "acceptable-use",
        number: "١٣.",
        title: "استخدام الموقع",
        paragraphs: ["يتعهد المستخدم بعدم:"],
        bullets: [
          "استخدام الموقع لأي غرض غير مشروع أو احتيالي.",
          "تقديم معلومات كاذبة أو مضللة.",
          "انتحال شخصية شخص أو جهة أخرى.",
          "محاولة الوصول غير المصرح به إلى أنظمة الموقع أو خوادمه.",
          "تعطيل الموقع أو التأثير على أمنه أو أدائه.",
          "تحميل أو نشر أي محتوى ضار أو غير قانوني.",
          "استخدام وسائل آلية لاستخراج أو نسخ محتوى الموقع دون موافقة.",
          "استخدام الموقع بطريقة تنتهك حقوق الشركة أو حقوق أي طرف ثالث.",
        ],
      },
      {
        id: "third-party",
        number: "١٤.",
        title: "الروابط والخدمات التابعة للغير",
        paragraphs: [
          "قد يحتوي الموقع على روابط إلى مواقع أو منصات تابعة لأطراف ثالثة.",
          "وتقدم هذه الروابط للتسهيل فقط، ولا تعني اعتماد الشركة لمحتوى أو خدمات تلك المواقع، ولا تتحمل الشركة مسؤولية محتواها أو سياساتها أو ممارساتها أو مدى توفرها.",
        ],
      },
      {
        id: "data-protection",
        number: "١٥.",
        title: "حماية البيانات",
        paragraphs: [
          "تتعامل الشركة مع البيانات الشخصية وفقا لسياسة الخصوصية الخاصة بها والقوانين المعمول بها.",
          "وقد تتم معالجة أو نقل بعض البيانات بين الجهات التابعة للشركة أو إلى مكاتب الملكية الفكرية والجهات الحكومية أو مقدمي الخدمات من الأطراف الثالثة، بالقدر اللازم لتنفيذ الخدمات أو الوفاء بالالتزامات القانونية والتنظيمية.",
        ],
      },
      {
        id: "disclaimer",
        number: "١٦.",
        title: "إخلاء المسؤولية",
        paragraphs: [
          "يبذل الموقع والشركة جهودا معقولة لضمان دقة المعلومات وتوفر الموقع، إلا أن الموقع والمحتوى والخدمات الإلكترونية يتم تقديمها في حدود ما يسمح به القانون ودون ضمان مطلق لاستمرارية الموقع أو خلوه من الأخطاء أو الانقطاعات.",
          "ولا يجوز تفسير أي محتوى على الموقع على أنه ضمان لنتيجة قانونية أو تجارية أو إدارية أو تنظيمية محددة.",
        ],
      },
      {
        id: "limitation",
        number: "١٧.",
        title: "حدود المسؤولية",
        paragraphs: [
          "في الحدود التي يسمح بها القانون، لا تتحمل الشركة المسؤولية عن أي خسائر أو أضرار غير مباشرة أو عرضية أو تبعية أو خاصة تنشأ عن استخدام الموقع أو عدم القدرة على استخدامه أو الاعتماد على محتواه.",
          "ولا يحد أي حكم في هذه الشروط من أي مسؤولية لا يجوز استبعادها أو تقييدها بموجب القانون الواجب التطبيق.",
        ],
      },
      {
        id: "indemnification",
        number: "١٨.",
        title: "تعويض الشركة",
        paragraphs: [
          "يتحمل المستخدم المسؤولية عن أي مطالبات أو خسائر أو تكاليف أو مصاريف تنشأ نتيجة استخدامه غير المشروع للموقع أو مخالفته لهذه الشروط أو انتهاكه حقوق الشركة أو حقوق أي طرف ثالث، وذلك في الحدود التي يسمح بها القانون.",
        ],
      },
      {
        id: "suspension",
        number: "١٩.",
        title: "تعليق أو إنهاء الوصول",
        paragraphs: [
          "يجوز للشركة تعليق أو تقييد وصول أي مستستخدم إلى الموقع، وفقا للقانون، إذا كان استخدام الموقع مخالفا لهذه الشروط أو للقوانين المعمول بها أو من شأنه تهديد أمن الموقع أو حقوق الشركة أو الغير.",
        ],
      },
      {
        id: "amendments",
        number: "٢٠.",
        title: "تعديل الشروط",
        paragraphs: [
          "يجوز للشركة تعديل أو تحديث هذه الشروط من وقت لآخر لمواكبة التطورات القانونية أو التقنية أو التجارية.",
          "وتصبح التعديلات نافذة من تاريخ نشر النسخة المحدثة على الموقع، ما لم يحدد تاريخ آخر.",
        ],
      },
      {
        id: "governing-law",
        number: "٢١.",
        title: "القانون الواجب التطبيق والاختصاص القضائي",
        paragraphs: [
          "تخضع هذه الشروط وتفسر وفقا للقوانين المعمول بها في الدولة التي يكون فيها الكيان المتعاقد مع العميل مسجلا أو الذي يقدم الخدمة ذات الصلة، مع مراعاة طبيعة الخدمة والاختصاص القضائي المختص.",
          "وتخضع أي منازعة تنشأ عن استخدام الموقع أو الخدمات للاختصاص القضائي للمحكمة المختصة قانونا في الدولة أو الولاية القضائية ذات الصلة، ما لم يتم الاتفاق كتابةً على خلاف ذلك.",
        ],
      },
      {
        id: "severability",
        number: "٢٢.",
        title: "قابلية الفصل",
        paragraphs: [
          "إذا تبين أن أي حكم من أحكام هذه الشروط غير صالح أو غير قابل للتنفيذ، فلا يؤثر ذلك على صحة ونفاذ باقي الأحكام، وتظل الأحكام الأخرى نافذة بالقدر الذي يسمح به القانون.",
        ],
      },
      {
        id: "client-agreements",
        number: "٢٣.",
        title: "الاتفاقات الخاصة بالعملاء",
        paragraphs: [
          "في حال وجود تعارض بين هذه الشروط وأي اتفاقية أتعاب أو خطاب تكليف أو عقد أو مستند تعاقدي خاص وموقع مع العميل، تسود أحكام الاتفاقية الخاصة في حدود موضوعها.",
        ],
      },
      {
        id: "contact",
        number: "٢٤.",
        title: "التواصل",
        paragraphs: ["لأي استفسارات تتعلق بهذه الشروط والأحكام، يمكن التواصل مع الشركة عبر:"],
        contact: {
          email: "info@aipmcae.com",
          phones: [
            { label: "الإمارات", value: "00971506609757", href: "tel:+971506609757" },
            { label: "الأردن", value: "00962777259606", href: "tel:+962777259606" },
          ],
          closingLines: ["شركة النورس للملكية الفكرية", "Alnawras Intellectual Property"],
        },
      },
    ],
  },
};

export function getTermsPageContent(locale: SupportedLocale): TermsPageContent {
  return termsPageContent[locale];
}
