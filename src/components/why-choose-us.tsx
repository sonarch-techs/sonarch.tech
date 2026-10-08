"use client";

import { motion } from "framer-motion";
import {
  Zap,
  Headphones,
  Sliders,
  Cpu,
  UserCheck,
  Sparkles,
  Clock,
  CheckCircle2,
  Activity,
  Code2,
  Database,
  Globe2,
} from "lucide-react";

export function WhyChooseUs() {
  return (
    <section
      id="why-choose-us"
      className="relative py-20 sm:py-28 bg-transparent text-neutral-900 dark:text-white overflow-hidden scroll-mt-20 lg:scroll-mt-24 z-10 transition-colors duration-200"
    >
      {/* Ambient mint/emerald glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[650px] h-[380px] bg-[#008763]/[0.05] dark:bg-[#00c896]/5 blur-[160px] rounded-full pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14 sm:mb-20">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-neutral-200 dark:border-[#1f1f1f] bg-white/80 dark:bg-[#1f1f1f]/80 text-[#008763] dark:text-[#00c896] text-xs font-semibold uppercase tracking-wider mb-4 font-mono shadow-sm dark:shadow-none">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Why Choose Us</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-neutral-900 dark:text-white leading-tight">
            Our{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-neutral-900 via-[#008763] to-[#008763] dark:from-white dark:via-[#00c896] dark:to-[#00b285]">
              Core Features
            </span>
          </h2>

          <p className="mt-4 text-sm sm:text-base lg:text-lg text-neutral-600 dark:text-neutral-400 leading-relaxed max-w-2xl mx-auto">
            Experience the difference with our premium features designed for your success.
          </p>
        </div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
          
          {/* Card 1: Fast Delivery (Wide 2-Columns) */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.45 }}
            className="group relative md:col-span-2 lg:col-span-2 rounded-2xl border border-neutral-200 dark:border-[#1f1f1f] bg-white/80 dark:bg-[#141414]/70 hover:border-[#008763]/50 dark:hover:border-[#00c896]/60 hover:bg-neutral-50/90 dark:hover:bg-[#181818]/90 transition-all duration-300 backdrop-blur-md p-7 sm:p-8 flex flex-col justify-between shadow-sm dark:shadow-none"
          >
            <div>
              <div className="flex items-center justify-between mb-6">
                <div className="w-12 h-12 rounded-xl bg-neutral-100 dark:bg-[#1f1f1f] border border-neutral-200 dark:border-[#1f1f1f] group-hover:border-[#008763]/40 dark:group-hover:border-[#00c896]/40 flex items-center justify-center text-[#008763] dark:text-[#00c896] transition-colors shadow-sm dark:shadow-none">
                  <Zap className="w-6 h-6" />
                </div>
                <span className="text-[11px] font-mono text-[#008763] dark:text-[#00c896] uppercase tracking-wider bg-[#008763]/10 dark:bg-[#00c896]/10 px-2.5 py-1 rounded-md border border-[#008763]/20 dark:border-[#00c896]/20 font-semibold">
                  Sprint Execution
                </span>
              </div>

              <div className="max-w-xl">
                <h3 className="text-xl sm:text-2xl font-bold text-neutral-900 dark:text-white group-hover:text-[#008763] dark:group-hover:text-[#00c896] transition-colors">
                  Fast Delivery
                </h3>
                <p className="mt-2.5 text-sm sm:text-base text-neutral-600 dark:text-neutral-400 leading-relaxed">
                  Quick turnaround times without compromising quality. Get your projects delivered faster with our streamlined workflow.
                </p>
              </div>

              {/* Delivery Telemetry Stepper */}
              <div className="mt-7 grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div className="p-3 rounded-xl border border-neutral-200 dark:border-[#1f1f1f] bg-neutral-50/80 dark:bg-[#040404]/60 flex items-center gap-2.5">
                  <Clock className="w-4 h-4 text-[#008763] dark:text-[#00c896] shrink-0" />
                  <div className="text-left">
                    <div className="text-xs text-neutral-900 dark:text-white font-semibold">Accelerated Sprints</div>
                    <div className="text-[10px] text-neutral-500 font-mono">2x Cycle Velocity</div>
                  </div>
                </div>
                <div className="p-3 rounded-xl border border-neutral-200 dark:border-[#1f1f1f] bg-neutral-50/80 dark:bg-[#040404]/60 flex items-center gap-2.5">
                  <Activity className="w-4 h-4 text-[#008763] dark:text-[#00c896] shrink-0" />
                  <div className="text-left">
                    <div className="text-xs text-neutral-900 dark:text-white font-semibold">Zero Quality Loss</div>
                    <div className="text-[10px] text-neutral-500 font-mono">100% CI/CD Audited</div>
                  </div>
                </div>
                <div className="p-3 rounded-xl border border-neutral-200 dark:border-[#1f1f1f] bg-neutral-50/80 dark:bg-[#040404]/60 flex items-center gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-[#008763] dark:text-[#00c896] shrink-0" />
                  <div className="text-left">
                    <div className="text-xs text-neutral-900 dark:text-white font-semibold">On-Time Guarantee</div>
                    <div className="text-[10px] text-neutral-500 font-mono">Milestone Adherence</div>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-8 pt-5 border-t border-neutral-200 dark:border-[#1f1f1f]/80 flex items-center justify-between text-xs font-mono text-neutral-600 dark:text-neutral-400">
              <span>Standard Timeline: 2-3 Weeks</span>
              <span className="text-[#008763] dark:text-[#00c896] font-semibold">99.4% On-Schedule Rate</span>
            </div>
          </motion.div>

          {/* Card 2: 24/7 Support (1-Column Telemetry Hub) */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.45, delay: 0.08 }}
            className="group relative md:col-span-1 lg:col-span-1 rounded-2xl border border-neutral-200 dark:border-[#1f1f1f] bg-white/80 dark:bg-[#141414]/70 hover:border-[#008763]/50 dark:hover:border-[#00c896]/60 hover:bg-neutral-50/90 dark:hover:bg-[#181818]/90 transition-all duration-300 backdrop-blur-md p-7 flex flex-col justify-between shadow-sm dark:shadow-none"
          >
            <div>
              <div className="flex items-center justify-between mb-6">
                <div className="w-12 h-12 rounded-xl bg-neutral-100 dark:bg-[#1f1f1f] border border-neutral-200 dark:border-[#1f1f1f] group-hover:border-[#008763]/40 dark:group-hover:border-[#00c896]/40 flex items-center justify-center text-[#008763] dark:text-[#00c896] transition-colors shadow-sm dark:shadow-none">
                  <Headphones className="w-6 h-6" />
                </div>
                <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-[#008763]/10 dark:bg-[#00c896]/10 border border-[#008763]/20 dark:border-[#00c896]/20 text-[11px] font-mono text-[#008763] dark:text-[#00c896] font-semibold">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#008763] dark:bg-[#00c896] animate-pulse" />
                  <span>Live 24/7</span>
                </div>
              </div>

              <h3 className="text-xl font-bold text-neutral-900 dark:text-white group-hover:text-[#008763] dark:group-hover:text-[#00c896] transition-colors">
                24/7 Support
              </h3>
              <p className="mt-2.5 text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed">
                Always available round the clock customer support ensuring quick responses and optimal ROI.
              </p>

              {/* Status Chips Badge Matrix */}
              <div className="mt-6 space-y-2">
                <div className="flex items-center justify-between p-2.5 rounded-xl border border-neutral-200 dark:border-[#1f1f1f] bg-neutral-50/80 dark:bg-[#040404]/60 text-xs">
                  <span className="text-neutral-600 dark:text-neutral-400 font-medium">Availability</span>
                  <span className="text-neutral-900 dark:text-white font-mono font-semibold">Always Available</span>
                </div>
                <div className="flex items-center justify-between p-2.5 rounded-xl border border-neutral-200 dark:border-[#1f1f1f] bg-neutral-50/80 dark:bg-[#040404]/60 text-xs">
                  <span className="text-neutral-600 dark:text-neutral-400 font-medium">Response SLA</span>
                  <span className="text-[#008763] dark:text-[#00c896] font-mono font-semibold">&lt; 15 Mins</span>
                </div>
                <div className="flex items-center justify-between p-2.5 rounded-xl border border-neutral-200 dark:border-[#1f1f1f] bg-neutral-50/80 dark:bg-[#040404]/60 text-xs">
                  <span className="text-neutral-600 dark:text-neutral-400 font-medium">Commercial Impact</span>
                  <span className="text-purple-600 dark:text-purple-400 font-mono font-semibold">Maximized ROI</span>
                </div>
              </div>
            </div>

            <div className="mt-8 pt-5 border-t border-neutral-200 dark:border-[#1f1f1f]/80 flex items-center justify-between text-xs text-neutral-500 font-mono">
              <span>Continuous Monitoring</span>
              <span className="text-neutral-700 dark:text-neutral-300 font-semibold">365 Days</span>
            </div>
          </motion.div>

          {/* Card 3: Custom Solutions (1-Column) */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.45, delay: 0.16 }}
            className="group relative md:col-span-1 lg:col-span-1 rounded-2xl border border-neutral-200 dark:border-[#1f1f1f] bg-white/80 dark:bg-[#141414]/70 hover:border-[#008763]/50 dark:hover:border-[#00c896]/60 hover:bg-neutral-50/90 dark:hover:bg-[#181818]/90 transition-all duration-300 backdrop-blur-md p-7 flex flex-col justify-between shadow-sm dark:shadow-none"
          >
            <div>
              <div className="flex items-center justify-between mb-6">
                <div className="w-12 h-12 rounded-xl bg-neutral-100 dark:bg-[#1f1f1f] border border-neutral-200 dark:border-[#1f1f1f] group-hover:border-[#008763]/40 dark:group-hover:border-[#00c896]/40 flex items-center justify-center text-[#008763] dark:text-[#00c896] transition-colors shadow-sm dark:shadow-none">
                  <Sliders className="w-6 h-6" />
                </div>
                <span className="text-[11px] font-mono text-neutral-600 dark:text-neutral-400 uppercase tracking-wider bg-neutral-100 dark:bg-[#040404]/80 px-2.5 py-1 rounded-md border border-neutral-200 dark:border-[#1f1f1f] font-semibold">
                  Zero Templates
                </span>
              </div>

              <h3 className="text-xl font-bold text-neutral-900 dark:text-white group-hover:text-[#008763] dark:group-hover:text-[#00c896] transition-colors">
                Custom Solutions
              </h3>
              <p className="mt-2.5 text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed">
                Tailored solutions built around your specific business goals, not generic templates.
              </p>

              {/* Bespoke Architecture Blueprint Pill */}
              <div className="mt-6 p-3 rounded-xl border border-neutral-200 dark:border-[#1f1f1f] bg-neutral-50/80 dark:bg-[#040404]/60 space-y-1.5 font-mono text-[11px]">
                <div className="flex items-center justify-between text-neutral-600 dark:text-neutral-400">
                  <span>Architecture</span>
                  <span className="text-[#008763] dark:text-[#00c896] font-semibold">100% Bespoke</span>
                </div>
                <div className="flex items-center justify-between text-neutral-600 dark:text-neutral-400">
                  <span>Codebase Ownership</span>
                  <span className="text-neutral-900 dark:text-white font-semibold">Full IP Rights</span>
                </div>
              </div>
            </div>

            <div className="mt-8 pt-5 border-t border-neutral-200 dark:border-[#1f1f1f]/80 flex items-center justify-between text-xs text-neutral-600 dark:text-neutral-400 font-mono">
              <span>Goal-Driven Engineering</span>
              <span className="text-[#008763] dark:text-[#00c896] font-semibold">Tailored</span>
            </div>
          </motion.div>

          {/* Card 4: Modern Tech Stack (1-Column) */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.45, delay: 0.24 }}
            className="group relative md:col-span-1 lg:col-span-1 rounded-2xl border border-neutral-200 dark:border-[#1f1f1f] bg-white/80 dark:bg-[#141414]/70 hover:border-[#008763]/50 dark:hover:border-[#00c896]/60 hover:bg-neutral-50/90 dark:hover:bg-[#181818]/90 transition-all duration-300 backdrop-blur-md p-7 flex flex-col justify-between shadow-sm dark:shadow-none"
          >
            <div>
              <div className="flex items-center justify-between mb-6">
                <div className="w-12 h-12 rounded-xl bg-neutral-100 dark:bg-[#1f1f1f] border border-neutral-200 dark:border-[#1f1f1f] group-hover:border-[#008763]/40 dark:group-hover:border-[#00c896]/40 flex items-center justify-center text-[#008763] dark:text-[#00c896] transition-colors shadow-sm dark:shadow-none">
                  <Cpu className="w-6 h-6" />
                </div>
                <span className="text-[11px] font-mono text-neutral-600 dark:text-neutral-400 uppercase tracking-wider bg-neutral-100 dark:bg-[#040404]/80 px-2.5 py-1 rounded-md border border-neutral-200 dark:border-[#1f1f1f] font-semibold">
                  Cutting-Edge
                </span>
              </div>

              <h3 className="text-xl font-bold text-neutral-900 dark:text-white group-hover:text-[#008763] dark:group-hover:text-[#00c896] transition-colors">
                Modern Tech Stack
              </h3>
              <p className="mt-2.5 text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed">
                Latest technologies and frameworks for optimal performance and effortless scaling.
              </p>

              {/* Tech Badges Grid */}
              <div className="mt-6 flex flex-wrap gap-2">
                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg border border-neutral-200 dark:border-[#1f1f1f] bg-neutral-50/80 dark:bg-[#040404]/60 text-xs text-neutral-700 dark:text-neutral-300 font-mono">
                  <Code2 className="w-3 h-3 text-[#008763] dark:text-[#00c896]" /> Next.js
                </span>
                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg border border-neutral-200 dark:border-[#1f1f1f] bg-neutral-50/80 dark:bg-[#040404]/60 text-xs text-neutral-700 dark:text-neutral-300 font-mono">
                  <Globe2 className="w-3 h-3 text-sky-600 dark:text-cyan-400" /> TypeScript
                </span>
                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg border border-neutral-200 dark:border-[#1f1f1f] bg-neutral-50/80 dark:bg-[#040404]/60 text-xs text-neutral-700 dark:text-neutral-300 font-mono">
                  <Database className="w-3 h-3 text-emerald-600 dark:text-emerald-400" /> Supabase
                </span>
                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg border border-neutral-200 dark:border-[#1f1f1f] bg-neutral-50/80 dark:bg-[#040404]/60 text-xs text-neutral-700 dark:text-neutral-300 font-mono">
                  <Activity className="w-3 h-3 text-purple-600 dark:text-purple-400" /> Three.js
                </span>
              </div>
            </div>

            <div className="mt-8 pt-5 border-t border-neutral-200 dark:border-[#1f1f1f]/80 flex items-center justify-between text-xs text-neutral-600 dark:text-neutral-400 font-mono">
              <span>Performance Tier</span>
              <span className="text-sky-600 dark:text-cyan-400 font-semibold">Sub-Second LCP</span>
            </div>
          </motion.div>

          {/* Card 5: Dedicated Manager (1-Column) */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.45, delay: 0.32 }}
            className="group relative md:col-span-1 lg:col-span-1 rounded-2xl border border-neutral-200 dark:border-[#1f1f1f] bg-white/80 dark:bg-[#141414]/70 hover:border-[#008763]/50 dark:hover:border-[#00c896]/60 hover:bg-neutral-50/90 dark:hover:bg-[#181818]/90 transition-all duration-300 backdrop-blur-md p-7 flex flex-col justify-between shadow-sm dark:shadow-none"
          >
            <div>
              <div className="flex items-center justify-between mb-6">
                <div className="w-12 h-12 rounded-xl bg-neutral-100 dark:bg-[#1f1f1f] border border-neutral-200 dark:border-[#1f1f1f] group-hover:border-[#008763]/40 dark:group-hover:border-[#00c896]/40 flex items-center justify-center text-[#008763] dark:text-[#00c896] transition-colors shadow-sm dark:shadow-none">
                  <UserCheck className="w-6 h-6" />
                </div>
                <span className="text-[11px] font-mono text-neutral-600 dark:text-neutral-400 uppercase tracking-wider bg-neutral-100 dark:bg-[#040404]/80 px-2.5 py-1 rounded-md border border-neutral-200 dark:border-[#1f1f1f] font-semibold">
                  Single POC
                </span>
              </div>

              <h3 className="text-xl font-bold text-neutral-900 dark:text-white group-hover:text-[#008763] dark:group-hover:text-[#00c896] transition-colors">
                Dedicated Manager
              </h3>
              <p className="mt-2.5 text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed">
                Your personal project manager ensures seamless communication and on-time delivery.
              </p>

              {/* Direct Communication Strip */}
              <div className="mt-6 p-3 rounded-xl border border-neutral-200 dark:border-[#1f1f1f] bg-neutral-50/80 dark:bg-[#040404]/60 space-y-2">
                <div className="flex items-center gap-2 text-xs text-neutral-700 dark:text-neutral-300 font-mono">
                  <div className="w-2 h-2 rounded-full bg-[#008763] dark:bg-[#00c896]" />
                  <span>Direct Slack / Discord Connect</span>
                </div>
                <div className="flex items-center gap-2 text-xs text-neutral-700 dark:text-neutral-300 font-mono">
                  <div className="w-2 h-2 rounded-full bg-sky-500 dark:bg-cyan-400" />
                  <span>Weekly Sprint Demos & Video Briefs</span>
                </div>
              </div>
            </div>

            <div className="mt-8 pt-5 border-t border-neutral-200 dark:border-[#1f1f1f]/80 flex items-center justify-between text-xs text-neutral-600 dark:text-neutral-400 font-mono">
              <span>Accountability</span>
              <span className="text-[#008763] dark:text-[#00c896] font-semibold">1-on-1 Conduit</span>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}