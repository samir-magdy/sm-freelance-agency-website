import HeroSection from "../components/sections/HeroSection";
import PortfolioShowcase from "../components/ui/PortfolioShowcase";
// import PricingSection from "../components/sections/PricingSection";
import Features from "../components/sections/Features";
import WorkflowSection from "../components/sections/WorkflowSection";
import FAQSection from "../components/sections/FAQSection";
import ContactSection from "../components/sections/ContactSection";
import { notFound } from "next/navigation";
import { projectsStructuredData } from "../data/projects";

export default async function Page({ params }) {
  const { lang: rawLang } = await params;
  if (rawLang !== "en" && rawLang !== "ar") notFound();
  const lang = rawLang;

  return (
    <div className="relative min-h-screen bg-background text-content-heading">
      <HeroSection lang={lang} />
     <Features lang={lang} />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(projectsStructuredData),
        }}
      />
      <PortfolioShowcase lang={lang} />
      {/* <PricingSection lang={lang} /> */}
      <WorkflowSection lang={lang} />
      <FAQSection lang={lang} />
      <ContactSection lang={lang} />
    </div>
  );
}
