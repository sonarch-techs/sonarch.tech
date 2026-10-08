export function BackgroundGlow() {
  return (
    <div
      aria-hidden="true"
      className="absolute inset-0 -z-10 overflow-hidden pointer-events-none select-none transition-colors duration-300"
    >
      {/* 1. Primary Ambient Bloom (Emerald in light mode, Mint in dark mode) */}
      <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-[700px] h-[350px] bg-[#008763]/[0.07] dark:bg-[#00c896]/15 blur-[140px] rounded-full pointer-events-none" />

      {/* 2. Secondary Surface Warmth (Subtle architectural slate in light mode, dark warmth in dark mode) */}
      <div className="absolute top-72 right-12 w-[350px] h-[350px] bg-slate-200/50 dark:bg-[#1f1f1f] blur-[110px] rounded-full opacity-60 pointer-events-none" />

      {/* 3A. Grid Texture (Light Mode: Architectural Blueprint Slate) */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(15,23,42,0.04)_1px,transparent_1px),linear-gradient(to_bottom,rgba(15,23,42,0.04)_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] dark:hidden pointer-events-none" />

      {/* 3B. Grid Texture (Dark Mode: Deep Obsidian Grid Lines) */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#1f1f1f25_1px,transparent_1px),linear-gradient(to_bottom,#1f1f1f25_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] hidden dark:block pointer-events-none" />
    </div>
  );
}