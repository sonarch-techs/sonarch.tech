"use client";

import { motion } from "framer-motion";
import {
  Code2,
  Workflow,
  Bot,
  Palette,
  Target,
  Search,
  Sparkles,
  ArrowRight,
  TrendingUp,
  Activity,
  Zap,
  CheckCircle2,
} from "lucide-react";
import Link from "next/link";

export function Services() {
  return (
    <section
  id="services"
  className="relative py-20 sm:py-28 bg-transparent text-white overflow-hidden scroll-mt-20 lg:scroll-mt-24 z-10"
>
      {/* Ambient background mint glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] bg-[#00c896]/5 blur-[150px] rounded-full pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14 sm:mb-20">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-[#1f1f1f] bg-[#1f1f1f]/80 text-[#00c896] text-xs font-semibold uppercase tracking-wider mb-4">
            <Sparkles className="w-3.5 h-3.5 text-[#00c896]" />
            <span>Expertise</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white leading-tight">
            Our{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-[#00c896] to-[#00b285]">
              Services
            </span>
          </h2>

          <p className="mt-4 text-sm sm:text-base lg:text-lg text-neutral-400 leading-relaxed max-w-2xl mx-auto">
            End-to-end digital solutions designed to elevate your brand, automate
            your workflows, and drive measurable ROI.
          </p>
        </div>

        {/* Bento Grid Container */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
          
          {/* Card 1: Website Development (Wide - 2 Columns) */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.45 }}
            className="group relative md:col-span-2 lg:col-span-2 rounded-2xl border border-[#1f1f1f] bg-[#1f1f1f]/35 p-7 sm:p-8 hover:border-[#00c896]/50 hover:bg-[#1f1f1f]/60 transition-all duration-300 backdrop-blur-sm flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between mb-6">
                <div className="w-12 h-12 rounded-xl bg-[#1f1f1f] border border-[#1f1f1f] group-hover:border-[#00c896]/40 flex items-center justify-center text-[#00c896] transition-colors">
                  <Code2 className="w-6 h-6" />
                </div>
                <span className="text-[11px] font-mono text-neutral-500 uppercase tracking-wider bg-[#040404]/80 px-2.5 py-1 rounded-md border border-[#1f1f1f]">
                  Next.js & Architecture
                </span>
              </div>

              <div className="max-w-xl">
                <h3 className="text-xl sm:text-2xl font-bold text-white group-hover:text-[#00c896] transition-colors">
                  Website Development
                </h3>
                <p className="mt-2.5 text-sm sm:text-base text-neutral-400 leading-relaxed">
                  High-performance, responsive websites built to convert and scale your digital presence.
                </p>
              </div>

              {/* Bento Feature Telemetry */}
              <div className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div className="p-3 rounded-xl border border-[#1f1f1f] bg-[#040404]/60 flex items-center gap-2.5">
                  <Activity className="w-4 h-4 text-[#00c896]" />
                  <span className="text-xs text-neutral-300 font-medium">99+ Lighthouse Vitals</span>
                </div>
                <div className="p-3 rounded-xl border border-[#1f1f1f] bg-[#040404]/60 flex items-center gap-2.5">
                  <Zap className="w-4 h-4 text-[#00c896]" />
                  <span className="text-xs text-neutral-300 font-medium">Sub-Second Load Times</span>
                </div>
                <div className="p-3 rounded-xl border border-[#1f1f1f] bg-[#040404]/60 flex items-center gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-[#00c896]" />
                  <span className="text-xs text-neutral-300 font-medium">Conversion-Optimized</span>
                </div>
              </div>
            </div>

            <div className="mt-8 pt-5 border-t border-[#1f1f1f]/80 flex items-center justify-between">
              <span className="text-xs font-semibold text-neutral-400 group-hover:text-white transition-colors">
                Engineer Website
              </span>
              <Link
                href="#contact"
                className="w-8 h-8 rounded-full bg-[#1f1f1f] border border-[#1f1f1f] group-hover:bg-[#00c896] group-hover:border-[#00c896] flex items-center justify-center text-neutral-400 group-hover:text-[#040404] transition-all"
              >
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </motion.div>

          {/* Card 2: AI Automation Setup (Standard - 1 Column) */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.45, delay: 0.08 }}
            className="group relative md:col-span-1 lg:col-span-1 rounded-2xl border border-[#1f1f1f] bg-[#1f1f1f]/35 p-7 hover:border-[#00c896]/50 hover:bg-[#1f1f1f]/60 transition-all duration-300 backdrop-blur-sm flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between mb-6">
                <div className="w-12 h-12 rounded-xl bg-[#1f1f1f] border border-[#1f1f1f] group-hover:border-[#00c896]/40 flex items-center justify-center text-[#00c896] transition-colors">
                  <Workflow className="w-6 h-6" />
                </div>
                <span className="text-[11px] font-mono text-neutral-500 uppercase tracking-wider bg-[#040404]/80 px-2.5 py-1 rounded-md border border-[#1f1f1f]">
                  Workflows
                </span>
              </div>

              <h3 className="text-xl font-bold text-white group-hover:text-[#00c896] transition-colors">
                AI Automation Setup
              </h3>
              <p className="mt-3 text-sm text-neutral-400 leading-relaxed">
                Automate repetitive tasks and streamline your operations with custom workflows.
              </p>

              {/* Node Pipeline Preview */}
              <div className="mt-6 p-3 rounded-xl border border-[#1f1f1f] bg-[#040404]/60 font-mono text-[11px] text-neutral-400 flex items-center justify-between">
                <span className="text-[#00c896]">Trigger</span>
                <span>→</span>
                <span>Process</span>
                <span>→</span>
                <span className="text-white">Auto Sync</span>
              </div>
            </div>

            <div className="mt-8 pt-5 border-t border-[#1f1f1f]/80 flex items-center justify-between">
              <span className="text-xs font-semibold text-neutral-400 group-hover:text-white transition-colors">
                Build Workflows
              </span>
              <Link
                href="#contact"
                className="w-8 h-8 rounded-full bg-[#1f1f1f] border border-[#1f1f1f] group-hover:bg-[#00c896] group-hover:border-[#00c896] flex items-center justify-center text-neutral-400 group-hover:text-[#040404] transition-all"
              >
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </motion.div>

          {/* Card 3: AI Chatbots (Standard - 1 Column) */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.45, delay: 0.14 }}
            className="group relative md:col-span-1 lg:col-span-1 rounded-2xl border border-[#1f1f1f] bg-[#1f1f1f]/35 p-7 hover:border-[#00c896]/50 hover:bg-[#1f1f1f]/60 transition-all duration-300 backdrop-blur-sm flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between mb-6">
                <div className="w-12 h-12 rounded-xl bg-[#1f1f1f] border border-[#1f1f1f] group-hover:border-[#00c896]/40 flex items-center justify-center text-[#00c896] transition-colors">
                  <Bot className="w-6 h-6" />
                </div>
                <span className="text-[11px] font-mono text-neutral-500 uppercase tracking-wider bg-[#040404]/80 px-2.5 py-1 rounded-md border border-[#1f1f1f]">
                  24/7 Agents
                </span>
              </div>

              <h3 className="text-xl font-bold text-white group-hover:text-[#00c896] transition-colors">
                AI Chatbots
              </h3>
              <p className="mt-3 text-sm text-neutral-400 leading-relaxed">
                Integrate intelligent bots for 24/7 customer support and lead generation.
              </p>

              {/* Status Indicator */}
              <div className="mt-6 p-3 rounded-xl border border-[#1f1f1f] bg-[#040404]/60 flex items-center gap-2 text-xs">
                <span className="w-2 h-2 rounded-full bg-[#00c896] animate-pulse" />
                <span className="text-neutral-300 font-medium">Autonomous Lead Qualification</span>
              </div>
            </div>

            <div className="mt-8 pt-5 border-t border-[#1f1f1f]/80 flex items-center justify-between">
              <span className="text-xs font-semibold text-neutral-400 group-hover:text-white transition-colors">
                Deploy Agent
              </span>
              <Link
                href="#contact"
                className="w-8 h-8 rounded-full bg-[#1f1f1f] border border-[#1f1f1f] group-hover:bg-[#00c896] group-hover:border-[#00c896] flex items-center justify-center text-neutral-400 group-hover:text-[#040404] transition-all"
              >
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </motion.div>

          {/* Card 4: SEO Optimization (Wide - 2 Columns) */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.45, delay: 0.2 }}
            className="group relative md:col-span-2 lg:col-span-2 rounded-2xl border border-[#1f1f1f] bg-[#1f1f1f]/35 p-7 sm:p-8 hover:border-[#00c896]/50 hover:bg-[#1f1f1f]/60 transition-all duration-300 backdrop-blur-sm flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between mb-6">
                <div className="w-12 h-12 rounded-xl bg-[#1f1f1f] border border-[#1f1f1f] group-hover:border-[#00c896]/40 flex items-center justify-center text-[#00c896] transition-colors">
                  <Search className="w-6 h-6" />
                </div>
                <span className="text-[11px] font-mono text-neutral-500 uppercase tracking-wider bg-[#040404]/80 px-2.5 py-1 rounded-md border border-[#1f1f1f]">
                  AEO & Organic Search
                </span>
              </div>

              <div className="max-w-xl">
                <h3 className="text-xl sm:text-2xl font-bold text-white group-hover:text-[#00c896] transition-colors">
                  SEO Optimization
                </h3>
                <p className="mt-2.5 text-sm sm:text-base text-neutral-400 leading-relaxed">
                  Dominate search rankings and earn valuable long-term organic traffic.
                </p>
              </div>

              {/* Semantic Index Badges */}
              <div className="mt-6 flex flex-wrap gap-2.5">
                <span className="px-3 py-1.5 rounded-lg border border-[#1f1f1f] bg-[#040404]/60 text-xs text-neutral-300 font-mono">
                  JSON-LD Entity Graphs
                </span>
                <span className="px-3 py-1.5 rounded-lg border border-[#1f1f1f] bg-[#040404]/60 text-xs text-[#00c896] font-mono">
                  Perplexity & ChatGPT Citations
                </span>
                <span className="px-3 py-1.5 rounded-lg border border-[#1f1f1f] bg-[#040404]/60 text-xs text-neutral-300 font-mono">
                  Top-Tier Keyword Velocity
                </span>
              </div>
            </div>

            <div className="mt-8 pt-5 border-t border-[#1f1f1f]/80 flex items-center justify-between">
              <span className="text-xs font-semibold text-neutral-400 group-hover:text-white transition-colors">
                Command Search
              </span>
              <Link
                href="#contact"
                className="w-8 h-8 rounded-full bg-[#1f1f1f] border border-[#1f1f1f] group-hover:bg-[#00c896] group-hover:border-[#00c896] flex items-center justify-center text-neutral-400 group-hover:text-[#040404] transition-all"
              >
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </motion.div>

          {/* Card 5: Full Brand Creation (Standard - 1 Column) */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.45, delay: 0.26 }}
            className="group relative md:col-span-1 lg:col-span-1 rounded-2xl border border-[#1f1f1f] bg-[#1f1f1f]/35 p-7 hover:border-[#00c896]/50 hover:bg-[#1f1f1f]/60 transition-all duration-300 backdrop-blur-sm flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between mb-6">
                <div className="w-12 h-12 rounded-xl bg-[#1f1f1f] border border-[#1f1f1f] group-hover:border-[#00c896]/40 flex items-center justify-center text-[#00c896] transition-colors">
                  <Palette className="w-6 h-6" />
                </div>
                <span className="text-[11px] font-mono text-neutral-500 uppercase tracking-wider bg-[#040404]/80 px-2.5 py-1 rounded-md border border-[#1f1f1f]">
                  Identity
                </span>
              </div>

              <h3 className="text-xl font-bold text-white group-hover:text-[#00c896] transition-colors">
                Full Brand Creation
              </h3>
              <p className="mt-3 text-sm text-neutral-400 leading-relaxed">
                Stand out with a modern, cohesive brand identity and logo design.
              </p>

              {/* Identity Palette Chips */}
              <div className="mt-6 flex items-center gap-2">
                <span className="w-6 h-6 rounded-md bg-[#040404] border border-[#1f1f1f]" title="Obsidian Base" />
                <span className="w-6 h-6 rounded-md bg-[#1f1f1f] border border-neutral-700" title="Surface Gray" />
                <span className="w-6 h-6 rounded-md bg-[#00c896]" title="Electric Mint" />
                <span className="text-[11px] font-mono text-neutral-500 ml-2">Design Tokens</span>
              </div>
            </div>

            <div className="mt-8 pt-5 border-t border-[#1f1f1f]/80 flex items-center justify-between">
              <span className="text-xs font-semibold text-neutral-400 group-hover:text-white transition-colors">
                Build Identity
              </span>
              <Link
                href="#contact"
                className="w-8 h-8 rounded-full bg-[#1f1f1f] border border-[#1f1f1f] group-hover:bg-[#00c896] group-hover:border-[#00c896] flex items-center justify-center text-neutral-400 group-hover:text-[#040404] transition-all"
              >
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </motion.div>

          {/* Card 6: Social Media Ads (Wide - 2 Columns) */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.45, delay: 0.32 }}
            className="group relative md:col-span-1 lg:col-span-2 rounded-2xl border border-[#1f1f1f] bg-[#1f1f1f]/35 p-7 sm:p-8 hover:border-[#00c896]/50 hover:bg-[#1f1f1f]/60 transition-all duration-300 backdrop-blur-sm flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between mb-6">
                <div className="w-12 h-12 rounded-xl bg-[#1f1f1f] border border-[#1f1f1f] group-hover:border-[#00c896]/40 flex items-center justify-center text-[#00c896] transition-colors">
                  <Target className="w-6 h-6" />
                </div>
                <span className="text-[11px] font-mono text-neutral-500 uppercase tracking-wider bg-[#040404]/80 px-2.5 py-1 rounded-md border border-[#1f1f1f]">
                  Paid Acquisition
                </span>
              </div>

              <div className="max-w-xl">
                <h3 className="text-xl sm:text-2xl font-bold text-white group-hover:text-[#00c896] transition-colors">
                  Social Media Ads
                </h3>
                <p className="mt-2.5 text-sm sm:text-base text-neutral-400 leading-relaxed">
                  Targeted, high-ROI ad campaigns to drive immediate traffic and consistent leads.
                </p>
              </div>

              {/* Performance Indicator Grid */}
              <div className="mt-6 flex flex-wrap gap-3">
                <div className="p-3 rounded-xl border border-[#1f1f1f] bg-[#040404]/60 flex items-center gap-2">
                  <TrendingUp className="w-4 h-4 text-[#00c896]" />
                  <span className="text-xs text-neutral-300 font-medium">Precision Retargeting</span>
                </div>
                <div className="p-3 rounded-xl border border-[#1f1f1f] bg-[#040404]/60 flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-[#00c896]" />
                  <span className="text-xs text-neutral-300 font-medium">Scalable Inbound CAC</span>
                </div>
              </div>
            </div>

            <div className="mt-8 pt-5 border-t border-[#1f1f1f]/80 flex items-center justify-between">
              <span className="text-xs font-semibold text-neutral-400 group-hover:text-white transition-colors">
                Launch Campaigns
              </span>
              <Link
                href="#contact"
                className="w-8 h-8 rounded-full bg-[#1f1f1f] border border-[#1f1f1f] group-hover:bg-[#00c896] group-hover:border-[#00c896] flex items-center justify-center text-neutral-400 group-hover:text-[#040404] transition-all"
              >
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}