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
  if (!project) return { title: "Case Study Not Found | SONARCHTECH" };

  return {
    title: `${project.title} | SONARCHTECH Case Studies`,
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
    <div className="relative min-h-screen bg-transparent text-neutral-900 dark:text-white pt-20 sm:pt-28 pb-24 px-4 sm:px-6 lg:px-8 overflow-hidden transition-colors duration-200">
      {/* Ambient Glow */}
      <div className="absolute top-12 left-1/2 -translate-x-1/2 w-[700px] h-[350px] bg-[#008763]/[0.05] dark:bg-[#00c896]/10 blur-[150px] pointer-events-none z-0" />

      <div className="relative z-10 max-w-4xl mx-auto">
        {/* Navigation Breadcrumb */}
        <Link
          href="/work"
          className="inline-flex items-center gap-2 text-xs font-mono text-neutral-600 dark:text-neutral-400 hover:text-[#008763] dark:hover:text-[#00c896] transition-colors mb-8 group"
        >
          <ArrowLeft className="w-3.5 h-3.5 group-hover:-translate-x-1 transition-transform" />
          <span>Back to Case Studies</span>
        </Link>

        {/* Category & Client Header */}
        <div className="flex items-center gap-3 mb-4">
          <span className="text-xs font-mono uppercase text-[#008763] dark:text-[#00c896] bg-[#008763]/10 dark:bg-[#00c896]/10 px-2.5 py-1 rounded-md border border-[#008763]/25 dark:border-[#00c896]/20 font-semibold">
            {project.category}
          </span>
          <span className="text-xs text-neutral-500 font-mono">Client: {project.client}</span>
        </div>

        {/* Project Title */}
        <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-neutral-900 dark:text-white leading-tight">
          {project.title}
        </h1>

        {/* Summary Description */}
        <p className="mt-6 text-base sm:text-lg text-neutral-600 dark:text-neutral-300 leading-relaxed">
          {project.description}
        </p>

        {/* Quantified Metric Card */}
        <div className="mt-10 p-6 rounded-2xl border border-neutral-200 dark:border-[#1f1f1f] bg-white/80 dark:bg-[#1f1f1f]/30 backdrop-blur-md flex items-center justify-between max-w-sm shadow-sm dark:shadow-none">
          <div>
            <div className="text-xs text-neutral-500 dark:text-neutral-400 font-mono">
              {project.metrics.label}
            </div>
            <div className="text-2xl sm:text-3xl font-bold text-neutral-900 dark:text-white font-mono mt-1">
              {project.metrics.value}
            </div>
          </div>
          <Activity className="w-6 h-6 text-[#008763] dark:text-[#00c896]" />
        </div>

        {/* Technology Stack Grid */}
        <div className="mt-12 p-6 sm:p-8 rounded-2xl border border-neutral-200 dark:border-[#1f1f1f] bg-white/80 dark:bg-[#1f1f1f]/20 backdrop-blur-md shadow-sm dark:shadow-none">
          <h2 className="text-xs font-mono text-neutral-600 dark:text-neutral-400 uppercase tracking-wider mb-4 font-semibold">
            Production Technology Stack
          </h2>
          <div className="flex flex-wrap gap-2">
            {project.techStack.map((tech) => (
              <span
                key={tech}
                className="px-3 py-1.5 rounded-lg border border-neutral-200 dark:border-[#1f1f1f] bg-neutral-100 dark:bg-[#040404] text-xs font-mono text-neutral-700 dark:text-neutral-300"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>

        {/* Action Callout */}
        <div className="mt-12 p-8 rounded-2xl border border-[#008763]/25 dark:border-[#00c896]/30 bg-[#008763]/5 dark:bg-[#00c896]/5 backdrop-blur-md flex flex-col sm:flex-row sm:items-center justify-between gap-6 shadow-sm dark:shadow-none">
          <div>
            <h3 className="text-lg font-bold text-neutral-900 dark:text-white font-mono">
              Build A Similar System
            </h3>
            <p className="text-xs text-neutral-600 dark:text-neutral-400 mt-1">
              Engineer sub-second latency and automated scale for your organization.
            </p>
          </div>
          <Link
            href="/#contact"
            className="inline-flex items-center gap-2 bg-[#008763] hover:bg-[#006f52] dark:bg-[#00c896] dark:hover:bg-[#00b285] text-white dark:text-[#040404] font-bold text-xs px-5 py-3 rounded-xl transition-all font-mono shrink-0 shadow-md shadow-[#008763]/20 dark:shadow-lg dark:shadow-[#00c896]/20"
          >
            <span>Book Discovery</span>
            <ArrowUpRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </div>
  );
}