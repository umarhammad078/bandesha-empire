"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import BrandMark from "@/components/BrandMark";

const NAV_LINKS = [
  { label: "Home", href: "/#hero", pathname: "/" },
  { label: "Services", href: "/services", pathname: "/services" },
  { label: "Portfolio", href: "/portfolio", pathname: "/portfolio" },
  { label: "Pricing", href: "/pricing", pathname: "/pricing" },
  { label: "About Us", href: "/about", pathname: "/about" },
] as const;

export default function Header() {
  const pathname = usePathname();
  const projectHref =
    pathname === "/services" || pathname === "/pricing" || pathname === "/portfolio"
      ? `${pathname}#start-project`
      : "/#contact";
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    let frame = 0;

    const updateHeader = () => {
      setScrolled(window.scrollY > 18);
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
  }, [pathname]);

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
        <Link
          href="/#hero"
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
        </Link>

        <nav aria-label="Main navigation" className="site-header-nav">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              aria-current={
                pathname === link.pathname ? "page" : undefined
              }
              className={`site-header-link ${
                pathname === link.pathname
                  ? "site-header-link-active"
                  : ""
              }`}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <Link
          href={projectHref}
          className="site-header-cta"
        >
          <span>Start a project</span>
          <i aria-hidden="true">
            <svg viewBox="0 0 16 16">
              <path d="M3.5 8h9M9 4.5 12.5 8 9 11.5" />
            </svg>
          </i>
        </Link>

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
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMenuOpen(false)}
                aria-current={
                  pathname === link.pathname ? "page" : undefined
                }
                className={
                  pathname === link.pathname ? "is-active" : ""
                }
              >
                <span>{link.label}</span>
                <small>{String(NAV_LINKS.indexOf(link) + 1).padStart(2, "0")}</small>
              </Link>
            ))}
            <Link
              href={projectHref}
              onClick={() => setMenuOpen(false)}
              className="site-header-mobile-cta"
            >
              Start a project
              <span aria-hidden="true">↗</span>
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
