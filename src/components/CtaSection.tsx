import Reveal from "@/components/Reveal";

function ArrowIcon() {
  return (
    <svg viewBox="0 0 18 18" fill="none" aria-hidden="true">
      <path
        d="M3.5 9h11M10.5 5l4 4-4 4"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.5"
      />
    </svg>
  );
}

export default function CtaSection() {
  return (
    <section
      id="pricing"
      aria-labelledby="cta-heading"
      className="cta-final-section"
    >
      <Reveal>
        <div className="rv cta-final-panel">
          <span id="contact" className="cta-final-contact-anchor" aria-hidden="true" />
          <span className="cta-final-orbit" aria-hidden="true" />
          <span className="cta-final-sheen" aria-hidden="true" />

          <div className="cta-final-content">
            <span className="cta-final-rule" aria-hidden="true" />
            <span className="cta-final-eyebrow">Ready when you are</span>

            <h2 id="cta-heading">
              Let&apos;s build the system
              <span> your business can grow into.</span>
            </h2>

            <p>
              Tell us where the work is slowing down—or where you want to go next.
              We&apos;ll return with a clear point of view, a practical scope and the
              right next step.
            </p>

            <div className="cta-final-actions">
              <a href="#contact" className="cta-final-primary">
                <span>Start a project</span>
                <i aria-hidden="true">
                  <ArrowIcon />
                </i>
              </a>
              <a href="#contact" className="cta-final-secondary">
                <span>Discuss your vision</span>
                <i aria-hidden="true">
                  <ArrowIcon />
                </i>
              </a>
            </div>

            <div className="cta-final-assurances" aria-label="How we work">
              <span><i aria-hidden="true" />Clear scope</span>
              <span><i aria-hidden="true" />Senior-led delivery</span>
              <span><i aria-hidden="true" />Built to evolve</span>
            </div>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
