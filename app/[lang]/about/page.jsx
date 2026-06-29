import Image from "next/image";
import Link from "next/link";
import profilePhoto from "@/public/profilePhoto.jpg";
import aboutSection from "@/app/data/translations/aboutSection";
import { notFound } from "next/navigation";
import { SITE_URL, SITE_NAME, TWITTER_HANDLE } from "@/app/constants";
import { Eye, MessagesSquare, Handshake, Mail } from "lucide-react";
import WhatsAppIcon from "@/app/components/utils/WhatsAppIcon";
import LinkedInIcon from "@/app/components/utils/LinkedInIcon";

// One icon per pillar, matched to the order in aboutSection.pillars.
const pillarIcons = [Eye, MessagesSquare, Handshake];

const meta = {
  en: {
    title: "Website Designer & Developer in Egypt | Samir Magdy",
    description: "Samir Magdy is a web designer & developer & the founder of SM Web Design Studio, specializing in high-performance, custom web development.",
  },
  ar: {
    title: "مبرمج ومصمم مواقع إلكترونية في مصر | سمير مجدي",
    description: "سمير مجدي هو مصمم ومطور مواقع في مصر ومؤسس شركة إس إم ويب ستوديو. متخصص في خدمات تصميم المواقع المخصصة للشركات والأفراد.",
  },
};

export async function generateMetadata({ params }) {
  const { lang } = await params;
  const m = meta[lang] ?? meta.en;
  const canonical = `${SITE_URL}/${lang}/about`;

  return {
    title: m.title,
    description: m.description,
    alternates: {
      canonical,
      languages: {
        en: `${SITE_URL}/en/about`,
        ar: `${SITE_URL}/ar/about`,
        "x-default": `${SITE_URL}/en/about`,
      },
    },
    openGraph: {
      title: m.title,
      description: m.description,
      url: canonical,
      type: "profile",
      siteName: SITE_NAME,
      locale: lang === "en" ? "en_US" : "ar_EG",
      alternateLocale: lang === "en" ? "ar_EG" : "en_US",
      images: [
        {
          url: `${SITE_URL}/open-graph.webp`,
          width: 1200,
          height: 630,
          alt: "SM Web Design Studio – Web Design Company in Egypt",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: m.title,
      description: m.description,
      images: [`${SITE_URL}/open-graph.webp`],
      site: TWITTER_HANDLE,
      creator: TWITTER_HANDLE,
    },
  };
}

export default async function AboutPage({ params }) {
  const { lang } = await params;
  if (lang !== "en" && lang !== "ar") notFound();

  const t = aboutSection;
  const dir = lang === "ar" ? "rtl" : "ltr";

  return (
    <div
      dir={dir}
      className="relative isolate bg-background px-8 py-16 md:flex-1 md:pt-28 md:pb-28"
    >
      <article className="relative z-10 mx-auto max-w-6xl">
        {/* ── Masthead ──────────────────────────────────── */}
        <header className="reveal-element text-center">
          <h1
            id="about-title"
            className="text-content-heading font-bold text-[clamp(1.8rem,5vw,2.75rem)] tracking-wide rtl:tracking-normal"
          >
            {t.eyebrow[lang]}
          </h1>
        </header>

        {/* ── Body — three logical paragraphs ───────────── */}
        {t.paragraphs.map((para, i) => (
          <p
            key={i}
            className="reveal-element mx-auto mt-8 max-w-4xl text-center leading-[1.7] rtl:leading-[1.9] text-content-body text-[clamp(1.1rem,1.6vw,1.35rem)]"
          >
            {para[lang]}
          </p>
        ))}

        {/* ── Pillars — section eyebrow + cards ─────────── */}
        <div className="reveal-element mt-20 flex items-center justify-center gap-4">
          <span
            aria-hidden="true"
            className="h-px w-8 bg-linear-to-r rtl:bg-linear-to-l from-transparent to-gold/50"
          />
          <p className="text-base font-semibold uppercase tracking-[0.28em] rtl:text-subheading rtl:tracking-normal text-content-muted">
            {t.pillarsLabel[lang]}
          </p>
          <span
            aria-hidden="true"
            className="h-px w-8 bg-linear-to-r rtl:bg-linear-to-l from-gold/50 to-transparent"
          />
        </div>
        <ul className="mt-8 grid gap-6 text-center sm:grid-cols-3 sm:gap-5 max-w-4xl mx-auto">
          {t.pillars.map((p, i) => {
            const Icon = pillarIcons[i] ?? pillarIcons[0];
            return (
            <li
              key={p.num}
              className="reveal-element group relative overflow-hidden rounded-3xl border border-border-subtle bg-linear-to-b from-surface-card/80 to-surface-card/40 px-6 py-10 transition-all duration-500 ease-out hover:-translate-y-1.5 hover:border-gold/40"
            >
              {/* Gold pillar icon — the crest marker */}
              <span
                aria-hidden="true"
                className="relative mx-auto  mb-5 flex items-center justify-center text-gold/90 transition-transform duration-500 group-hover:-translate-y-0.5 group-hover:scale-120 group-hover:text-gold-light"
              >
                <Icon className="size-10" strokeWidth={1.5} />
              </span>

              <h3 className="relative text-[1.05rem] sm:text-[clamp(1rem,5vw,1.2rem)] font-semibold uppercase tracking-[0.1em] rtl:tracking-normal text-gold">
                {p.title[lang]}
              </h3>

              {/* Hairline that grows on hover */}
              <span
                aria-hidden="true"
                className="relative mx-auto my-8 sm:my-4 block h-px w-8 bg-content-muted/40 transition-all duration-500 group-hover:w-14 group-hover:bg-gold/70"
              />

              <p className="relative leading-[1.7] rtl:leading-loose text-content-muted text-lg sm:text-[clamp(1rem,4vw,1.2rem)]">
                {p.desc[lang]}
              </p>
            </li>
            );
          })}
        </ul>

        {/* ── Signature — portrait + name ───────────────── */}
        {/* Mobile: centered stack (unchanged). Desktop: side-by-side founder card. */}
        <div className="reveal-element mt-20 flex max-w-4xl mx-auto flex-col items-center text-center md:mt-28 md:flex-row md:items-center md:justify-center md:gap-12 md:text-start">
          {/* Top hairline — mobile only; desktop uses the vertical gold rule */}
          <span className="h-px w-full max-w-[8rem] bg-border-subtle md:hidden" aria-hidden="true" />
             <p className="sm:hidden mt-5 text-[clamp(2rem,5vw,1.55rem)] font-semibold text-content-heading md:mt-0 md:text-[clamp(1.8rem,2.4vw,2.4rem)] md:leading-tight">
              {t.founderName[lang]}
            </p>
            <p className="sm:hidden mt-1.5 text-content-muted text-[clamp(1.2rem,4vw,1.55rem)] md:mt-3 md:text-[0.78rem] md:font-semibold md:uppercase md:tracking-[0.2em] md:text-gold/85">
              {t.founderRole[lang]}
            </p>
          {/* Portrait */}
          <div className="mt-10 shrink-0 overflow-hidden rounded-4xl border border-border-strong shadow-[0_18px_40px_-18px_rgba(0,0,0,0.8)] md:mt-0 md:w-62">
            
            <Image
              src={profilePhoto}
              alt="Photo of Samir Magdy, Founder of SM Web Design Studio"
              className="size-full object-cover object-top"
              placeholder="blur"
            />
          </div>

          {/* Vertical gold divider — desktop only */}
          <span
            aria-hidden="true"
            className="hidden md:block md:h-48 md:w-px md:shrink-0 md:bg-linear-to-b md:from-transparent md:via-gold/40 md:to-transparent"
          />

          {/* Identity + CTAs خلاهمث*/}
          <div className="flex flex-col w-full px-2 items-center md:items-start">
            <p className="hidden sm:block mt-5 text-[clamp(1.3rem,1rem+1.1vw,1.55rem)] font-semibold text-content-heading md:mt-0 md:text-[clamp(1.8rem,2.4vw,2.4rem)] md:leading-tight">
              {t.founderName[lang]}
            </p>
            <p className="hidden sm:block text-content-muted text-[1.1rem] mt-3 rtl:mt-5 rtl:text-[1.2rem] md:font-semibold md:uppercase md:tracking-[0.2em] md:text-gold/85">
              {t.founderRole[lang]}
            </p>

            {/* CTAs — 3 contact links on top, full-width primary below */}
            <div className="mt-9 flex w-full flex-col gap-3 md:mt-8">
              {/* Contact links row */}
              <div className="flex flex-col gap-3 sm:flex-row">
                <a
                  href="https://wa.me/201274613331"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex flex-1 items-center justify-center gap-2.5 rounded-2xl border border-border-strong px-6 py-3 text-base font-medium text-content-body transition-all duration-250 hover:border-white/30"
                >
                  <WhatsAppIcon className="size-5 shrink-0 text-[#25D366]" />
                  {t.ctaWhatsApp[lang]}
                </a>

                <a
                  href="mailto:studio@samirmagdy.com"
                  className="flex flex-1 items-center justify-center gap-2.5 rounded-2xl border border-border-strong px-6 py-3 text-base font-medium text-content-body transition-all duration-250 hover:border-white/30"
                >
                  <Mail className="size-5 shrink-0 text-white/80" strokeWidth={2} />
                  {t.ctaEmail[lang]}
                </a>

                <Link
                  href="https://www.linkedin.com/in/samir-magdy-/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex flex-1 items-center justify-center gap-2.5 rounded-2xl border border-border-strong px-6 py-3 text-base font-medium text-content-body transition-all duration-250 hover:border-white/30"
                >
                  <LinkedInIcon className="size-5 shrink-0 text-[#0A66C2]" />
                  {t.ctaLinkedIn[lang]}
                </Link>
              </div>

              {/* Primary — stretches the full width */}
              <Link
                href={`/${lang}/#contact`}
                className="w-full cta-primary whitespace-nowrap rounded-2xl px-7 py-3 text-center text-base font-semibold text-gray-900 transition-all duration-300 hover:border-gold/50 sm:mt-1"
              >
                {t.ctaContact[lang]}
              </Link>
            </div>
          </div>
        </div>
      </article>
    </div>
  );
}
