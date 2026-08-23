import type { Localized } from "@/app/types";
import type { SpecializedServiceId } from "./servicesSection";

interface ServicePageSection {
  id: SpecializedServiceId;
  name: Localized;
  tagline: Localized;
  included: Localized[];
  fit: Localized;
}

interface ServicesPageTranslations {
  h1: Localized;
  intro: Localized;
  includedTitle: Localized;
  fitTitle: Localized;
  sections: ServicePageSection[];
  articleCta: Localized;
  articleCtaButton: Localized;
  backLinkLabel: Localized;
}

const servicesPage: ServicesPageTranslations = {
  h1: {
    en: "Specialized Services",
    ar: "خدمات متخصصة",
  },
 intro: {
  en: "Expertise to boost your project",
  ar: "خبرات لتعزيز مشروعك"
},
  includedTitle: {
    en: "What's included",
    ar: "ما تحصل عليه",
  },
  fitTitle: {
    en: "When it fits",
    ar: "متى تناسبك",
  },
  sections: [
    {
      id: "branding",
      name: { en: "Branding & Visual Identity", ar: "الهوية البصرية" },
      tagline: {
        en: "We give your business a personality. This is the look and feel that makes people remember you instantly, anywhere they see you.",
        ar: "نمنح مشروعك شخصية فريدة. هذا هو المظهر الذي يجعل الناس يتذكرونك فوراً في أي مكان يقرؤون فيه عنك.",
      },
      included: [
        { en: "A main logo and flexible variations for different spaces", ar: "لوجو أساسي ونسخ مرنة تناسب مختلف المساحات" },
        { en: "A hand-picked selection of colors and fonts that match your vibe", ar: "مجموعة ألوان وخطوط مختارة بعناية لتعكس روح مشروعك" },
        { en: "A simple rulebook so you always know how to use your new look", ar: "دليل بسيط يوضح لك كيف تستخدم هويتك الجديدة دائماً" },
        { en: "Ready-to-use images for your social media profiles", ar: "صور جاهزة للاستخدام على حسابات السوشيال ميديا الخاصة بك" },
      ],
      fit: {
        en: "Perfect if you're starting fresh or feel like your current look doesn't match how great your business actually is. It builds trust and makes you look professional everywhere.",
        ar: "مثالي إذا كنت تبدأ من الصفر، أو تشعر أن مظهرك الحالي لا يعكس جودة عملك. هذا يبني الثقة ويجعلك تبدو احترافياً في كل مكان.",
      },
    },
    {
      id: "copywriting",
      name: { en: "Copywriting", ar: "كتابة المحتوى" },
      tagline: {
        en: "We find the perfect words to tell your story, connect with your visitors, and turn them into happy customers.",
        ar: "نختار الكلمات المثالية لنروي قصتك، ونتواصل مع زوارك، ونحولهم إلى عملاء سعداء.",
      },
      included: [
        { en: "Engaging text for your homepage and most important pages", ar: "نصوص جذابة للصفحة الرئيسية والصفحات الأكثر أهمية" },
        { en: "A clear, logical flow so visitors actually read what you have to say", ar: "تسلسل واضح ومنطقي يضمن أن يقرأ الزوار ما تريد قوله" },
        { en: "Catchy buttons and small text that guide people on what to do next", ar: "أزرار ونصوص صغيرة تشجع الزوار وتوجههم للخطوة التالية" },
        { en: "Content adapted beautifully in both English and Arabic (if needed)", ar: "محتوى مصاغ ببراعة باللغتين الإنجليزية والعربية (عند الحاجة)" },
      ],
      fit: {
        en: "You know your business inside out, but you're struggling to explain it simply and persuasively. We take the writing off your plate so you can focus on running your business.",
        ar: "أنت تعرف مشروعك جيداً، لكنك تجد صعوبة في شرحه ببساطة وإقناع. نحن نتولى مهمة الكتابة لتتفرغ أنت لإدارة عملك.",
      },
    },
    {
      id: "seo",
      name: { en: "Advanced SEO Setup", ar: "إعداد SEO" },
      tagline: {
        en: "We set up the behind-the-scenes magic that helps Google understand your website and show it to people searching for what you do.",
        ar: "نجهز السحر الخفي خلف الكواليس لمساعدة جوجل على فهم موقعك وإظهاره للأشخاص الذين يبحثون عن خدماتك.",
      },
      included: [
        { en: "Organized website code that search engines love to read", ar: "أكواد برمجية منظمة لمحركات البحث لتقرأها بسهولة" },
        { en: "A digital map and guide to help Google explore your site", ar: "خريطة رقمية ودليل لمساعدة جوجل في استكشاف موقعك" },
        { en: "Speed and performance tweaks so your site loads fast", ar: "تحسينات للسرعة والأداء لضمان تحميل موقعك بسرعة" },
        { en: "Tools to track how well you're doing on Google searches", ar: "أدوات لتتبع مستوى أداء موقعك في نتائج بحث جوجل" },
      ],
      fit: {
        en: "You want customers to find you effortlessly online. This ensures your website isn't just beautiful, but actually visible to the people who need your services right now.",
        ar: "تريد أن يعثر عليك العملاء بسهولة على الإنترنت. هذا يضمن أن موقعك ليس جميلاً فحسب، بل يظهر فعلياً للأشخاص الذين يحتاجون خدماتك الآن.",
      },
    },
    {
      id: "maintenance",
      name: { en: "Maintenance", ar: "الصيانة الدورية" },
      tagline: {
        en: "We keep your site secure, fast, and up-to-date every month, so you never wake up to a broken page or a security scare.",
        ar: "نحافظ على موقعك آمنًا وسريعًا ومحدَّثًا شهريًا، حتى تطمئن من أي عطل مفاجئ أو ثغرة أمنية.",
      },
      included: [
        { en: "Regular software and security updates", ar: "تحديثات دورية للبرامج والأمان" },
        { en: "Automated backups you can restore anytime", ar: "نسخ احتياطية تلقائية يمكن استعادتها في أي وقت" },
        { en: "Uptime and performance monitoring around the clock", ar: "مراقبة الأداء ووقت التشغيل على مدار الساعة" },
        { en: "Priority support for small edits, bug fixes, and tweaks", ar: "دعم بأولوية للتعديلات البسيطة وإصلاح الأخطاء" },
      ],
      fit: {
        en: "You launched your site and want it to stay healthy without thinking about it — no broken pages, no security alerts, no outdated content dragging you down.",
        ar: "أطلقت موقعك وتريد أن يظل بأفضل حالاته دون أن تشغل بالك — لا صفحات معطلة، ولا تحذيرات أمنية، ولا محتوى قديم يعطّل نموك.",
      },
    },
    {
      id: "aiChatbot",
      name: { en: "AI Chatbot", ar: "الذكاء الاصطناعي" },
      tagline: {
        en: "We add a smart assistant to your website that talks to visitors, answers their questions, and captures leads for you — day and night.",
        ar: "نضيف مساعداً ذكياً لموقعك يتحدث مع الزوار، يجيب على أسئلتهم، ويجمع بيانات العملاء المحتملين لك — ليلاً ونهاراً.",
      },
      included: [
        { en: "A chat widget trained on your business content and FAQs", ar: "ذكاء اصطناعي مدرَّب على محتوى موقعك والأسئلة الشائعة الخاصة بشركتك" },
        { en: "Instant answers to common visitor questions, any time of day", ar: "إجابات فورية على استفسارات الزوار الشائعة في أي وقت" },
        { en: "Automatic lead capture so no potential customer slips away", ar: "جمع تلقائي لبيانات العملاء المحتملين حتى لا تفوتك أي فرصة" },
        { en: "Seamless design that matches your site's look and feel", ar: "تصميم متناسق يتماشى مع هوية موقعك ومظهره" },
      ],
      fit: {
        en: "Perfect if you get repetitive questions, want to capture leads outside business hours, or simply want your site to feel more responsive and modern.",
        ar: "مثالي إذا كنت تتلقى أسئلة متكررة، أو تريد جمع بيانات العملاء خارج أوقات العمل، أو ببساطة تريد أن يبدو موقعك أكثر تفاعلاً وحداثة.",
      },
    },
    {
      id: "businessEmail",
      name: { en: "Business Email", ar: "بريد إلكتروني احترافي" },
      tagline: {
        en: "We set up professional email addresses on your own domain, so you look like an established business instead of a Gmail account.",
        ar: "نجهز عناوين بريد إلكتروني احترافية على نطاق موقعك الخاص، لتبدو كشركة راسخة بدلاً من حساب جيميل عادي.",
      },
      included: [
        { en: "Addresses like you@yourbusiness.com for you and your team", ar: "عناوين بريد بصيغة you@yourbusiness.com لك ولفريقك" },
        { en: "Full setup on Google Workspace or a comparable provider", ar: "إعداد كامل عبر Google Workspace أو مزود مماثل" },
        { en: "Mail, calendar, and file storage synced across your devices", ar: "بريد وتقويم وتخزين ملفات متزامن على كل أجهزتك" },
        { en: "Correct domain records so your emails land in inboxes, not spam", ar: "إعداد صحيح لسجلات النطاق حتى تصل رسائلك للبريد الوارد وليس الرسائل غير المرغوبة" },
      ],
      fit: {
        en: "Perfect if you or your team are still using personal Gmail or Hotmail addresses for business. It's a small change that instantly makes every email, invoice, and proposal look more credible.",
        ar: "مثالي إذا كنت أنت أو فريقك ما زلتم تستخدمون عناوين جيميل أو هوتميل شخصية للعمل. تغيير بسيط يمنح كل إيميل وفاتورة وعرض سعر مصداقية أكبر فوراً.",
      },
    },
],
  articleCta: {
    en: "Need to know more?",
    ar: "عايز تعرف أكتر؟",
  },
  articleCtaButton: {
    en: "Get In Touch",
    ar: "تواصل معنا",
  },
  backLinkLabel: {
    en: "Back to homepage",
    ar: "العودة إلى الرئيسية",
  },
};

export default servicesPage;
