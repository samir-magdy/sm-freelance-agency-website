import HeroSection from "../components/sections/HeroSection";
import PortfolioSection from "../components/sections/PortfolioSection";
import PricingSection from "../components/sections/PricingSection";
import FAQSection from "../components/sections/FAQSection";
import ContactSection from "../components/sections/ContactSection";
import { notFound } from "next/navigation";
import { projectsStructuredData } from "../data/portfolio";
import faqSection from "../data/translations/faqSection";
import { SITE_URL } from "../constants";

export default async function Page({ params }) {
  const { lang: rawLang } = await params;
  if (rawLang !== "en" && rawLang !== "ar") notFound();
  const lang = rawLang;

  const homeUrl = lang === "en" ? SITE_URL : `${SITE_URL}/ar`;
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "@id": `${homeUrl}#faqpage`,
    mainEntity: faqSection.items.map((item) => ({
      "@type": "Question",
      name: item.question[lang],
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer[lang].replace(/href=(['"])\//g, `href=$1${SITE_URL}/`),
      },
    })),
  };

  return (
    <div className="relative min-h-screen bg-background text-content-heading flex flex-col gap-40 md:gap-72">
      <HeroSection lang={lang} />
      <PortfolioSection key={lang} lang={lang} />

      <FAQSection lang={lang} />
      <PricingSection lang={lang} />

      <ContactSection lang={lang} />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(projectsStructuredData),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(faqSchema).replace(/</g, "\\u003c"),
        }}
      />
    </div>
  );
}
