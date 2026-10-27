import type { Metadata } from "next";
import Link from "next/link";
import SiteFooter from "@/components/SiteFooter";
import { getContactEmailHref } from "@/lib/contact";
import {
  ADD_ONS,
  COMPARISON_ROWS,
  INDIVIDUAL_SERVICES,
  PACKAGE_PLANS,
  PRICING_FAQS,
} from "./content";
import styles from "./page.module.css";

const DESCRIPTION =
  "Clear project pricing for ambitious businesses. Explore Bandesha Empire’s $500 Starter and $1,000 Growth website packages, custom projects, service rates and optional add-ons.";
const enquiryHref = (subject: string) =>
  getContactEmailHref(subject, "Hello Bandesha Empire,\n\nI'd like to discuss a project.\n\nMy business:\nWhat I need:\nMy preferred timeline:\n\nThank you.");
const EMAIL = enquiryHref("Let's plan a project — Pricing enquiry");
const WHATSAPP =
  "https://wa.me/923023634078?text=Hello%20Bandesha%20Empire%2C%20I%27d%20like%20to%20discuss%20your%20pricing%20and%20a%20project.";

export const metadata: Metadata = {
  title: "Pricing",
  description: DESCRIPTION,
  alternates: { canonical: "/pricing" },
  openGraph: {
    title: "Big ambitions. Clear investments. — Bandesha Empire",
    description: DESCRIPTION,
    url: "/pricing",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Big ambitions. Clear investments. — Bandesha Empire",
    description: DESCRIPTION,
    images: ["/pricing/opengraph-image"],
  },
};

function Arrow({ diagonal = false }: { diagonal?: boolean }) {
  return (
    <svg viewBox="0 0 20 20" fill="none" aria-hidden="true">
      <path d={diagonal ? "M5 15 15 5M5 5h10v10" : "M4 10h12m-5-5 5 5-5 5"} stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function Check() {
  return (
    <svg viewBox="0 0 18 18" fill="none" aria-hidden="true">
      <path d="m4 9 3.2 3.2L14 5.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function FoundationIcon({ type }: { type: "responsive" | "code" | "handover" | "scope" }) {
  const paths = {
    responsive: <><rect x="3" y="4" width="15" height="12" rx="2" /><rect x="15" y="9" width="6" height="11" rx="1.5" /><path d="M7 20h5M9.5 16v4" /></>,
    code: <><path d="m7 7-5 5 5 5m10-10 5 5-5 5M14 4l-4 16" /></>,
    handover: <><path d="M14 3H6a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9l-6-6Z" /><path d="M14 3v6h6M8 13h8M8 17h5" /></>,
    scope: <><rect x="4" y="4" width="16" height="17" rx="2" /><path d="M9 4V2h6v2M8 10l2 2 5-5M8 16h8" /></>,
  };
  return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.35" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">{paths[type]}</svg>;
}

function ComparisonValue({ value }: { value: string }) {
  return value === "Included" ? <span className={styles.included}><Check /><span className={styles.srOnly}>Included</span></span> : <span>{value}</span>;
}

export default function PricingPage() {
  return (
    <>
      <main id="pricing-page" className={styles.page}>
        <a href="#packages" className={styles.skipLink}>Skip to pricing packages</a>

        <section className={styles.hero} aria-labelledby="pricing-title">
          <div className={styles.shell}>
            <div className={styles.heroCopy}>
              <h1 id="pricing-title">Big ambitions.<br /><em>Clear investments.</em></h1>
              <p className={styles.heroDescription}>A focused website. A connected product. A bigger next chapter. Choose your starting point. We&apos;ll make the scope, the price and the way forward clear.</p>
              <ul className={styles.assurances}><li><Check />Defined project scope</li><li><Check />Agreed price before build</li><li><Check />No surprise extras</li></ul>
            </div>
            <nav className={styles.chapterNav} aria-label="Pricing page sections">
              <a href="#packages"><span>01</span>Packages<Arrow diagonal /></a>
              <a href="#comparison"><span>02</span>Compare<Arrow diagonal /></a>
              <a href="#add-ons"><span>03</span>Add-ons<Arrow diagonal /></a>
              <a href="#individual-services"><span>04</span>Individual services<Arrow diagonal /></a>
            </nav>
          </div>
        </section>

        <section id="packages" className={styles.packages} aria-labelledby="packages-title">
          <div className={styles.shell}>
            <div className={styles.sectionHeading}><div><h2 id="packages-title">The right foundation.<br /><em>Room to go further.</em></h2></div><p>Two defined website packages. One completely open canvas. Choose what fits today, with a clear path to what comes next.</p></div>
            <div className={styles.planGrid}>
              {PACKAGE_PLANS.map((plan, index) => (
                <article key={plan.id} className={`pricing-dot-host ${styles.plan} ${plan.id === "popular" ? styles.popularPlan : ""}`} aria-labelledby={`${plan.id}-title`}>
                  <div className={styles.planTop}><span className={styles.planNumber}><span className={`svc-overview-node ${styles.pricingDot} ${styles.planDot}`} aria-hidden="true" />0{index + 1} / 03</span>{plan.id === "popular" ? <span className={styles.popularBadge}>Popular choice <span aria-hidden="true">↗</span></span> : <span className={styles.planMark} aria-hidden="true">+</span>}</div>
                  <p className={styles.planEyebrow}>{plan.eyebrow}</p>
                  <h3 id={`${plan.id}-title`}>{plan.name}</h3>
                  <div className={`${styles.planPrice} ${plan.id === "custom" ? styles.customPrice : ""}`}>{plan.price}<span>{plan.priceNote}</span></div>
                  <p className={styles.planDescription}>{plan.description}</p>
                  <div className={styles.planRule} />
                  <p className={styles.featuresLabel}>{plan.id === "custom" ? "Shaped around your needs" : "Your project includes"}</p>
                  <ul className={styles.features}>{plan.features.map((feature) => <li key={feature}><Check /><span>{feature}</span></li>)}</ul>
                  <a href={enquiryHref(`Let's discuss the ${plan.name} package`)} className={styles.planButton}>{plan.cta}<Arrow diagonal /></a>
                </article>
              ))}
            </div>
            <p className={styles.priceNote}><span>Good to know</span>All prices in USD. Package prices cover the listed website scope. Additional features, hosting, domains and paid tools are quoted separately. The full scope is agreed before work starts.</p>
            <div className={styles.foundations}>
              <div className={styles.foundationsIntro}><span>The essentials</span><strong>Good foundations.<br />In every package.</strong></div>
              <div><FoundationIcon type="responsive" /><span>Responsive<br />by design</span></div>
              <div><FoundationIcon type="code" /><span>Clean code.<br />Clear ownership.</span></div>
              <div><FoundationIcon type="handover" /><span>Documented<br />handover</span></div>
              <div><FoundationIcon type="scope" /><span>A scope we<br />both agree on</span></div>
            </div>
          </div>
        </section>

        <section id="comparison" className={styles.comparison} aria-labelledby="comparison-title">
          <div className={styles.shell}>
            <div className={styles.sectionHeading}><div><h2 id="comparison-title">Less guesswork.<br /><em>A clearer choice.</em></h2></div><p>See what changes as the scope grows—and the standards that stay with every project.</p></div>
            <p className={styles.scrollHint}>Swipe or scroll horizontally to compare all packages <span aria-hidden="true">↔</span></p>
            <div className={styles.tableScroll} role="region" aria-label="Package feature comparison, scroll horizontally on smaller screens" tabIndex={0}>
              <table className={styles.comparisonTable}>
                <caption className={styles.srOnly}>Compare the Starter $500, Growth $1,000 and Custom website project packages.</caption>
                <thead><tr><th scope="col"><span>Inside your project</span>Considered at every level.</th>{PACKAGE_PLANS.map((plan) => <th key={plan.id} scope="col"><span>{plan.name}</span>{plan.id === "custom" ? "By conversation" : plan.price}</th>)}</tr></thead>
                <tbody>{COMPARISON_ROWS.map((row) => <tr key={row.feature}><th scope="row">{row.feature}</th><td><ComparisonValue value={row.starter} /></td><td><ComparisonValue value={row.popular} /></td><td><ComparisonValue value={row.custom} /></td></tr>)}</tbody>
              </table>
            </div>
          </div>
        </section>

        <section id="add-ons" className={styles.addOns} aria-labelledby="addons-title">
          <div className={styles.shell}>
            <div className={styles.sectionHeading}><div><h2 id="addons-title">A little extra.<br /><em>Exactly where it counts.</em></h2></div><div className={styles.headingAside}><p>Add only what your project needs. Each extra is scoped and approved before it becomes part of the build.</p><span className={styles.unitLabel}>Starting rates · USD</span></div></div>
            <div className={styles.rateGrid}>{ADD_ONS.map((addon) => <article key={addon.name} className={styles.rateRow}><div className={styles.rateTop}><h3>{addon.name}</h3><span className={styles.rateLeader} aria-hidden="true" /><p>{addon.price}{addon.unit && <small>{addon.unit}</small>}</p></div><p className={styles.rateDescription}>{addon.description}</p></article>)}</div>
            <p className={styles.catalogueNote}>Add-ons are optional, not automatic charges. Final cost depends on the agreed work; rush delivery is subject to capacity.</p>
          </div>
        </section>

        <section id="individual-services" className={styles.individualServices} aria-labelledby="individual-title">
          <div className={styles.shell}>
            <div className={styles.sectionHeading}><div><h2 id="individual-title">Start with a service.<br /><em>Build from there.</em></h2></div><div className={styles.headingAside}><p>Not every project needs a package. Bring us the website, workflow or connection you want to improve.</p><span className={styles.unitLabel}>Starting project rates · USD</span></div></div>
            <div className={`${styles.rateGrid} ${styles.serviceRates}`}>{INDIVIDUAL_SERVICES.map((service) => <article key={service.name} className={`pricing-dot-host ${styles.serviceRow}`}><span className={styles.serviceDot} aria-hidden="true"><span className={`svc-overview-node ${styles.pricingDot}`} /></span><div><div className={styles.rateTop}><h3><Link href={service.href}>{service.name}<Arrow diagonal /></Link></h3><span className={styles.rateLeader} aria-hidden="true" /><p>{service.price}</p></div><p className={styles.rateDescription}>{service.description}</p></div></article>)}</div>
          </div>
          <aside className={styles.serviceFoot} aria-labelledby="service-guidance-title">
            <div className={`${styles.shell} ${styles.serviceFootInner}`}>
              <div className={styles.serviceFootIntro}>
                <span className={styles.serviceFootIcon}><FoundationIcon type="scope" /></span>
                <div className={styles.serviceFootCopy}>
                  <h3 id="service-guidance-title">A starting point. Not a limit.</h3>
                  <p className={styles.serviceFootDescription}>These rates cover focused scopes, not every possible project. Your final quote reflects the features, integrations and delivery your business needs.</p>
                </div>
              </div>
              <div className={styles.serviceFootActions}>
                <Link href="/services" className={`${styles.serviceFootButton} ${styles.ctaHover} ${styles.ctaHoverPrimary}`}><span>Explore all capabilities</span><i aria-hidden="true"><Arrow diagonal /></i></Link>
                <a href={enquiryHref("Help me define my project scope")} className={`${styles.serviceFootEnquiry} ${styles.ctaHover}`}><span>Or discuss your scope with us</span><i aria-hidden="true"><Arrow /></i></a>
              </div>
            </div>
          </aside>
        </section>

        <section className={styles.faq} aria-labelledby="pricing-faq-title">
          <div className={`${styles.shell} ${styles.faqGrid}`}>
            <div className={styles.faqIntro}><h2 id="pricing-faq-title">Good questions.<br /><em>Straight answers.</em></h2><p>The practical details matter. Here&apos;s how we keep your project and its investment clear.</p><a href={EMAIL} className={styles.textLink}>Ask something else <Arrow diagonal /></a></div>
            <div className={styles.faqList}>{PRICING_FAQS.map((faq, index) => <details key={faq.q}><summary><span className={styles.faqNumber}>0{index + 1}</span><span>{faq.q}</span><i aria-hidden="true" /></summary><p>{faq.a}</p></details>)}</div>
          </div>
        </section>

        <section id="start-project" className={styles.closing} aria-labelledby="pricing-closing-title">
          <div className={`${styles.shell} ${styles.closingInner}`}>
            <div className={styles.closingCopy}><h2 id="pricing-closing-title">Your next move.<br /><em>Let&apos;s make it count.</em></h2><p>Tell us what you&apos;re building, where you are now and what success looks like. We&apos;ll help define a sensible scope and a clear investment.</p></div>
            <div className={styles.closingActions}><span>Start with a conversation</span><a href={EMAIL} className={`${styles.closingPrimary} ${styles.ctaHover}`}><span>Let&apos;s talk about your project</span><i aria-hidden="true"><Arrow diagonal /></i></a><a href={WHATSAPP} target="_blank" rel="noreferrer" className={`${styles.closingSecondary} ${styles.ctaHover} ${styles.ctaHoverSecondary}`}><span>Message on WhatsApp</span><i aria-hidden="true"><Arrow diagonal /></i></a><small>No package chosen? That&apos;s a good place to start, too.</small></div>
          </div>
          <div className={`${styles.shell} ${styles.closingBottom}`}><span>Clear scope. Considered work. Yours to build on.</span><span>Bandesha Empire / Pricing</span></div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
