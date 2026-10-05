"use client";

import { motion } from "framer-motion";
import { Code2, Cpu, SearchCheck, Rocket, CheckCircle2 } from "lucide-react";

const SERVICES = [
  {
    id: "web-apps",
    title: "Web Applications & Platforms",
    subtitle: "High-Performance Full-Stack Software",
    description:
      "Engineered with Next.js, TypeScript, and Supabase. Fast, reactive interfaces paired with scalable backend architectures.",
    icon: Code2,
    deliverables: [
      "Custom SaaS & Client Portals",
      "Dynamic Headless Architectures",
      "Database Schema & API Design",
      "Core Web Vitals Optimization (95+)",
    ],
  },
  {
    id: "systems-design",
    title: "Autonomous Systems Design",
    subtitle: "Backend Orchestration & Pipelines",
    description:
      "Automating operational bottlenecks with robust event-driven workflows, third-party webhook routing, and custom CRM integrations.",
    icon: Cpu,
    deliverables: [
      "Automated Lead-to-Sale Pipelines",
      "Webhook & API Orchestration",
      "Internal Business Dashboards",
      "Microservice Integrations",
    ],
  },
  {
    id: "aeo-seo",
    title: "SEO & AEO Rank Engines",
    subtitle: "Search & AI Answer Optimization",
    description:
      "Positioning your brand inside Google Search, Perplexity, and ChatGPT answers with semantic JSON-LD structures and entity authority.",
    icon: SearchCheck,
    deliverables: [
      "AI Engine Optimization (AEO)",
      "Semantic Knowledge-Graph Schema",
      "Technical Crawlability Audits",
      "Programmatic SEO Content Pipelines",
    ],
  },
  {
    id: "lead-generation",
    title: "Lead Generation Engines",
    subtitle: "Conversion-Focused Architecture",
    description:
      "High-velocity landing pages, custom interactive calculators, and multi-step funnels crafted to capture and qualify enterprise leads.",
    icon: Rocket,
    deliverables: [
      "Interactive Qualification Funnels",
      "Conversion Rate Optimization (CRO)",
      "Instant Lead Routing & Alerts",
      "End-to-End Analytics Attribution",
    ],
  },
];

export function Services() {
  return (
    <section id="services" className="relative py-24 bg-[#040404] text-white">
      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-[#1f1f1f] bg-[#1f1f1f]/60 text-[#00c896] text-xs font-semibold tracking-wide uppercase mb-4">
            Capabilities & Deliverables
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white">
            Engineered for speed, scale, and{" "}
            <span className="text-[#00c896]">market dominance.</span>
          </h2>
          <p className="mt-4 text-neutral-400 text-base sm:text-lg">
            We don&apos;t build generic websites. We design, deploy, and scale custom digital machinery that drives measurable enterprise revenue.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          {SERVICES.map((service, index) => {
            const Icon = service.icon;
            return (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                className="group relative rounded-2xl border border-[#1f1f1f] bg-[#1f1f1f]/30 p-8 hover:border-[#00c896]/50 hover:bg-[#1f1f1f]/60 transition-all duration-300 backdrop-blur-sm"
              >
                {/* Subtle Hover Glow on Card Corner */}
                <div className="absolute top-0 right-0 w-32 h-32 bg-[#00c896]/5 rounded-bl-full pointer-events-none group-hover:bg-[#00c896]/10 transition-colors" />

                {/* Service Icon */}
                <div className="w-12 h-12 rounded-xl bg-[#1f1f1f] border border-[#1f1f1f] group-hover:border-[#00c896]/40 flex items-center justify-center text-[#00c896] mb-6 transition-colors shadow-sm">
                  <Icon className="w-6 h-6" />
                </div>

                {/* Title & Description */}
                <h3 className="text-xl font-bold text-white group-hover:text-[#00c896] transition-colors">
                  {service.title}
                </h3>
                <p className="text-xs uppercase tracking-wider text-neutral-500 font-semibold mt-1">
                  {service.subtitle}
                </p>
                <p className="text-sm text-neutral-400 mt-3 leading-relaxed">
                  {service.description}
                </p>

                {/* Deliverables Checklist */}
                <div className="mt-6 pt-6 border-t border-[#1f1f1f]">
                  <ul className="space-y-2.5">
                    {service.deliverables.map((item, idx) => (
                      <li key={idx} className="flex items-center gap-2.5 text-xs sm:text-sm text-neutral-300">
                        <CheckCircle2 className="w-4 h-4 text-[#00c896] flex-shrink-0" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}