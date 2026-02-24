import SocialIcons from "./SocialIcons";

export default function Footer() {

  return (
    <footer id="contact-footer" className="bg-background flex flex-col items-center gap-2">
      <div className="hidden md:flex">
        <SocialIcons />
      </div>
      <p dir="ltr" className="text-content-muted text-caption md:text-base text-center">
        <span className="inline-flex items-center gap-2 font-medium">
          <svg
            className="w-4 h-4 pt-0.5"
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
          <small>2026 SM Web Studio | By Samir Magdy</small>
        </span>
      </p>
    </footer>
  );
}
