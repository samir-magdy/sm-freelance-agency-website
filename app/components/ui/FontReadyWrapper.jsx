"use client";

import { useState, useEffect } from "react";

export default function FontReadyWrapper({ children, className, ...props }) {
  const [isReady, setIsReady] = useState(true);

  useEffect(() => {
    // Only wait for Cairo to be available for hero-relevant characters
    // (satisfied instantly by the inline base64 micro-subset).
    // Using .load() instead of .ready avoids waiting for ALL page fonts.
    const lang = document.documentElement.lang;
    const probe = lang === "ar" ? "صمم موقع" : "Design Smart";
    document.fonts.load(`700 1em "Cairo Hero"`, probe).then(() => setIsReady(true));
  }, []);

  return (
    <section className={`${className}${isReady ? " is-ready" : ""}`} {...props}>
      {children}
    </section>
  );
}
