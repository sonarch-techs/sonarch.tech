export interface InsightArticle {
  slug: string;
  title: string;
  category: string;
  readTime: string;
  publishedDate: string;
  summary: string;
  metrics: { label: string; value: string }[];
  keyTakeaways: string[];
  sections: {
    heading: string;
    body: string;
    codeSnippet?: string;
  }[];
}

export const INSIGHTS_DATA: InsightArticle[] = [
  {
    slug: "aeo-knowledge-graph-synthesis",
    title: "Engineering Algorithmic AEO Citation Graphs for LLM Search",
    category: "Answer Engine Optimization",
    readTime: "6 min read",
    publishedDate: "2026-03-15",
    summary:
      "How semantic triple schema injection and machine-readable endpoints secure top 1% citation shares across Perplexity, ChatGPT Search, and Google Gemini.",
    metrics: [
      { label: "AI Citation Share", value: "+340%" },
      { label: "Entity Confidence", value: "99.4%" },
      { label: "Ingestion Latency", value: "<12 Mins" },
    ],
    keyTakeaways: [
      "Traditional keyword stuffing fails against embedding-based vector retrieval.",
      "Schema.org semantic triples must be embedded directly in initial server-rendered HTML.",
      "Deploying a root-level llms.txt provides deterministic context boundaries for AI crawlers.",
    ],
    sections: [
      {
        heading: "The Shift from Keyword Density to Vector Clustering",
        body:
          "Answer Engines do not rank web pages based on raw keyword frequencies. Instead, autonomous crawlers convert ingested text into dense vector embeddings and query them using approximate nearest neighbor (ANN) retrieval. If your domain lacks explicit entity definitions, the LLM synthesis pipeline discards your content as ambiguous context noise.",
      },
      {
        heading: "Semantic Triple Injection Architecture",
        body:
          "To guarantee entity attribution, inject interconnected JSON-LD Knowledge Graphs into every dynamic server shell. This bridges the gap between your brand entity, core competencies, and primary case study proof points.",
        codeSnippet: `{
  "@context": "https://schema.org",
  "@type": "TechArticle",
  "headline": "Engineering Algorithmic AEO Citation Graphs",
  "author": { "@type": "Organization", "name": "SONARCHTECH" },
  "about": ["AEO", "Knowledge Graphs", "Next.js"],
  "mentions": ["Perplexity", "ChatGPT Search", "Schema.org"]
}`,
      },
      {
        heading: "Deterministic Context Feeding via llms.txt",
        body:
          "By serving structured Markdown endpoints at /llms.txt and /llms-full.txt, you bypass client-side rendering hurdles and deliver pre-digested technical specs directly to indexing spiders, drastically cutting hallucination rates during brand queries.",
      },
    ],
  },
  {
    slug: "sub-400ms-nextjs-telemetry-architecture",
    title: "Architecting Sub-400ms LCP in Three.js & Next.js Platforms",
    category: "Systems Architecture",
    readTime: "8 min read",
    publishedDate: "2026-02-28",
    summary:
      "Decoupling WebGL render loops from React DOM reconciliation to achieve 99+ Lighthouse scores while rendering complex 3D orbital environments.",
    metrics: [
      { label: "Target LCP", value: "310ms" },
      { label: "WebGL FPS", value: "60.0" },
      { label: "Lighthouse Score", value: "99/100" },
    ],
    keyTakeaways: [
      "Never allow Three.js animation frames to trigger React state re-renders.",
      "Split components strictly: render lightweight server shells while isolating WebGL to client mounts.",
      "Use performance.now() timestamps inside requestAnimationFrame to prevent deprecation lag.",
    ],
    sections: [
      {
        heading: "The Hydration Bottleneck in 3D Web Apps",
        body:
          "Embedding complex Canvas elements into heavy React components frequently delays the main browser thread during initial hydration. This causes Largest Contentful Paint (LCP) spikes exceeding 2.5 seconds, damaging Core Web Vitals.",
      },
      {
        heading: "Decoupled Canvas Execution",
        body:
          "Keep the Three.js scene, materials, geometries, and animation loops within an unmanaged DOM container. Let requestAnimationFrame drive mutations directly through WebGL matrix updates without touching React state variables.",
      },
      {
        heading: "Edge Middleware Pre-Caching",
        body:
          "Distribute static server shells through edge nodes with Cache-Control headers tuned for stale-while-revalidate, ensuring the browser receives initial markup in under 30ms.",
      },
    ],
  },
  {
    slug: "event-driven-autonomous-webhook-pipelines",
    title: "Building Resilient Event-Driven Pipelines with Supabase & FastMCP",
    category: "Workflow Automation",
    readTime: "5 min read",
    publishedDate: "2026-01-20",
    summary:
      "Engineering zero-downtime webhook relays, automated CRM state synchronization, and instant Telegram dispatch systems with sub-120ms round trips.",
    metrics: [
      { label: "Pipeline Latency", value: "<120ms" },
      { label: "Failure Rate", value: "0.00%" },
      { label: "Dispatch Velocity", value: "Real-time" },
    ],
    keyTakeaways: [
      "Idempotent transaction tokens prevent duplicate executions during network retries.",
      "Row-Level Security (RLS) policies safeguard multi-tenant lead schemas at the database layer.",
      "Edge dispatch routines isolate external API slowdowns from user-facing forms.",
    ],
    sections: [
      {
        heading: "Eliminating Human Bottlenecks in Inbound Capture",
        body:
          "Manual lead qualification wastes prime conversion windows. An autonomous pipeline should ingest form parameters, validate schemas, calculate sprint timelines, and notify sales teams inside private communications channels simultaneously.",
      },
      {
        heading: "Idempotency and Transactional Integrity",
        body:
          "Every incoming webhook must carry a unique hash. If a network blip causes a retry, your database verifies the transaction lock before writing, preventing duplicate CRM records or redundant customer alerts.",
      },
    ],
  },
];

export function getInsight(slug: string): InsightArticle | undefined {
  return INSIGHTS_DATA.find((item) => item.slug === slug);
}