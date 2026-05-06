import type { Metadata } from "next";
import "@/app/globals.css";

export const metadata: Metadata = {
  title: "Interactive React Blocks | Mockups | Sections",
  description: "Premium React UI blocks. Fully responsive & customizable. Drop the file in & add your data. That's it!",
  icons: {
    icon: [

      {
        url: "/favicon-light.svg",
        type: "image/svg+xml",
        sizes: "any",
      },
      {
        url: "/favicon-dark.svg",
        type: "image/svg+xml",
        sizes: "any",
        media: "(prefers-color-scheme: dark)",
      },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="antialiased">
      <body>{children}</body>
    </html>
  );
}
