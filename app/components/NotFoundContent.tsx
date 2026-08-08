import { SITE_NAME, CURRENT_YEAR } from "@/app/constants";

interface NotFoundLink {
  href: string;
  label: string;
}

interface NotFoundGroup {
  title: string;
  links: NotFoundLink[];
}

const linkGroups: NotFoundGroup[] = [
  {
    title: "Explore",
    links: [
      { href: "/", label: "Homepage" },
      { href: "/en/about", label: `About ${SITE_NAME}` },
      { href: "/en/guides", label: "All guides on web design in Egypt" },
    ],
  },
  {
    title: "Guides",
    links: [
      {
        href: "/en/guides/website-cost-in-egypt",
        label: `Website costs in Egypt (${CURRENT_YEAR})`,
      },
      {
        href: "/en/guides/why-your-business-needs-a-website",
        label: `Why your business needs a website (${CURRENT_YEAR})`,
      },
      {
        href: "/en/guides/diy-vs-professional-web-design",
        label: `Website builders vs professional web design (${CURRENT_YEAR})`,
      },
      {
        href: "/en/guides/choose-web-design-company-egypt",
        label: "Choosing the best web design company in Egypt",
      },
    ],
  },
  {
    title: "Portfolio demos",
    links: [
      {
        href: "/portfolio/travel-tourism-website-design",
        label: "Travel & Tourism",
      },
      {
        href: "/portfolio/interior-design-website-design",
        label: "Interior Design & Decor",
      },
    ],
  },
];

const css = `
  :root {
    --bg: oklch(18.6% 0.0111 267);
    --heading: oklch(92% 0.0051 267.4);
    --body: oklch(82.2% 0.0116 267.3);
    --muted: oklch(73.8% 0.0173 267.3);
    --gold: oklch(76.7% 0.1399 91.2);
    --gold-dark: oklch(60% 0.105 92.2);
    --hairline: oklch(76.7% 0.1399 91.2 / 0.18);
  }
  * { margin: 0; box-sizing: border-box; }
  body {
    background: var(--bg);
    color: var(--heading);
    font-family: system-ui, -apple-system, "Segoe UI", Roboto, sans-serif;
    -webkit-font-smoothing: antialiased;
  }
  .nf-wrap {
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 4rem;
    padding: 1.5rem;
    text-align: center;
  }
  .nf-code {
    font-size: 8rem;
    font-weight: 700;
    line-height: 1;
    user-select: none;
    color: oklch(73.8% 0.0173 267.3 / 0.6);
  }
  .nf-title {
    font-size: clamp(1.5rem, 1.1rem + 1.7vw, 2.25rem);
    font-weight: 700;
    margin: 1.5rem 0.75rem;
  }
  .nf-text {
    font-size: clamp(1.175rem, 1rem + 0.65vw, 1.5rem);
    color: var(--body);
  }
  .nf-sitemap {
    width: 100%;
    max-width: 80rem;
    display: flex;
    flex-direction: column;
    gap: 2.75rem;
  }
  .nf-grid {
    display: grid;
    grid-template-columns: 1fr;
    gap: 2.5rem;
    text-align: left;
  }
  @media (min-width: 720px) {
    .nf-grid { grid-template-columns: repeat(3, 1fr); gap: 3rem; }
  }
  .nf-col-title {
    font-size: 0.72rem;
    font-weight: 700;
    letter-spacing: 0.22em;
    text-transform: uppercase;
    color: var(--gold);
    margin-bottom: 1.15rem;
    padding-bottom: 0.7rem;
    border-bottom: 1px solid var(--hairline);
  }
  .nf-list {
    list-style: none;
    padding: 0;
    margin: 0;
    display: flex;
    flex-direction: column;
    gap: 0.85rem;
  }
  .nf-link {
    color: var(--body);
    text-decoration: none;
    font-size: 1rem;
    line-height: 1.5;
    transition: color 0.25s ease;
  }
  .nf-link:hover,
  .nf-link:focus-visible {
    color: var(--heading);
  }
`;

export default function NotFoundContent() {
  return (
    <>
      <style
        href="not-found-styles"
        precedence="default"
        dangerouslySetInnerHTML={{ __html: css }}
      />
      <div className="nf-wrap">
        <section aria-labelledby="nf-title">
          <p className="nf-code" aria-hidden="true">404</p>
          <h1 id="nf-title" className="nf-title">Page Not Found</h1>
          <p className="nf-text">
            Seems like you&apos;ve gotten yourself lost. Here&apos;s a map:
          </p>
        </section>

        <nav className="nf-sitemap" aria-label="Site navigation">
          <div className="nf-grid">
            {linkGroups.map((group) => (
              <div key={group.title}>
                <h2 className="nf-col-title">{group.title}</h2>
                <ul className="nf-list">
                  {group.links.map((link) => (
                    <li key={link.href}>
                      <a href={link.href} className="nf-link">
                        {link.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </nav>
      </div>
    </>
  );
}
