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
      id: "bilingual",
      name: { en: "Bilingual Support", ar: "ثنائي اللغة" },
      tagline: {
        en: "A flawless experience in both English and Arabic. We design your site to look natural and read perfectly, no matter which language your visitors choose.",
        ar: "تجربة خالية من العيوب باللغتين الإنجليزية والعربية. نصمم موقعك ليبدو طبيعياً ويُقرأ بشكل مثالي، مهما كانت لغة الزائر.",
      },
      included: [
        { en: "Professional translation that keeps your tone and meaning intact", ar: "ترجمة احترافية تحافظ على نبرة صوتك والمعنى الأصلي" },
        { en: "Layouts that flip perfectly for Arabic (Right-to-Left) reading", ar: "تصميمات تنعكس بسلاسة لتناسب القراءة باللغة العربية (من اليمين لليسار)" },
        { en: "An easy-to-use button for visitors to switch languages instantly", ar: "زر سهل الاستخدام ليتمكن الزوار من تغيير اللغة فوراً" },
        { en: "Search engine setups that help you rank in both languages", ar: "إعدادات لمحركات البحث تساعدك على الظهور بنتائج البحث باللغتين" },
      ],
      fit: {
        en: "Your audience is diverse, and you want everyone to feel right at home on your website. No awkward translations or broken designs—just a smooth experience for all.",
        ar: "جمهورك متنوع وتريد أن يشعر الجميع بالراحة في موقعك. وداعاً للترجمات الركيكة أو التصميمات المكسورة—فقط تجربة سلسة للجميع.",
      },
    },
],
  articleCta: {
    en: "Ready to build your website?",
    ar: "جاهز تبني موقعك؟",
  },
  articleCtaButton: {
    en: "Get In Touch",
    ar: "تواصل معنا",
  },
  backLinkLabel: {
    en: "Back to services",
    ar: "العودة إلى الخدمات",
  },
};

export default servicesPage;
