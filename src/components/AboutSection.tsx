import AboutReveal from "@/components/AboutReveal";

function delayStyle(ms: number): React.CSSProperties {
  return { "--reveal-delay": `${ms}ms` } as React.CSSProperties;
}

type Principle = {
  number: string;
  title: string;
  body: string;
  outcome: string;
};

const PRINCIPLES: Principle[] = [
  {
    number: "01",
    title: "Built around the real workflow",
    body: "Before choosing tools or designing screens, we understand how the business currently works, where friction exists and what the finished system must improve.",
    outcome: "Relevant by Design",
  },
  {
    number: "02",
    title: "Direct communication throughout",
    body: "You work through a clear process with visible progress, practical decisions and honest communication instead of unnecessary layers or vague technical language.",
    outcome: "Clarity at Every Stage",
  },
  {
    number: "03",
    title: "Engineered for long-term use",
    body: "The final product is structured to remain fast, maintainable and adaptable as requirements, users and business priorities continue to evolve.",
    outcome: "Built Beyond Launch",
  },
];

export default function AboutSection() {
  const [first, second, third] = PRINCIPLES;

  return (
    <section
      id="about"
      aria-labelledby="about-heading"
      className="w-full border-t border-border bg-background"
    >
      <div className="mx-auto max-w-[1400px] px-6 py-24 lg:py-32">
        <AboutReveal>
          <div className="grid gap-16 lg:grid-cols-[42fr_58fr] lg:items-start">
            {/* Left column */}
            <div className="lg:sticky lg:top-28">
              <div className="abt-reveal" style={delayStyle(0)}>
                <span className="inline-flex items-center text-xs font-semibold uppercase tracking-[0.16em] text-accent-dark">
                  Why Bandesha Empire
                </span>

                <h2
                  id="about-heading"
                  className="mt-5 text-[clamp(1.9rem,1rem+2.4vw,2.75rem)] font-bold leading-[1.15] tracking-tight text-foreground"
                >
                  The work is custom. The process stays clear.
                </h2>

                <p className="mt-5 max-w-md text-base leading-relaxed text-muted">
                  We combine strategic thinking, careful development and
                  direct communication to create digital systems that fit
                  the way a business actually operates—not just the way a
                  template expects it to.
                </p>

                <div className="mt-8 h-0.5 w-8 bg-accent" aria-hidden="true" />
              </div>

              <div
                className="abt-reveal mt-14 border-t border-border pt-6 lg:mt-24"
                style={delayStyle(100)}
              >
                <p className="text-sm font-medium text-foreground">
                  Considered decisions. Honest communication. Work that lasts.
                </p>
              </div>
            </div>

            {/* Right column — operating charter frame */}
            <div className="abt-reveal" style={delayStyle(70)}>
              <div className="abt-frame relative border border-border p-8 sm:p-10 lg:p-12">
                <span
                  className="pointer-events-none absolute -top-3 left-6 hidden bg-background px-2 font-mono text-[10px] uppercase tracking-[0.14em] text-muted sm:block"
                  aria-hidden="true"
                >
                  Operating Principles / 01—03
                </span>

                <span
                  className="pointer-events-none absolute -left-1.5 -top-1.5 hidden h-3 w-3 border-l border-t border-border sm:block"
                  aria-hidden="true"
                />
                <span
                  className="pointer-events-none absolute -bottom-1.5 -right-1.5 hidden h-3 w-3 border-b border-r border-border sm:block"
                  aria-hidden="true"
                />

                <ol className="relative divide-y divide-border">
                  <div
                    className="abt-reg-line pointer-events-none absolute left-6 top-2 bottom-2 hidden w-px bg-border sm:block"
                    style={delayStyle(160)}
                    aria-hidden="true"
                  />

                  {/* Principle 01 — number far left, content beside it */}
                  <li
                    className="abt-row relative py-8 first:pt-0 sm:pl-20"
                    style={delayStyle(220)}
                  >
                    <div className="flex items-start gap-6 sm:absolute sm:left-0 sm:top-8 sm:gap-0">
                      <span className="text-4xl font-bold leading-none text-border sm:text-5xl">
                        {first.number}
                      </span>
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-foreground">
                        {first.title}
                      </h3>
                      <p className="mt-3 max-w-xl leading-relaxed text-muted">
                        {first.body}
                      </p>
                      <span className="mt-4 inline-block text-xs font-semibold uppercase tracking-[0.12em] text-accent-dark">
                        {first.outcome}
                      </span>
                    </div>
                  </li>

                  {/* Principle 02 — indented, subtle surface strip */}
                  <li
                    className="abt-row relative py-8 sm:pl-20"
                    style={delayStyle(320)}
                  >
                    <div
                      className="pointer-events-none absolute inset-y-0 left-0 right-8 hidden bg-surface sm:block lg:right-24"
                      aria-hidden="true"
                    />
                    <div className="relative flex items-start gap-6 sm:absolute sm:left-0 sm:top-8 sm:gap-0">
                      <span className="text-4xl font-bold leading-none text-border sm:text-5xl">
                        {second.number}
                      </span>
                    </div>
                    <div className="relative sm:pl-6 lg:pl-10">
                      <h3 className="text-xl font-semibold text-foreground">
                        {second.title}
                      </h3>
                      <p className="mt-3 max-w-xl leading-relaxed text-muted">
                        {second.body}
                      </p>
                      <span className="mt-4 inline-block text-xs font-semibold uppercase tracking-[0.12em] text-accent-dark">
                        {second.outcome}
                      </span>
                    </div>
                  </li>

                  {/* Principle 03 — main alignment, green completion node */}
                  <li
                    className="abt-row relative py-8 last:pb-0 sm:pl-20"
                    style={delayStyle(420)}
                  >
                    <div className="flex items-start gap-6 sm:absolute sm:left-0 sm:top-8 sm:gap-0">
                      <span className="text-4xl font-bold leading-none text-border sm:text-5xl">
                        {third.number}
                      </span>
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-foreground">
                        {third.title}
                      </h3>
                      <p className="mt-3 max-w-xl leading-relaxed text-muted">
                        {third.body}
                      </p>
                      <span className="mt-4 inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.12em] text-accent-dark">
                        <span
                          className="abt-node-final h-2 w-2 rounded-full"
                          style={delayStyle(480)}
                          aria-hidden="true"
                        />
                        {third.outcome}
                      </span>
                    </div>
                  </li>
                </ol>
              </div>
            </div>
          </div>
        </AboutReveal>
      </div>
    </section>
  );
}
