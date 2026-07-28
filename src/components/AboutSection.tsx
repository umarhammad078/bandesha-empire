import AboutReveal from "@/components/AboutReveal";
import WorldGlobe from "@/components/WorldGlobe";

function delayStyle(ms: number) {
  return { "--reveal-delay": `${ms}ms` } as React.CSSProperties;
}

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

      <div className="relative mx-auto max-w-[1500px] px-6 py-24 sm:px-8 lg:px-12 lg:py-32">
        <AboutReveal>
          <div className="abt-world-stage abt-reveal" style={delayStyle(0)}>
            <h2
              id="about-heading"
              className="abt-world-global-message abt-row"
              style={delayStyle(70)}
            >
              We provide services to clients across{" "}
              <span>all seven continents.</span>
            </h2>

            <div className="abt-world-composition">
              <div className="abt-world-globe-shell">
                <WorldGlobe />
              </div>
            </div>

            <div
              id="about-metrics"
              className="abt-world-metrics"
              aria-label="Delivery record"
            >
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
          </div>
        </AboutReveal>
      </div>
    </section>
  );
}
