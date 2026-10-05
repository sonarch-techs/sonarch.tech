import { Hero } from "@/components/hero";
import { Services } from "@/components/services";
import { SystemsWorkflow } from "@/components/systems-workflow";
import { CaseStudies } from "@/components/case-studies";
import { Insights } from "@/components/insights";
import { LeadFunnel } from "@/components/lead-funnel";
import { getKnowledgeGraph } from "@/lib/jsonld";

export default function HomePage() {
  const jsonLd = getKnowledgeGraph();

  return (
    <>
      {/* Semantic Knowledge Graph for AEO & LLM Crawler Ingestion */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="flex flex-col min-h-screen bg-[#040404]">
        <Hero />
        <Services />
        <SystemsWorkflow />
        <CaseStudies />
        <Insights />
        <LeadFunnel />
      </div>
    </>
  );
}