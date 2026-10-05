"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Sparkles, Terminal, Activity, TrendingUp } from "lucide-react";
import { BackgroundGlow } from "@/components/ui/background-glow";
import { ArchitecturalGlobe } from "@/components/ui/architectural-globe";

const METRICS = [
  { label: "Client Conversion Lift", value: "3.4x", icon: TrendingUp },
  { label: "Core Web Vitals Score", value: "99+", icon: Activity },
  { label: "Systems Architecture", value: "AEO/SEO Ready", icon: Terminal },
];

export function Hero() {
  return (
    <section className="relative pt-2 pb-10 sm:pt-6 sm:pb-16 lg:pt-12 lg:pb-24 overflow-hidden bg-[#040404]">
      <BackgroundGlow />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Main Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 sm:gap-8 lg:gap-10 items-center">
          
          {/* Copy Column */}
          <div className="lg:col-span-7 flex flex-col items-center lg:items-start text-center lg:text-left">
            {/* Pill Badge */}
            <motion.div
              initial={{ opacity: 0, y: -6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35 }}
              className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-[#1f1f1f] bg-[#1f1f1f]/80 text-[#00c896] text-[11px] sm:text-xs font-medium mb-3 sm:mb-4 backdrop-blur-md"
            >
              <Sparkles className="w-3 h-3 text-[#00c896] animate-pulse" />
              <span>Digital Products & Autonomous Systems</span>
            </motion.div>

            {/* Headline */}
            <motion.h1
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.08 }}
              className="text-2xl xs:text-3xl sm:text-4xl lg:text-[50px] xl:text-[56px] font-extrabold tracking-tight text-white leading-[1.15] max-w-2xl"
            >
              We architect web apps & systems that{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-[#00c896] to-[#00b285]">
                command search & conversion.
              </span>
            </motion.h1>

            {/* Value Proposition */}
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.15 }}
              className="mt-2.5 sm:mt-4 text-xs xs:text-sm sm:text-base lg:text-lg text-neutral-400 max-w-lg font-normal leading-relaxed"
            >
              Engineering high-performance web applications, autonomous revenue pipelines, 
              and AI Engine Optimization (AEO) frameworks for scaling businesses.
            </motion.p>

            {/* CTAs: Side-by-side on mobile to conserve vertical space */}
            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.22 }}
              className="mt-4 sm:mt-6 flex flex-row items-center justify-center lg:justify-start gap-2.5 sm:gap-3.5 w-full sm:w-auto"
            >
              <a
                href="#contact"
                onClick={(e) => {
                  e.preventDefault();
                  document.querySelector("#contact")?.scrollIntoView({ behavior: "smooth" });
                }}
                className="inline-flex items-center justify-center gap-1.5 bg-[#00c896] hover:bg-[#00b285] text-[#040404] font-semibold px-4 py-2.5 sm:px-6 sm:py-3 rounded-xl shadow-md shadow-[#00c896]/20 transition-all duration-200 group text-xs sm:text-sm cursor-pointer"
              >
                <span>Book Discovery</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
              </a>

              <a
                href="#work"
                onClick={(e) => {
                  e.preventDefault();
                  document.querySelector("#work")?.scrollIntoView({ behavior: "smooth" });
                }}
                className="inline-flex items-center justify-center border border-[#1f1f1f] bg-[#1f1f1f]/50 hover:bg-[#1f1f1f] text-neutral-200 px-4 py-2.5 sm:px-6 sm:py-3 rounded-xl backdrop-blur-sm transition-all text-xs sm:text-sm font-medium cursor-pointer"
              >
                Explore Work
              </a>
            </motion.div>
          </div>

          {/* Globe Column */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.18 }}
            className="lg:col-span-5 flex items-center justify-center lg:justify-end w-full my-2 sm:my-4 lg:my-0"
          >
            {/* Clamped mobile dimensions prevent fold-cutting */}
            <div className="relative w-[190px] h-[190px] xs:w-[220px] xs:h-[220px] sm:w-[280px] sm:h-[280px] lg:w-[440px] lg:h-[440px] xl:w-[480px] xl:h-[480px] flex items-center justify-center">
              <ArchitecturalGlobe />
            </div>
          </motion.div>

        </div>

        {/* Compact Responsive Metrics Bar */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, delay: 0.28 }}
          className="mt-6 sm:mt-12 w-full grid grid-cols-3 gap-2 sm:gap-4 border border-[#1f1f1f] bg-[#1f1f1f]/40 p-2.5 sm:p-4 rounded-xl sm:rounded-2xl backdrop-blur-md"
        >
          {METRICS.map((metric, idx) => {
            const Icon = metric.icon;
            return (
              <div
                key={idx}
                className="flex flex-col sm:flex-row items-center sm:items-center text-center sm:text-left gap-1.5 sm:gap-3 px-1 sm:px-3 sm:border-r border-[#1f1f1f] last:border-none"
              >
                <div className="p-1.5 rounded-lg bg-[#1f1f1f] border border-[#1f1f1f] text-[#00c896] shrink-0">
                  <Icon className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                </div>
                <div>
                  <div className="text-sm sm:text-lg font-bold text-white tracking-tight leading-tight">
                    {metric.value}
                  </div>
                  <div className="text-[10px] sm:text-xs text-neutral-400 font-medium leading-tight">
                    {metric.label}
                  </div>
                </div>
              </div>
            );
          })}
        </motion.div>

      </div>
    </section>
  );
}