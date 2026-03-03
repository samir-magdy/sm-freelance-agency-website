"use client";

import { useState, useEffect } from "react";
import { AnimatePresence, motion } from "motion/react";
import Image from "next/image";
import translations from "@/app/data/translations";
import type { Lang } from "@/app/data/translations";
import LanguageToggle from "./LanguageToggle";
import ThemeToggle from "./ThemeToggle";
import SocialIcons from "./SocialIcons";

export default function HeroNav({ lang }: { lang: Lang }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const t = translations;

  useEffect(() => {
    document.body.style.overflow = isMenuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isMenuOpen]);

  const handleSmoothScroll = (
    e: React.MouseEvent<HTMLAnchorElement>,
    targetId: string,
  ) => {
    e.preventDefault();
    setIsMenuOpen(false);

    const isDesktop = window.innerWidth >= 768;

    if (!isDesktop) {
      const element = document.querySelector(targetId);
      if (element) {
        element.scrollIntoView({ behavior: "smooth", block: "start" });
      }
      return;
    }

    const navbarOffset = -30;
    const element = document.querySelector(targetId);
    if (element) {
      const elementPosition =
        element.getBoundingClientRect().top + window.scrollY;
      window.scrollTo({
        top: elementPosition - navbarOffset,
        behavior: "smooth",
      });
    }
  };

  return (
    <header>
      {/* Fixed Top Navbar for Desktop */}
      <nav className="dark:shadow-sky-100/5 shadow-lg hidden md:flex fixed top-0 left-0 right-0 z-50 items-center justify-between px-4 ps-3 h-14 border-b border-border-strong bg-background">
        <a
          href="#home"
          onClick={(e) => handleSmoothScroll(e, "#home")}
          className="flex-1"
          aria-label="Samir Magdy - Home"
        >
          <Image
            src="/logo-dark.png"
            alt="SM WEB STUDIO LOGO"
            width={180}
            height={39}
            priority
            className="hidden dark:block h-auto"
          />
          <Image
            src="/logo-light.png"
            alt="SM WEB STUDIO LOGO"
            width={180}
            height={39}
            priority
            className="block dark:hidden h-auto"
          />
        </a>
        <ul className="flex gap-10 lg:gap-16 items-center">
          <li>
            <a
              href="#home"
              onClick={(e) => handleSmoothScroll(e, "#home")}
              className="text-base font-medium tracking-wider text-content-body hover:text-content-heading transition-colors duration-300"
            >
              {t.nav.home[lang]}
            </a>
          </li>
          <li>
            <a
              href="#services"
              onClick={(e) => handleSmoothScroll(e, "#services")}
              className="text-base font-medium tracking-wider text-content-body hover:text-content-heading transition-colors duration-300"
            >
              {lang === "en" ? "Services" : "الخدمات"}
            </a>
          </li>
          <li>
            <a
              href="#portfolio"
              className="text-base font-medium tracking-wider text-content-body hover:text-content-heading transition-colors duration-300"
            >
              {t.nav.projects[lang]}
            </a>
          </li>
          <li>
            <a
              href="#how-it-works"
              className="text-base font-medium tracking-wider text-content-body hover:text-content-heading transition-colors duration-300"
            >
              {t.nav.howItWorks[lang]}
            </a>
          </li>
          <li>
            <a
              href="#faq"
              className="text-base font-medium tracking-wider text-content-body hover:text-content-heading transition-colors duration-300"
            >
              {t.nav.faq[lang]}
            </a>
          </li>
          <li>
            <a
              href="#contact"
              className="text-base font-medium tracking-wider text-content-body hover:text-content-heading transition-colors duration-300"
            >
              {t.nav.contact[lang]}
            </a>
          </li>
        </ul>
        <div className="flex-1 flex justify-end items-center gap-2">
          <ThemeToggle />
          <LanguageToggle lang={lang} />
        </div>
      </nav>

      {/* Mobile Hamburger Nav */}
      <nav
        className={`
          md:hidden
          fixed top-0 left-0 right-0 z-50
          transition-[border-color,box-shadow] duration-300 py-1 pl-1 pr-5
          ${isMenuOpen ? "bg-transparent border-b border-transparent" : "border-b border-border-subtle bg-background dark:bg-background/70 dark:backdrop-blur-md shadow-lg"}`}
      >
        <div className="flex justify-between items-center" dir="ltr">
          <a
            href="#home"
            onClick={(e) => handleSmoothScroll(e, "#home")}
            aria-label="Samir Magdy - Home"
          >
            <Image
              src="/logo-dark.png"
              alt="SM WEB STUDIO LOGO"
              width={110}
              height={24}
              priority
              className="hidden dark:block bg-transparent h-auto"
            />
            <Image
              src="/logo-light.png"
              alt="SM WEB STUDIO LOGO"
              width={110}
              height={24}
              priority
              className="block dark:hidden bg-transparent h-auto"
            />
          </a>
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="block px-4 py-4 -mr-5"
            aria-label={
              isMenuOpen ? t.a11y.closeMenu[lang] : t.a11y.openMenu[lang]
            }
            aria-expanded={isMenuOpen}
            aria-controls="mobile-menu"
          >
            <div className="w-5 flex flex-col gap-0.5">
              <span
                className={`block h-0.5 bg-content-heading transition-transform duration-300 ${
                  isMenuOpen ? "rotate-45 translate-y-[4px]" : ""
                }`}
              />
              <span
                className={`block h-0.5 bg-content-heading transition-all duration-300 ${
                  isMenuOpen ? "opacity-0 scale-0" : ""
                }`}
              />
              <span
                className={`block h-0.5 bg-content-heading transition-transform duration-300 ${
                  isMenuOpen ? "-rotate-45 -translate-y-[4px]" : ""
                }`}
              />
            </div>
          </button>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.nav
            id="mobile-menu"
            aria-label={t.a11y.mobileNav[lang]}
            onClick={() => setIsMenuOpen(false)}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="md:hidden fixed inset-0 flex flex-col items-center justify-center bg-background z-40"
          >

              <div
              onClick={(e) => e.stopPropagation()}
              className="flex flex-col items-center gap-4 absolute top-24"
            >
              <ThemeToggle />
            </div>
            <ul className="flex flex-col items-center gap-3">
              
              <li>
                <a
                  href="#home"
                  className="font-semibold text-content-body text-[1.75rem] tracking-wide"
                >
                  {t.nav.home[lang]}
                </a>
              </li>
              <li>
                <a
                  href="#services"
                  className="font-semibold text-content-body text-[1.75rem] tracking-wide"
                >
                  {lang === "en" ? "Services" : "الخدمات"}
                </a>
              </li>
              <li>
                <a
                  href="#portfolio"
                  className="font-semibold text-content-body text-[1.75rem] tracking-wide"
                >
                  {t.nav.projects[lang]}
                </a>
              </li>
              <li>
                <a
                  href="#how-it-works"
                  className="font-semibold text-content-body text-[1.75rem] tracking-wide"
                >
                  {t.nav.howItWorks[lang]}
                </a>
              </li>
              <li>
                <a
                  href="#faq"
                  className="font-semibold text-content-body text-[1.75rem] tracking-wide"
                >
                  {t.nav.faq[lang]}
                </a>
              </li>
              <li>
                <a
                  href="#contact"
                  className="font-semibold text-content-body text-[1.75rem] tracking-wide"
                >
                  {t.nav.contact[lang]}
                </a>
              </li>
             
            </ul>
          <div className="flex flex-col absolute bottom-16 items-center gap-8">
              <LanguageToggle lang={lang} />
            <SocialIcons />
             
            
              </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}
