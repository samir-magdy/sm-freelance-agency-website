import type { Metadata } from "next";
import "@/app/globals.css";
import { SITE_URL, SITE_NAME } from "@/app/constants";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: `Drop-in React Blocks | ${SITE_NAME}`,
  description:
    "Production-ready, interactive React UI blocks — iOS mockup, browser mockup, and scroll timeline. Fully responsive, zero extra dependencies. Copy the component, drop it in.",
  icons: {
    icon: [
      { url: "/favicon.png", type: "image/png", sizes: "96x96" },
      { url: "/favicon.ico", type: "image/x-icon", sizes: "48x48" },
      { url: "/favicon-light.svg", type: "image/svg+xml", sizes: "any" },
      {
        url: "/favicon-dark.svg",
        type: "image/svg+xml",
        sizes: "any",
        media: "(prefers-color-scheme: dark)",
      },
    ],
    apple: [{ url: "/apple-icon.png", sizes: "180x180", type: "image/png" }],
  },
  openGraph: {
    siteName: SITE_NAME,
    type: "website",
    title: `Drop-in React Blocks | ${SITE_NAME}`,
    description:
      "Production-ready, interactive React UI blocks — iOS mockup, browser mockup, and scroll timeline.",
    images: [
      {
        url: "/open-graph.png",
        width: 1200,
        height: 630,
        alt: `${SITE_NAME} - Drop-in React Blocks`,
      },
    ],
  },
};

export default function DropInReactBlocksLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="antialiased">{children}</body>
    </html>
  );
}
