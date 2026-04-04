import HeroSection from "../components/sections/HeroSection";
import ServicesSection from "../components/sections/ServicesSection";
import AddOnsSection from "../components/sections/AddOnsSection";
import PricingSection from "../components/sections/PricingSection";
import FAQSection from "../components/sections/FAQSection";
import { notFound } from "next/navigation";
import dynamic from "next/dynamic";
import { projectsStructuredData } from "../data/projects";

const PortfolioShowcase = dynamic(() => import('../components/ui/PortfolioShowcase'));
const WorkflowSection = dynamic(() => import('../components/sections/WorkflowSection'));
const ContactSection = dynamic(() => import("../components/sections/ContactSection"));

export default async function Page({ params }) {
  const { lang: rawLang } = await params;
  if (rawLang !== "en" && rawLang !== "ar") notFound();
  const lang = rawLang;

  return (
    <div className="relative min-h-screen bg-background text-content-heading">
      <HeroSection lang={lang} />
      <ServicesSection lang={lang} />
      <AddOnsSection lang={lang} />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(projectsStructuredData),
        }}
      />
      <PortfolioShowcase lang={lang} />
      <PricingSection lang={lang} />
      <WorkflowSection lang={lang} />
      <FAQSection lang={lang} />
      <ContactSection lang={lang} />
    </div>
  );
}
