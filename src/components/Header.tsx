"use client";

import { useEffect, useState } from "react";
import BrandMark from "@/components/BrandMark";

const NAV_LINKS = [
  { label: "Home", href: "#hero", sectionId: "hero" },
  { label: "Services", href: "#services", sectionId: "services" },
  { label: "Portfolio", href: "#portfolio", sectionId: "portfolio" },
  { label: "Pricing", href: "#pricing", sectionId: "pricing" },
  { label: "About", href: "#about", sectionId: "about" },
] as const;

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("hero");

  useEffect(() => {
    let frame = 0;

    const updateHeader = () => {
      setScrolled(window.scrollY > 18);

      const marker = window.scrollY + window.innerHeight * 0.34;
      const visibleSections: Array<{ id: string; top: number }> = [];

      NAV_LINKS.forEach((link) => {
        const element = document.getElementById(link.sectionId);
        if (element) {
          visibleSections.push({
            id: link.sectionId,
            top: element.offsetTop,
          });
        }
      });

      visibleSections.sort((first, second) => first.top - second.top);

      const current = visibleSections.reduce(
        (section, entry) => (entry.top <= marker ? entry.id : section),
        "hero",
      );
      setActiveSection(current);
    };

    const onScroll = () => {
      window.cancelAnimationFrame(frame);
      frame = window.requestAnimationFrame(updateHeader);
    };

    updateHeader();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);

    return () => {
      window.cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  useEffect(() => {
    if (!menuOpen) return;

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMenuOpen(false);
    };

    const onResize = () => {
      if (window.innerWidth >= 900) setMenuOpen(false);
    };

    window.addEventListener("keydown", onKey);
    window.addEventListener("resize", onResize);

    return () => {
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("resize", onResize);
    };
  }, [menuOpen]);

  return (
    <header
      className={`site-header ${scrolled ? "site-header-scrolled" : ""}`}
    >
      <div className="site-header-shell">
        <a
          href="#hero"
          aria-label="Bandesha Empire — home"
          className="site-header-brand"
          onClick={() => setMenuOpen(false)}
        >
          <span className="site-header-mark">
            <BrandMark className="h-full w-full" />
          </span>
          <span className="site-header-wordmark">
            <strong>Bandesha Empire</strong>
            <small>Digital systems studio</small>
          </span>
        </a>

        <nav aria-label="Main navigation" className="site-header-nav">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              aria-current={
                activeSection === link.sectionId ? "page" : undefined
              }
              className={`site-header-link ${
                activeSection === link.sectionId
                  ? "site-header-link-active"
                  : ""
              }`}
            >
              {link.label}
            </a>
          ))}
        </nav>

        <a
          href="#contact"
          className="site-header-cta"
        >
          <span>Start a project</span>
          <i aria-hidden="true">
            <svg viewBox="0 0 16 16">
              <path d="M3.5 8h9M9 4.5 12.5 8 9 11.5" />
            </svg>
          </i>
        </a>

        <button
          type="button"
          onClick={() => setMenuOpen((open) => !open)}
          className={`site-header-menu-button ${
            menuOpen ? "site-header-menu-button-open" : ""
          }`}
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          aria-expanded={menuOpen}
          aria-controls="mobile-menu"
        >
          <span />
          <span />
        </button>
      </div>

      {menuOpen && (
        <div id="mobile-menu" className="site-header-mobile-panel">
          <nav aria-label="Mobile navigation">
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setMenuOpen(false)}
                aria-current={
                  activeSection === link.sectionId ? "page" : undefined
                }
                className={
                  activeSection === link.sectionId ? "is-active" : ""
                }
              >
                <span>{link.label}</span>
                <small>{String(NAV_LINKS.indexOf(link) + 1).padStart(2, "0")}</small>
              </a>
            ))}
            <a
              href="#contact"
              onClick={() => setMenuOpen(false)}
              className="site-header-mobile-cta"
            >
              Start a project
              <span aria-hidden="true">↗</span>
            </a>
          </nav>
        </div>
      )}
    </header>
  );
}
