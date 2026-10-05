"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

interface ArchitecturalGlobeProps {
  className?: string;
}

export function ArchitecturalGlobe({ className = "" }: ArchitecturalGlobeProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // --- 1. Scene, Camera & WebGL Renderer ---
    const scene = new THREE.Scene();
    
    // Dynamic initial camera positioning based on viewport width
    const initialWidth = container.clientWidth || 300;
    const initialZ = initialWidth < 380 ? 310 : initialWidth < 500 ? 275 : 240;

    const camera = new THREE.PerspectiveCamera(45, 1, 0.1, 1000);
    camera.position.z = initialZ;

    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
      powerPreference: "high-performance",
    });
    renderer.setSize(initialWidth, initialWidth);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    
    renderer.domElement.style.touchAction = "none";
    renderer.domElement.style.userSelect = "none";
    renderer.domElement.style.width = "100%";
    renderer.domElement.style.height = "100%";
    container.appendChild(renderer.domElement);

    const rootGroup = new THREE.Group();
    rootGroup.rotation.x = 0.28;
    scene.add(rootGroup);

    // --- 2. Inner Structural Wireframe (#1f1f1f) ---
    const innerGeometry = new THREE.IcosahedronGeometry(78, 2);
    const innerMaterial = new THREE.MeshBasicMaterial({
      color: 0x1f1f1f,
      wireframe: true,
      transparent: true,
      opacity: 0.6,
    });
    const innerGlobe = new THREE.Mesh(innerGeometry, innerMaterial);
    rootGroup.add(innerGlobe);

    // --- 3. Latitude & Longitude Coordinate Rings ---
    const ringsGroup = new THREE.Group();
    const ringMaterial = new THREE.LineBasicMaterial({
      color: 0x1f1f1f,
      transparent: true,
      opacity: 0.85,
    });

    const latitudes = [-45, -20, 0, 20, 45];
    latitudes.forEach((lat) => {
      const radius = 80 * Math.cos((lat * Math.PI) / 180);
      const y = 80 * Math.sin((lat * Math.PI) / 180);
      const ringGeo = new THREE.BufferGeometry();
      const points: THREE.Vector3[] = [];
      const segments = 64;

      for (let i = 0; i <= segments; i++) {
        const theta = (i / segments) * Math.PI * 2;
        points.push(new THREE.Vector3(Math.cos(theta) * radius, y, Math.sin(theta) * radius));
      }
      ringGeo.setFromPoints(points);
      const line = new THREE.Line(ringGeo, ringMaterial);
      ringsGroup.add(line);
    });

    for (let i = 0; i < 6; i++) {
      const meridianGeo = new THREE.BufferGeometry();
      const points: THREE.Vector3[] = [];
      const segments = 64;
      const angle = (i / 6) * Math.PI;

      for (let j = 0; j <= segments; j++) {
        const theta = (j / segments) * Math.PI * 2;
        const x = Math.sin(theta) * 80 * Math.cos(angle);
        const y = Math.cos(theta) * 80;
        const z = Math.sin(theta) * 80 * Math.sin(angle);
        points.push(new THREE.Vector3(x, y, z));
      }
      meridianGeo.setFromPoints(points);
      const line = new THREE.Line(meridianGeo, ringMaterial);
      ringsGroup.add(line);
    }
    rootGroup.add(ringsGroup);

    // --- 4. Floating Swarm of Coordinate Nodes (#00c896) ---
    const particleCount = 420;
    const particlePositions = new Float32Array(particleCount * 3);

    for (let i = 0; i < particleCount; i++) {
      const phi = Math.acos(-1 + (2 * i) / particleCount);
      const theta = Math.sqrt(particleCount * Math.PI) * phi;
      const r = 80 + (Math.random() - 0.5) * 2;

      particlePositions[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      particlePositions[i * 3 + 1] = r * Math.cos(phi);
      particlePositions[i * 3 + 2] = r * Math.sin(phi) * Math.sin(theta);
    }

    const particleGeometry = new THREE.BufferGeometry();
    particleGeometry.setAttribute("position", new THREE.BufferAttribute(particlePositions, 3));

    const particleMaterial = new THREE.PointsMaterial({
      color: 0x00c896,
      size: 2.2,
      transparent: true,
      opacity: 0.85,
    });
    const particles = new THREE.Points(particleGeometry, particleMaterial);
    rootGroup.add(particles);

    // --- 5. Hub Beacons ---
    const hubs = [
      { lat: 37.77, lon: -122.41 },
      { lat: 51.5, lon: -0.12 },
      { lat: 25.2, lon: 55.27 },
      { lat: 17.38, lon: 78.48 },
      { lat: 1.35, lon: 103.81 },
    ];

    const beaconGroup = new THREE.Group();
    const beaconGeometry = new THREE.SphereGeometry(2.4, 16, 16);
    const beaconMaterial = new THREE.MeshBasicMaterial({ color: 0x00c896 });

    hubs.forEach((hub) => {
      const phi = (90 - hub.lat) * (Math.PI / 180);
      const theta = (hub.lon + 180) * (Math.PI / 180);
      const r = 81.5;

      const x = -(r * Math.sin(phi) * Math.cos(theta));
      const z = r * Math.sin(phi) * Math.sin(theta);
      const y = r * Math.cos(phi);

      const beaconMesh = new THREE.Mesh(beaconGeometry, beaconMaterial);
      beaconMesh.position.set(x, y, z);
      beaconGroup.add(beaconMesh);
    });
    rootGroup.add(beaconGroup);

    // --- 6. Omnidirectional Controls ---
    let isDragging = false;
    let previousMouseX = 0;
    let previousMouseY = 0;
    let rotationVelocityX = 0.0035;
    let rotationVelocityY = 0;

    const MAX_PITCH = Math.PI / 2.2;
    const MIN_PITCH = -Math.PI / 2.2;

    const handlePointerDown = (e: PointerEvent) => {
      isDragging = true;
      previousMouseX = e.clientX;
      previousMouseY = e.clientY;
      renderer.domElement.style.cursor = "grabbing";
      try {
        renderer.domElement.setPointerCapture(e.pointerId);
      } catch {}
    };

    const handlePointerMove = (e: PointerEvent) => {
      if (!isDragging) return;
      const deltaX = e.clientX - previousMouseX;
      const deltaY = e.clientY - previousMouseY;

      previousMouseX = e.clientX;
      previousMouseY = e.clientY;

      rootGroup.rotation.y += deltaX * 0.006;
      rotationVelocityX = deltaX * 0.004;

      const nextPitch = rootGroup.rotation.x + deltaY * 0.006;
      rootGroup.rotation.x = Math.max(MIN_PITCH, Math.min(MAX_PITCH, nextPitch));
      rotationVelocityY = deltaY * 0.004;
    };

    const handlePointerUp = (e: PointerEvent) => {
      isDragging = false;
      renderer.domElement.style.cursor = "grab";
      try {
        renderer.domElement.releasePointerCapture(e.pointerId);
      } catch {}
    };

    const domElement = renderer.domElement;
    domElement.style.cursor = "grab";
    domElement.addEventListener("pointerdown", handlePointerDown);
    domElement.addEventListener("pointermove", handlePointerMove);
    domElement.addEventListener("pointerup", handlePointerUp);
    domElement.addEventListener("pointercancel", handlePointerUp);

    // --- 7. Adaptive Resize Observer (Mobile Scaling Fix) ---
    const handleResize = () => {
      if (!container) return;
      const width = container.clientWidth;
      if (width === 0) return;

      // Adjust camera distance dynamically to ensure the entire globe fits on phones
      camera.position.z = width < 380 ? 310 : width < 500 ? 275 : 240;
      camera.aspect = 1;
      camera.updateProjectionMatrix();
      renderer.setSize(width, width);
    };

    const resizeObserver = new ResizeObserver(() => handleResize());
    resizeObserver.observe(container);

    // --- 8. Render Loop ---
    let animationFrameId: number;

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);

      if (!isDragging) {
        rotationVelocityX += (0.0035 - rotationVelocityX) * 0.04;
        rootGroup.rotation.y += rotationVelocityX;

        rotationVelocityY *= 0.92;
        const nextPitch = rootGroup.rotation.x + rotationVelocityY;
        rootGroup.rotation.x = Math.max(MIN_PITCH, Math.min(MAX_PITCH, nextPitch));
      }

      const scale = 1 + Math.sin(Date.now() * 0.005) * 0.15;
      beaconGroup.scale.set(scale, scale, scale);

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationFrameId);
      resizeObserver.disconnect();
      domElement.removeEventListener("pointerdown", handlePointerDown);
      domElement.removeEventListener("pointermove", handlePointerMove);
      domElement.removeEventListener("pointerup", handlePointerUp);
      domElement.removeEventListener("pointercancel", handlePointerUp);

      innerGeometry.dispose();
      innerMaterial.dispose();
      particleGeometry.dispose();
      particleMaterial.dispose();
      beaconGeometry.dispose();
      beaconMaterial.dispose();
      renderer.dispose();

      if (container.contains(domElement)) {
        container.removeChild(domElement);
      }
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className={`relative aspect-square w-full mx-auto flex items-center justify-center select-none touch-none ${className}`}
    >
      <div className="absolute inset-4 sm:inset-8 rounded-full bg-[#00c896]/15 blur-2xl sm:blur-3xl pointer-events-none -z-10" />
    </div>
  );
}