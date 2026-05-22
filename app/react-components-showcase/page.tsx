import Image from "next/image";
import IPhoneMockup from "./components/iphone-mockup/IPhoneMockup";
import MacMockup from "./components/mac-mockup/MacMockup";
import TimelineShowcase from "./TimelineShowcase";
import type { ReactNode } from "react";

const slides = [
  { image: "/project-screenshots/sellable-blocks/github-img-mobile.webp", alt: "An interactive, scrollable iPhone frame mockup of github's website on mobile" },
  { image: "/project-screenshots/sellable-blocks/apple-img-mobile.webp", alt: "An interactive, scrollable iPhone mockup of apple's website on mobile" },
  { image: "/project-screenshots/sellable-blocks/linear-img-mobile.webp", alt: "An interactive, scrollable iPhone mockup of linear's website on mobile" },
];

const desktopSlides = [
  { image: "/project-screenshots/sellable-blocks/github-img-desktop.webp", alt: "An interactive, scrollable Mac OS browser mockup of github's website on desktop", url: "github.com" },
  { image: "/project-screenshots/sellable-blocks/apple-img-desktop.webp", alt: "An interactive, scrollable Mac OS browser mockup of apples's website on desktop", url: "apple.com" },
  { image: "/project-screenshots/sellable-blocks/linear-img-desktop.webp", alt: "An interactive, scrollable Mac OS browser mockup of linears's website on desktop", url: "linear.app" },
];

const TECH_STACK = ["React", "Next.js", "TypeScript", "TailwindCSS"];

function TechBadge({ label }: { label: string }) {
  return (
    <span className="inline-flex items-center px-3 md:px-8 py-2 md:py-3 rounded-md text-caption md:text-base font-medium bg-white/[0.04] border border-white/[0.08] text-zinc-400 tracking-wide">
      {label}
    </span>
  );
}

function UsageBlock({ code }: { code: string }) {
  return (
    <div className="mt-12 md:mt-16 max-w-3xl mx-auto">
      <p className="mb-4 sm:text-subheading text-zinc-400 font-semibold">Usage:</p>
      <pre className="text-left rounded-xl bg-white/[0.03] border border-white/[0.08] px-5 py-4 text-caption sm:text-base text-zinc-400 font-mono overflow-x-auto leading-relaxed">
        <code>{code}</code>
      </pre>
    </div>
  );
}

function ComponentSection({
  id,
  title,
  tagline,
  usage,
  children,
}: {
  id: string;
  title: string;
  tagline: string;
  usage: string;
  children: ReactNode;
}) {
  return (
    <section
      id={id}
      className="border-t border-white/[0.06] py-12 sm:py-20 px-5 scroll-mt-12!"
    >
      <div className="text-center max-w-2xl mx-auto mb-12">
        <h2 className="text-heading font-bold text-white tracking-tight mb-4">
          {title}
        </h2>
        <p className="text-zinc-400 sm:text-subheading mb-8">{tagline}</p>
      </div>
      <div className="w-full flex justify-center">{children}</div>
      <UsageBlock code={usage} />
    </section>
  );
}

export default function Home() {
  return (
    <div className="min-h-screen">
      {/* Header */}
      <header className="sticky top-0 z-50 border-b border-white/[0.06] backdrop-blur-md">
        <div className="max-w-6xl mx-auto px-6 h-16 md:h-20 flex items-center justify-between">
          <a href="#home">
            <Image
              src="/brand.svg"
              width={70}
              height={70}
              alt="SM Web Design Studio Logo"
            />
          </a>

          <nav className="hidden sm:flex items-center gap-8">
            <a href="#ios-mockup" className="text-zinc-400 hover:text-zinc-200 transition-colors duration-200">
              iOS Mockup
            </a>
            <a href="#browser-mockup" className="text-zinc-400 hover:text-zinc-200 transition-colors duration-200">
              Browser Mockup
            </a>
            <a href="#scroll-timeline" className="text-zinc-400 hover:text-zinc-200 transition-colors duration-200">
              Scroll Timeline
            </a>
          </nav>
        </div>
      </header>

      {/* Hero */}
      <section id="home" className="pt-12 pb-14 md:pt-16 md:pb-20 px-2 text-center">
        <div className="max-w-2xl mx-auto px-6">
          <h1 className="text-[clamp(2rem,8vw,4rem)] font-bold text-white tracking-tight leading-[1.1]">
            Production-ready
            <br />
            React components.
          </h1>
          <p className="text-zinc-400 mt-6 text-base sm:text-subheading leading-relaxed max-w-xl mx-auto mb-8">
            Save hours building complex layouts with production-ready,
            interactive UI blocks. Fully responsive & customizable. Zero extra
            dependencies. Drop the file in, import the component, add your data.
            That&apos;s it!
          </p>
          <div className="flex flex-wrap justify-center gap-2 sm:gap-3">
            {TECH_STACK.map((t) => (
              <TechBadge key={t} label={t} />
            ))}
          </div>
        </div>
      </section>

      {/* iOS Mockup */}
      <ComponentSection
        id="ios-mockup"
        title="iOS Mockup"
        tagline="An IPhone shell for mobile UI previews."
        usage={`import IPhoneMockup from "@/components/IPhoneMockup";\n\nexport default function MyPage() {\n  return (\n    <IPhoneMockup\n      slides={[\n        { image: "/screenshots/screen1.png", alt: "Home screen" },\n        { image: "/screenshots/screen2.png", alt: "Dashboard" },\n        { image: "/screenshots/screen3.png", alt: "Settings" },\n      ]}\n      className="mx-auto my-12"\n      paginationDotColor="#6366f1"\n      inactiveDotColor="rgba(99,102,241,0.3)"\n    />\n  );\n}`}
      >
        <IPhoneMockup slides={slides} />
      </ComponentSection>

      {/* Browser Mockup */}
      <ComponentSection
        id="browser-mockup"
        title="Browser Mockup"
        tagline="A macOS-style browser frame for desktop UI."
        usage={`import MacMockup from "@/components/MacMockup";\n\nexport default function MyPage() {\n  return (\n    <MacMockup\n      slides={[\n        { image: "/screenshots/project1.png", alt: "E-commerce store", url: "https://myproject1.com" },\n        { image: "/screenshots/project2.png", alt: "SaaS dashboard",   url: "https://myproject2.com" },\n        { image: "/screenshots/project3.png", alt: "Portfolio site" },\n      ]}\n      className="mx-auto my-12"\n      paginationDotColor="#6366f1"\n      inactiveDotColor="rgba(99,102,241,0.3)"\n    />\n  );\n}`}
      >
        <MacMockup slides={desktopSlides} />
      </ComponentSection>

      {/* Scroll Timeline */}
      <ComponentSection
        id="scroll-timeline"
        title="Scroll Timeline"
        tagline="An animated timeline for workflow sections."
        usage={`import { Timeline } from "@/components/Timeline";\nimport { Search, Paintbrush, Rocket } from "lucide-react";\n\n// icon is optional (only used with variant="icon")\nconst steps = [\n  { title: "Discovery", icon: Search,     content: <p>Research phase.</p> },\n  { title: "Design",    icon: Paintbrush, content: <p>Wireframes first.</p> },\n  { title: "Launch",    icon: Rocket,     content: <p>Ship it.</p> },\n];\n\nexport default function Page() {\n  return (\n    <Timeline\n      data={steps}\n      variant="icon"\n      accentColor="#a78bfa"\n      markerColor="#c9a43d"\n      className="py-24 px-4"\n    />\n  );\n}`}
      >
        <TimelineShowcase />
      </ComponentSection>

      {/* Footer */}
      <footer className="flex flex-col gap-4 border-t border-white/[0.06] py-6 sm:py-8 px-6 text-center">
        <p className="text-zinc-500 text-caption sm:text-base font-mono">
          Built with React · Next.js · TailwindCSS
        </p>
        <small className="text-zinc-600 text-xs sm:text-base font-mono">
          &copy; SM Web Design Studio | By Samir Magdy
        </small>
      </footer>
    </div>
  );
}
