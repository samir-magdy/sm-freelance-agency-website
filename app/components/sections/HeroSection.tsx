"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { useLanguage } from "@/app/contexts/LanguageContext";
import translations from "@/app/data/translations";
import LanguageToggle from "../ui/LanguageToggle";

export default function HeroSection() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { lang } = useLanguage();
  const t = translations;

  const handleSmoothScroll = (
    e: React.MouseEvent<HTMLAnchorElement>,
    targetId: string,
  ) => {
    e.preventDefault();
    setIsMenuOpen(false);

    const isDesktop = window.innerWidth >= 768;

    // Mobile: keep exact current behavior
    if (!isDesktop) {
      const element = document.querySelector(targetId);
      if (element) {
        element.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }
      return;
    }

    // Desktop: account for fixed navbar height
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
    <div className="animate-fade-in">
      <header>
        {/* Fixed Top Navbar for Desktop */}
        <nav className="hidden md:flex fixed top-0 left-0 right-0 z-50 items-center justify-between px-10 h-14 border-b border-border-strong backdrop-blur-3xl transition-all duration-300">
          <div className="flex-1" />
          <div className="flex gap-10 lg:gap-16 items-center">
            <a
              href="#"
              onClick={(e) => handleSmoothScroll(e, "#home")}
              className="nav-link-elegant text-md font-medium tracking-wider text-content-body hover:text-content-heading transition-colors duration-300"
            >
              {t.nav.home[lang]}
            </a>
            <a
              href="#portfolio"
              onClick={(e) => handleSmoothScroll(e, "#portfolio")}
              className="nav-link-elegant text-md font-medium tracking-wider text-content-body hover:text-content-heading transition-colors duration-300"
            >
              {t.nav.projects[lang]}
            </a>
            <a
              href="#how-it-works"
              onClick={(e) => handleSmoothScroll(e, "#how-it-works")}
              className="nav-link-elegant text-md font-medium tracking-wider text-content-body hover:text-content-heading transition-colors duration-300"
            >
              {t.nav.howItWorks[lang]}
            </a>
            <a
              href="#faq"
              onClick={(e) => handleSmoothScroll(e, "#faq")}
              className="nav-link-elegant text-md font-medium tracking-wider text-content-body hover:text-content-heading transition-colors duration-300"
            >
              {t.nav.faq[lang]}
            </a>
            <a
              href="#contact"
              onClick={(e) => handleSmoothScroll(e, "#contact")}
              className="nav-link-elegant text-md font-medium tracking-wider text-content-body hover:text-content-heading transition-colors duration-300"
            >
              {t.nav.contact[lang]}
            </a>
          </div>
          <div className="flex-1 flex justify-end">
            <LanguageToggle />
          </div>
        </nav>

        {/* Mobile Hamburger Menu */}
        <nav
          className={`
          md:hidden
          fixed top-0 left-0 right-0 z-50
          transition-all duration-300 p-5
          ${isMenuOpen ? "bg-transparent border-b border-transparent" : "border-b border-border-strong backdrop-blur-xl"}`}
        >
          <div className="flex justify-end items-center" dir="ltr">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="block"
              aria-label={
                isMenuOpen ? t.a11y.closeMenu[lang] : t.a11y.openMenu[lang]
              }
              aria-expanded={isMenuOpen}
              aria-controls="mobile-menu"
            >
              <div className="w-7 flex flex-col gap-1.5">
                <span
                  className={`block h-0.5 bg-content-heading transition-transform duration-300 ${
                    isMenuOpen ? "rotate-45 translate-y-[8px]" : ""
                  }`}
                />
                <span
                  className={`block h-0.5 bg-content-heading transition-all duration-300 ${
                    isMenuOpen ? "opacity-0 scale-0" : ""
                  }`}
                />
                <span
                  className={`block h-0.5 bg-content-heading transition-transform duration-300 ${
                    isMenuOpen ? "-rotate-45 -translate-y-[8px]" : ""
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
              role="navigation"
              aria-label={t.a11y.mobileNav[lang]}
              onClick={() => setIsMenuOpen(false)}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="md:hidden fixed inset-0 flex flex-col items-center justify-center gap-8 bg-background z-40"
            >
              <a
                href="#home"
                onClick={(e) => handleSmoothScroll(e, "#home")}
                className="nav-link-elegant text-content-body hover:text-content-heading text-subheading tracking-wide transition-colors duration-300 focus:outline-2 focus:outline-offset-4 focus:outline-brand-accent rounded-sm"
              >
                {t.nav.home[lang]}
              </a>
              <a
                href="#portfolio"
                onClick={(e) => handleSmoothScroll(e, "#portfolio")}
                className="nav-link-elegant text-content-body hover:text-content-heading text-subheading tracking-wide transition-colors duration-300 focus:outline-2 focus:outline-offset-4 focus:outline-brand-accent rounded-sm"
              >
                {t.nav.projects[lang]}
              </a>
              <a
                href="#how-it-works"
                onClick={(e) => handleSmoothScroll(e, "#how-it-works")}
                className="nav-link-elegant text-content-body hover:text-content-heading text-subheading tracking-wide transition-colors duration-300 focus:outline-2 focus:outline-offset-4 focus:outline-brand-accent rounded-sm"
              >
                {t.nav.howItWorks[lang]}
              </a>
              <a
                href="#faq"
                onClick={(e) => handleSmoothScroll(e, "#faq")}
                className="nav-link-elegant text-content-body hover:text-content-heading text-subheading tracking-wide transition-colors duration-300 focus:outline-2 focus:outline-offset-4 focus:outline-brand-accent rounded-sm"
              >
                {t.nav.faq[lang]}
              </a>
              <a
                href="#contact"
                onClick={(e) => handleSmoothScroll(e, "#contact")}
                className="nav-link-elegant text-content-body hover:text-content-heading text-subheading tracking-wide transition-colors duration-300 focus:outline-2 focus:outline-offset-4 focus:outline-brand-accent rounded-sm"
              >
                {t.nav.contact[lang]}
              </a>
              <div onClick={(e) => e.stopPropagation()}>
                <LanguageToggle />
              </div>
            </motion.nav>
          )}
        </AnimatePresence>
      </header>

      <section
        id="home"
        className="h-screen flex items-center justify-center relative"
      >
        {/* Dot grid + radial glow background */}
        <div className="hero-grid" aria-hidden="true" />
        <div className="hero-glow" aria-hidden="true" />

        <div className="relative z-10 flex flex-col items-center px-5">
          <h1
            className="font-bold text-center text-content-heading mb-3 md:mb-5"
            style={{
              fontSize: "clamp(2.25rem, 10vw, 6rem)",
            }}
          >
            {t.hero.name[lang]}
          </h1>
          <p
            className="text-center text-content-body md:max-w-3xl mb-8 md:mb-10"
            style={{ fontSize: "clamp(1.5rem, 4vw, 2.5rem)" }}
          >
            {t.hero.subtitle[lang]}
          </p>
          <div className="flex items-center gap-4 md:gap-5">
            <a
              href="https://wa.me/201211221277?text=Hello%20Samir%2C%20I%20would%20like%20to%20inquire%20about%20getting%20a%20professional%20website%20for%20my%20business."
              target="_blank"
              rel="noopener noreferrer"
              className="whatsapp-float inline-flex items-center justify-center gap-2 md:px-6 md:py-3 bg-whatsapp hover:bg-whatsapp-hover text-content-heading hover:text-content-heading font-semibold text-base md:text-subheading rounded-full transition-colors duration-1000"
            >
              <svg
                viewBox="0 0 24 24"
                fill="currentColor"
                className="w-8 h-8 md:w-5 md:h-5"
                aria-hidden="true"
              >
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
              </svg>
              <span className="hidden md:inline">{t.hero.cta[lang]}</span>
            </a>

            <a
              href="#portfolio"
              onClick={(e) => handleSmoothScroll(e, "#portfolio")}
              className="bg-white/95 hover:bg-white text-gray-900 font-semibold px-8 py-3 rounded-full transition-all duration-600 shadow-sm shadow-white/20 hover:shadow-md hover:shadow-white/30 text-xl md:text-2xl"
            >
              {t.hero.secondaryCta[lang]}
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
