import SocialIcons from "@/app/components/ui/SocialIcons";
import { Copyright, Phone, MapPin } from "lucide-react";
import Link from "next/link";
import {
  PHONE_NUMBER,
  PHONE_DISPLAY,
  SOCIAL_LINKS,
  CURRENT_YEAR,
  SITE_NAME,
  CONTACT_EMAIL,
} from "@/app/constants";
import type { Lang, Localized } from "@/app/types";
import footer from "@/app/data/translations/footer";

interface FooterLink {
  href: string;
  label: Localized;
}

interface FooterProps {
  lang: Lang;
}

export default function Footer({ lang }: FooterProps) {
  const legalLinks: FooterLink[] = [
    { href: `/${lang}/privacy`, label: footer.legal.privacy },
    { href: `/${lang}/terms`, label: footer.legal.terms },
  ];

  return (
    <footer
      id="contact-footer"
      className="bg-background/10 border-t border-border-subtle"
    >
      <div className="max-w-7xl mx-auto px-6 md:px-10 lg:px-14 py-6 md:py-8">
        <div className="flex flex-col items-center justify-center gap-4 sm:gap-6 text-content-muted">
          <address
            dir="ltr"
            className="not-italic flex flex-wrap items-center justify-center gap-y-3 text-[0.95rem] sm:text-base"
          >
            <SocialIcons />
            <span
              className="inline-block w-1 h-1 rounded-full bg-content-muted mx-2.5 sm:mx-3.5"
              aria-hidden="true"
            />
            <a
              href={`tel:${PHONE_NUMBER}`}
              className="inline-flex items-center gap-1.5 hover:text-content-heading transition-colors"
            >
              <Phone className="w-4 h-4" aria-hidden="true" />
              <span className="pb-0.5">{PHONE_DISPLAY}</span>
            </a>
            <span
              className="inline-block w-1 h-1 rounded-full bg-content-muted mx-2.5 sm:mx-3.5"
              aria-hidden="true"
            />
            <a
              href={`mailto:${CONTACT_EMAIL}`}
              className="inline-flex items-center gap-1 hover:text-content-heading transition-colors"
            >
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75"
                />
              </svg>
              <span className="pb-0.5">{CONTACT_EMAIL}</span>
            </a>

            <span
              className="inline-block w-1 h-1 rounded-full bg-content-muted mx-2.5 sm:mx-3.5"
              aria-hidden="true"
            />
            <a
              href={SOCIAL_LINKS.gbp}
              target="_blank"
              rel="noopener"
              className="inline-flex items-center gap-1.5 hover:text-content-heading transition-colors"
            >
              <MapPin className="w-4 h-4" aria-hidden="true" />
              <span className="pb-0.5">
                {footer.location[lang]}
              </span>
            </a>
          </address>

          <div className="flex items-center gap-2 sm:gap-3 mx-auto text-[0.7rem] sm:text-sm text-content-muted/80">
            <small dir="ltr" className="inline-flex items-center text-[0.7rem] sm:text-sm">
              <Copyright size={12} />
              &nbsp;{CURRENT_YEAR} {SITE_NAME}
            </small>
            <nav
              className="flex items-center gap-2 sm:gap-3"
              aria-label={footer.legalLabel[lang]}
            >
              {legalLinks.map((link) => (
                <span
                  key={link.href}
                  className="inline-flex items-center gap-2 sm:gap-3"
                >
                  <span
                    className="inline-block w-[2.5px] h-[2.5px] rounded-full bg-content-muted/80 sm:translate-y-[1.5px]"
                    aria-hidden="true"
                  />
                  <Link
                    href={link.href}
                    className="hover:text-content-heading transition-colors underline-offset-2 hover:underline"
                  >
                    {link.label[lang]}
                  </Link>
                </span>
              ))}
            </nav>
          </div>
        </div>
      </div>
    </footer>
  );
}
