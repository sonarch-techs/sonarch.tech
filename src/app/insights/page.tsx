import Link from "next/link";
import {
  ArrowLeft,
  ArrowUpRight,
  Sparkles,
  Clock,
  CheckCircle2,
} from "lucide-react";
import { INSIGHTS_DATA } from "@/data/insights";

export const metadata = {
  title: "Technical Insights & AEO Research | SONARCHTECH",
  description:
    "Authoritative whitepapers covering Answer Engine Optimization, sub-400ms Next.js web application architecture, and autonomous event pipelines.",
};

export default function InsightsPage() {
  return (
    <main className="relative min-h-screen bg-transparent text-neutral-900 dark:text-white pt-20 sm:pt-24 pb-20 px-4 sm:px-6 lg:px-8 overflow-hidden transition-colors duration-200">
      {/* Ambient Radial Bloom */}
      <div className="absolute top-12 left-1/2 -translate-x-1/2 w-[700px] h-[350px] bg-[#008763]/[0.05] dark:bg-[#00c896]/10 blur-[150px] pointer-events-none z-0" />

      <div className="relative z-10 max-w-6xl mx-auto">
        {/* Navigation Breadcrumb */}
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-xs font-mono text-neutral-600 dark:text-neutral-400 hover:text-[#008763] dark:hover:text-[#00c896] transition-colors mb-4 group"
        >
          <ArrowLeft className="w-3.5 h-3.5 group-hover:-translate-x-1 transition-transform" />
          <span>Return to Command Center</span>
        </Link>

        {/* Header Strip */}
        <div className="rounded-2xl border border-neutral-200 dark:border-[#1f1f1f] bg-white/80 dark:bg-[#141414]/70 backdrop-blur-md p-6 sm:p-8 mb-8 sm:mb-10 shadow-sm dark:shadow-none">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-neutral-200 dark:border-[#1f1f1f] bg-neutral-100 dark:bg-[#1f1f1f]/80 text-[#008763] dark:text-[#00c896] text-xs font-semibold uppercase tracking-wider mb-3.5 font-mono shadow-xs dark:shadow-none">
            <Sparkles className="w-3.5 h-3.5 text-[#008763] dark:text-[#00c896]" />
            <span>Research & Architecture Whitepapers</span>
          </div>

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-neutral-900 dark:text-white leading-tight">
            Technical{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-neutral-900 via-[#008763] to-[#008763] dark:from-white dark:via-[#00c896] dark:to-[#00b285]">
              Insights.
            </span>
          </h1>

          <p className="mt-3.5 text-sm sm:text-base text-neutral-600 dark:text-neutral-400 leading-relaxed max-w-2xl font-mono">
            Deep technical investigations, performance benchmarks, and AEO optimization strategies engineered for production deployment.
          </p>
        </div>

        {/* Articles Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {INSIGHTS_DATA.map((article) => (
            <div
              key={article.slug}
              className="group relative flex flex-col justify-between rounded-2xl border border-neutral-200 dark:border-[#1f1f1f] bg-white/80 dark:bg-[#141414]/70 hover:bg-neutral-50/90 dark:hover:bg-[#181818]/90 hover:border-[#008763]/50 dark:hover:border-[#00c896]/60 transition-all duration-300 backdrop-blur-md p-6 sm:p-8 shadow-sm dark:shadow-none"
            >
              {/* Corner Glow Accent */}
              <div className="absolute top-0 right-0 w-24 h-24 bg-[#008763]/5 dark:bg-[#00c896]/5 rounded-bl-full pointer-events-none group-hover:bg-[#008763]/10 dark:group-hover:bg-[#00c896]/15 transition-colors" />

              <div>
                {/* Category & Read Time */}
                <div className="flex items-center justify-between gap-2 mb-4 text-xs font-mono">
                  <span className="uppercase tracking-wider text-[#008763] dark:text-[#00c896] font-semibold bg-[#008763]/10 dark:bg-[#00c896]/10 px-2.5 py-1 rounded-md border border-[#008763]/20 dark:border-[#00c896]/20">
                    {article.category}
                  </span>
                  <span className="text-neutral-500 dark:text-neutral-400 flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    <span>{article.readTime}</span>
                  </span>
                </div>

                {/* Article Title */}
                <h2 className="text-xl sm:text-2xl font-bold text-neutral-900 dark:text-white group-hover:text-[#008763] dark:group-hover:text-[#00c896] transition-colors leading-snug">
                  <Link href={`/insights/${article.slug}`} className="focus:outline-none">
                    {article.title}
                  </Link>
                </h2>

                {/* Summary */}
                <p className="mt-3 text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed">
                  {article.summary}
                </p>

                {/* Takeaways Preview */}
                <div className="mt-6 space-y-2 border-t border-neutral-200 dark:border-[#1f1f1f] pt-4">
                  {article.keyTakeaways.slice(0, 2).map((point, idx) => (
                    <div key={idx} className="flex items-start gap-2 text-xs text-neutral-700 dark:text-neutral-300 font-mono">
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#008763] dark:text-[#00c896] shrink-0 mt-0.5" />
                      <span className="line-clamp-2">{point}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Action Trigger */}
              <div className="mt-8 pt-6 border-t border-neutral-200 dark:border-[#1f1f1f]/80 flex items-center justify-between">
                <Link
                  href={`/insights/${article.slug}`}
                  className="text-xs font-semibold text-neutral-600 group-hover:text-neutral-900 dark:text-neutral-300 dark:group-hover:text-white transition-colors flex items-center gap-1 font-mono"
                >
                  <span>Read Whitepaper</span>
                </Link>
                <Link
                  href={`/insights/${article.slug}`}
                  aria-label={`Read whitepaper: ${article.title}`}
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