"use client";

import { motion } from "framer-motion";
import { Terminal, Database, ShieldCheck, Cpu, ArrowRight } from "lucide-react";
import Link from "next/link";

const PROTOCOL_STEPS = [
  {
    step: "01",
    phase: "Architecture & Data Blueprint",
    icon: Database,
    timeline: "Week 1",
    description:
      "We design normalized PostgreSQL schemas, map user state lifecycles, and structure entity relationships before writing a single line of frontend code.",
    deliverables: [
      "Supabase Schema & RLS Policies",
      "API & Event Dataflow Diagrams",
      "AEO Semantic Entity Mapping",
    ],
  },
  {
    step: "02",
    phase: "Full-Stack System Engineering",
    icon: Terminal,
    timeline: "Weeks 2 - 3",
    description:
      "Rapid implementation with Next.js App Router, TypeScript, and Tailwind. We build modular, type-safe interfaces backed by high-throughput server actions.",
    deliverables: [
      "Next.js Server Component Pipelines",
      "Clean UI with Framer Motion Micro-Interactions",
      "Webhook & Third-Party Integrations",
    ],
  },
  {
    step: "03",
    phase: "AEO & Core Web Vitals Hardening",
    icon: ShieldCheck,
    timeline: "Week 4",
    description:
      "Rigorous performance testing to guarantee 95+ Google Lighthouse scores, instant mobile loads, and full indexing by Google, ChatGPT, and Perplexity engines.",
    deliverables: [
      "JSON-LD Knowledge Graph Injection",
      "Edge-Cached API Responses",
      "Asset & Font Subsetting (<1s LCP)",
    ],
  },
  {
    step: "04",
    phase: "Autonomous Launch & Lead Sync",
    icon: Cpu,
    timeline: "Deployment",
    description:
      "Zero-downtime production rollout on edge infrastructure with automated lead alerting pipelines pushing customer inquiries directly into your CRM.",
    deliverables: [
      "Production CI/CD Edge Deployment",
      "Real-Time Database Alert Webhooks",
      "Post-Launch Analytics & Attribution",
    ],
  },
];

export function SystemsWorkflow() {
  return (
    <section
  id="systems"
  className="relative py-20 sm:py-28 bg-transparent text-white overflow-hidden scroll-mt-20 lg:scroll-mt-24 z-10"
>
      {/* Ambient background bloom */}
      <div className="absolute top-1/2 right-1/4 w-[500px] h-[300px] bg-[#00c896]/5 blur-[140px] rounded-full pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 sm:mb-20">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-[#1f1f1f] bg-[#1f1f1f]/80 text-[#00c896] text-xs font-semibold uppercase tracking-wider mb-4">
            <Cpu className="w-3.5 h-3.5 text-[#00c896]" />
            <span>Execution Protocol</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white leading-tight">
            How we engineer systems from{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-[#00c896] to-[#00b285]">
              blueprint to deployment.
            </span>
          </h2>
          <p className="mt-4 text-sm sm:text-base text-neutral-400">
            No guesswork, no bloated timelines. A structured 4-phase methodology that ensures precision, performance, and measurable commercial ROI.
          </p>
        </div>

        {/* 4-Step Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 relative">
          {PROTOCOL_STEPS.map((item, index) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={item.step}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.45, delay: index * 0.1 }}
                className="group relative flex flex-col justify-between rounded-2xl border border-[#1f1f1f] bg-[#1f1f1f]/35 p-6 hover:border-[#00c896]/50 hover:bg-[#1f1f1f]/60 transition-all duration-300 backdrop-blur-sm"
              >
                {/* Step Index & Icon */}
                <div>
                  <div className="flex items-center justify-between mb-5">
                    <span className="text-2xl font-mono font-bold text-neutral-600 group-hover:text-[#00c896] transition-colors">
                      {item.step}
                    </span>
                    <div className="w-10 h-10 rounded-xl bg-[#1f1f1f] border border-[#1f1f1f] group-hover:border-[#00c896]/40 flex items-center justify-center text-[#00c896] transition-colors">
                      <Icon className="w-5 h-5" />
                    </div>
                  </div>

                  {/* Phase & Timeline */}
                  <div className="inline-block text-[10px] font-mono uppercase tracking-wider text-[#00c896] font-semibold bg-[#00c896]/10 px-2.5 py-0.5 rounded-full mb-2">
                    {item.timeline}
                  </div>
                  <h3 className="text-lg font-bold text-white group-hover:text-[#00c896] transition-colors">
                    {item.phase}
                  </h3>

                  {/* Description */}
                  <p className="mt-3 text-xs sm:text-sm text-neutral-400 leading-relaxed">
                    {item.description}
                  </p>
                </div>

                {/* Deliverables Checklist */}
                <div className="mt-6 pt-5 border-t border-[#1f1f1f]">
                  <span className="block text-[11px] uppercase tracking-wider text-neutral-500 font-semibold mb-2">
                    Core Output:
                  </span>
                  <ul className="space-y-1.5 text-xs text-neutral-300">
                    {item.deliverables.map((d, dIdx) => (
                      <li key={dIdx} className="flex items-start gap-1.5">
                        <span className="text-[#00c896] font-bold">›</span>
                        <span>{d}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Bottom Banner Trigger */}
        <div className="mt-12 sm:mt-16 text-center">
          <Link
            href="#contact"
            className="inline-flex items-center gap-2 text-xs sm:text-sm font-semibold text-neutral-400 hover:text-[#00c896] transition-colors group"
          >
            <span>Have custom systems requirements? Let&apos;s map out your architecture</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform text-[#00c896]" />
          </Link>
        </div>

      </div>
    </section>
  );
}