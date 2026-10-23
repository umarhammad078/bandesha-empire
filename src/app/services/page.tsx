import type { Metadata } from "next";
import Link from "next/link";
import BrandMark from "@/components/BrandMark";
import SiteFooter from "@/components/SiteFooter";
import ServicesHero from "./ServicesHero";
import { FAQS, SERVICES } from "./content";
import styles from "./page.module.css";

const DESCRIPTION =
  "Websites, web applications, AI automation, Shopify, mobile apps and connected systems. Explore Bandesha Empire’s services and plan your next digital project.";
const EMAIL = "mailto:bandeshaempire@gmail.com?subject=Let%27s%20plan%20a%20project";
const WHATSAPP =
  "https://wa.me/923023634078?text=Hello%20Bandesha%20Empire%2C%20I%27d%20like%20to%20discuss%20a%20project.";

export const metadata: Metadata = {
  title: "Services",
  description: DESCRIPTION,
  alternates: { canonical: "/services" },
  openGraph: {
    title: "Digital services, connected by design — Bandesha Empire",
    description: DESCRIPTION,
    url: "/services",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Digital services, connected by design — Bandesha Empire",
    description: DESCRIPTION,
    images: ["/services/opengraph-image"],
  },
};

function Arrow({ diagonal = false }: { diagonal?: boolean }) {
  return (
    <svg viewBox="0 0 20 20" fill="none" aria-hidden="true">
      <path
        d={diagonal ? "M5 15 15 5M5 5h10v10" : "M4 10h12m-5-5 5 5-5 5"}
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function Check() {
  return (
    <svg viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <path d="m3.5 8 3 3 6-6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function ServiceGlyph({ type }: { type: string }) {
  const paths: Record<string, React.ReactNode> = {
    websites: <><rect x="4" y="5" width="24" height="22" rx="3" /><path d="M4 11h24M9 8h.1M13 8h.1M9 16h8M9 20h13M9 23h9" /></>,
    "web-apps": <><rect x="4" y="4" width="24" height="24" rx="3" /><path d="M12 4v24M4 11h24M17 17h6M17 22h4" /></>,
    "ai-automation": <><path d="m16 3 3.2 9.8L29 16l-9.8 3.2L16 29l-3.2-9.8L3 16l9.8-3.2L16 3Z" /><path d="m25 3 1 3 3 1-3 1-1 3-1-3-3-1 3-1 1-3Z" /></>,
    commerce: <><path d="M6 11h20l2 17H4l2-17Z" /><path d="M11 12V8a5 5 0 0 1 10 0v4M12 19l3 3 6-6" /></>,
    mobile: <><rect x="8" y="3" width="16" height="26" rx="4" /><path d="M13 6h6M14 25h4M12 13h8M12 17h5" /></>,
    integrations: <><rect x="3" y="3" width="9" height="9" rx="2" /><rect x="20" y="20" width="9" height="9" rx="2" /><path d="M12 7.5h8.5a4 4 0 0 1 4 4V20M20 24.5h-8.5a4 4 0 0 1-4-4V12M21 16l3.5 4 3.5-4M4 16l3.5-4 3.5 4" /></>,
  };
  return <svg viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1.35" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">{paths[type]}</svg>;
}

export default function ServicesPage() {
  return (
    <>
      <main className={styles.page} id="services">
        <a className={styles.skipLink} href="#capabilities">Skip to services</a>

        <ServicesHero />

        <section id="capabilities" className={styles.capabilities} aria-labelledby="capabilities-title">
          <div className={styles.shell}>
            <div className={styles.sectionHeading}>
              <div><p className={styles.kicker}>What we can build</p><h2 id="capabilities-title">Six capabilities.<br /><em>A world of possibility.</em></h2></div>
              <p>Start with one focused need or bring several layers together. We shape the scope around your business, your people and what needs to happen next.</p>
            </div>
            <nav className={styles.serviceIndex} aria-label="Explore service capabilities">
              {SERVICES.map((service) => <a key={service.id} href={`#${service.id}`}><span>{service.number}</span>{service.title}<Arrow diagonal /></a>)}
            </nav>
            <div className={styles.serviceGrid}>
              {SERVICES.map((service) => (
                <article id={service.id} key={service.id} className={styles.serviceCard}>
                  <div className={styles.serviceCardTop}><span className={styles.serviceGlyph}><ServiceGlyph type={service.id} /></span><span>{service.number} / 06</span></div>
                  <p className={styles.serviceEyebrow}>{service.eyebrow}</p>
                  <h3>{service.title}</h3>
                  <p className={styles.serviceDescription}>{service.description}</p>
                  <ul className={styles.deliverables}>{service.deliverables.map((item) => <li key={item}><Check />{item}</li>)}</ul>
                  <div className={styles.technologies}>{service.technologies.map((technology) => <span key={technology}>{technology}</span>)}</div>
                  <a className={styles.serviceLink} href={`mailto:bandeshaempire@gmail.com?subject=${encodeURIComponent(`Let's discuss ${service.title}`)}`}>Discuss {service.title.toLowerCase()} <Arrow diagonal /></a>
                </article>
              ))}
            </div>
            <div className={styles.supportNote}><span className={styles.supportMark}><Check /></span><p><strong>Launch is a beginning.</strong> Maintenance, performance improvements and new features can keep your system moving forward.</p><a href="#ways-to-work">Explore ongoing support <Arrow /></a></div>
          </div>
        </section>

        <section className={styles.connected} aria-labelledby="connected-title">
          <div className={`${styles.shell} ${styles.connectedGrid}`}>
            <div className={styles.connectedCopy}><p className={styles.kicker}>The connection is the advantage</p><h2 id="connected-title">Every piece matters.<br /><em>So does the space{" "}<br />between them.</em></h2><p>A great website should lead somewhere. An application should work with your tools. An automation should know when a person needs to step in.</p><p>We plan those connections from the start, so the finished work makes sense as a whole.</p><Link href="/about" className={styles.lightTextLink}>Meet the studio behind the work <Arrow diagonal /></Link></div>
            <div className={styles.systemDiagram}>
              <div className={styles.diagramTop}><span>ONE CONNECTED CUSTOMER JOURNEY</span><span className={styles.diagramSignal}><i />In sync</span></div>
              <div className={styles.journeyNode}><span className={styles.nodeIcon}><ServiceGlyph type="websites" /></span><div><small>01 / EXPERIENCE</small><strong>A visitor becomes an enquiry</strong><p>Your website makes the next step clear.</p></div><Arrow /></div>
              <div className={styles.journeyConnector}><i /><span>Context travels with the customer</span></div>
              <div className={styles.journeyNode}><span className={styles.nodeIcon}><ServiceGlyph type="integrations" /></span><div><small>02 / CONNECTION</small><strong>The right tools get the right data</strong><p>Your CRM and workflows stay aligned.</p></div><Arrow /></div>
              <div className={styles.journeyConnector}><i /><span>Routine steps keep moving</span></div>
              <div className={styles.journeyNode}><span className={styles.nodeIcon}><ServiceGlyph type="ai-automation" /></span><div><small>03 / INTELLIGENCE</small><strong>Your team takes the next action</strong><p>Automation supports. People decide.</p></div><Check /></div>
              <div className={styles.diagramBottom}><span>AN EXAMPLE OF WHAT WE CAN CONNECT</span><BrandMark /></div>
            </div>
          </div>
        </section>

        <section id="ways-to-work" className={styles.engagements} aria-labelledby="engagement-title">
          <div className={styles.shell}>
            <div className={styles.sectionHeading}><div><p className={styles.kicker}>Ways to work together</p><h2 id="engagement-title">The right partnership<br />for <em>where you are.</em></h2></div><p>A defined project, a bigger roadmap or an existing product that needs care. We agree the priorities, scope and delivery plan before the work begins.</p></div>
            <div className={styles.engagementGrid}>
              <article><span className={styles.engagementLabel}>ONE CLEAR PRIORITY</span><h3>A focused build.</h3><p>A website, application, automation or integration with a defined goal and a considered scope.</p><small>Ideal when you know what needs to happen next.</small><a href={`${EMAIL}%20%E2%80%94%20Focused%20build`}>Talk about your project <Arrow diagonal /></a></article>
              <article><span className={styles.engagementLabel}>SEVERAL CONNECTED NEEDS</span><h3>A connected programme.</h3><p>Multiple capabilities planned as one roadmap, with shared decisions and staged delivery.</p><small>Ideal when your next move spans several systems.</small><a href={`${EMAIL}%20%E2%80%94%20Connected%20programme`}>Shape your roadmap <Arrow diagonal /></a></article>
              <article><span className={styles.engagementLabel}>KEEP MOVING FORWARD</span><h3>Ongoing evolution.</h3><p>Support, improvements and new features for the digital systems your business already depends on.</p><small>Ideal when the foundation is there and the work continues.</small><a href={`${EMAIL}%20%E2%80%94%20Ongoing%20evolution`}>Discuss ongoing support <Arrow diagonal /></a></article>
            </div>
          </div>
        </section>

        <section className={styles.faq} aria-labelledby="faq-title">
          <div className={`${styles.shell} ${styles.faqGrid}`}>
            <div className={styles.faqIntro}><p className={styles.kicker}>Before we begin</p><h2 id="faq-title">A few things<br /><em>you might ask.</em></h2><p>A good working relationship starts with clarity. If your question is more specific, we&apos;re a message away.</p><a href={EMAIL} className={styles.textLink}>Ask us directly <Arrow diagonal /></a></div>
            <div className={styles.faqList}>{FAQS.map((faq, index) => <details key={faq.question}><summary><span className={styles.faqNumber}>{String(index + 1).padStart(2, "0")}</span><span>{faq.question}</span><i aria-hidden="true" /></summary><p>{faq.answer}</p></details>)}</div>
          </div>
        </section>

        <section id="start-project" className={styles.closing} aria-labelledby="closing-title">
          <div className={`${styles.shell} ${styles.closingInner}`}>
            <div><p className={styles.kicker}><span />Your next chapter starts here</p><h2 id="closing-title">Tell us the ambition.<br /><em>We&apos;ll help build the way.</em></h2><p>Bring the idea, the challenge or the part that isn&apos;t working. We&apos;ll help you find a clear, practical place to start.</p></div>
            <div className={styles.closingActions}><a href={EMAIL} className={styles.closingPrimary}>Start a conversation <span><Arrow diagonal /></span></a><a href={WHATSAPP} target="_blank" rel="noreferrer" className={styles.closingSecondary}>Discuss on WhatsApp <Arrow diagonal /></a><small>Direct communication. Thoughtful next steps.</small></div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
