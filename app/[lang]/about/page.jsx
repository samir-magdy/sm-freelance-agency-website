import Image from "next/image";
import Link from "next/link";
import profilePhoto from "@/public/profilePhoto.jpg";
import translations from "@/app/data/translations";
import { notFound } from "next/navigation";
import { SITE_URL, SITE_NAME, TWITTER_HANDLE } from "@/app/constants";

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

  const t = translations.aboutSection;
  const dir = lang === "ar" ? "rtl" : "ltr";
  return (
    <div dir={dir} className="bg-background md:flex-1 flex items-center px-6 sm:px-8 pt-24 pb-10">
      <div className="mx-auto w-full max-w-7xl bg-surface-card border border-border-subtle rounded-2xl overflow-hidden shadow-[0_32px_72px_-24px_rgba(0,0,0,0.7)] flex flex-col md:flex-row">

        {/* Desktop: image as left column */}
        <div className="hidden md:block shrink-0 md:w-[30%]">
          <Image
            src={profilePhoto}
            alt="Photo of Samir Magdy, Founder of SM Web Design Studio"
            className="w-full h-full object-cover object-top"
            sizes="35vw"
            placeholder="blur"
            priority
          />
        </div>

        <div className="flex flex-col justify-evenly py-8 sm:py-6 px-8 md:pe-10">
          <h1 className="font-bold text-[clamp(0.9rem,1.6vw,1.5rem)] tracking-wider rtl:leading-loose uppercase text-gold/80 mb-5">
            {t.heading[lang]}
          </h1>


          <p className="text-content-body leading-[1.7] rtl:leading-loose text-[1rem] md:text-[clamp(1.05rem,1.4vw,1.2rem)]">
            {t.storyP1[lang]}
          </p>
          <p
            className="text-content-body leading-[1.7] rtl:leading-loose text-[1rem] md:text-[clamp(1.05rem,1.4vw,1.2rem)] mt-4"
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
              placeholder="blur"
              priority
            />
          </div>
          <div className="flex flex-col md:flex-row md:justify-between">
            <div className="flex flex-col justify-end">
            <p className="text-xl md:text-[clamp(1.05rem,1.4vw,1.4rem)] font-semibold text-content-heading leading-snug">
              {t.founderName[lang]}
            </p>
            <p className="text-base text-content-muted mt-1 md:text-[clamp(1.05rem,1.4vw,1.2rem)]">{t.founderRole[lang]}</p>
            </div>
            <div className="flex gap-3 mt-6">
              <Link
                href={`/${lang}/#contact`}
                className="cta-primary flex flex-1 items-center justify-center font-semibold bg-linear-to-b from-gold to-gold-dark text-gray-900 px-6 py-2.5 rounded-2xl text-base md:text-lg whitespace-nowrap"
              >
                {t.ctaContact[lang]}
              </Link>
              <Link
                href="https://www.linkedin.com/in/samir-magdy-/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex flex-1 justify-center items-center gap-2 px-6 py-2.5 rounded-2xl m-auto border border-border-strong text-content-muted hover:text-gray-900 md:text-lg hover:bg-white/90 transition-colors duration-250 text-base font-medium"
              >
                {t.ctaLinkedIn[lang]}
              </Link>
            </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
