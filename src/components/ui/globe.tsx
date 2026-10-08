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

    // Flush stale DOM nodes inside mount to prevent WebGL context collision
    while (mount.firstChild) {
      mount.removeChild(mount.firstChild);
    }

    const width = mount.clientWidth || 500;
    const height = mount.clientHeight || 500;
    const isDarkInitial = document.documentElement.classList.contains("dark");

    // Palette Configurations
    const PALETTE = {
      // 1. Color-Locked Dark Theme
      dark: {
        ocean: 0x040404,        // Obsidian
        land: 0x00c896,         // Electric Mint
        core: 0x040404,
        rim: 0xffffff,
        rimOpacity: 0.55,
        atmoColor: 0x00c896,
        atmoIntensity: 0.32,
        atmoPower: 2.8,
        gridColor: 0x222222,
        gridOpacity: 0.45,
        geodesic: 0x00c896,
        geodesicOpacity: 0.1,
        beacons: 0x00c896,
        arcs: 0x00c896,
        arcOpacity: 0.32,
        packets: 0x5eead4,
        layers: [
          { color: 0x00c896, opacity: 0.28, trackOpacity: 0.2 }, // Mint
          { color: 0x38bdf8, opacity: 0.28, trackOpacity: 0.2 }, // Cyan
          { color: 0x008c69, opacity: 0.28, trackOpacity: 0.2 }, // Electric Mint Variant
          { color: 0x00fff0, opacity: 0.28, trackOpacity: 0.2 }, // Cobalt
        ],
      },
      // 2. Executive Architectural Light Theme
      light: {
        ocean: 0xf4f3ee,        // Warm Whitesmoke / Fine Wheat Alabaster
        land: 0x008763,         // Technical Emerald (#008763)
        core: 0xf4f3ee,
        rim: 0x008763,
        rimOpacity: 0.28,
        atmoColor: 0x008763,
        atmoIntensity: 0.14,
        atmoPower: 2.5,
        gridColor: 0xd4d2ca,    // Subtle Architectural Pencil Drafting Line
        gridOpacity: 0.45,
        geodesic: 0x008763,
        geodesicOpacity: 0.08,
        beacons: 0x008763,
        arcs: 0x008763,
        arcOpacity: 0.35,
        packets: 0x005c43,      // Deep Forest Emerald Gliding Data Packet
        layers: [
          { color: 0x008763, opacity: 0.28, trackOpacity: 0.2 },  // Technical Emerald
          { color: 0x005c43, opacity: 0.28, trackOpacity: 0.2 },  // Deep Forest Emerald
          { color: 0x2d6a4f, opacity: 0.28, trackOpacity: 0.2 },  // Muted Pine
          { color: 0x40916c, opacity: 0.28, trackOpacity: 0.2 },  // Sage Mineral
        ],
      },
    };

    const currentPalette = isDarkInitial ? PALETTE.dark : PALETTE.light;

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

    const rootGroup = new THREE.Group();
    scene.add(rootGroup);

    const radius = 82;

    // 2. Solid Inner Core Sphere
    const coreGeo = new THREE.SphereGeometry(radius * 0.985, 48, 48);
    const coreMat = new THREE.MeshBasicMaterial({
      color: currentPalette.core,
      transparent: false,
    });
    const coreMesh = new THREE.Mesh(coreGeo, coreMat);
    rootGroup.add(coreMesh);

    // 3. Camera-Facing Planetary Silhouette Rim
    const rimGeo = new THREE.RingGeometry(radius * 1.006, radius * 1.018, 128);
    const rimMat = new THREE.MeshBasicMaterial({
      color: currentPalette.rim,
      transparent: true,
      opacity: currentPalette.rimOpacity,
      side: THREE.DoubleSide,
    });
    const rimMesh = new THREE.Mesh(rimGeo, rimMat);
    scene.add(rimMesh);

    // 4. Atmospheric Fresnel Edge Glow
    const atmosphereGeo = new THREE.SphereGeometry(radius * 1.025, 48, 48);
    const atmosphereMat = new THREE.ShaderMaterial({
      transparent: true,
      blending: isDarkInitial ? THREE.AdditiveBlending : THREE.NormalBlending,
      side: THREE.BackSide,
      uniforms: {
        uColor: { value: new THREE.Color(currentPalette.atmoColor) },
        uPower: { value: currentPalette.atmoPower },
        uIntensity: { value: currentPalette.atmoIntensity },
      },
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
        uniform vec3 uColor;
        uniform float uPower;
        uniform float uIntensity;

        varying vec3 vNormal;
        varying vec3 vPosition;
        void main() {
          vec3 viewDir = normalize(-vPosition);
          float rim = 1.0 - max(dot(viewDir, vNormal), 0.0);
          rim = pow(rim, uPower);
          gl_FragColor = vec4(uColor, rim * uIntensity);
        }
      `,
    });
    const atmosphereMesh = new THREE.Mesh(atmosphereGeo, atmosphereMat);
    rootGroup.add(atmosphereMesh);

    // 5. Masked Continent & Ocean Shader (World Map Mask)
    const defaultPlaceholderTex = new THREE.DataTexture(
      new Uint8Array([0, 0, 0, 255]),
      1,
      1
    );
    defaultPlaceholderTex.needsUpdate = true;

    const mapGeo = new THREE.SphereGeometry(radius, 64, 64);
    const mapMat = new THREE.ShaderMaterial({
      transparent: false,
      uniforms: {
        uMap: { value: defaultPlaceholderTex },
        uOceanColor: { value: new THREE.Color(currentPalette.ocean) },
        uLandColor: { value: new THREE.Color(currentPalette.land) },
      },
      vertexShader: `
        varying vec2 vUv;
        void main() {
          vUv = uv;
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `,
      fragmentShader: `
        uniform sampler2D uMap;
        uniform vec3 uOceanColor;
        uniform vec3 uLandColor;
        varying vec2 vUv;

        void main() {
          vec4 texColor = texture2D(uMap, vUv);
          // Red channel defines continents (1.0) vs oceans (0.0)
          float isLand = smoothstep(0.2, 0.55, texColor.r);
          vec3 finalColor = mix(uOceanColor, uLandColor, isLand);
          gl_FragColor = vec4(finalColor, 1.0);
        }
      `,
    });

    const mapMesh = new THREE.Mesh(mapGeo, mapMat);
    rootGroup.add(mapMesh);

    const textureLoader = new THREE.TextureLoader();
    let mapTexture: THREE.Texture | null = null;

    textureLoader.load(
      "/world-map.png",
      (texture) => {
        mapTexture = texture;
        texture.wrapS = THREE.RepeatWrapping;
        texture.wrapT = THREE.ClampToEdgeWrapping;
        mapMat.uniforms.uMap.value = texture;
        mapMat.needsUpdate = true;
        setIsLoaded(true);
      },
      undefined,
      () => setIsLoaded(true)
    );

    // 6. Architectural Latitude & Longitude Wireframe Grid
    const latLongGeo = new THREE.SphereGeometry(radius * 1.002, 24, 16);
    const latLongMat = new THREE.MeshBasicMaterial({
      color: currentPalette.gridColor,
      wireframe: true,
      transparent: true,
      opacity: currentPalette.gridOpacity,
    });
    const latLongMesh = new THREE.Mesh(latLongGeo, latLongMat);
    rootGroup.add(latLongMesh);

    // 7. Geodesic Icosahedron Structural Facet Shell
    const geodesicGeo = new THREE.IcosahedronGeometry(radius * 1.012, 2);
    const geodesicMat = new THREE.MeshBasicMaterial({
      color: currentPalette.geodesic,
      wireframe: true,
      transparent: true,
      opacity: currentPalette.geodesicOpacity,
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
    const beaconMat = new THREE.MeshBasicMaterial({
      color: currentPalette.beacons,
    });

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
    const arcLineMats: THREE.LineBasicMaterial[] = [];

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
        color: currentPalette.arcs,
        transparent: true,
        opacity: currentPalette.arcOpacity,
      });
      arcLineMats.push(curveMat);

      const line = new THREE.Line(curveGeo, curveMat);
      arcLines.push(line);
      rootGroup.add(line);
    });

    const packetGeo = new THREE.SphereGeometry(1.3, 8, 8);
    const packetMat = new THREE.MeshBasicMaterial({
      color: currentPalette.packets,
    });
    const arcPackets = arcCurves.map(() => {
      const packet = new THREE.Mesh(packetGeo, packetMat);
      rootGroup.add(packet);
      return packet;
    });

    // 10. Multi-Layer Orbital Satellite Engine
    interface OrbitalLayer {
      rotator: THREE.Group;
      speed: number;
    }

    interface LayerMaterialRef {
      trackMat: THREE.LineBasicMaterial;
      particleMat: THREE.MeshBasicMaterial;
      haloMat: THREE.MeshBasicMaterial;
      layerIndex: number;
    }

    const orbitalLayers: OrbitalLayer[] = [];
    const layerMaterialRefs: LayerMaterialRef[] = [];
    const layerDisposables: { geo: THREE.BufferGeometry; mat: THREE.Material }[] = [];

    const layerConfigs = [
      {
        radius: radius * 1.06,
        tiltX: 0.28,
        tiltZ: 0.12,
        speed: 0.012,
        dotCount: 5,
        dotSize: 2.1,
      },
      {
        radius: radius * 1.11,
        tiltX: 0.76,
        tiltZ: -0.42,
        speed: -0.009,
        dotCount: 4,
        dotSize: 2.3,
      },
      {
        radius: radius * 1.16,
        tiltX: -0.82,
        tiltZ: 0.68,
        speed: 0.008,
        dotCount: 4,
        dotSize: 2.2,
      },
      {
        radius: radius * 1.21,
        tiltX: -0.32,
        tiltZ: -0.84,
        speed: -0.007,
        dotCount: 4,
        dotSize: 2.4,
      },
    ];

    layerConfigs.forEach((cfg, idx) => {
      const layerPalette = currentPalette.layers[idx];

      const planeGroup = new THREE.Group();
      planeGroup.rotation.set(cfg.tiltX, 0, cfg.tiltZ);

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
        color: layerPalette.color,
        transparent: true,
        opacity: layerPalette.trackOpacity,
      });
      planeGroup.add(new THREE.Line(trackGeo, trackMat));
      layerDisposables.push({ geo: trackGeo, mat: trackMat });

      const layerRotator = new THREE.Group();
      const particleGeo = new THREE.SphereGeometry(cfg.dotSize, 14, 14);
      const particleMat = new THREE.MeshBasicMaterial({
        color: layerPalette.color,
      });

      const haloGeo = new THREE.SphereGeometry(cfg.dotSize * 1.8, 14, 14);
      const haloMat = new THREE.MeshBasicMaterial({
        color: layerPalette.color,
        transparent: true,
        opacity: layerPalette.opacity,
        blending: isDarkInitial ? THREE.AdditiveBlending : THREE.NormalBlending,
      });

      layerMaterialRefs.push({
        trackMat,
        particleMat,
        haloMat,
        layerIndex: idx,
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

    // 11. Real-Time Dynamic Theme Sync
    const applyTheme = (isDark: boolean) => {
      const palette = isDark ? PALETTE.dark : PALETTE.light;

      // Core Sphere
      coreMat.color.setHex(palette.core);

      // Continent & Ocean Mask Shader
      mapMat.uniforms.uOceanColor.value.setHex(palette.ocean);
      mapMat.uniforms.uLandColor.value.setHex(palette.land);
      mapMat.needsUpdate = true;

      // Silhouette Rim
      rimMat.color.setHex(palette.rim);
      rimMat.opacity = palette.rimOpacity;

      // Atmospheric Glow
      atmosphereMat.uniforms.uColor.value.setHex(palette.atmoColor);
      atmosphereMat.uniforms.uPower.value = palette.atmoPower;
      atmosphereMat.uniforms.uIntensity.value = palette.atmoIntensity;
      atmosphereMat.blending = isDark ? THREE.AdditiveBlending : THREE.NormalBlending;
      atmosphereMat.needsUpdate = true;

      // Latitude/Longitude Blueprint Lines
      latLongMat.color.setHex(palette.gridColor);
      latLongMat.opacity = palette.gridOpacity;

      // Geodesic Shell
      geodesicMat.color.setHex(palette.geodesic);
      geodesicMat.opacity = palette.geodesicOpacity;

      // Infrastructure Beacons
      beaconMat.color.setHex(palette.beacons);

      // Trajectory Arcs & Packets
      arcLineMats.forEach((mat) => {
        mat.color.setHex(palette.arcs);
        mat.opacity = palette.arcOpacity;
      });
      packetMat.color.setHex(palette.packets);

      // Orbital Satellites / Particles
      layerMaterialRefs.forEach(({ trackMat, particleMat, haloMat, layerIndex }) => {
        const lp = palette.layers[layerIndex];
        trackMat.color.setHex(lp.color);
        trackMat.opacity = lp.trackOpacity;
        particleMat.color.setHex(lp.color);
        haloMat.color.setHex(lp.color);
        haloMat.blending = isDark ? THREE.AdditiveBlending : THREE.NormalBlending;
        haloMat.opacity = lp.opacity;
        haloMat.needsUpdate = true;
      });
    };

    // Watch for theme toggles on <html class="dark | ...">
    const themeObserver = new MutationObserver(() => {
      const isDark = document.documentElement.classList.contains("dark");
      applyTheme(isDark);
    });
    themeObserver.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });

    // 12. Interactive Drag / Swipe Dynamics
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

    // 13. Animation Loop
    let animationFrameId: number;

    const animate = (time: number) => {
      animationFrameId = requestAnimationFrame(animate);
      const elapsed = (time || performance.now()) * 0.001;

      if (!isDragging) {
        rootGroup.rotation.y += 0.0016;
        velocityX *= 0.95;
        velocityY *= 0.95;
        rootGroup.rotation.y += velocityX;
        rootGroup.rotation.x += velocityY;
      }

      for (let i = 0; i < orbitalLayers.length; i++) {
        orbitalLayers[i].rotator.rotation.y += orbitalLayers[i].speed;
      }

      arcPackets.forEach((packet, idx) => {
        const t = (elapsed * 0.35 + idx * 0.2) % 1;
        const pos = arcCurves[idx].getPoint(t);
        packet.position.copy(pos);
      });

      renderer.render(scene, camera);
    };

    animationFrameId = requestAnimationFrame(animate);

    // Teardown & Memory Cleanup
    return () => {
      cancelAnimationFrame(animationFrameId);
      themeObserver.disconnect();
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
      mapGeo.dispose();
      mapMat.dispose();
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

      if (mapTexture) mapTexture.dispose();
      defaultPlaceholderTex.dispose();

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
    <div
      className={`relative flex items-center justify-center cursor-grab active:cursor-grabbing ${className}`}
    >
      <div ref={mountRef} className="w-full h-full" />

      {/* Hydration-safe loading spinner */}
      {!isLoaded && (
        <div
          suppressHydrationWarning
          className="absolute inset-0 flex items-center justify-center pointer-events-none"
        >
          <div
            suppressHydrationWarning
            className="w-10 h-10 rounded-full border border-neutral-300 dark:border-[#1f1f1f] border-t-[#008763] dark:border-t-[#00c896] animate-spin"
          />
        </div>
      )}
    </div>
  );
}