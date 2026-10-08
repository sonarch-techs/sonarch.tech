"use client";

import { motion } from "framer-motion";
import {
  ArrowUpRight,
  ArrowRight,
  Sparkles,
  CheckCircle2,
  Cpu,
  Zap,
  Bot,
  Search,
  Palette,
  TrendingUp,
  Layers,
} from "lucide-react";
import Link from "next/link";
import { SERVICES_DATA, getService } from "@/data/services";

export function Services() {
  const webDev = getService("website-development") || SERVICES_DATA[0];
  const automation = getService("ai-automation-setup") || SERVICES_DATA[1];
  const chatbot = getService("ai-chatbots") || SERVICES_DATA[2];
  const seo = getService("seo-optimization") || SERVICES_DATA[3];
  const branding = getService("full-brand-creation") || SERVICES_DATA[4];
  const ads = getService("social-media-ads") || SERVICES_DATA[5];

  return (
    <section
      id="services"
      className="relative py-20 sm:py-28 bg-transparent text-neutral-900 dark:text-white overflow-hidden scroll-mt-20 lg:scroll-mt-24 z-10"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 sm:mb-16 gap-6">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-neutral-200 dark:border-[#1f1f1f] bg-white/80 dark:bg-[#1f1f1f]/80 text-[#008763] dark:text-[#00c896] text-xs font-semibold uppercase tracking-wider mb-4 font-mono shadow-sm">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Full-Stack Capabilities</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight leading-tight text-neutral-900 dark:text-white">
              High-leverage engineering &{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-neutral-900 via-[#008763] to-[#008763] dark:from-white dark:via-[#00c896] dark:to-[#00b285]">
                growth systems.
              </span>
            </h2>
          </div>

          <p className="text-sm sm:text-base text-neutral-600 dark:text-neutral-400 max-w-sm leading-relaxed font-mono">
            Everything you need to launch, automate, and scale your digital presence under one high-performance architecture.
          </p>
        </div>

        {/* Asymmetric Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          
          {/* Card 1: Website Development (Wide) */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.45 }}
            className="lg:col-span-2 group relative flex flex-col justify-between rounded-2xl border border-neutral-200 dark:border-[#1f1f1f] bg-white/80 dark:bg-[#141414]/70 hover:border-[#008763]/50 dark:hover:border-[#00c896]/60 transition-all duration-300 backdrop-blur-md p-6 sm:p-8 shadow-sm dark:shadow-none"
          >
            <div>
              <div className="flex items-center justify-between gap-2 mb-4">
                <span className="text-xs uppercase tracking-wider text-[#008763] dark:text-[#00c896] font-semibold font-mono bg-[#008763]/10 dark:bg-[#00c896]/10 px-2.5 py-1 rounded-md border border-[#008763]/20 dark:border-[#00c896]/20 flex items-center gap-1.5">
                  <Cpu className="w-3.5 h-3.5" />
                  <span>{webDev.badge}</span>
                </span>
                <span className="text-xs font-mono text-neutral-500">Tier 01 // Core</span>
              </div>

              <h3 className="text-2xl sm:text-3xl font-bold text-neutral-900 dark:text-white group-hover:text-[#008763] dark:group-hover:text-[#00c896] transition-colors leading-snug">
                <Link href={`/services/${webDev.slug}`} className="focus:outline-none">
                  {webDev.title}
                </Link>
              </h3>

              <p className="mt-3 text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed max-w-2xl">
                {webDev.summary}
              </p>

              {/* Highlights */}
              <div className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-3">
                {webDev.highlights.map((h, i) => (
                  <div
                    key={i}
                    className="p-3 rounded-xl border border-neutral-200 dark:border-[#1f1f1f] bg-neutral-50/80 dark:bg-[#040404]/60 flex items-center gap-2 text-xs font-mono text-neutral-700 dark:text-neutral-300"
                  >
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#008763] dark:text-[#00c896] shrink-0" />
                    <span>{h}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-8 pt-6 border-t border-neutral-200 dark:border-[#1f1f1f]/80 flex items-center justify-between">
              <Link
                href={`/services/${webDev.slug}`}
                className="text-xs font-semibold text-neutral-700 dark:text-neutral-300 group-hover:text-neutral-900 dark:group-hover:text-white transition-colors flex items-center gap-1.5 font-mono"
              >
                <span>{webDev.ctaLabel}</span>
                <ArrowRight className="w-3.5 h-3.5 text-[#008763] dark:text-[#00c896]" />
              </Link>
              <Link
                href={`/services/${webDev.slug}`}
                aria-label={`Open service detail for ${webDev.title}`}
                className="w-8 h-8 rounded-full bg-neutral-100 dark:bg-[#1f1f1f] border border-neutral-200 dark:border-[#1f1f1f] group-hover:bg-[#008763] dark:group-hover:bg-[#00c896] group-hover:border-transparent flex items-center justify-center text-neutral-700 dark:text-neutral-300 group-hover:text-white dark:group-hover:text-[#040404] transition-all duration-200"
              >
                <ArrowUpRight className="w-4 h-4" />
              </Link>
            </div>
          </motion.div>

          {/* Card 2: AI Automation Setup (Compact) */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.45, delay: 0.08 }}
            className="lg:col-span-1 group relative flex flex-col justify-between rounded-2xl border border-neutral-200 dark:border-[#1f1f1f] bg-white/80 dark:bg-[#141414]/70 hover:border-[#008763]/50 dark:hover:border-[#00c896]/60 transition-all duration-300 backdrop-blur-md p-6 sm:p-8 shadow-sm dark:shadow-none"
          >
            <div>
              <div className="mb-4">
                <span className="text-xs uppercase tracking-wider text-[#008763] dark:text-[#00c896] font-semibold font-mono bg-[#008763]/10 dark:bg-[#00c896]/10 px-2.5 py-1 rounded-md border border-[#008763]/20 dark:border-[#00c896]/20 flex items-center gap-1.5 w-fit">
                  <Zap className="w-3.5 h-3.5" />
                  <span>{automation.badge}</span>
                </span>
              </div>

              <h3 className="text-xl sm:text-2xl font-bold text-neutral-900 dark:text-white group-hover:text-[#008763] dark:group-hover:text-[#00c896] transition-colors leading-snug">
                <Link href={`/services/${automation.slug}`} className="focus:outline-none">
                  {automation.title}
                </Link>
              </h3>

              <p className="mt-3 text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed">
                {automation.summary}
              </p>

              <div className="mt-6 p-4 rounded-xl border border-neutral-200 dark:border-[#1f1f1f] bg-neutral-50/80 dark:bg-[#040404]/60">
                <div className="text-[10px] font-mono uppercase tracking-wider text-neutral-500 mb-2">
                  Pipeline Execution
                </div>
                <div className="flex items-center justify-between text-xs font-mono text-[#008763] dark:text-[#00c896]">
                  <span className="px-2 py-1 rounded bg-white dark:bg-[#1f1f1f] border border-neutral-200 dark:border-[#1f1f1f] text-neutral-800 dark:text-neutral-200">Trigger</span>
                  <span className="text-neutral-400">→</span>
                  <span className="px-2 py-1 rounded bg-white dark:bg-[#1f1f1f] border border-neutral-200 dark:border-[#1f1f1f] text-neutral-800 dark:text-neutral-200">Process</span>
                  <span className="text-neutral-400">→</span>
                  <span className="px-2 py-1 rounded bg-white dark:bg-[#1f1f1f] border border-neutral-200 dark:border-[#1f1f1f] text-neutral-800 dark:text-neutral-200">Auto Sync</span>
                </div>
              </div>
            </div>

            <div className="mt-8 pt-6 border-t border-neutral-200 dark:border-[#1f1f1f]/80 flex items-center justify-between">
              <Link
                href={`/services/${automation.slug}`}
                className="text-xs font-semibold text-neutral-700 dark:text-neutral-300 group-hover:text-neutral-900 dark:group-hover:text-white transition-colors flex items-center gap-1.5 font-mono"
              >
                <span>{automation.ctaLabel}</span>
                <ArrowRight className="w-3.5 h-3.5 text-[#008763] dark:text-[#00c896]" />
              </Link>
              <Link
                href={`/services/${automation.slug}`}
                aria-label={`Open service detail for ${automation.title}`}
                className="w-8 h-8 rounded-full bg-neutral-100 dark:bg-[#1f1f1f] border border-neutral-200 dark:border-[#1f1f1f] group-hover:bg-[#008763] dark:group-hover:bg-[#00c896] group-hover:border-transparent flex items-center justify-center text-neutral-700 dark:text-neutral-300 group-hover:text-white dark:group-hover:text-[#040404] transition-all duration-200"
              >
                <ArrowUpRight className="w-4 h-4" />
              </Link>
            </div>
          </motion.div>

          {/* Card 3: AI Chatbots */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.45, delay: 0.12 }}
            className="lg:col-span-1 group relative flex flex-col justify-between rounded-2xl border border-neutral-200 dark:border-[#1f1f1f] bg-white/80 dark:bg-[#141414]/70 hover:border-[#008763]/50 dark:hover:border-[#00c896]/60 transition-all duration-300 backdrop-blur-md p-6 sm:p-8 shadow-sm dark:shadow-none"
          >
            <div>
              <div className="flex items-center justify-between gap-2 mb-4">
                <span className="text-xs uppercase tracking-wider text-[#008763] dark:text-[#00c896] font-semibold font-mono bg-[#008763]/10 dark:bg-[#00c896]/10 px-2.5 py-1 rounded-md border border-[#008763]/20 dark:border-[#00c896]/20 flex items-center gap-1.5">
                  <Bot className="w-3.5 h-3.5" />
                  <span>{chatbot.badge}</span>
                </span>
                <span className="flex items-center gap-1.5 text-[10px] font-mono text-[#008763] dark:text-[#00c896]">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#008763] dark:bg-[#00c896] animate-pulse" />
                  <span>Live</span>
                </span>
              </div>

              <h3 className="text-xl sm:text-2xl font-bold text-neutral-900 dark:text-white group-hover:text-[#008763] dark:group-hover:text-[#00c896] transition-colors leading-snug">
                <Link href={`/services/${chatbot.slug}`} className="focus:outline-none">
                  {chatbot.title}
                </Link>
              </h3>

              <p className="mt-3 text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed">
                {chatbot.summary}
              </p>

              <div className="mt-6 p-3.5 rounded-xl border border-neutral-200 dark:border-[#1f1f1f] bg-neutral-50/80 dark:bg-[#040404]/60">
                <div className="flex items-center gap-2 text-xs font-mono text-neutral-800 dark:text-neutral-300">
                  <span className="w-2 h-2 rounded-full bg-[#008763] dark:bg-[#00c896]" />
                  <span>Autonomous Lead Qualification</span>
                </div>
                <div className="text-[10px] text-neutral-500 font-mono mt-1 pl-4">
                  24/7 Context Memory & Guardrails
                </div>
              </div>
            </div>

            <div className="mt-8 pt-6 border-t border-neutral-200 dark:border-[#1f1f1f]/80 flex items-center justify-between">
              <Link
                href={`/services/${chatbot.slug}`}
                className="text-xs font-semibold text-neutral-700 dark:text-neutral-300 group-hover:text-neutral-900 dark:group-hover:text-white transition-colors flex items-center gap-1.5 font-mono"
              >
                <span>{chatbot.ctaLabel}</span>
                <ArrowRight className="w-3.5 h-3.5 text-[#008763] dark:text-[#00c896]" />
              </Link>
              <Link
                href={`/services/${chatbot.slug}`}
                aria-label={`Open service detail for ${chatbot.title}`}
                className="w-8 h-8 rounded-full bg-neutral-100 dark:bg-[#1f1f1f] border border-neutral-200 dark:border-[#1f1f1f] group-hover:bg-[#008763] dark:group-hover:bg-[#00c896] group-hover:border-transparent flex items-center justify-center text-neutral-700 dark:text-neutral-300 group-hover:text-white dark:group-hover:text-[#040404] transition-all duration-200"
              >
                <ArrowUpRight className="w-4 h-4" />
              </Link>
            </div>
          </motion.div>

          {/* Card 4: SEO & AEO (Wide) */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.45, delay: 0.16 }}
            className="lg:col-span-2 group relative flex flex-col justify-between rounded-2xl border border-neutral-200 dark:border-[#1f1f1f] bg-white/80 dark:bg-[#141414]/70 hover:border-[#008763]/50 dark:hover:border-[#00c896]/60 transition-all duration-300 backdrop-blur-md p-6 sm:p-8 shadow-sm dark:shadow-none"
          >
            <div>
              <div className="flex items-center justify-between gap-2 mb-4">
                <span className="text-xs uppercase tracking-wider text-[#008763] dark:text-[#00c896] font-semibold font-mono bg-[#008763]/10 dark:bg-[#00c896]/10 px-2.5 py-1 rounded-md border border-[#008763]/20 dark:border-[#00c896]/20 flex items-center gap-1.5">
                  <Search className="w-3.5 h-3.5" />
                  <span>{seo.badge}</span>
                </span>
                <span className="text-xs font-mono text-neutral-500">LLM Citations</span>
              </div>

              <h3 className="text-2xl sm:text-3xl font-bold text-neutral-900 dark:text-white group-hover:text-[#008763] dark:group-hover:text-[#00c896] transition-colors leading-snug">
                <Link href={`/services/${seo.slug}`} className="focus:outline-none">
                  {seo.title}
                </Link>
              </h3>

              <p className="mt-3 text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed max-w-2xl">
                {seo.summary}
              </p>

              <div className="mt-6 flex flex-wrap gap-2.5">
                <span className="px-3 py-1.5 rounded-lg border border-neutral-200 dark:border-[#1f1f1f] bg-neutral-50/80 dark:bg-[#040404]/60 text-xs font-mono text-neutral-700 dark:text-neutral-300">
                  JSON-LD Entity Graphs
                </span>
                <span className="px-3 py-1.5 rounded-lg border border-[#008763]/30 dark:border-[#00c896]/30 bg-[#008763]/10 dark:bg-[#00c896]/10 text-xs font-mono text-[#008763] dark:text-[#00c896]">
                  Perplexity & ChatGPT Citations
                </span>
                <span className="px-3 py-1.5 rounded-lg border border-neutral-200 dark:border-[#1f1f1f] bg-neutral-50/80 dark:bg-[#040404]/60 text-xs font-mono text-neutral-700 dark:text-neutral-300">
                  Top-Tier Keyword Velocity
                </span>
              </div>
            </div>

            <div className="mt-8 pt-6 border-t border-neutral-200 dark:border-[#1f1f1f]/80 flex items-center justify-between">
              <Link
                href={`/services/${seo.slug}`}
                className="text-xs font-semibold text-neutral-700 dark:text-neutral-300 group-hover:text-neutral-900 dark:group-hover:text-white transition-colors flex items-center gap-1.5 font-mono"
              >
                <span>{seo.ctaLabel}</span>
                <ArrowRight className="w-3.5 h-3.5 text-[#008763] dark:text-[#00c896]" />
              </Link>
              <Link
                href={`/services/${seo.slug}`}
                aria-label={`Open service detail for ${seo.title}`}
                className="w-8 h-8 rounded-full bg-neutral-100 dark:bg-[#1f1f1f] border border-neutral-200 dark:border-[#1f1f1f] group-hover:bg-[#008763] dark:group-hover:bg-[#00c896] group-hover:border-transparent flex items-center justify-center text-neutral-700 dark:text-neutral-300 group-hover:text-white dark:group-hover:text-[#040404] transition-all duration-200"
              >
                <ArrowUpRight className="w-4 h-4" />
              </Link>
            </div>
          </motion.div>

          {/* Card 5: Full Brand Creation (Wide) */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.45, delay: 0.2 }}
            className="lg:col-span-2 group relative flex flex-col justify-between rounded-2xl border border-neutral-200 dark:border-[#1f1f1f] bg-white/80 dark:bg-[#141414]/70 hover:border-[#008763]/50 dark:hover:border-[#00c896]/60 transition-all duration-300 backdrop-blur-md p-6 sm:p-8 shadow-sm dark:shadow-none"
          >
            <div>
              <div className="flex items-center justify-between gap-2 mb-4">
                <span className="text-xs uppercase tracking-wider text-[#008763] dark:text-[#00c896] font-semibold font-mono bg-[#008763]/10 dark:bg-[#00c896]/10 px-2.5 py-1 rounded-md border border-[#008763]/20 dark:border-[#00c896]/20 flex items-center gap-1.5">
                  <Palette className="w-3.5 h-3.5" />
                  <span>{branding.badge}</span>
                </span>
                <span className="text-xs font-mono text-neutral-500">Visual System</span>
              </div>

              <h3 className="text-2xl sm:text-3xl font-bold text-neutral-900 dark:text-white group-hover:text-[#008763] dark:group-hover:text-[#00c896] transition-colors leading-snug">
                <Link href={`/services/${branding.slug}`} className="focus:outline-none">
                  {branding.title}
                </Link>
              </h3>

              <p className="mt-3 text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed max-w-2xl">
                {branding.summary}
              </p>

              <div className="mt-6 flex flex-wrap items-center gap-3">
                <span className="px-3 py-1.5 rounded-lg border border-neutral-200 dark:border-[#1f1f1f] bg-neutral-50/80 dark:bg-[#040404]/60 text-xs font-mono text-neutral-700 dark:text-neutral-300">
                  Design Tokens
                </span>
                <div className="flex items-center gap-2 p-1.5 px-3 rounded-lg border border-neutral-200 dark:border-[#1f1f1f] bg-neutral-50/80 dark:bg-[#040404]/60">
                  <span className="w-3.5 h-3.5 rounded bg-slate-100 dark:bg-[#040404] border border-neutral-300 dark:border-[#1f1f1f]" title="Base" />
                  <span className="w-3.5 h-3.5 rounded bg-slate-200 dark:bg-[#1f1f1f]" title="Surface" />
                  <span className="w-3.5 h-3.5 rounded bg-[#008763] dark:bg-[#00c896]" title="Accent" />
                  <span className="text-[11px] font-mono text-neutral-600 dark:text-neutral-400 ml-1">Color Palette Hierarchy</span>
                </div>
              </div>
            </div>

            <div className="mt-8 pt-6 border-t border-neutral-200 dark:border-[#1f1f1f]/80 flex items-center justify-between">
              <Link
                href={`/services/${branding.slug}`}
                className="text-xs font-semibold text-neutral-700 dark:text-neutral-300 group-hover:text-neutral-900 dark:group-hover:text-white transition-colors flex items-center gap-1.5 font-mono"
              >
                <span>{branding.ctaLabel}</span>
                <ArrowRight className="w-3.5 h-3.5 text-[#008763] dark:text-[#00c896]" />
              </Link>
              <Link
                href={`/services/${branding.slug}`}
                aria-label={`Open service detail for ${branding.title}`}
                className="w-8 h-8 rounded-full bg-neutral-100 dark:bg-[#1f1f1f] border border-neutral-200 dark:border-[#1f1f1f] group-hover:bg-[#008763] dark:group-hover:bg-[#00c896] group-hover:border-transparent flex items-center justify-center text-neutral-700 dark:text-neutral-300 group-hover:text-white dark:group-hover:text-[#040404] transition-all duration-200"
              >
                <ArrowUpRight className="w-4 h-4" />
              </Link>
            </div>
          </motion.div>

          {/* Card 6: Social Media Ads (Compact) */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.45, delay: 0.24 }}
            className="lg:col-span-1 group relative flex flex-col justify-between rounded-2xl border border-neutral-200 dark:border-[#1f1f1f] bg-white/80 dark:bg-[#141414]/70 hover:border-[#008763]/50 dark:hover:border-[#00c896]/60 transition-all duration-300 backdrop-blur-md p-6 sm:p-8 shadow-sm dark:shadow-none"
          >
            <div>
              <div className="mb-4">
                <span className="text-xs uppercase tracking-wider text-[#008763] dark:text-[#00c896] font-semibold font-mono bg-[#008763]/10 dark:bg-[#00c896]/10 px-2.5 py-1 rounded-md border border-[#008763]/20 dark:border-[#00c896]/20 flex items-center gap-1.5 w-fit">
                  <TrendingUp className="w-3.5 h-3.5" />
                  <span>{ads.badge}</span>
                </span>
              </div>

              <h3 className="text-xl sm:text-2xl font-bold text-neutral-900 dark:text-white group-hover:text-[#008763] dark:group-hover:text-[#00c896] transition-colors leading-snug">
                <Link href={`/services/${ads.slug}`} className="focus:outline-none">
                  {ads.title}
                </Link>
              </h3>

              <p className="mt-3 text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed">
                {ads.summary}
              </p>

              <div className="mt-6 space-y-2">
                <div className="p-2.5 rounded-lg border border-neutral-200 dark:border-[#1f1f1f] bg-neutral-50/80 dark:bg-[#040404]/60 text-xs font-mono text-neutral-700 dark:text-neutral-300 flex items-center justify-between">
                  <span>Precision Retargeting</span>
                  <span className="text-[#008763] dark:text-[#00c896] font-bold">100% CAPI</span>
                </div>
                <div className="p-2.5 rounded-lg border border-neutral-200 dark:border-[#1f1f1f] bg-neutral-50/80 dark:bg-[#040404]/60 text-xs font-mono text-neutral-700 dark:text-neutral-300 flex items-center justify-between">
                  <span>Scalable Inbound CAC</span>
                  <span className="text-[#008763] dark:text-[#00c896] font-bold">3.5x+ ROAS</span>
                </div>
              </div>
            </div>

            <div className="mt-8 pt-6 border-t border-neutral-200 dark:border-[#1f1f1f]/80 flex items-center justify-between">
              <Link
                href={`/services/${ads.slug}`}
                className="text-xs font-semibold text-neutral-700 dark:text-neutral-300 group-hover:text-neutral-900 dark:group-hover:text-white transition-colors flex items-center gap-1.5 font-mono"
              >
                <span>{ads.ctaLabel}</span>
                <ArrowRight className="w-3.5 h-3.5 text-[#008763] dark:text-[#00c896]" />
              </Link>
              <Link
                href={`/services/${ads.slug}`}
                aria-label={`Open service detail for ${ads.title}`}
                className="w-8 h-8 rounded-full bg-neutral-100 dark:bg-[#1f1f1f] border border-neutral-200 dark:border-[#1f1f1f] group-hover:bg-[#008763] dark:group-hover:bg-[#00c896] group-hover:border-transparent flex items-center justify-center text-neutral-700 dark:text-neutral-300 group-hover:text-white dark:group-hover:text-[#040404] transition-all duration-200"
              >
                <ArrowUpRight className="w-4 h-4" />
              </Link>
            </div>
          </motion.div>

        </div>

        {/* Directory Banner */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-20px" }}
          transition={{ duration: 0.45 }}
          className="mt-14 sm:mt-16 flex flex-col md:flex-row items-center justify-between gap-6 p-6 sm:p-8 rounded-2xl border border-neutral-200 dark:border-[#1f1f1f] bg-white/80 dark:bg-[#141414]/60 hover:border-[#008763]/40 dark:hover:border-[#00c896]/40 transition-colors backdrop-blur-md shadow-sm dark:shadow-2xl"
        >
          <div className="flex flex-col sm:flex-row sm:items-center gap-4 text-center sm:text-left">
            <div className="w-12 h-12 rounded-xl bg-[#008763]/10 dark:bg-[#00c896]/10 border border-[#008763]/30 dark:border-[#00c896]/30 flex items-center justify-center text-[#008763] dark:text-[#00c896] mx-auto sm:mx-0 shrink-0">
              <Layers className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center justify-center sm:justify-start gap-2">
                <h4 className="text-base sm:text-lg font-bold text-neutral-900 dark:text-white font-mono">
                  Explore The Full Systems Catalog
                </h4>
                <span className="w-1.5 h-1.5 rounded-full bg-[#008763] dark:bg-[#00c896] animate-pulse hidden sm:inline-block" />
              </div>
              <p className="text-xs sm:text-sm text-neutral-600 dark:text-neutral-400 mt-1 max-w-xl">
                Inspect comprehensive architecture specifications, production tech stacks, and sprint roadmaps across all 6 offerings.
              </p>
            </div>
          </div>

          <Link
            href="/services"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-xl bg-[#008763] dark:bg-[#00c896] hover:bg-[#006f52] dark:hover:bg-[#00b285] text-white dark:text-[#040404] font-mono text-xs font-bold transition-all shadow-md group shrink-0"
          >
            <span>View Full Capabilities Directory</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </motion.div>

      </div>
    </section>
  );
}