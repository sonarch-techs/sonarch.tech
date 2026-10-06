"use client";

export function GraphGridBackground() {
  return (
    <div
      aria-hidden="true"
      className="absolute inset-0 pointer-events-none select-none overflow-hidden z-0"
    >
      {/* 1. High-Contrast CSS Graph Grid (repeats infinitely down the page) */}
      <div 
        className="absolute inset-0 w-full h-full opacity-60"
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
      <svg
        className="absolute inset-0 w-full h-full"
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

        {/* Major Telemetry Growth Curve 1 (Services / Systems area) */}
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

        {/* Telemetry Curve 2 (Work / Case Studies area) */}
        <path
          d="M -50 1450 C 450 1380, 800 1600, 1250 1350 C 1700 1100, 2050 1250, 2400 1050"
          fill="none"
          stroke="url(#chart-cyan-gradient)"
          strokeWidth="2"
          strokeDasharray="6 6"
        />

        {/* Telemetry Curve 3 (Insights / Lead area) */}
        <path
          d="M -100 2500 C 400 2400, 850 2650, 1350 2400 C 1800 2180, 2150 2300, 2500 2080"
          fill="none"
          stroke="url(#chart-mint-gradient)"
          strokeWidth="1.5"
        />

        {/* Telemetry Node Circles with Mint Core */}
        <circle cx="600" cy="240" r="4" fill="#00c896" />
        <circle cx="600" cy="240" r="8" fill="#00c896" fillOpacity="0.3" />
        <circle cx="1000" cy="280" r="4" fill="#00c896" />
        <circle cx="1250" cy="1350" r="4" fill="#38bdf8" />
        <circle cx="1250" cy="1350" r="8" fill="#38bdf8" fillOpacity="0.3" />
        <circle cx="1350" cy="2400" r="4" fill="#00c896" />
      </svg>

      {/* 3. Subtle Radial Vignette (Ensures edges blend into deep obsidian) */}
      <div 
        className="absolute inset-0 w-full h-full pointer-events-none"
        style={{
          background: "radial-gradient(circle at 50% 50%, transparent 60%, #040404 100%)",
        }}
      />
    </div>
  );
}