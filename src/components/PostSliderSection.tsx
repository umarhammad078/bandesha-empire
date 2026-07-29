"use client";

import Reveal from "@/components/Reveal";
import Image from "next/image";
import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type CSSProperties,
  type KeyboardEvent,
} from "react";

type Project = {
  number: string;
  category: string;
  title: string;
  summary: string;
  image: string;
  imageAlt: string;
  cta: string;
  tags: readonly string[];
};

const PROJECTS: readonly Project[] = [
  {
    number: "01",
    category: "AI & Automation",
    title: "An AI agent that turns questions into action.",
    summary:
      "A connected support workspace that retrieves approved knowledge, completes routine workflows and hands complex cases to the right person with full context.",
    image: "/projects/ai-automation-editorial.png",
    imageAlt:
      "Professional using an AI automation workflow on a laptop in a dark studio workspace.",
    cta: "Build an AI agent",
    tags: ["Knowledge retrieval", "Workflow actions", "Human hand-off"],
  },
  {
    number: "02",
    category: "Website Development",
    title: "A high-performing website built to earn trust.",
    summary:
      "Clear positioning, purposeful journeys and dependable engineering connect discovery, qualification and enquiry without unnecessary friction.",
    image: "/projects/website-development-editorial.png",
    imageAlt:
      "Modern website development workspace with a dark code editor and refined digital canvas.",
    cta: "Plan your website",
    tags: ["Strategy-led UX", "CMS & integrations", "Performance-first"],
  },
  {
    number: "03",
    category: "Shopify Commerce",
    title: "A Shopify store built for confident buying.",
    summary:
      "Focused merchandising, fast product discovery and a streamlined purchase journey create a storefront customers trust and teams can operate.",
    image: "/projects/shopify-commerce-editorial.png",
    imageAlt:
      "Premium skincare products arranged beside a tablet displaying an ecommerce product gallery.",
    cta: "Build your Shopify store",
    tags: ["Storefront UX", "Conversion architecture", "Operations integration"],
  },
  {
    number: "04",
    category: "Custom Web Application",
    title: "A client portal for every decision and next action.",
    summary:
      "A secure shared workspace gives clients and teams a clear view of progress, approvals, documents and next actions—without scattered email threads.",
    image: "/projects/client-portal-editorial.png",
    imageAlt:
      "Two professionals reviewing a clean project dashboard on a laptop during a client meeting.",
    cta: "Plan your web application",
    tags: ["Role-based access", "Approval workflows", "Secure document hub"],
  },
  {
    number: "05",
    category: "Business Automation",
    title: "An operations workflow that keeps work moving.",
    summary:
      "Forms, approvals, notifications and task hand-offs connect into one visible process, while exceptions stay with the people best placed to decide.",
    image: "/projects/workflow-automation-editorial.png",
    imageAlt:
      "Business operator using a tablet with a connected approvals and workflow diagram.",
    cta: "Automate your operations",
    tags: ["Workflow orchestration", "Approval routing", "Exception handling"],
  },
  {
    number: "06",
    category: "Connected Systems",
    title: "An integration hub for one dependable data flow.",
    summary:
      "APIs, databases and third-party tools synchronize through a monitored connection layer, reducing duplicate entry and keeping teams aligned.",
    image: "/projects/connected-systems-editorial.png",
    imageAlt:
      "Enterprise server hardware connected by restrained green data-light paths.",
    cta: "Connect your systems",
    tags: ["API integrations", "Data synchronization", "Monitoring & recovery"],
  },
] as const;

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
                        <a
                          href="#contact"
                          aria-label={`${project.cta}: ${project.title}`}
                          onFocus={() => goTo(index, "auto")}
                        >
                          {project.cta}
                          <ArrowIcon />
                        </a>
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
