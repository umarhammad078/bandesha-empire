import type { Metadata } from "next";
import Image from "next/image";
import SiteFooter from "@/components/SiteFooter";
import { PROJECTS } from "@/data/projects";
import { getContactEmailHref } from "@/lib/contact";
import styles from "./page.module.css";

const DESCRIPTION = "Explore six Bandesha Empire concept builds in detail: AI support, business websites, Shopify commerce, client portals, operations workflows and connected systems.";
const enquiry = (name: string) => getContactEmailHref(`Let's discuss a project — ${name}`);

export const metadata: Metadata = {
  title: "Portfolio",
  description: DESCRIPTION,
  alternates: { canonical: "/portfolio" },
  openGraph: { title: "Good ideas. Built to work. — Bandesha Empire", description: DESCRIPTION, url: "/portfolio", type: "website" },
  twitter: { card: "summary_large_image", title: "Good ideas. Built to work. — Bandesha Empire", description: DESCRIPTION, images: ["/portfolio/opengraph-image"] },
};

function Arrow({ diagonal = false }: { diagonal?: boolean }) {
  return <svg viewBox="0 0 20 20" fill="none" aria-hidden="true"><path d={diagonal ? "M5 15 15 5M5 5h10v10" : "M4 10h12m-5-5 5 5-5 5"} stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>;
}

function Check() {
  return <svg viewBox="0 0 18 18" fill="none" aria-hidden="true"><path d="m4 9 3.2 3.2L14 5.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>;
}

export default function PortfolioPage() {
  return (
    <>
      <main className={styles.page} id="portfolio-page">
        <a href="#ai-support" className={styles.skipLink}>Skip to project studies</a>
        <section className={styles.hero} aria-labelledby="portfolio-title">
          <Image className={styles.heroBackdrop} src={PROJECTS[0].image} alt="" fill sizes="100vw" priority aria-hidden="true" />
          <div className={styles.heroOverlay} aria-hidden="true" />
          <div className={`${styles.shell} ${styles.heroInner}`}>
            <div className={styles.heroMeta}><span>Bandesha Empire / Portfolio</span><span>06 project studies · 01 connected approach</span></div>

            <div className={styles.heroContent}>
              <div className={styles.heroTitle}>
                <h1 id="portfolio-title">Good ideas.<br /><em>Built to work.</em></h1>
              </div>

              <div className={styles.heroIntro}>
                <p>Explore how clear thinking, considered design and practical engineering come together across six connected digital concepts.</p>
              </div>
            </div>

            <div className={styles.heroFoot}>
              <a href={`#${PROJECTS[0].id}`} aria-label={`Explore ${PROJECTS[0].name}`}>
                <span><small>Featured concept · 01 / 06</small><strong>{PROJECTS[0].name}</strong></span>
              </a>
              <span className={styles.heroScroll}><i aria-hidden="true" /> Scroll to explore</span>
            </div>
          </div>
        </section>

        <div>
          {PROJECTS.map((project, index) => (
            <section key={project.id} id={project.id} className={`${styles.study} ${index % 2 === 1 ? styles.reversed : ""}`} aria-labelledby={`${project.id}-title`}>
              <div className={styles.shell}>
                <div className={styles.studyMeta}><span><b>{project.number}</b>{project.category}</span><span>Concept build</span></div>
                <div className={styles.studyGrid}>
                  <figure className={styles.visual}>
                    <div className={styles.projectImage}><Image src={project.image} alt={project.imageAlt} width={1536} height={1024} sizes="(max-width: 850px) 94vw, 48vw" /></div>
                    <figcaption className={styles.flow}><span className={styles.flowLabel}>The connected journey</span><ol>{project.flow.map((step, stepIndex) => <li key={step}><span className={styles.flowDot} aria-hidden="true" /><span>{step}</span>{stepIndex < project.flow.length - 1 && <Arrow />}</li>)}</ol></figcaption>
                  </figure>
                  <div className={styles.studyCopy}>
                    <p className={styles.studyEyebrow}>{project.name}</p>
                    <h2 id={`${project.id}-title`}>{project.title}</h2>
                    <p className={styles.summary}>{project.summary}</p>
                    <div className={styles.approach}><h3>The approach</h3><p>{project.approach}</p></div>
                    <ul className={styles.focus} aria-label={`${project.name} project focus`}>{project.focus.map((point) => <li key={point}><Check /><span>{point}</span></li>)}</ul>
                    <a className={styles.discuss} href={enquiry(project.name)}><span>{project.cta}</span><i><Arrow diagonal /></i></a>
                  </div>
                </div>
              </div>
            </section>
          ))}
        </div>

        <section id="start-project" className={styles.closing} aria-labelledby="closing-title">
          <div className={styles.shell}>
            <div className={styles.closingInner}>
              <div><span className={styles.closingLabel}>Your next chapter</span><h2 id="closing-title">Let&apos;s make something<br /><em>worth building.</em></h2><p>Bring the idea, the challenge or the system that needs to work better. We&apos;ll help you find a clear way forward.</p></div>
              <div className={styles.closingActions}><a href={enquiry("Portfolio enquiry")} className="cta-final-primary"><span>Tell us about your project</span><i><Arrow /></i></a><a href="https://wa.me/923023634078?text=Hello%20Bandesha%20Empire%2C%20I%27d%20like%20to%20discuss%20a%20project%20from%20your%20portfolio." target="_blank" rel="noreferrer" className="cta-final-secondary"><span>Message on WhatsApp</span><i><Arrow /></i></a><small>Start with a conversation. Shape the scope together.</small></div>
            </div>
            <div className={styles.closingFoot}><span>Considered design. Connected systems.</span><span>Bandesha Empire / Portfolio</span></div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
