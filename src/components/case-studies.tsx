"use client";

import { motion } from "framer-motion";
import { ArrowUpRight, ArrowRight, Sparkles, TrendingUp } from "lucide-react";
import Link from "next/link";
import { FEATURED_PROJECTS } from "@/data/case-studies";

export function CaseStudies() {
  return (
    <section
      id="work"
      className="relative py-20 sm:py-28 bg-transparent text-white overflow-hidden scroll-mt-20 lg:scroll-mt-24 z-10"
    >
      {/* Ambient background bloom */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-[#00c896]/5 blur-[140px] rounded-full pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 sm:mb-16 gap-6">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-[#1f1f1f] bg-[#1f1f1f]/80 text-[#00c896] text-xs font-semibold uppercase tracking-wider mb-4 font-mono">
              <Sparkles className="w-3.5 h-3.5 text-[#00c896]" />
              <span>Proven Deliverables</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white leading-tight">
              Selected client systems &{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-[#00c896] to-[#00b285]">
                engineered products.
              </span>
            </h2>
          </div>

          <p className="text-sm sm:text-base text-neutral-400 max-w-sm leading-relaxed">
            Every product we build is designed with one goal: measurable business leverage and high-ticket conversion.
          </p>
        </div>

        {/* Case Studies Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8">
          {FEATURED_PROJECTS.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.45, delay: index * 0.12 }}
              className="group relative flex flex-col justify-between rounded-2xl border border-[#1f1f1f] bg-[#1f1f1f]/35 p-6 sm:p-8 hover:border-[#00c896]/60 hover:bg-[#1f1f1f]/60 transition-all duration-300 backdrop-blur-sm"
            >
              {/* Subtle top-right glow */}
              <div className="absolute top-0 right-0 w-28 h-28 bg-[#00c896]/5 rounded-bl-full pointer-events-none group-hover:bg-[#00c896]/10 transition-colors" />

              <div>
                {/* Category & Client Tag */}
                <div className="flex items-center justify-between gap-2 mb-4">
                  <span className="text-xs uppercase tracking-wider text-[#00c896] font-semibold font-mono">
                    {project.category}
                  </span>
                  <span className="text-xs text-neutral-500 font-mono">
                    {project.client}
                  </span>
                </div>

                {/* Project Title */}
                <h3 className="text-xl sm:text-2xl font-bold text-white group-hover:text-[#00c896] transition-colors leading-snug">
                  <Link href={`/work/${project.id}`} className="focus:outline-none">
                    {project.title}
                  </Link>
                </h3>

                {/* Description */}
                <p className="mt-3 text-sm text-neutral-400 leading-relaxed">
                  {project.description}
                </p>

                {/* Metric Box */}
                <div className="mt-6 p-4 rounded-xl border border-[#1f1f1f] bg-[#040404]/60 flex items-center justify-between">
                  <div>
                    <div className="text-xs text-neutral-400 font-medium font-mono">
                      {project.metrics.label}
                    </div>
                    <div className="text-lg sm:text-xl font-bold text-white tracking-tight mt-0.5 font-mono">
                      {project.metrics.value}
                    </div>
                  </div>
                  <div className="w-9 h-9 rounded-lg bg-[#1f1f1f] border border-[#1f1f1f] flex items-center justify-center text-[#00c896] group-hover:scale-105 transition-transform">
                    <TrendingUp className="w-4 h-4" />
                  </div>
                </div>

                {/* Tech Stack Pills */}
                <div className="mt-6 flex flex-wrap gap-2">
                  {project.techStack.map((tech) => (
                    <span
                      key={tech}
                      className="px-2.5 py-1 rounded-md text-[11px] font-mono bg-[#040404]/80 text-neutral-300 border border-[#1f1f1f] group-hover:border-[#00c896]/30 transition-colors"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              {/* Action Trigger */}
              <div className="mt-8 pt-6 border-t border-[#1f1f1f]/80 flex items-center justify-between">
                <Link
                  href={`/work/${project.id}`}
                  className="text-xs font-semibold text-neutral-400 group-hover:text-white transition-colors flex items-center gap-1 font-mono focus:outline-none"
                >
                  <span>View Architecture Breakdown</span>
                </Link>
                <Link
                  href={`/work/${project.id}`}
                  aria-label={`Open case study for ${project.title}`}
                  className="w-8 h-8 rounded-full bg-[#1f1f1f] border border-[#1f1f1f] group-hover:bg-[#00c896] group-hover:border-[#00c896] flex items-center justify-center text-neutral-300 group-hover:text-[#040404] transition-all duration-200"
                >
                  <ArrowUpRight className="w-4 h-4" />
                </Link>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Directory Hub Footer Trigger */}
        <div className="mt-14 sm:mt-16 text-center">
          <Link
            href="/work"
            className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl border border-[#1f1f1f] bg-[#1f1f1f]/60 hover:bg-[#1f1f1f] hover:border-[#00c896]/50 text-white font-mono text-xs font-semibold transition-all group shadow-lg"
          >
            <span>Explore All Production Case Studies</span>
            <ArrowRight className="w-4 h-4 text-[#00c896] group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </div>
    </section>
  );
}