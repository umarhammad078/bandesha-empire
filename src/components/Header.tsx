"use client";

import { useEffect, useState } from "react";

const NAV_LINKS = [
  { label: "Services", href: "#services" },
  { label: "Process", href: "#process" },
  { label: "About", href: "#about" },
  { label: "Contact", href: "#contact" },
];

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  // Add a soft shadow + translucent backdrop once the page is scrolled.
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close the mobile menu on Escape.
  useEffect(() => {
    if (!menuOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMenuOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [menuOpen]);

  return (
    <header
      className={`sticky top-0 z-50 w-full border-b transition-shadow duration-300 ${
        scrolled
          ? "border-border bg-white/80 shadow-sm backdrop-blur"
          : "border-border bg-white"
      }`}
    >
      <div className="mx-auto flex h-16 w-full max-w-6xl items-center justify-between px-6">
        {/* Logo / wordmark */}
        <a
          href="/"
          className="flex items-center text-lg font-semibold tracking-tight text-foreground"
        >
          Bandesha Empire
          <span aria-hidden="true" className="ml-1 text-accent">
            •
          </span>
        </a>

        {/* Desktop navigation */}
        <nav
          aria-label="Main"
          className="hidden items-center gap-8 md:flex"
        >
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="group relative text-sm font-medium text-muted transition-colors hover:text-foreground"
            >
              {link.label}
              <span className="absolute -bottom-1 left-0 h-0.5 w-full origin-left scale-x-0 rounded-full bg-accent transition-transform duration-300 group-hover:scale-x-100 motion-reduce:transition-none" />
            </a>
          ))}
        </nav>

        {/* Desktop CTA */}
        <a
          href="#contact"
          className="hidden rounded-full bg-accent-dark px-4 py-2 text-sm font-medium text-white shadow-sm transition-colors hover:bg-accent md:inline-flex"
        >
          Start a Project
        </a>

        {/* Mobile menu toggle */}
        <button
          type="button"
          onClick={() => setMenuOpen((open) => !open)}
          className="inline-flex items-center justify-center rounded-md p-2 text-foreground transition-colors hover:bg-surface md:hidden"
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          aria-expanded={menuOpen}
          aria-controls="mobile-menu"
        >
          {menuOpen ? (
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <path d="M18 6 6 18" />
              <path d="m6 6 12 12" />
            </svg>
          ) : (
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <path d="M4 6h16" />
              <path d="M4 12h16" />
              <path d="M4 18h16" />
            </svg>
          )}
        </button>
      </div>

      {/* Mobile menu panel */}
      {menuOpen && (
        <div
          id="mobile-menu"
          className="border-t border-border bg-white shadow-sm md:hidden"
        >
          <nav
            aria-label="Mobile"
            className="mx-auto flex w-full max-w-6xl flex-col gap-1 px-6 py-4"
          >
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setMenuOpen(false)}
                className="rounded-md px-2 py-3 text-base font-medium text-foreground transition-colors hover:bg-surface"
              >
                {link.label}
              </a>
            ))}
            <a
              href="#contact"
              onClick={() => setMenuOpen(false)}
              className="mt-2 inline-flex items-center justify-center rounded-full bg-accent-dark px-4 py-3 text-base font-medium text-white shadow-sm transition-colors hover:bg-accent"
            >
              Start a Project
            </a>
          </nav>
        </div>
      )}
    </header>
  );
}
