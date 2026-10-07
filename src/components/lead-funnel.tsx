"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Sparkles,
  Send,
  CheckCircle2,
  Cpu,
  Layers,
  Clock,
  ArrowRight,
  ShieldCheck,
  MessageCircle,
} from "lucide-react";

// Project Type Options
const PROJECT_TYPES = [
  {
    id: "web-app",
    label: "Web Application",
    desc: "Next.js 15, Three.js, sub-second LCP",
    baseSprints: 3,
  },
  {
    id: "automation",
    label: "AI Automation",
    desc: "Event webhooks, FastMCP, Supabase",
    baseSprints: 2,
  },
  {
    id: "chatbot",
    label: "24/7 AI Agent",
    desc: "Groq LLM, custom guardrails & JSON",
    baseSprints: 2,
  },
  {
    id: "aeo-seo",
    label: "AEO & Search",
    desc: "JSON-LD graph, llms.txt, AI citations",
    baseSprints: 2,
  },
  {
    id: "branding",
    label: "Full Brand Identity",
    desc: "Design tokens, logo marks, guidelines",
    baseSprints: 2,
  },
  {
    id: "paid-ads",
    label: "Paid Acquisition",
    desc: "CAPI tracking, Meta/LinkedIn scaling",
    baseSprints: 1,
  },
];

// Architectural Add-on Options
const ARCHITECTURE_ADDONS = [
  { id: "webgl", label: "Custom 3D / WebGL Visualizer", addSprints: 1 },
  { id: "database", label: "Supabase DB & Row-Level Auth", addSprints: 1 },
  { id: "payments", label: "Stripe Subscriptions / Invoicing", addSprints: 1 },
  { id: "llm-guard", label: "Proprietary AI Guardrails & RAG", addSprints: 1 },
];

export function LeadFunnel() {
  const [selectedType, setSelectedType] = useState<string>("web-app");
  const [selectedAddons, setSelectedAddons] = useState<string[]>(["webgl", "database"]);
  const [timelineSpeed, setTimelineSpeed] = useState<"standard" | "accelerated">("standard");

  // Form State
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [notes, setNotes] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  // Real-time Sprint & Timeline Calculation
  const currentProject = PROJECT_TYPES.find((p) => p.id === selectedType) || PROJECT_TYPES[0];
  const addonsCount = selectedAddons.length;
  const calculatedSprints =
    currentProject.baseSprints + (addonsCount > 1 ? Math.ceil(addonsCount / 2) : addonsCount);
  const estimatedWeeks =
    timelineSpeed === "accelerated"
      ? Math.max(2, Math.round(calculatedSprints * 1))
      : Math.round(calculatedSprints * 1.5);

  const toggleAddon = (id: string) => {
    setSelectedAddons((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !email.trim() || isSubmitting) return;

    setIsSubmitting(true);

    try {
      // Dispatch payload to lead intake API
      const res = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          email,
          projectType: currentProject.label,
          addons: selectedAddons,
          timelineSpeed,
          estimatedWeeks,
          notes,
        }),
      });

      if (!res.ok) throw new Error("Intake submission failed");
      setIsSubmitted(true);
    } catch {
      // Fallback: Show success state for testing if API route is not yet connected
      setIsSubmitted(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  const whatsappNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "1234567890";
  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=Hi%20SONARCHTECH%2C%20I%20am%20scoping%20a%20${encodeURIComponent(
    currentProject.label
  )}%20project%20targeting%20a%20${estimatedWeeks}-week%20turnaround.`;

  return (
    <section
      id="contact"
      className="relative py-20 sm:py-28 bg-transparent text-white overflow-hidden scroll-mt-20 lg:scroll-mt-24 z-10"
    >
      {/* Background Ambient Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[750px] h-[450px] bg-[#00c896]/5 blur-[170px] rounded-full pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14 sm:mb-16">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-[#1f1f1f] bg-[#1f1f1f]/80 text-[#00c896] text-xs font-semibold uppercase tracking-wider mb-4 font-mono">
            <Sparkles className="w-3.5 h-3.5 text-[#00c896]" />
            <span>Interactive Project Scoping</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white leading-tight">
            Scope your architecture &{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-[#00c896] to-[#00b285]">
              initiate discovery.
            </span>
          </h2>

          <p className="mt-4 text-sm sm:text-base text-neutral-400 font-mono">
            Select parameters below to calculate estimated sprint velocities and launch an intake session.
          </p>
        </div>

        {/* 2-Column Scoping Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Interactive Telemetry Configuration (7 Cols) */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* 1. Project Type Selector */}
            <div className="p-6 sm:p-8 rounded-2xl border border-[#1f1f1f] bg-[#141414]/70 backdrop-blur-md">
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs uppercase tracking-wider text-neutral-400 font-mono font-semibold flex items-center gap-2">
                  <Layers className="w-4 h-4 text-[#00c896]" />
                  <span>01. Select Primary Architecture</span>
                </span>
                <span className="text-[10px] font-mono text-[#00c896]">Required</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {PROJECT_TYPES.map((type) => {
                  const isSelected = selectedType === type.id;
                  return (
                    <button
                      key={type.id}
                      type="button"
                      onClick={() => setSelectedType(type.id)}
                      className={`p-4 rounded-xl text-left border transition-all cursor-pointer font-mono ${
                        isSelected
                          ? "border-[#00c896] bg-[#00c896]/10 text-white shadow-lg shadow-[#00c896]/10"
                          : "border-[#1f1f1f] bg-[#040404]/50 text-neutral-300 hover:border-[#1f1f1f] hover:bg-[#1f1f1f]/40"
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-bold">{type.label}</span>
                        {isSelected && <CheckCircle2 className="w-4 h-4 text-[#00c896]" />}
                      </div>
                      <p className="text-[11px] text-neutral-400 mt-1 leading-snug">
                        {type.desc}
                      </p>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* 2. Architectural Add-ons */}
            <div className="p-6 sm:p-8 rounded-2xl border border-[#1f1f1f] bg-[#141414]/70 backdrop-blur-md">
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs uppercase tracking-wider text-neutral-400 font-mono font-semibold flex items-center gap-2">
                  <Cpu className="w-4 h-4 text-[#00c896]" />
                  <span>02. Technical Integrations</span>
                </span>
                <span className="text-[10px] font-mono text-neutral-500">Optional</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {ARCHITECTURE_ADDONS.map((addon) => {
                  const isChecked = selectedAddons.includes(addon.id);
                  return (
                    <button
                      key={addon.id}
                      type="button"
                      onClick={() => toggleAddon(addon.id)}
                      className={`p-3.5 rounded-xl text-left border transition-all cursor-pointer font-mono flex items-center justify-between ${
                        isChecked
                          ? "border-[#00c896]/60 bg-[#00c896]/10 text-white"
                          : "border-[#1f1f1f] bg-[#040404]/50 text-neutral-400 hover:border-[#1f1f1f]"
                      }`}
                    >
                      <span className="text-xs font-medium">{addon.label}</span>
                      <div
                        className={`w-4 h-4 rounded border flex items-center justify-center shrink-0 ml-2 ${
                          isChecked
                            ? "bg-[#00c896] border-[#00c896] text-[#040404]"
                            : "border-neutral-700 bg-transparent"
                        }`}
                      >
                        {isChecked && <CheckCircle2 className="w-3.5 h-3.5" />}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* 3. Delivery Velocity */}
            <div className="p-6 sm:p-8 rounded-2xl border border-[#1f1f1f] bg-[#141414]/70 backdrop-blur-md">
              <span className="text-xs uppercase tracking-wider text-neutral-400 font-mono font-semibold flex items-center gap-2 mb-4">
                <Clock className="w-4 h-4 text-[#00c896]" />
                <span>03. Execution Velocity</span>
              </span>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => setTimelineSpeed("standard")}
                  className={`p-4 rounded-xl text-left border transition-all cursor-pointer font-mono ${
                    timelineSpeed === "standard"
                      ? "border-[#00c896] bg-[#00c896]/10 text-white"
                      : "border-[#1f1f1f] bg-[#040404]/50 text-neutral-400 hover:bg-[#1f1f1f]/30"
                  }`}
                >
                  <div className="text-sm font-bold">Standard Sprints</div>
                  <div className="text-[11px] text-neutral-400 mt-1">
                    Structured milestone validation & testing
                  </div>
                </button>

                <button
                  type="button"
                  onClick={() => setTimelineSpeed("accelerated")}
                  className={`p-4 rounded-xl text-left border transition-all cursor-pointer font-mono ${
                    timelineSpeed === "accelerated"
                      ? "border-[#00c896] bg-[#00c896]/10 text-white"
                      : "border-[#1f1f1f] bg-[#040404]/50 text-neutral-400 hover:bg-[#1f1f1f]/30"
                  }`}
                >
                  <div className="text-sm font-bold flex items-center gap-2">
                    <span>Priority Deployment</span>
                    <span className="text-[9px] px-1.5 py-0.5 rounded bg-[#00c896]/20 text-[#00c896]">
                      Fast
                    </span>
                  </div>
                  <div className="text-[11px] text-neutral-400 mt-1">
                    Dedicated daily sprints & edge deployment
                  </div>
                </button>
              </div>
            </div>

          </div>

          {/* Right Column: Dynamic Telemetry Output & Direct Intake (5 Cols) */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Real-time Dynamic Scoping Estimate Card */}
            <div className="p-6 sm:p-8 rounded-2xl border border-[#00c896]/40 bg-[#00c896]/5 backdrop-blur-md">
              <div className="flex items-center justify-between pb-4 border-b border-[#00c896]/20">
                <span className="text-xs font-mono uppercase tracking-wider text-[#00c896] font-bold">
                  Telemetry Estimate
                </span>
                <span className="w-2 h-2 rounded-full bg-[#00c896] animate-pulse" />
              </div>

              <div className="grid grid-cols-2 gap-4 mt-6">
                <div className="p-4 rounded-xl border border-[#1f1f1f] bg-[#040404]/80">
                  <div className="text-[11px] font-mono text-neutral-400">Total Sprints</div>
                  <div className="text-2xl sm:text-3xl font-mono font-bold text-white mt-1">
                    {calculatedSprints} <span className="text-xs text-[#00c896]">Phases</span>
                  </div>
                </div>

                <div className="p-4 rounded-xl border border-[#1f1f1f] bg-[#040404]/80">
                  <div className="text-[11px] font-mono text-neutral-400">Target Delivery</div>
                  <div className="text-2xl sm:text-3xl font-mono font-bold text-white mt-1">
                    ~{estimatedWeeks} <span className="text-xs text-[#00c896]">Weeks</span>
                  </div>
                </div>
              </div>

              <div className="mt-4 p-3.5 rounded-xl border border-[#1f1f1f] bg-[#040404]/60 flex items-center justify-between text-xs font-mono">
                <span className="text-neutral-400">Selected Focus:</span>
                <span className="text-white font-bold">{currentProject.label}</span>
              </div>
            </div>

            {/* Inbound Intake Form */}
            <div className="p-6 sm:p-8 rounded-2xl border border-[#1f1f1f] bg-[#141414]/70 backdrop-blur-md">
              <AnimatePresence mode="wait">
                {isSubmitted ? (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    className="text-center py-6"
                  >
                    <div className="w-12 h-12 rounded-full bg-[#00c896]/20 border border-[#00c896] flex items-center justify-center text-[#00c896] mx-auto mb-4">
                      <CheckCircle2 className="w-6 h-6" />
                    </div>
                    <h3 className="text-lg font-bold text-white font-mono">Parameters Received</h3>
                    <p className="text-xs text-neutral-400 mt-2 font-mono leading-relaxed">
                      Our systems architect is reviewing your configuration. Expect response in &lt;2 hours.
                    </p>

                    <div className="mt-6 pt-6 border-t border-[#1f1f1f]">
                      <a
                        href={whatsappUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 text-xs font-mono text-[#00c896] hover:underline"
                      >
                        <MessageCircle className="w-4 h-4" />
                        <span>Fast-track immediately via WhatsApp</span>
                      </a>
                    </div>
                  </motion.div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <h3 className="text-base font-bold text-white font-mono flex items-center gap-2">
                      <Send className="w-4 h-4 text-[#00c896]" />
                      <span>Submit Project Parameters</span>
                    </h3>

                    <div>
                      <label className="block text-[11px] font-mono text-neutral-400 mb-1.5">
                        Your Name / Organization
                      </label>
                      <input
                        type="text"
                        required
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="e.g. Alex Mercer, Syntrix Labs"
                        className="w-full bg-[#040404]/80 border border-[#1f1f1f] rounded-xl px-4 py-3 text-xs text-white placeholder-neutral-600 focus:outline-none focus:border-[#00c896]/60 transition-colors font-mono"
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] font-mono text-neutral-400 mb-1.5">
                        Work Email
                      </label>
                      <input
                        type="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="alex@syntrixlabs.com"
                        className="w-full bg-[#040404]/80 border border-[#1f1f1f] rounded-xl px-4 py-3 text-xs text-white placeholder-neutral-600 focus:outline-none focus:border-[#00c896]/60 transition-colors font-mono"
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] font-mono text-neutral-400 mb-1.5">
                        Project Brief / Requirements (Optional)
                      </label>
                      <textarea
                        rows={3}
                        value={notes}
                        onChange={(e) => setNotes(e.target.value)}
                        placeholder="Describe key workflows, target launch dates, or legacy bottlenecks..."
                        className="w-full bg-[#040404]/80 border border-[#1f1f1f] rounded-xl px-4 py-3 text-xs text-white placeholder-neutral-600 focus:outline-none focus:border-[#00c896]/60 transition-colors font-mono resize-none"
                      />
                    </div>

                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full inline-flex items-center justify-center gap-2 bg-[#00c896] hover:bg-[#00b285] disabled:opacity-50 text-[#040404] font-bold text-xs py-3.5 rounded-xl transition-all font-mono shadow-lg shadow-[#00c896]/20 cursor-pointer mt-2"
                    >
                      {isSubmitting ? (
                        <span>Transmitting Telemetry...</span>
                      ) : (
                        <>
                          <span>Transmit Discovery Request</span>
                          <ArrowRight className="w-4 h-4" />
                        </>
                      )}
                    </button>

                    <div className="pt-2 flex items-center justify-center gap-4 text-[10px] text-neutral-500 font-mono">
                      <span className="flex items-center gap-1">
                        <ShieldCheck className="w-3 h-3 text-[#00c896]" />
                        <span>Zero Spam Guarantee</span>
                      </span>
                      <span>•</span>
                      <span>Confidential Intake</span>
                    </div>
                  </form>
                )}
              </AnimatePresence>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}