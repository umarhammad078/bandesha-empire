import ProcessReveal from "@/components/ProcessReveal";

function delayStyle(ms: number) {
  return { "--reveal-delay": `${ms}ms` } as React.CSSProperties;
}

type ProcessGlyphType = "radar" | "architecture" | "build" | "evolve";

function ProcessGlyph({ type }: { type: ProcessGlyphType }) {
  if (type === "radar") {
    return (
      <svg viewBox="0 0 48 48" fill="none" aria-hidden="true">
        <circle cx="24" cy="24" r="14" stroke="currentColor" strokeWidth="1.5" />
        <circle cx="24" cy="24" r="7" stroke="currentColor" strokeWidth="1.5" opacity="0.55" />
        <path d="M24 7V41M7 24H41" stroke="currentColor" strokeWidth="1.5" opacity="0.28" />
        <path d="M24 24 34 14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        <circle className="proc-glyph-signal" cx="34" cy="14" r="3.5" fill="var(--accent)" />
      </svg>
    );
  }

  if (type === "architecture") {
    return (
      <svg viewBox="0 0 48 48" fill="none" aria-hidden="true">
        <rect x="8" y="9" width="32" height="30" rx="3" stroke="currentColor" strokeWidth="1.5" />
        <path d="M18 9V39M30 9V39M8 20H40M8 30H40" stroke="currentColor" strokeWidth="1.5" opacity="0.3" />
        <path d="M13 33 22 24 28 28 36 16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        <circle className="proc-glyph-signal" cx="36" cy="16" r="3.5" fill="var(--accent)" />
      </svg>
    );
  }

  if (type === "build") {
    return (
      <svg viewBox="0 0 48 48" fill="none" aria-hidden="true">
        <path d="M16 10H10V38H16M32 10H38V38H32" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        <rect x="18" y="14" width="12" height="6" rx="2" stroke="currentColor" strokeWidth="1.5" />
        <rect x="18" y="22" width="12" height="6" rx="2" stroke="currentColor" strokeWidth="1.5" opacity="0.65" />
        <rect x="18" y="30" width="12" height="6" rx="2" stroke="currentColor" strokeWidth="1.5" opacity="0.38" />
        <circle className="proc-glyph-signal" cx="30" cy="17" r="3.5" fill="var(--accent)" />
      </svg>
    );
  }

  return (
    <svg viewBox="0 0 48 48" fill="none" aria-hidden="true">
      <path d="M37 20A14 14 0 1 0 38 29" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
      <path d="M32 13H39V20" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M17 29 22 24 27 27 35 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <circle className="proc-glyph-signal" cx="35" cy="18" r="3.5" fill="var(--accent)" />
    </svg>
  );
}

const PROCESS_STAGES = [
  {
    number: "01",
    title: "Discover",
    signal: "Find the real leverage",
    description:
      "We get close to the business, the users and the decisions behind the brief—so the project solves the right problem before momentum begins.",
    outputs: ["Business goal", "User reality", "Success measure"],
    glyph: "radar",
  },
  {
    number: "02",
    title: "Architect",
    signal: "Make complexity legible",
    description:
      "We translate the findings into an experience and technical blueprint with clear priorities, dependable integrations and no hidden assumptions.",
    outputs: ["System blueprint", "Experience flow", "Delivery scope"],
    glyph: "architecture",
  },
  {
    number: "03",
    title: "Build",
    signal: "Turn decisions into product",
    description:
      "Design and engineering move together in focused releases, with visible progress, responsive implementation and quality built into every review.",
    outputs: ["Working releases", "Integrated systems", "Quality assurance"],
    glyph: "build",
  },
  {
    number: "04",
    title: "Evolve",
    signal: "Treat launch as a checkpoint",
    description:
      "We verify the live system, learn from real use and keep improving performance, features and reliability as the business moves forward.",
    outputs: ["Careful launch", "Measured iteration", "Ongoing support"],
    glyph: "evolve",
  },
] as const;

function ArrowIcon() {
  return (
    <svg viewBox="0 0 18 18" width="18" height="18" fill="none" aria-hidden="true">
      <path
        d="M3.5 9H14M10 5l4 4-4 4"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default function ProcessSection() {
  return (
    <section
      id="process"
      aria-labelledby="process-heading"
      className="proc-editorial-section w-full overflow-hidden"
    >
      <div className="proc-editorial-glow" aria-hidden="true" />

      <div className="relative mx-auto max-w-[1500px] px-6 py-24 sm:px-8 lg:px-12 lg:py-32">
        <ProcessReveal>
          <header className="proc-manifest proc-reveal" style={delayStyle(0)}>
            <div>
              <div className="proc-manifest-eyebrow">
                <span aria-hidden="true">
                  <i />
                  <i />
                </span>
                Delivery model / How we build
              </div>
              <h2 id="process-heading">
                Good work is a sequence of
                <span> better decisions.</span>
              </h2>
            </div>

            <div className="proc-manifest-note">
              <p>
                No black-box hand-offs and no theatre. Strategy, design and
                engineering stay connected from the first conversation to the
                first real users—and beyond.
              </p>
              <dl>
                <div>
                  <dt>01</dt>
                  <dd>Clear gates</dd>
                </div>
                <div>
                  <dt>02</dt>
                  <dd>Visible progress</dd>
                </div>
                <div>
                  <dt>03</dt>
                  <dd>One accountable team</dd>
                </div>
              </dl>
            </div>
          </header>

          <div className="proc-deck proc-reveal" style={delayStyle(90)}>
            <div className="proc-deck-topbar">
              <span>
                <i aria-hidden="true" />
                Project operating system
              </span>
              <span>Strategy · Experience · Engineering · Evolution</span>
            </div>

            <ol className="proc-chapters">
              {PROCESS_STAGES.map((stage, index) => (
                <li
                  key={stage.number}
                  className="proc-chapter proc-stage"
                  style={delayStyle(170 + index * 95)}
                >
                  <div className="proc-chapter-top">
                    <span className="proc-chapter-number" aria-hidden="true">
                      {stage.number}
                    </span>
                    <span className="proc-glyph">
                      <ProcessGlyph type={stage.glyph} />
                    </span>
                  </div>

                  <span className="proc-chapter-signal">{stage.signal}</span>
                  <h3>{stage.title}</h3>
                  <p>{stage.description}</p>

                  <div className="proc-chapter-output">
                    <span>What leaves this phase</span>
                    <ul>
                      {stage.outputs.map((output) => (
                        <li key={output}>{output}</li>
                      ))}
                    </ul>
                  </div>
                </li>
              ))}
            </ol>

            <div className="proc-deck-progress" aria-hidden="true">
              {PROCESS_STAGES.map((stage, index) => (
                <span
                  key={stage.number}
                  className="proc-deck-progress-segment"
                  style={delayStyle(400 + index * 120)}
                />
              ))}
            </div>
          </div>

          <div className="proc-outcome-band proc-reveal" style={delayStyle(520)}>
            <div className="proc-outcome-marker" aria-hidden="true">
              <span>∞</span>
            </div>
            <div>
              <span className="proc-outcome-label">The operating principle</span>
              <strong>Clarity stays connected to execution.</strong>
            </div>
            <p>
              Launch is a checkpoint—not the end of the relationship.
            </p>
            <a href="#contact">
              Discuss your project
              <span aria-hidden="true">
                <ArrowIcon />
              </span>
            </a>
          </div>
        </ProcessReveal>
      </div>
    </section>
  );
}
