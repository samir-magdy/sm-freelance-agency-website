import type { Lang } from "@/app/types";
import type { LegalDocument } from "@/app/data/translations/legal";

interface LegalDocumentPageProps {
  document: LegalDocument;
  lang: Lang;
}

export default function LegalDocumentPage({
  document,
  lang,
}: LegalDocumentPageProps) {
  return (
    <div className="min-h-dvh pt-22 pb-16 px-6 bg-background">
      <div className="max-w-6xl mx-auto">
        <article className="space-y-10">
          <header className="mb-12 border-b border-neutral-800 pb-8 text-start">
            <h1 className="text-heading font-bold tracking-tight text-content-heading mb-4">
              {document.heading[lang] || document.heading.en}
            </h1>
            <p className="text-base text-content-muted font-medium leading-relaxed">
              {document.subheading[lang] || document.subheading.en}
            </p>
          </header>

          {document.sections.map((section, index) => (
            <section key={index} className="scroll-mt-24 text-start">
              <h2 className="text-subheading font-bold text-content-heading mb-3">
                {section.title[lang] || section.title.en}
              </h2>
              <p className="text-base text-content-body leading-relaxed whitespace-pre-line">
                {section.content[lang] || section.content.en}
              </p>
            </section>
          ))}
        </article>
      </div>
    </div>
  );
}
