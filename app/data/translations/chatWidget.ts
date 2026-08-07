import type { Localized } from "@/app/types";

interface ChatWidgetStrings {
  title: Localized;
  greeting: Localized;
  placeholder: Localized;
  suggestions: Localized[];
  bubbleNudge: Localized;
  error: Localized;
  rateLimited: Localized;
  a11y: {
    open: Localized;
    close: Localized;
    send: Localized;
    log: Localized;
    messageInput: Localized;
    suggestions: Localized;
  };
}

const chatWidget: ChatWidgetStrings = {
  title: {
    en: "Chat with Our AI Assistant",
    ar: "تحدث مع مساعدنا الذكي",
  },
  greeting: {
    en: "Hello, I'm Nollie. How can I help you today?",
    ar: "مرحبًا، أنا نولي. العربية ليست لغتي الأولى، لذا قد أرتكب بعض الأخطاء اللغوية. كيف يمكنني مساعدتك؟",
  },
  placeholder: {
    en: "Type your question…",
    ar: "اكتب سؤالك…",
  },
  suggestions: [
    { en: "How much does a website cost?", ar: "كم تكلفة الموقع؟" },
    { en: "How long does a project take?", ar: "ما هي مدة تنفيذ الموقع؟" },
  ],
  bubbleNudge: {
    en: "Hi, I'm Nollie 👋",
    ar: "مرحبًا، أنا نولي 👋",
  },
  error: {
    en: "Something went wrong. Please try again.",
    ar: "حدث خطأ ما. حاول مرة أخرى.",
  },
  rateLimited: {
    en: "You've sent a lot of messages — please try again in a few minutes.",
    ar: "لقد أرسلت رسائل كثيرة، حاول مرة أخرى بعد بضع دقائق.",
  },
  a11y: {
    open: { en: "Open chat", ar: "افتح المحادثة" },
    close: { en: "Close chat", ar: "أغلق المحادثة" },
    send: { en: "Send message", ar: "أرسل الرسالة" },
    log: { en: "Chat messages", ar: "رسائل المحادثة" },
    messageInput: { en: "Type your question", ar: "اكتب سؤالك" },
    suggestions: { en: "Suggested questions", ar: "أسئلة مقترحة" },
  },
};

export default chatWidget;
