import type { SupportedLocale } from "@/lib/i18n/config";

export interface ContactPageContent {
  seo: {
    title: string;
    description: string;
  };
  hero: {
    title: string;
    description: string;
  };
  form: {
    heading: string;
    fullName: string;
    email: string;
    phone: string;
    company: string;
    enquiryType: string;
    country: string;
    message: string;
    submit: string;
    placeholders: {
      fullName: string;
      email: string;
      phone: string;
      company: string;
      select: string;
      message: string;
      countrySearch: string;
      serviceSearch: string;
    };
    errors: {
      required: string;
      invalidEmail: string;
      invalidPhone: string;
      selectService: string;
      selectCountry: string;
      submitFailed: string;
    };
    success: string;
  };
  contactInfo: {
    heading: string;
    officeLocation: string;
    phone: string;
    email: string;
    viewOnMap: string;
  };
}

const contactPageContent: Record<SupportedLocale, ContactPageContent> = {
  en: {
    seo: {
      title: "Contact Us",
      description:
        "Get in touch with Al Nawras Intellectual Property for specialised intellectual property advice, legal services, and support for protecting and managing your intellectual assets.",
    },
    hero: {
      title: "Get in Touch",
      description:
        "Whether you need strategic intellectual property advice or have a question about our services, our team of global experts is ready to assist you. Let's start the conversation.",
    },
    form: {
      heading: "Send us a message",
      fullName: "Full Name",
      email: "Email Address",
      phone: "Phone Number",
      company: "Company",
      enquiryType: "Enquiry Type",
      country: "Country",
      message: "Message",
      submit: "Send Message",
      placeholders: {
        fullName: "Enter your full name",
        email: "Enter your email address",
        phone: "Enter your phone number",
        company: "Enter your company",
        select: "Select",
        message: "How can we help you?",
        countrySearch: "Search countries…",
        serviceSearch: "Search enquiry types…",
      },
      errors: {
        required: "This field is required",
        invalidEmail: "Enter a valid email address",
        invalidPhone: "Enter a valid international phone number",
        selectService: "Select an enquiry type",
        selectCountry: "Select a country",
        submitFailed: "We could not send your message. Please try again.",
      },
      success:
        "Your message has been sent successfully. We will get back to you shortly.",
    },
    contactInfo: {
      heading: "Global Headquarters",
      officeLocation: "Office Location",
      phone: "Phone",
      email: "Email",
      viewOnMap: "View on map",
    },
  },
  ar: {
    seo: {
      title: "تواصل معنا",
      description:
        "تواصل مع النورس للملكية الفكرية للحصول على استشارات وخدمات قانونية متخصصة في حماية وإدارة حقوق وأصول الملكية الفكرية.",
    },
    hero: {
      title: "تواصل معنا",
      description:
        "سواء كنت بحاجة إلى استشارة استراتيجية في مجال الملكية الفكرية أو لديك استفسار حول خدماتنا، فإن فريقنا من الخبراء جاهز لمساعدتك. لنبدأ الحوار.",
    },
    form: {
      heading: "أرسل لنا رسالة",
      fullName: "الاسم الكامل",
      email: "البريد الإلكتروني",
      phone: "رقم الهاتف",
      company: "الشركة",
      enquiryType: "نوع الاستفسار",
      country: "الدولة",
      message: "الرسالة",
      submit: "إرسال الرسالة",
      placeholders: {
        fullName: "أدخل اسمك الكامل",
        email: "أدخل بريدك الإلكتروني",
        phone: "أدخل رقم هاتفك",
        company: "أدخل اسم الشركة",
        select: "اختر",
        message: "كيف يمكننا مساعدتك؟",
        countrySearch: "ابحث عن الدولة…",
        serviceSearch: "ابحث عن نوع الاستفسار…",
      },
      errors: {
        required: "هذا الحقل مطلوب",
        invalidEmail: "يرجى إدخال بريد إلكتروني صالح",
        invalidPhone: "يرجى إدخال رقم هاتف دولي صالح",
        selectService: "يرجى اختيار نوع الاستفسار",
        selectCountry: "يرجى اختيار الدولة",
        submitFailed: "تعذر إرسال رسالتك. يرجى المحاولة مرة أخرى.",
      },
      success: "تم إرسال رسالتك بنجاح. سنتواصل معك في أقرب وقت ممكن.",
    },
    contactInfo: {
      heading: "المقر الرئيسي",
      officeLocation: "موقع المكتب",
      phone: "الهاتف",
      email: "البريد الإلكتروني",
      viewOnMap: "عرض على الخريطة",
    },
  },
};

export function getContactPageContent(locale: SupportedLocale): ContactPageContent {
  return contactPageContent[locale];
}
