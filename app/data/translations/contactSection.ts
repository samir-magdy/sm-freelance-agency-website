import type { Localized } from "@/app/types";

interface ContactSection {
  heading: Localized;
  subheading: Localized;
  form: {
    legend: Localized;
    name: Localized;
    namePlaceholder: Localized;
    phone: Localized;
    phonePlaceholder: Localized;
    contactMethod: Localized;
    contactMethodPlaceholder: Localized;
    whatsapp: Localized;
    phoneCall: Localized;
    contactMethodEmail: Localized;
    emailAddress: Localized;
    emailPlaceholder: Localized;
    message: Localized;
    messageOptional: Localized;
    messagePlaceholder: Localized;
    submit: Localized;
    sending: Localized;
    success: Localized;
    errorRateLimit: Localized;
    errorGeneric: Localized;
    orDivider: Localized;
    whatsappCta: Localized;
  };
}

const contactSection: ContactSection = {
  heading: {
    en: "Get In Touch",
    ar: "طلب استشارة",
  },
  subheading: {
    en: "Share a few details and we'll reach out",
    ar: "شاركنا بعض التفاصيل وسنتواصل معك",
  },
  form: {
    legend: { en: "Contact information", ar: "بيانات التواصل" },
    name: { en: "Name", ar: "الاسم" },
    namePlaceholder: { en: "Salma Ahmed", ar: "سلمى أحمد" },
    phone: { en: "Mobile Number", ar: "رقم الموبايل" },
    phonePlaceholder: { en: "01XXXXXXXXX", ar: "01XXXXXXXXX" },
    contactMethod: {
      en: "Contact method",
      ar: "طريقة التواصل",
    },
    contactMethodPlaceholder: {
      en: "Select method",
      ar: "اختر الطريقة",
    },
    whatsapp: { en: "WhatsApp", ar: "واتساب" },
    phoneCall: { en: "Phone Call", ar: "موبايل" },
    contactMethodEmail: { en: "Email", ar: "الإيميل" },
    emailAddress: { en: "Email", ar: "البريد الإلكتروني" },
    emailPlaceholder: { en: "salma@gmail.com", ar: "salma@gmail.com" },
    message: { en: "Message", ar: "تفاصيل المشروع" },
    messageOptional: { en: "optional", ar: "اختياري" },
    messagePlaceholder: {
      en: "I need a website for my beauty center to show my services, photos and videos...",
      ar: "عندي مركز تجميل ومحتاجة موقع أعرض فيه الخدمات، وصور وفيديوهات لشغلنا...",
    },
    submit: { en: "Send My Request", ar: "أرسل الطلب" },
    sending: { en: "Sending...", ar: "جاري الإرسال..." },
    success: {
      en: "Request received. We will contact you soon.",
      ar: "لقد استلمنا طلبك وسنتواصل معك قريباً.",
    },
    errorRateLimit: {
      en: "Wait a few minutes to send another request.",
      ar: "يرجى الانتظار بضع دقائق قبل إرسال طلب جديد.",
    },
    errorGeneric: {
      en: "Something went wrong. Please try again.",
      ar: "حدث خطأ ما. يرجى المحاولة مرة أخرى.",
    },
    orDivider: { en: "OR", ar: "أو" },
    whatsappCta: { en: "Chat On WhatsApp", ar: "تواصل عبر الواتساب" },
  },
};

export default contactSection;
