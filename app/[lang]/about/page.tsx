import type { Metadata } from "next";
import Image from "next/image";
import profilePhoto from "@/public/profilePhoto.jpg";
import aboutPage from "@/app/data/translations/aboutPage";
import pageMeta from "@/app/data/translations/pageMeta";
import { notFound } from "next/navigation";
import {
  SITE_URL,
  SITE_NAME,
  CONTACT_EMAIL,
  SCHEMA_IDS,
  SOCIAL_LINKS,
  FOUNDER_LINKS,
} from "@/app/constants";
import { pageAlternates, pageUrl } from "@/lib/urls";
import {
  Eye,
  MessagesSquare,
  Handshake,
  Mail,
  type LucideIcon,
} from "lucide-react";
import WhatsAppIcon from "@/app/components/utils/WhatsAppIcon";
import LinkedInIcon from "@/app/components/utils/LinkedInIcon";
import { isLang, type Lang, type LangParams } from "@/app/types";

const valueCardIcons: Record<string, LucideIcon> = {
  transparency: Eye,
  quality: MessagesSquare,
  partnership: Handshake,
};

export async function generateMetadata({
  params,
}: {
  params: Promise<LangParams>;
}): Promise<Metadata> {
  const { lang } = await params;
  return {
    title: pageMeta.about.title[lang],
    description: pageMeta.about.description[lang],
    alternates: pageAlternates(lang, "/about"),
  };
}

export default async function AboutPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang: rawLang } = await params;
  if (!isLang(rawLang)) notFound();
  const lang: Lang = rawLang;

  const translations = aboutPage;
  const personSchema = {
    "@context": "https://schema.org",
    "@type": "Person",
    "@id": SCHEMA_IDS.founder,
    name: "Samir Magdy",
    alternateName: "سمير مجدي",
    jobTitle: "Founder, Web Designer & Developer",
    description: `Samir Magdy is a web designer & developer & the founder of ${SITE_NAME}, specializing in high-performance, custom web development.`,
    nationality: { "@type": "Country", name: "Egypt" },
    url: pageUrl(lang, "/about"),
    image: `${SITE_URL}/profilePhoto.jpg`,
    sameAs: [FOUNDER_LINKS.linkedin, FOUNDER_LINKS.github],
    worksFor: {
      "@type": "ProfessionalService",
      "@id": SCHEMA_IDS.business,
      name: SITE_NAME,
    },
  };

  return (
    <div className="relative isolate bg-background px-8 py-16 md:flex-1 md:pt-28 md:pb-20">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(personSchema).replace(/</g, "\\u003c"),
        }}
      />
      <article className="relative z-10 mx-auto max-w-4xl">
        <h1 className="reveal-element text-center text-content-heading font-bold text-heading tracking-wide mb-6 md:mb-12">
          {translations.h1PageTitle[lang]}
        </h1>

        <p className="reveal-element text-center text-pretty leading-[1.7] rtl:leading-[1.9] text-content-body text-[clamp(1.1rem,1.6vw,1.35rem)]">
          {translations.paragraphs[0][lang]}
        </p>

        <div className="reveal-element mt-8 flex items-center justify-center gap-4">
          <span
            aria-hidden="true"
            className="h-px w-8 bg-linear-to-r rtl:bg-linear-to-l from-transparent to-gold/50"
          />
          <p className="text-base font-semibold uppercase tracking-[0.28em] rtl:text-subheading text-content-muted">
            {translations.valuesEyebrow[lang]}
          </p>
          <span
            aria-hidden="true"
            className="h-px w-8 bg-linear-to-r rtl:bg-linear-to-l from-gold/50 to-transparent"
          />
        </div>
        <ul className="mt-8 mb-10 grid gap-6 text-center md:grid-cols-3 sm:gap-5 max-w-4xl mx-auto">
          {translations.valueCards.map((card) => {
            const Icon = valueCardIcons[card.id];
            return (
              <li
                key={card.id}
                className="reveal-element group relative overflow-hidden rounded-3xl border border-border-subtle bg-linear-to-b from-surface-card/80 to-surface-card/40 px-6 py-10 transition-all duration-500 ease-out hover:-translate-y-1.5 hover:border-gold/40"
              >
                <div
                  aria-hidden="true"
                  className="relative mx-auto mb-5 flex items-center justify-center text-gold/90 transition-transform duration-500 group-hover:-translate-y-0.5 group-hover:scale-120 group-hover:text-gold-light"
                >
                  <Icon className="size-10" strokeWidth={1.5} />
                </div>

                <p className="relative text-[1.05rem] sm:text-[clamp(1rem,5vw,1.2rem)] font-semibold uppercase tracking-widest text-gold">
                  {card.title[lang]}
                </p>

                <div
                  aria-hidden="true"
                  className="relative mx-auto my-8 sm:my-4 h-px w-8 bg-content-muted/40 transition-all duration-500 group-hover:w-14 group-hover:bg-gold/70"
                />

                <p className="relative text-pretty leading-[1.7] rtl:leading-loose text-content-muted text-lg sm:text-[clamp(1rem,4vw,1.2rem)]">
                  {card.desc[lang]}
                </p>
              </li>
            );
          })}
        </ul>
        <p className="reveal-element text-center text-pretty leading-[1.7] rtl:leading-[1.9] text-content-body text-[clamp(1.1rem,1.6vw,1.35rem)]">
          {translations.paragraphs[1][lang]}
        </p>
         <p className="reveal-element mt-8 text-center text-pretty leading-[1.7] rtl:leading-[1.9] text-content-body text-[clamp(1.1rem,1.6vw,1.35rem)]">
          {translations.paragraphs[2][lang]}
        </p>
        <div className="reveal-element mt-20 flex max-w-4xl mx-auto flex-col items-center text-center md:mt-16 md:flex-row md:items-center md:justify-center md:gap-12 md:text-start">
          <span
            className="h-px w-full max-w-32 bg-border-subtle md:hidden"
            aria-hidden="true"
          />
          <p className="sm:hidden mt-5 text-[clamp(2rem,5vw,1.55rem)] font-semibold text-content-heading">
            {translations.founderName[lang]}
          </p>
          <p className="sm:hidden mt-1.5 text-content-muted text-[clamp(1.2rem,4vw,1.55rem)]">
            {translations.founderRole[lang]}
          </p>
          <div className="mt-10 shrink-0 overflow-hidden rounded-4xl border border-border-strong shadow-[0_18px_40px_-18px_rgba(0,0,0,0.8)] md:mt-0 md:w-62">
            <Image
              src={profilePhoto}
              alt={translations.founderPhotoAlt[lang]}
              className="size-full object-cover object-top"
            />
          </div>

          <span
            aria-hidden="true"
            className="hidden md:block md:h-48 md:w-px md:shrink-0 md:bg-linear-to-b md:from-transparent md:via-gold/40 md:to-transparent"
          />

          <div className="flex flex-col w-full px-2 items-center md:items-start">
            <p className="hidden sm:block mt-5 text-[clamp(1.3rem,1rem+1.1vw,1.55rem)] font-semibold text-content-heading md:mt-0 md:text-[clamp(1.8rem,2.4vw,2.4rem)] md:leading-tight">
              {translations.founderName[lang]}
            </p>
            <p className="hidden sm:block text-content-muted text-[1.1rem] mt-3 rtl:mt-5 rtl:text-[1.2rem] md:font-semibold md:uppercase md:tracking-[0.2em] md:text-gold/85">
              {translations.founderRole[lang]}
            </p>

            <div className="mt-9 flex w-full flex-col gap-3 md:mt-8">
              <div className="flex flex-col gap-3 sm:flex-row text-base font-medium text-content-body">
                <a
                  href={SOCIAL_LINKS.whatsapp}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex flex-1 items-center justify-center gap-2.5 rounded-2xl border border-border-strong px-6 py-3 transition-all duration-250 hover:border-white/30"
                >
                  <WhatsAppIcon className="size-5 shrink-0 text-[#25D366]" />
                  {translations.linkWhatsApp[lang]}
                </a>

                <a
                  href={`mailto:${CONTACT_EMAIL}`}
                  className="flex flex-1 items-center justify-center gap-2.5 rounded-2xl border border-border-strong px-6 py-3 transition-all duration-250 hover:border-white/30"
                >
                  <Mail
                    className="size-5 shrink-0 text-white/80"
                    strokeWidth={2}
                  />
                  {translations.linkEmail[lang]}
                </a>

                <a
                  href={FOUNDER_LINKS.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex flex-1 items-center justify-center gap-2.5 rounded-2xl border border-border-strong px-6 py-3 transition-all duration-250 hover:border-white/30"
                >
                  <LinkedInIcon className="size-5 shrink-0 text-[#0A66C2]" />
                  {translations.linkLinkedIn[lang]}
                </a>
              </div>
            </div>
          </div>
        </div>
      </article>
    </div>
  );
}
