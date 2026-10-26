export type Project = {
  id: string;
  number: string;
  category: string;
  name: string;
  title: string;
  summary: string;
  image: string;
  imageAlt: string;
  cta: string;
  tags: readonly string[];
  brief: string;
  approach: string;
  focus: readonly string[];
  flow: readonly [string, string, string];
};

export const PROJECTS: readonly Project[] = [
  {
    id: "ai-support",
    number: "01",
    category: "AI & Automation",
    name: "AI Support Workspace",
    title: "An AI agent that turns questions into action.",
    summary:
      "A connected support workspace that retrieves approved knowledge, completes routine workflows and hands complex cases to the right person with full context.",
    image: "/projects/ai-automation-editorial.png",
    imageAlt:
      "Professional using an AI automation workflow on a laptop in a dark studio workspace.",
    cta: "Build an AI agent",
    tags: ["Knowledge retrieval", "Workflow actions", "Human hand-off"],
    brief:
      "A connected support workspace for questions that need a useful answer, a routine action or the right person to take over.",
    approach:
      "Bring approved knowledge and everyday workflow actions into one clear support experience. Keep complex cases with people, carrying the conversation and relevant context into the hand-off.",
    focus: [
      "Approved knowledge retrieval",
      "Routine workflow actions",
      "Context-rich human hand-off",
    ],
    flow: ["Retrieve knowledge", "Take routine action", "Hand over with context"],
  },
  {
    id: "business-website",
    number: "02",
    category: "Website Development",
    name: "Business Website",
    title: "A high-performing website built to earn trust.",
    summary:
      "Clear positioning, purposeful journeys and dependable engineering connect discovery, qualification and enquiry without unnecessary friction.",
    image: "/projects/website-development-editorial.png",
    imageAlt:
      "Modern website development workspace with a dark code editor and refined digital canvas.",
    cta: "Plan your website",
    tags: ["Strategy-led UX", "CMS & integrations", "Performance-first"],
    brief:
      "A business website that connects a clear brand message with purposeful journeys from discovery to enquiry.",
    approach:
      "Shape the content and navigation around what visitors need to understand before taking the next step. Pair that experience with a manageable content system, useful integrations and attention to performance.",
    focus: [
      "Strategy-led user journeys",
      "CMS and integrations",
      "Performance-conscious engineering",
    ],
    flow: ["Discover the business", "Understand the fit", "Make an enquiry"],
  },
  {
    id: "shopify-storefront",
    number: "03",
    category: "Shopify Commerce",
    name: "Shopify Storefront",
    title: "A Shopify store built for confident buying.",
    summary:
      "Focused merchandising, fast product discovery and a streamlined purchase journey create a storefront customers trust and teams can operate.",
    image: "/projects/shopify-commerce-editorial.png",
    imageAlt:
      "Premium skincare products arranged beside a tablet displaying an ecommerce product gallery.",
    cta: "Build your Shopify store",
    tags: ["Storefront UX", "Conversion architecture", "Operations integration"],
    brief:
      "A Shopify commerce experience that helps customers find the right product and buy with confidence.",
    approach:
      "Build the storefront around focused merchandising, clear product discovery and a considered purchase journey. Connect the customer-facing experience with the operational tools the store team needs.",
    focus: [
      "Storefront user experience",
      "Purchase journey architecture",
      "Commerce operations integration",
    ],
    flow: ["Discover products", "Choose with confidence", "Complete the purchase"],
  },
  {
    id: "client-portal",
    number: "04",
    category: "Custom Web Application",
    name: "Client Collaboration Portal",
    title: "A client portal for every decision and next action.",
    summary:
      "A secure shared workspace gives clients and teams a clear view of progress, approvals, documents and next actions—without scattered email threads.",
    image: "/projects/client-portal-editorial.png",
    imageAlt:
      "Two professionals reviewing a clean project dashboard on a laptop during a client meeting.",
    cta: "Plan your web application",
    tags: ["Role-based access", "Approval workflows", "Secure document hub"],
    brief:
      "A shared client workspace for progress, approvals, documents and the decisions that move a project forward.",
    approach:
      "Give clients and teams an organised view of what is happening and what needs their attention. Use role-based access, connected approval workflows and a secure document hub to keep collaboration in one place.",
    focus: [
      "Role-based access",
      "Clear approval workflows",
      "Secure document organisation",
    ],
    flow: ["Review progress", "Make a decision", "See the next action"],
  },
  {
    id: "operations-workflow",
    number: "05",
    category: "Business Automation",
    name: "Operations Workflow",
    title: "An operations workflow that keeps work moving.",
    summary:
      "Forms, approvals, notifications and task hand-offs connect into one visible process, while exceptions stay with the people best placed to decide.",
    image: "/projects/workflow-automation-editorial.png",
    imageAlt:
      "Business operator using a tablet with a connected approvals and workflow diagram.",
    cta: "Automate your operations",
    tags: ["Workflow orchestration", "Approval routing", "Exception handling"],
    brief:
      "A connected operational process that brings forms, approvals, notifications and task hand-offs into view.",
    approach:
      "Map the routine steps into a visible workflow with clear routing between people and actions. Make space for exceptions so the people best placed to decide can intervene when the standard path does not fit.",
    focus: [
      "Workflow orchestration",
      "Approval routing",
      "Human-led exception handling",
    ],
    flow: ["Capture the request", "Route the approval", "Hand off the next task"],
  },
  {
    id: "integration-hub",
    number: "06",
    category: "Connected Systems",
    name: "Business Integration Hub",
    title: "An integration hub for one dependable data flow.",
    summary:
      "APIs, databases and third-party tools synchronize through a monitored connection layer, reducing duplicate entry and keeping teams aligned.",
    image: "/projects/connected-systems-editorial.png",
    imageAlt:
      "Enterprise server hardware connected by restrained green data-light paths.",
    cta: "Connect your systems",
    tags: ["API integrations", "Data synchronization", "Monitoring & recovery"],
    brief:
      "A monitored connection layer that brings APIs, databases and third-party tools into one dependable data flow.",
    approach:
      "Connect the systems around the information they need to share and keep their data synchronised. Include monitoring and recovery in the connection layer so teams can understand and address interruptions.",
    focus: [
      "API integrations",
      "Data synchronisation",
      "Monitoring and recovery",
    ],
    flow: ["Connect the systems", "Synchronise the data", "Monitor and recover"],
  },
] as const;
