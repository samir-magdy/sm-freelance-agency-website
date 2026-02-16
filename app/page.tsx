import HeroSection from "./components/sections/HeroSection";
import ProjectsSection from "./components/sections/ProjectsSection";
import WorkflowSection from "./components/sections/WorkflowSection";
import FAQSection from "./components/sections/FAQSection";
import ContactSection from "./components/sections/ContactSection";

export default function MinimalModernPortfolio() {
  return (
    <div className="relative min-h-screen bg-background text-content-heading">
      <HeroSection />
      <ProjectsSection />
      <WorkflowSection />
      <FAQSection />
      <ContactSection />
    </div>
  );
}
