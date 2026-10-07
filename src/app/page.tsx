import { Hero } from "@/components/hero";
import { Services } from "@/components/services";
import { WhyChooseUs } from "@/components/why-choose-us";
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
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="relative min-h-screen bg-[#040404] overflow-x-clip">
        {/* Full-Page Continuous Blueprint Graph & Telemetry Grid */}
        <GraphGridBackground />

        {/* Hero Section */}
        <Hero />

        {/* Services Bento Grid */}
        <Services />

        {/* Why Choose Us Bento Grid */}
        <WhyChooseUs />

        {/* Automated Systems Workflow */}
        <SystemsWorkflow />

        {/* Featured Case Studies */}
        <CaseStudies />

        {/* AEO Insights & Research */}
        <Insights />

        {/* Project Intake Discovery Funnel */}
        <LeadFunnel />
      </div>
    </>
  );
}