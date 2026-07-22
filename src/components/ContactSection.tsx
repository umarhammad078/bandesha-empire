import ContactForm from "@/components/ContactForm";
import Reveal from "@/components/Reveal";

function delayStyle(ms: number): React.CSSProperties {
  return { "--reveal-delay": `${ms}ms` } as React.CSSProperties;
}

const ASSURANCES = [
  "A direct reply from the people who do the work",
  "A clear read on scope before anything is quoted",
  "No obligation and no pushy follow-ups",
];

export default function ContactSection() {
  return (
    <section
      id="contact"
      aria-labelledby="contact-heading"
      className="w-full border-t border-border bg-surface"
    >
      <div className="mx-auto max-w-[1400px] px-6 py-24 lg:py-32">
        <Reveal>
          <div className="grid gap-12 lg:grid-cols-[42fr_58fr] lg:items-start lg:gap-16">
            {/* Intro */}
            <div className="lg:sticky lg:top-28">
              <div className="rv" style={delayStyle(0)}>
                <span className="inline-flex items-center text-xs font-semibold uppercase tracking-[0.16em] text-accent-dark">
                  Start a Project
                </span>
                <h2
                  id="contact-heading"
                  className="mt-5 text-[clamp(1.9rem,1rem+2.4vw,2.75rem)] font-bold leading-[1.15] tracking-tight text-foreground"
                >
                  Tell us what you are building.
                </h2>
                <p className="mt-5 max-w-md text-base leading-relaxed text-muted">
                  Share a little about the work—what it is, where it is stuck,
                  or where you want to take it. We will come back with a clear,
                  practical view of how to move forward.
                </p>
              </div>

              <ul
                className="rv mt-8 space-y-3 border-t border-border pt-6"
                style={delayStyle(90)}
              >
                {ASSURANCES.map((item) => (
                  <li
                    key={item}
                    className="flex items-start gap-3 text-sm leading-relaxed text-muted"
                  >
                    <span
                      className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-accent"
                      aria-hidden="true"
                    />
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            {/* Form */}
            <div className="rv" style={delayStyle(120)}>
              <ContactForm />
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
