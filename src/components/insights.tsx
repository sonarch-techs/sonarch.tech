"use client";

import { motion } from "framer-motion";
import { BookOpen, ArrowUpRight, Clock, Calendar } from "lucide-react";
import Link from "next/link";

interface InsightPost {
  slug: string;
  title: string;
  category: string;
  excerpt: string;
  readTime: string;
  date: string;
}

const FEATURED_INSIGHTS: InsightPost[] = [
  {
    slug: "aeo-rank-engine-architecture",
    title: "Engineering for AI Answer Engine Optimization (AEO) in 2026",
    category: "Search Architecture",
    excerpt:
      "Why traditional keyword stuffing is obsolete, and how semantic JSON-LD knowledge graphs dictate brand inclusion across Perplexity, ChatGPT Search, and Google Gemini.",
    readTime: "5 min read",
    date: "Oct 2026",
  },
  {
    slug: "sub-second-web-vitals",
    title: "Sub-Second Core Web Vitals: Next.js & Edge Invalidation Strategies",
    category: "Full-Stack Web",
    excerpt:
      "A deep dive into Incremental Static Regeneration (ISR), asset tree-shaking, and optimizing Largest Contentful Paint (LCP) down to sub-400ms across mobile devices.",
    readTime: "7 min read",
    date: "Sep 2026",
  },
  {
    slug: "autonomous-event-pipelines",
    title: "Eliminating CRM Bloat with Server Actions and Supabase Edge Hooks",
    category: "Systems Design",
    excerpt:
      "How to build high-throughput, low-latency client ingestion pipelines that validate, enrich, and route inbound leads without paying thousands for bloated SaaS middleware.",
    readTime: "6 min read",
    date: "Aug 2026",
  },
];

export function Insights() {
  return (
    <section
      id="insights"
      className="relative py-20 sm:py-28 bg-[#040404] text-white overflow-hidden scroll-mt-20 lg:scroll-mt-24"
    >
      {/* Ambient background bloom */}
      <div className="absolute top-1/2 left-1/3 w-[500px] h-[300px] bg-[#00c896]/5 blur-[140px] rounded-full pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 sm:mb-16 gap-6">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-[#1f1f1f] bg-[#1f1f1f]/80 text-[#00c896] text-xs font-semibold uppercase tracking-wider mb-4">
              <BookOpen className="w-3.5 h-3.5 text-[#00c896]" />
              <span>Technical Publications</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white leading-tight">
              Engineering perspectives &{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-[#00c896] to-[#00b285]">
                systems breakdowns.
              </span>
            </h2>
          </div>

          <p className="text-sm sm:text-base text-neutral-400 max-w-sm leading-relaxed">
            Our latest research on full-stack architecture, performance optimization, and search engine intelligence.
          </p>
        </div>

        {/* Insights Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {FEATURED_INSIGHTS.map((post, index) => (
            <motion.article
              key={post.slug}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.45, delay: index * 0.12 }}
              className="group relative flex flex-col justify-between rounded-2xl border border-[#1f1f1f] bg-[#1f1f1f]/35 p-6 sm:p-7 hover:border-[#00c896]/50 hover:bg-[#1f1f1f]/60 transition-all duration-300 backdrop-blur-sm"
            >
              <div>
                {/* Meta details */}
                <div className="flex items-center justify-between text-xs text-neutral-500 mb-4 font-mono">
                  <span className="inline-block px-2.5 py-0.5 rounded-full bg-[#00c896]/10 text-[#00c896] border border-[#00c896]/20 font-sans font-medium text-[11px]">
                    {post.category}
                  </span>
                  <div className="flex items-center gap-3">
                    <span className="inline-flex items-center gap-1">
                      <Clock className="w-3 h-3 text-neutral-500" />
                      {post.readTime}
                    </span>
                    <span className="inline-flex items-center gap-1">
                      <Calendar className="w-3 h-3 text-neutral-500" />
                      {post.date}
                    </span>
                  </div>
                </div>

                {/* Title */}
                <h3 className="text-lg sm:text-xl font-bold text-white group-hover:text-[#00c896] transition-colors leading-snug">
                  {post.title}
                </h3>

                {/* Excerpt */}
                <p className="mt-3 text-xs sm:text-sm text-neutral-400 leading-relaxed">
                  {post.excerpt}
                </p>
              </div>

              {/* Action trigger */}
              <Link
  href={`/insights/${post.slug}`}
  className="mt-6 pt-5 border-t border-[#1f1f1f] flex items-center justify-between group/link"
>
  <span className="text-xs font-semibold text-neutral-400 group-hover/link:text-white transition-colors">
    Read Technical Breakdown
  </span>
  <div className="w-7 h-7 rounded-full bg-[#1f1f1f] border border-[#1f1f1f] group-hover/link:bg-[#00c896] group-hover/link:border-[#00c896] flex items-center justify-center text-neutral-400 group-hover/link:text-[#040404] transition-all">
    <ArrowUpRight className="w-3.5 h-3.5" />
  </div>
</Link>
            </motion.article>
          ))}
        </div>

      </div>
    </section>
  );
}