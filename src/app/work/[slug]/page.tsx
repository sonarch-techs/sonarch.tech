import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, ArrowUpRight, Activity } from "lucide-react";
import { FEATURED_PROJECTS } from "@/data/case-studies";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return FEATURED_PROJECTS.map((project) => ({
    slug: project.id,
  }));
}

export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params;
  const project = FEATURED_PROJECTS.find((p) => p.id === slug);
  if (!project) return { title: "Case Study Not Found" };

  return {
    title: `${project.title} | SONARCHTECH`,
    description: project.description,
  };
}

export default async function CaseStudyDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const project = FEATURED_PROJECTS.find((p) => p.id === slug);

  if (!project) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-[#040404] text-white pt-28 pb-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <Link
          href="/work"
          className="inline-flex items-center gap-2 text-xs font-mono text-neutral-400 hover:text-[#00c896] transition-colors mb-8 group"
        >
          <ArrowLeft className="w-3.5 h-3.5 group-hover:-translate-x-1 transition-transform" />
          <span>Back to Case Studies</span>
        </Link>

        <div className="flex items-center gap-3 mb-4">
          <span className="text-xs font-mono uppercase text-[#00c896] bg-[#00c896]/10 px-2.5 py-1 rounded-md border border-[#00c896]/20">
            {project.category}
          </span>
          <span className="text-xs text-neutral-500 font-mono">Client: {project.client}</span>
        </div>

        <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white leading-tight">
          {project.title}
        </h1>

        <p className="mt-6 text-base sm:text-lg text-neutral-400 leading-relaxed">
          {project.description}
        </p>

        {/* Quantified Metric Card */}
        <div className="mt-10 p-6 rounded-2xl border border-[#1f1f1f] bg-[#1f1f1f]/30 flex items-center justify-between max-w-sm">
          <div>
            <div className="text-xs text-neutral-400 font-mono">{project.metrics.label}</div>
            <div className="text-2xl sm:text-3xl font-bold text-white font-mono mt-1">
              {project.metrics.value}
            </div>
          </div>
          <Activity className="w-6 h-6 text-[#00c896]" />
        </div>

        {/* Tech Stack */}
        <div className="mt-12 p-6 rounded-2xl border border-[#1f1f1f] bg-[#1f1f1f]/20">
          <h2 className="text-sm font-mono text-neutral-400 uppercase tracking-wider mb-4">
            Production Technology Stack
          </h2>
          <div className="flex flex-wrap gap-2">
            {project.techStack.map((tech) => (
              <span
                key={tech}
                className="px-3 py-1.5 rounded-lg border border-[#1f1f1f] bg-[#040404] text-xs font-mono text-neutral-300"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>

        {/* Action Callout */}
        <div className="mt-12 p-8 rounded-2xl border border-[#00c896]/30 bg-[#00c896]/5 flex flex-col sm:flex-row sm:items-center justify-between gap-6">
          <div>
            <h3 className="text-lg font-bold text-white font-mono">Build A Similar System</h3>
            <p className="text-xs text-neutral-400 mt-1">
              Engineer sub-second latency and automated scale for your organization.
            </p>
          </div>
          <Link
            href="/#contact"
            className="inline-flex items-center gap-2 bg-[#00c896] hover:bg-[#00b285] text-[#040404] font-bold text-xs px-5 py-3 rounded-xl transition-all font-mono shrink-0"
          >
            <span>Book Discovery</span>
            <ArrowUpRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </div>
  );
}