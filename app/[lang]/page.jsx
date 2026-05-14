import HeroSection from "../components/sections/HeroSection";
import PortfolioShowcase from "../components/ui/PortfolioShowcase";
import PricingCardsSection from "../components/sections/PricingCardsSection";
import FAQSection from "../components/sections/FAQSection";
import ContactSection from "../components/sections/ContactSection";
import { notFound } from "next/navigation";
import { projectsStructuredData } from "../data/projects";
import Script from "next/script";


export default async function Page({ params }) {
  const { lang: rawLang } = await params;
  if (rawLang !== "en" && rawLang !== "ar") notFound();
  const lang = rawLang;

  return (
    <div className="relative min-h-screen bg-background text-content-heading flex flex-col gap-40 md:gap-72">
      <HeroSection lang={lang} />
      <PortfolioShowcase lang={lang} />
      <FAQSection lang={lang} />

      <PricingCardsSection lang={lang} />

      <ContactSection lang={lang} />
      <Script
        id="projects-seo"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(projectsStructuredData),
        }}
      />
    </div>
  );
}
