import Link from "next/link";
import { Cairo } from "next/font/google";
import "./styles/globals.css";

const cairo = Cairo({
  variable: "--font-cairo",
  subsets: ["arabic", "latin"],
  display: "block",
});

export default function NotFound() {
  return (
    <html lang="en" dir="ltr">
      <body className={`${cairo.variable} font-cairo antialiased bg-background text-content-heading min-h-screen flex items-center justify-center`}>
          <img src="/brand.svg" className="absolute top-20 w-52" alt="" />
        <div className="text-center space-y-6 px-4">
          <h1 className="text-8xl font-bold text-content-heading">404</h1>
          <p className="text-2xl text-content-body">
            Seems you&apos;ve gotten yourself lost.
          </p>
          <Link
            href="/en"
            className="inline-block bg-gradient-to-b from-gold to-gold-dark text-gray-900 font-semibold px-8 py-3 rounded-xl"
          >
            Back to the studio
          </Link>
        </div>
      </body>
    </html>
  );
}
