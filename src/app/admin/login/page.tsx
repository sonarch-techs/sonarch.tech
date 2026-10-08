"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ShieldCheck, ArrowRight, Loader2, AlertCircle } from "lucide-react";
import { loginAdminAction } from "@/app/actions/admin-leads";
import Image from "next/image";

export default function AdminLoginPage() {
  const [passcode, setPasscode] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const res = await loginAdminAction(passcode);
    setLoading(false);

    if (res.success) {
      router.push("/admin");
      router.refresh();
    } else {
      setError(res.error || "Access denied.");
    }
  };

  return (
    <div className="min-h-screen bg-[#f8fafc] dark:bg-[#040404] flex items-center justify-center px-4 relative transition-colors duration-200">
      {/* Ambient Radial Bloom */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[550px] h-[350px] bg-[#008763]/[0.05] dark:bg-[#00c896]/5 blur-[150px] rounded-full pointer-events-none -z-10" />

      <div className="w-full max-w-md rounded-2xl border border-neutral-200 dark:border-[#1f1f1f] bg-white/85 dark:bg-[#141414]/70 p-8 backdrop-blur-xl shadow-2xl shadow-neutral-900/5 dark:shadow-black relative transition-colors">
        <div className="flex flex-col items-center text-center mb-8">
          <div className="w-12 h-12 rounded-xl overflow-hidden border border-neutral-200 dark:border-[#1f1f1f] bg-neutral-100 dark:bg-[#1f1f1f]/80 flex items-center justify-center mb-4 shadow-sm dark:shadow-none">
            <Image
              src="/logo-vf.png"
              alt="SONARCHTECH Logo"
              width={40}
              height={40}
              className="object-contain p-1"
            />
          </div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-neutral-200 dark:border-[#1f1f1f] bg-neutral-100 dark:bg-[#1f1f1f] text-[#008763] dark:text-[#00c896] text-xs font-semibold uppercase tracking-wider mb-2 font-mono">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Internal Terminal</span>
          </div>
          <h1 className="text-2xl font-bold text-neutral-900 dark:text-white tracking-tight font-mono">
            Admin Authentication
          </h1>
          <p className="text-xs text-neutral-600 dark:text-neutral-400 mt-1 font-mono">
            Enter executive security key to manage inbound pipeline
          </p>
        </div>

        <form onSubmit={handleLogin} className="space-y-5">
          <div>
            <label className="block text-xs uppercase tracking-wider text-neutral-600 dark:text-neutral-400 font-semibold mb-2 font-mono">
              Passcode
            </label>
            <input
              type="password"
              required
              autoFocus
              placeholder="••••••••••••••••"
              value={passcode}
              onChange={(e) => setPasscode(e.target.value)}
              className="w-full px-4 py-3 rounded-xl bg-neutral-50/80 dark:bg-[#040404] border border-neutral-200 dark:border-[#1f1f1f] text-neutral-900 dark:text-white text-sm placeholder-neutral-400 dark:placeholder-neutral-600 focus:outline-none focus:border-[#008763] dark:focus:border-[#00c896] transition-colors font-mono"
            />
          </div>

          {error && (
            <div className="p-3 rounded-xl border border-red-500/30 bg-red-500/10 text-red-600 dark:text-red-400 text-xs flex items-center gap-2 font-mono">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{error}</span>
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full inline-flex items-center justify-center gap-2 bg-[#008763] hover:bg-[#006f52] dark:bg-[#00c896] dark:hover:bg-[#00b285] disabled:opacity-50 text-white dark:text-[#040404] font-bold py-3.5 rounded-xl shadow-md shadow-[#008763]/20 dark:shadow-lg dark:shadow-[#00c896]/20 transition-all text-sm font-mono cursor-pointer"
          >
            {loading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>Validating Key...</span>
              </>
            ) : (
              <>
                <span>Access Dashboard</span>
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>
        </form>
      </div>
    </div>
  );
}