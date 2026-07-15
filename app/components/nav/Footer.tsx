import SocialIcons from "../ui/SocialIcons";
import { Copyright, Phone, MapPin } from "lucide-react";
import Link from "next/link";
import { PHONE_NUMBER, PHONE_DISPLAY, SOCIAL_LINKS } from "@/app/constants";
import type { Lang, Localized } from "@/app/types";

interface FooterLink extends Localized {
  href: string;
}

const footerLinks: FooterLink[] = [
  { href: "/privacy", en: "Privacy Policy", ar: "سياسة الخصوصية" },
  { href: "/terms", en: "Terms of Service", ar: "شروط الخدمة" },
];

interface FooterProps {
  lang: Lang;
}

export default function Footer({ lang }: FooterProps) {
  return (
    <footer
      id="contact-footer"
      dir="ltr"
      className="bg-background/10 border-t border-border-subtle py-4"
    >
      <div className="flex flex-col items-center justify-center gap-4 text-content-muted">
        <address className="not-italic flex flex-wrap items-center justify-center gap-y-3">
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
            <span className="text-base pb-0.5">{PHONE_DISPLAY}</span>
          </a>
          <span
            className="hidden sm:inline-block w-1 h-1 rounded-full bg-content-muted mx-2.5 sm:mx-3.5"
            aria-hidden="true"
          />
          <a
            href="mailto:studio@samirmagdy.com"
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
            <span className="text-base pb-0.5">studio@samirmagdy.com</span>
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
            <span className="text-base pb-0.5">Cairo, Egypt</span>
          </a>
        </address>

        <div className="flex divide-x divide-content-muted/40 mx-auto">
          <small className="flex px-1.5 sm:pr-3 items-center text-[0.65rem] sm:text-sm text-content-muted/80 divide-x divide-content-muted/40">
            <Copyright size={12} />
            &nbsp;{new Date().getFullYear()} SM Web Design Studio
          </small>
          <nav
            className="flex items-center divide-x divide-content-muted/40"
            aria-label="Legal"
          >
            {footerLinks.map((link) => (
              <Link
                key={link.href}
                href={`/${lang}${link.href}`}
                className="px-1.5 sm:px-3 text-[0.65rem] sm:text-sm text-content-muted/80 hover:text-content-heading transition-colors underline-offset-2 hover:underline"
              >
                {link[lang] || link.en}
              </Link>
            ))}
          </nav>
        </div>
      </div>
    </footer>
  );
}
