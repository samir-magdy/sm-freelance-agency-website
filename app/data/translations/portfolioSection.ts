import type { Localized } from "@/app/types";

export const portfolioSectionTranslations: Record<
  "heading" | "subheading" | "viewLiveSite" | "primaryCta",
  Localized
> = {
  heading: {
    en: "Our Work",
    ar: "معرض الأعمال",
  },
  subheading: {
    en: "Explore our featured projects",
    ar: "استعرض أحدث مشاريعنا",
  },
  viewLiveSite: {
    en: "View Site",
    ar: "زيارة الموقع",
  },
  primaryCta: {
    en: "Get in Touch",
    ar: "إبدأ موقعك",
  },
};

interface ProjectCopy {
  title: Localized;
  description: Localized;
}

export type ProjectId =
  | "ecommerce"
  | "travelTourism"
  | "interiorDesign"
  | "butterDesign"
  | "hadeerEnglish";

export const projectTranslations: Record<ProjectId, ProjectCopy> = {
  ecommerce: {
    title: {
      en: "Lunera",
      ar: "متجر لونيرا للأزياء",
    },
    description: {
      en: "In the crowded fashion market, generic websites lose sales to bigger brands with better sites. This web design provides the optimal user experience and the elegant design you need to become the preferred choice for shoppers.",
      ar: "في سوق الأزياء، تخسر المواقع التقليدية الكثير من فرص البيع لصالح العلامات التجارية التي تهتم بتجربة العميل. هذا التصميم يقدم واجهة احترافية وسلسة لتجعل متجرك الاختيار الافضل.",
    },
  },

  travelTourism: {
    title: {
      en: "Sky-Way Travel",
      ar: "السياحة والسفر",
    },
    description: {
      en: "Built for Sky Way Travel, a travel agency in Cairo specializing in trips to Dahab and Sinai. This website showcases their tours and destinations, making it easy for visitors to find what they want and giving them the confidence to book.",
      ar: "غالباً ما يميل المسافرون لاختيار الوكالات التي تعكس صورة احترافية ومُلهمة. يعمل هذا التصميم على عرض رحلاتك ووجهاتك بأسلوب بصري جذاب، مما يمنح الزوار الثقة الكاملة لحجز رحلتهم القادمة عبر وكالتك.",
    },
  },

  interiorDesign: {
    title: {
      en: "Interior Design & Decor",
      ar: "التصميم والديكور",
    },
    description: {
      en: "Clients hire the interior designer whose portfolio inspires confidence and elegance before the first meeting. This site showcases your projects with the visual impact needed to attract clients willing to invest in quality interior design.",
      ar: "العميل يختار المصمم الذي يُلهمه بورتفوليو قبل أول اجتماع. هذا الموقع يعرض مشاريعك بتأثير بصري يجذب العملاء الجادين المستعدين للاستثمار في التصميم الراقي.",
    },
  },

  butterDesign: {
    title: {
      en: "Butter Design Bureau",
      ar: "تصميم وهوية بصرية",
    },
    description: {
      en: "A design & branding agency in Cairo, specializing in brand identity, strategy, and visual design. We built their website with an inspiring and playful vibe that showcases their creative work and lets it take center stage.",
      ar: "شركة تصميم وهوية بصرية مقرها القاهرة، متخصصة في الهوية الاستراتيجية والتصميم البصري. بنينا موقعهم بأسلوب أنيق يعتمد على التايبوغرافي ليضع أعمالهم الإبداعية في قلب تجربة الزائر.",
    },
  },

  hadeerEnglish: {
    title: {
      en: "Private Tutoring",
      ar: "الدروس الخاصة",
    },
    description: {
      en: "A landing page built for Ms Hadeer Nabil, a private English tutor based in Cairo, Egypt. It highlights one-on-one lessons, available courses, and an interactive placement quiz designed to convert visitors into students.",
      ar: "صفحة هبوط مميزة تم تصميمها للأستاذة هدير نبيل، مدرسة لغة إنجليزية في القاهرة. الموقع يبرز مميزات الدروس الفردية، وباقات الكورسات المتاحة، مع اختبار تحديد مستوى تفاعلي صُمم خصيصاً لتحويل الزوار لطلاب.",
    },
  },
};
