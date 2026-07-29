import Reveal from "@/components/Reveal";

type SystemLayer = {
  key: "experience" | "automation" | "integrations" | "data" | "support";
  title: string;
  signal: string;
  status: string;
};

type SystemStyle = React.CSSProperties & {
  "--sys-delay"?: string;
  "--sys-char-index"?: number;
};

const SYSTEM_HEADING_FIRST = "We bring your business together";
const SYSTEM_HEADING_SECOND = "in one connected system.";

const LAYERS: SystemLayer[] = [
  {
    key: "experience",
    title: "Website & Experience",
    signal: "Every customer touchpoint",
    status: "Live",
  },
  {
    key: "automation",
    title: "Automation",
    signal: "Workflows moving 24/7",
    status: "Running",
  },
  {
    key: "integrations",
    title: "Integrations",
    signal: "Every tool speaking together",
    status: "Synced",
  },
  {
    key: "data",
    title: "Data & Infrastructure",
    signal: "One dependable source",
    status: "Secure",
  },
  {
    key: "support",
    title: "Evolution & Support",
    signal: "The system keeps improving",
    status: "Active",
  },
];

const PRINCIPLES = [
  {
    number: "01",
    title: "One connected operating system",
    body: "Your website, workflows, data and tools work from one dependable foundation—giving every team a clearer view and every decision better context.",
  },
  {
    number: "02",
    title: "A foundation built to evolve",
    body: "New services, channels and automations connect to the same architecture, so growth adds capability without adding chaos or forcing a rebuild.",
  },
];

const PATHS = [
  "M500 300C408 300 344 132 244 132",
  "M500 300C402 300 342 448 244 448",
  "M500 300C590 300 646 132 755 132",
  "M500 300C592 300 650 448 755 448",
];

function revealStyle(delayMs: number): SystemStyle {
  return {
    "--reveal-delay": `${delayMs}ms`,
  } as SystemStyle;
}

function currentStyle(index: number): SystemStyle {
  return {
    "--sys-delay": `${index * -640}ms`,
  };
}

function AnimatedHeadingLine({
  text,
  accent = false,
  startIndex = 0,
}: {
  text: string;
  accent?: boolean;
  startIndex?: number;
}) {
  let characterIndex = startIndex;

  return (
    <span
      className={`sys5-heading-line${accent ? " sys5-heading-accent" : ""}`}
      aria-hidden="true"
    >
      {text.split(" ").map((word, wordIndex) => (
        <span key={`${word}-${wordIndex}`}>
          {wordIndex > 0 ? " " : null}
          <span className="sys5-heading-word">
            {Array.from(word).map((character, index) => {
              const animationIndex = characterIndex;
              characterIndex += 1;

              return (
                <span
                  className="sys5-heading-character"
                  style={{ "--sys-char-index": animationIndex } as SystemStyle}
                  key={`${character}-${index}`}
                >
                  {character}
                </span>
              );
            })}
          </span>
        </span>
      ))}
    </span>
  );
}

function LayerGlyph({ type }: { type: SystemLayer["key"] }) {
  if (type === "experience") {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <rect x="3.5" y="5" width="17" height="14" rx="2.5" />
        <path d="M3.5 9h17M7 7h.01M10 7h.01M8 13h8M8 16h5" />
      </svg>
    );
  }

  if (type === "automation") {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="M13.3 2.8 6.7 13h5.1l-1.1 8.2L17.4 11h-5.1l1-8.2Z" />
      </svg>
    );
  }

  if (type === "integrations") {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <rect x="3.5" y="7.5" width="6" height="6" rx="1.5" />
        <rect x="14.5" y="10.5" width="6" height="6" rx="1.5" />
        <path d="M9.5 10.5h2.25a2.75 2.75 0 0 1 2.75 2.75v.25" />
      </svg>
    );
  }

  if (type === "data") {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <ellipse cx="12" cy="6" rx="7.5" ry="3" />
        <path d="M4.5 6v6c0 1.65 3.36 3 7.5 3s7.5-1.35 7.5-3V6M4.5 12v6c0 1.65 3.36 3 7.5 3s7.5-1.35 7.5-3v-6" />
      </svg>
    );
  }

  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M19.5 8.5V4.8l-2 2A8 8 0 1 0 20 14" />
      <path d="M19.5 4.8h-3.7M8.5 12h7M12 8.5V15.5" />
    </svg>
  );
}

function LayerCard({ layer, index }: { layer: SystemLayer; index: number }) {
  return (
    <article
      className={`sys5-node sys5-node-${layer.key} rv`}
      style={revealStyle(320 + index * 80)}
    >
      <div className="sys5-node-topline">
        <span className="sys5-node-glyph">
          <LayerGlyph type={layer.key} />
        </span>
        <span className="sys5-node-status">
          <i aria-hidden="true" />
          {layer.status}
        </span>
      </div>
      <h3>{layer.title}</h3>
      <p>{layer.signal}</p>
      <span className="sys5-node-index" aria-hidden="true">
        0{index + 1}
      </span>
    </article>
  );
}

function OperatingCore() {
  return (
    <div className="sys5-core rv" style={revealStyle(230)}>
      <span className="sys5-core-orbit sys5-core-orbit-one" aria-hidden="true">
        <i />
      </span>
      <span className="sys5-core-orbit sys5-core-orbit-two" aria-hidden="true">
        <i />
      </span>
      <div className="sys5-core-shell">
        <span className="sys5-core-sheen" aria-hidden="true" />
        <svg viewBox="0 0 64 64" className="sys5-core-glyph" aria-hidden="true">
          <path d="M18 21 32 13l14 8v22l-14 8-14-8V21Z" />
          <circle cx="32" cy="32" r="7" />
          <path d="m18 21 14 11 14-11M32 32v19" />
        </svg>
      </div>
      <div className="sys5-core-copy">
        <small>Operating core</small>
        <strong>All layers connected</strong>
      </div>
    </div>
  );
}

export default function SystemMapSection() {
  return (
    <section
      id="system"
      aria-labelledby="system-heading"
      className="sys5-section scroll-mt-28"
    >
      <div className="sys5-ambient" aria-hidden="true" />
      <div className="sys5-wrap">
        <Reveal threshold={0.08}>
          <div className="sys5-intro">
            <h2
              id="system-heading"
              className="sys5-heading"
              aria-label={`${SYSTEM_HEADING_FIRST} ${SYSTEM_HEADING_SECOND}`}
            >
              <AnimatedHeadingLine text={SYSTEM_HEADING_FIRST} />
              <AnimatedHeadingLine
                text={SYSTEM_HEADING_SECOND}
                accent
                startIndex={SYSTEM_HEADING_FIRST.replaceAll(" ", "").length}
              />
            </h2>
          </div>

          <div
            id="system-network"
            className="sys5-stage rv"
            style={revealStyle(220)}
            role="group"
            aria-label="A live connected operations network linking website experience, automation, integrations, data infrastructure, and ongoing support through one central operating core."
          >
            <div className="sys5-stage-bar" aria-hidden="true">
              <span>
                <i />
                Live operating network
              </span>
              <span>Signal integrity / 100%</span>
            </div>

            <svg
              className="sys5-connectors"
              viewBox="0 0 1000 580"
              preserveAspectRatio="none"
              aria-hidden="true"
            >
              <defs>
                <filter id="sys5-current-glow" x="-30%" y="-30%" width="160%" height="160%">
                  <feGaussianBlur stdDeviation="3.5" result="blur" />
                  <feMerge>
                    <feMergeNode in="blur" />
                    <feMergeNode in="SourceGraphic" />
                  </feMerge>
                </filter>
              </defs>
              {PATHS.map((path, index) => (
                <g key={path}>
                  <path className="sys5-path-ghost" d={path} pathLength="1" />
                  <path
                    className="sys5-path-current"
                    d={path}
                    pathLength="1"
                    style={currentStyle(index)}
                  />
                </g>
              ))}
            </svg>

            <OperatingCore />

            <div className="sys5-node-grid">
              {LAYERS.map((layer, index) => (
                <LayerCard key={layer.key} layer={layer} index={index} />
              ))}
            </div>

            <div className="sys5-stage-foot" aria-hidden="true">
              <span>Experience</span>
              <i />
              <span>Intelligence</span>
              <i />
              <span>Evolution</span>
            </div>
          </div>

          <ol className="sys5-principles">
            {PRINCIPLES.map((principle, index) => (
              <li className="rv" style={revealStyle(360 + index * 90)} key={principle.number}>
                <div>
                  <h3>{principle.title}</h3>
                  <p>{principle.body}</p>
                </div>
              </li>
            ))}
          </ol>
        </Reveal>
      </div>
    </section>
  );
}
