"use client";

import { useState, useEffect, useRef, useCallback } from "react";

export default function FloatingWhatsApp() {
  const [hidden, setHidden] = useState(false);
  const [animDone, setAnimDone] = useState(false);
  const ref = useRef(null);

  const handleAnimationEnd = useCallback(() => setAnimDone(true), []);

  useEffect(() => {
    const contact = document.getElementById("contact");
    if (!contact) return;

    const observer = new IntersectionObserver(
      ([entry]) => setHidden(entry.isIntersecting),
      { threshold: 0 }
    );

    observer.observe(contact);
    return () => observer.disconnect();
  }, []);

  return (
    <a
      ref={ref}
      href="https://wa.me/201274613331"
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat on WhatsApp"
      onAnimationEnd={handleAnimationEnd}
      className={`${animDone ? "" : "hero-fade hero-fade-whatsapp"} fixed bottom-3 right-3 sm:bottom-6 sm:right-6 rtl:right-auto rtl:left-3 z-[5] size-14 rounded-full shadow-lg transition-[transform,opacity] duration-300 hover:scale-110 ${
        hidden
          ? "opacity-0 translate-y-4 pointer-events-none md:opacity-100 md:translate-y-0 md:pointer-events-auto"
          : "opacity-100 translate-y-0"
      }`}
    >
      <img
        src="/whatsapp.svg"
        alt="Whatsapp Contact Widget"
        className="w-10 h-10"
      />
    </a>
  );
}
