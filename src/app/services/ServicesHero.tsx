import { SERVICES } from "./content";
import styles from "./hero.module.css";

const LABELS: Record<string, [string, string]> = {
  websites: ["Websites &", "experiences"],
  "web-apps": ["Web", "applications"],
  "ai-automation": ["AI agents &", "automation"],
  commerce: ["Shopify &", "commerce"],
  mobile: ["Mobile", "applications"],
  integrations: ["Connected", "systems"],
};

function Arrow({ down = false }: { down?: boolean }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d={down ? "M12 5v14m-5-5 5 5 5-5" : "M6 18 18 6M6 6h12v12"}
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default function ServicesHero() {
  return (
    <section className={styles.hero} aria-labelledby="services-title">
      <div className={styles.gridTexture} aria-hidden="true" />
      <div className={styles.contours} aria-hidden="true">
        <svg viewBox="0 0 1440 800" preserveAspectRatio="xMidYMid slice">
          <path d="M-190 560C80 560 38 50 350-20M-210 610C140 600 90 50 400-25M-240 660C190 640 140 50 450-30M1190 820C1020 650 1430 390 1580 400M1140 850C960 650 1390 330 1580 345M1090 880C900 650 1350 270 1580 290" />
        </svg>
      </div>

      <div className={styles.inner}>
        <div className={styles.topline}>
          <span className={styles.eyebrow}><i />Bandesha Empire / Services</span>
          <span className={styles.edition}>Independent thinking. Connected delivery.</span>
        </div>

        <div className={styles.statement}>
          <p className={styles.kicker}>The capabilities behind your next chapter</p>
          <h1 id="services-title">
            <span>Your ambition.</span>
            <span>Our <em>expertise.</em></span>
          </h1>
          <p className={styles.intro}>
            Considered websites. Purposeful applications. Intelligent automation.{" "}
            <br className={styles.desktopBreak} />
            Everything your digital business needs, working in one direction.
          </p>
          <div className={styles.actions}>
            <a className={styles.primary} href="#start-project">
              Plan your next move <Arrow />
            </a>
            <a className={styles.secondary} href="#capabilities">
              Find your service <Arrow down />
            </a>
          </div>
        </div>

        <div className={styles.architecture}>
          <div className={styles.architectureCaption}>
            <span />
            <p>Six capabilities. <strong>One connected approach.</strong></p>
            <span />
          </div>
          <nav className={styles.lanes} aria-label="Choose a service">
            {SERVICES.map((service) => (
              <a key={service.id} href={`#${service.id}`} aria-label={`Explore ${service.title}`}>
                <div className={styles.laneTop}>
                  <span>{service.number}</span>
                  <Arrow />
                </div>
                <span className={styles.laneTitle}>
                  {LABELS[service.id][0]}<br />{LABELS[service.id][1]}
                </span>
                <i className={styles.laneIndicator} aria-hidden="true" />
              </a>
            ))}
          </nav>
        </div>

        <div className={styles.bottomline}>
          <span>Strategy <i /> Design <i /> Engineering <i /> Evolution</span>
          <span>Pakistan based <b>↗</b> Working worldwide</span>
        </div>
      </div>
    </section>
  );
}
