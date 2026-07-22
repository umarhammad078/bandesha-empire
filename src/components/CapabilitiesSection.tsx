import Reveal from "@/components/Reveal";

function delayStyle(ms: number): React.CSSProperties {
  return { "--reveal-delay": `${ms}ms` } as React.CSSProperties;
}

const GROUPS = [
  {
    label: "Frameworks",
    items: ["Next.js", "React", "TypeScript", "Tailwind CSS"],
  },
  {
    label: "Data & Infrastructure",
    items: ["Supabase", "Vercel", "API Integrations"],
  },
  {
    label: "Systems",
    items: ["AI Workflows", "Automation", "Custom Dashboards"],
  },
  {
    label: "Practices",
    items: ["Performance", "Accessibility", "Responsive Design"],
  },
];

export default function CapabilitiesSection() {
  return (
    <section
      aria-labelledby="capabilities-heading"
      className="w-full bg-surface"
    >
      <div className="mx-auto max-w-[1400px] px-6 py-24 lg:py-32">
        <Reveal>
          <div className="grid gap-6 md:grid-cols-12 md:items-end">
            <div className="md:col-span-7">
              <span
                className="rv inline-flex items-center text-xs font-semibold uppercase tracking-[0.16em] text-accent-dark"
                style={delayStyle(0)}
              >
                Capabilities
              </span>
              <h2
                id="capabilities-heading"
                className="rv mt-5 text-[clamp(1.9rem,1rem+2.4vw,2.75rem)] font-bold leading-[1.15] tracking-tight text-foreground"
                style={delayStyle(80)}
              >
                A focused, modern toolset—used with intent.
              </h2>
            </div>
            <p
              className="rv text-base leading-relaxed text-muted md:col-span-5"
              style={delayStyle(160)}
            >
              We work with dependable, well-supported technology and choose each
              piece for the job in front of it—never for novelty.
            </p>
          </div>

          {/* Capability specification matrix */}
          <div
            className="rv mt-14 grid grid-cols-1 gap-px overflow-hidden rounded-sm border border-border bg-border sm:grid-cols-2 lg:grid-cols-4"
            style={delayStyle(240)}
          >
            {GROUPS.map((group) => (
              <div key={group.label} className="bg-white p-6 sm:p-7">
                <h3 className="font-mono text-[11px] uppercase tracking-[0.14em] text-muted">
                  {group.label}
                </h3>
                <ul className="mt-4 space-y-2.5">
                  {group.items.map((item) => (
                    <li
                      key={item}
                      className="flex items-center gap-2.5 text-sm font-medium text-foreground"
                    >
                      <span
                        className="h-1 w-1 shrink-0 rounded-full bg-accent"
                        aria-hidden="true"
                      />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
