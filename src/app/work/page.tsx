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
    <main className="relative min-h-screen bg-transparent text-neutral-900 dark:text-white pt-20 sm:pt-24 pb-20 px-4 sm:px-6 lg:px-8 overflow-hidden transition-colors duration-200">
      {/* 1. Global Background Overlay */}
      <GraphGridBackground />
      <div className="absolute top-12 left-1/2 -translate-x-1/2 w-[700px] h-[350px] bg-[#008763]/[0.05] dark:bg-[#00c896]/10 blur-[150px] pointer-events-none z-0" />

      {/* 2. Page Content */}
      <div className="relative z-10 max-w-6xl mx-auto">
        {/* Navigation Breadcrumb */}
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-xs font-mono text-neutral-600 dark:text-neutral-400 hover:text-[#008763] dark:hover:text-[#00c896] transition-colors mb-4 group"
        >
          <ArrowLeft className="w-3.5 h-3.5 group-hover:-translate-x-1 transition-transform" />
          <span>Return to Home</span>
        </Link>

        {/* Header Card */}
        <div className="rounded-2xl border border-neutral-200 dark:border-[#1f1f1f] bg-white/80 dark:bg-[#141414]/70 backdrop-blur-md p-6 sm:p-8 mb-8 sm:mb-10 shadow-sm dark:shadow-none">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-neutral-200 dark:border-[#1f1f1f] bg-neutral-100 dark:bg-[#1f1f1f]/80 text-[#008763] dark:text-[#00c896] text-xs font-semibold uppercase tracking-wider mb-3.5 font-mono shadow-xs dark:shadow-none">
            <Sparkles className="w-3.5 h-3.5 text-[#008763] dark:text-[#00c896]" />
            <span>Deployed Systems Catalog</span>
          </div>

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-neutral-900 dark:text-white leading-tight">
            Production{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-neutral-900 via-[#008763] to-[#008763] dark:from-white dark:via-[#00c896] dark:to-[#00b285]">
              Case Studies.
            </span>
          </h1>

          <p className="mt-3.5 text-sm sm:text-base text-neutral-600 dark:text-neutral-400 leading-relaxed max-w-2xl font-mono">
            Detailed engineering breakdowns, real telemetry metrics, and architectural
            decisions across our deployed client systems.
          </p>
        </div>

        {/* Case Studies Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {FEATURED_PROJECTS.map((project) => (
            <div
              key={project.id}
              className="group relative flex flex-col justify-between rounded-2xl border border-neutral-200 dark:border-[#1f1f1f] bg-white/80 dark:bg-[#141414]/70 hover:bg-neutral-50/90 dark:hover:bg-[#181818]/90 hover:border-[#008763]/50 dark:hover:border-[#00c896]/60 transition-all duration-300 backdrop-blur-md p-6 sm:p-8 shadow-sm dark:shadow-none"
            >
              {/* Corner Glow Accent */}
              <div className="absolute top-0 right-0 w-28 h-28 bg-[#008763]/5 dark:bg-[#00c896]/5 rounded-bl-full pointer-events-none group-hover:bg-[#008763]/10 dark:group-hover:bg-[#00c896]/15 transition-colors" />

              <div>
                {/* Category & Client Header */}
                <div className="flex items-center justify-between gap-2 mb-4">
                  <span className="text-xs uppercase tracking-wider text-[#008763] dark:text-[#00c896] font-semibold font-mono bg-[#008763]/10 dark:bg-[#00c896]/10 px-2.5 py-1 rounded-md border border-[#008763]/25 dark:border-[#00c896]/20">
                    {project.category}
                  </span>
                  <span className="text-xs text-neutral-500 font-mono">
                    {project.client}
                  </span>
                </div>

                {/* Title */}
                <h2 className="text-xl sm:text-2xl font-bold text-neutral-900 dark:text-white group-hover:text-[#008763] dark:group-hover:text-[#00c896] transition-colors leading-snug">
                  <Link href={`/work/${project.id}`} className="focus:outline-none">
                    {project.title}
                  </Link>
                </h2>

                {/* Description */}
                <p className="mt-3 text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed">
                  {project.description}
                </p>

                {/* Metric Strip */}
                <div className="mt-6 p-4 rounded-xl border border-neutral-200 dark:border-[#1f1f1f] bg-neutral-50/80 dark:bg-[#040404]/80 flex items-center justify-between">
                  <div>
                    <div className="text-xs text-neutral-500 font-medium font-mono">
                      {project.metrics.label}
                    </div>
                    <div className="text-lg sm:text-xl font-bold text-neutral-900 dark:text-white tracking-tight mt-0.5 font-mono">
                      {project.metrics.value}
                    </div>
                  </div>
                  <div className="w-9 h-9 rounded-lg bg-neutral-100 dark:bg-[#1f1f1f] border border-neutral-200 dark:border-[#1f1f1f] flex items-center justify-center text-[#008763] dark:text-[#00c896] group-hover:scale-105 transition-transform shadow-xs dark:shadow-none">
                    <TrendingUp className="w-4 h-4" />
                  </div>
                </div>

                {/* Tech Stack Tags */}
                <div className="mt-6 flex flex-wrap gap-2">
                  {project.techStack.map((tech) => (
                    <span
                      key={tech}
                      className="px-2.5 py-1 rounded-md text-[11px] font-mono bg-neutral-100 dark:bg-[#040404]/90 text-neutral-700 dark:text-neutral-300 border border-neutral-200 dark:border-[#1f1f1f] group-hover:border-[#008763]/30 dark:group-hover:border-[#00c896]/30 transition-colors"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              {/* Action Link Footer */}
              <div className="mt-8 pt-6 border-t border-neutral-200 dark:border-[#1f1f1f]/80 flex items-center justify-between">
                <Link
                  href={`/work/${project.id}`}
                  className="text-xs font-semibold text-neutral-600 group-hover:text-neutral-900 dark:text-neutral-400 dark:group-hover:text-white transition-colors flex items-center gap-1 font-mono"
                >
                  <span>Architecture Spec</span>
                </Link>
                <Link
                  href={`/work/${project.id}`}
                  aria-label={`Open case study for ${project.title}`}
                  className="w-8 h-8 rounded-full bg-neutral-100 dark:bg-[#1f1f1f] border border-neutral-200 dark:border-[#1f1f1f] group-hover:bg-[#008763] dark:group-hover:bg-[#00c896] group-hover:border-transparent flex items-center justify-center text-neutral-700 dark:text-neutral-300 group-hover:text-white dark:group-hover:text-[#040404] transition-all duration-200 shadow-sm dark:shadow-none"
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