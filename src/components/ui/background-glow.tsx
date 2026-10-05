export function BackgroundGlow() {
  return (
    <div className="absolute inset-0 -z-10 overflow-hidden pointer-events-none">
      {/* Primary #00c896 ambient bloom */}
      <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-[700px] h-[350px] bg-[#00c896]/15 blur-[130px] rounded-full" />

      {/* Secondary subtle surface warmth */}
      <div className="absolute top-72 right-12 w-[350px] h-[350px] bg-[#1f1f1f] blur-[100px] rounded-full opacity-60" />

      {/* Grid texture fading into obsidian #040404 */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#1f1f1f25_1px,transparent_1px),linear-gradient(to_bottom,#1f1f1f25_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]" />
    </div>
  );
}