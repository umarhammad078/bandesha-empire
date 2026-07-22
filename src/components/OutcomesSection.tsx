import Reveal from "@/components/Reveal";

function delayStyle(ms: number): React.CSSProperties {
  return { "--reveal-delay": `${ms}ms` } as React.CSSProperties;
}

const OUTCOMES = [
  {
    kicker: "Experience",
    title: "Clearer customer journeys",
    body: "Visitors move from first impression to action without friction, confusion or dead ends.",
  },
  {
    kicker: "Operations",
    title: "Faster internal handoffs",
    body: "Information moves between tools automatically, so work stops stalling on manual steps.",
  },
  {
    kicker: "Engineering",
    title: "Maintainable digital products",
    body: "Clean structure and sensible tooling keep changes quick instead of risky.",
  },
  {
    kicker: "Scale",
    title: "Room to grow",
    body: "New features and higher demand fit the existing foundation rather than forcing a rebuild.",
    final: true,
  },
];

export default function OutcomesSection() {
  return (
    <section
      aria-labelledby="outcomes-heading"
      className="w-full bg-background"
    >
      <div className="mx-auto max-w-[1400px] px-6 py-24 lg:py-32">
        <Reveal>
          {/* Editorial header row */}
          <div className="grid gap-6 md:grid-cols-12 md:items-end">
            <div className="md:col-span-7">
              <span
                className="rv inline-flex items-center text-xs font-semibold uppercase tracking-[0.16em] text-accent-dark"
                style={delayStyle(0)}
              >
                What Changes
              </span>
              <h2
                id="outcomes-heading"
                className="rv mt-5 text-[clamp(1.9rem,1rem+2.4vw,2.75rem)] font-bold leading-[1.15] tracking-tight text-foreground"
                style={delayStyle(80)}
              >
                Designed around how the business needs to run.
              </h2>
            </div>
            <p
              className="rv text-base leading-relaxed text-muted md:col-span-5"
              style={delayStyle(160)}
            >
              The point of a well-built system is not the technology. It is a
              business that runs with less friction and more control.
            </p>
          </div>

          {/* Aligned outcome index — one top rule, columns divided by hairlines */}
          <div className="mt-16 grid gap-x-8 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 lg:border-t lg:border-border lg:pt-10">
            {OUTCOMES.map((o, i) => (
              <div
                key={o.title}
                className="rv border-t border-border pt-5 lg:border-l lg:border-t-0 lg:pl-8 lg:pt-0 lg:first:border-l-0 lg:first:pl-0"
                style={delayStyle(240 + i * 90)}
              >
                <span
                  className={`inline-flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.14em] ${
                    o.final ? "text-accent-dark" : "text-muted"
                  }`}
                >
                  {o.final && (
                    <span
                      className="rv-dot-final h-1.5 w-1.5 rounded-full"
                      style={delayStyle(720)}
                      aria-hidden="true"
                    />
                  )}
                  {o.kicker}
                </span>
                <h3 className="mt-4 text-lg font-semibold leading-snug text-foreground">
                  {o.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-muted">
                  {o.body}
                </p>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
