import type { Localized } from "@/app/types";

interface ContactSection {
  heading: Localized;
  subheading: Localized;
  whatsappCta: Localized;
  questionnaireCta: Localized;
  formHeading: Localized;
  namePlaceholder: Localized;
  emailPlaceholder: Localized;
  messagePlaceholder: Localized;
  nameRequired: Localized;
  emailInvalid: Localized;
  messageRequired: Localized;
  submitCta: Localized;
  sendingCta: Localized;
  successBody: Localized;
  successWhatsapp: Localized;
  error: Localized;
  errorRateLimit: Localized;
}

const contactSection: ContactSection = {
  heading: {
    en: "Get In Touch",
    ar: "تواصل معنا",
  },
 subheading: {
  en: "Chat on WhatsApp for general inquiries or take our survey for a custom quote.",
  ar: "تواصل معنا عبر واتساب للأسئلة العامة، أو أكمل الاستبيان للحصول على عرض سعر.",
},
  whatsappCta: { en: "Chat on WhatsApp", ar: "تواصل عبر الواتساب" },
  questionnaireCta: { en: "Request a Quote", ar: "اطلب عرض سعر" },
  formHeading: { en: "Or send a message", ar: "أو أرسل رسالة" },
  namePlaceholder: { en: "Your name", ar: "اسمك" },
  emailPlaceholder: { en: "Your email", ar: "بريدك الإلكتروني" },
  messagePlaceholder: { en: "Your message", ar: "رسالتك" },
  nameRequired: { en: "Please enter your name", ar: "من فضلك أدخل اسمك" },
  emailInvalid: {
    en: "Please enter a valid email",
    ar: "من فضلك أدخل بريدًا إلكترونيًا صحيحًا",
  },
  messageRequired: {
    en: "Please enter a message",
    ar: "من فضلك اكتب رسالتك",
  },
  submitCta: { en: "Send Message", ar: "إرسال الرسالة" },
  sendingCta: { en: "Sending…", ar: "جارٍ الإرسال…" },
  successBody: {
    en: "Thanks for reaching out — we'll get back to you soon.",
    ar: "شكراً لتواصلك معنا، سنرد عليك قريباً.",
  },
  successWhatsapp: {
    en: "Need a faster response?",
    ar: "بحاجة لرد أسرع؟",
  },
  error: {
    en: "Something went wrong. Please try again.",
    ar: "حدث خطأ ما. حاول مرة أخرى.",
  },
  errorRateLimit: {
    en: "Please wait a few minutes before submitting again.",
    ar: "يرجى الانتظار بضع دقائق قبل الإرسال مرة أخرى.",
  },
};

export default contactSection;
