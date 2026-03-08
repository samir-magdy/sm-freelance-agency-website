"use client";

import { useState, useEffect } from "react";
import { AnimatePresence, motion } from "motion/react";
import Image from "next/image";
import translations from "@/app/data/translations";
import type { Lang } from "@/app/data/translations";
import LanguageToggle from "./LanguageToggle";
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
      <nav className="ps-12 hidden xl:flex fixed top-0 left-0 right-0 z-50 items-center justify-center h-16 backdrop-blur-3xl">
        <a
          href="#home"
          onClick={(e) => handleSmoothScroll(e, "#home")}
          aria-label="Samir Magdy - Home"
          className="absolute start-3"
        >
          <Image
            src="/logo-dark.png"
            alt="SM WEB STUDIO LOGO"
            width={180}
            height={30}
            priority
          />
        </a>
        <ul className="flex w-1/2 justify-around">
          <li>
            <a
              href="#services"
              onClick={(e) => handleSmoothScroll(e, "#services")}
              className="nav-link-underline text-base font-medium tracking-wider text-content-body hover:text-content-heading focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold-light rounded-sm transition-colors duration-300"
            >
              {t.nav.services[lang]}
            </a>
          </li>
          <li>
            <a
              href="#add-ons"
              className="nav-link-underline text-base font-medium tracking-wider text-content-body hover:text-content-heading focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold-light rounded-sm transition-colors duration-300"
            >
              {t.nav.addOns[lang]}
            </a>
          </li>
          <li>
            <a
              href="#portfolio"
              className="nav-link-underline text-base font-medium tracking-wider text-content-body hover:text-content-heading focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold-light rounded-sm transition-colors duration-300"
            >
              {t.nav.projects[lang]}
            </a>
          </li>
          <li>
            <a
              href="#how-it-works"
              className="nav-link-underline text-base font-medium tracking-wider text-content-body hover:text-content-heading focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold-light rounded-sm transition-colors duration-300"
            >
              {t.nav.howItWorks[lang]}
            </a>
          </li>
          <li>
            <a
              href="#faq"
              className="nav-link-underline text-base font-medium tracking-wider text-content-body hover:text-content-heading focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold-light rounded-sm transition-colors duration-300"
            >
              {t.nav.faq[lang]}
            </a>
          </li>
          <li>
            <a
              href="#contact"
              className="nav-link-underline text-base font-medium tracking-wider text-content-body hover:text-content-heading focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold-light rounded-sm transition-colors duration-300"
            >
              {t.nav.contact[lang]}
            </a>
          </li>
        </ul>
        <div className="absolute end-4">
          <LanguageToggle lang={lang} />
        </div>
      </nav>

      {/* Mobile Hamburger Nav */}
      <nav
        className={`
          xl:hidden
          fixed top-0 left-0 right-0 z-50
          transition-all duration-[250ms] py-0.5 pl-1 pr-6
          ${isMenuOpen ? "bg-transparent" : "bg-background/70 backdrop-blur-lg"}`}
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
              width={130}
              height={24}
              priority
              className="bg-transparent h-auto"
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
            <div className="w-6 flex flex-col gap-0.5">
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
            className="2xl:hidden fixed inset-0 flex flex-col items-center justify-center bg-background z-40"
          >

            <ul className="flex flex-col items-center gap-3">
              
              <li>
                <a
                  href="#services"
                  className="font-semibold text-content-body text-[1.75rem] tracking-wide focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold-light rounded-sm"
                >
                  {t.nav.services[lang]}
                </a>
              </li>
              <li>
                <a
                  href="#add-ons"
                  className="font-semibold text-content-body text-[1.75rem] tracking-wide focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold-light rounded-sm"
                >
                  {t.nav.addOns[lang]}
                </a>
              </li>
              <li>
                <a
                  href="#portfolio"
                  className="font-semibold text-content-body text-[1.75rem] tracking-wide focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold-light rounded-sm"
                >
                  {t.nav.projects[lang]}
                </a>
              </li>
              <li>
                <a
                  href="#how-it-works"
                  className="font-semibold text-content-body text-[1.75rem] tracking-wide focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold-light rounded-sm"
                >
                  {t.nav.howItWorks[lang]}
                </a>
              </li>
              <li>
                <a
                  href="#faq"
                  className="font-semibold text-content-body text-[1.75rem] tracking-wide focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold-light rounded-sm"
                >
                  {t.nav.faq[lang]}
                </a>
              </li>
              <li>
                <a
                  href="#contact"
                  className="font-semibold text-content-body text-[1.75rem] tracking-wide focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold-light rounded-sm"
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
