"use client";

import { useEffect, useRef, useState } from "react";
import EmpireTower from "@/components/EmpireTower";

function revealStyle(delayMs: number) {
  return { "--reveal-delay": `${delayMs}ms` } as React.CSSProperties;
}

function TickIcon({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 16 16"
      width="14"
      height="14"
      fill="none"
      aria-hidden="true"
      className={className}
    >
      <path
        d="M3 8.5 6.2 11.5 13 4.5"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setInView(true);
            observer.disconnect();
          }
        });
      },
      { threshold: 0.2 },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="hero"
      aria-labelledby="hero-heading"
      className={`relative w-full overflow-hidden bg-background ${
        inView ? "hero-in-view" : ""
      }`}
    >
      <div className="relative mx-auto grid w-full max-w-[1400px] gap-14 px-6 py-12 md:grid-cols-[60fr_40fr] md:items-start md:gap-8 md:py-16 lg:grid-cols-[54fr_46fr] lg:gap-14 lg:py-20">
        {/* Faint full-width rule tying both columns into one composed scene */}
        <div
          aria-hidden="true"
          className="absolute inset-x-6 top-[7.5rem] hidden border-t border-border/70 md:block lg:top-[8.5rem]"
        />

        <div className="relative flex flex-col items-start text-left">
          <span
            className="hero-reveal inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.16em] text-accent-dark"
            style={revealStyle(0)}
          >
            <TickIcon />
            Digital Infrastructure for Ambitious Businesses
          </span>

          <h1
            id="hero-heading"
            className="mt-5 text-balance text-[clamp(2.1rem,1.1rem+3vw,3.75rem)] font-bold leading-[1.12] tracking-tight text-foreground"
          >
            <span className="hero-reveal" style={revealStyle(150)}>
              Build the digital infrastructure
            </span>{" "}
            <span className="hero-reveal" style={revealStyle(280)}>
              behind{" "}
              <span className="relative inline-block">
                <span className="relative z-10">your next empire</span>
                <span
                  aria-hidden="true"
                  className="hero-emphasis-sweep absolute inset-x-0 bottom-0.5 z-0 h-[0.32em] rounded-sm bg-accent-tint"
                />
              </span>
              .
            </span>
          </h1>

          <p
            className="hero-reveal mt-6 max-w-xl text-base leading-relaxed text-muted sm:text-lg"
            style={revealStyle(380)}
          >
            Bandesha Empire designs high-performance websites, intelligent
            automations and custom digital systems that make ambitious
            businesses easier to run, scale and improve.
          </p>

          <div
            className="hero-reveal mt-8 flex w-full flex-col gap-3 sm:w-auto sm:flex-row sm:items-center"
            style={revealStyle(480)}
          >
            <a
              href="#contact"
              className="inline-flex items-center justify-center rounded-lg bg-accent-deep px-6 py-3 text-sm font-medium text-white shadow-sm transition-colors hover:bg-accent-dark focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-dark focus-visible:ring-offset-2"
            >
              Start a Project
            </a>
            <a
              href="#services"
              className="inline-flex items-center justify-center rounded-lg border border-border px-6 py-3 text-sm font-medium text-foreground transition-colors hover:border-accent-dark hover:text-accent-dark focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-dark focus-visible:ring-offset-2"
            >
              Explore Our Services
            </a>
          </div>

          <div
            className="hero-reveal mt-9 flex items-center gap-2 text-xs font-medium uppercase tracking-[0.1em] text-muted sm:text-sm"
            style={revealStyle(580)}
          >
            <TickIcon className="text-accent-dark shrink-0" />
            <span>
              Clear communication. Purpose-built systems. Long-term thinking.
            </span>
          </div>
        </div>

        <div className="relative md:-mt-8 lg:-mt-12">
          <EmpireTower inView={inView} />
        </div>
      </div>
    </section>
  );
}
