import ServicesReveal from "@/components/ServicesReveal";

function delayStyle(ms: number): React.CSSProperties {
  return { "--reveal-delay": `${ms}ms` } as React.CSSProperties;
}

function currentStyle(ms: number): React.CSSProperties {
  return { "--current-delay": `${ms}ms` } as React.CSSProperties;
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
    signal: "Automate the work",
    description:
      "Connect the tools you already use and automate repetitive work such as lead intake, approvals, data hand-offs and internal workflows—so your team can focus on decisions that require real attention.",
    labels: ["Workflow Automation", "AI-Assisted Tools", "System Integrations"],
  },
  {
    number: "02",
    title: "Web Development",
    signal: "Build the experience",
    description:
      "Custom business websites and web applications built for speed, responsive performance and long-term maintainability—not disposable templates that need constant rebuilding.",
    labels: ["Business Websites", "Web Applications", "Responsive Development"],
  },
  {
    number: "03",
    title: "Custom Integrations",
    signal: "Connect every tool",
    description:
      "Connect APIs, databases and third-party platforms into dependable dashboards and internal tools your team can use every day.",
    labels: ["API Integrations", "Supabase", "Business Systems"],
  },
  {
    number: "04",
    title: "Digital Products & Support",
    signal: "Improve continuously",
    description:
      "Continue improving after launch with feature development, maintenance, performance optimization and dependable technical support.",
    labels: ["Feature Development", "Maintenance", "Optimization"],
  },
] as const;

export default function ServicesSection() {
  const [featured, web, integrations, support] = SERVICES;

  return (
    <section
      id="services"
      aria-labelledby="services-heading"
      className="w-full bg-background"
    >
      <div className="mx-auto max-w-[1400px] px-6 py-24 lg:py-32">
        <ServicesReveal>
          <div className="grid gap-16 lg:grid-cols-[38fr_62fr] lg:items-start">
            {/* Left column — sticky capability control panel */}
            <div className="lg:sticky lg:top-24">
              <div
                className="svc-overview-panel svc-reveal relative overflow-hidden rounded-2xl border border-border bg-white p-6 sm:p-8 lg:p-5 xl:p-8"
                style={delayStyle(0)}
              >
                <div className="relative z-10">
                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <span className="inline-flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.16em] text-accent-dark">
                      <TickIcon />
                      What We Build
                    </span>
                    <span className="inline-flex items-center gap-2 rounded-full border border-accent/25 bg-white/80 px-3 py-1.5 text-[10px] font-semibold uppercase tracking-[0.14em] text-accent-dark">
                      <span
                        className="svc-overview-beacon h-1.5 w-1.5 rounded-full bg-accent"
                        aria-hidden="true"
                      />
                      System live
                    </span>
                  </div>

                  <h2
                    id="services-heading"
                    className="mt-6 max-w-md text-[clamp(1.9rem,1rem+2.25vw,2.65rem)] font-bold leading-[1.08] tracking-tight text-foreground lg:mt-5 lg:text-[2rem] xl:mt-6 xl:text-[2.65rem]"
                  >
                    Four capabilities. One connected foundation.
                  </h2>

                  <p className="mt-5 max-w-md text-[15px] leading-relaxed text-muted lg:mt-4 lg:text-sm xl:mt-5 xl:text-[15px]">
                    Each layer is shaped around the way your business actually
                    works—then connected into one reliable system that is
                    easier to operate, scale and improve.
                  </p>

                  <div className="mt-7 border-y border-border/80 py-4 lg:mt-5 lg:py-3 xl:mt-7 xl:py-4">
                    <div>
                      <span className="block font-mono text-[10px] uppercase tracking-[0.16em] text-muted">
                        Service architecture
                      </span>
                      <span className="mt-1 block text-sm font-semibold text-foreground">
                        Built as one system
                      </span>
                    </div>
                  </div>

                  <div className="relative mt-5 lg:mt-4 xl:mt-5">
                    <ol className="relative space-y-2 lg:space-y-1 xl:space-y-2">
                      {SERVICES.map((service) => (
                        <li
                          key={service.number}
                          className="svc-overview-item group relative grid grid-cols-[2.5rem_minmax(0,1fr)_auto] items-center gap-3 rounded-xl border border-transparent bg-white/35 px-3 py-3 lg:py-2 xl:py-3"
                        >
                          <div className="flex justify-center">
                            <span
                              className="svc-overview-node relative z-10 h-2.5 w-2.5 rounded-full"
                              aria-hidden="true"
                            />
                          </div>
                          <div className="min-w-0">
                            <span className="text-sm font-semibold leading-tight text-foreground lg:text-[13px] xl:text-sm">
                              {service.title}
                            </span>
                            <span className="mt-0.5 block text-xs text-muted">
                              {service.signal}
                            </span>
                          </div>
                          <span
                            className="h-px w-3 bg-border transition-[width,background-color] duration-300 group-hover:w-5 group-hover:bg-accent"
                            aria-hidden="true"
                          />
                        </li>
                      ))}
                    </ol>
                  </div>

                  <div className="mt-5 flex items-center gap-4 rounded-xl border border-border/80 bg-white/70 px-4 py-3 lg:mt-4 lg:py-2.5 xl:mt-5 xl:py-3">
                    <span className="inline-flex items-center gap-2 text-xs font-medium text-foreground">
                      <span
                        className="h-1.5 w-1.5 rounded-full bg-accent"
                        aria-hidden="true"
                      />
                      Strategy through support
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Right area — the service system */}
            <div>
              {/* Featured panel */}
              <div
                className="svc-reveal relative rounded-xl border border-border bg-surface p-8 transition-colors duration-200 hover:border-accent-dark sm:p-10"
                style={delayStyle(90)}
              >
                <div
                  className="svc-current-line svc-current-line-y pointer-events-none absolute left-1/2 top-full hidden h-8 w-px -translate-x-1/2 lg:block"
                  style={currentStyle(0)}
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
              <div className="svc-branch-grid relative mt-8 grid gap-5 sm:grid-cols-2 lg:mt-14">
                <div
                  className="svc-branch-span svc-branch-span-top svc-current-line svc-current-line-x pointer-events-none absolute -top-6 hidden h-px lg:block"
                  style={currentStyle(180)}
                  aria-hidden="true"
                />
                <div
                  className="svc-branch-left svc-current-line svc-current-line-y pointer-events-none absolute -top-6 hidden h-6 w-px lg:block"
                  style={currentStyle(360)}
                  aria-hidden="true"
                />
                <div
                  className="svc-branch-right svc-current-line svc-current-line-y pointer-events-none absolute -top-6 hidden h-6 w-px lg:block"
                  style={currentStyle(520)}
                  aria-hidden="true"
                />
                <span
                  className="svc-current-node absolute -top-[30px] left-1/2 hidden h-3 w-3 -translate-x-1/2 rounded-full border-[3px] border-white lg:block"
                  style={currentStyle(180)}
                  aria-hidden="true"
                />

                {/* The two service branches merge back into one live circuit. */}
                <div
                  className="svc-branch-left svc-current-line svc-current-line-y pointer-events-none absolute top-full hidden h-6 w-px lg:block"
                  style={currentStyle(680)}
                  aria-hidden="true"
                />
                <div
                  className="svc-branch-right svc-current-line svc-current-line-y pointer-events-none absolute top-full hidden h-6 w-px lg:block"
                  style={currentStyle(840)}
                  aria-hidden="true"
                />
                <div
                  className="svc-branch-span svc-branch-span-bottom svc-current-line svc-current-line-x pointer-events-none absolute -bottom-6 hidden h-px lg:block"
                  style={currentStyle(1000)}
                  aria-hidden="true"
                />

                <div
                  className="svc-reveal group relative rounded-lg border border-border bg-surface p-6 transition-colors duration-200 hover:border-accent-dark"
                  style={delayStyle(180)}
                >
                  <span
                    className="svc-current-node absolute -top-[30px] left-1/2 hidden h-2.5 w-2.5 -translate-x-1/2 rounded-full border-2 border-white lg:block"
                    style={currentStyle(360)}
                    aria-hidden="true"
                  />
                  <span
                    className="svc-current-node absolute -bottom-[6px] left-1/2 hidden h-2.5 w-2.5 -translate-x-1/2 rounded-full border-2 border-white lg:block"
                    style={currentStyle(680)}
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
                    className="svc-current-node absolute -top-[30px] left-1/2 hidden h-2.5 w-2.5 -translate-x-1/2 rounded-full border-2 border-white lg:block"
                    style={currentStyle(520)}
                    aria-hidden="true"
                  />
                  <span
                    className="svc-current-node absolute -bottom-[6px] left-1/2 hidden h-2.5 w-2.5 -translate-x-1/2 rounded-full border-2 border-white lg:block"
                    style={currentStyle(840)}
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
                  className="svc-current-line svc-current-line-y pointer-events-none absolute left-1/2 -top-8 hidden h-8 w-px -translate-x-1/2 lg:block"
                  style={currentStyle(1160)}
                  aria-hidden="true"
                />
                <div
                  className="svc-reveal group relative rounded-lg border border-border bg-surface p-6 transition-colors duration-200 hover:border-accent-dark sm:flex sm:items-center sm:justify-between sm:gap-10"
                  style={delayStyle(300)}
                >
                  <span
                    className="svc-current-node absolute -top-[27px] left-1/2 hidden h-2.5 w-2.5 -translate-x-1/2 rounded-full border-2 border-white lg:block"
                    style={currentStyle(1160)}
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
