import type { SupportedLocale } from "@/lib/i18n/config";

export const PUBLIC_BLOG_PAGE_SIZE = 4;

export function getBlogPageContent(locale: SupportedLocale) {
  if (locale === "ar") {
    return {
      seo: {
        title: "المقالات والرؤى | النورس للملكية الفكرية",
        description:
          "استكشف رؤى ومقالات متخصصة في الملكية الفكرية، والتطورات القانونية، والتحديثات التنظيمية، والمنظور العملي من النورس للملكية الفكرية.",
      },
      featuredBadge: "مميز",
      readFullBlog: "اقرأ المقال كاملًا",
      readMore: "اقرأ المزيد",
      searchInsights: "ابحث في الرؤى",
      searchPlaceholder: "كلمات مفتاحية…",
      popularTopics: "المواضيع الشائعة",
      stayInformed: "ابقَ على اطلاع",
      stayInformedDescription:
        "اشترك لتصلك رؤى الملكية الفكرية العالمية، والتحديثات التنظيمية، والمعلومات الاستراتيجية مباشرة إلى بريدك.",
      emailPlaceholder: "بريدك الإلكتروني",
      subscribeNow: "اشترك الآن",
      newsletterPending:
        "سيتم تفعيل الاشتراك في النشرة البريدية قريبًا. شكرًا لاهتمامك.",
      invalidEmail: "يرجى إدخال بريد إلكتروني صالح.",
      noBlogs: "لا توجد مقالات منشورة حاليًا.",
      noSearchResults: "لم يتم العثور على مقالات مطابقة لبحثك.",
      noCategoryResults: "لا توجد مقالات في هذا التصنيف.",
      readingTime: "{minutes} دقائق للقراءة",
      share: "مشاركة",
      linkCopied: "تم نسخ الرابط",
      download: "تحميل",
      getTheReport: "تحميل التقرير",
      relatedArticles: "مقالات ذات صلة",
      previousPage: "السابق",
      nextPage: "التالي",
      pageLabel: "صفحة",
    } as const;
  }

  return {
    seo: {
      title: "Insights & Articles | Al Nawras Intellectual Property",
      description:
        "Explore intellectual property insights, legal developments, regulatory updates, and practical perspectives from Al Nawras Intellectual Property.",
    },
    featuredBadge: "Featured",
    readFullBlog: "Read Full Blog",
    readMore: "Read More",
    searchInsights: "Search Insights",
    searchPlaceholder: "Key words…",
    popularTopics: "Popular Topics",
    stayInformed: "Stay Informed",
    stayInformedDescription:
      "Subscribe to receive global IP insights, regulatory updates, and strategic intelligence directly to your inbox.",
    emailPlaceholder: "Your email",
    subscribeNow: "Subscribe Now",
    newsletterPending:
      "Newsletter subscription will be available soon. Thank you for your interest.",
    invalidEmail: "Please enter a valid email address.",
    noBlogs: "No published articles yet.",
    noSearchResults: "No articles match your search.",
    noCategoryResults: "No articles in this category.",
    readingTime: "{minutes} min read",
    share: "Share",
    linkCopied: "Link copied",
    download: "Download",
    getTheReport: "Get the Report",
    relatedArticles: "Related Articles",
    previousPage: "Previous",
    nextPage: "Next",
    pageLabel: "Page",
  } as const;
}

export type BlogPageContent = ReturnType<typeof getBlogPageContent>;
