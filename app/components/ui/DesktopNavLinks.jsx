const LINK_CONFIG = [
  // { href: "#home", labelKey: "home" },
  { href: "#portfolio", labelKey: "portfolio" },
  // { href: "#pricing", labelKey: "pricing" },
  { href: "#process", labelKey: "process" },
  { href: "#FAQs", labelKey: "FAQs" },
  { href: "#contact", labelKey: "Get Started" },
];

export default function DesktopNavLinks({ nav }) {
  return (
    <ul className="flex w-full justify-center gap-32">
      {LINK_CONFIG.map(({ href, labelKey }) => (
        <li key={href}>
          <a
            href={href}
            className="nav-link-underline text-[1.3rem] font-medium tracking-wider text-content-body hover:text-content-heading focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold-light rounded-sm transition-colors duration-500"
          >
            {nav[labelKey]}
          </a>
        </li>
      ))}
    </ul>
  );
}
