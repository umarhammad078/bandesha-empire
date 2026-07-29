"use client";

import { useCallback, useRef, useState } from "react";

const REVIEWS = [
  {
    quote:
      "They understood the operational problem before touching the interface. The new client portal is calmer, faster and gives our team one reliable place to work from.",
    name: "Amelia Hart",
    role: "Operations Director",
    company: "Northline Advisory · United Kingdom",
    initials: "AH",
    service: "Client portal",
  },
  {
    quote:
      "Our automation now handles the repetitive hand-offs without hiding what is happening. We have fewer missed follow-ups and a much clearer view of every active enquiry.",
    name: "Lucas Almeida",
    role: "Growth Operations Lead",
    company: "Verde Logistics · Brazil",
    initials: "LA",
    service: "AI & automation",
    featured: true,
  },
  {
    quote:
      "The Shopify rebuild finally made the brand feel as considered online as it does in person. Product discovery is simpler and the team can manage content without friction.",
    name: "Priya Nair",
    role: "E-commerce Founder",
    company: "Saffron & Co. · India",
    initials: "PN",
    service: "Shopify commerce",
  },
  {
    quote:
      "Bandesha Empire brought structure to a complicated brief. Decisions were documented, progress stayed visible and the finished platform is genuinely easy to extend.",
    name: "Daniel Weber",
    role: "Product Director",
    company: "Kern Systems · Germany",
    initials: "DW",
    service: "Web platform",
  },
  {
    quote:
      "We did not just receive a polished website. We received a clearer story, a stronger enquiry journey and a system our internal team actually understands.",
    name: "Hannah Brooks",
    role: "Marketing Manager",
    company: "Northwind Retail · Canada",
    initials: "HB",
    service: "Website development",
  },
  {
    quote:
      "The team connected our tools without forcing us into a rigid process. The result feels tailored to how we work today and ready for where the business is heading.",
    name: "Omar Khalid",
    role: "Co-founder",
    company: "Fulfilio · United Arab Emirates",
    initials: "OK",
    service: "Connected systems",
  },
] as const;

function Arrow({ direction }: { direction: "left" | "right" }) {
  return (
    <svg viewBox="0 0 20 20" aria-hidden="true">
      <path
        d={direction === "left" ? "M16 10H4m5-5-5 5 5 5" : "M4 10h12m-5-5 5 5-5 5"}
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.6"
      />
    </svg>
  );
}

export default function OutcomesSection() {
  const trackRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);

  const goTo = useCallback((index: number) => {
    const track = trackRef.current;
    const card = track?.children[index] as HTMLElement | undefined;

    if (!track || !card) return;

    track.scrollTo({ left: card.offsetLeft - track.offsetLeft, behavior: "smooth" });
    setActive(index);
  }, []);

  const move = (direction: -1 | 1) => {
    const next = (active + direction + REVIEWS.length) % REVIEWS.length;
    goTo(next);
  };

  const syncActiveCard = () => {
    const track = trackRef.current;
    if (!track) return;

    const closest = Array.from(track.children).reduce(
      (best, child, index) => {
        const distance = Math.abs((child as HTMLElement).offsetLeft - track.scrollLeft);
        return distance < best.distance ? { index, distance } : best;
      },
      { index: 0, distance: Number.POSITIVE_INFINITY },
    );

    setActive(closest.index);
  };

  return (
    <section id="reviews" aria-labelledby="reviews-heading" className="reviews5-section">
      <div className="reviews5-grid" aria-hidden="true" />
      <div className="reviews5-shell">
        <header className="reviews5-header">
          <div>
            <span className="reviews5-eyebrow">
              <i aria-hidden="true" />
              Client voices
            </span>
            <h2 id="reviews-heading">
              The work is only good
              <span> when it works for people.</span>
            </h2>
          </div>

          <div className="reviews5-intro">
            <p>
              Clear thinking, direct communication and digital systems that keep
              earning their place after launch.
            </p>
            <div className="reviews5-trustline">
              <span>Strategy-led</span>
              <span>Senior delivery</span>
              <span>Built for ownership</span>
            </div>
          </div>
        </header>

        <div className="reviews5-rail-wrap">
          <button
            type="button"
            className="reviews5-arrow reviews5-arrow-left"
            onClick={() => move(-1)}
            aria-label="Show previous client review"
          >
            <Arrow direction="left" />
          </button>

          <div
            ref={trackRef}
            className="reviews5-track"
            onScroll={syncActiveCard}
            aria-live="polite"
          >
            {REVIEWS.map((review, index) => (
              <article
                key={review.name}
                className={`reviews5-card${"featured" in review && review.featured ? " reviews5-card-featured" : ""}`}
              >
                <div className="reviews5-card-top">
                  <div className="reviews5-stars" aria-label="Five out of five stars">
                    {Array.from({ length: 5 }).map((_, star) => (
                      <svg key={star} viewBox="0 0 20 20" aria-hidden="true">
                        <path d="m10 1.7 2.5 5.1 5.6.8-4 3.9.9 5.5-5-2.6L5 17l.9-5.5-4-3.9 5.6-.8L10 1.7Z" />
                      </svg>
                    ))}
                  </div>
                  <span className="reviews5-service">{review.service}</span>
                </div>

                <blockquote>“{review.quote}”</blockquote>

                <footer className="reviews5-person">
                  <span className="reviews5-avatar" aria-hidden="true">
                    {review.initials}
                  </span>
                  <span>
                    <strong>{review.name}</strong>
                    <small>{review.role}</small>
                    <small>{review.company}</small>
                  </span>
                </footer>

                <span className="reviews5-quote-mark" aria-hidden="true">
                  ”
                </span>
                <span className="sr-only">Review {index + 1} of {REVIEWS.length}</span>
              </article>
            ))}
          </div>

          <button
            type="button"
            className="reviews5-arrow reviews5-arrow-right"
            onClick={() => move(1)}
            aria-label="Show next client review"
          >
            <Arrow direction="right" />
          </button>
        </div>

      </div>
    </section>
  );
}
