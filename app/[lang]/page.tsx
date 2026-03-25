import { notFound } from "next/navigation";
import type { Lang } from "../data/translations";
import HeroSection from "../components/sections/HeroSection";
import GoalSection from "../components/sections/GoalSection";
import ServicesSection from "../components/sections/ServicesSection";
import AddOnsSection from "../components/sections/AddOnsSection";
import dynamic from "next/dynamic";
const PortfolioShowcase = dynamic(() => import("../components/ui/PortfolioShowcase"));
import WorkflowSection from "../components/sections/WorkflowSection";
import FAQSection from "../components/sections/FAQSection";
import ContactSection from "../components/sections/ContactSection";

export default async function Page({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang: rawLang } = await params;
  if (rawLang !== "en" && rawLang !== "ar") notFound();
  const lang: Lang = rawLang;

  return (
    <div className="relative min-h-screen bg-background text-content-heading">
      <HeroSection lang={lang} />
      <ServicesSection lang={lang} />
      <AddOnsSection lang={lang} />
      <GoalSection lang={lang} />
      <PortfolioShowcase lang={lang} />
      <WorkflowSection lang={lang} />
      <FAQSection lang={lang} />
      <ContactSection lang={lang} />
    </div>
  );
}
