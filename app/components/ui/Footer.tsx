import SocialIcons from "./SocialIcons";

export default function Footer() {
  return (
    <footer
      id="contact-footer"
      className="bg-background/10 flex flex-col items-center gap-6 py-6 border-t border-border-subtle"
    >
      <div dir="ltr" className="flex items-center gap-2.5">
        <SocialIcons />

        {/* Dot (Hidden on mobile to match the other elements) */}
        <span className="w-1 h-1 rounded-full bg-content-muted"></span>

        <a
          href="mailto:studio@samirmagdy.com"
          dir="ltr"
          className="inline-flex items-center gap-1 text-content-muted hover:text-content-heading"
        >
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75"
            />
          </svg>
          <p className="md:pb-0.5">studio@samirmagdy.com</p>
        </a>
      </div>
      <p dir="ltr" className="text-content-muted text-center">
        <span className="inline-flex items-center gap-1 font-medium">
          <svg
            className="w-4 h-4"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
          >
            <circle cx="12" cy="12" r="10" />
            <path
              d="M15 9.5a3.5 3.5 0 0 0-6 0v5a3.5 3.5 0 0 0 6 0"
              strokeLinecap="round"
            />
          </svg>
          <small className="tracking-wide md:text-[1rem]">2026 SM Web Studio | By Samir Magdy</small>
        </span>
      </p>
    </footer>
  );
}
