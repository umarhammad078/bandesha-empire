type PackagePlan = {
  id: "starter" | "popular" | "custom";
  name: string;
  eyebrow: string;
  price: string;
  priceNote: string;
  description: string;
  features: string[];
  cta: string;
};

type ComparisonRow = {
  feature: string;
  starter: string;
  popular: string;
  custom: string;
};

type AddOn = {
  name: string;
  description: string;
  price: string;
  unit?: string;
};

type IndividualService = {
  name: string;
  description: string;
  price: string;
  href: string;
};

type PricingFaq = {
  q: string;
  a: string;
};

export const PACKAGE_PLANS: PackagePlan[] = [
  {
    id: "starter",
    name: "Starter",
    eyebrow: "A focused first step",
    price: "$500",
    priceNote: "one-time · defined scope",
    description:
      "A considered business website with the essentials to introduce your brand and turn interest into enquiries.",
    features: [
      "Up to 5 designed website pages",
      "Responsive desktop and mobile layouts",
      "Contact form and social links",
      "Essential technical SEO setup",
      "2 consolidated revision rounds",
      "Launch setup and handover notes",
    ],
    cta: "Start with Starter",
  },
  {
    id: "popular",
    name: "Growth",
    eyebrow: "For a connected presence",
    price: "$1,000",
    priceNote: "one-time · defined scope",
    description:
      "A more capable website for businesses ready to publish, connect their tools and create clearer customer journeys.",
    features: [
      "Up to 10 designed website pages",
      "Responsive desktop and mobile layouts",
      "CMS with one agreed content collection",
      "1 simple third-party integration",
      "Technical SEO and analytics setup",
      "3 consolidated revision rounds",
      "Launch setup and CMS handover",
    ],
    cta: "Build for Growth",
  },
  {
    id: "custom",
    name: "Custom",
    eyebrow: "Made around your ambition",
    price: "Let’s talk",
    priceNote: "scoped to your project",
    description:
      "For commerce, applications, automation or connected systems that need a scope shaped around your business.",
    features: [
      "Project discovery and scope definition",
      "UX and architecture for your use case",
      "Agreed application or commerce features",
      "API, data and workflow integrations",
      "Phased milestones and review points",
      "Documentation and ownership handover",
      "Optional ongoing care arrangement",
    ],
    cta: "Discuss a custom project",
  },
];

export const COMPARISON_ROWS: ComparisonRow[] = [
  {
    feature: "Scope agreed before the build",
    starter: "Included",
    popular: "Included",
    custom: "Included",
  },
  {
    feature: "Designed website pages",
    starter: "Up to 5",
    popular: "Up to 10",
    custom: "As scoped",
  },
  {
    feature: "Responsive design",
    starter: "Included",
    popular: "Included",
    custom: "Included",
  },
  {
    feature: "Technical SEO setup",
    starter: "Essential setup",
    popular: "Included",
    custom: "Where applicable",
  },
  {
    feature: "Content management system",
    starter: "Optional add-on",
    popular: "1 content collection",
    custom: "As scoped",
  },
  {
    feature: "Third-party integrations",
    starter: "Contact form & social links",
    popular: "1 simple integration",
    custom: "As scoped",
  },
  {
    feature: "Analytics setup",
    starter: "Optional add-on",
    popular: "Included",
    custom: "As scoped",
  },
  {
    feature: "Consolidated revision rounds",
    starter: "2 rounds",
    popular: "3 rounds",
    custom: "Agreed in the proposal",
  },
  {
    feature: "Applications, commerce & automation",
    starter: "Separately scoped",
    popular: "Separately scoped",
    custom: "As scoped",
  },
  {
    feature: "Source files & ownership handover",
    starter: "Included",
    popular: "Included",
    custom: "Included",
  },
  {
    feature: "Ongoing maintenance",
    starter: "Optional care plan",
    popular: "Optional care plan",
    custom: "Agreed separately",
  },
];

export const ADD_ONS: AddOn[] = [
  {
    name: "Additional pages",
    description: "Extend your website with an agreed page layout and supplied content.",
    price: "From $75",
    unit: "/ page",
  },
  {
    name: "Website care",
    description: "A scoped plan for routine updates, backups and website checks.",
    price: "From $99",
    unit: "/ month",
  },
  {
    name: "Content migration",
    description: "Move agreed pages, articles or catalogue content into your new system.",
    price: "From $100",
  },
  {
    name: "Extra integrations",
    description: "Connect another supported tool, form or API to your website.",
    price: "From $150",
  },
  {
    name: "Website copywriting",
    description: "Clear, search-aware page copy shaped around your brand and audience.",
    price: "From $60",
    unit: "/ page",
  },
  {
    name: "Analytics & event tracking",
    description: "Set up agreed measurement for key visits, enquiries and customer actions.",
    price: "From $100",
  },
  {
    name: "Team training session",
    description: "A one-hour remote walkthrough of your finished website or CMS.",
    price: "$75",
    unit: "/ session",
  },
  {
    name: "Accelerated delivery",
    description: "An adjusted delivery schedule, subject to scope and available capacity.",
    price: "Custom quote",
  },
];

export const INDIVIDUAL_SERVICES: IndividualService[] = [
  {
    name: "Website & Experience",
    description: "Purposeful business websites, thoughtful journeys and responsive builds.",
    price: "From $500",
    href: "/services#websites",
  },
  {
    name: "Web Applications",
    description: "Focused portals, dashboards and tools built around a defined workflow.",
    price: "From $1,500",
    href: "/services#web-apps",
  },
  {
    name: "AI Agents & Automation",
    description: "Practical assistants and workflows with clear controls and human oversight.",
    price: "From $500",
    href: "/services#ai-automation",
  },
  {
    name: "Shopify & Commerce",
    description: "Storefronts, catalogue setup and connected buying experiences.",
    price: "From $1,000",
    href: "/services#commerce",
  },
  {
    name: "Mobile Applications",
    description: "A defined cross-platform app scope for iOS and Android.",
    price: "From $2,000",
    href: "/services#mobile",
  },
  {
    name: "Connected Systems",
    description: "API connections and data flows that bring your business tools together.",
    price: "From $400",
    href: "/services#integrations",
  },
];

export const PRICING_FAQS: PricingFaq[] = [
  {
    q: "Are the package prices fixed?",
    a: "Yes. Starter is $500 and Growth is $1,000 for the listed website scope, in USD. We confirm the page requirements, deliverables and responsibilities in writing before work begins. Additional functionality, content work or requirements outside that scope are quoted separately. Custom projects and services marked ‘from’ are priced after we review the requirements.",
  },
  {
    q: "What is not included in the package price?",
    a: "Domain registration, hosting, paid themes or plugins, third-party subscriptions, API usage and transaction fees are separate unless your proposal explicitly includes them. You supply approved text, images and brand assets; copywriting, content migration and other extras can be added to the scope.",
  },
  {
    q: "What counts as a revision round?",
    a: "A revision round is one consolidated set of feedback on the agreed design or build. Starter includes two rounds and Growth includes three. Revisions refine the agreed direction; new pages, functionality or a change in direction are reviewed as additional scope before we proceed.",
  },
  {
    q: "Can I pay in milestones?",
    a: "We agree the payment schedule and project milestones in your proposal before work starts. The schedule depends on the size and structure of the engagement, so there is a clear shared understanding of what is due and when.",
  },
  {
    q: "How long will my project take?",
    a: "Timing depends on the agreed scope, integrations, content readiness and review turnaround. You receive a delivery plan before the build begins. If you need an earlier launch, ask about accelerated delivery; availability and any additional cost are confirmed separately.",
  },
  {
    q: "What happens after launch?",
    a: "Your handover includes the agreed source files, project access and practical notes for the finished system. You can manage it with your own team or discuss an optional care plan for ongoing maintenance and improvements. Support coverage and any third-party licence restrictions are set out in your proposal.",
  },
];
