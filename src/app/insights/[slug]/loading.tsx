export default function InsightDetailLoading() {
  return (
    <main className="relative min-h-screen bg-transparent pt-20 sm:pt-24 pb-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
      {/* Background Ambient Glow */}
      <div className="absolute top-12 left-1/2 -translate-x-1/2 w-[700px] h-[350px] bg-[#008763]/[0.03] dark:bg-[#00c896]/5 blur-[150px] pointer-events-none -z-10" />

      <div className="relative z-10 max-w-4xl mx-auto space-y-8 animate-pulse">
        {/* Breadcrumb Skeleton */}
        <div className="w-44 h-4 rounded-md bg-neutral-200 dark:bg-neutral-800" />

        {/* Hero Header Skeleton */}
        <div className="rounded-2xl border border-neutral-200 dark:border-[#1f1f1f] bg-white/70 dark:bg-[#141414]/60 p-6 sm:p-10 space-y-5">
          <div className="flex items-center gap-3">
            <div className="w-24 h-6 rounded-md bg-neutral-200 dark:bg-neutral-800" />
            <div className="w-20 h-4 rounded-md bg-neutral-200/70 dark:bg-neutral-800/70" />
            <div className="w-24 h-4 rounded-md bg-neutral-200/70 dark:bg-neutral-800/70" />
          </div>

          <div className="space-y-3">
            <div className="w-full h-10 sm:h-12 rounded-xl bg-neutral-200 dark:bg-neutral-800" />
            <div className="w-3/4 h-10 sm:h-12 rounded-xl bg-neutral-200 dark:bg-neutral-800" />
          </div>

          <div className="w-full h-4 rounded-md bg-neutral-200/80 dark:bg-neutral-800/80" />
          <div className="w-5/6 h-4 rounded-md bg-neutral-200/80 dark:bg-neutral-800/80" />

          {/* Metrics Telemetry Skeleton */}
          <div className="mt-8 pt-6 border-t border-neutral-200/80 dark:border-[#1f1f1f] grid grid-cols-1 sm:grid-cols-3 gap-4">
            {[1, 2, 3].map((m) => (
              <div key={m} className="border-l-2 border-neutral-300 dark:border-neutral-700 pl-4 space-y-2">
                <div className="w-20 h-7 rounded-md bg-neutral-200 dark:bg-neutral-800" />
                <div className="w-24 h-3.5 rounded-md bg-neutral-200/70 dark:bg-neutral-800/70" />
              </div>
            ))}
          </div>
        </div>

        {/* Architectural Takeaways Skeleton */}
        <div className="p-6 rounded-2xl border border-neutral-200 dark:border-[#1f1f1f] bg-white/60 dark:bg-[#141414]/50 space-y-3">
          <div className="w-48 h-4 rounded-md bg-neutral-200 dark:bg-neutral-800 mb-4" />
          {[1, 2, 3].map((item) => (
            <div key={item} className="flex items-center gap-3">
              <div className="w-4 h-4 rounded-full bg-neutral-200 dark:bg-neutral-800 shrink-0" />
              <div className="w-full h-4 rounded-md bg-neutral-200/80 dark:bg-neutral-800/80" />
            </div>
          ))}
        </div>

        {/* Section Blocks Skeleton */}
        <div className="space-y-8">
          {[1, 2].map((s) => (
            <div
              key={s}
              className="p-6 sm:p-8 rounded-2xl border border-neutral-200 dark:border-[#1f1f1f] bg-white/70 dark:bg-[#141414]/60 space-y-4"
            >
              <div className="w-1/2 h-7 rounded-lg bg-neutral-200 dark:bg-neutral-800" />
              <div className="space-y-2 pt-2">
                <div className="w-full h-3.5 rounded bg-neutral-200/70 dark:bg-neutral-800/70" />
                <div className="w-full h-3.5 rounded bg-neutral-200/70 dark:bg-neutral-800/70" />
                <div className="w-4/5 h-3.5 rounded bg-neutral-200/70 dark:bg-neutral-800/70" />
              </div>
              <div className="w-full h-28 rounded-xl bg-neutral-900/10 dark:bg-neutral-950/80 border border-neutral-200 dark:border-neutral-900" />
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}