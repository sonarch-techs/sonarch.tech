export default function ServicesLoading() {
  return (
    <main className="relative min-h-screen bg-transparent pt-20 sm:pt-24 pb-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
      {/* Background Ambient Glow */}
      <div className="absolute top-12 left-1/2 -translate-x-1/2 w-[700px] h-[350px] bg-[#008763]/[0.03] dark:bg-[#00c896]/5 blur-[160px] pointer-events-none -z-10" />

      <div className="relative z-10 max-w-6xl mx-auto space-y-8 animate-pulse">
        {/* Breadcrumb Skeleton */}
        <div className="w-48 h-4 rounded-md bg-neutral-200 dark:bg-neutral-800" />

        {/* Header Strip Skeleton */}
        <div className="rounded-2xl border border-neutral-200 dark:border-[#1f1f1f] bg-white/70 dark:bg-[#141414]/60 p-6 sm:p-8 space-y-4">
          <div className="w-44 h-6 rounded-full bg-neutral-200 dark:bg-neutral-800" />
          <div className="w-3/4 sm:w-1/2 h-10 sm:h-14 rounded-xl bg-neutral-200 dark:bg-neutral-800" />
          <div className="w-full sm:w-2/3 h-4 rounded-md bg-neutral-200/80 dark:bg-neutral-800/80" />
        </div>

        {/* Asymmetric 6-Card Bento Grid Skeleton */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Card 1: Wide 2-col */}
          <div className="lg:col-span-2 rounded-2xl border border-neutral-200 dark:border-[#1f1f1f] bg-white/70 dark:bg-[#141414]/60 p-6 sm:p-8 flex flex-col justify-between h-[360px]">
            <div className="space-y-4">
              <div className="w-32 h-6 rounded-md bg-neutral-200 dark:bg-neutral-800" />
              <div className="w-2/3 h-8 rounded-lg bg-neutral-200 dark:bg-neutral-800" />
              <div className="w-full h-4 rounded bg-neutral-200/70 dark:bg-neutral-800/70" />
              <div className="w-4/5 h-4 rounded bg-neutral-200/70 dark:bg-neutral-800/70" />
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-3">
                {[1, 2, 3].map((k) => (
                  <div key={k} className="h-10 rounded-xl bg-neutral-200/60 dark:bg-neutral-800/60" />
                ))}
              </div>
            </div>
            <div className="pt-6 border-t border-neutral-200/80 dark:border-[#1f1f1f] flex items-center justify-between">
              <div className="w-28 h-4 rounded bg-neutral-200 dark:bg-neutral-800" />
              <div className="w-8 h-8 rounded-full bg-neutral-200 dark:bg-neutral-800" />
            </div>
          </div>

          {/* Card 2: 1-col */}
          <div className="lg:col-span-1 rounded-2xl border border-neutral-200 dark:border-[#1f1f1f] bg-white/70 dark:bg-[#141414]/60 p-6 sm:p-8 flex flex-col justify-between h-[360px]">
            <div className="space-y-4">
              <div className="w-28 h-6 rounded-md bg-neutral-200 dark:bg-neutral-800" />
              <div className="w-3/4 h-8 rounded-lg bg-neutral-200 dark:bg-neutral-800" />
              <div className="w-full h-4 rounded bg-neutral-200/70 dark:bg-neutral-800/70" />
              <div className="h-16 rounded-xl bg-neutral-200/50 dark:bg-neutral-800/50 mt-2" />
            </div>
            <div className="pt-6 border-t border-neutral-200/80 dark:border-[#1f1f1f] flex items-center justify-between">
              <div className="w-24 h-4 rounded bg-neutral-200 dark:bg-neutral-800" />
              <div className="w-8 h-8 rounded-full bg-neutral-200 dark:bg-neutral-800" />
            </div>
          </div>

          {/* Card 3: 1-col */}
          <div className="lg:col-span-1 rounded-2xl border border-neutral-200 dark:border-[#1f1f1f] bg-white/70 dark:bg-[#141414]/60 p-6 sm:p-8 flex flex-col justify-between h-[360px]">
            <div className="space-y-4">
              <div className="w-24 h-6 rounded-md bg-neutral-200 dark:bg-neutral-800" />
              <div className="w-4/5 h-8 rounded-lg bg-neutral-200 dark:bg-neutral-800" />
              <div className="w-full h-4 rounded bg-neutral-200/70 dark:bg-neutral-800/70" />
              <div className="h-14 rounded-xl bg-neutral-200/50 dark:bg-neutral-800/50 mt-2" />
            </div>
            <div className="pt-6 border-t border-neutral-200/80 dark:border-[#1f1f1f] flex items-center justify-between">
              <div className="w-24 h-4 rounded bg-neutral-200 dark:bg-neutral-800" />
              <div className="w-8 h-8 rounded-full bg-neutral-200 dark:bg-neutral-800" />
            </div>
          </div>

          {/* Card 4: Wide 2-col */}
          <div className="lg:col-span-2 rounded-2xl border border-neutral-200 dark:border-[#1f1f1f] bg-white/70 dark:bg-[#141414]/60 p-6 sm:p-8 flex flex-col justify-between h-[360px]">
            <div className="space-y-4">
              <div className="w-32 h-6 rounded-md bg-neutral-200 dark:bg-neutral-800" />
              <div className="w-2/3 h-8 rounded-lg bg-neutral-200 dark:bg-neutral-800" />
              <div className="w-full h-4 rounded bg-neutral-200/70 dark:bg-neutral-800/70" />
              <div className="flex gap-2 pt-2">
                <div className="w-36 h-8 rounded-lg bg-neutral-200/60 dark:bg-neutral-800/60" />
                <div className="w-44 h-8 rounded-lg bg-neutral-200/60 dark:bg-neutral-800/60" />
              </div>
            </div>
            <div className="pt-6 border-t border-neutral-200/80 dark:border-[#1f1f1f] flex items-center justify-between">
              <div className="w-28 h-4 rounded bg-neutral-200 dark:bg-neutral-800" />
              <div className="w-8 h-8 rounded-full bg-neutral-200 dark:bg-neutral-800" />
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}