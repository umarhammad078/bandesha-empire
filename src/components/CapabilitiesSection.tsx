import Reveal from "@/components/Reveal";

function delayStyle(ms: number): React.CSSProperties {
  return { "--reveal-delay": `${ms}ms` } as React.CSSProperties;
}

const CAPABILITIES = [
  "Next.js",
  "React",
  "TypeScript",
  "Tailwind CSS",
  "Supabase",
  "Vercel",
  "API Integrations",
  "AI Workflows",
  "Automation Systems",
  "Responsive Interfaces",
  "Performance Optimization",
  "Accessibility",
];

function Chip({ label }: { label: string }) {
  return (
    <span className="inline-flex shrink-0 items-center gap-2 border border-border bg-white px-4 py-2 text-sm font-medium text-foreground">
      <span
        className="h-1.5 w-1.5 rounded-full bg-accent"
        aria-hidden="true"
      />
      {label}
    </span>
  );
}

export default function CapabilitiesSection() {
  return (
    <section
      aria-labelledby="capabilities-heading"
      className="w-full overflow-hidden bg-surface"
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
        </Reveal>

        {/* Technical marquee index */}
        <div
          className="cap-marquee relative mt-14"
          aria-label="Technologies and capabilities"
        >
          {/* edge fades */}
          <div
            className="pointer-events-none absolute inset-y-0 left-0 z-10 w-16 bg-gradient-to-r from-surface to-transparent"
            aria-hidden="true"
          />
          <div
            className="pointer-events-none absolute inset-y-0 right-0 z-10 w-16 bg-gradient-to-l from-surface to-transparent"
            aria-hidden="true"
          />

          <div className="cap-track gap-3">
            <ul className="flex shrink-0 gap-3 pr-3">
              {CAPABILITIES.map((c) => (
                <li key={c}>
                  <Chip label={c} />
                </li>
              ))}
            </ul>
            <ul className="flex shrink-0 gap-3 pr-3" aria-hidden="true">
              {CAPABILITIES.map((c) => (
                <li key={`dup-${c}`}>
                  <Chip label={c} />
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
