import Reveal from "@/components/Reveal";

type StackStyle = React.CSSProperties & {
  "--reveal-delay"?: string;
};

const STACK_GROUPS = [
  {
    code: "FE",
    label: "Frontend",
    descriptor: "Experience layer",
    items: [
      { mark: "NX", name: "Next.js" },
      { mark: "RE", name: "React" },
      { mark: "TS", name: "TypeScript" },
      { mark: "TW", name: "Tailwind CSS" },
    ],
  },
  {
    code: "DB",
    label: "Backend & Data",
    descriptor: "Application core",
    items: [
      { mark: "SB", name: "Supabase" },
      { mark: "PG", name: "PostgreSQL" },
      { mark: "JS", name: "Node.js" },
      { mark: "API", name: "API Integrations" },
    ],
  },
  {
    code: "CM",
    label: "Commerce",
    descriptor: "Selling systems",
    items: [
      { mark: "SH", name: "Shopify" },
      { mark: "ST", name: "Stripe" },
      { mark: "CMS", name: "Headless CMS" },
      { mark: "CP", name: "Custom Portals" },
    ],
  },
  {
    code: "AI",
    label: "AI & Automation",
    descriptor: "Intelligence layer",
    items: [
      { mark: "OA", name: "OpenAI APIs" },
      { mark: "AG", name: "AI Agents" },
      { mark: "N8", name: "n8n Workflows" },
      { mark: "WF", name: "Automation" },
    ],
  },
  {
    code: "CL",
    label: "Cloud & Quality",
    descriptor: "Delivery layer",
    items: [
      { mark: "VC", name: "Vercel" },
      { mark: "GH", name: "GitHub" },
      { mark: "PF", name: "Performance" },
      { mark: "AX", name: "Accessibility" },
    ],
  },
];

function delayStyle(ms: number): StackStyle {
  return { "--reveal-delay": `${ms}ms` };
}

export default function CapabilitiesSection() {
  return (
    <section id="capabilities" aria-labelledby="capabilities-heading" className="stack7-section">
      <div className="stack7-ambient" aria-hidden="true" />
      <div className="stack7-wrap">
        <Reveal threshold={0.08}>
          <div className="stack7-intro">
            <div>
              <span className="stack7-kicker rv" style={delayStyle(0)}>
                <i aria-hidden="true" />
                Technology stack
              </span>
              <h2 id="capabilities-heading" className="rv" style={delayStyle(70)}>
                A focused stack for{" "}
                <span>serious digital delivery.</span>
              </h2>
            </div>
            <p className="stack7-intro-copy rv" style={delayStyle(140)}>
              We work with dependable, production-ready technology and choose the
              combination around the work—not a fixed template.
            </p>
          </div>

          <div className="stack7-panel rv" style={delayStyle(210)}>
            <div className="stack7-panel-bar">
              <span>
                <i aria-hidden="true" />
                Production technology roster
              </span>
              <span>Web · Commerce · Automation · Infrastructure</span>
            </div>

            <div className="stack7-grid">
              {STACK_GROUPS.map((group, index) => (
                <article
                  className="stack7-group rv"
                  style={delayStyle(270 + index * 60)}
                  key={group.label}
                >
                  <div className="stack7-group-heading">
                    <span className="stack7-group-code">{group.code}</span>
                    <div>
                      <small>{group.descriptor}</small>
                      <h3>{group.label}</h3>
                    </div>
                  </div>

                  <ul>
                    {group.items.map((item) => (
                      <li key={item.name}>
                        <span className="stack7-item-mark">{item.mark}</span>
                        <strong>{item.name}</strong>
                        <i aria-hidden="true" />
                      </li>
                    ))}
                  </ul>
                </article>
              ))}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
