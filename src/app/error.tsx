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
    <div className="min-h-[70vh] flex flex-col items-center justify-center px-4 text-center bg-[#040404]">
      <div className="w-14 h-14 rounded-2xl border border-red-500/30 bg-red-500/10 flex items-center justify-center text-red-400 mb-6">
        <AlertTriangle className="w-7 h-7" />
      </div>

      <span className="text-xs font-mono font-bold tracking-widest text-red-400 uppercase bg-red-500/10 px-3 py-1 rounded-full border border-red-500/20 mb-3">
        Runtime Execution Exception
      </span>

      <h2 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-white max-w-md">
        System encountered a state fault.
      </h2>

      <p className="mt-3 text-xs sm:text-sm text-neutral-400 max-w-sm leading-relaxed">
        A transient edge handler conflict occurred. The system has logged the trace to security observation.
      </p>

      <div className="mt-8">
        <button
          onClick={() => reset()}
          className="inline-flex items-center gap-2 bg-[#1f1f1f] hover:bg-neutral-800 text-white border border-[#1f1f1f] hover:border-[#00c896]/40 font-semibold text-xs sm:text-sm px-5 py-2.5 rounded-xl transition-all cursor-pointer"
        >
          <RotateCcw className="w-4 h-4 text-[#00c896]" />
          <span>Re-execute Component Pipeline</span>
        </button>
      </div>
    </div>
  );
}