"use client";

import { useEffect, useRef } from "react";
import createGlobe from "cobe";

interface GlobeProps {
  className?: string;
}

export function Globe({ className = "" }: GlobeProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const pointerInteracting = useRef<number | null>(null);
  const pointerInteractionMovement = useRef(0);

  useEffect(() => {
    let phi = 0;
    let width = 0;

    const onResize = () => {
      if (canvasRef.current) {
        width = canvasRef.current.offsetWidth || 500;
      }
    };
    window.addEventListener("resize", onResize);
    onResize();

    if (!canvasRef.current) return;

    const globe = createGlobe(canvasRef.current, {
      devicePixelRatio: 2,
      width: (width || 500) * 2,
      height: (width || 500) * 2,
      phi: 0,
      theta: 0.25,
      dark: 1,
      diffuse: 1.4,
      mapSamples: 16000,
      mapBrightness: 6,
      // High-contrast luminous silver tone for visible landmass dots
      baseColor: [0.85, 0.88, 0.92],
      // Brand #00c896 electric mint for city markers & outer atmosphere
      markerColor: [0, 0.784, 0.588],
      glowColor: [0, 0.784, 0.588],
      markers: [
        { location: [37.7749, -122.4194], size: 0.04 }, // San Francisco
        { location: [40.7128, -74.006], size: 0.04 },  // New York
        { location: [51.5074, -0.1278], size: 0.05 },  // London
        { location: [25.2048, 55.2708], size: 0.05 },  // Dubai
        { location: [17.385, 78.4867], size: 0.06 },   // Hyderabad
        { location: [1.3521, 103.8198], size: 0.05 },  // Singapore
        { location: [35.6762, 139.6503], size: 0.04 }, // Tokyo
      ],
      onRender: (state: { phi: number }) => {
        // Continuous auto-rotation
        if (pointerInteracting.current === null) {
          phi += 0.004;
        }
        state.phi = phi + pointerInteractionMovement.current;
      },
    } as Parameters<typeof createGlobe>[1]);

    return () => {
      globe.destroy();
      window.removeEventListener("resize", onResize);
    };
  }, []);

  return (
    <div
      className={`relative aspect-square w-full max-w-[550px] mx-auto flex items-center justify-center ${className}`}
    >
      {/* Ambient background bloom outlining the globe curvature */}
      <div className="absolute inset-6 rounded-full bg-[#00c896]/15 blur-3xl pointer-events-none -z-10" />

      <canvas
        ref={canvasRef}
        onPointerDown={(e) => {
          pointerInteracting.current =
            e.clientX - pointerInteractionMovement.current;
          (e.target as HTMLElement).setPointerCapture(e.pointerId);
          if (canvasRef.current) {
            canvasRef.current.style.cursor = "grabbing";
          }
        }}
        onPointerUp={(e) => {
          pointerInteracting.current = null;
          try {
            (e.target as HTMLElement).releasePointerCapture(e.pointerId);
          } catch {}
          if (canvasRef.current) {
            canvasRef.current.style.cursor = "grab";
          }
        }}
        onPointerCancel={() => {
          pointerInteracting.current = null;
          if (canvasRef.current) {
            canvasRef.current.style.cursor = "grab";
          }
        }}
        onPointerMove={(e) => {
          if (pointerInteracting.current !== null) {
            const delta = e.clientX - pointerInteracting.current;
            pointerInteractionMovement.current = delta * 0.005;
          }
        }}
        className="w-full h-full cursor-grab active:cursor-grabbing transition-opacity duration-500"
        style={{
          width: "100%",
          height: "100%",
          maxWidth: "100%",
          aspectRatio: "1",
        }}
      />
    </div>
  );
}