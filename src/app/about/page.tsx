import type { Metadata } from "next";
import Link from "next/link";
import AboutWorldReachMap from "@/components/AboutWorldReachMap";
import Reveal from "@/components/Reveal";
import SiteFooter from "@/components/SiteFooter";

export const metadata: Metadata = {
  title: "About Us",
  description:
    "Meet Bandesha Empire, a Pakistan-based digital systems studio building websites, web applications, AI automations and connected systems for businesses worldwide.",
  alternates: {
    canonical: "/about",
  },
};

const EXPERTISE_SERVICES = [
  {
    index: "01",
    title: "Website & Experience",
    meta: "Strategy · UX · Development",
    text: "High-trust websites shaped around clear positioning, purposeful journeys and measurable business action.",
  },
  {
    index: "02",
    title: "Web Applications",
    meta: "Products · Portals · Platforms",
    text: "Dependable digital products that turn complex workflows into focused, intuitive tools people can use confidently.",
  },
  {
    index: "03",
    title: "AI Agents & Automation",
    meta: "Agents · Workflows · Intelligence",
    text: "Practical AI systems that handle repetitive work, connect decisions and keep teams focused on higher-value activity.",
  },
  {
    index: "04",
    title: "Shopify & Commerce",
    meta: "Storefronts · Conversion · Operations",
    text: "Commerce experiences built for confident buying, efficient management and growth without operational friction.",
  },
  {
    index: "05",
    title: "Mobile Applications",
    meta: "iOS · Android · Cross-platform",
    text: "Polished mobile products with responsive interactions, resilient architecture and one coherent product experience.",
  },
  {
    index: "06",
    title: "Connected Systems",
    meta: "APIs · Data · Infrastructure",
    text: "Integrations and shared infrastructure that move reliable information across every important part of the business.",
  },
] as const;

const STUDIO_METRICS = [
  {
    value: "200+",
    label: "Successful projects",
  },
  {
    value: "Worldwide",
    label: "Client collaboration",
  },
  {
    value: "End-to-end",
    label: "Delivery model",
  },
  {
    value: "01",
    label: "Accountable partner",
  },
] as const;

const STUDIO_PROOF = [
  {
    value: "200+",
    label: "Successful projects",
    detail: "Websites, applications, automation and connected digital systems.",
  },
  {
    value: "Worldwide",
    label: "Client collaboration",
    detail: "Direct remote delivery across markets, teams and time zones.",
  },
  {
    value: "End-to-end",
    label: "Delivery ownership",
    detail: "One accountable partner from the first decision through support.",
  },
] as const;

const PROOF_SIGNALS = [
  "Strategy, design and engineering stay connected from brief to release.",
  "Every build is structured for clear ownership after launch.",
  "Progress remains visible, decisions stay documented and hand-offs stay minimal.",
] as const;

const ABOUT_TESTIMONIALS = [
  {
    quote:
      "Bandesha Empire listened before changing a thing. They understood how our team actually works, then built automation that handles routine hand-offs quietly in the background. We now have a clearer view of every enquiry, and far fewer follow-ups slip through the gaps.",
    name: "Lucas Almeida",
    role: "Growth Operations Lead",
    company: "Verde Logistics · Brazil",
    initials: "LA",
    service: "AI & automation",
  },
  {
    quote:
      "Bandesha Empire brought structure to a complicated brief. Decisions were documented, progress stayed visible and the finished platform is genuinely easy to extend.",
    name: "Daniel Weber",
    role: "Product Director",
    company: "Kern Systems · Germany",
    initials: "DW",
    service: "Web platform",
  },
  {
    quote:
      "We did not just receive a polished website. We received a clearer story, a stronger enquiry journey and a system our internal team actually understands.",
    name: "Hannah Brooks",
    role: "Marketing Manager",
    company: "Northwind Retail · Canada",
    initials: "HB",
    service: "Website development",
  },
] as const;

const STUDIO_JOURNEY = [
  {
    index: "01 / 03",
    phase: "Foundation",
    title: "Built around a simple promise: own the outcome.",
    text: "Bandesha Empire began with a direct way of working—understand the real business need, communicate clearly and stay responsible for the result. That standard still shapes every engagement.",
    signal: "Clarity before complexity",
  },
  {
    index: "02 / 03",
    phase: "Evolution",
    title: "From individual builds to connected business systems.",
    text: "Websites, applications and automations create more value when they work together. The studio evolved around that idea—bringing strategy, experience and engineering into one continuous delivery model.",
    signal: "One direction across every layer",
  },
  {
    index: "03 / 03",
    phase: "Worldwide",
    title: "Pakistan based. Designed for borderless collaboration.",
    text: "Today, Bandesha Empire works with clients worldwide through focused remote collaboration, senior ownership and systems designed to keep improving long after launch.",
    signal: "Global reach, direct ownership",
  },
] as const;

export default function AboutPage() {
  return (
    <>
      <main className="about-page">
        <section id="about-page" className="about-editorial-hero">
          <div className="about-page-shell">
            <div className="about-editorial-heading-grid">
              <div className="about-editorial-heading">
                <p className="about-page-kicker">
                  <span aria-hidden="true" />
                  About Bandesha Empire
                </p>
                <h1>
                  The studio that turns business ambition into <em>one working system.</em>
                </h1>
              </div>
              <div className="about-editorial-intro">
                <p>
                  Bandesha Empire is a digital systems studio based in Pakistan
                  and working worldwide. We design and build websites, web
                  applications, AI automations and connected operations for
                  businesses that need their digital work to perform—not just
                  look finished.
                </p>
                <p>
                  Senior thinking, direct collaboration and dependable
                  engineering—from the first decision to the next stage of
                  growth.
                </p>
              </div>
            </div>

            <div className="about-editorial-metrics" aria-label="Bandesha Empire delivery record">
              {STUDIO_METRICS.map((metric) => (
                <div key={metric.label}>
                  <strong>{metric.value}</strong>
                  <span>{metric.label}</span>
                </div>
              ))}
            </div>

            <AboutWorldReachMap />
          </div>
        </section>

        <Reveal as="section" id="studio-journey" className="about-editorial-story about-journey">
          <div className="about-journey-ambient" aria-hidden="true" />
          <div className="about-page-shell about-editorial-story-grid about-journey-grid">
            <div className="about-editorial-story-heading about-journey-heading rv-up">
              <p className="about-page-kicker">
                <span aria-hidden="true" />
                How it started
              </p>
              <h2>How did Bandesha Empire become a systems studio?</h2>
              <p>
                Not through layers, shortcuts or chasing volume. The studio
                grew around one standard: make the work clearer, connect every
                decision and remain accountable for what goes live.
              </p>
              <div className="about-journey-origin">
                <span>Operating from</span>
                <strong>Pakistan · Working worldwide</strong>
                <small>Direct collaboration. Senior delivery.</small>
              </div>
            </div>

            <div className="about-journey-content">
              <div className="about-editorial-timeline about-journey-timeline">
                {STUDIO_JOURNEY.map((item, index) => (
                  <article className={`rv-up rv-d${index + 1}`} key={item.index}>
                    <div className="about-editorial-timeline-rail" aria-hidden="true">
                      <i />
                    </div>
                    <div className="about-editorial-timeline-copy">
                      <div>
                        <span>{item.index}</span>
                        <small>{item.phase}</small>
                      </div>
                      <h3>{item.title}</h3>
                      <p>{item.text}</p>
                      <div className="about-journey-signal">
                        <i aria-hidden="true" />
                        {item.signal}
                      </div>
                    </div>
                  </article>
                ))}
              </div>

              <blockquote className="about-journey-quote rv-up">
                <span aria-hidden="true">“</span>
                <p>
                  Every build should leave the business clearer, stronger and
                  easier to run than it was before.
                </p>
                <footer>
                  <strong>Umar Hammad</strong>
                  <small>Chief Executive Officer</small>
                </footer>
              </blockquote>
            </div>
          </div>
        </Reveal>

        <Reveal as="section" id="expertise" className="about-page-method about-expertise">
          <div className="about-expertise-ambient" aria-hidden="true" />
          <div className="about-page-shell">
            <div className="about-expertise-heading rv-up">
              <div>
                <p className="about-page-kicker">
                  <span aria-hidden="true" />
                  Our expertise
                </p>
                <h2>One studio for every layer of your digital business.</h2>
              </div>
              <div className="about-expertise-intro">
                <p>
                  We bring strategy, experience and engineering into one
                  accountable team—so every new capability strengthens the
                  system around it.
                </p>
                <Link href="/services" className="about-expertise-all">
                  Explore all services
                  <span aria-hidden="true">↗</span>
                </Link>
              </div>
            </div>

            <div className="about-expertise-list">
              {EXPERTISE_SERVICES.map((service) => (
                <Link
                  href="/#contact"
                  className="about-expertise-row rv-up"
                  key={service.index}
                  aria-label={`Discuss ${service.title}`}
                >
                  <span className="about-expertise-index">{service.index}</span>
                  <div className="about-expertise-name">
                    <small>{service.meta}</small>
                    <h3>{service.title}</h3>
                  </div>
                  <p>{service.text}</p>
                  <span className="about-expertise-arrow" aria-hidden="true">
                    ↗
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </Reveal>

        <Reveal as="section" id="studio-proof" className="about-proof">
          <div className="about-proof-ambient" aria-hidden="true" />
          <div className="about-page-shell about-proof-inner">
            <div className="about-proof-main">
              <div className="about-proof-heading rv-up">
                <p className="about-page-kicker about-proof-kicker">
                  <span aria-hidden="true" />
                  By the numbers
                </p>
                <h2>Evidence over promises.</h2>
                <p>
                  The clearest measure of our work is what remains after
                  launch: a stronger system, a team with real ownership and a
                  business ready for its next move.
                </p>
              </div>

              <div className="about-proof-metrics" aria-label="Bandesha Empire proof points">
                <article className="about-proof-card about-proof-card-primary rv-up rv-d1">
                  <strong>{STUDIO_PROOF[0].value}</strong>
                  <span>{STUDIO_PROOF[0].label}</span>
                  <p>{STUDIO_PROOF[0].detail}</p>
                </article>
                <div className="about-proof-card-stack">
                  {STUDIO_PROOF.slice(1).map((proof, index) => (
                    <article className={`about-proof-card rv-up rv-d${index + 2}`} key={proof.label}>
                      <div>
                        <strong>{proof.value}</strong>
                        <span>{proof.label}</span>
                      </div>
                      <p>{proof.detail}</p>
                    </article>
                  ))}
                </div>
              </div>
            </div>

            <div className="about-proof-signals">
              {PROOF_SIGNALS.map((signal) => (
                <div className="rv-up" key={signal}>
                  <i aria-hidden="true" />
                  <p>{signal}</p>
                </div>
              ))}
            </div>
          </div>
        </Reveal>

        <Reveal as="section" id="leadership" className="about-page-leadership">
          <div className="about-page-shell">
            <header className="about-page-leadership-heading rv-up">
              <div>
                <p className="about-page-kicker">The people</p>
                <h2>The mind behind Bandesha Empire.</h2>
              </div>
            </header>

            <div className="about-page-leadership-grid">
              <div className="about-page-leader-visual rv-up rv-d1" aria-hidden="true">
                <span className="about-page-leader-visual-label">Executive direction</span>
                <div className="about-page-leader-ring" />
                <div className="about-page-leader-mark">
                  <small>Chief Executive Officer</small>
                  <strong>UH</strong>
                </div>
                <div className="about-page-leader-visual-meta">
                  <strong>Umar Hammad</strong>
                  <span>Pakistan · Working worldwide</span>
                </div>
              </div>

              <div className="about-page-leader-copy rv-up rv-d2">
                <p className="about-page-kicker">Founder-led studio</p>
                <h2>Clear thinking. Direct ownership.</h2>
                <h3>Umar Hammad · Chief Executive Officer</h3>
                <blockquote>
                  “Understand the business clearly, make the right decisions
                  visible and build systems that keep earning their place after
                  launch.”
                </blockquote>
                <p>
                  Umar leads Bandesha Empire&apos;s strategy, delivery standards and
                  client communication. He stays close to the work so decisions
                  move quickly, context stays intact and responsibility never
                  disappears between layers.
                </p>
                <div className="about-page-leader-focus" aria-label="Leadership principles">
                  <span>Strategy-led</span>
                  <span>Direct communication</span>
                  <span>Delivery ownership</span>
                </div>
                <div className="about-page-leader-links">
                  <a href="mailto:bandeshaempire@gmail.com">
                    Email the studio <span aria-hidden="true">↗</span>
                  </a>
                  <a href="https://wa.me/923023634078" target="_blank" rel="noreferrer">
                    Start on WhatsApp <span aria-hidden="true">↗</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </Reveal>

        <Reveal as="section" id="client-voices" className="about-voices">
          <div className="about-voices-ambient" aria-hidden="true" />
          <div className="about-page-shell about-voices-inner">
            <header className="about-voices-header rv-up">
              <p className="about-page-kicker">Client voices</p>
              <span aria-hidden="true">“</span>
            </header>

            <article className="about-voices-featured rv-up rv-d1">
              <blockquote>“{ABOUT_TESTIMONIALS[0].quote}”</blockquote>
              <footer>
                <span className="about-voices-avatar" aria-hidden="true">
                  {ABOUT_TESTIMONIALS[0].initials}
                </span>
                <div>
                  <strong>{ABOUT_TESTIMONIALS[0].name}</strong>
                  <small>{ABOUT_TESTIMONIALS[0].role}</small>
                  <small>{ABOUT_TESTIMONIALS[0].company}</small>
                </div>
                <span className="about-voices-stars" aria-label="Five out of five stars">
                  ★★★★★
                </span>
              </footer>
            </article>

            <div className="about-voices-supporting">
              {ABOUT_TESTIMONIALS.slice(1).map((review, index) => (
                <article className={`rv-up rv-d${index + 2}`} key={review.name}>
                  <div className="about-voices-card-top">
                    <span className="about-voices-stars" aria-label="Five out of five stars">
                      ★★★★★
                    </span>
                    <small>{review.service}</small>
                  </div>
                  <blockquote>“{review.quote}”</blockquote>
                  <footer>
                    <span className="about-voices-avatar" aria-hidden="true">
                      {review.initials}
                    </span>
                    <div>
                      <strong>{review.name}</strong>
                      <small>{review.role}</small>
                      <small>{review.company}</small>
                    </div>
                  </footer>
                </article>
              ))}
            </div>
          </div>
        </Reveal>

        <Reveal
          as="section"
          id="about-invitation"
          className="about-invitation"
          aria-labelledby="about-invitation-heading"
        >
          <span className="about-invitation-orbit" aria-hidden="true" />
          <div className="about-page-shell about-invitation-inner">
            <div className="about-invitation-copy rv-up">
              <p className="about-invitation-kicker">Ready when you are</p>
              <h2 id="about-invitation-heading">
                Let&apos;s build something your business can <span>grow into.</span>
              </h2>
              <p>
                Tell us what needs to work better. We&apos;ll bring a clear point of
                view, a practical scope and senior delivery from the first
                conversation.
              </p>
            </div>

            <div className="about-invitation-actions rv-up rv-d1">
              <Link href="/#contact" className="cta-final-primary about-invitation-action">
                <span>Start a project</span>
                <i aria-hidden="true">
                  <svg viewBox="0 0 18 18" fill="none">
                    <path
                      d="M3.5 9h11M10.5 5l4 4-4 4"
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="1.5"
                    />
                  </svg>
                </i>
              </Link>
              <a
                href="https://wa.me/923023634078?text=Hello%20Bandesha%20Empire%2C%20I%27d%20like%20to%20discuss%20a%20project."
                target="_blank"
                rel="noreferrer"
                className="cta-final-secondary about-invitation-action"
              >
                <span>Discuss your vision</span>
                <i aria-hidden="true">
                  <svg viewBox="0 0 18 18" fill="none">
                    <path
                      d="M3.5 9h11M10.5 5l4 4-4 4"
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="1.5"
                    />
                  </svg>
                </i>
              </a>
            </div>
          </div>
        </Reveal>
      </main>
      <SiteFooter />
    </>
  );
}
