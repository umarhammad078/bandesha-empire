import ServicesReveal from "@/components/ServicesReveal";

function delayStyle(ms: number): React.CSSProperties {
  return { "--reveal-delay": `${ms}ms` } as React.CSSProperties;
}

function TickIcon() {
  return (
    <svg
      viewBox="0 0 16 16"
      width="14"
      height="14"
      fill="none"
      aria-hidden="true"
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

function ArrowIcon({ className = "" }: { className?: string }) {
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
        d="M3.5 8h9M8.5 4l4 4-4 4"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function Labels({ items }: { items: string[] }) {
  return (
    <div className="mt-6 flex flex-wrap gap-2">
      {items.map((label) => (
        <span
          key={label}
          className="rounded-md border border-border bg-surface px-3 py-1 text-xs text-muted"
        >
          {label}
        </span>
      ))}
    </div>
  );
}

function DiscussLink({ service }: { service: string }) {
  return (
    <a
      href="#contact"
      aria-label={`Discuss ${service} services`}
      className="svc-link mt-8 inline-flex items-center gap-1.5 rounded text-sm font-medium text-foreground transition-colors hover:text-accent-dark focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-dark focus-visible:ring-offset-2"
    >
      Discuss this service
      <ArrowIcon className="svc-link-arrow" />
    </a>
  );
}

const SERVICES = [
  {
    number: "01",
    title: "AI Automation",
    description:
      "Connect the tools you already use and automate repetitive work such as lead intake, approvals, data hand-offs and internal workflows—so your team can focus on decisions that require real attention.",
    labels: ["Workflow Automation", "AI-Assisted Tools", "System Integrations"],
  },
  {
    number: "02",
    title: "Web Development",
    description:
      "Custom business websites and web applications built for speed, responsive performance and long-term maintainability—not disposable templates that need constant rebuilding.",
    labels: ["Business Websites", "Web Applications", "Responsive Development"],
  },
  {
    number: "03",
    title: "Custom Integrations",
    description:
      "Connect APIs, databases and third-party platforms into dependable dashboards and internal tools your team can use every day.",
    labels: ["API Integrations", "Supabase", "Business Systems"],
  },
  {
    number: "04",
    title: "Digital Products & Support",
    description:
      "Continue improving after launch with feature development, maintenance, performance optimization and dependable technical support.",
    labels: ["Feature Development", "Maintenance", "Optimization"],
  },
] as const;

export default function ServicesSection() {
  const [featured, web, integrations, support] = SERVICES;

  return (
    <section id="services" className="w-full bg-background">
      <div className="mx-auto max-w-[1400px] px-6 py-24 lg:py-32">
        <ServicesReveal>
          <div className="grid gap-16 lg:grid-cols-[38fr_62fr] lg:items-start">
            {/* Left column — intro + system index */}
            <div className="lg:sticky lg:top-28">
              <div className="svc-reveal" style={delayStyle(0)}>
                <span className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.16em] text-accent-dark">
                  <TickIcon />
                  What We Build
                </span>

                <h2 className="mt-5 text-[clamp(1.9rem,1rem+2.4vw,2.75rem)] font-bold leading-[1.15] tracking-tight text-foreground">
                  The system behind a well-run business.
                </h2>

                <p className="mt-5 max-w-md text-base leading-relaxed text-muted">
                  Websites, automations and internal systems work best when
                  they operate as one connected foundation. Bandesha Empire
                  designs each layer around the way your business actually
                  works, so the result feels intentional, reliable and
                  easier to grow.
                </p>

                <div className="mt-6 h-0.5 w-8 bg-accent" aria-hidden="true" />

                <ol
                  className="mt-8 space-y-3 border-l border-border pl-4"
                  aria-hidden="true"
                >
                  {SERVICES.map((service, i) => (
                    <li
                      key={service.number}
                      className="flex items-center gap-2 text-xs font-medium uppercase tracking-[0.08em] text-muted"
                    >
                      {i === 0 && (
                        <span className="h-1.5 w-1.5 rounded-full bg-accent" />
                      )}
                      <span className={i === 0 ? "text-foreground" : ""}>
                        {service.number} — {service.title}
                      </span>
                    </li>
                  ))}
                </ol>
              </div>
            </div>

            {/* Right area — the service system */}
            <div>
              {/* Featured panel */}
              <div
                className="svc-reveal relative rounded-xl border border-border bg-white p-8 transition-colors duration-200 hover:border-accent-dark sm:p-10"
                style={delayStyle(90)}
              >
                <div
                  className="pointer-events-none absolute left-1/2 top-full hidden h-8 w-px -translate-x-1/2 bg-border lg:block"
                  aria-hidden="true"
                />
                <div className="flex items-start justify-between">
                  <span className="text-sm font-semibold text-muted">
                    {featured.number}
                  </span>
                  <span className="inline-flex items-center gap-1.5 text-[11px] font-medium uppercase tracking-wide text-accent-dark">
                    <span
                      className="h-1.5 w-1.5 rounded-full bg-accent"
                      aria-hidden="true"
                    />
                    Active
                  </span>
                </div>
                <h3 className="mt-4 text-2xl font-semibold text-foreground">
                  {featured.title}
                </h3>
                <p className="mt-3 max-w-2xl leading-relaxed text-muted">
                  {featured.description}
                </p>
                <Labels items={[...featured.labels]} />
                <DiscussLink service={featured.title} />
              </div>

              {/* Two-up supporting row */}
              <div className="relative mt-8 grid gap-5 sm:grid-cols-2 lg:mt-14">
                <div
                  className="pointer-events-none absolute inset-x-[25%] -top-6 hidden h-px bg-border lg:block"
                  aria-hidden="true"
                />
                <div
                  className="pointer-events-none absolute left-[25%] -top-6 hidden h-6 w-px bg-border lg:block"
                  aria-hidden="true"
                />
                <div
                  className="pointer-events-none absolute left-[75%] -top-6 hidden h-6 w-px bg-border lg:block"
                  aria-hidden="true"
                />

                <div
                  className="svc-reveal group relative rounded-lg border border-border bg-surface p-6 transition-colors duration-200 hover:border-accent-dark"
                  style={delayStyle(180)}
                >
                  <span
                    className="absolute -top-[27px] left-1/2 hidden h-2.5 w-2.5 -translate-x-1/2 rounded-full border-2 border-white bg-border transition-colors duration-200 group-hover:bg-accent lg:block"
                    aria-hidden="true"
                  />
                  <span className="text-sm font-semibold text-muted">
                    {web.number}
                  </span>
                  <h3 className="mt-3 text-lg font-semibold text-foreground">
                    {web.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted">
                    {web.description}
                  </p>
                  <Labels items={[...web.labels]} />
                  <DiscussLink service={web.title} />
                </div>

                <div
                  className="svc-reveal group relative rounded-lg border border-border bg-surface p-6 transition-colors duration-200 hover:border-accent-dark"
                  style={delayStyle(240)}
                >
                  <span
                    className="absolute -top-[27px] left-1/2 hidden h-2.5 w-2.5 -translate-x-1/2 rounded-full border-2 border-white bg-border transition-colors duration-200 group-hover:bg-accent lg:block"
                    aria-hidden="true"
                  />
                  <span className="text-sm font-semibold text-muted">
                    {integrations.number}
                  </span>
                  <h3 className="mt-3 text-lg font-semibold text-foreground">
                    {integrations.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted">
                    {integrations.description}
                  </p>
                  <Labels items={[...integrations.labels]} />
                  <DiscussLink service={integrations.title} />
                </div>
              </div>

              {/* Distinct horizontal support module */}
              <div className="relative mt-8 lg:mt-14">
                <div
                  className="pointer-events-none absolute left-1/2 -top-8 hidden h-8 w-px -translate-x-1/2 bg-border lg:block"
                  aria-hidden="true"
                />
                <div
                  className="svc-reveal group relative rounded-lg border border-border bg-surface p-6 transition-colors duration-200 hover:border-accent-dark sm:flex sm:items-center sm:justify-between sm:gap-10"
                  style={delayStyle(300)}
                >
                  <span
                    className="absolute -top-[27px] left-1/2 hidden h-2.5 w-2.5 -translate-x-1/2 rounded-full border-2 border-white bg-border transition-colors duration-200 group-hover:bg-accent lg:block"
                    aria-hidden="true"
                  />
                  <div className="sm:max-w-xs">
                    <span className="text-sm font-semibold text-muted">
                      {support.number}
                    </span>
                    <h3 className="mt-3 text-lg font-semibold text-foreground sm:mt-2">
                      {support.title}
                    </h3>
                  </div>
                  <div className="mt-2 sm:mt-0 sm:flex-1">
                    <p className="text-sm leading-relaxed text-muted">
                      {support.description}
                    </p>
                    <div className="flex flex-wrap items-center gap-4">
                      <Labels items={[...support.labels]} />
                    </div>
                    <DiscussLink service={support.title} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </ServicesReveal>
      </div>
    </section>
  );
}
