"use client";

import { createContext, useContext, useLayoutEffect, useState } from "react";

type Theme = "dark" | "light";

const ThemeContext = createContext<{
  theme: Theme;
  toggle: () => void;
}>({ theme: "dark", toggle: () => {} });

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<Theme>("dark");

  // Initialise from localStorage once on mount (localStorage is the source of truth)
  useLayoutEffect(() => {
    if (localStorage.getItem("theme") === "light") setTheme("light");
  }, []);

  // Re-apply class after EVERY render — no deps array is intentional.
  // React strips imperatively-added classes from <html> when it reconciles
  // the server-rendered layout on language navigation. This effect re-asserts
  // the correct class before the browser repaints.
  useLayoutEffect(() => {
    document.documentElement.classList.toggle("dark", theme === "dark");
  });

  const toggle = () => {
    const next: Theme = theme === "dark" ? "light" : "dark";
    setTheme(next);
    localStorage.setItem("theme", next);
  };

  return (
    <ThemeContext.Provider value={{ theme, toggle }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  return useContext(ThemeContext);
}
