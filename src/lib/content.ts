import { createClient } from "@supabase/supabase-js";

export interface CaseStudyDetail {
  slug: string;
  title: string;
  category: string;
  client: string;
  summary: string;
  problem: string;
  solution: string;
  architecture: string[];
  metrics: { label: string; value: string }[];
  techStack: string[];
  date: string;
}

export interface InsightDetail {
  slug: string;
  title: string;
  category: string;
  readTime: string;
  date: string;
  summary: string;
  content: string[];
  keyTakeaways: string[];
}

// Fallback data matching your featured work
export const FALLBACK_CASE_STUDIES: Record<string, CaseStudyDetail> = {
  "syntrix-analytics": {
    slug: "syntrix-analytics",
    title: "Autonomous Enterprise Pipeline & Analytics Engine",
    category: "Systems Design & Web App",
    client: "Syntrix Labs",
    summary:
      "Architected a real-time event pipeline handling 2M+ webhook events daily with Supabase and Next.js, eliminating manual reporting workflows entirely.",
    problem:
      "Syntrix Labs suffered from high latency and database thread exhaustion during peak traffic. Their legacy ETL batch pipeline delayed business intelligence data by up to 6 hours.",
    solution:
      "We engineered an event-driven edge ingestion pipeline using Next.js App Router, Supabase Postgres partitioned tables, and distributed Redis queue workers.",
    architecture: [
      "Edge-based webhook normalization with sub-40ms acknowledgment",
      "PostgreSQL time-series partitioning with automated row archiving",
      "Real-time event streaming via Supabase Realtime WebSockets",
    ],
    metrics: [
      { label: "Operational Velocity Lift", value: "4.2x Faster" },
      { label: "Daily Event Throughput", value: "2.1M+" },
      { label: "Pipeline Latency Reduction", value: "98.4%" },
    ],
    techStack: ["Next.js", "TypeScript", "Supabase", "PostgreSQL", "Redis", "Tailwind CSS"],
    date: "2026",
  },
  "aeo-rank-engine": {
    slug: "aeo-rank-engine",
    title: "AI Answer Engine (AEO) & Organic Search Dominance",
    category: "SEO & AEO Architecture",
    client: "Apex Financial",
    summary:
      "Engineered semantic JSON-LD graph structures and headless content pipelines to secure top-ranking citations across Perplexity, ChatGPT Search, and Google.",
    problem:
      "Traditional keyword optimization had stopped generating qualified inbound pipeline as buyers shifted from standard Google search to generative LLM queries.",
    solution:
      "Deployed a unified semantic entity schema graph across Next.js ISR pages, pairing high-signal technical documentation with direct knowledge-graph hooks.",
    architecture: [
      "Automated JSON-LD entity graph generation on every published node",
      "Incremental Static Regeneration (ISR) with edge cache revalidation",
      "Direct optimization for LLM token ingestion windows",
    ],
    metrics: [
      { label: "Qualified Pipeline Growth", value: "+310% YoY" },
      { label: "LLM Citation Share", value: "64%" },
      { label: "Core Web Vitals Score", value: "100/100" },
    ],
    techStack: ["Semantic Schema", "Next.js ISR", "Edge Functions", "Redis"],
    date: "2026",
  },
  "b2b-lead-engine": {
    slug: "b2b-lead-engine",
    title: "High-Ticket Client Acquisition Funnel & Portal",
    category: "Web Application & CRO",
    client: "Vektor Cloud",
    summary:
      "Designed and deployed a multi-step interactive qualification portal with instant CRM syncing and zero-latency page transitions.",
    problem:
      "Vektor Cloud relied on standard contact forms with a 72% bounce rate and low data fidelity on enterprise deal sizes.",
    solution:
      "Architected a frictionless multi-step discovery engine with real-time budget bracket matching, validation actions, and instant executive email dispatch.",
    architecture: [
      "Server Actions with strict runtime Zod payload validation",
      "Transactional CRM ingestion via automated edge webhooks",
      "Dynamic browser viewport fitting for zero mobile scroll blowout",
    ],
    metrics: [
      { label: "Demo Booking Conversion", value: "14.8% Lift" },
      { label: "Lead Response Latency", value: "< 2 Mins" },
      { label: "Average Deal Size", value: "$18.5k" },
    ],
    techStack: ["Next.js App Router", "Server Actions", "PostgreSQL", "Framer Motion"],
    date: "2026",
  },
};

export const FALLBACK_INSIGHTS: Record<string, InsightDetail> = {
  "aeo-rank-engine-architecture": {
    slug: "aeo-rank-engine-architecture",
    title: "Engineering for AI Answer Engine Optimization (AEO) in 2026",
    category: "Search Architecture",
    readTime: "5 min read",
    date: "Oct 2026",
    summary:
      "Why traditional keyword stuffing is obsolete, and how semantic JSON-LD knowledge graphs dictate brand inclusion across Perplexity, ChatGPT Search, and Google Gemini.",
    keyTakeaways: [
      "AI search engines prioritize structured semantic entity graphs over meta keyword frequency.",
      "Direct answers, tabular data, and clear entity definitions are 4x more likely to be cited by LLMs.",
      "Page speed (sub-500ms TTFB) remains essential because LLM web scrapers have strict crawling timeouts.",
    ],
    content: [
      "Search behavior has permanently diverged. High-ticket buyers no longer click through ten blue links; they prompt conversational engines for direct architectural recommendations.",
      "To win citations, your web application must function as a verified knowledge source. This requires publishing deeply structured schema graphs that identify your organization, technical capabilities, and verified metrics.",
      "By pairing Next.js edge-rendered JSON-LD graphs with concise technical definitions, you make your brand machine-readable by default.",
    ],
  },
  "sub-second-web-vitals": {
    slug: "sub-second-web-vitals",
    title: "Sub-Second Core Web Vitals: Next.js & Edge Invalidation Strategies",
    category: "Full-Stack Web",
    readTime: "7 min read",
    date: "Sep 2026",
    summary:
      "A deep dive into Incremental Static Regeneration (ISR), asset tree-shaking, and optimizing Largest Contentful Paint (LCP) down to sub-400ms across mobile devices.",
    keyTakeaways: [
      "Avoid bulky client-side libraries when native WebGL or mathematical geometry can replace them.",
      "Isolate third-party scripts and defer non-critical CSS animations off the main thread.",
      "Use viewport clipping and responsive camera zooming to eliminate layout shifts (CLS).",
    ],
    content: [
      "Core Web Vitals are not just vanity scores; they directly dictate conversion rates on mobile devices.",
      "When users land on a heavy dark-mode canvas, every millisecond of blocking time risks bounce rates. Using Server Components to eliminate client-side JavaScript payloads ensures your initial paint happens instantly.",
      "Coupled with responsive WebGL rendering that respects device pixel ratios, you achieve an architectural aesthetic without compromising performance.",
    ],
  },
  "autonomous-event-pipelines": {
    slug: "autonomous-event-pipelines",
    title: "Eliminating CRM Bloat with Server Actions and Supabase Edge Hooks",
    category: "Systems Design",
    readTime: "6 min read",
    date: "Aug 2026",
    summary:
      "How to build high-throughput, low-latency client ingestion pipelines that validate, enrich, and route inbound leads without paying thousands for bloated SaaS middleware.",
    keyTakeaways: [
      "Native Server Actions eliminate the need for redundant API layer maintenance.",
      "PostgreSQL Row-Level Security (RLS) protects data directly at the database engine level.",
      "Transactional email pipelines (like Resend) provide instant alerting at fractional costs.",
    ],
    content: [
      "Most digital agencies stitch together fragile no-code automation stacks that fail silently under volume.",
      "By building direct ingestion pipelines with Next.js Server Actions and Supabase, you gain complete auditability, end-to-end TypeScript safety, and sub-second execution speeds.",
      "Every lead is validated against strict schemas, written immediately to ACID-compliant storage, and routed to notification channels concurrently.",
    ],
  },
};

// Fetchers
export async function getCaseStudyBySlug(slug: string): Promise<CaseStudyDetail | null> {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (supabaseUrl && anonKey) {
    try {
      const supabase = createClient(supabaseUrl, anonKey);
      const { data } = await supabase
        .from("case_studies")
        .select("*")
        .eq("slug", slug)
        .single();

      if (data) return data as CaseStudyDetail;
    } catch {}
  }

  return FALLBACK_CASE_STUDIES[slug] || null;
}

export async function getInsightBySlug(slug: string): Promise<InsightDetail | null> {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (supabaseUrl && anonKey) {
    try {
      const supabase = createClient(supabaseUrl, anonKey);
      const { data } = await supabase
        .from("insights")
        .select("*")
        .eq("slug", slug)
        .single();

      if (data) return data as InsightDetail;
    } catch {}
  }

  return FALLBACK_INSIGHTS[slug] || null;
}