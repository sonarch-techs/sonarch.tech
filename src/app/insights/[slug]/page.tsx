import { notFound } from "next/navigation";
import Link from "next/link";
import {
  ArrowLeft,
  ArrowUpRight,
  Clock,
  Calendar,
  Sparkles,
  CheckCircle2,
  BookOpen,
} from "lucide-react";
import { INSIGHTS_DATA, getInsight } from "@/data/insights";

type PageParams = Promise<{ slug: string }>;

export async function generateStaticParams() {
  return INSIGHTS_DATA.map((article) => ({
    slug: article.slug,
  }));
}

export async function generateMetadata({ params }: { params: PageParams }) {
  const { slug } = await params;
  const article = getInsight(slug);

  if (!article) {
    return { title: "Insight Not Found | SONARCHTECH" };
  }

  return {
    title: `${article.title} | SONARCHTECH Publications`,
    description: article.summary,
    openGraph: {
      title: article.title,
      description: article.summary,
      type: "article",
      publishedTime: article.publishedDate,
    },
  };
}

export default async function InsightDetailPage({
  params,
}: {
  params: PageParams;
}) {
  const { slug } = await params;
  const article = getInsight(slug);

  if (!article) {
    notFound();
  }

  // Schema.org TechArticle JSON-LD for AI search engines & crawlers
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "TechArticle",
    headline: article.title,
    description: article.summary,
    datePublished: article.publishedDate,
    author: {
      "@type": "Organization",
      name: "SONARCHTECH",
      url: "https://sonarch.tech",
    },
    publisher: {
      "@type": "Organization",
      name: "SONARCHTECH",
      logo: {
        "@type": "ImageObject",
        url: "https://sonarch.tech/logo-vf.png",
      },
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <main className="relative min-h-screen bg-transparent text-neutral-900 dark:text-white pt-20 sm:pt-24 pb-20 px-4 sm:px-6 lg:px-8 overflow-hidden transition-colors duration-200">
        {/* Ambient Backlight */}
        <div className="absolute top-12 left-1/2 -translate-x-1/2 w-[700px] h-[350px] bg-[#008763]/[0.05] dark:bg-[#00c896]/10 blur-[150px] pointer-events-none z-0" />

        <div className="relative z-10 max-w-4xl mx-auto">
          {/* Navigation Breadcrumb */}
          <Link
            href="/insights"
            className="inline-flex items-center gap-2 text-xs font-mono text-neutral-600 dark:text-neutral-400 hover:text-[#008763] dark:hover:text-[#00c896] transition-colors mb-4 group"
          >
            <ArrowLeft className="w-3.5 h-3.5 group-hover:-translate-x-1 transition-transform" />
            <span>Return to Publications</span>
          </Link>

          {/* Header Strip */}
          <div className="rounded-2xl border border-neutral-200 dark:border-[#1f1f1f] bg-white/80 dark:bg-[#141414]/70 backdrop-blur-md p-6 sm:p-10 mb-8 sm:mb-10 shadow-sm dark:shadow-none">
            <div className="flex flex-wrap items-center gap-4 mb-4 text-xs font-mono text-neutral-600 dark:text-neutral-400">
              <span className="uppercase tracking-wider text-[#008763] dark:text-[#00c896] bg-[#008763]/10 dark:bg-[#00c896]/10 px-3 py-1 rounded-md border border-[#008763]/25 dark:border-[#00c896]/30 font-semibold">
                {article.category}
              </span>
              <span className="flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5 text-neutral-400 dark:text-neutral-500" />
                <span>{article.readTime}</span>
              </span>
              <span className="flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5 text-neutral-400 dark:text-neutral-500" />
                <span suppressHydrationWarning>{article.publishedDate}</span>
              </span>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-neutral-900 dark:text-white leading-tight">
              {article.title}
            </h1>

            <p className="mt-4 text-base sm:text-lg text-neutral-700 dark:text-neutral-300 leading-relaxed font-mono">
              {article.summary}
            </p>

            {/* Metrics Telemetry Grid */}
            <div className="mt-8 pt-6 border-t border-neutral-200 dark:border-[#1f1f1f] grid grid-cols-1 sm:grid-cols-3 gap-4">
              {article.metrics.map((m, i) => (
                <div key={i} className="border-l-2 border-[#008763] dark:border-[#00c896] pl-4">
                  <div className="text-2xl font-bold font-mono text-neutral-900 dark:text-white">
                    {m.value}
                  </div>
                  <div className="text-xs font-mono text-neutral-500 dark:text-neutral-400 mt-1">
                    {m.label}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Key Architectural Takeaways Box */}
          <div className="p-6 rounded-2xl border border-[#008763]/25 dark:border-[#00c896]/30 bg-[#008763]/5 dark:bg-[#00c896]/5 backdrop-blur-md mb-10 shadow-sm dark:shadow-none">
            <h2 className="text-xs font-mono uppercase tracking-wider text-[#008763] dark:text-[#00c896] font-bold mb-3 flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-[#008763] dark:text-[#00c896]" />
              <span>Key Architectural Takeaways</span>
            </h2>
            <div className="space-y-2.5">
              {article.keyTakeaways.map((item, idx) => (
                <div key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-neutral-800 dark:text-neutral-300 font-mono">
                  <CheckCircle2 className="w-4 h-4 text-[#008763] dark:text-[#00c896] shrink-0 mt-0.5" />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Article Body Sections */}
          <article className="space-y-10">
            {article.sections.map((sec, idx) => (
              <section
                key={idx}
                className="p-6 sm:p-8 rounded-2xl border border-neutral-200 dark:border-[#1f1f1f] bg-white/80 dark:bg-[#141414]/70 backdrop-blur-md space-y-4 shadow-sm dark:shadow-none"
              >
                <h2 className="text-xl sm:text-2xl font-bold text-neutral-900 dark:text-white font-mono flex items-center gap-2.5">
                  <span className="text-[#008763] dark:text-[#00c896]">0{idx + 1}.</span>
                  <span>{sec.heading}</span>
                </h2>

                <p className="text-sm sm:text-base text-neutral-700 dark:text-neutral-300 leading-relaxed">
                  {sec.body}
                </p>

                {sec.codeSnippet && (
                  <div className="mt-4 rounded-xl border border-neutral-800 dark:border-[#1f1f1f] bg-neutral-950 dark:bg-[#040404] p-4 overflow-x-auto font-mono text-xs text-[#00c896] shadow-inner">
                    <pre>{sec.codeSnippet}</pre>
                  </div>
                )}
              </section>
            ))}
          </article>

          {/* Bottom Action Card */}
          <div className="mt-12 p-8 rounded-2xl border border-[#008763]/25 dark:border-[#00c896]/30 bg-[#008763]/5 dark:bg-[#00c896]/5 backdrop-blur-md flex flex-col sm:flex-row sm:items-center justify-between gap-6 shadow-sm dark:shadow-none">
            <div>
              <div className="flex items-center gap-2 text-xs font-mono text-[#008763] dark:text-[#00c896] font-bold mb-1">
                <BookOpen className="w-4 h-4" />
                <span>Production Implementation</span>
              </div>
              <h3 className="text-lg font-bold text-neutral-900 dark:text-white font-mono">
                Deploy This Architecture
              </h3>
              <p className="text-xs text-neutral-600 dark:text-neutral-400 mt-1 max-w-md">
                Ready to configure sub-second telemetry or semantic AEO knowledge graphs for your stack?
              </p>
            </div>

            <Link
              href="/#contact"
              className="inline-flex items-center justify-center gap-2 bg-[#008763] hover:bg-[#006f52] dark:bg-[#00c896] dark:hover:bg-[#00b285] text-white dark:text-[#040404] font-bold text-xs px-6 py-3.5 rounded-xl transition-all font-mono shrink-0 shadow-md shadow-[#008763]/20 dark:shadow-lg dark:shadow-[#00c896]/20"
            >
              <span>Initiate Scoping</span>
              <ArrowUpRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </main>
    </>
  );
}