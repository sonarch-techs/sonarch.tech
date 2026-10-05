import Link from "next/link";
import { ArrowLeft, Terminal } from "lucide-react";

export const metadata = {
  title: "404 - Node Unreachable | SONARCHTECH",
};

export default function NotFound() {
  return (
    <div className="min-h-[75vh] flex flex-col items-center justify-center px-4 text-center bg-[#040404]">
      {/* Visual Indicator */}
      <div className="w-16 h-16 rounded-2xl border border-[#1f1f1f] bg-[#1f1f1f]/50 flex items-center justify-center text-[#00c896] mb-6">
        <Terminal className="w-8 h-8" />
      </div>

      <span className="text-xs font-mono font-bold tracking-widest text-[#00c896] uppercase bg-[#00c896]/10 px-3 py-1 rounded-full border border-[#00c896]/20 mb-4">
        Error 404 // Route Null
      </span>

      <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white max-w-md">
        Page not found.
      </h1>

      <p className="mt-4 text-sm sm:text-base text-neutral-400 max-w-sm leading-relaxed">
        The requested endpoint has been decommissioned, relocated, or does not exist on the current network mesh.
      </p>

      <div className="mt-8 flex items-center gap-4">
        <Link
          href="/"
          className="inline-flex items-center gap-2 bg-[#00c896] hover:bg-[#00b285] text-[#040404] font-bold text-sm px-6 py-3 rounded-xl shadow-lg shadow-[#00c896]/20 transition-all"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Return to Home</span>
        </Link>
      </div>
    </div>
  );
}