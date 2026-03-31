import SocialIcons from "./SocialIcons";
import { Copyright } from "lucide-react";

export default function Footer() {
  return (
    <footer
      id="contact-footer"
      dir="ltr"
      className="bg-background/10 border-t border-border-subtle py-5"
    >
      <div className="flex flex-col items-center justify-center gap-3 text-content-muted">
        <div className="flex items-center">
        {/* Socials */}
        <SocialIcons />

        <span className="inline-block w-1 h-1 rounded-full bg-content-muted mx-3" aria-hidden="true" />

        {/* Email */}
        <a
          href="mailto:studio@samirmagdy.com"
          className="inline-flex items-center gap-1 hover:text-content-heading transition-colors"
        >
          <svg
            className="w-4 h-4"
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
          
          <span className="text-md pb-0.5">studio@samirmagdy.com</span>
        </a>
        </div>
        {/* <span className="sm:hidden inline-block w-1 h-1 rounded-full bg-content-muted mx-3" aria-hidden="true" /> */}

        {/* Copyright */}
        <small className="text-content-muted/80 text-sm inline-flex items-center gap-1">
            <Copyright size={12}/>
           2026 SM Web Studio &middot; Samir Magdy
        </small>
      </div>
    </footer>
  );
}
