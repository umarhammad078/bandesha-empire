"use client";

import Reveal from "@/components/Reveal";
import { PROJECTS } from "@/data/projects";
import Image from "next/image";
import Link from "next/link";
import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type CSSProperties,
  type KeyboardEvent,
} from "react";

function revealStyle(delay: number): CSSProperties {
  return { "--reveal-delay": `${delay}ms` } as CSSProperties;
}

function ArrowIcon({ direction = "right" }: { direction?: "left" | "right" }) {
  return (
    <svg
      viewBox="0 0 20 20"
      aria-hidden="true"
      className={direction === "left" ? "is-left" : undefined}
    >
      <path d="M3.5 10h13M11.5 5l5 5-5 5" />
    </svg>
  );
}

export default function PostSliderSection() {
  const railRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<Array<HTMLElement | null>>([]);
  const scrollSettleRef = useRef<number | null>(null);
  const targetIndexRef = useRef(0);
  const [active, setActive] = useState(0);
  const [reducedMotion, setReducedMotion] = useState(false);

  const syncActiveFromScroll = useCallback(() => {
    const rail = railRef.current;
    if (!rail) return;

    let closestIndex = 0;
    let closestDistance = Number.POSITIVE_INFINITY;

    cardRefs.current.forEach((card, index) => {
      if (!card) return;
      const distance = Math.abs(card.offsetLeft - rail.scrollLeft);
      if (distance < closestDistance) {
        closestDistance = distance;
        closestIndex = index;
      }
    });

    targetIndexRef.current = closestIndex;
    setActive(closestIndex);
  }, []);

  const goTo = useCallback(
    (requestedIndex: number, behavior: ScrollBehavior = "smooth") => {
      const nextIndex = (requestedIndex + PROJECTS.length) % PROJECTS.length;
      const rail = railRef.current;
      const card = cardRefs.current[nextIndex];
      const wrapped = requestedIndex < 0 || requestedIndex >= PROJECTS.length;
      targetIndexRef.current = nextIndex;

      if (rail && card) {
        rail.scrollTo({
          left: card.offsetLeft,
          behavior: reducedMotion || wrapped ? "auto" : behavior,
        });
      }
    },
    [reducedMotion],
  );

  useEffect(() => {
    const query = window.matchMedia("(prefers-reduced-motion: reduce)");
    const updatePreference = () => setReducedMotion(query.matches);
    updatePreference();
    query.addEventListener("change", updatePreference);
    return () => query.removeEventListener("change", updatePreference);
  }, []);

  useEffect(
    () => () => {
      if (scrollSettleRef.current !== null) {
        window.clearTimeout(scrollSettleRef.current);
      }
    },
    [],
  );

  function updateActiveFromScroll() {
    if (scrollSettleRef.current !== null) {
      window.clearTimeout(scrollSettleRef.current);
    }

    scrollSettleRef.current = window.setTimeout(() => {
      syncActiveFromScroll();
      scrollSettleRef.current = null;
    }, 160);
  }

  function handleKeyDown(event: KeyboardEvent<HTMLDivElement>) {
    if (event.key === "ArrowRight") {
      event.preventDefault();
      goTo(targetIndexRef.current + 1);
    }

    if (event.key === "ArrowLeft") {
      event.preventDefault();
      goTo(targetIndexRef.current - 1);
    }
  }

  return (
    <section
      id="portfolio"
      aria-labelledby="post-slider-heading"
      className="post5-section"
    >
      <div className="post5-wrap">
        <Reveal threshold={0.08}>
          <header className="post5-index-bar rv" style={revealStyle(0)}>
            <div className="post5-index-title">
              <span>Project archive / {PROJECTS.length.toString().padStart(2, "0")}</span>
              <h2 id="post-slider-heading">Selected work.</h2>
            </div>

            <p className="post5-index-intro">
              Six focused builds across AI, websites, commerce and connected
              business systems.
            </p>

          </header>

          <div className="post5-slider rv" style={revealStyle(80)}>
            <div
              id="post-slider-rail"
              ref={railRef}
              className="post5-rail"
              role="region"
              aria-roledescription="carousel"
              aria-label="Bandesha Empire selected build previews"
              tabIndex={0}
              onScroll={updateActiveFromScroll}
              onKeyDown={handleKeyDown}
            >
              {PROJECTS.map((project, index) => {
                return (
                  <article
                    key={project.number}
                    ref={(element) => {
                      cardRefs.current[index] = element;
                    }}
                    className={`post5-card ${index === active ? "is-active" : ""}`}
                    aria-roledescription="slide"
                    aria-label={`${index + 1} of ${PROJECTS.length}: ${project.title}`}
                  >
                    <div className="post5-visual">
                      <div className="post5-image-wrap">
                        <Image
                          src={project.image}
                          alt={project.imageAlt}
                          width={1536}
                          height={1024}
                          sizes="(max-width: 767px) calc(100vw - 3.25rem), (max-width: 1199px) 42vw, min(29vw, 432px)"
                          loading={index < 3 ? "eager" : "lazy"}
                          className="post5-project-image"
                        />
                        <span className="post5-concept-label">
                          Concept build {project.number}
                        </span>
                      </div>
                    </div>

                    <div className="post5-card-copy">
                      <div className="post5-meta">
                        <span>{project.category}</span>
                        <span>{project.tags[0]}</span>
                      </div>
                      <h3>{project.title}</h3>
                      <p>{project.summary}</p>

                      <div className="post5-card-foot">
                        <Link
                          href={`/portfolio#${project.id}`}
                          aria-label={`${project.cta}: ${project.title}`}
                          onFocus={() => goTo(index, "auto")}
                        >
                          {project.cta}
                          <ArrowIcon />
                        </Link>
                      </div>
                    </div>
                  </article>
                );
              })}
            </div>

            <div className="post5-floating-controls">
              <button
                type="button"
                className="post5-floating-prev"
                onClick={() => goTo(targetIndexRef.current - 1)}
                aria-label="Show previous build"
                aria-controls="post-slider-rail"
              >
                <ArrowIcon direction="left" />
              </button>
              <button
                type="button"
                className="post5-floating-next"
                onClick={() => goTo(targetIndexRef.current + 1)}
                aria-label="Show next build"
                aria-controls="post-slider-rail"
              >
                <ArrowIcon />
              </button>
            </div>

            <p className="sr-only" aria-live="polite" aria-atomic="true">
              Showing build {active + 1} of {PROJECTS.length}:{" "}
              {PROJECTS[active].title}
            </p>
            <div className="post5-swipe-hint" aria-hidden="true">
              <span />
              <b className="post5-hint-desktop">Scroll or use arrow keys</b>
              <b className="post5-hint-touch">Swipe to explore</b>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
