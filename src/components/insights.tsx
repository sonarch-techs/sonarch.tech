"use client";

import { motion } from "framer-motion";
import { ArrowUpRight, ArrowRight, Sparkles, Clock, CheckCircle2 } from "lucide-react";
import Link from "next/link";
import { INSIGHTS_DATA } from "@/data/insights";

export function Insights() {
  return (
    <section
      id="insights"
      className="relative py-20 sm:py-28 bg-transparent text-white overflow-hidden scroll-mt-20 lg:scroll-mt-24 z-10"
    >
      {/* Ambient background bloom */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[650px] h-[350px] bg-[#00c896]/5 blur-[150px] rounded-full pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 sm:mb-16 gap-6">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-[#1f1f1f] bg-[#1f1f1f]/80 text-[#00c896] text-xs font-semibold uppercase tracking-wider mb-4 font-mono">
              <Sparkles className="w-3.5 h-3.5 text-[#00c896]" />
              <span>AEO Research & Publications</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white leading-tight">
              Technical insights &{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-[#00c896] to-[#00b285]">
                systems research.
              </span>
            </h2>
          </div>

          <p className="text-sm sm:text-base text-neutral-400 max-w-sm leading-relaxed font-mono">
            Authoritative documentation on Answer Engine Optimization, low-latency WebGL execution, and event pipelines.
          </p>
        </div>

        {/* Insights Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {INSIGHTS_DATA.map((article, index) => (
            <motion.div
              key={article.slug}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.45, delay: index * 0.1 }}
              className="group relative flex flex-col justify-between rounded-2xl border border-[#1f1f1f] bg-[#141414]/70 hover:bg-[#181818]/90 hover:border-[#00c896]/60 transition-all duration-300 backdrop-blur-md p-6 sm:p-8"
            >
              {/* Corner Glow Accent */}
              <div className="absolute top-0 right-0 w-24 h-24 bg-[#00c896]/5 rounded-bl-full pointer-events-none group-hover:bg-[#00c896]/10 transition-colors" />

              <div>
                <div className="flex items-center justify-between gap-2 mb-4 text-xs font-mono">
                  <span className="uppercase tracking-wider text-[#00c896] font-semibold bg-[#00c896]/10 px-2.5 py-1 rounded-md border border-[#00c896]/20">
                    {article.category}
                  </span>
                  <span className="text-neutral-500 flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    <span>{article.readTime}</span>
                  </span>
                </div>

                <h3 className="text-xl sm:text-2xl font-bold text-white group-hover:text-[#00c896] transition-colors leading-snug">
                  <Link href={`/insights/${article.slug}`} className="focus:outline-none">
                    {article.title}
                  </Link>
                </h3>

                <p className="mt-3 text-sm text-neutral-400 leading-relaxed">
                  {article.summary}
                </p>

                <div className="mt-6 space-y-2 border-t border-[#1f1f1f] pt-4">
                  {article.keyTakeaways.slice(0, 2).map((point, idx) => (
                    <div key={idx} className="flex items-start gap-2 text-xs text-neutral-300 font-mono">
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#00c896] shrink-0 mt-0.5" />
                      <span className="line-clamp-2">{point}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-8 pt-6 border-t border-[#1f1f1f]/80 flex items-center justify-between">
                <Link
                  href={`/insights/${article.slug}`}
                  className="text-xs font-semibold text-neutral-300 group-hover:text-white transition-colors flex items-center gap-1 font-mono focus:outline-none"
                >
                  <span>Read Whitepaper</span>
                </Link>
                <Link
                  href={`/insights/${article.slug}`}
                  aria-label={`Read ${article.title}`}
                  className="w-8 h-8 rounded-full bg-[#1f1f1f] border border-[#1f1f1f] group-hover:bg-[#00c896] group-hover:border-[#00c896] flex items-center justify-center text-neutral-300 group-hover:text-[#040404] transition-all duration-200"
                >
                  <ArrowUpRight className="w-4 h-4" />
                </Link>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Directory Footer Trigger */}
        <div className="mt-14 sm:mt-16 text-center">
          <Link
            href="/insights"
            className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl border border-[#1f1f1f] bg-[#1f1f1f]/60 hover:bg-[#1f1f1f] hover:border-[#00c896]/50 text-white font-mono text-xs font-semibold transition-all group shadow-lg"
          >
            <span>Explore All Technical Publications</span>
            <ArrowRight className="w-4 h-4 text-[#00c896] group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </div>
    </section>
  );
}