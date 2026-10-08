export default function WorkLoading() {
  return (
    <main className="relative min-h-screen bg-transparent pt-20 sm:pt-24 pb-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
      {/* Background Ambient Glow */}
      <div className="absolute top-12 left-1/2 -translate-x-1/2 w-[700px] h-[350px] bg-[#008763]/[0.03] dark:bg-[#00c896]/5 blur-[150px] pointer-events-none -z-10" />

      <div className="relative z-10 max-w-6xl mx-auto space-y-8 animate-pulse">
        {/* Breadcrumb Skeleton */}
        <div className="w-40 h-4 rounded-md bg-neutral-200 dark:bg-neutral-800" />

        {/* Header Strip Skeleton */}
        <div className="rounded-2xl border border-neutral-200 dark:border-[#1f1f1f] bg-white/70 dark:bg-[#141414]/60 p-6 sm:p-8 space-y-4">
          <div className="w-52 h-6 rounded-full bg-neutral-200 dark:bg-neutral-800" />
          <div className="w-3/4 sm:w-1/2 h-10 sm:h-14 rounded-xl bg-neutral-200 dark:bg-neutral-800" />
          <div className="w-full sm:w-2/3 h-4 rounded-md bg-neutral-200/80 dark:bg-neutral-800/80" />
        </div>

        {/* 3-Column Card Skeletons */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div
              key={i}
              className="rounded-2xl border border-neutral-200 dark:border-[#1f1f1f] bg-white/70 dark:bg-[#141414]/60 p-6 sm:p-8 flex flex-col justify-between h-[390px]"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="w-24 h-5 rounded-md bg-neutral-200 dark:bg-neutral-800" />
                  <div className="w-20 h-4 rounded-md bg-neutral-200/80 dark:bg-neutral-800/80" />
                </div>
                <div className="w-full h-7 rounded-lg bg-neutral-200 dark:bg-neutral-800" />
                <div className="w-3/4 h-7 rounded-lg bg-neutral-200 dark:bg-neutral-800" />
                <div className="space-y-2 pt-1">
                  <div className="w-full h-3.5 rounded bg-neutral-200/70 dark:bg-neutral-800/70" />
                  <div className="w-4/5 h-3.5 rounded bg-neutral-200/70 dark:bg-neutral-800/70" />
                </div>

                {/* Metric Box Skeleton */}
                <div className="p-4 rounded-xl border border-neutral-200/80 dark:border-[#1f1f1f] bg-neutral-100/60 dark:bg-[#040404]/60 flex items-center justify-between">
                  <div className="space-y-1.5">
                    <div className="w-24 h-3 rounded bg-neutral-200 dark:bg-neutral-800" />
                    <div className="w-16 h-6 rounded bg-neutral-200 dark:bg-neutral-800" />
                  </div>
                  <div className="w-9 h-9 rounded-lg bg-neutral-200 dark:bg-neutral-800" />
                </div>
              </div>

              {/* Card Footer Skeleton */}
              <div className="pt-6 border-t border-neutral-200/80 dark:border-[#1f1f1f] flex items-center justify-between">
                <div className="w-28 h-4 rounded-md bg-neutral-200 dark:bg-neutral-800" />
                <div className="w-8 h-8 rounded-full bg-neutral-200 dark:bg-neutral-800" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}