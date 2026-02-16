import type { Metadata } from "next";
import { Cairo } from "next/font/google";
import "./styles/globals.css";
import { Analytics } from "@vercel/analytics/next";
import { LanguageProvider } from "./contexts/LanguageContext";
import Footer from "./components/ui/Footer";

const cairo = Cairo({
  variable: "--font-cairo",
  subsets: ["arabic", "latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://samirmagdy.com"),
  icons: {
    icon: "/favicon.png",
  },
  title: "Samir Magdy | Web Developer",
  description:
    "Full-stack JavaScript developer based in Cairo, Egypt. Here you can view my projects, contact info, and more.",
  authors: { name: "Samir Magdy" },
  alternates: {
    canonical: "https://samirmagdy.com",
  },
  openGraph: {
    title: "Samir Magdy | Web Developer",
    description:
      "Full-stack JavaScript developer based in Cairo, Egypt. Here you can view my projects, contact info, and more.",
    url: "https://samirmagdy.com",
    siteName: "Samir Magdy Portfolio",
    images: [
      {
        url: "/open-graph.jpg",
        width: 1200,
        height: 630,
        alt: "Samir Magdy | Web Developer",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

const personSchema = {
  "@context": "https://schema.org",
  "@type": "ProfilePage",
  mainEntity: {
    "@type": "Person",
    name: "Samir Magdy",
    jobTitle: [
      "Full-Stack Developer",
      "Software Engineer",
      "Web Developer",
      "Programmer",
      "React Developer",
      "Node.js Developer",
      "JavaScript Developer",
    ],
    url: "https://samirmagdy.com",
    sameAs: [
      "https://www.linkedin.com/in/samirmagdy93",
    ],
    address: {
      "@type": "PostalAddress",
      addressLocality: "Cairo",
      addressCountry: "Egypt",
    },
    workLocation: {
      "@type": "Place",
      name: [
        "Cairo, Egypt",
        "Remote",
        "Worldwide",
        "Freelance",
        "Cairo",
        "Egypt",
      ],
    },
    nationality: {
      "@type": "Country",
      name: "Egypt",
    },
    knowsAbout: [
      "JavaScript",
      "TypeScript",
      "React",
      "Node.js",
      "MongoDB",
      "Express.js",
      "Next.js",
      "Web Development",
      "Full-Stack Development",
      "RESTful APIs",
      "SQL/NoSQL Databases",
      "TailwindCSS",
      "Git/GitHub",
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ar" dir="rtl">
      <head>
        <style
          dangerouslySetInnerHTML={{
            __html: `
              #page-loader {
                position: fixed;
                inset: 0;
                z-index: 9999;
                display: flex;
                align-items: center;
                justify-content: center;
                background: #000;
                transition: opacity 0.4s ease-out;
              }
              #page-loader.hide {
                opacity: 0;
                pointer-events: none;
              }
              #page-loader .spinner {
                width: 80px;
                height: 80px;
                border: 10px solid transparent;
                border-top-color: rgba(255, 255, 255, 0.8);
                border-radius: 50%;
                animation: spin 1s linear infinite, pulse 2s ease-in-out infinite;
              }
              @keyframes spin {
                to { transform: rotate(360deg); }
              }
              @keyframes pulse {
                0%, 100% { opacity: 1; }
                50% { opacity: 0.4; }
              }
            `,
          }}
        />
      </head>
      <body className={`${cairo.variable} font-cairo antialiased`}>
        <div id="page-loader" role="status" aria-label="Loading">
          <div className="spinner" />
        </div>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.addEventListener('load', function() {
                setTimeout(function() {
                  var loader = document.getElementById('page-loader');
                  if (loader) {
                    loader.classList.add('hide');
                    setTimeout(function() { loader.remove(); }, 75);
                  }
                }, 25);
              });
            `,
          }}
        />
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-[100] focus:px-4 focus:py-2 focus:bg-white focus:text-black focus:rounded-md focus:outline-2 focus:outline-offset-2 focus:outline-brand-accent"
        >
          Skip to main content
        </a>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
        />
        <LanguageProvider>
          <main id="main-content">{children}</main>
          <Footer />
          <Analytics />
        </LanguageProvider>
      </body>
    </html>
  );
}
