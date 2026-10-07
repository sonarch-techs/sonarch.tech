import Link from "next/link";
import { ArrowUpRight, ArrowLeft, Sparkles, TrendingUp } from "lucide-react";
import { FEATURED_PROJECTS } from "@/data/case-studies";
import { GraphGridBackground } from "@/components/ui/graph-grid-background";

export const metadata = {
  title: "Production Case Studies | SONARCHTECH",
  description:
    "Examining architectural specs, latency reductions, and business ROI across deployed systems.",
};

export default function WorkPage() {
  return (
    <main className="relative min-h-screen bg-transparent text-white pt-20 sm:pt-24 pb-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
      {/* 1. Global Background (Strictly zero-height overlay) */}
      <GraphGridBackground />
      <div className="absolute top-12 left-1/2 -translate-x-1/2 w-[700px] h-[350px] bg-[#00c896]/10 blur-[150px] pointer-events-none z-0" />

      {/* 2. Page Content - Sits directly below fixed navbar */}
      <div className="relative z-10 max-w-6xl mx-auto">
        {/* Navigation Breadcrumb (Tightened margin) */}
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-xs font-mono text-neutral-400 hover:text-[#00c896] transition-colors mb-4 group"
        >
          <ArrowLeft className="w-3.5 h-3.5 group-hover:-translate-x-1 transition-transform" />
          <span>Return to Home</span>
        </Link>

        {/* Header Card (Matches Screenshot) */}
        <div className="rounded-2xl border border-[#1f1f1f] bg-[#141414]/10 backdrop-blur-md p-6 sm:p-8 mb-8 sm:mb-10">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-[#1f1f1f] bg-[#1f1f1f]/80 text-[#00c896] text-xs font-semibold uppercase tracking-wider mb-3.5 font-mono">
            <Sparkles className="w-3.5 h-3.5 text-[#00c896]" />
            <span>Deployed Systems Catalog</span>
          </div>

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-tight">
            Production{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-[#00c896] to-[#00b285]">
              Case Studies.
            </span>
          </h1>

          <p className="mt-3.5 text-sm sm:text-base text-neutral-400 leading-relaxed max-w-2xl">
            Detailed engineering breakdowns, real telemetry metrics, and architectural
            decisions across our deployed client systems.
          </p>
        </div>

        {/* Case Studies Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {FEATURED_PROJECTS.map((project) => (
            <div
              key={project.id}
              className="group relative flex flex-col justify-between rounded-2xl border border-[#1f1f1f] bg-[#141414]/70 hover:bg-[#181818]/90 hover:border-[#00c896]/60 transition-all duration-300 backdrop-blur-md p-6 sm:p-8"
            >
              {/* Corner Glow Accent */}
              <div className="absolute top-0 right-0 w-28 h-28 bg-[#00c896]/5 rounded-bl-full pointer-events-none group-hover:bg-[#00c896]/15 transition-colors" />

              <div>
                {/* Category & Client Header */}
                <div className="flex items-center justify-between gap-2 mb-4">
                  <span className="text-xs uppercase tracking-wider text-[#00c896] font-semibold font-mono">
                    {project.category}
                  </span>
                  <span className="text-xs text-neutral-500 font-mono">
                    {project.client}
                  </span>
                </div>

                {/* Title */}
                <h2 className="text-xl sm:text-2xl font-bold text-white group-hover:text-[#00c896] transition-colors leading-snug">
                  <Link href={`/work/${project.id}`} className="focus:outline-none">
                    {project.title}
                  </Link>
                </h2>

                {/* Description */}
                <p className="mt-3 text-sm text-neutral-400 leading-relaxed">
                  {project.description}
                </p>

                {/* Metric Strip */}
                <div className="mt-6 p-4 rounded-xl border border-[#1f1f1f] bg-[#040404]/80 flex items-center justify-between">
                  <div>
                    <div className="text-xs text-neutral-400 font-medium font-mono">
                      {project.metrics.label}
                    </div>
                    <div className="text-lg sm:text-xl font-bold text-white tracking-tight mt-0.5 font-mono">
                      {project.metrics.value}
                    </div>
                  </div>
                  <div className="w-9 h-9 rounded-lg bg-[#1f1f1f] border border-[#1f1f1f] flex items-center justify-center text-[#00c896] group-hover:scale-105 transition-transform">
                    <TrendingUp className="w-4 h-4" />
                  </div>
                </div>

                {/* Tech Stack Tags */}
                <div className="mt-6 flex flex-wrap gap-2">
                  {project.techStack.map((tech) => (
                    <span
                      key={tech}
                      className="px-2.5 py-1 rounded-md text-[11px] font-mono bg-[#040404]/90 text-neutral-300 border border-[#1f1f1f] group-hover:border-[#00c896]/30 transition-colors"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              {/* Action Link Footer */}
              <div className="mt-8 pt-6 border-t border-[#1f1f1f]/80 flex items-center justify-between">
                <Link
                  href={`/work/${project.id}`}
                  className="text-xs font-semibold text-neutral-400 group-hover:text-white transition-colors flex items-center gap-1 font-mono"
                >
                  <span>Architecture Spec</span>
                </Link>
                <Link
                  href={`/work/${project.id}`}
                  aria-label={`Open case study for ${project.title}`}
                  className="w-8 h-8 rounded-full bg-[#1f1f1f] border border-[#1f1f1f] group-hover:bg-[#00c896] group-hover:border-[#00c896] flex items-center justify-center text-neutral-300 group-hover:text-[#040404] transition-all duration-200"
                >
                  <ArrowUpRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}