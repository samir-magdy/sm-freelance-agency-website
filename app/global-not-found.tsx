import type { Metadata } from "next";
import { SITE_NAME } from "./constants";
import NotFoundContent from "./components/NotFoundContent";

export const metadata: Metadata = {
  title: `Page Not Found | ${SITE_NAME}`,
  icons: {
    icon: [
      { url: "/favicon-light.svg", type: "image/svg+xml", sizes: "any" },
      {
        url: "/favicon-dark.svg",
        type: "image/svg+xml",
        sizes: "any",
        media: "(prefers-color-scheme: dark)",
      },
      { url: "/favicon.png", type: "image/png", sizes: "96x96" },
      { url: "/favicon.ico", type: "image/x-icon", sizes: "48x48" },
    ],
  },
};

export default function GlobalNotFound() {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <NotFoundContent />
      </body>
    </html>
  );
}
