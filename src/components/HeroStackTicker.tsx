const STACK_ITEMS = [
  "Flutter",
  "Web Apps",
  "Mobile Apps",
  "React.js",
  "React Native",
  "Supabase",
  "Vercel",
  "AI Automation",
  "AI Chatbot Development",
  "WordPress",
  "Shopify",
  "SaaS",
];

function StackSequence({ hidden = false }: { hidden?: boolean }) {
  return (
    <ul className="hero-stack-ticker-sequence" aria-hidden={hidden || undefined}>
      {STACK_ITEMS.map((item) => (
        <li key={item}>
          <span aria-hidden="true" />
          {item}
        </li>
      ))}
    </ul>
  );
}

export default function HeroStackTicker() {
  return (
    <section
      className="hero-stack-ticker"
      aria-label="Technologies and digital products we build"
    >
      <div className="hero-stack-ticker-viewport">
        <div className="hero-stack-ticker-track">
          <StackSequence />
          <StackSequence hidden />
        </div>
      </div>
    </section>
  );
}
