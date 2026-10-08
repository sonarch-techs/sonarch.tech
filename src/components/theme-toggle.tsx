"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { Sun, Moon } from "lucide-react";

export function ThemeToggle() {
  const { setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div
        suppressHydrationWarning
        className="w-9 h-9 rounded-xl border border-neutral-200 dark:border-[#1f1f1f] bg-white/50 dark:bg-[#1f1f1f]/40"
      />
    );
  }

  const isDark = resolvedTheme === "dark";

  return (
    <button
      onClick={() => setTheme(isDark ? "light" : "dark")}
      aria-label={isDark ? "Switch to light theme" : "Switch to dark theme"}
      title={isDark ? "Switch to light theme" : "Switch to dark theme"}
      className="relative w-9 h-9 rounded-xl border border-neutral-200 dark:border-[#1f1f1f] bg-white/80 hover:bg-neutral-100 dark:bg-[#1f1f1f]/60 dark:hover:bg-[#1f1f1f] hover:border-[#008763]/50 dark:hover:border-[#00c896]/50 flex items-center justify-center transition-all cursor-pointer group shadow-sm dark:shadow-none select-none"
    >
      {isDark ? (
        <Sun className="w-4 h-4 text-neutral-400 group-hover:text-[#00c896] transition-all duration-200 group-hover:rotate-45" />
      ) : (
        <Moon className="w-4 h-4 text-neutral-600 group-hover:text-[#008763] transition-all duration-200 group-hover:-rotate-12" />
      )}
    </button>
  );
}