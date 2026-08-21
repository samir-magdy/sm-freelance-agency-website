import type { Localized } from "@/app/types";

const footer = {
  legalLabel: { en: "Legal", ar: "روابط قانونية" },
  location: { en: "Cairo, Egypt", ar: "القاهرة، مصر" },
  legal: {
    privacy: { en: "Privacy Policy", ar: "سياسة الخصوصية" },
    terms: { en: "Terms of Service", ar: "شروط الخدمة" },
  },
} satisfies {
  legalLabel: Localized;
  location: Localized;
  legal: Record<"privacy" | "terms", Localized>;
};

export default footer;
