import Reveal from "@/components/Reveal";

function delayStyle(ms: number): React.CSSProperties {
  return { "--reveal-delay": `${ms}ms` } as React.CSSProperties;
}

const PRINCIPLES = [
  {
    title: "One connected architecture",
    body: "Each part is designed to work with the others, not bolted on afterward.",
  },
  {
    title: "Fewer manual handoffs",
    body: "Automation carries information between systems so your team stops moving it by hand.",
  },
  {
    title: "Built to evolve",
    body: "New tools and requirements slot into the same structure as the business grows.",
  },
];

/** A node marker + label on the systems map. Labels stay short so they remain
 *  legible as the SVG scales; the readable narrative lives in the HTML copy. */
function Node({
  x,
  y,
  label,
  labelY,
  delay,
  hub = false,
  status = false,
}: {
  x: number;
  y: number;
  label: string;
  labelY: number;
  delay: number;
  hub?: boolean;
  status?: boolean;
}) {
  return (
    <g className="rv-fade" style={delayStyle(delay)}>
      {(hub || status) && (
        <circle
          cx={x}
          cy={y}
          r={12}
          fill="none"
          stroke={status ? "var(--accent)" : "var(--border)"}
          strokeWidth={1.5}
        />
      )}
      <circle
        cx={x}
        cy={y}
        r={6}
        className={status ? "sys-status-node" : undefined}
        style={status ? delayStyle(1600) : undefined}
        fill={status ? undefined : "var(--foreground)"}
      />
      <text
        x={x}
        y={labelY}
        textAnchor="middle"
        fontSize={17}
        fontWeight={600}
        fill="var(--foreground)"
      >
        {label}
      </text>
    </g>
  );
}

export default function SystemMapSection() {
  return (
    <section
      aria-labelledby="system-heading"
      className="w-full bg-surface"
    >
      <div className="mx-auto max-w-[1400px] px-6 py-24 lg:py-32">
        <Reveal>
          {/* Intro */}
          <div className="max-w-2xl">
            <span
              className="rv inline-flex items-center text-xs font-semibold uppercase tracking-[0.16em] text-accent-dark"
              style={delayStyle(0)}
            >
              One Connected System
            </span>
            <h2
              id="system-heading"
              className="rv mt-5 text-[clamp(1.9rem,1rem+2.4vw,2.75rem)] font-bold leading-[1.15] tracking-tight text-foreground"
              style={delayStyle(80)}
            >
              Your website should not operate alone.
            </h2>
            <p
              className="rv mt-5 text-base leading-relaxed text-muted"
              style={delayStyle(160)}
            >
              We connect customer experiences, automation, integrations and
              internal systems into one dependable foundation—so the whole
              operation moves together instead of in fragments.
            </p>
          </div>

          {/* Systems map panel */}
          <div
            className="rv relative mt-12 border border-border bg-white px-5 py-8 sm:px-10 sm:py-10"
            style={delayStyle(220)}
          >
            <span
              className="pointer-events-none absolute -top-3 left-6 hidden bg-surface px-2 font-mono text-[10px] uppercase tracking-[0.14em] text-muted sm:block"
              aria-hidden="true"
            >
              System Architecture / 01—05
            </span>

            <svg
              viewBox="0 0 660 300"
              className="h-auto w-full"
              role="img"
              aria-label="A connected system architecture: the website and digital experience link through an automation engine and integration layer to a data and infrastructure core, with an ongoing optimization and support node."
            >
              {/* faint structural grid */}
              <g
                className="rv-fade"
                style={delayStyle(0)}
                stroke="var(--border)"
                strokeWidth={1}
                opacity={0.5}
              >
                <line x1="110" y1="40" x2="110" y2="260" />
                <line x1="220" y1="40" x2="220" y2="260" />
                <line x1="330" y1="40" x2="330" y2="260" />
                <line x1="440" y1="40" x2="440" y2="260" />
                <line x1="550" y1="40" x2="550" y2="260" />
                <line x1="40" y1="80" x2="620" y2="80" />
                <line x1="40" y1="220" x2="620" y2="220" />
              </g>

              {/* backbone spine */}
              <path
                d="M60 150 H600"
                fill="none"
                stroke="var(--border)"
                strokeWidth={2}
                pathLength={1}
                className="rv-draw"
                style={delayStyle(200)}
              />

              {/* branch stubs to raised / lowered nodes */}
              <path
                d="M220 150 V92"
                fill="none"
                stroke="var(--border)"
                strokeWidth={1.5}
                pathLength={1}
                className="rv-draw"
                style={delayStyle(560)}
              />
              <path
                d="M460 150 V208"
                fill="none"
                stroke="var(--border)"
                strokeWidth={1.5}
                pathLength={1}
                className="rv-draw"
                style={delayStyle(680)}
              />

              {/* slow green data pulse along the settled spine */}
              <path
                d="M60 150 H600"
                fill="none"
                stroke="var(--accent)"
                strokeWidth={2}
                strokeLinecap="round"
                pathLength={1}
                className="sys-flow"
              />

              {/* nodes */}
              <Node x={95} y={150} label="Website" labelY={180} delay={420} />
              <Node
                x={220}
                y={80}
                label="Automation"
                labelY={62}
                delay={520}
              />
              <Node
                x={340}
                y={150}
                label="Integration"
                labelY={180}
                delay={620}
                hub
              />
              <Node
                x={460}
                y={220}
                label="Data & Infra"
                labelY={250}
                delay={720}
              />
              <Node
                x={600}
                y={150}
                label="Support"
                labelY={180}
                delay={820}
                status
              />
            </svg>
          </div>

          {/* Three system principles */}
          <ul className="mt-12 grid gap-px overflow-hidden rounded-sm border border-border bg-border sm:grid-cols-3">
            {PRINCIPLES.map((p, i) => (
              <li
                key={p.title}
                className="rv bg-white p-6"
                style={delayStyle(300 + i * 90)}
              >
                <span
                  className="block h-px w-8 bg-accent"
                  aria-hidden="true"
                />
                <h3 className="mt-4 text-base font-semibold text-foreground">
                  {p.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">
                  {p.body}
                </p>
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </section>
  );
}
