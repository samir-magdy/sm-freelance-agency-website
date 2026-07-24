import type { Localized } from "@/app/types";
import { SITE_NAME, CONTACT_EMAIL } from "@/app/constants";

interface LegalItem {
  title: Localized;
  content: Localized;
}

interface LegalDocument {
  heading: Localized;
  subheading: Localized;
  items: LegalItem[];
}

const privacyPolicy: LegalDocument = {
  heading: {
    en: "Privacy Policy",
    ar: "سياسة الخصوصية",
  },
  subheading: {
    en: `Last Updated: June 4, 2026. Welcome to ${SITE_NAME}. We are committed to protecting your personal information and your right to privacy. This Privacy Policy explains how we collect, use, and safeguard your information when you visit our website and use our services.`,
    ar: `آخر تحديث: 4 يونيو 2026. مرحبًا بك في ${SITE_NAME}. نحن ملتزمون بحماية معلوماتك الشخصية وحقك في الخصوصية. تشرح سياسة الخصوصية هذه كيف نقوم بجمع واستخدام وحماية معلوماتك عند زيارة موقعنا واستخدام خدماتنا.`,
  },
  items: [
    {
      title: {
        en: "1. Information We Collect",
        ar: "1. المعلومات التي نجمعها",
      },
      content: {
        en: "We collect personal information that you voluntarily provide when you submit a contact or inquiry form. This includes your name, email address, phone number, preferred contact method, and any project details you choose to share.\n\nWe also automatically collect your IP address when you submit a form. This is used solely for rate-limiting purposes (to prevent automated abuse of our contact system) and is not used for tracking, profiling, or marketing.",
        ar: "نحن نجمع المعلومات الشخصية التي تقدمها طواعية عند إرسال نموذج التواصل أو الاستفسار، وتشمل: اسمك، وعنوان بريدك الإلكتروني، ورقم هاتفك، وطريقة التواصل المفضلة لديك، وأي تفاصيل تتعلق بمشروعك.\n\nكما نجمع تلقائيًا عنوان IP الخاص بك عند إرسال النموذج، وذلك حصريًا لأغراض تحديد معدل الإرسال ومنع الإساءة الآلية لنظام التواصل لدينا، ولا يُستخدم لأغراض التتبع أو تحليل السلوك أو التسويق.",
      },
    },
    {
      title: {
        en: "2. How We Use Your Information",
        ar: "2. كيف نستخدم معلوماتك",
      },
      content: {
        en: "We use the information you provide to respond to your inquiry, prepare project estimates, and deliver our web design and development services. The legal basis for this processing is the performance of a pre-contractual or contractual relationship with you, as well as our legitimate interest in preventing abuse of our systems.\n\nWe do not sell, rent, or share your personal information with third parties for marketing purposes.",
        ar: "نستخدم المعلومات التي تقدمها للرد على استفسارك، وإعداد تقديرات المشروع، وتقديم خدمات تصميم وتطوير المواقع. يستند هذا المعالجة إلى ضرورة تنفيذ علاقة تعاقدية أو ما قبل التعاقد معك، فضلاً عن مصلحتنا المشروعة في منع إساءة استخدام أنظمتنا.\n\nنحن لا نبيع معلوماتك الشخصية أو نؤجرها أو نشاركها مع أطراف ثالثة لأغراض تسويقية.",
      },
    },
    {
      title: {
        en: "3. Third-Party Service Providers",
        ar: "3. مزودو الخدمات من الأطراف الثالثة",
      },
      content: {
        en: "To operate our website and deliver our services, we share data with the following third-party processors:\n\n• Vercel (vercel.com), our hosting provider: All website traffic, including form submissions, is processed through Vercel's infrastructure.\n\n• Resend (resend.com), our email delivery provider. When you submit a contact form, your name, contact details, and message are transmitted to Resend to deliver the notification to our team.\n\n• Upstash (upstash.com), our Redis database provider. Your IP address is stored temporarily in Upstash for rate-limiting purposes and is automatically deleted after 3 minutes.\n\n• WhatsApp (Meta Platforms): our website includes a direct WhatsApp contact link. If you choose to use it, you are leaving our site and any information you share is governed by Meta's privacy policy.\n\nEach of these providers operates under their own privacy and data protection policies. We encourage you to review them.",
        ar: "لتشغيل موقعنا وتقديم خدماتنا، نشارك البيانات مع مزودي الخدمات التاليين:\n\n• Vercel (vercel.com)، مزود الاستضافة لدينا. يمر جميع حركة مرور الموقع، بما في ذلك نماذج التواصل، عبر بنية Vercel التحتية.\n\n• Resend (resend.com)، مزود خدمة تسليم البريد الإلكتروني. عند إرسال نموذج التواصل، يتم نقل اسمك وبيانات التواصل والرسالة إلى Resend لتوصيل الإشعار إلى فريقنا.\n\n• Upstash (upstash.com)، مزود قاعدة بيانات Redis. يتم تخزين عنوان IP الخاص بك مؤقتًا في Upstash لأغراض تحديد معدل الإرسال، ويُحذف تلقائيًا بعد 3 دقائق.\n\n• WhatsApp (Meta Platforms): يتضمن موقعنا رابط تواصل مباشر عبر WhatsApp. إذا اخترت استخدامه، فأنت تغادر موقعنا وأي معلومات تشاركها تخضع لسياسة خصوصية Meta.\n\nيعمل كل مزود من هؤلاء وفق سياسات الخصوصية وحماية البيانات الخاصة به. نشجعك على مراجعتها.",
      },
    },
    {
      title: {
        en: "4. Data Retention",
        ar: "4. مدة الاحتفاظ بالبيانات",
      },
      content: {
        en: "IP addresses collected for rate-limiting are automatically deleted from Upstash after 3 minutes. Form submission data (name, contact details, project message) is retained in our email system for as long as necessary to manage our client relationships and fulfil any ongoing service obligations, after which it is deleted.",
        ar: "يتم حذف عناوين IP المجمعة لأغراض تحديد معدل الإرسال تلقائيًا من Upstash بعد 3 دقائق. يتم الاحتفاظ ببيانات نماذج التواصل (الاسم وبيانات التواصل ورسالة المشروع) في نظام البريد الإلكتروني لدينا طالما كان ذلك ضروريًا لإدارة علاقاتنا مع العملاء والوفاء بأي التزامات خدمية جارية، وبعد ذلك يتم حذفها.",
      },
    },
    {
      title: {
        en: "5. Data Security",
        ar: "5. أمن البيانات",
      },
      content: {
        en: "We have implemented appropriate technical and organizational security measures to protect the personal information we process. However, no method of transmission over the internet is 100% secure, and we cannot guarantee absolute security.",
        ar: "قمنا بتطبيق تدابير أمنية فنية وتنظيمية مناسبة لحماية المعلومات الشخصية التي نعالجها. ومع ذلك، لا توجد طريقة نقل عبر الإنترنت آمنة بنسبة 100%، ولا يمكننا ضمان الأمان المطلق.",
      },
    },
    {
      title: {
        en: "6. Your Rights",
        ar: "6. حقوقك",
      },
      content: {
        en: `Under Egypt's Personal Data Protection Law (Law No. 151 of 2020) and applicable international standards, you have the right to: access the personal data we hold about you; request correction of inaccurate data; request deletion of your data; object to or restrict our processing of your data; and withdraw any consent you have given at any time.\n\nTo exercise any of these rights, contact us at ${CONTACT_EMAIL}. We will respond within a reasonable timeframe.`,
        ar: `بموجب قانون حماية البيانات الشخصية المصري (القانون رقم 151 لسنة 2020) والمعايير الدولية المعمول بها، يحق لك: الوصول إلى البيانات الشخصية التي نحتفظ بها عنك؛ طلب تصحيح البيانات غير الدقيقة؛ طلب حذف بياناتك؛ الاعتراض على معالجتنا لبياناتك أو تقييدها؛ وسحب أي موافقة قدمتها في أي وقت.\n\nللممارسة أي من هذه الحقوق، تواصل معنا على ${CONTACT_EMAIL}. وسنرد في غضون وقت معقول.`,
      },
    },
    {
      title: {
        en: "7. Contact Us",
        ar: "7. تواصل معنا",
      },
      content: {
        en: `If you have questions or concerns about this Privacy Policy or how we handle your data, you may email us at ${CONTACT_EMAIL} or use the contact form on our website. We are committed to resolving any privacy concerns promptly and transparently.`,
        ar: `إذا كانت لديك أسئلة أو مخاوف بشأن سياسة الخصوصية هذه أو طريقة تعاملنا مع بياناتك، يمكنك مراسلتنا على ${CONTACT_EMAIL} أو استخدام نموذج التواصل على موقعنا. نحن ملتزمون بمعالجة أي مخاوف تتعلق بالخصوصية بسرعة وشفافية.`,
      },
    },
  ],
};

export default privacyPolicy;
