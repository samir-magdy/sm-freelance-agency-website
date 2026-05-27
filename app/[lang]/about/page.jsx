import Image from "next/image";
import Link from "next/link";
import profilePhoto from "@/public/profilePhoto.jpg";
import translations from "@/app/data/translations";
import { notFound } from "next/navigation";

const meta = {
  en: {
    title: "Samir Magdy | Website Designer & Developer in Egypt",
    description: "Samir Magdy is a web designer & developer in Egypt and the founder of SM Web Studio — delivering international-grade web design to the Egyptian market.",
  },
  ar: {
    title: "سمير مجدي | مصمم ومطور مواقع في مصر",
    description: "سمير مجدي مصمم ومطور مواقع في مصر، ومؤسس SM Web Studio — يقدم تصميم مواقع بمعايير عالمية للسوق المصري.",
  },
};

export async function generateMetadata({ params }) {
  const { lang } = await params;
  const m = meta[lang] ?? meta.en;
  return {
    title: m.title,
    description: m.description,
  };
}

export default async function AboutPage({ params }) {
  const { lang } = await params;
  if (lang !== "en" && lang !== "ar") notFound();

  const t = translations.aboutSection;
  const dir = lang === "ar" ? "rtl" : "ltr";
  return (
    <div dir={dir} className="bg-background md:flex-1 flex items-center px-6 sm:px-8 pt-24 pb-10">
      <div className="mx-auto w-full max-w-7xl bg-surface-card border border-border-subtle rounded-2xl overflow-hidden shadow-[0_32px_72px_-24px_rgba(0,0,0,0.7)] flex flex-col md:flex-row">

        {/* Desktop: image as left column */}
        <div className="hidden md:block shrink-0 md:w-[30%]">
          <Image
            src={profilePhoto}
            alt="Samir Magdy, Founder of SM Web Design Studio"
            className="w-full h-full object-cover object-top"
            sizes="35vw"
          />
        </div>

        <div className="flex flex-col justify-center py-8 px-8 md:pe-10">
          <h1 className="font-bold text-[clamp(1.05rem,1.4vw,1.5rem)] tracking-widest uppercase text-gold/80 mb-5">
            {t.heading[lang]}
          </h1>


          <p className="text-content-body leading-[1.7] text-[1rem] md:text-[clamp(1.05rem,1.4vw,1.2rem)]">
            {t.storyP1[lang]}
          </p>
          <p
            className="text-content-body leading-[1.7] text-[1rem] md:text-[clamp(1.05rem,1.4vw,1.2rem)] mt-4"
            dangerouslySetInnerHTML={{ __html: t.storyP2[lang] }}
          />

          {/* Mobile: image between text and founder byline */}

          <div className="md:mt-8 md:pt-6 md:border-t border-border-subtle">
          <div className="md:hidden my-6 rounded-3xl overflow-hidden h-72">
            <Image
              src={profilePhoto}
              alt="Samir Magdy, Founder of SM Web Design Studio"
              className="w-full h-full object-cover object-[50%_25%]"
              sizes="100vw"
            />
          </div>
          <div className="flex flex-col md:flex-row md:justify-between">
            <div className="flex flex-col justify-end">
            <p className="md:text-[clamp(1.05rem,1.4vw,1.4rem)] font-semibold text-content-heading leading-snug">
              {t.founderName[lang]}
            </p>
            <p className="text-base text-content-muted mt-1 md:text-[clamp(1.05rem,1.4vw,1.2rem)]">{t.founderRole[lang]}</p>
            </div>
            <div className="flex flex-wrap gap-3 mt-6 items-center">
              <Link
                href={`/${lang}/#contact`}
                className="cta-primary font-semibold bg-linear-to-b m-auto from-gold to-gold-dark text-gray-900 px-6 py-2.5 rounded-2xl text-sm md:text-lg"
              >
                {t.ctaContact[lang]}
              </Link>
              <a
                href="https://www.linkedin.com/in/samir-magdy-/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-6 py-2.5 rounded-2xl m-auto border border-border-strong text-content-muted hover:text-gray-900 md:text-lg hover:bg-white/90 transition-colors duration-250 text-sm font-medium"
              >
                {t.ctaLinkedIn[lang]}
              </a>
            </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
