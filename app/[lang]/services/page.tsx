import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import servicesPage from "@/app/data/translations/servicesPage";
import SpecializedServiceIcon from "@/app/components/utils/SpecializedServiceIcon";
import { SITE_NAME } from "@/app/constants";
import { pageAlternates } from "@/lib/urls";
import { isLang, type Lang, type LangParams } from "@/app/types";

const meta: Record<Lang, { title: string; description: string }> = {
  en: {
    title: "Specialized Services — Branding, Copywriting, SEO, Bilingual",
    description: `Branding, copywriting, SEO setup, and full bilingual support from ${SITE_NAME}. Layer onto a website build, or hire on its own.`,
  },
  ar: {
    title: "خدمات متخصصة — هوية بصرية، محتوى، SEO، ثنائي اللغة",
    description: `هوية بصرية، كتابة محتوى، إعداد SEO، ودعم كامل ثنائي اللغة من ${SITE_NAME}. أضفها لمشروع موقع، أو استفد منها كمشروع مستقل.`,
  },
};

export async function generateMetadata({
  params,
}: {
  params: Promise<LangParams>;
}): Promise<Metadata> {
  const { lang } = await params;
  const m = meta[lang] ?? meta.en;
  return {
    title: m.title,
    description: m.description,
    alternates: pageAlternates(lang, "/services"),
  };
}

export default async function ServicesDetailPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang: rawLang } = await params;
  if (!isLang(rawLang)) notFound();
  const lang: Lang = rawLang;
  const t = servicesPage;
  const isRtl = lang === "ar";

  return (
    <div
      className="relative isolate bg-background px-6 sm:px-10 md:px-16 py-16 md:pt-28 md:pb-24"
      dir={isRtl ? "rtl" : "ltr"}
    >
      <article className="relative mx-auto max-w-5xl">
        <header className="reveal-element text-center">
          <h1 className="font-bold text-heading leading-tight text-content-heading mb-2 rtl:mb-3">
            {t.h1[lang]}
          </h1>
          <p className="max-w-2xl mx-auto text-content-body text-[clamp(1.2rem,2vw,1.6rem)] leading-[1.7] rtl:leading-[1.9]">
            {t.intro[lang]}
          </p>
        </header>

        <div className="flex flex-col">
          {t.sections.map((section) => (
            <section
              key={section.id}
              id={section.id}
              className="reveal-element scroll-mt-24 md:scroll-mt-32 py-12 sm:py-18 border-t border-border-strong first:border-t-0 last:border-b"
            >
              <div className="grid gap-6 md:grid-cols-[auto_1fr] md:gap-12 items-start">
                <span className="inline-flex items-center justify-center w-14 h-14 md:w-16 md:h-16 rounded-3xl border border-gold/25 bg-surface-card/70 text-gold shrink-0">
                  <SpecializedServiceIcon id={section.id} size={26} strokeWidth={1.3} />
                </span>

                <div className="min-w-0">
                  <h2 className="text-subheading font-bold text-content-heading leading-tight">
                    {section.name[lang]}
                  </h2>
                  <p className="mt-3 text-content-body text-[clamp(1.05rem,1.5vw,1.25rem)] leading-[1.7] rtl:leading-[1.9]">
                    {section.tagline[lang]}
                  </p>

                  <div className="mt-8 flex flex-col gap-8 sm:gap-10">
                    <div>
                      <p className="text-[0.8rem] sm:text-sm font-bold uppercase tracking-[0.28em] text-gold/80 mb-4">
                        {t.includedTitle[lang]}
                      </p>
                      <ul className="space-y-3">
                        {section.included.map((item, j) => (
                          <li
                            key={j}
                            className="flex items-start gap-3 text-content-body text-base leading-relaxed rtl:leading-[1.9]"
                          >
                            <span
                              aria-hidden="true"
                              className="mt-2 h-1.5 w-1.5 shrink-0 rotate-45 bg-gold/70"
                            />
                            <span>{item[lang]}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <p className="text-[0.8rem] sm:text-sm font-bold uppercase tracking-[0.28em] text-gold/80 mb-4">
                        {t.fitTitle[lang]}
                      </p>
                      <p className="text-content-body text-base sm:max-w-3/4 leading-relaxed rtl:leading-[1.9]">
                        {section.fit[lang]}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          ))}
        </div>

        <div className="reveal-element relative overflow-hidden rounded-2xl border border-white/8 bg-surface-low mt-14 mb-6">
          <div className="relative text-center sm:text-start flex flex-col sm:flex-row sm:items-center gap-7 sm:gap-12 px-7 py-9 sm:px-11 sm:py-11">
            <p className="flex-1 text-[clamp(1.2rem,4vw,2.2rem)] font-semibold text-content-heading leading-tight rtl:leading-loose">
              {t.articleCta[lang]}
            </p>
            <Link
              href={`/${lang}#contact`}
              className="cta-primary justify-center shrink-0 py-3 px-8 rounded-lg text-background text-base sm:text-xl font-medium tracking-wide whitespace-nowrap"
            >
              {t.articleCtaButton[lang]}
            </Link>
          </div>
        </div>

        <div className="reveal-element pt-8">
          <Link
            href={`/${lang}#services`}
            className="hover:border-white/30 hover:text-white/80 border-border-strong border w-fit rounded-lg px-5 py-2 group tracking-wide flex items-center gap-2.5 text-content-muted text-[clamp(0.9rem,1.3vw,1.2rem)] font-medium transition-all duration-500"
          >
            <ArrowLeft
              className={`size-3 sm:size-5 transition-transform duration-300 ${isRtl ? "rotate-180 group-hover:translate-x-1" : "group-hover:-translate-x-1"}`}
              aria-hidden
            />
            {t.backLinkLabel[lang]}
          </Link>
        </div>
      </article>
    </div>
  );
}
