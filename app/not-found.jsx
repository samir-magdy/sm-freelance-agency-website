import Link from "next/link";
import Image from "next/image";
import { Cairo } from "next/font/google";
import "../app/globals.css";

const cairo = Cairo({
  variable: "--font-cairo",
  subsets: ["arabic", "latin"],
  display: "block",
});

export default function NotFound() {
  return (
    <html lang="en" dir="ltr">
      <body className={`${cairo.variable} font-cairo antialiased bg-background text-content-heading min-h-screen flex items-center justify-center`}>
        <div className="text-center space-y-8 px-4">
          <h1 className="text-6xl font-bold text-content-heading">Page Not Found</h1>
          <p className="text-2xl text-content-body">
            Seems like you&apos;ve gotten yourself lost.
          </p>
          <Link
            href="/en"
            className="inline-block bg-linear-to-b from-gold to-gold-dark text-gray-900 font-semibold px-8 py-3 rounded-xl sm:text-xl"
          >
            Back to the studio
          </Link>
        </div>
      </body>
    </html>
  );
}
