"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Shared scroll-reveal wrapper for the lower homepage sections.
 * Adds the `is-in` class once the element enters the viewport, which the
 * `.rv*` utility classes in globals.css hook into. All hidden/transformed
 * states live inside a prefers-reduced-motion: no-preference query, so
 * reduced-motion users receive the finished layout immediately.
 */
export default function Reveal({
  children,
  className = "",
  as: Tag = "div",
  threshold = 0.15,
}: {
  children: React.ReactNode;
  className?: string;
  as?: "div" | "section";
  threshold?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
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
      { threshold },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold]);

  return (
    <Tag
      ref={ref}
      className={`${inView ? "is-in" : ""} ${className}`.trim()}
    >
      {children}
    </Tag>
  );
}
