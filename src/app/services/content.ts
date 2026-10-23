export const SERVICES = [
  {
    id: "websites",
    number: "01",
    title: "Website & Experience",
    eyebrow: "Position and convert",
    description:
      "High-trust websites shaped around clear positioning, purposeful customer journeys and measurable business action.",
    deliverables: [
      "Positioning and UX architecture",
      "Responsive design and development",
      "CMS, performance and technical SEO",
    ],
    technologies: ["Next.js", "React", "Headless CMS"],
  },
  {
    id: "web-apps",
    number: "02",
    title: "Web Applications",
    eyebrow: "Simplify complex work",
    description:
      "Dependable portals, platforms and operational tools that turn complex workflows into focused products people can use confidently.",
    deliverables: [
      "Product definition and UX flows",
      "Dashboards and custom portals",
      "Authentication and role permissions",
    ],
    technologies: ["React", "TypeScript", "Supabase"],
  },
  {
    id: "ai-automation",
    number: "03",
    title: "AI Agents & Automation",
    eyebrow: "Automate with control",
    description:
      "Practical AI systems that handle repetitive steps, connect decisions and keep people responsible for the moments that matter.",
    deliverables: [
      "Workflow and opportunity audit",
      "AI assistants and approval flows",
      "Lead, document and data automation",
    ],
    technologies: ["OpenAI APIs", "AI Agents", "n8n Workflows"],
  },
  {
    id: "commerce",
    number: "04",
    title: "Shopify & Commerce",
    eyebrow: "Sell without friction",
    description:
      "Commerce experiences built for confident buying, efficient catalogue management and growth without unnecessary operational friction.",
    deliverables: [
      "Store and catalogue architecture",
      "Custom storefront experience",
      "Checkout, payment and app integration",
    ],
    technologies: ["Shopify", "Stripe", "Headless CMS"],
  },
  {
    id: "mobile",
    number: "05",
    title: "Mobile Applications",
    eyebrow: "Move across devices",
    description:
      "Polished mobile products with responsive interactions, resilient architecture and one coherent experience across iOS and Android.",
    deliverables: [
      "Product scope and interaction design",
      "Cross-platform application build",
      "API integration and release preparation",
    ],
    technologies: ["React Native", "Flutter", "API Integrations"],
  },
  {
    id: "integrations",
    number: "06",
    title: "Connected Systems",
    eyebrow: "Connect the operation",
    description:
      "APIs, data flows and shared infrastructure that connect the tools your business depends on into one dependable system.",
    deliverables: [
      "System and data-flow mapping",
      "API and database integration",
      "Internal dashboards and documentation",
    ],
    technologies: ["API Integrations", "PostgreSQL", "Node.js"],
  },
] as const;

export const FAQS = [
  {
    question: "What if we are not sure which service we need?",
    answer:
      "Start with the business problem. We will map the constraint, identify the smallest useful scope and recommend the capabilities that genuinely belong in it.",
  },
  {
    question: "Can you work with our existing website or systems?",
    answer:
      "Yes. We begin by reviewing what already works, what creates friction and what can be improved safely. A full rebuild is recommended only when it is justified.",
  },
  {
    question: "How long will the work take, and what will it cost?",
    answer:
      "Both depend on scope, complexity and required integrations. After discovery, you receive a clear delivery plan, responsibilities and commercial proposal before build work begins.",
  },
  {
    question: "Will our team be able to manage the finished system?",
    answer:
      "Ownership is planned from the start. We structure access, documentation and hand-off around the people who will operate the system after launch.",
  },
  {
    question: "Can you work with clients outside Pakistan?",
    answer:
      "Yes. Bandesha Empire is based in Pakistan and works through direct remote collaboration, documented decisions and clear communication across teams and time zones.",
  },
  {
    question: "What happens after launch?",
    answer:
      "We can continue with monitoring, maintenance, optimisation and feature development, or prepare a structured hand-off for your internal team or another delivery partner.",
  },
] as const;
