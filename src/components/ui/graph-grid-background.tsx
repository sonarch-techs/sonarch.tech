"use client";

export function GraphGridBackground() {
  return (
    <div
      aria-hidden="true"
      className="absolute inset-0 pointer-events-none select-none overflow-hidden z-0 transition-colors duration-300"
    >
      {/* 0. Base Solid Background Layer */}
      <div className="absolute inset-0 bg-[#f8fafc] dark:bg-[#040404] transition-colors duration-300" />

      {/* 1. High-Contrast CSS Graph Grid */}
      {/* 1A. Light Mode Grid: Slate + Technical Emerald */}
      <div
        className="absolute inset-0 w-full h-full opacity-70 dark:hidden"
        style={{
          backgroundImage: `
            linear-gradient(to right, rgba(15, 23, 42, 0.05) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(15, 23, 42, 0.05) 1px, transparent 1px),
            linear-gradient(to right, rgba(0, 135, 99, 0.12) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(0, 135, 99, 0.12) 1px, transparent 1px)
          `,
          backgroundSize: "24px 24px, 24px 24px, 120px 120px, 120px 120px",
        }}
      />

      {/* 1B. Dark Mode Grid: Ghost White + Electric Mint */}
      <div
        className="absolute inset-0 w-full h-full opacity-60 hidden dark:block"
        style={{
          backgroundImage: `
            linear-gradient(to right, rgba(255, 255, 255, 0.04) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(255, 255, 255, 0.04) 1px, transparent 1px),
            linear-gradient(to right, rgba(0, 200, 150, 0.12) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(0, 200, 150, 0.12) 1px, transparent 1px)
          `,
          backgroundSize: "24px 24px, 24px 24px, 120px 120px, 120px 120px",
        }}
      />

      {/* 2. SVG Telemetry Curves, Crosshairs & Data Points */}
      {/* 2A. Light Mode SVG Layer */}
      <svg
        className="absolute inset-0 w-full h-full dark:hidden"
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="none"
      >
        <defs>
          <linearGradient id="chart-emerald-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#008763" stopOpacity="0" />
            <stop offset="25%" stopColor="#008763" stopOpacity="0.65" />
            <stop offset="60%" stopColor="#008763" stopOpacity="0.85" />
            <stop offset="100%" stopColor="#008763" stopOpacity="0" />
          </linearGradient>

          <linearGradient id="chart-sky-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#0284c7" stopOpacity="0" />
            <stop offset="40%" stopColor="#0284c7" stopOpacity="0.45" />
            <stop offset="70%" stopColor="#008763" stopOpacity="0.6" />
            <stop offset="100%" stopColor="#008763" stopOpacity="0" />
          </linearGradient>
        </defs>

        {/* Telemetry Growth Curve 1 (Services / Systems) */}
        <path
          d="M -100 420 C 350 480, 600 240, 1000 280 C 1400 320, 1750 140, 2200 180"
          fill="none"
          stroke="url(#chart-emerald-gradient)"
          strokeWidth="2"
        />
        <path
          d="M -100 420 C 350 480, 600 240, 1000 280 C 1400 320, 1750 140, 2200 180"
          fill="none"
          stroke="#008763"
          strokeWidth="6"
          strokeOpacity="0.12"
          className="blur-[2px]"
        />

        {/* Telemetry Curve 2 (Work / Case Studies) */}
        <path
          d="M -50 1450 C 450 1380, 800 1600, 1250 1350 C 1700 1100, 2050 1250, 2400 1050"
          fill="none"
          stroke="url(#chart-sky-gradient)"
          strokeWidth="2"
          strokeDasharray="6 6"
        />

        {/* Telemetry Curve 3 (Insights / Lead Intake) */}
        <path
          d="M -100 2500 C 400 2400, 850 2650, 1350 2400 C 1800 2180, 2150 2300, 2500 2080"
          fill="none"
          stroke="url(#chart-emerald-gradient)"
          strokeWidth="1.5"
        />

        {/* Node Circles */}
        <circle cx="600" cy="240" r="4" fill="#008763" />
        <circle cx="600" cy="240" r="8" fill="#008763" fillOpacity="0.25" />
        <circle cx="1000" cy="280" r="4" fill="#008763" />
        <circle cx="1250" cy="1350" r="4" fill="#0284c7" />
        <circle cx="1250" cy="1350" r="8" fill="#0284c7" fillOpacity="0.25" />
        <circle cx="1350" cy="2400" r="4" fill="#008763" />
      </svg>

      {/* 2B. Dark Mode SVG Layer */}
      <svg
        className="absolute inset-0 w-full h-full hidden dark:block"
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="none"
      >
        <defs>
          <linearGradient id="chart-mint-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#00c896" stopOpacity="0" />
            <stop offset="25%" stopColor="#00c896" stopOpacity="0.6" />
            <stop offset="60%" stopColor="#00c896" stopOpacity="0.8" />
            <stop offset="100%" stopColor="#00c896" stopOpacity="0" />
          </linearGradient>

          <linearGradient id="chart-cyan-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#38bdf8" stopOpacity="0" />
            <stop offset="40%" stopColor="#38bdf8" stopOpacity="0.4" />
            <stop offset="70%" stopColor="#00c896" stopOpacity="0.5" />
            <stop offset="100%" stopColor="#00c896" stopOpacity="0" />
          </linearGradient>
        </defs>

        {/* Telemetry Growth Curve 1 (Services / Systems) */}
        <path
          d="M -100 420 C 350 480, 600 240, 1000 280 C 1400 320, 1750 140, 2200 180"
          fill="none"
          stroke="url(#chart-mint-gradient)"
          strokeWidth="2"
        />
        <path
          d="M -100 420 C 350 480, 600 240, 1000 280 C 1400 320, 1750 140, 2200 180"
          fill="none"
          stroke="#00c896"
          strokeWidth="6"
          strokeOpacity="0.15"
          className="blur-[2px]"
        />

        {/* Telemetry Curve 2 (Work / Case Studies) */}
        <path
          d="M -50 1450 C 450 1380, 800 1600, 1250 1350 C 1700 1100, 2050 1250, 2400 1050"
          fill="none"
          stroke="url(#chart-cyan-gradient)"
          strokeWidth="2"
          strokeDasharray="6 6"
        />

        {/* Telemetry Curve 3 (Insights / Lead Intake) */}
        <path
          d="M -100 2500 C 400 2400, 850 2650, 1350 2400 C 1800 2180, 2150 2300, 2500 2080"
          fill="none"
          stroke="url(#chart-mint-gradient)"
          strokeWidth="1.5"
        />

        {/* Node Circles */}
        <circle cx="600" cy="240" r="4" fill="#00c896" />
        <circle cx="600" cy="240" r="8" fill="#00c896" fillOpacity="0.3" />
        <circle cx="1000" cy="280" r="4" fill="#00c896" />
        <circle cx="1250" cy="1350" r="4" fill="#38bdf8" />
        <circle cx="1250" cy="1350" r="8" fill="#38bdf8" fillOpacity="0.3" />
        <circle cx="1350" cy="2400" r="4" fill="#00c896" />
      </svg>

      {/* 3. Adaptive Radial Vignette */}
      {/* Light Mode Vignette: Blends smoothly into Architectural Chalk (#f8fafc) */}
      <div
        className="absolute inset-0 w-full h-full pointer-events-none dark:hidden"
        style={{
          background: "radial-gradient(circle at 50% 50%, transparent 60%, #f8fafc 100%)",
        }}
      />

      {/* Dark Mode Vignette: Blends smoothly into Obsidian (#040404) */}
      <div
        className="absolute inset-0 w-full h-full pointer-events-none hidden dark:block"
        style={{
          background: "radial-gradient(circle at 50% 50%, transparent 60%, #040404 100%)",
        }}
      />
    </div>
  );
}