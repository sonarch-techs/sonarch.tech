"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, Check, ArrowRight, Loader2, CheckCircle2, AlertCircle } from "lucide-react";
import { submitLeadAction } from "@/app/actions/submit-lead";

const SERVICE_OPTIONS = [
  "Website Development",
  "Custom Web Application",
  "AI Automation Setup",
  "AI Chatbots",
  "Full Brand Creation",
  "Social Media Ads",
  "SEO Optimization",
];

const BUDGET_RANGES = [
  "$500 - $2,000",
  "$2,000 - $5,000",
  "$5,000 - $10,000",
  "$10,000+",
];

export function LeadFunnel() {
  const [selectedServices, setSelectedServices] = useState<string[]>([]);
  const [selectedBudget, setSelectedBudget] = useState<string>("");
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [projectDetails, setProjectDetails] = useState("");
  const [botField, setBotField] = useState("");
const [formMountTime] = useState<number>(() => Date.now());

  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [isSuccess, setIsSuccess] = useState(false);

  const toggleService = (service: string) => {
    setSelectedServices((prev) =>
      prev.includes(service)
        ? prev.filter((s) => s !== service)
        : [...prev, service]
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);

    if (selectedServices.length === 0) {
      setErrorMsg("Please select at least one required service.");
      return;
    }

    if (!selectedBudget) {
      setErrorMsg("Please select a target investment range.");
      return;
    }

    setLoading(true);

    const result = await submitLeadAction({
      fullName,
      email,
      companyName,
      services: selectedServices,
      budgetRange: selectedBudget,
      projectDetails,
      botField,
      formRenderTime: formMountTime,
    });

    setLoading(false);

    if (result.success) {
      setIsSuccess(true);
    } else {
      setErrorMsg(result.error || "Submission failed. Please try again.");
    }
  };

  return (
    <section
  id="contact"
  className="relative py-20 sm:py-28 bg-transparent text-white overflow-hidden scroll-mt-20 lg:scroll-mt-24 z-10"
>
      {/* Ambient background glow */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[600px] h-[350px] bg-[#00c896]/10 blur-[130px] rounded-full pointer-events-none -z-10" />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-[#1f1f1f] bg-[#1f1f1f]/80 text-[#00c896] text-xs font-semibold uppercase tracking-wider mb-4">
            <Sparkles className="w-3.5 h-3.5 text-[#00c896]" />
            <span>Initiate Project Scope</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white leading-tight">
            Let&apos;s engineer your{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-[#00c896] to-[#00b285]">
              next advantage.
            </span>
          </h2>
          <p className="mt-4 text-sm sm:text-base text-neutral-400">
            Tell us about your objectives. We will review your requirements and respond within 24 hours with architectural recommendations.
          </p>
        </div>

        {/* Funnel Container */}
        <div className="rounded-2xl border border-[#1f1f1f] bg-[#1f1f1f]/30 p-6 sm:p-10 backdrop-blur-md shadow-2xl relative">
          
          <AnimatePresence mode="wait">
            {isSuccess ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                className="py-12 flex flex-col items-center text-center"
              >
                <div className="w-16 h-16 rounded-full bg-[#00c896]/15 border border-[#00c896]/30 flex items-center justify-center text-[#00c896] mb-6">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h3 className="text-2xl font-bold text-white tracking-tight">
                  Inquiry Transmitted
                </h3>
                <p className="mt-2 text-sm sm:text-base text-neutral-400 max-w-md">
                  Thank you, <span className="text-white font-medium">{fullName}</span>. Your project parameters have been written to our deployment pipeline. We will follow up via email shortly.
                </p>
                <button
                  type="button"
                  onClick={() => {
                    setIsSuccess(false);
                    setSelectedServices([]);
                    setSelectedBudget("");
                    setFullName("");
                    setEmail("");
                    setCompanyName("");
                    setProjectDetails("");
                  }}
                  className="mt-8 text-xs uppercase tracking-wider font-semibold text-[#00c896] hover:underline cursor-pointer"
                >
                  Submit Another Scope
                </button>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-8">
                
                {/* Hidden honeypot for bot traps */}
<div className="hidden opacity-0 pointer-events-none absolute -left-[9999px]" aria-hidden="true">
  <input
    type="text"
    tabIndex={-1}
    autoComplete="off"
    name="website_url"
    value={botField}
    onChange={(e) => setBotField(e.target.value)}
  />
</div>

                {/* 1. Services Picker */}
                <div>
                  <label className="block text-xs uppercase tracking-wider text-neutral-400 font-semibold mb-3">
                    1. Required Capabilities (Select all that apply)
                  </label>
                  <div className="flex flex-wrap gap-2.5">
                    {SERVICE_OPTIONS.map((service) => {
                      const active = selectedServices.includes(service);
                      return (
                        <button
                          key={service}
                          type="button"
                          onClick={() => toggleService(service)}
                          className={`inline-flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs sm:text-sm font-medium border transition-all duration-200 cursor-pointer ${
                            active
                              ? "bg-[#00c896] text-[#040404] border-[#00c896] font-semibold shadow-md shadow-[#00c896]/20"
                              : "bg-[#1f1f1f]/60 text-neutral-300 border-[#1f1f1f] hover:border-neutral-700"
                          }`}
                        >
                          {active && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                          <span>{service}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* 2. Budget Bracket Picker */}
                <div>
                  <label className="block text-xs uppercase tracking-wider text-neutral-400 font-semibold mb-3">
                    2. Estimated Investment Range
                  </label>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                    {BUDGET_RANGES.map((budget) => {
                      const active = selectedBudget === budget;
                      return (
                        <button
                          key={budget}
                          type="button"
                          onClick={() => setSelectedBudget(budget)}
                          className={`p-3 rounded-xl text-xs sm:text-sm font-medium border text-center transition-all duration-200 cursor-pointer ${
                            active
                              ? "bg-[#00c896]/15 text-[#00c896] border-[#00c896] font-bold"
                              : "bg-[#1f1f1f]/60 text-neutral-300 border-[#1f1f1f] hover:border-neutral-700"
                          }`}
                        >
                          {budget}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* 3. Stakeholder Information */}
                <div>
                  <label className="block text-xs uppercase tracking-wider text-neutral-400 font-semibold mb-3">
                    3. Stakeholder Details
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div>
                      <input
                        type="text"
                        required
                        placeholder="Your Name *"
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        className="w-full px-4 py-3 rounded-xl bg-[#1f1f1f]/60 border border-[#1f1f1f] text-white text-sm placeholder-neutral-500 focus:outline-none focus:border-[#00c896] transition-colors"
                      />
                    </div>
                    <div>
                      <input
                        type="email"
                        required
                        placeholder="Business Email *"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full px-4 py-3 rounded-xl bg-[#1f1f1f]/60 border border-[#1f1f1f] text-white text-sm placeholder-neutral-500 focus:outline-none focus:border-[#00c896] transition-colors"
                      />
                    </div>
                    <div>
                      <input
                        type="text"
                        placeholder="Company / Domain"
                        value={companyName}
                        onChange={(e) => setCompanyName(e.target.value)}
                        className="w-full px-4 py-3 rounded-xl bg-[#1f1f1f]/60 border border-[#1f1f1f] text-white text-sm placeholder-neutral-500 focus:outline-none focus:border-[#00c896] transition-colors"
                      />
                    </div>
                  </div>
                </div>

                {/* 4. Project Details */}
                <div>
                  <label className="block text-xs uppercase tracking-wider text-neutral-400 font-semibold mb-3">
                    4. Architecture Goals & Timelines
                  </label>
                  <textarea
                    required
                    rows={3}
                    placeholder="Briefly describe what you need built, existing blockers, or target launch date..."
                    value={projectDetails}
                    onChange={(e) => setProjectDetails(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl bg-[#1f1f1f]/60 border border-[#1f1f1f] text-white text-sm placeholder-neutral-500 focus:outline-none focus:border-[#00c896] transition-colors resize-none"
                  />
                </div>

                {/* Error Banner */}
                {errorMsg && (
                  <div className="p-3.5 rounded-xl border border-red-500/30 bg-red-500/10 text-red-400 text-xs sm:text-sm flex items-center gap-2">
                    <AlertCircle className="w-4 h-4 shrink-0" />
                    <span>{errorMsg}</span>
                  </div>
                )}

                {/* Submit Action */}
                <div className="pt-2">
                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-[#00c896] hover:bg-[#00b285] disabled:opacity-50 text-[#040404] font-bold px-8 py-3.5 rounded-xl shadow-lg shadow-[#00c896]/20 transition-all duration-200 group text-sm sm:text-base cursor-pointer"
                  >
                    {loading ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        <span>Transmitting Parameters...</span>
                      </>
                    ) : (
                      <>
                        <span>Submit Project Scope</span>
                        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                      </>
                    )}
                  </button>
                </div>

              </form>
            )}
          </AnimatePresence>

        </div>

      </div>
    </section>
  );
}