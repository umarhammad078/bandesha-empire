import Reveal from "@/components/Reveal";

function delayStyle(ms: number): React.CSSProperties {
  return { "--reveal-delay": `${ms}ms` } as React.CSSProperties;
}

export default function CtaSection() {
  return (
    <section aria-labelledby="cta-heading" className="w-full bg-background">
      <div className="mx-auto max-w-[1400px] px-6 py-20 lg:py-28">
        <Reveal>
          <div className="rv relative border border-border bg-white px-6 py-14 sm:px-12 sm:py-16 lg:px-20">
            {/* registration corner marks */}
            <span
              className="pointer-events-none absolute -left-1.5 -top-1.5 hidden h-3.5 w-3.5 border-l border-t border-border sm:block"
              aria-hidden="true"
            />
            <span
              className="pointer-events-none absolute -right-1.5 -top-1.5 hidden h-3.5 w-3.5 border-r border-t border-border sm:block"
              aria-hidden="true"
            />
            <span
              className="pointer-events-none absolute -bottom-1.5 -left-1.5 hidden h-3.5 w-3.5 border-b border-l border-border sm:block"
              aria-hidden="true"
            />
            <span
              className="pointer-events-none absolute -bottom-1.5 -right-1.5 hidden h-3.5 w-3.5 border-b border-r border-border sm:block"
              aria-hidden="true"
            />

            <div className="max-w-2xl">
              {/* thin green route leading toward the CTA */}
              <span
                className="rv-line-x block h-px w-16 origin-left bg-accent"
                style={delayStyle(120)}
                aria-hidden="true"
              />

              <span
                className="rv mt-6 inline-flex items-center text-xs font-semibold uppercase tracking-[0.16em] text-accent-dark"
                style={delayStyle(60)}
              >
                Start the Next Build
              </span>
              <h2
                id="cta-heading"
                className="rv mt-5 text-[clamp(2rem,1.1rem+2.6vw,3rem)] font-bold leading-[1.12] tracking-tight text-foreground"
                style={delayStyle(140)}
              >
                Build the system your business needs next.
              </h2>
              <p
                className="rv mt-5 text-base leading-relaxed text-muted sm:text-lg"
                style={delayStyle(220)}
              >
                Tell us what you are trying to improve, launch or connect. We
                will help turn it into a clear technical plan.
              </p>

              <div
                className="rv mt-8 flex flex-col gap-3 sm:flex-row sm:items-center"
                style={delayStyle(300)}
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
                  Explore Services
                </a>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
