import type { Lang } from "../data/translations";
import HeroSection from "../components/sections/HeroSection";
import GoalSection from "../components/sections/GoalSection";
import ServicesSection from "../components/sections/ServicesSection";
// import AddOnsSection from "../components/sections/AddOnsSection";
import ProjectsSection from "../components/sections/ProjectsSection";
import WorkflowSection from "../components/sections/WorkflowSection";
import FAQSection from "../components/sections/FAQSection";
import ContactSection from "../components/sections/ContactSection";

export default async function Page({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang: rawLang } = await params;
  const lang: Lang = rawLang === "en" || rawLang === "ar" ? rawLang : "en";

  return (
    <div className="relative min-h-screen bg-background text-content-heading">
      <HeroSection lang={lang} />
      <GoalSection lang={lang} />
      <ServicesSection lang={lang} />
      {/* <AddOnsSection lang={lang} /> */}
      <ProjectsSection lang={lang} />
      <WorkflowSection lang={lang} />
      <FAQSection lang={lang} />
      <ContactSection lang={lang} />
    </div>
  );
}
