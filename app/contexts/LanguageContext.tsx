"use client";

import { createContext, useContext, useState, useEffect } from "react";
import type { Lang } from "@/app/data/translations";

interface LanguageContextType {
  lang: Lang;
  toggleLang: () => void;
}

const LanguageContext = createContext<LanguageContextType>({
  lang: "ar",
  toggleLang: () => {},
});

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLang] = useState<Lang>("ar");

  // Load saved preference on mount
  useEffect(() => {
    const saved = localStorage.getItem("lang") as Lang | null;
    if (saved === "en" || saved === "ar") {
      setLang(saved);
    }
  }, []);

  // Sync <html> dir and lang attributes whenever lang changes
  useEffect(() => {
    const html = document.documentElement;
    html.setAttribute("dir", lang === "ar" ? "rtl" : "ltr");
    html.setAttribute("lang", lang === "ar" ? "ar" : "en");
  }, [lang]);

  const toggleLang = () => {
    setLang((prev) => {
      const next = prev === "ar" ? "en" : "ar";
      localStorage.setItem("lang", next);
      return next;
    });
  };

  return (
    <LanguageContext.Provider value={{ lang, toggleLang }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  return useContext(LanguageContext);
}
