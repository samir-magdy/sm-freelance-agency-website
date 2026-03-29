import SocialIcons from "./SocialIcons";

export default function Footer() {
  return (
    <footer
      id="contact-footer"
      className="bg-background/10 flex flex-col items-center gap-6 py-3.5 sm:py-6 border-t border-border-subtle"
    >
      {/* Contact row — desktop only */}
      <div dir="ltr" className="hidden sm:flex items-center gap-2.5">
        <a
          href="tel:+201274613331"
          className="inline-flex items-center gap-1 text-content-muted hover:text-content-heading"
        >
          <svg
            className="w-4 h-4"
            fill="currentColor"
            stroke="currentColor"
            strokeWidth="1.5"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z"
            />
          </svg>
          <p className="md:pb-0.5 text-lg">+20 127 461 3331</p>
        </a>

        <span className="w-1 h-1 rounded-full bg-content-muted"></span>

        <a
          href="mailto:studio@samirmagdy.com"
          className="inline-flex items-center gap-1 text-content-muted hover:text-content-heading"
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
          <p className="md:pb-0.5 text-lg">studio@samirmagdy.com</p>
        </a>
      </div>

      {/* Social icons — desktop only */}
      <div className="hidden sm:block">
        <SocialIcons />
      </div>
      <p dir="ltr" className="text-gray-400 text-center">
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
          <small className="tracking-wide md:text-[1rem]">2026 SM Web Studio <span className="inline-block w-0.5 h-0.5 rounded-full bg-content-muted mx-0.5 align-middle"></span> By Samir Magdy</small>
        </span>
      </p>
    </footer>
  );
}
