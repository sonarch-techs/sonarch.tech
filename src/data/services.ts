export interface ServiceDetail {
  slug: string;
  badge: string;
  title: string;
  ctaLabel: string;
  headline: string;
  summary: string;
  highlights: string[];
  deliverables: string[];
  metrics: { label: string; value: string }[];
  stack: string[];
  architectureSpecs: {
    title: string;
    description: string;
  }[];
  sprintTimeline: {
    phase: string;
    duration: string;
    description: string;
  }[];
}

export const SERVICES_DATA: ServiceDetail[] = [
  {
    slug: "website-development",
    badge: "Next.js & Architecture",
    title: "Website Development",
    ctaLabel: "Engineer Website",
    headline: "Sub-second load times, 99+ Lighthouse vitals, and enterprise Next.js execution.",
    summary:
      "High-performance, responsive websites built to convert and scale your digital presence.",
    highlights: [
      "99+ Lighthouse Vitals",
      "Sub-Second Load Times",
      "Conversion-Optimized",
    ],
    deliverables: [
      "Custom Next.js App Router Architecture",
      "Tailwind CSS & Framer Motion UI Design",
      "Zero-Hydration Mismatch Architecture",
      "Sub-400ms Largest Contentful Paint (LCP)",
      "Global Edge Deployment & CDN Caching",
    ],
    metrics: [
      { label: "Lighthouse Vitals", value: "99+" },
      { label: "Load Latency", value: "<400ms" },
      { label: "Core Web Vitals", value: "Pass" },
    ],
    stack: ["Next.js 15", "TypeScript", "Tailwind CSS", "Framer Motion", "Three.js", "Vercel Edge"],
    architectureSpecs: [
      {
        title: "Modular Server/Client Decoupling",
        description:
          "Strict separation of static server shells from interactive client components to guarantee minimal JS bundles.",
      },
      {
        title: "Edge Pre-Rendering & Caching",
        description:
          "Pre-computed static HTML distributed across global edge nodes for instant sub-30ms TTFB worldwide.",
      },
    ],
    sprintTimeline: [
      { phase: "Sprint 01", duration: "Week 1", description: "Design tokens, wireframe validation, and component blueprints." },
      { phase: "Sprint 02", duration: "Weeks 2-3", description: "Full-stack Next.js build, interactive shaders, and state logic." },
      { phase: "Sprint 03", duration: "Week 4", description: "Lighthouse auditing, speed optimization, and edge launch." },
    ],
  },
  {
    slug: "ai-automation-setup",
    badge: "Workflows",
    title: "AI Automation Setup",
    ctaLabel: "Build Workflows",
    headline: "Trigger → Process → Auto Sync. Zero manual bottleneck pipelines.",
    summary:
      "Automate repetitive tasks and streamline your operations with custom workflows.",
    highlights: [
      "Trigger → Process → Auto Sync",
      "Zero Human Hand-off",
      "Resilient Webhook Relays",
    ],
    deliverables: [
      "Event-Driven Webhook Integration",
      "Autonomous CRM & Data Synchronization",
      "Automated Alerting via Telegram & Email",
      "Idempotent Error Recovery & Retry Loops",
      "Custom Microservice Logic via FastMCP",
    ],
    metrics: [
      { label: "Pipeline Latency", value: "<150ms" },
      { label: "Manual Overhead", value: "0%" },
      { label: "Execution SLA", value: "99.99%" },
    ],
    stack: ["Supabase", "PostgreSQL", "Python FastMCP", "Redis", "Resend API", "Webhooks"],
    architectureSpecs: [
      {
        title: "Event-Driven Webhook Architecture",
        description:
          "High-throughput event processors with transactional deduplication to eliminate race conditions.",
      },
      {
        title: "Real-Time Telemetry Dispatches",
        description:
          "Sub-second notifications sent to internal operations teams as soon as critical events trigger.",
      },
    ],
    sprintTimeline: [
      { phase: "Sprint 01", duration: "Week 1", description: "Workflow state mapping, API audit, and trigger schemas." },
      { phase: "Sprint 02", duration: "Week 2", description: "Pipeline engineering, webhook relays, and logic tests." },
      { phase: "Sprint 03", duration: "Week 3", description: "Stress testing, failure fallbacks, and production deployment." },
    ],
  },
  {
    slug: "ai-chatbots",
    badge: "24/7 Agents",
    title: "AI Chatbots",
    ctaLabel: "Deploy Agent",
    headline: "Intelligent concierge agents providing instant qualification and support around the clock.",
    summary:
      "Integrate intelligent bots for 24/7 customer support and lead generation.",
    highlights: [
      "Autonomous Lead Qualification",
      "Strict Domain Guardrails",
      "Structured JSON Data Mode",
    ],
    deliverables: [
      "Groq & Llama 3 Fast LLM Integration",
      "Custom Brand Persona & Guardrail Engineering",
      "Automated Lead Capture to CRM & Database",
      "Interactive Follow-Up Chips & Telemetry Waves",
      "Strict In-Memory Token Rate Limiting",
    ],
    metrics: [
      { label: "Uptime Availability", value: "24/7" },
      { label: "Inference Latency", value: "<500ms" },
      { label: "Lead Qualification", value: "Autonomous" },
    ],
    stack: ["Groq API", "Llama 3", "Next.js App Router", "Framer Motion", "Tailwind CSS"],
    architectureSpecs: [
      {
        title: "Deterministic Structured JSON Mode",
        description:
          "Guarantees 100% parseable structured outputs with typed highlights, messages, and suggestions.",
      },
      {
        title: "IP Sliding Window Rate Limiting",
        description:
          "Defends the inference backend against token abuse with automated 10-minute client throttling.",
      },
    ],
    sprintTimeline: [
      { phase: "Sprint 01", duration: "Week 1", description: "Knowledge base ingestion, prompt policies, and tone calibration." },
      { phase: "Sprint 02", duration: "Week 2", description: "UI integration, telemetry state design, and backend routing." },
      { phase: "Sprint 03", duration: "Week 3", description: "Simulated load testing, hallucination audits, and release." },
    ],
  },
  {
    slug: "seo-optimization",
    badge: "AEO & Organic Search",
    title: "SEO Optimization",
    ctaLabel: "Command Search",
    headline: "Secure top-tier citations across Perplexity, ChatGPT Search, and Google.",
    summary:
      "Dominate search rankings and earn valuable long-term organic traffic.",
    highlights: [
      "JSON-LD Entity Graphs",
      "Perplexity & ChatGPT Citations",
      "Top-Tier Keyword Velocity",
    ],
    deliverables: [
      "Dynamic JSON-LD Knowledge Graph Injection",
      "Machine-Readable llms.txt Directory Manifest",
      "Entity Disambiguation & Schema.org Frameworks",
      "Technical Core Web Vitals Audits",
      "AEO Citation Testing Across Major LLM Crawlers",
    ],
    metrics: [
      { label: "AEO Citation Lift", value: "+340%" },
      { label: "Schema Validation", value: "100%" },
      { label: "Entity Confidence", value: "Top 1%" },
    ],
    stack: ["Schema.org", "JSON-LD", "Semantic Triples", "Next.js ISR", "OpenGraph"],
    architectureSpecs: [
      {
        title: "Semantic Triple Knowledge Graphs",
        description:
          "Injects linked relational data into server-rendered HTML for direct entity ingestion by LLM spiders.",
      },
      {
        title: "Machine-Readable Markdown Endpoints",
        description:
          "Custom llms.txt manifests formatting technical capabilities directly for AI indexing robots.",
      },
    ],
    sprintTimeline: [
      { phase: "Sprint 01", duration: "Week 1", description: "Entity audit, knowledge graph topology, and semantic research." },
      { phase: "Sprint 02", duration: "Week 2", description: "Automated schema injection and llms.txt deployment." },
      { phase: "Sprint 03", duration: "Week 3", description: "Citation indexation verification across Perplexity & Google." },
    ],
  },
  {
    slug: "full-brand-creation",
    badge: "Identity",
    title: "Full Brand Creation",
    ctaLabel: "Build Identity",
    headline: "Distinctive, high-ticket visual systems engineered for modern digital products.",
    summary:
      "Stand out with a modern, cohesive brand identity and logo design.",
    highlights: [
      "Design Tokens",
      "High-Precision Vector Assets",
      "Comprehensive Design Guidelines",
    ],
    deliverables: [
      "Vector Logo Marks & Scalable Wordmarks",
      "Tailwind-Compatible Design Token Architectures",
      "Custom Dark-Mode Color Palette Hierarchy",
      "Typography Stacks & Editorial Guidelines",
      "Social & Marketing Launch Asset Kit",
    ],
    metrics: [
      { label: "Design Token Sync", value: "100%" },
      { label: "Brand Distinction", value: "High-Ticket" },
      { label: "Asset Adaptability", value: "Universal" },
    ],
    stack: ["Figma", "Tailwind Design Tokens", "SVG Optimization", "Custom Typography"],
    architectureSpecs: [
      {
        title: "Code-First Design Tokens",
        description:
          "Direct mapping of Figma hex values and spatial scales into CSS variables and Tailwind themes.",
      },
      {
        title: "Scalable Vector Asset Optimization",
        description:
          "Precision-crafted SVGs stripped of bloat to render razor-sharp on high-DPI displays.",
      },
    ],
    sprintTimeline: [
      { phase: "Sprint 01", duration: "Week 1", description: "Moodboards, logo sketches, and visual identity directions." },
      { phase: "Sprint 02", duration: "Week 2", description: "Design token mapping, color calibration, and typography." },
      { phase: "Sprint 03", duration: "Week 3", description: "Brand guide delivery and digital asset export." },
    ],
  },
  {
    slug: "social-media-ads",
    badge: "Paid Acquisition",
    title: "Social Media Ads",
    ctaLabel: "Launch Campaigns",
    headline: "High-intent paid acquisition built to convert cold clicks into qualified pipeline.",
    summary:
      "Targeted, high-ROI ad campaigns to drive immediate traffic and consistent leads.",
    highlights: [
      "Precision Retargeting",
      "Scalable Inbound CAC",
      "High-Velocity Creative Iteration",
    ],
    deliverables: [
      "Full-Funnel Paid Acquisition Strategy",
      "High-Converting Ad Creatives & Copywriting",
      "Server-Side Conversion API (CAPI) Tracking",
      "Multi-Step Retargeting Frameworks",
      "Live ROAS & CAC Performance Dashboards",
    ],
    metrics: [
      { label: "ROAS Target", value: "3.5x+" },
      { label: "CAC Efficiency", value: "Optimized" },
      { label: "Conversion Tracking", value: "100% CAPI" },
    ],
    stack: ["Meta Ads API", "LinkedIn Campaign Manager", "Server-Side CAPI", "Google Analytics 4"],
    architectureSpecs: [
      {
        title: "Server-Side Conversion API Tracking",
        description:
          "Direct server-to-ad-network event dispatching to eliminate iOS/browser ad-blocker signal loss.",
      },
      {
        title: "Full-Funnel Pixel Retargeting",
        description:
          "Algorithmic audience segmentation tailored around exact on-page telemetry behavior.",
      },
    ],
    sprintTimeline: [
      { phase: "Sprint 01", duration: "Week 1", description: "Audience research, tracking pixel/CAPI setup, and creative briefs." },
      { phase: "Sprint 02", duration: "Week 2", description: "Ad creation, copy testing, and campaign launch." },
      { phase: "Sprint 03", duration: "Week 3+", description: "Bid optimization, creative refreshes, and scaling." },
    ],
  },
];

export function getService(slug: string): ServiceDetail | undefined {
  return SERVICES_DATA.find((service) => service.slug === slug);
}