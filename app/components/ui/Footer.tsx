import translations from "@/app/data/translations";
import type { Lang } from "@/app/data/translations";

export default function Footer({ lang }: { lang: Lang }) {

  return (
    <footer id="contact-footer" className="bg-background">
      <p dir="ltr" className="text-content-muted text-caption md:text-base text-center">
        <span className="inline-flex items-center gap-2 font-medium">
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
          <small>2026 | Samir Magdy | Web Design & Development</small>
        </span>
      </p>
    </footer>
  );
}
