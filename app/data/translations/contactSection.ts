import type { Localized } from "@/app/types";

export const contactSection: Record<"heading" | "subheading", Localized> = {
  heading: {
    en: "Get In Touch",
    ar: "طلب استشارة",
  },
  subheading: {
    en: "Share a few details and we'll reach out",
    ar: "شاركنا بعض التفاصيل وسنتواصل معك",
  },
};

export type FormKey =
  | "legend"
  | "name"
  | "namePlaceholder"
  | "phone"
  | "phonePlaceholder"
  | "contactMethod"
  | "contactMethodPlaceholder"
  | "whatsapp"
  | "phoneCall"
  | "email"
  | "emailAddress"
  | "emailPlaceholder"
  | "message"
  | "messageOptional"
  | "messagePlaceholder"
  | "submit"
  | "sending"
  | "success"
  | "errorRateLimit"
  | "errorGeneric"
  | "orWhatsapp"
  | "chatInstead";

export const form: Record<FormKey, Localized> = {
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
    ar: "اختار الطريقة",
  },
  whatsapp: { en: "WhatsApp", ar: "واتساب" },
  phoneCall: { en: "Phone Call", ar: "مكالمة تليفونية" },
  email: { en: "Email", ar: "الإيميل" },
  emailAddress: { en: "Email", ar: "البريد الإلكتروني" },
  emailPlaceholder: { en: "your@email.com", ar: "your@email.com" },
  message: { en: "Message", ar: "تفاصيل المشروع" },
  messageOptional: { en: "optional", ar: "اختياري" },
  messagePlaceholder: {
    en: "I need a website for my beauty center to show my services, photos and videos...",
    ar: "عندي مركز تجميل ومحتاجة موقع أعرض فيه الخدمات، وصور وفيديوهات لشغلنا...",
  },
  submit: { en: "Send My Request", ar: "أرسل الطلب" },
  sending: { en: "Sending...", ar: "جاري الإرسال..." },
  success: {
    en: "Thank you. We have received your request.",
    ar: "شكراً لك. لقد استلمنا طلبك وسنتواصل معك قريباً.",
  },
  errorRateLimit: {
    en: "Wait a few minutes to send another request.",
    ar: "يرجى الانتظار بضع دقائق قبل إرسال طلب جديد.",
  },
  errorGeneric: {
    en: "Something went wrong. Please try again.",
    ar: "حدث خطأ ما. يرجى المحاولة مرة أخرى.",
  },
  orWhatsapp: { en: "OR", ar: "أو" },
  chatInstead: { en: "Reach Us On WhatsApp", ar: "تواصل عبر الواتساب" },
};
