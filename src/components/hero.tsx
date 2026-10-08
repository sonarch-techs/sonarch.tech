"use client";

import { motion } from "framer-motion";
import { ArrowRight, MoveHorizontal } from "lucide-react";
import { Globe } from "@/components/ui/globe";

export function Hero() {
  const scrollTo = (id: string) => {
    const el = document.querySelector(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section className="relative min-h-[92vh] flex flex-col justify-between bg-transparent text-neutral-900 dark:text-white overflow-hidden pt-8 pb-12 sm:pt-12 sm:pb-16 lg:pt-16 lg:pb-20 z-10">
      {/* Targeted Ambient Radial Mint/Emerald Glow behind Globe & Center */}
      <div className="absolute top-1/3 right-1/4 -translate-y-1/2 w-[650px] h-[500px] bg-[#008763]/[0.08] dark:bg-[#00c896]/10 blur-[160px] rounded-full pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full flex-1 flex flex-col justify-center">
        {/* Main Grid: Headline & Action Column (Left) + Globe & Telemetry (Right) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-center">
          
          {/* Left Column */}
          <div className="lg:col-span-7 flex flex-col items-start text-left">
            
            {/* Pill Badge */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-[#008763]/25 dark:border-[#00c896]/25 bg-white/80 dark:bg-[#091511]/80 backdrop-blur-md mb-6 shadow-sm dark:shadow-none"
            >
              <span className="w-2 h-2 rounded-full bg-[#008763] dark:bg-[#00c896] animate-pulse" />
              <span className="text-xs font-medium text-neutral-700 dark:text-neutral-300 font-mono">
                Next-Gen Systems Architecture & AEO
              </span>
            </motion.div>

            {/* Headline */}
            <motion.h1
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, delay: 0.08 }}
              className="text-4xl sm:text-6xl lg:text-[4.15rem] xl:text-[4.65rem] font-bold tracking-tight text-neutral-900 dark:text-white leading-[1.07]"
            >
              We engineer digital <br />
              <span className="text-[#008763] dark:text-[#00c896]">products</span> that <br />
              command scale.
            </motion.h1>

            {/* Sub-headline */}
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, delay: 0.16 }}
              className="mt-6 text-sm sm:text-base text-neutral-600 dark:text-neutral-400 max-w-xl leading-relaxed"
            >
              SONARCHTECH architects high-performance web applications, autonomous
              automation pipelines, and Answer Engine Optimization (AEO) frameworks that drive commercial ROI.
            </motion.p>

            {/* Action Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, delay: 0.24 }}
              className="mt-8 flex flex-wrap items-center gap-4 w-full sm:w-auto"
            >
              {/* Primary Mint / Technical Emerald CTA */}
              <button
                onClick={() => scrollTo("#contact")}
                className="inline-flex items-center justify-center gap-2 bg-[#008763] hover:bg-[#006f52] dark:bg-[#00c896] dark:hover:bg-[#00b285] text-white dark:text-[#040404] font-bold text-sm px-6 py-3.5 rounded-xl shadow-[0_4px_20px_rgba(0,135,99,0.25)] hover:shadow-[0_6px_24px_rgba(0,135,99,0.35)] dark:shadow-[0_0_28px_rgba(0,200,150,0.32)] dark:hover:shadow-[0_0_36px_rgba(0,200,150,0.45)] transition-all group cursor-pointer font-mono"
              >
                <span>Book Discovery</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>

              {/* Surface Outline Button */}
              <button
                onClick={() => scrollTo("#work")}
                className="inline-flex items-center justify-center gap-2 border border-neutral-200 dark:border-[#1f1f1f] bg-white/80 dark:bg-[#141414]/90 hover:bg-neutral-100 dark:hover:bg-[#1a1a1a] text-neutral-800 dark:text-neutral-200 font-semibold text-sm px-6 py-3.5 rounded-xl backdrop-blur-sm transition-all cursor-pointer shadow-sm dark:shadow-none font-mono"
              >
                <span>Explore Work</span>
              </button>
            </motion.div>

          </div>

          {/* Right Column: Globe + Vertical "Serving Globally" Strip */}
          <div className="lg:col-span-5 flex items-center justify-center lg:justify-end relative">
            <div className="relative w-[320px] h-[320px] sm:w-[420px] sm:h-[420px] lg:w-[460px] lg:h-[460px] xl:w-[500px] xl:h-[500px] flex items-center justify-center">
              
              {/* Globe Three.js Canvas */}
              <Globe className="w-full h-full" />

              {/* Bottom-Left: "↔ Drag to rotate" label */}
              <div className="absolute -bottom-3 left-4 pointer-events-none select-none flex items-center gap-1.5 text-neutral-500 dark:text-neutral-400 font-mono text-[11px] tracking-wide">
                <MoveHorizontal className="w-3.5 h-3.5 text-neutral-500 dark:text-neutral-400" />
                <span>Drag to rotate</span>
              </div>

              {/* Right Margin: Vertical "SERVING GLOBALLY" Telemetry Strip */}
              <div className="absolute -right-4 sm:-right-8 top-0 bottom-0 flex flex-col items-center justify-between py-2 pointer-events-none select-none">
                {/* Top vertical guide line */}
                <div className="w-[1.5px] h-16 sm:h-20 bg-gradient-to-b from-transparent via-[#008763]/40 to-[#008763] dark:via-[#00c896]/40 dark:to-[#00c896] rounded-full" />

                {/* Adaptive Pill Badge with Vertical Typography */}
                <div className="bg-white/90 dark:bg-[#040806]/90 border border-[#008763]/30 dark:border-[#00c896]/30 px-1 py-3 rounded-md shadow-[0_2px_12px_rgba(0,135,99,0.12)] dark:shadow-[0_0_15px_rgba(0,200,150,0.15)] flex flex-col items-center font-bold tracking-widest text-neutral-900 dark:text-white text-[10px] leading-[1.3] font-mono backdrop-blur-sm">
                  <span>S</span>
                  <span>E</span>
                  <span>R</span>
                  <span>V</span>
                  <span>I</span>
                  <span>N</span>
                  <span>G</span>
                  <div className="h-2" />
                  <span>G</span>
                  <span>L</span>
                  <span>O</span>
                  <span>B</span>
                  <span>A</span>
                  <span>L</span>
                  <span>L</span>
                  <span>Y</span>
                </div>

                {/* Bottom vertical guide line */}
                <div className="w-[1.5px] h-16 sm:h-20 bg-gradient-to-t from-transparent via-[#008763]/40 to-[#008763] dark:via-[#00c896]/40 dark:to-[#00c896] rounded-full" />
              </div>

            </div>
          </div>

        </div>

        {/* Horizontal Divider Line & Quantified Trust Metrics */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.32 }}
          className="mt-14 sm:mt-16 lg:mt-20 pt-8 border-t border-neutral-200 dark:border-white/[0.08] w-full"
        >
          <div className="grid grid-cols-3 max-w-lg gap-6 text-left">
            <div>
              <div className="text-xl sm:text-2xl font-bold text-neutral-900 dark:text-white font-mono tracking-tight">
                &lt;400ms
              </div>
              <div className="text-xs text-neutral-600 dark:text-neutral-500 font-medium mt-1">
                Sub-Second LCP
              </div>
            </div>

            <div>
              <div className="text-xl sm:text-2xl font-bold text-[#008763] dark:text-[#00c896] font-mono tracking-tight">
                99.98%
              </div>
              <div className="text-xs text-neutral-600 dark:text-neutral-500 font-medium mt-1">
                Pipeline Reliability
              </div>
            </div>

            <div>
              <div className="text-xl sm:text-2xl font-bold text-neutral-900 dark:text-white font-mono tracking-tight">
                Top 1%
              </div>
              <div className="text-xs text-neutral-600 dark:text-neutral-500 font-medium mt-1">
                AEO LLM Citations
              </div>
            </div>
          </div>
        </motion.div>

      </div>
    </section>
  );
}