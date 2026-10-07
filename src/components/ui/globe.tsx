"use client";

import { useEffect, useRef, useState } from "react";
import * as THREE from "three";

interface GlobeProps {
  className?: string;
}

export function Globe({ className = "" }: GlobeProps) {
  const mountRef = useRef<HTMLDivElement>(null);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    // Flush any stale DOM nodes inside mount to prevent WebGL context collision
    while (mount.firstChild) {
      mount.removeChild(mount.firstChild);
    }

    const width = mount.clientWidth || 500;
    const height = mount.clientHeight || 500;

    // 1. Scene, Camera, High-Precision WebGL Renderer
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
    camera.position.z = 250;

    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
      powerPreference: "high-performance",
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    mount.appendChild(renderer.domElement);

    // Root group that responds to user drag/swipe inertia
    const rootGroup = new THREE.Group();
    scene.add(rootGroup);

    const radius = 82;

    // 2. Solid Obsidian Inner Core (Occludes back-facing elements naturally)
    const coreGeo = new THREE.SphereGeometry(radius * 0.985, 48, 48);
    const coreMat = new THREE.MeshBasicMaterial({
      color: 0x040404,
      transparent: false,
    });
    const coreMesh = new THREE.Mesh(coreGeo, coreMat);
    rootGroup.add(coreMesh);

    // 3. Ethereal Atmospheric Rim Glow (Custom Fresnel Horizon)
    const atmosphereGeo = new THREE.SphereGeometry(radius * 1.025, 48, 48);
    const atmosphereMat = new THREE.ShaderMaterial({
      transparent: true,
      blending: THREE.AdditiveBlending,
      side: THREE.BackSide,
      vertexShader: `
        varying vec3 vNormal;
        varying vec3 vPosition;
        void main() {
          vNormal = normalize(normalMatrix * normal);
          vPosition = (modelViewMatrix * vec4(position, 1.0)).xyz;
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `,
      fragmentShader: `
        varying vec3 vNormal;
        varying vec3 vPosition;
        void main() {
          vec3 viewDir = normalize(-vPosition);
          float rim = 1.0 - max(dot(viewDir, vNormal), 0.0);
          rim = pow(rim, 2.8);
          gl_FragColor = vec4(0.0, 0.784, 0.588, rim * 0.35);
        }
      `,
    });
    const atmosphereMesh = new THREE.Mesh(atmosphereGeo, atmosphereMat);
    rootGroup.add(atmosphereMesh);

    // 4. World Continents Map Layer (/public/world-map.png)
    const textureLoader = new THREE.TextureLoader();
    textureLoader.load(
      "/world-map.png",
      (texture) => {
        texture.wrapS = THREE.RepeatWrapping;
        texture.wrapT = THREE.ClampToEdgeWrapping;

        const mapGeo = new THREE.SphereGeometry(radius, 64, 64);
        const mapMat = new THREE.MeshBasicMaterial({
          map: texture,
          color: 0x00c896, // Mint continental vector glow
          transparent: true,
          opacity: 0.88,
          blending: THREE.AdditiveBlending,
        });

        const mapMesh = new THREE.Mesh(mapGeo, mapMat);
        rootGroup.add(mapMesh);
        setIsLoaded(true);
      },
      undefined,
      () => setIsLoaded(true)
    );

    // 5. Architectural Latitude & Longitude Wireframe Grid
    const latLongGeo = new THREE.SphereGeometry(radius * 1.002, 24, 16);
    const latLongMat = new THREE.MeshBasicMaterial({
      color: 0x242424,
      wireframe: true,
      transparent: true,
      opacity: 0.45,
    });
    const latLongMesh = new THREE.Mesh(latLongGeo, latLongMat);
    rootGroup.add(latLongMesh);

    // 6. Geodesic Icosahedron Facet Cage (Structural Blueprint Layer)
    const geodesicGeo = new THREE.IcosahedronGeometry(radius * 1.012, 2);
    const geodesicMat = new THREE.MeshBasicMaterial({
      color: 0x00c896,
      wireframe: true,
      transparent: true,
      opacity: 0.1,
    });
    const geodesicMesh = new THREE.Mesh(geodesicGeo, geodesicMat);
    rootGroup.add(geodesicMesh);

    // 7. Global Infrastructure Nodes (SF, London, Tokyo, Singapore, Dubai)
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

    const hubVectors = hubCoordinates.map((h) => toVector3(h.lat, h.lon, radius * 1.004));
    const beaconGeo = new THREE.SphereGeometry(1.5, 12, 12);
    const beaconMat = new THREE.MeshBasicMaterial({ color: 0x00c896 });

    hubVectors.forEach((pos) => {
      const beacon = new THREE.Mesh(beaconGeo, beaconMat);
      beacon.position.copy(pos);
      rootGroup.add(beacon);
    });

    // 8. Great-Circle Trajectory Data Arcs with Gliding Packets
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
        opacity: 0.32,
      });
      rootGroup.add(new THREE.Line(curveGeo, curveMat));
    });

    const packetGeo = new THREE.SphereGeometry(1.3, 8, 8);
    const packetMat = new THREE.MeshBasicMaterial({ color: 0x5eead4 });
    const arcPackets = arcCurves.map(() => {
      const packet = new THREE.Mesh(packetGeo, packetMat);
      rootGroup.add(packet);
      return packet;
    });

    // 9. Independent Multi-Axis Satellite Constellation System
    // Each particle revolves on its OWN individual 3D inclination vector and orbit track
    interface SatelliteOrbit {
      rotator: THREE.Group;
      speed: number;
    }

    const satelliteOrbits: SatelliteOrbit[] = [];

    const satelliteConfigs = [
      { tiltX: 0.38, tiltY: 0.25, tiltZ: 0.72, radius: 91, speed: 0.012, coreColor: 0x00c896, haloColor: 0x00c896, size: 2.1 },
      { tiltX: -0.65, tiltY: 0.42, tiltZ: -0.35, radius: 88, speed: -0.014, coreColor: 0x5eead4, haloColor: 0x5eead4, size: 1.8 },
      { tiltX: 1.15, tiltY: -0.28, tiltZ: 0.55, radius: 95, speed: 0.009, coreColor: 0x00c896, haloColor: 0x00c896, size: 2.3 },
      { tiltX: -0.22, tiltY: 0.88, tiltZ: -1.05, radius: 90, speed: -0.011, coreColor: 0x38bdf8, haloColor: 0x38bdf8, size: 1.9 },
      { tiltX: 0.82, tiltY: -0.78, tiltZ: 0.22, radius: 93, speed: 0.013, coreColor: 0x00c896, haloColor: 0x00c896, size: 2.0 },
      { tiltX: -1.18, tiltY: 0.15, tiltZ: 0.68, radius: 87, speed: -0.008, coreColor: 0x5eead4, haloColor: 0x5eead4, size: 1.7 },
      { tiltX: 0.44, tiltY: 1.18, tiltZ: -0.52, radius: 96, speed: 0.010, coreColor: 0x00c896, haloColor: 0x00c896, size: 2.2 },
      { tiltX: -0.48, tiltY: -0.58, tiltZ: 1.12, radius: 89, speed: -0.012, coreColor: 0x38bdf8, haloColor: 0x38bdf8, size: 1.8 },
    ];

    satelliteConfigs.forEach((cfg) => {
      // 1. Orbital Plane Group - oriented to this particle's exclusive 3D rotation axis
      const planeGroup = new THREE.Group();
      planeGroup.rotation.set(cfg.tiltX, cfg.tiltY, cfg.tiltZ);

      // 2. Blueprint Orbital Vector Track
      const trackSegments = 64;
      const trackPoints: THREE.Vector3[] = [];
      for (let i = 0; i <= trackSegments; i++) {
        const theta = (i / trackSegments) * Math.PI * 2;
        trackPoints.push(
          new THREE.Vector3(
            cfg.radius * Math.cos(theta),
            0,
            cfg.radius * Math.sin(theta)
          )
        );
      }
      const trackGeo = new THREE.BufferGeometry().setFromPoints(trackPoints);
      const trackMat = new THREE.LineBasicMaterial({
        color: cfg.coreColor,
        transparent: true,
        opacity: 0.18,
      });
      planeGroup.add(new THREE.Line(trackGeo, trackMat));

      // 3. Independent Rotator Group for this particle
      const rotatorGroup = new THREE.Group();

      // High-intensity core sphere
      const coreGeo = new THREE.SphereGeometry(cfg.size, 16, 16);
      const coreMat = new THREE.MeshBasicMaterial({ color: cfg.coreColor });
      const coreMesh = new THREE.Mesh(coreGeo, coreMat);
      coreMesh.position.set(cfg.radius, 0, 0);

      // Soft radiant halo envelope
      const haloGeo = new THREE.SphereGeometry(cfg.size * 1.8, 16, 16);
      const haloMat = new THREE.MeshBasicMaterial({
        color: cfg.haloColor,
        transparent: true,
        opacity: 0.28,
        blending: THREE.AdditiveBlending,
      });
      const haloMesh = new THREE.Mesh(haloGeo, haloMat);
      coreMesh.add(haloMesh);

      rotatorGroup.add(coreMesh);
      planeGroup.add(rotatorGroup);
      rootGroup.add(planeGroup);

      satelliteOrbits.push({ rotator: rotatorGroup, speed: cfg.speed });
    });

    // 10. Outer Calibrated Astrolabe Telemetry Rings
    const ringGeo = new THREE.RingGeometry(radius * 1.22, radius * 1.232, 80);
    const ringMat = new THREE.MeshBasicMaterial({
      color: 0x00c896,
      transparent: true,
      opacity: 0.32,
      side: THREE.DoubleSide,
    });
    const mainRing = new THREE.Mesh(ringGeo, ringMat);
    mainRing.rotation.x = Math.PI / 2.3;
    mainRing.rotation.y = Math.PI / 8;
    rootGroup.add(mainRing);

    const outerRingGeo = new THREE.RingGeometry(radius * 1.32, radius * 1.325, 64);
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

    // 11. Mouse & Touch Drag Controls
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
      if (!mount) return;
      const newWidth = mount.clientWidth;
      const newHeight = mount.clientHeight;
      camera.aspect = newWidth / newHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(newWidth, newHeight);
    };

    const resizeObserver = new ResizeObserver(() => handleResize());
    resizeObserver.observe(mount);

    // 12. Multi-Axis Animation Loop
    let animationFrameId: number;

const animate = (time: number) => {
  animationFrameId = requestAnimationFrame(animate);
  const elapsed = time * 0.001;

      // Continuous planetary idle rotation with drag damping
      if (!isDragging) {
        rootGroup.rotation.y += 0.0016;
        velocityX *= 0.95;
        velocityY *= 0.95;
        rootGroup.rotation.y += velocityX;
        rootGroup.rotation.x += velocityY;
      }

      // Counter-rotate the outer calibration telemetry ring
      outerRing.rotation.z = -elapsed * 0.04;

      // Revolve EACH particle on its own independent axis plane
      for (let i = 0; i < satelliteOrbits.length; i++) {
        satelliteOrbits[i].rotator.rotation.y += satelliteOrbits[i].speed;
      }

      // Slide data packets across global trajectory arcs
      arcPackets.forEach((packet, idx) => {
        const t = (elapsed * 0.35 + idx * 0.2) % 1;
        const pos = arcCurves[idx].getPoint(t);
        packet.position.copy(pos);
      });

      renderer.render(scene, camera);
    };

    animate();

    // Clean teardown for React Fast Refresh
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
      atmosphereGeo.dispose();
      atmosphereMat.dispose();
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

      if (mount && domElement.parentNode === mount) {
        mount.removeChild(domElement);
      }
    };
  }, []);

  return (
    <div className={`relative flex items-center justify-center cursor-grab active:cursor-grabbing ${className}`}>
      {/* Three.js exclusive canvas mount */}
      <div ref={mountRef} className="w-full h-full" />

      {/* Loading state isolated outside canvas mount */}
      {!isLoaded && (
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="w-10 h-10 rounded-full border border-[#1f1f1f] border-t-[#00c896] animate-spin" />
        </div>
      )}
    </div>
  );
}