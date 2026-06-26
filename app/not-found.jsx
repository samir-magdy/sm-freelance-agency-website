import Link from "next/link";

// NOTE: This is a separate root document (no shared app/layout exists — see
// app/[lang]/layout.jsx). It intentionally does NOT import globals.css: a second
// import here compiles globals into its own chunk and breaks Turbopack's HMR
// ("No link element found for chunk app_globals_*.css"). globals.css is imported
// once, in app/[lang]/layout.jsx. The few styles this page needs are inlined below.
const css = `
  :root {
    --bg: oklch(18.6% 0.0111 267);
    --heading: oklch(92% 0.0051 267.4);
    --body: oklch(82.2% 0.0116 267.3);
    --muted: oklch(73.8% 0.0173 267.3);
    --gold: oklch(76.7% 0.1399 91.2);
    --gold-dark: oklch(60% 0.105 92.2);
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
    align-items: center;
    justify-content: center;
    padding: 5rem 1.5rem;
    text-align: center;
  }
  .nf-inner { max-width: 32rem; }
  .nf-code {
    font-size: 8rem;
    font-weight: 700;
    line-height: 1;
    user-select: none;
    color: oklch(73.8% 0.0173 267.3 / 0.4);
  }
  .nf-title {
    font-size: clamp(1.5rem, 1.1rem + 1.7vw, 2.25rem);
    font-weight: 700;
    margin: 1.5rem 0 0.75rem;
  }
  .nf-text {
    font-size: clamp(1.175rem, 1rem + 0.65vw, 1.5rem);
    color: var(--body);
    margin-bottom: 2rem;
  }
  .nf-cta {
    display: inline-block;
    font-weight: 600;
    color: #111827;
    background: linear-gradient(to bottom, var(--gold), var(--gold-dark));
    padding: 0.75rem 2rem;
    border-radius: 1rem;
    text-decoration: none;
  }
`;

export default function NotFound() {
  return (
    <html lang="en">
      <body>
        <style dangerouslySetInnerHTML={{ __html: css }} />
        <div className="nf-wrap">
          <div className="nf-inner">
            <p className="nf-code">404</p>
            <h1 className="nf-title">Page Not Found</h1>
            <p className="nf-text">
              Seems like you&apos;ve gotten yourself lost.
            </p>
            <Link href="/en" className="nf-cta">
              Back to Home
            </Link>
          </div>
        </div>
      </body>
    </html>
  );
}
