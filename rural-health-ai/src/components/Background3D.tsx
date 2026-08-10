import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';

interface Background3DProps {
  lowDataMode: boolean;
}

export const Background3D: React.FC<Background3DProps> = ({ lowDataMode }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isDegraded, setIsDegraded] = useState(false);

  useEffect(() => {
    if (lowDataMode || isDegraded || !containerRef.current) return;

    const container = containerRef.current;
    let animationFrameId: number;

    // 1. Scene, Camera, Renderer
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      60,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    camera.position.z = 28;

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    // 2. Ambient & Cosmic Point Lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.7);
    scene.add(ambientLight);

    const emeraldLight = new THREE.PointLight(0x10b981, 3.5, 60);
    emeraldLight.position.set(15, 20, 15);
    scene.add(emeraldLight);

    const cyanLight = new THREE.PointLight(0x06b6d4, 3.0, 60);
    cyanLight.position.set(-15, -20, -15);
    scene.add(cyanLight);

    const purpleLight = new THREE.PointLight(0xa855f7, 2.5, 50);
    purpleLight.position.set(0, 10, -20);
    scene.add(purpleLight);

    // 3. Cosmic Central Medical Planet / Village Matrix
    const cosmicGroup = new THREE.Group();

    // Central Wireframe Sphere
    const sphereGeo = new THREE.IcosahedronGeometry(8.5, 3);
    const sphereMat = new THREE.MeshStandardMaterial({
      color: 0x032b1d,
      emissive: 0x059669,
      emissiveIntensity: 0.5,
      wireframe: true,
      transparent: true,
      opacity: 0.3,
    });
    const planetMesh = new THREE.Mesh(sphereGeo, sphereMat);
    cosmicGroup.add(planetMesh);

    // Cosmic Particle Nebula Swarm (1200 Particles)
    const particleCount = 1200;
    const particleGeo = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);

    const cEmerald = new THREE.Color(0x10b981);
    const cCyan = new THREE.Color(0x06b6d4);
    const cGold = new THREE.Color(0xf59e0b);

    for (let i = 0; i < particleCount; i++) {
      const u = Math.random();
      const v = Math.random();
      const theta = u * 2.0 * Math.PI;
      const phi = Math.acos(2.0 * v - 1.0);
      const r = 9 + Math.random() * 14;

      positions[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      positions[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      positions[i * 3 + 2] = r * Math.cos(phi);

      const rnd = Math.random();
      const mixedColor = rnd < 0.5 ? cEmerald.clone().lerp(cCyan, rnd * 2) : cCyan.clone().lerp(cGold, (rnd - 0.5) * 2);
      colors[i * 3] = mixedColor.r;
      colors[i * 3 + 1] = mixedColor.g;
      colors[i * 3 + 2] = mixedColor.b;
    }

    particleGeo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    particleGeo.setAttribute('color', new THREE.BufferAttribute(colors, 3));

    const particleMat = new THREE.PointsMaterial({
      size: 0.28,
      vertexColors: true,
      transparent: true,
      opacity: 0.85,
    });
    const nebulaParticles = new THREE.Points(particleGeo, particleMat);
    cosmicGroup.add(nebulaParticles);

    // 4. Orbiting DNA Double Helix Geometry
    const dnaGroup = new THREE.Group();
    const dnaMat = new THREE.MeshStandardMaterial({ color: 0x34d399, emissive: 0x10b981, emissiveIntensity: 0.4 });
    const sphereSmall = new THREE.SphereGeometry(0.2, 8, 8);

    for (let i = -15; i <= 15; i += 1.2) {
      const t = i * 0.4;
      const x1 = Math.cos(t) * 2.5;
      const z1 = Math.sin(t) * 2.5;
      const x2 = -x1;
      const z2 = -z1;

      const m1 = new THREE.Mesh(sphereSmall, dnaMat);
      m1.position.set(x1, i * 0.5, z1);
      dnaGroup.add(m1);

      const m2 = new THREE.Mesh(sphereSmall, dnaMat);
      m2.position.set(x2, i * 0.5, z2);
      dnaGroup.add(m2);

      // Connecting strand bar
      const barGeo = new THREE.CylinderGeometry(0.04, 0.04, 5, 8);
      const barMesh = new THREE.Mesh(barGeo, dnaMat);
      barMesh.position.set(0, i * 0.5, 0);
      barMesh.rotation.z = Math.PI / 2;
      barMesh.rotation.y = t;
      dnaGroup.add(barMesh);
    }

    dnaGroup.position.set(-16, 0, -5);
    dnaGroup.rotation.z = Math.PI / 6;
    scene.add(dnaGroup);

    // 5. Orbit Rings around Central Planet
    const orbitRingGeo = new THREE.TorusGeometry(14, 0.08, 16, 120);
    const orbitRingMat = new THREE.MeshBasicMaterial({
      color: 0x06b6d4,
      wireframe: true,
      transparent: true,
      opacity: 0.4,
    });
    const orbitRing = new THREE.Mesh(orbitRingGeo, orbitRingMat);
    orbitRing.rotation.x = Math.PI / 3;
    cosmicGroup.add(orbitRing);

    scene.add(cosmicGroup);

    // 6. Mouse & Scroll Parallax Listeners
    let targetMouseX = 0;
    let targetMouseY = 0;
    let mouseX = 0;
    let mouseY = 0;
    let targetScrollY = 0;

    const handleMouseMove = (e: MouseEvent) => {
      targetMouseX = (e.clientX / window.innerWidth - 0.5) * 2;
      targetMouseY = (e.clientY / window.innerHeight - 0.5) * 2;
    };

    const handleScroll = () => {
      targetScrollY = window.scrollY * 0.01;
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('scroll', handleScroll);

    // 7. Window Resize Handler
    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };

    window.addEventListener('resize', handleResize);

    // 8. Animation Loop
    let lastTime = performance.now();
    let frameCount = 0;

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);

      frameCount++;
      const now = performance.now();
      if (now - lastTime >= 2000) {
        const fps = (frameCount * 1000) / (now - lastTime);
        if (fps < 20) {
          setIsDegraded(true);
        }
        frameCount = 0;
        lastTime = now;
      }

      // Rotate Cosmic Entities
      cosmicGroup.rotation.y += 0.0025;
      cosmicGroup.rotation.x += 0.0008;
      nebulaParticles.rotation.y -= 0.001;
      dnaGroup.rotation.y += 0.015;

      // Parallax Easing
      mouseX += (targetMouseX - mouseX) * 0.04;
      mouseY += (targetMouseY - mouseY) * 0.04;

      scene.rotation.y = mouseX * 0.3;
      scene.rotation.x = -mouseY * 0.2 + targetScrollY * 0.05;
      camera.position.y = -targetScrollY * 0.8;

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleResize);
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, [lowDataMode, isDegraded]);

  if (lowDataMode || isDegraded) {
    return (
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-teal-950/50 via-rural-dark to-black">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-96 h-96 bg-brand-500/10 rounded-full blur-3xl animate-pulse-glow" />
        <div className="absolute bottom-10 right-10 w-80 h-80 bg-cyan-500/10 rounded-full blur-3xl" />
      </div>
    );
  }

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 pointer-events-none z-0 transition-opacity duration-1000 opacity-90"
    />
  );
};
