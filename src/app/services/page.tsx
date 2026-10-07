import Link from "next/link";
import {
  ArrowLeft,
  ArrowUpRight,
  Sparkles,
  CheckCircle2,
  Cpu,
  Zap,
  Bot,
  Search,
  Palette,
  TrendingUp,
  ArrowRight,
} from "lucide-react";
import { SERVICES_DATA, getService } from "@/data/services";

export const metadata = {
  title: "Engineering Capabilities & Systems Services | SONARCHTECH",
  description:
    "Explore our full spectrum of Next.js web application engineering, autonomous workflow automation, 24/7 AI agents, and Answer Engine Optimization (AEO).",
};

export default function ServicesPage() {
  const webDev = getService("website-development") || SERVICES_DATA[0];
  const automation = getService("ai-automation-setup") || SERVICES_DATA[1];
  const chatbot = getService("ai-chatbots") || SERVICES_DATA[2];
  const seo = getService("seo-optimization") || SERVICES_DATA[3];
  const branding = getService("full-brand-creation") || SERVICES_DATA[4];
  const ads = getService("social-media-ads") || SERVICES_DATA[5];

  return (
    <main className="relative min-h-screen bg-transparent text-white pt-20 sm:pt-24 pb-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
      {/* Background Backlight */}
      <div className="absolute top-12 left-1/2 -translate-x-1/2 w-[700px] h-[350px] bg-[#00c896]/10 blur-[160px] pointer-events-none z-0" />

      <div className="relative z-10 max-w-6xl mx-auto">
        {/* Navigation Breadcrumb */}
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-xs font-mono text-neutral-400 hover:text-[#00c896] transition-colors mb-4 group"
        >
          <ArrowLeft className="w-3.5 h-3.5 group-hover:-translate-x-1 transition-transform" />
          <span>Return to Command Center</span>
        </Link>

        {/* Header Strip */}
        <div className="rounded-2xl border border-[#1f1f1f] bg-[#141414]/70 backdrop-blur-md p-6 sm:p-8 mb-8 sm:mb-10">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-[#1f1f1f] bg-[#1f1f1f]/80 text-[#00c896] text-xs font-semibold uppercase tracking-wider mb-3.5 font-mono">
            <Sparkles className="w-3.5 h-3.5 text-[#00c896]" />
            <span>Capability Matrix</span>
          </div>

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-tight">
            Systems & Engineering{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-[#00c896] to-[#00b285]">
              Services.
            </span>
          </h1>

          <p className="mt-3.5 text-sm sm:text-base text-neutral-400 leading-relaxed max-w-2xl font-mono">
            Everything you need to launch, automate, and scale your digital presence under one high-leverage architecture.
          </p>
        </div>

        {/* 6-Card Asymmetric Bento Grid (3-column layout) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          
          {/* Bento Card 1: Website Development (Wide 2-col) */}
          <div className="lg:col-span-2 group relative flex flex-col justify-between rounded-2xl border border-[#1f1f1f] bg-[#141414]/70 hover:bg-[#181818]/90 hover:border-[#00c896]/60 transition-all duration-300 backdrop-blur-md p-6 sm:p-8">
            <div className="absolute top-0 right-0 w-36 h-36 bg-[#00c896]/5 rounded-bl-full pointer-events-none group-hover:bg-[#00c896]/15 transition-colors" />

            <div>
              <div className="flex items-center justify-between gap-2 mb-4">
                <span className="text-xs uppercase tracking-wider text-[#00c896] font-semibold font-mono bg-[#00c896]/10 px-2.5 py-1 rounded-md border border-[#00c896]/20 flex items-center gap-1.5">
                  <Cpu className="w-3.5 h-3.5" />
                  <span>{webDev.badge}</span>
                </span>
                <span className="text-xs font-mono text-neutral-500">Tier 01 // Core</span>
              </div>

              <h2 className="text-2xl sm:text-3xl font-bold text-white group-hover:text-[#00c896] transition-colors leading-snug">
                <Link href={`/services/${webDev.slug}`} className="focus:outline-none">
                  {webDev.title}
                </Link>
              </h2>

              <p className="mt-3 text-sm text-neutral-400 leading-relaxed max-w-2xl">
                {webDev.summary}
              </p>

              {/* Bento Telemetry Highlights Grid */}
              <div className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-3">
                {webDev.highlights.map((h, i) => (
                  <div
                    key={i}
                    className="p-3 rounded-xl border border-[#1f1f1f] bg-[#040404]/60 flex items-center gap-2 text-xs font-mono text-neutral-300"
                  >
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#00c896] shrink-0" />
                    <span>{h}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-8 pt-6 border-t border-[#1f1f1f]/80 flex items-center justify-between">
              <Link
                href={`/services/${webDev.slug}`}
                className="text-xs font-semibold text-neutral-300 group-hover:text-white transition-colors flex items-center gap-1.5 font-mono"
              >
                <span>{webDev.ctaLabel}</span>
                <ArrowRight className="w-3.5 h-3.5 text-[#00c896]" />
              </Link>
              <Link
                href={`/services/${webDev.slug}`}
                aria-label={`Open service detail for ${webDev.title}`}
                className="w-8 h-8 rounded-full bg-[#1f1f1f] border border-[#1f1f1f] group-hover:bg-[#00c896] group-hover:border-[#00c896] flex items-center justify-center text-neutral-300 group-hover:text-[#040404] transition-all duration-200"
              >
                <ArrowUpRight className="w-4 h-4" />
              </Link>
            </div>
          </div>

          {/* Bento Card 2: AI Automation Setup (Compact 1-col) */}
          <div className="lg:col-span-1 group relative flex flex-col justify-between rounded-2xl border border-[#1f1f1f] bg-[#141414]/70 hover:bg-[#181818]/90 hover:border-[#00c896]/60 transition-all duration-300 backdrop-blur-md p-6 sm:p-8">
            <div className="absolute top-0 right-0 w-24 h-24 bg-[#00c896]/5 rounded-bl-full pointer-events-none group-hover:bg-[#00c896]/15 transition-colors" />

            <div>
              <div className="mb-4">
                <span className="text-xs uppercase tracking-wider text-[#00c896] font-semibold font-mono bg-[#00c896]/10 px-2.5 py-1 rounded-md border border-[#00c896]/20 flex items-center gap-1.5 w-fit">
                  <Zap className="w-3.5 h-3.5" />
                  <span>{automation.badge}</span>
                </span>
              </div>

              <h2 className="text-xl sm:text-2xl font-bold text-white group-hover:text-[#00c896] transition-colors leading-snug">
                <Link href={`/services/${automation.slug}`} className="focus:outline-none">
                  {automation.title}
                </Link>
              </h2>

              <p className="mt-3 text-sm text-neutral-400 leading-relaxed">
                {automation.summary}
              </p>

              {/* Bento Visual Diagram: Trigger -> Process -> Auto Sync */}
              <div className="mt-6 p-4 rounded-xl border border-[#1f1f1f] bg-[#040404]/60">
                <div className="text-[10px] font-mono uppercase tracking-wider text-neutral-500 mb-2">
                  Pipeline Execution
                </div>
                <div className="flex items-center justify-between text-xs font-mono text-[#00c896]">
                  <span className="px-2 py-1 rounded bg-[#1f1f1f] border border-[#1f1f1f]">Trigger</span>
                  <span className="text-neutral-500">→</span>
                  <span className="px-2 py-1 rounded bg-[#1f1f1f] border border-[#1f1f1f]">Process</span>
                  <span className="text-neutral-500">→</span>
                  <span className="px-2 py-1 rounded bg-[#1f1f1f] border border-[#1f1f1f]">Auto Sync</span>
                </div>
              </div>
            </div>

            <div className="mt-8 pt-6 border-t border-[#1f1f1f]/80 flex items-center justify-between">
              <Link
                href={`/services/${automation.slug}`}
                className="text-xs font-semibold text-neutral-300 group-hover:text-white transition-colors flex items-center gap-1.5 font-mono"
              >
                <span>{automation.ctaLabel}</span>
                <ArrowRight className="w-3.5 h-3.5 text-[#00c896]" />
              </Link>
              <Link
                href={`/services/${automation.slug}`}
                aria-label={`Open service detail for ${automation.title}`}
                className="w-8 h-8 rounded-full bg-[#1f1f1f] border border-[#1f1f1f] group-hover:bg-[#00c896] group-hover:border-[#00c896] flex items-center justify-center text-neutral-300 group-hover:text-[#040404] transition-all duration-200"
              >
                <ArrowUpRight className="w-4 h-4" />
              </Link>
            </div>
          </div>

          {/* Bento Card 3: AI Chatbots (Compact 1-col) */}
          <div className="lg:col-span-1 group relative flex flex-col justify-between rounded-2xl border border-[#1f1f1f] bg-[#141414]/70 hover:bg-[#181818]/90 hover:border-[#00c896]/60 transition-all duration-300 backdrop-blur-md p-6 sm:p-8">
            <div className="absolute top-0 right-0 w-24 h-24 bg-[#00c896]/5 rounded-bl-full pointer-events-none group-hover:bg-[#00c896]/15 transition-colors" />

            <div>
              <div className="flex items-center justify-between gap-2 mb-4">
                <span className="text-xs uppercase tracking-wider text-[#00c896] font-semibold font-mono bg-[#00c896]/10 px-2.5 py-1 rounded-md border border-[#00c896]/20 flex items-center gap-1.5">
                  <Bot className="w-3.5 h-3.5" />
                  <span>{chatbot.badge}</span>
                </span>
                <span className="flex items-center gap-1.5 text-[10px] font-mono text-[#00c896]">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#00c896] animate-pulse" />
                  <span>Live</span>
                </span>
              </div>

              <h2 className="text-xl sm:text-2xl font-bold text-white group-hover:text-[#00c896] transition-colors leading-snug">
                <Link href={`/services/${chatbot.slug}`} className="focus:outline-none">
                  {chatbot.title}
                </Link>
              </h2>

              <p className="mt-3 text-sm text-neutral-400 leading-relaxed">
                {chatbot.summary}
              </p>

              {/* Bento Telemetry Tag */}
              <div className="mt-6 p-3.5 rounded-xl border border-[#1f1f1f] bg-[#040404]/60">
                <div className="flex items-center gap-2 text-xs font-mono text-neutral-300">
                  <span className="w-2 h-2 rounded-full bg-[#00c896]" />
                  <span>Autonomous Lead Qualification</span>
                </div>
                <div className="text-[10px] text-neutral-500 font-mono mt-1 pl-4">
                  24/7 Context Memory & Guardrails
                </div>
              </div>
            </div>

            <div className="mt-8 pt-6 border-t border-[#1f1f1f]/80 flex items-center justify-between">
              <Link
                href={`/services/${chatbot.slug}`}
                className="text-xs font-semibold text-neutral-300 group-hover:text-white transition-colors flex items-center gap-1.5 font-mono"
              >
                <span>{chatbot.ctaLabel}</span>
                <ArrowRight className="w-3.5 h-3.5 text-[#00c896]" />
              </Link>
              <Link
                href={`/services/${chatbot.slug}`}
                aria-label={`Open service detail for ${chatbot.title}`}
                className="w-8 h-8 rounded-full bg-[#1f1f1f] border border-[#1f1f1f] group-hover:bg-[#00c896] group-hover:border-[#00c896] flex items-center justify-center text-neutral-300 group-hover:text-[#040404] transition-all duration-200"
              >
                <ArrowUpRight className="w-4 h-4" />
              </Link>
            </div>
          </div>

          {/* Bento Card 4: SEO & AEO (Wide 2-col) */}
          <div className="lg:col-span-2 group relative flex flex-col justify-between rounded-2xl border border-[#1f1f1f] bg-[#141414]/70 hover:bg-[#181818]/90 hover:border-[#00c896]/60 transition-all duration-300 backdrop-blur-md p-6 sm:p-8">
            <div className="absolute top-0 right-0 w-36 h-36 bg-[#00c896]/5 rounded-bl-full pointer-events-none group-hover:bg-[#00c896]/15 transition-colors" />

            <div>
              <div className="flex items-center justify-between gap-2 mb-4">
                <span className="text-xs uppercase tracking-wider text-[#00c896] font-semibold font-mono bg-[#00c896]/10 px-2.5 py-1 rounded-md border border-[#00c896]/20 flex items-center gap-1.5">
                  <Search className="w-3.5 h-3.5" />
                  <span>{seo.badge}</span>
                </span>
                <span className="text-xs font-mono text-neutral-500">LLM Citations</span>
              </div>

              <h2 className="text-2xl sm:text-3xl font-bold text-white group-hover:text-[#00c896] transition-colors leading-snug">
                <Link href={`/services/${seo.slug}`} className="focus:outline-none">
                  {seo.title}
                </Link>
              </h2>

              <p className="mt-3 text-sm text-neutral-400 leading-relaxed max-w-2xl">
                {seo.summary}
              </p>

              {/* Bento Chips Grid */}
              <div className="mt-6 flex flex-wrap gap-2.5">
                <span className="px-3 py-1.5 rounded-lg border border-[#1f1f1f] bg-[#040404]/60 text-xs font-mono text-neutral-300">
                  JSON-LD Entity Graphs
                </span>
                <span className="px-3 py-1.5 rounded-lg border border-[#00c896]/30 bg-[#00c896]/10 text-xs font-mono text-[#00c896]">
                  Perplexity & ChatGPT Citations
                </span>
                <span className="px-3 py-1.5 rounded-lg border border-[#1f1f1f] bg-[#040404]/60 text-xs font-mono text-neutral-300">
                  Top-Tier Keyword Velocity
                </span>
              </div>
            </div>

            <div className="mt-8 pt-6 border-t border-[#1f1f1f]/80 flex items-center justify-between">
              <Link
                href={`/services/${seo.slug}`}
                className="text-xs font-semibold text-neutral-300 group-hover:text-white transition-colors flex items-center gap-1.5 font-mono"
              >
                <span>{seo.ctaLabel}</span>
                <ArrowRight className="w-3.5 h-3.5 text-[#00c896]" />
              </Link>
              <Link
                href={`/services/${seo.slug}`}
                aria-label={`Open service detail for ${seo.title}`}
                className="w-8 h-8 rounded-full bg-[#1f1f1f] border border-[#1f1f1f] group-hover:bg-[#00c896] group-hover:border-[#00c896] flex items-center justify-center text-neutral-300 group-hover:text-[#040404] transition-all duration-200"
              >
                <ArrowUpRight className="w-4 h-4" />
              </Link>
            </div>
          </div>

          {/* Bento Card 5: Full Brand Creation (Wide 2-col) */}
          <div className="lg:col-span-2 group relative flex flex-col justify-between rounded-2xl border border-[#1f1f1f] bg-[#141414]/70 hover:bg-[#181818]/90 hover:border-[#00c896]/60 transition-all duration-300 backdrop-blur-md p-6 sm:p-8">
            <div className="absolute top-0 right-0 w-36 h-36 bg-[#00c896]/5 rounded-bl-full pointer-events-none group-hover:bg-[#00c896]/15 transition-colors" />

            <div>
              <div className="flex items-center justify-between gap-2 mb-4">
                <span className="text-xs uppercase tracking-wider text-[#00c896] font-semibold font-mono bg-[#00c896]/10 px-2.5 py-1 rounded-md border border-[#00c896]/20 flex items-center gap-1.5">
                  <Palette className="w-3.5 h-3.5" />
                  <span>{branding.badge}</span>
                </span>
                <span className="text-xs font-mono text-neutral-500">Visual System</span>
              </div>

              <h2 className="text-2xl sm:text-3xl font-bold text-white group-hover:text-[#00c896] transition-colors leading-snug">
                <Link href={`/services/${branding.slug}`} className="focus:outline-none">
                  {branding.title}
                </Link>
              </h2>

              <p className="mt-3 text-sm text-neutral-400 leading-relaxed max-w-2xl">
                {branding.summary}
              </p>

              {/* Bento Design Tokens Preview */}
              <div className="mt-6 flex flex-wrap items-center gap-3">
                <span className="px-3 py-1.5 rounded-lg border border-[#1f1f1f] bg-[#040404]/60 text-xs font-mono text-neutral-300">
                  Design Tokens
                </span>
                <div className="flex items-center gap-2 p-1.5 px-3 rounded-lg border border-[#1f1f1f] bg-[#040404]/60">
                  <span className="w-3.5 h-3.5 rounded bg-[#040404] border border-[#1f1f1f]" title="Obsidian" />
                  <span className="w-3.5 h-3.5 rounded bg-[#1f1f1f]" title="Surface" />
                  <span className="w-3.5 h-3.5 rounded bg-[#00c896]" title="Electric Mint" />
                  <span className="text-[11px] font-mono text-neutral-400 ml-1">Color Palette Hierarchy</span>
                </div>
              </div>
            </div>

            <div className="mt-8 pt-6 border-t border-[#1f1f1f]/80 flex items-center justify-between">
              <Link
                href={`/services/${branding.slug}`}
                className="text-xs font-semibold text-neutral-300 group-hover:text-white transition-colors flex items-center gap-1.5 font-mono"
              >
                <span>{branding.ctaLabel}</span>
                <ArrowRight className="w-3.5 h-3.5 text-[#00c896]" />
              </Link>
              <Link
                href={`/services/${branding.slug}`}
                aria-label={`Open service detail for ${branding.title}`}
                className="w-8 h-8 rounded-full bg-[#1f1f1f] border border-[#1f1f1f] group-hover:bg-[#00c896] group-hover:border-[#00c896] flex items-center justify-center text-neutral-300 group-hover:text-[#040404] transition-all duration-200"
              >
                <ArrowUpRight className="w-4 h-4" />
              </Link>
            </div>
          </div>

          {/* Bento Card 6: Social Media Ads (Compact 1-col) */}
          <div className="lg:col-span-1 group relative flex flex-col justify-between rounded-2xl border border-[#1f1f1f] bg-[#141414]/70 hover:bg-[#181818]/90 hover:border-[#00c896]/60 transition-all duration-300 backdrop-blur-md p-6 sm:p-8">
            <div className="absolute top-0 right-0 w-24 h-24 bg-[#00c896]/5 rounded-bl-full pointer-events-none group-hover:bg-[#00c896]/15 transition-colors" />

            <div>
              <div className="mb-4">
                <span className="text-xs uppercase tracking-wider text-[#00c896] font-semibold font-mono bg-[#00c896]/10 px-2.5 py-1 rounded-md border border-[#00c896]/20 flex items-center gap-1.5 w-fit">
                  <TrendingUp className="w-3.5 h-3.5" />
                  <span>{ads.badge}</span>
                </span>
              </div>

              <h2 className="text-xl sm:text-2xl font-bold text-white group-hover:text-[#00c896] transition-colors leading-snug">
                <Link href={`/services/${ads.slug}`} className="focus:outline-none">
                  {ads.title}
                </Link>
              </h2>

              <p className="mt-3 text-sm text-neutral-400 leading-relaxed">
                {ads.summary}
              </p>

              {/* Bento Telemetry Tags */}
              <div className="mt-6 space-y-2">
                <div className="p-2.5 rounded-lg border border-[#1f1f1f] bg-[#040404]/60 text-xs font-mono text-neutral-300 flex items-center justify-between">
                  <span>Precision Retargeting</span>
                  <span className="text-[#00c896] font-bold">100% CAPI</span>
                </div>
                <div className="p-2.5 rounded-lg border border-[#1f1f1f] bg-[#040404]/60 text-xs font-mono text-neutral-300 flex items-center justify-between">
                  <span>Scalable Inbound CAC</span>
                  <span className="text-[#00c896] font-bold">3.5x+ ROAS</span>
                </div>
              </div>
            </div>

            <div className="mt-8 pt-6 border-t border-[#1f1f1f]/80 flex items-center justify-between">
              <Link
                href={`/services/${ads.slug}`}
                className="text-xs font-semibold text-neutral-300 group-hover:text-white transition-colors flex items-center gap-1.5 font-mono"
              >
                <span>{ads.ctaLabel}</span>
                <ArrowRight className="w-3.5 h-3.5 text-[#00c896]" />
              </Link>
              <Link
                href={`/services/${ads.slug}`}
                aria-label={`Open service detail for ${ads.title}`}
                className="w-8 h-8 rounded-full bg-[#1f1f1f] border border-[#1f1f1f] group-hover:bg-[#00c896] group-hover:border-[#00c896] flex items-center justify-center text-neutral-300 group-hover:text-[#040404] transition-all duration-200"
              >
                <ArrowUpRight className="w-4 h-4" />
              </Link>
            </div>
          </div>

        </div>
      </div>
    </main>
  );
}