const nav = {
  portfolio: { en: "Portfolio", ar: "أعمالنا" },
  pricing: { en: "Pricing", ar: "الأسعار" },
  FAQs: { en: "FAQs", ar: "الأسئلة الشائعة" },
  guides: { en: "Guides", ar: "الأدلة" },
  about: { en: "About", ar: "من نحن" },
  contact: { en: "Contact", ar: "تواصل معنا" },
};

// Leading contiguous hash-scroll links rendered by the loop, with `contact`
// last for the contactItem lookup. Guides/About (route links) and FAQs are
// rendered as explicit <li>s in the nav components so the final order is:
// Portfolio · Pricing · Guides · About · FAQs · Contact.
export const navLinks = ["portfolio", "pricing", "contact"];

export const langToggle = { en: "EN", ar: "عربي" };

export default nav;
