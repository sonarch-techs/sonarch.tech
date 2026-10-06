import { Hero } from "@/components/hero";
import { Services } from "@/components/services";
import { SystemsWorkflow } from "@/components/systems-workflow";
import { CaseStudies } from "@/components/case-studies";
import { Insights } from "@/components/insights";
import { LeadFunnel } from "@/components/lead-funnel";
import { GraphGridBackground } from "@/components/ui/graph-grid-background";
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
        {/* Hero Section: Remains clean with its own 3D WebGL Globe & focal glow */}
        <Hero />

        {/* Subsequent Sections: Layered over the Architectural Graph & Telemetry Grid */}
        <div className="relative overflow-hidden">
          <GraphGridBackground />
          <Services />
          <SystemsWorkflow />
          <CaseStudies />
          <Insights />
          <LeadFunnel />
        </div>
      </div>
    </>
  );
}