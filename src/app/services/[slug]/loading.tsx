export default function ServiceDetailLoading() {
  return (
    <main className="relative min-h-screen bg-transparent pt-20 sm:pt-24 pb-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
      {/* Background Ambient Glow */}
      <div className="absolute top-12 left-1/2 -translate-x-1/2 w-[700px] h-[350px] bg-[#008763]/[0.03] dark:bg-[#00c896]/5 blur-[150px] pointer-events-none -z-10" />

      <div className="relative z-10 max-w-5xl mx-auto space-y-8 animate-pulse">
        {/* Breadcrumb Skeleton */}
        <div className="w-48 h-4 rounded-md bg-neutral-200 dark:bg-neutral-800" />

        {/* Header Hero Strip Skeleton */}
        <div className="rounded-2xl border border-neutral-200 dark:border-[#1f1f1f] bg-white/70 dark:bg-[#141414]/60 p-6 sm:p-10 space-y-4">
          <div className="flex items-center gap-3">
            <div className="w-28 h-6 rounded-md bg-neutral-200 dark:bg-neutral-800" />
            <div className="w-44 h-4 rounded bg-neutral-200/70 dark:bg-neutral-800/70" />
          </div>
          <div className="w-3/4 sm:w-1/2 h-10 sm:h-12 rounded-xl bg-neutral-200 dark:bg-neutral-800" />
          <div className="w-full sm:w-2/3 h-6 rounded-md bg-neutral-200/80 dark:bg-neutral-800/80" />
          <div className="w-full h-4 rounded bg-neutral-200/70 dark:bg-neutral-800/70" />

          {/* Metrics Strip Skeleton */}
          <div className="mt-8 pt-6 border-t border-neutral-200/80 dark:border-[#1f1f1f] grid grid-cols-1 sm:grid-cols-3 gap-4">
            {[1, 2, 3].map((m) => (
              <div key={m} className="border-l-2 border-neutral-300 dark:border-neutral-700 pl-4 space-y-2">
                <div className="w-24 h-8 rounded-md bg-neutral-200 dark:bg-neutral-800" />
                <div className="w-28 h-3.5 rounded bg-neutral-200/70 dark:bg-neutral-800/70" />
              </div>
            ))}
          </div>
        </div>

        {/* 2-Column Specifications & Timeline Skeleton */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Main Column */}
          <div className="lg:col-span-8 space-y-8">
            {/* Architecture Highlights Skeleton */}
            <div className="rounded-2xl border border-neutral-200 dark:border-[#1f1f1f] bg-white/70 dark:bg-[#141414]/60 p-6 sm:p-8 space-y-4">
              <div className="w-56 h-6 rounded-md bg-neutral-200 dark:bg-neutral-800 mb-6" />
              {[1, 2, 3].map((s) => (
                <div key={s} className="p-4 rounded-xl border border-neutral-200/80 dark:border-neutral-800/80 space-y-2">
                  <div className="w-40 h-4 rounded bg-neutral-200 dark:bg-neutral-800" />
                  <div className="w-full h-3.5 rounded bg-neutral-200/70 dark:bg-neutral-800/70" />
                </div>
              ))}
            </div>

            {/* Standard Deliverables Skeleton */}
            <div className="rounded-2xl border border-neutral-200 dark:border-[#1f1f1f] bg-white/70 dark:bg-[#141414]/60 p-6 sm:p-8 space-y-4">
              <div className="w-48 h-6 rounded-md bg-neutral-200 dark:bg-neutral-800 mb-6" />
              {[1, 2, 3].map((d) => (
                <div key={d} className="h-12 rounded-xl bg-neutral-200/50 dark:bg-neutral-800/50" />
              ))}
            </div>

            {/* Execution Timeline Skeleton */}
            <div className="rounded-2xl border border-neutral-200 dark:border-[#1f1f1f] bg-white/70 dark:bg-[#141414]/60 p-6 sm:p-8 space-y-4">
              <div className="w-44 h-6 rounded-md bg-neutral-200 dark:bg-neutral-800 mb-6" />
              {[1, 2, 3].map((t) => (
                <div key={t} className="h-14 rounded-xl bg-neutral-200/50 dark:bg-neutral-800/50" />
              ))}
            </div>
          </div>

          {/* Right Sidebar */}
          <div className="lg:col-span-4 space-y-6">
            {/* Tech Stack Skeleton */}
            <div className="p-6 rounded-2xl border border-neutral-200 dark:border-[#1f1f1f] bg-white/70 dark:bg-[#141414]/60 space-y-4">
              <div className="w-44 h-4 rounded bg-neutral-200 dark:bg-neutral-800" />
              <div className="flex flex-wrap gap-2">
                {[1, 2, 3, 4, 5].map((st) => (
                  <div key={st} className="w-20 h-7 rounded-lg bg-neutral-200/60 dark:bg-neutral-800/60" />
                ))}
              </div>
            </div>

            {/* Direct Intake Card Skeleton */}
            <div className="p-6 rounded-2xl border border-neutral-200 dark:border-[#1f1f1f] bg-white/60 dark:bg-[#141414]/50 space-y-3">
              <div className="w-36 h-5 rounded bg-neutral-200 dark:bg-neutral-800" />
              <div className="w-full h-3.5 rounded bg-neutral-200/70 dark:bg-neutral-800/70" />
              <div className="w-4/5 h-3.5 rounded bg-neutral-200/70 dark:bg-neutral-800/70" />
              <div className="w-full h-11 rounded-xl bg-neutral-200 dark:bg-neutral-800 mt-4" />
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}