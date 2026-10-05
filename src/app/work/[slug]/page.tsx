import { notFound } from "next/navigation";
import Link from "next/link";
import type { Metadata } from "next";
import { ArrowLeft, ArrowRight, CheckCircle2, TrendingUp, Cpu } from "lucide-react";
import { getCaseStudyBySlug, FALLBACK_CASE_STUDIES } from "@/lib/content";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return Object.keys(FALLBACK_CASE_STUDIES).map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = await getCaseStudyBySlug(slug);

  if (!project) {
    return { title: "Case Study Not Found | SONARCHTECH" };
  }

  return {
    title: `${project.title} | Case Study`,
    description: project.summary,
    openGraph: {
      title: `${project.title} — ${project.client} | SONARCHTECH`,
      description: project.summary,
      url: `https://sonarch.tech/work/${project.slug}`,
    },
  };
}

export default async function CaseStudyPage({ params }: PageProps) {
  const { slug } = await params;
  const project = await getCaseStudyBySlug(slug);

  if (!project) notFound();

  return (
    <article className="min-h-screen bg-[#040404] text-white py-12 sm:py-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Navigation Back Link */}
        <Link
          href="/#work"
          className="inline-flex items-center gap-2 text-xs uppercase tracking-wider text-neutral-400 hover:text-[#00c896] transition-colors mb-8 font-semibold"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Case Studies</span>
        </Link>

        {/* Header Block */}
        <header className="border-b border-[#1f1f1f] pb-10">
          <div className="flex items-center gap-3 text-xs mb-4 font-mono">
            <span className="px-3 py-1 rounded-full bg-[#00c896]/10 text-[#00c896] border border-[#00c896]/30 font-semibold uppercase tracking-wider">
              {project.category}
            </span>
            <span className="text-neutral-500 font-medium">Client: {project.client}</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white leading-tight">
            {project.title}
          </h1>

          <p className="mt-6 text-base sm:text-lg text-neutral-400 leading-relaxed">
            {project.summary}
          </p>

          {/* Tech Stack Tags */}
          <div className="mt-8 flex flex-wrap gap-2">
            {project.techStack.map((tech) => (
              <span
                key={tech}
                className="px-3 py-1 rounded-lg text-xs font-medium bg-[#1f1f1f] text-neutral-300 border border-[#1f1f1f]"
              >
                {tech}
              </span>
            ))}
          </div>
        </header>

        {/* Quantified Impact Metrics */}
        <section className="py-10 border-b border-[#1f1f1f]">
          <h2 className="text-xs uppercase tracking-wider text-neutral-500 font-semibold mb-6 flex items-center gap-2">
            <TrendingUp className="w-4 h-4 text-[#00c896]" />
            <span>Measured Commercial Outcomes</span>
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {project.metrics.map((m, idx) => (
              <div
                key={idx}
                className="p-5 rounded-2xl border border-[#1f1f1f] bg-[#1f1f1f]/35"
              >
                <div className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                  {m.value}
                </div>
                <div className="text-xs text-neutral-400 mt-1 font-medium">{m.label}</div>
              </div>
            ))}
          </div>
        </section>

        {/* Problem vs. Solution Grid */}
        <section className="py-12 space-y-10 border-b border-[#1f1f1f]">
          <div>
            <h2 className="text-xl font-bold text-white mb-3">The Architectural Challenge</h2>
            <p className="text-sm sm:text-base text-neutral-400 leading-relaxed">
              {project.problem}
            </p>
          </div>

          <div>
            <h2 className="text-xl font-bold text-white mb-3">The Engineering Solution</h2>
            <p className="text-sm sm:text-base text-neutral-400 leading-relaxed">
              {project.solution}
            </p>
          </div>

          <div>
            <h3 className="text-base font-semibold text-white mb-4 flex items-center gap-2">
              <Cpu className="w-4 h-4 text-[#00c896]" />
              <span>Core System Architecture Elements</span>
            </h3>
            <ul className="space-y-3">
              {project.architecture.map((item, idx) => (
                <li key={idx} className="flex items-start gap-3 text-sm text-neutral-300">
                  <CheckCircle2 className="w-4 h-4 text-[#00c896] shrink-0 mt-0.5" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* Bottom CTA */}
        <footer className="pt-12 text-center sm:text-left flex flex-col sm:flex-row items-center justify-between gap-6">
          <div>
            <h3 className="text-lg font-bold text-white">Need a similar architecture?</h3>
            <p className="text-xs sm:text-sm text-neutral-400 mt-1">
              Let&apos;s map out your systems blueprint and deployment timeline.
            </p>
          </div>

          <Link
            href="/#contact"
            className="inline-flex items-center gap-2 bg-[#00c896] hover:bg-[#00b285] text-[#040404] font-bold text-sm px-6 py-3 rounded-xl shadow-lg shadow-[#00c896]/20 transition-all shrink-0"
          >
            <span>Book Discovery Session</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </footer>

      </div>
    </article>
  );
}