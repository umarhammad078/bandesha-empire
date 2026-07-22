import ProcessReveal from "@/components/ProcessReveal";

function delayStyle(ms: number): React.CSSProperties {
  return { "--reveal-delay": `${ms}ms` } as React.CSSProperties;
}

function StageLabels({
  items,
  tone = "surface",
}: {
  items: string[];
  tone?: "surface" | "white";
}) {
  return (
    <div className="mt-4 flex flex-wrap gap-2">
      {items.map((label) => (
        <span
          key={label}
          className={
            tone === "white"
              ? "rounded-md border border-border bg-white px-3 py-1 text-xs text-muted"
              : "rounded-md border border-border bg-surface px-3 py-1 text-xs text-muted"
          }
        >
          {label}
        </span>
      ))}
    </div>
  );
}

function RailNode({ delay, final = false }: { delay: number; final?: boolean }) {
  return (
    <span
      className={
        final
          ? "proc-node proc-node-final absolute left-0 top-1.5 h-3 w-3 -translate-x-1/2 rounded-full border-2 border-surface bg-accent"
          : "proc-node absolute left-0 top-1.5 h-2.5 w-2.5 -translate-x-1/2 rounded-full border-2 border-surface bg-border"
      }
      style={delayStyle(delay)}
      aria-hidden="true"
    />
  );
}

export default function ProcessSection() {
  return (
    <section id="process" className="w-full bg-surface">
      <div className="mx-auto max-w-[1400px] px-6 py-24 lg:py-32">
        <ProcessReveal>
          <div className="grid gap-16 lg:grid-cols-[35fr_65fr] lg:items-start">
            {/* Left column — introduction */}
            <div className="lg:sticky lg:top-28">
              <div className="proc-reveal" style={delayStyle(0)}>
                <span className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.16em] text-accent-dark">
                  How We Build
                </span>

                <h2 className="mt-5 text-[clamp(1.9rem,1rem+2.4vw,2.75rem)] font-bold leading-[1.15] tracking-tight text-foreground">
                  From first signal to a system that keeps working.
                </h2>

                <p className="mt-5 max-w-md text-base leading-relaxed text-muted">
                  Every project moves through a focused sequence. We
                  understand the real problem, design the right structure,
                  build in clear stages and continue improving after launch.
                </p>

                <div
                  className="mt-8 h-8 w-0.5 bg-accent"
                  aria-hidden="true"
                />

                <div className="mt-6 flex flex-col gap-1 border-t border-border pt-6 font-mono text-[11px] uppercase tracking-[0.14em] text-muted">
                  <span>Sequence 01—04</span>
                  <span>Delivery System</span>
                </div>
              </div>
            </div>

            {/* Right column — assembly rail */}
            <div className="proc-reveal" style={delayStyle(60)}>
              <ol className="relative">
                <div
                  className="proc-rail-line pointer-events-none absolute left-0 top-2 bottom-2 w-px -translate-x-1/2 bg-border"
                  style={delayStyle(80)}
                  aria-hidden="true"
                />

                {/* Stage 01 — Discover: wide horizontal entry row */}
                <li
                  className="proc-stage relative pl-8 sm:pl-12"
                  style={delayStyle(160)}
                >
                  <RailNode delay={220} />
                  <div className="flex flex-col gap-4 sm:flex-row sm:items-baseline sm:gap-8">
                    <span className="text-4xl font-bold leading-none text-border sm:text-5xl">
                      01
                    </span>
                    <div className="max-w-xl">
                      <h3 className="text-xl font-semibold text-foreground">
                        Discover
                      </h3>
                      <p className="mt-3 leading-relaxed text-muted">
                        We identify the business goal, understand the users
                        and uncover the workflows, bottlenecks and decisions
                        that will shape the project.
                      </p>
                      <StageLabels items={["Goals", "Users", "Requirements"]} />
                    </div>
                  </div>
                </li>

                {/* Stage 02 — Architect: offset, technical labels on secondary row */}
                <li
                  className="proc-stage relative mt-14 pl-8 sm:pl-12 lg:mt-16"
                  style={delayStyle(260)}
                >
                  <RailNode delay={320} />
                  <div className="sm:ml-10 lg:ml-16">
                    <span className="text-sm font-semibold text-muted">
                      02
                    </span>
                    <h3 className="mt-3 text-xl font-semibold text-foreground">
                      Architect
                    </h3>
                    <p className="mt-3 max-w-lg leading-relaxed text-muted">
                      We turn the findings into a practical system
                      structure—defining the experience, technical approach,
                      integrations and delivery priorities before development
                      begins.
                    </p>
                    <div className="mt-4 border-t border-border pt-4">
                      <StageLabels
                        items={["System Map", "User Flow", "Technical Scope"]}
                      />
                    </div>
                  </div>
                </li>

                {/* Stage 03 — Build: strongest visual weight, light surface card */}
                <li
                  className="proc-stage relative mt-14 pl-8 sm:pl-12 lg:mt-16"
                  style={delayStyle(360)}
                >
                  <RailNode delay={420} />
                  <div className="rounded-lg border border-border bg-white p-6 sm:p-8">
                    <span className="text-sm font-semibold text-muted">
                      03
                    </span>
                    <h3 className="mt-3 text-xl font-semibold text-foreground sm:text-2xl">
                      Build
                    </h3>
                    <p className="mt-3 max-w-xl leading-relaxed text-muted">
                      The approved system is developed in focused stages,
                      with responsive implementation, clear progress and
                      continuous quality checks.
                    </p>
                    <StageLabels
                      items={["Development", "Integration", "Quality Assurance"]}
                      tone="surface"
                    />
                  </div>
                </li>

                {/* Stage 04 — Launch & Improve: full width, closing microcopy */}
                <li
                  className="proc-stage relative mt-14 pl-8 sm:pl-12 lg:mt-16"
                  style={delayStyle(460)}
                >
                  <RailNode delay={540} final />
                  <span className="text-sm font-semibold text-muted">04</span>
                  <h3 className="mt-3 text-xl font-semibold text-foreground">
                    Launch &amp; Improve
                  </h3>
                  <p className="mt-3 max-w-xl leading-relaxed text-muted">
                    We deploy carefully, verify the live experience and
                    continue refining performance, features and reliability
                    as the product evolves.
                  </p>
                  <StageLabels
                    items={["Deployment", "Optimization", "Ongoing Support"]}
                  />
                  <p className="mt-6 border-t border-border pt-6 text-sm font-medium text-foreground">
                    Built with clarity. Launched with confidence. Improved
                    with purpose.
                  </p>
                </li>
              </ol>
            </div>
          </div>
        </ProcessReveal>
      </div>
    </section>
  );
}
