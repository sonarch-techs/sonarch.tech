"use client";

import { useEffect } from "react";
import { AlertTriangle, RotateCcw } from "lucide-react";

export default function ErrorBoundary({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("[Runtime Edge Exception]:", error);
  }, [error]);

  return (
    <div className="relative min-h-[75vh] flex flex-col items-center justify-center px-4 text-center bg-transparent text-neutral-900 dark:text-white overflow-hidden transition-colors duration-200">
      {/* Ambient Diagnostic Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[300px] bg-red-500/[0.04] dark:bg-red-500/5 blur-[140px] rounded-full pointer-events-none -z-10" />

      {/* Warning Icon Badge */}
      <div className="w-14 h-14 rounded-2xl border border-red-500/20 dark:border-red-500/30 bg-red-500/10 flex items-center justify-center text-red-600 dark:text-red-400 mb-6 shadow-sm dark:shadow-none">
        <AlertTriangle className="w-7 h-7" />
      </div>

      {/* Telemetry Status Pill */}
      <span className="text-xs font-mono font-bold tracking-widest text-red-600 dark:text-red-400 uppercase bg-red-500/10 px-3.5 py-1 rounded-full border border-red-500/20 mb-3.5">
        Runtime Execution Exception
      </span>

      {/* Fault Header */}
      <h2 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-neutral-900 dark:text-white max-w-md font-mono leading-tight">
        System encountered a state fault.
      </h2>

      {/* Subtext & Digest Trace */}
      <p className="mt-3 text-xs sm:text-sm text-neutral-600 dark:text-neutral-400 max-w-sm leading-relaxed font-mono">
        A transient edge handler conflict occurred. The system has logged the trace to security observation.
      </p>

      {error.digest && (
        <div className="mt-2 text-[10px] font-mono text-neutral-400 dark:text-neutral-500">
          Digest: <span>{error.digest}</span>
        </div>
      )}

      {/* Pipeline Re-execution Button */}
      <div className="mt-8">
        <button
          onClick={() => reset()}
          className="inline-flex items-center gap-2 bg-white hover:bg-neutral-100 dark:bg-[#1f1f1f] dark:hover:bg-[#262626] text-neutral-900 dark:text-white border border-neutral-200 dark:border-[#1f1f1f] hover:border-[#008763]/50 dark:hover:border-[#00c896]/40 font-semibold text-xs sm:text-sm px-5 py-2.5 rounded-xl transition-all cursor-pointer font-mono shadow-sm dark:shadow-none"
        >
          <RotateCcw className="w-4 h-4 text-[#008763] dark:text-[#00c896]" />
          <span>Re-execute Component Pipeline</span>
        </button>
      </div>
    </div>
  );
}