"use client";

import { useEffect, useRef, useState } from "react";
import * as THREE from "three";

interface ArchitecturalGlobeProps {
  className?: string;
}

export function ArchitecturalGlobe({ className = "" }: ArchitecturalGlobeProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const width = container.clientWidth || 500;
    const height = container.clientHeight || 500;

    // 1. Scene, Camera & WebGL Renderer
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
    camera.position.z = 245;

    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
      powerPreference: "high-performance",
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    // Master group for mouse/touch rotation
    const rootGroup = new THREE.Group();
    scene.add(rootGroup);

    const radius = 82;

    // 2. Solid Obsidian Inner Core (Prevents back-face visual clutter)
    const coreGeo = new THREE.SphereGeometry(radius * 0.985, 48, 48);
    const coreMat = new THREE.MeshBasicMaterial({
      color: 0x040404,
      transparent: false,
    });
    const coreMesh = new THREE.Mesh(coreGeo, coreMat);
    rootGroup.add(coreMesh);

    // 3. Continents Landmass Layer (/public/world-map.png)
    const textureLoader = new THREE.TextureLoader();
    textureLoader.load(
      "/world-map.png",
      (texture) => {
        texture.wrapS = THREE.RepeatWrapping;
        texture.wrapT = THREE.ClampToEdgeWrapping;

        const mapGeo = new THREE.SphereGeometry(radius, 64, 64);
        const mapMat = new THREE.MeshBasicMaterial({
          map: texture,
          color: 0x00c896,
          transparent: true,
          opacity: 0.85,
          blending: THREE.AdditiveBlending,
        });

        const mapMesh = new THREE.Mesh(mapGeo, mapMat);
        rootGroup.add(mapMesh);
        setIsLoaded(true);
      },
      undefined,
      () => setIsLoaded(true)
    );

    // 4. Architectural Wireframe Lattices
    // A. Latitude & Longitude Coordinate Cage
    const latLongGeo = new THREE.SphereGeometry(radius * 1.002, 24, 16);
    const latLongMat = new THREE.MeshBasicMaterial({
      color: 0x1f1f1f,
      wireframe: true,
      transparent: true,
      opacity: 0.45,
    });
    const latLongMesh = new THREE.Mesh(latLongGeo, latLongMat);
    rootGroup.add(latLongMesh);

    // B. Geodesic Icosahedron Tessellation Shell
    const geodesicGeo = new THREE.IcosahedronGeometry(radius * 1.012, 2);
    const geodesicMat = new THREE.MeshBasicMaterial({
      color: 0x00c896,
      wireframe: true,
      transparent: true,
      opacity: 0.12,
    });
    const geodesicMesh = new THREE.Mesh(geodesicGeo, geodesicMat);
    rootGroup.add(geodesicMesh);

    // 5. Global Hub Infrastructure Beacons (SF, London, Tokyo, Singapore, Dubai)
    const hubCoordinates = [
      { lat: 37.77, lon: -122.41 },
      { lat: 51.5, lon: -0.12 },
      { lat: 35.67, lon: 139.65 },
      { lat: 1.35, lon: 103.82 },
      { lat: 25.2, lon: 55.27 },
    ];

    const toVector3 = (lat: number, lon: number, r: number) => {
      const phi = (90 - lat) * (Math.PI / 180);
      const theta = (lon + 180) * (Math.PI / 180);
      return new THREE.Vector3(
        -(r * Math.sin(phi) * Math.cos(theta)),
        r * Math.cos(phi),
        r * Math.sin(phi) * Math.sin(theta)
      );
    };

    const hubVectors = hubCoordinates.map((h) => toVector3(h.lat, h.lon, radius * 1.005));
    const beaconGeo = new THREE.SphereGeometry(1.5, 12, 12);
    const beaconMat = new THREE.MeshBasicMaterial({ color: 0x00c896 });

    hubVectors.forEach((pos) => {
      const beacon = new THREE.Mesh(beaconGeo, beaconMat);
      beacon.position.copy(pos);
      rootGroup.add(beacon);
    });

    // 6. Great-Circle Trajectory Data Arcs & Traveling Packets
    const arcConnections = [
      [0, 1], // SF -> London
      [1, 4], // London -> Dubai
      [4, 3], // Dubai -> Singapore
      [3, 2], // Singapore -> Tokyo
      [2, 0], // Tokyo -> SF
    ];

    const arcCurves: THREE.QuadraticBezierCurve3[] = [];
    arcConnections.forEach(([i, j]) => {
      const start = hubVectors[i];
      const end = hubVectors[j];
      const mid = new THREE.Vector3().addVectors(start, end).multiplyScalar(0.5);
      const dist = start.distanceTo(end);
      mid.normalize().multiplyScalar(radius + dist * 0.35);

      const curve = new THREE.QuadraticBezierCurve3(start, mid, end);
      arcCurves.push(curve);

      const points = curve.getPoints(40);
      const curveGeo = new THREE.BufferGeometry().setFromPoints(points);
      const curveMat = new THREE.LineBasicMaterial({
        color: 0x00c896,
        transparent: true,
        opacity: 0.38,
      });
      rootGroup.add(new THREE.Line(curveGeo, curveMat));
    });

    // High-visibility packets gliding along trajectory curves
    const packetGeo = new THREE.SphereGeometry(1.4, 8, 8);
    const packetMat = new THREE.MeshBasicMaterial({ color: 0x5eead4 });
    const arcPackets = arcCurves.map(() => {
      const packet = new THREE.Mesh(packetGeo, packetMat);
      rootGroup.add(packet);
      return packet;
    });

    // 7. Multi-Axis Revolving Dot Swarm (Strict Constant-Radius Circular Paths)
    interface OrbitalStream {
      mesh: THREE.Points;
      speed: number;
    }

    const orbitalStreams: OrbitalStream[] = [];

    const createRevolvingStream = (
      dotCount: number,
      orbitRadius: number,
      tiltX: number,
      tiltZ: number,
      rotationSpeed: number,
      trackColor = 0x1f1f1f
    ) => {
      const planeGroup = new THREE.Group();
      planeGroup.rotation.x = tiltX;
      planeGroup.rotation.z = tiltZ;

      // Subtle architectural orbital guide track
      const segments = 96;
      const trackPoints: THREE.Vector3[] = [];
      for (let i = 0; i <= segments; i++) {
        const theta = (i / segments) * Math.PI * 2;
        trackPoints.push(
          new THREE.Vector3(
            orbitRadius * Math.cos(theta),
            0,
            orbitRadius * Math.sin(theta)
          )
        );
      }
      const trackGeo = new THREE.BufferGeometry().setFromPoints(trackPoints);
      const trackMat = new THREE.LineBasicMaterial({
        color: trackColor,
        transparent: true,
        opacity: 0.22,
      });
      const trackLine = new THREE.Line(trackGeo, trackMat);
      planeGroup.add(trackLine);

      // Revolving particle dots
      const positions = new Float32Array(dotCount * 3);
      const colors = new Float32Array(dotCount * 3);

      const colorMint = new THREE.Color("#00c896");
      const colorTeal = new THREE.Color("#5eead4");
      const colorMuted = new THREE.Color("#262626");

      for (let i = 0; i < dotCount; i++) {
        const angle = (i / dotCount) * Math.PI * 2;
        const bandOffset = (Math.random() - 0.5) * 4.5;
        const r = Math.sqrt(Math.max(0, orbitRadius * orbitRadius - bandOffset * bandOffset));

        positions[i * 3] = r * Math.cos(angle);
        positions[i * 3 + 1] = bandOffset;
        positions[i * 3 + 2] = r * Math.sin(angle);

        const rand = Math.random();
        const c = rand > 0.4 ? colorMint : rand > 0.18 ? colorTeal : colorMuted;
        colors[i * 3] = c.r;
        colors[i * 3 + 1] = c.g;
        colors[i * 3 + 2] = c.b;
      }

      const streamGeo = new THREE.BufferGeometry();
      streamGeo.setAttribute("position", new THREE.BufferAttribute(positions, 3));
      streamGeo.setAttribute("color", new THREE.BufferAttribute(colors, 3));

      const streamMat = new THREE.PointsMaterial({
        size: 2.3,
        vertexColors: true,
        transparent: true,
        opacity: 0.9,
      });

      const streamMesh = new THREE.Points(streamGeo, streamMat);
      planeGroup.add(streamMesh);
      rootGroup.add(planeGroup);

      orbitalStreams.push({ mesh: streamMesh, speed: rotationSpeed });
    };

    // Orbit 1: Equatorial Band (~85 dots revolving horizontally)
    createRevolvingStream(85, radius * 1.035, Math.PI * 0.08, 0, 0.0075, 0x00c896);

    // Orbit 2: Polar Band (~80 dots revolving vertically over North/South poles)
    createRevolvingStream(80, radius * 1.045, 0, Math.PI / 2, -0.0065, 0x1f1f1f);

    // Orbit 3: Ascending Diagonal Band (~85 dots revolving at +45° angle)
    createRevolvingStream(85, radius * 1.055, Math.PI / 4, -Math.PI / 5, 0.009, 0x00c896);

    // Orbit 4: Descending Diagonal Band (~75 dots revolving at -60° angle)
    createRevolvingStream(75, radius * 1.065, -Math.PI / 3, Math.PI / 4, -0.007, 0x1f1f1f);

    // 8. Calibrated Outer Telemetry Calibration Rings
    const ringGeo = new THREE.RingGeometry(radius * 1.18, radius * 1.195, 80);
    const ringMat = new THREE.MeshBasicMaterial({
      color: 0x00c896,
      transparent: true,
      opacity: 0.35,
      side: THREE.DoubleSide,
    });
    const mainRing = new THREE.Mesh(ringGeo, ringMat);
    mainRing.rotation.x = Math.PI / 2.3;
    mainRing.rotation.y = Math.PI / 8;
    rootGroup.add(mainRing);

    const outerRingGeo = new THREE.RingGeometry(radius * 1.28, radius * 1.285, 64);
    const outerRingMat = new THREE.MeshBasicMaterial({
      color: 0x1f1f1f,
      transparent: true,
      opacity: 0.85,
      side: THREE.DoubleSide,
    });
    const outerRing = new THREE.Mesh(outerRingGeo, outerRingMat);
    outerRing.rotation.x = Math.PI / 2.3;
    outerRing.rotation.y = Math.PI / 8;
    rootGroup.add(outerRing);

    // 9. Interactive Mouse & Touch Drag Dynamics
    let isDragging = false;
    let prevMouseX = 0;
    let prevMouseY = 0;
    let velocityX = 0;
    let velocityY = 0;

    const onMouseDown = (e: MouseEvent) => {
      isDragging = true;
      prevMouseX = e.clientX;
      prevMouseY = e.clientY;
    };

    const onMouseMove = (e: MouseEvent) => {
      if (!isDragging) return;
      const deltaX = e.clientX - prevMouseX;
      const deltaY = e.clientY - prevMouseY;
      velocityX = deltaX * 0.0035;
      velocityY = deltaY * 0.0035;
      rootGroup.rotation.y += velocityX;
      rootGroup.rotation.x += velocityY;
      prevMouseX = e.clientX;
      prevMouseY = e.clientY;
    };

    const onMouseUp = () => {
      isDragging = false;
    };

    const domElement = renderer.domElement;
    domElement.addEventListener("mousedown", onMouseDown);
    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mouseup", onMouseUp);

    // Touch controls for mobile screens
    const onTouchStart = (e: TouchEvent) => {
      if (e.touches.length === 1) {
        isDragging = true;
        prevMouseX = e.touches[0].clientX;
        prevMouseY = e.touches[0].clientY;
      }
    };

    const onTouchMove = (e: TouchEvent) => {
      if (!isDragging || e.touches.length !== 1) return;
      const deltaX = e.touches[0].clientX - prevMouseX;
      const deltaY = e.touches[0].clientY - prevMouseY;
      rootGroup.rotation.y += deltaX * 0.004;
      rootGroup.rotation.x += deltaY * 0.004;
      prevMouseX = e.touches[0].clientX;
      prevMouseY = e.touches[0].clientY;
    };

    const onTouchEnd = () => {
      isDragging = false;
    };

    domElement.addEventListener("touchstart", onTouchStart, { passive: true });
    window.addEventListener("touchmove", onTouchMove, { passive: true });
    window.addEventListener("touchend", onTouchEnd);

    // Responsive Canvas Resize Observer
    const handleResize = () => {
      if (!container) return;
      const newWidth = container.clientWidth;
      const newHeight = container.clientHeight;
      camera.aspect = newWidth / newHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(newWidth, newHeight);
    };

    const resizeObserver = new ResizeObserver(() => handleResize());
    resizeObserver.observe(container);

    // 10. Animation Loop (Strict rotational movement with zero radius pulsation)
    let animationFrameId: number;
    const clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      const elapsed = clock.getElapsedTime();

      // Base globe continuous idle spin & drag damping
      if (!isDragging) {
        rootGroup.rotation.y += 0.0016;
        velocityX *= 0.95;
        velocityY *= 0.95;
        rootGroup.rotation.y += velocityX;
        rootGroup.rotation.x += velocityY;
      }

      // Counter-rotate the outer calibration ring
      outerRing.rotation.z = -elapsed * 0.04;

      // Revolve each orbital stream around its axis
      for (let i = 0; i < orbitalStreams.length; i++) {
        orbitalStreams[i].mesh.rotation.y += orbitalStreams[i].speed;
      }

      // Animate trajectory packets gliding across arcs
      arcPackets.forEach((packet, idx) => {
        const t = (elapsed * 0.35 + idx * 0.2) % 1;
        const pos = arcCurves[idx].getPoint(t);
        packet.position.copy(pos);
      });

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationFrameId);
      resizeObserver.disconnect();
      domElement.removeEventListener("mousedown", onMouseDown);
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseup", onMouseUp);
      domElement.removeEventListener("touchstart", onTouchStart);
      window.removeEventListener("touchmove", onTouchMove);
      window.removeEventListener("touchend", onTouchEnd);
      renderer.dispose();
      coreGeo.dispose();
      coreMat.dispose();
      latLongGeo.dispose();
      latLongMat.dispose();
      geodesicGeo.dispose();
      geodesicMat.dispose();
      beaconGeo.dispose();
      beaconMat.dispose();
      packetGeo.dispose();
      packetMat.dispose();
      ringGeo.dispose();
      ringMat.dispose();
      outerRingGeo.dispose();
      outerRingMat.dispose();
      if (container.contains(domElement)) {
        container.removeChild(domElement);
      }
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className={`relative flex items-center justify-center cursor-grab active:cursor-grabbing ${className}`}
    >
      {!isLoaded && (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-10 h-10 rounded-full border border-[#1f1f1f] border-t-[#00c896] animate-spin" />
        </div>
      )}
    </div>
  );
}