import { notFound } from "next/navigation";
import dynamic from "next/dynamic";
import { preload } from "react-dom";
import type { Lang } from "../data/translations";
import { projects } from "../data/projects";
import HeroSection from "../components/sections/HeroSection";
import GoalSection from "../components/sections/GoalSection";
import ServicesSection from "../components/sections/ServicesSection";
import AddOnsSection from "../components/sections/AddOnsSection";
import WorkflowSection from "../components/sections/WorkflowSection";
import FAQSection from "../components/sections/FAQSection";
import ContactSection from "../components/sections/ContactSection";

const PortfolioShowcase = dynamic(
  () => import("../components/ui/PortfolioShowcase"),
  { loading: () => null }
);

export default async function Page({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang: rawLang } = await params;
  if (rawLang !== "en" && rawLang !== "ar") notFound();
  const lang: Lang = rawLang;

  (PortfolioShowcase as unknown as { preload?: () => void }).preload?.();

  for (const proj of projects) {
    preload(proj.screenshot.src, { as: "image" });
  }

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
