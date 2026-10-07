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

    // 2. Solid Obsidian Inner Core (Blocks back-facing elements naturally)
    const coreGeo = new THREE.SphereGeometry(radius * 0.985, 48, 48);
    const coreMat = new THREE.MeshBasicMaterial({
      color: 0x040404,
      transparent: false,
    });
    const coreMesh = new THREE.Mesh(coreGeo, coreMat);
    rootGroup.add(coreMesh);

    // 3. Crisp Camera-Facing Planetary Silhouette Rim
    const rimGeo = new THREE.RingGeometry(radius * 1.006, radius * 1.018, 128);
    const rimMat = new THREE.MeshBasicMaterial({
      color: 0xffffff,
      transparent: true,
      opacity: 0.55,
      side: THREE.DoubleSide,
    });
    const rimMesh = new THREE.Mesh(rimGeo, rimMat);
    scene.add(rimMesh);

    // 4. Atmospheric Fresnel Edge Glow
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
          gl_FragColor = vec4(0.0, 0.784, 0.588, rim * 0.32);
        }
      `,
    });
    const atmosphereMesh = new THREE.Mesh(atmosphereGeo, atmosphereMat);
    rootGroup.add(atmosphereMesh);

    // 5. World Continents Map Layer (/public/world-map.png)
    const textureLoader = new THREE.TextureLoader();
    let mapTexture: THREE.Texture | null = null;
    textureLoader.load(
      "/world-map.png",
      (texture) => {
        mapTexture = texture;
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

    // 6. Architectural Latitude & Longitude Wireframe Grid
    const latLongGeo = new THREE.SphereGeometry(radius * 1.002, 24, 16);
    const latLongMat = new THREE.MeshBasicMaterial({
      color: 0x222222,
      wireframe: true,
      transparent: true,
      opacity: 0.45,
    });
    const latLongMesh = new THREE.Mesh(latLongGeo, latLongMat);
    rootGroup.add(latLongMesh);

    // 7. Geodesic Icosahedron Structural Facet Shell
    const geodesicGeo = new THREE.IcosahedronGeometry(radius * 1.012, 2);
    const geodesicMat = new THREE.MeshBasicMaterial({
      color: 0x00c896,
      wireframe: true,
      transparent: true,
      opacity: 0.1,
    });
    const geodesicMesh = new THREE.Mesh(geodesicGeo, geodesicMat);
    rootGroup.add(geodesicMesh);

    // 8. Global Infrastructure Hub Nodes
    const hubCoordinates = [
      { lat: 37.77, lon: -122.41 }, // San Francisco
      { lat: 51.5, lon: -0.12 },    // London
      { lat: 35.67, lon: 139.65 },  // Tokyo
      { lat: 1.35, lon: 103.82 },   // Singapore
      { lat: 25.2, lon: 55.27 },    // Dubai
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
    const beaconGeo = new THREE.SphereGeometry(1.4, 12, 12);
    const beaconMat = new THREE.MeshBasicMaterial({ color: 0x00c896 });

    hubVectors.forEach((pos) => {
      const beacon = new THREE.Mesh(beaconGeo, beaconMat);
      beacon.position.copy(pos);
      rootGroup.add(beacon);
    });

    // 9. Great-Circle Trajectory Data Arcs with Gliding Packets
    const arcConnections = [
      [0, 1], // SF -> London
      [1, 4], // London -> Dubai
      [4, 3], // Dubai -> Singapore
      [3, 2], // Singapore -> Tokyo
      [2, 0], // Tokyo -> SF
    ];

    const arcCurves: THREE.QuadraticBezierCurve3[] = [];
    const arcLines: THREE.Line[] = [];

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
      const line = new THREE.Line(curveGeo, curveMat);
      arcLines.push(line);
      rootGroup.add(line);
    });

    const packetGeo = new THREE.SphereGeometry(1.3, 8, 8);
    const packetMat = new THREE.MeshBasicMaterial({ color: 0x5eead4 });
    const arcPackets = arcCurves.map(() => {
      const packet = new THREE.Mesh(packetGeo, packetMat);
      rootGroup.add(packet);
      return packet;
    });

    // 10. MULTI-LAYER ORBITAL SATELLITE ENGINE
    // Each layer has its own orbital plane, speed, and uniform color across all its nodes
    interface OrbitalLayer {
      rotator: THREE.Group;
      speed: number;
    }

    const orbitalLayers: OrbitalLayer[] = [];
    const layerDisposables: { geo: THREE.BufferGeometry; mat: THREE.Material }[] = [];

    const layerConfigs = [
      {
        name: "Layer 1 - Mint",
        radius: radius * 1.06,
        tiltX: 0.28,
        tiltZ: 0.12,
        speed: 0.012,
        colorHex: 0x00c896, // Electric Mint
        dotCount: 5,
        dotSize: 2.1,
      },
      {
        name: "Layer 2 - Cyan",
        radius: radius * 1.11,
        tiltX: 0.76,
        tiltZ: -0.42,
        speed: -0.009,
        colorHex: 0x38bdf8, // Sky Cyan
        dotCount: 4,
        dotSize: 2.3,
      },
      {
        name: "Layer 3 - Purple",
        radius: radius * 1.16,
        tiltX: -0.82,
        tiltZ: 0.68,
        speed: 0.008,
        colorHex: 0x008c69, // electric mint
        dotCount: 4,
        dotSize: 2.2,
      },
      {
        name: "Layer 4 - Royal Blue",
        radius: radius * 1.21,
        tiltX: -0.32,
        tiltZ: -0.84,
        speed: -0.007,
        colorHex: 0x00fff0, // Cobalt Blue
        dotCount: 4,
        dotSize: 2.4,
      },
    ];

    layerConfigs.forEach((cfg) => {
      // 1. Orbital Plane Group
      const planeGroup = new THREE.Group();
      planeGroup.rotation.set(cfg.tiltX, 0, cfg.tiltZ);

      // 2. Blueprint Orbital Guide Track
      const trackSegments = 96;
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
        color: cfg.colorHex,
        transparent: true,
        opacity: 0.2,
      });
      planeGroup.add(new THREE.Line(trackGeo, trackMat));
      layerDisposables.push({ geo: trackGeo, mat: trackMat });

      // 3. Rotator Group
      const layerRotator = new THREE.Group();

      const particleGeo = new THREE.SphereGeometry(cfg.dotSize, 14, 14);
      const particleMat = new THREE.MeshBasicMaterial({ color: cfg.colorHex });

      const haloGeo = new THREE.SphereGeometry(cfg.dotSize * 1.8, 14, 14);
      const haloMat = new THREE.MeshBasicMaterial({
        color: cfg.colorHex,
        transparent: true,
        opacity: 0.28,
        blending: THREE.AdditiveBlending,
      });

      layerDisposables.push(
        { geo: particleGeo, mat: particleMat },
        { geo: haloGeo, mat: haloMat }
      );

      for (let i = 0; i < cfg.dotCount; i++) {
        const angle = (i / cfg.dotCount) * Math.PI * 2;
        const particleMesh = new THREE.Mesh(particleGeo, particleMat);
        particleMesh.position.set(
          cfg.radius * Math.cos(angle),
          0,
          cfg.radius * Math.sin(angle)
        );

        const haloMesh = new THREE.Mesh(haloGeo, haloMat);
        particleMesh.add(haloMesh);

        layerRotator.add(particleMesh);
      }

      planeGroup.add(layerRotator);
      rootGroup.add(planeGroup);

      orbitalLayers.push({ rotator: layerRotator, speed: cfg.speed });
    });

    // 11. Interactive Drag / Swipe Dynamics
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

    // 12. Deprecation-Free Animation Loop (No THREE.Clock, No NaN on bootstrap)
    let animationFrameId: number;

    const animate = (time: number) => {
      animationFrameId = requestAnimationFrame(animate);
      const elapsed = (time || performance.now()) * 0.001;

      // Idle planet rotation with drag inertia damping
      if (!isDragging) {
        rootGroup.rotation.y += 0.0016;
        velocityX *= 0.95;
        velocityY *= 0.95;
        rootGroup.rotation.y += velocityX;
        rootGroup.rotation.x += velocityY;
      }

      // Revolve each orbital layer around its exclusive plane
      for (let i = 0; i < orbitalLayers.length; i++) {
        orbitalLayers[i].rotator.rotation.y += orbitalLayers[i].speed;
      }

      // Slide data packets across global trajectory arcs
      arcPackets.forEach((packet, idx) => {
        const t = (elapsed * 0.35 + idx * 0.2) % 1;
        const pos = arcCurves[idx].getPoint(t);
        packet.position.copy(pos);
      });

      renderer.render(scene, camera);
    };

    // Bootstrap loop using high-precision browser timestamp
    animationFrameId = requestAnimationFrame(animate);

    // Clean teardown preventing React/Turbopack memory leaks
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
      rimGeo.dispose();
      rimMat.dispose();
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

      if (mapTexture) {
        mapTexture.dispose();
      }

      arcLines.forEach((line) => {
        line.geometry.dispose();
        (line.material as THREE.Material).dispose();
      });

      layerDisposables.forEach(({ geo, mat }) => {
        geo.dispose();
        mat.dispose();
      });

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