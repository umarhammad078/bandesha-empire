import AboutReveal from "@/components/AboutReveal";
import WorldGlobe from "@/components/WorldGlobe";

function delayStyle(ms: number) {
  return { "--reveal-delay": `${ms}ms` } as React.CSSProperties;
}

const WORLD_PRINCIPLES = [
  {
    label: "Operating principle / 01",
    title: "Fit before features.",
    body: "We understand the workflow, friction and real business objective before deciding what should be designed or automated.",
  },
  {
    label: "Operating principle / 02",
    title: "Clarity at every stage.",
    body: "Decisions stay visible, communication stays direct and the work always has a clear reason for moving forward.",
  },
] as const;

const WORLD_METRICS = [
  {
    index: "01",
    eyebrow: "Project record",
    value: "200+",
    title: "Successful projects completed",
    detail: "Websites, automation and connected digital systems",
  },
  {
    index: "02",
    eyebrow: "Client reach",
    value: "Worldwide",
    title: "Clients supported across markets",
    detail: "Direct remote collaboration without unnecessary layers",
  },
  {
    index: "03",
    eyebrow: "Working model",
    value: "End-to-end",
    title: "One partner from strategy to support",
    detail: "Fewer hand-offs, stronger continuity and clearer ownership",
  },
] as const;

export default function AboutSection() {
  return (
    <section
      id="about"
      aria-labelledby="about-heading"
      className="abt-world-section w-full overflow-hidden"
    >
      <div className="abt-world-grid" aria-hidden="true" />
      <div className="abt-world-ambient abt-world-ambient-one" aria-hidden="true" />
      <div className="abt-world-ambient abt-world-ambient-two" aria-hidden="true" />

      <div className="relative mx-auto max-w-[1500px] px-6 py-24 sm:px-8 lg:px-12 lg:py-32">
        <AboutReveal>
          <header className="abt-world-header abt-reveal" style={delayStyle(0)}>
            <div className="abt-world-eyebrow">
              Proven delivery / Connected by design
            </div>

            <div className="abt-world-intro">
              <h2 id="about-heading">
                Built to work in the real world.
                <span> Wherever opportunity moves.</span>
              </h2>
              <div>
                <p>
                  We combine strategic thinking, careful engineering and
                  direct communication to build digital systems that make
                  sense in the real world, scale confidently and keep
                  improving long after launch.
                </p>
                <span className="abt-world-intro-note">
                  One accountable partner / From first decision to long-term evolution
                </span>
              </div>
            </div>
          </header>

          <div className="abt-world-stage abt-reveal" style={delayStyle(90)}>
            <div className="abt-world-metrics">
              {WORLD_METRICS.map((metric, index) => (
                <article
                  key={metric.index}
                  className="abt-world-metric"
                  style={delayStyle(150 + index * 90)}
                >
                  <div className="abt-world-metric-meta">
                    <span>{metric.index}</span>
                    <span>{metric.eyebrow}</span>
                  </div>
                  <strong
                    className={
                      metric.value === "200+"
                        ? "abt-world-metric-value"
                        : "abt-world-metric-value abt-world-metric-value-word"
                    }
                  >
                    {metric.value}
                  </strong>
                  <h3>{metric.title}</h3>
                  <p>{metric.detail}</p>
                </article>
              ))}
            </div>

            <div className="abt-world-composition">
              <aside
                className="abt-world-callout abt-world-callout-left abt-row"
                style={delayStyle(190)}
              >
                <span>{WORLD_PRINCIPLES[0].label}</span>
                <h3>{WORLD_PRINCIPLES[0].title}</h3>
                <p>{WORLD_PRINCIPLES[0].body}</p>
                <div aria-hidden="true">
                  <i />
                </div>
              </aside>

              <div className="abt-world-globe-shell">
                <WorldGlobe />

                <span className="abt-world-coordinate abt-world-coordinate-top">
                  24.8607° N / Connected systems
                </span>
                <span className="abt-world-coordinate abt-world-coordinate-bottom">
                  Strategy · Product · Automation · Support
                </span>

                <div className="abt-world-status">
                  <div>
                    <small>Global operating view</small>
                    <strong>Systems in motion</strong>
                  </div>
                  <b>LIVE</b>
                </div>
              </div>

              <aside
                className="abt-world-callout abt-world-callout-right abt-row"
                style={delayStyle(290)}
              >
                <span>{WORLD_PRINCIPLES[1].label}</span>
                <h3>{WORLD_PRINCIPLES[1].title}</h3>
                <p>{WORLD_PRINCIPLES[1].body}</p>
                <div aria-hidden="true">
                  <i />
                </div>
              </aside>
            </div>

            <div className="abt-world-footer">
              <div>
                Connected from strategy to support
              </div>
              <p>
                Purpose-built systems / Maintainable foundations / Measured evolution
              </p>
              <strong>Built beyond launch.</strong>
            </div>
          </div>
        </AboutReveal>
      </div>
    </section>
  );
}
