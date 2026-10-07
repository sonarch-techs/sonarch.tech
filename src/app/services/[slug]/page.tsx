import { notFound } from "next/navigation";
import Link from "next/link";
import {
  ArrowLeft,
  ArrowUpRight,
  CheckCircle2,
  Cpu,
  Sparkles,
  Clock,
  Layers,
} from "lucide-react";
import { SERVICES_DATA, getService } from "@/data/services";

type PageParams = Promise<{ slug: string }>;

// 1. Pre-render all dynamic slugs at build time
export async function generateStaticParams() {
  return SERVICES_DATA.map((service) => ({
    slug: service.slug,
  }));
}

// 2. SEO & AEO Structured Metadata
export async function generateMetadata({
  params,
}: {
  params: PageParams;
}) {
  const { slug } = await params;
  const service = getService(slug);

  if (!service) {
    return { title: "Service Not Found | SONARCHTECH" };
  }

  return {
    title: `${service.title} | SONARCHTECH`,
    description: service.summary,
    openGraph: {
      title: `${service.title} — Architecture Specifications`,
      description: service.summary,
      type: "website",
    },
  };
}

// 3. Page Component (Must be export default)
export default async function ServiceDetailPage({
  params,
}: {
  params: PageParams;
}) {
  const { slug } = await params;
  const service = getService(slug);

  if (!service) {
    notFound();
  }

  return (
    <main className="relative min-h-screen bg-transparent text-white pt-20 sm:pt-24 pb-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
      {/* Ambient Glow */}
      <div className="absolute top-12 left-1/2 -translate-x-1/2 w-[700px] h-[350px] bg-[#00c896]/10 blur-[150px] pointer-events-none z-0" />

      <div className="relative z-10 max-w-5xl mx-auto">
        {/* Navigation Breadcrumb */}
        <Link
          href="/services"
          className="inline-flex items-center gap-2 text-xs font-mono text-neutral-400 hover:text-[#00c896] transition-colors mb-4 group"
        >
          <ArrowLeft className="w-3.5 h-3.5 group-hover:-translate-x-1 transition-transform" />
          <span>Return to Capability Matrix</span>
        </Link>

        {/* Header Strip */}
        <div className="rounded-2xl border border-[#1f1f1f] bg-[#141414]/70 backdrop-blur-md p-6 sm:p-10 mb-8 sm:mb-10">
          <div className="flex flex-wrap items-center gap-3 mb-4">
            <span className="text-xs font-mono uppercase tracking-wider text-[#00c896] bg-[#00c896]/10 px-3 py-1 rounded-md border border-[#00c896]/30">
              {service.badge}
            </span>
            <span className="text-xs font-mono text-neutral-500">
              Spec // 2026 Production Standard
            </span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white leading-tight">
            {service.title}
          </h1>

          <p className="mt-4 text-base sm:text-xl text-[#00c896] font-medium leading-relaxed max-w-3xl font-mono">
            {service.headline}
          </p>

          <p className="mt-4 text-sm sm:text-base text-neutral-400 leading-relaxed max-w-3xl">
            {service.summary}
          </p>

          {/* Metrics Strip */}
          <div className="mt-8 pt-6 border-t border-[#1f1f1f] grid grid-cols-1 sm:grid-cols-3 gap-4">
            {service.metrics.map((metric, idx) => (
              <div key={idx} className="border-l-2 border-[#00c896] pl-4">
                <div className="text-2xl sm:text-3xl font-bold font-mono text-white">
                  {metric.value}
                </div>
                <div className="text-xs font-mono text-neutral-400 mt-1">
                  {metric.label}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Specifications & Timeline Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Main Details */}
          <div className="lg:col-span-8 space-y-8">
            {/* Architecture Highlights */}
            <div className="rounded-2xl border border-[#1f1f1f] bg-[#141414]/70 backdrop-blur-md p-6 sm:p-8">
              <h2 className="text-lg sm:text-xl font-bold text-white mb-6 flex items-center gap-2">
                <Cpu className="w-5 h-5 text-[#00c896]" />
                <span>Architecture Specifications</span>
              </h2>

              <div className="space-y-4">
                {service.architectureSpecs.map((spec, idx) => (
                  <div
                    key={idx}
                    className="p-4 rounded-xl border border-[#1f1f1f] bg-[#040404]/60"
                  >
                    <h3 className="text-sm font-bold text-neutral-200 font-mono mb-1">
                      {spec.title}
                    </h3>
                    <p className="text-xs text-neutral-400 leading-relaxed">
                      {spec.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Core Deliverables */}
            <div className="rounded-2xl border border-[#1f1f1f] bg-[#141414]/70 backdrop-blur-md p-6 sm:p-8">
              <h2 className="text-lg sm:text-xl font-bold text-white mb-6 flex items-center gap-2">
                <Layers className="w-5 h-5 text-[#00c896]" />
                <span>Standard Deliverables</span>
              </h2>

              <div className="space-y-3">
                {service.deliverables.map((item, idx) => (
                  <div
                    key={idx}
                    className="flex items-start gap-3 p-3.5 rounded-xl border border-[#1f1f1f] bg-[#040404]/40"
                  >
                    <CheckCircle2 className="w-4 h-4 text-[#00c896] shrink-0 mt-0.5" />
                    <span className="text-xs sm:text-sm text-neutral-300 font-mono">
                      {item}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Sprint Execution Timeline */}
            <div className="rounded-2xl border border-[#1f1f1f] bg-[#141414]/70 backdrop-blur-md p-6 sm:p-8">
              <h2 className="text-lg sm:text-xl font-bold text-white mb-6 flex items-center gap-2">
                <Clock className="w-5 h-5 text-[#00c896]" />
                <span>Execution Timeline</span>
              </h2>

              <div className="space-y-4">
                {service.sprintTimeline.map((sprint, idx) => (
                  <div
                    key={idx}
                    className="flex flex-col sm:flex-row sm:items-center justify-between p-4 rounded-xl border border-[#1f1f1f] bg-[#040404]/60 gap-2 sm:gap-4"
                  >
                    <div className="flex items-center gap-3">
                      <span className="text-xs font-mono font-bold text-[#00c896] px-2.5 py-1 rounded bg-[#00c896]/10 border border-[#00c896]/20">
                        {sprint.phase}
                      </span>
                      <span className="text-xs text-neutral-400 font-mono">
                        {sprint.duration}
                      </span>
                    </div>
                    <p className="text-xs text-neutral-300 font-mono sm:text-right">
                      {sprint.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Sidebar */}
          <div className="lg:col-span-4 space-y-6">
            {/* Tech Stack Spec */}
            <div className="p-6 rounded-2xl border border-[#1f1f1f] bg-[#141414]/70 backdrop-blur-md">
              <h3 className="text-xs font-mono text-neutral-400 uppercase tracking-wider mb-4 flex items-center gap-2">
                <Sparkles className="w-3.5 h-3.5 text-[#00c896]" />
                <span>Production Tech Stack</span>
              </h3>
              <div className="flex flex-wrap gap-2">
                {service.stack.map((item) => (
                  <span
                    key={item}
                    className="text-xs font-mono px-3 py-1.5 rounded-lg border border-[#1f1f1f] bg-[#040404] text-neutral-300"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>

            {/* Direct Intake Card */}
            <div className="p-6 rounded-2xl border border-[#00c896]/30 bg-[#00c896]/5 backdrop-blur-md">
              <h3 className="text-base font-bold text-white font-mono mb-2">
                Initiate This Project
              </h3>
              <p className="text-xs text-neutral-400 mb-5 leading-relaxed">
                Need this architecture engineered for your organization? Submit parameters to schedule a scoping session.
              </p>
              <Link
                href="/#contact"
                className="w-full inline-flex items-center justify-center gap-2 bg-[#00c896] hover:bg-[#00b285] text-[#040404] font-bold text-xs py-3.5 rounded-xl transition-all font-mono shadow-lg shadow-[#00c896]/20"
              >
                <span>Launch Discovery Intake</span>
                <ArrowUpRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}