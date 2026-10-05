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
    <div className="min-h-screen bg-[#040404] flex items-center justify-center px-4 relative">
      <div className="w-full max-w-md rounded-2xl border border-[#1f1f1f] bg-[#1f1f1f]/35 p-8 backdrop-blur-xl shadow-2xl relative">
        <div className="flex flex-col items-center text-center mb-8">
          <div className="w-12 h-12 rounded-xl overflow-hidden border border-[#1f1f1f] bg-[#1f1f1f]/80 flex items-center justify-center mb-4">
            <Image
              src="/logo-vf.png"
              alt="SONARCHTECH Logo"
              width={40}
              height={40}
              className="object-contain p-1"
            />
          </div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-[#1f1f1f] bg-[#1f1f1f] text-[#00c896] text-xs font-semibold uppercase tracking-wider mb-2">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Internal Terminal</span>
          </div>
          <h1 className="text-2xl font-bold text-white tracking-tight">Admin Authentication</h1>
          <p className="text-xs text-neutral-400 mt-1">Enter executive security key to manage inbound pipeline</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-5">
          <div>
            <label className="block text-xs uppercase tracking-wider text-neutral-400 font-semibold mb-2">
              Passcode
            </label>
            <input
              type="password"
              required
              autoFocus
              placeholder="••••••••••••••••"
              value={passcode}
              onChange={(e) => setPasscode(e.target.value)}
              className="w-full px-4 py-3 rounded-xl bg-[#040404] border border-[#1f1f1f] text-white text-sm placeholder-neutral-600 focus:outline-none focus:border-[#00c896] transition-colors"
            />
          </div>

          {error && (
            <div className="p-3 rounded-xl border border-red-500/30 bg-red-500/10 text-red-400 text-xs flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{error}</span>
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full inline-flex items-center justify-center gap-2 bg-[#00c896] hover:bg-[#00b285] disabled:opacity-50 text-[#040404] font-bold py-3.5 rounded-xl shadow-lg shadow-[#00c896]/20 transition-all text-sm cursor-pointer"
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