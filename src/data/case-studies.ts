export interface CaseStudy {
  id: string;
  title: string;
  category: string;
  client: string;
  description: string;
  metrics: { label: string; value: string };
  techStack: string[];
  link?: string;
  highlightColor?: string;
}

export const FEATURED_PROJECTS: CaseStudy[] = [
  {
    id: "syntrix-analytics",
    title: "Autonomous Enterprise Pipeline & Analytics Engine",
    category: "Systems Design & Web App",
    client: "Syntrix Labs",
    description:
      "Architected a real-time event pipeline handling 2M+ webhook events daily with Supabase and Next.js, eliminating manual reporting workflows entirely.",
    metrics: { label: "Operational Velocity Lift", value: "4.2x Faster" },
    techStack: ["Next.js", "TypeScript", "Supabase", "Tailwind CSS", "PostgreSQL"],
    link: "/work/syntrix-analytics",
  },
  {
    id: "aeo-rank-engine",
    title: "AI Answer Engine (AEO) & Organic Search Dominance",
    category: "SEO & AEO Architecture",
    client: "Apex Financial",
    description:
      "Engineered semantic JSON-LD graph structures and headless content pipelines to secure top-ranking citations across Perplexity, ChatGPT Search, and Google.",
    metrics: { label: "Qualified Pipeline Growth", value: "+310% YoY" },
    techStack: ["Semantic Schema", "Next.js ISR", "Edge Functions", "Redis"],
    link: "/work/aeo-rank-engine",
  },
  {
    id: "b2b-lead-engine",
    title: "High-Ticket Client Acquisition Funnel & Portal",
    category: "Web Application & CRO",
    client: "Vektor Cloud",
    description:
      "Designed and deployed a multi-step interactive qualification portal with instant CRM syncing and zero-latency page transitions.",
    metrics: { label: "Demo Booking Conversion", value: "14.8% Lift" },
    techStack: ["Next.js App Router", "Server Actions", "PostgreSQL", "Framer Motion"],
    link: "/work/b2b-lead-engine",
  },
];