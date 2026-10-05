import { notFound } from "next/navigation";
import Link from "next/link";
import type { Metadata } from "next";
import { ArrowLeft, Clock, Calendar, CheckCircle2, ArrowRight } from "lucide-react";
import { getInsightBySlug, FALLBACK_INSIGHTS } from "@/lib/content";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return Object.keys(FALLBACK_INSIGHTS).map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const insight = await getInsightBySlug(slug);

  if (!insight) {
    return { title: "Publication Not Found | SONARCHTECH" };
  }

  return {
    title: `${insight.title} | Insights`,
    description: insight.summary,
    openGraph: {
      title: `${insight.title} | SONARCHTECH Insights`,
      description: insight.summary,
      url: `https://sonarch.tech/insights/${insight.slug}`,
    },
  };
}

export default async function InsightPage({ params }: PageProps) {
  const { slug } = await params;
  const post = await getInsightBySlug(slug);

  if (!post) notFound();

  return (
    <article className="min-h-screen bg-[#040404] text-white py-12 sm:py-20">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Back Link */}
        <Link
          href="/#insights"
          className="inline-flex items-center gap-2 text-xs uppercase tracking-wider text-neutral-400 hover:text-[#00c896] transition-colors mb-8 font-semibold"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Insights</span>
        </Link>

        {/* Header Block */}
        <header className="border-b border-[#1f1f1f] pb-8">
          <div className="flex items-center gap-3 text-xs text-neutral-500 font-mono mb-4">
            <span className="px-2.5 py-0.5 rounded-full bg-[#00c896]/10 text-[#00c896] border border-[#00c896]/20 font-sans font-medium text-[11px]">
              {post.category}
            </span>
            <span className="flex items-center gap-1">
              <Clock className="w-3.5 h-3.5" />
              {post.readTime}
            </span>
            <span className="flex items-center gap-1">
              <Calendar className="w-3.5 h-3.5" />
              {post.date}
            </span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white leading-tight">
            {post.title}
          </h1>

          <p className="mt-4 text-base sm:text-lg text-neutral-400 leading-relaxed">
            {post.summary}
          </p>
        </header>

        {/* Executive Takeaways Box */}
        <div className="my-10 p-6 rounded-2xl border border-[#00c896]/30 bg-[#00c896]/5">
          <h2 className="text-xs uppercase tracking-wider text-[#00c896] font-bold mb-3">
            Key Architecture Takeaways
          </h2>
          <ul className="space-y-2.5">
            {post.keyTakeaways.map((item, idx) => (
              <li key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-neutral-200">
                <CheckCircle2 className="w-4 h-4 text-[#00c896] shrink-0 mt-0.5" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Body Paragraphs */}
        <div className="space-y-6 text-sm sm:text-base text-neutral-300 leading-relaxed border-b border-[#1f1f1f] pb-12">
          {post.content.map((p, idx) => (
            <p key={idx}>{p}</p>
          ))}
        </div>

        {/* Footer CTA */}
        <footer className="pt-10 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div>
            <h3 className="text-base font-bold text-white">Have questions on this protocol?</h3>
            <p className="text-xs text-neutral-400 mt-1">
              Discuss systems design directly with our engineering team.
            </p>
          </div>

          <Link
            href="/#contact"
            className="inline-flex items-center gap-2 bg-[#00c896] hover:bg-[#00b285] text-[#040404] font-bold text-xs sm:text-sm px-5 py-2.5 rounded-xl shadow-md shadow-[#00c896]/20 transition-all shrink-0"
          >
            <span>Start Conversation</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </footer>

      </div>
    </article>
  );
}