export default function CaseStudyDetailLoading() {
  return (
    <div className="relative min-h-screen bg-transparent pt-20 sm:pt-28 pb-24 px-4 sm:px-6 lg:px-8 overflow-hidden">
      {/* Background Ambient Glow */}
      <div className="absolute top-12 left-1/2 -translate-x-1/2 w-[700px] h-[350px] bg-[#008763]/[0.03] dark:bg-[#00c896]/5 blur-[150px] pointer-events-none -z-10" />

      <div className="relative z-10 max-w-4xl mx-auto space-y-8 animate-pulse">
        {/* Breadcrumb Skeleton */}
        <div className="w-40 h-4 rounded-md bg-neutral-200 dark:bg-neutral-800 mb-8" />

        {/* Category & Client Tag Skeleton */}
        <div className="flex items-center gap-3">
          <div className="w-28 h-6 rounded-md bg-neutral-200 dark:bg-neutral-800" />
          <div className="w-24 h-4 rounded-md bg-neutral-200/80 dark:bg-neutral-800/80" />
        </div>

        {/* Title Skeleton */}
        <div className="space-y-3">
          <div className="w-full h-10 sm:h-14 rounded-xl bg-neutral-200 dark:bg-neutral-800" />
          <div className="w-3/4 h-10 sm:h-14 rounded-xl bg-neutral-200 dark:bg-neutral-800" />
        </div>

        {/* Summary Description Skeleton */}
        <div className="space-y-2.5 pt-2">
          <div className="w-full h-4 rounded bg-neutral-200/80 dark:bg-neutral-800/80" />
          <div className="w-full h-4 rounded bg-neutral-200/80 dark:bg-neutral-800/80" />
          <div className="w-4/5 h-4 rounded bg-neutral-200/80 dark:bg-neutral-800/80" />
        </div>

        {/* Quantified Metric Card Skeleton */}
        <div className="p-6 rounded-2xl border border-neutral-200 dark:border-[#1f1f1f] bg-white/70 dark:bg-[#1f1f1f]/40 max-w-sm flex items-center justify-between">
          <div className="space-y-2">
            <div className="w-28 h-3 rounded bg-neutral-200 dark:bg-neutral-800" />
            <div className="w-20 h-7 rounded-md bg-neutral-200 dark:bg-neutral-800" />
          </div>
          <div className="w-8 h-8 rounded-full bg-neutral-200 dark:bg-neutral-800" />
        </div>

        {/* Tech Stack Skeleton */}
        <div className="p-6 sm:p-8 rounded-2xl border border-neutral-200 dark:border-[#1f1f1f] bg-white/70 dark:bg-[#1f1f1f]/30 space-y-4">
          <div className="w-48 h-4 rounded bg-neutral-200 dark:bg-neutral-800" />
          <div className="flex flex-wrap gap-2 pt-1">
            {[1, 2, 3, 4, 5, 6].map((k) => (
              <div key={k} className="w-24 h-7 rounded-lg bg-neutral-200/80 dark:bg-neutral-800/80" />
            ))}
          </div>
        </div>

        {/* Callout Skeleton */}
        <div className="p-8 rounded-2xl border border-neutral-200 dark:border-[#1f1f1f] bg-white/60 dark:bg-[#141414]/50 flex flex-col sm:flex-row sm:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="w-44 h-6 rounded-md bg-neutral-200 dark:bg-neutral-800" />
            <div className="w-64 h-3.5 rounded bg-neutral-200/70 dark:bg-neutral-800/70" />
          </div>
          <div className="w-36 h-11 rounded-xl bg-neutral-200 dark:bg-neutral-800 shrink-0" />
        </div>
      </div>
    </div>
  );
}