const LINK_CONFIG = [
  { href: "#portfolio", labelKey: "portfolio" },
  { href: "#features", labelKey: "features" },
  { href: "#process", labelKey: "process" },
  { href: "#pricing", labelKey: "pricing" },
  { href: "#FAQs", labelKey: "FAQs" },
  { href: "#contact", labelKey: "contact" },
];

export default function DesktopNavLinks({ nav }) {
  return (
    <ul className="flex w-full justify-center gap-14 xl:gap-20">
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
