'use client';

import { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { RoomEnvironment } from 'three/addons/environments/RoomEnvironment.js';
import { useMotionPreference } from './motion-provider';
import { CorePoster } from './core-poster';

/** One bounded, visibility-aware renderer. Geometry, environment and RAF are owned here. */
export default function SignalCore({ mode }: { mode: 'form' | 'signal' }) {
  const host = useRef<HTMLDivElement>(null);
  const { paused } = useMotionPreference();
  const current = useRef({ paused, mode });
  const wake = useRef<(() => void) | null>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => { current.current = { paused, mode }; wake.current?.(); }, [paused, mode]);

  useEffect(() => {
    const element = host.current;
    if (!element) return;
    const mobile = window.matchMedia('(max-width: 700px)').matches;
    let renderer: THREE.WebGLRenderer;
    try { renderer = new THREE.WebGLRenderer({ antialias: !mobile, alpha: true, powerPreference: 'low-power' }); }
    catch { return; }
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, mobile ? 1 : 1.25));
    renderer.setClearColor(0x000000, 0);
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.35;
    element.appendChild(renderer.domElement);

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(36, 1, 0.1, 60);
    camera.position.set(0, 0, 9.5);
    const pmrem = new THREE.PMREMGenerator(renderer);
    const room = new RoomEnvironment();
    const environment = pmrem.fromScene(room, 0.035);
    scene.environment = environment.texture;
    room.dispose();
    pmrem.dispose();

    const group = new THREE.Group();
    group.scale.setScalar(0.87);
    group.rotation.set(0.32, -0.25, -0.52);
    scene.add(group);
    const geometry = new THREE.TorusKnotGeometry(1.36, 0.33, mobile ? 160 : 260, mobile ? 20 : 32, 2, 3);
    const material = new THREE.MeshPhysicalMaterial({ color: '#afa4e3', metalness: 1, roughness: 0.21, clearcoat: 1, clearcoatRoughness: 0.15, iridescence: 0.75, iridescenceIOR: 1.6, iridescenceThicknessRange: [180, 400] });
    const knot = new THREE.Mesh(geometry, material);
    group.add(knot);
    const wireSource = new THREE.TorusKnotGeometry(1.36, 0.334, 110, 12, 2, 3);
    const wire = new THREE.LineSegments(new THREE.WireframeGeometry(wireSource), new THREE.LineBasicMaterial({ color: '#beadff', transparent: true, opacity: 0, depthWrite: false }));
    wire.visible = false;
    wireSource.dispose();
    group.add(wire);

    const coreGeometry = new THREE.IcosahedronGeometry(0.58, 2);
    const coreMaterial = new THREE.MeshPhysicalMaterial({ color: '#161820', metalness: 0.97, roughness: 0.13, flatShading: true, clearcoat: 1 });
    const core = new THREE.Mesh(coreGeometry, coreMaterial);
    group.add(core);
    const coreEdges = new THREE.LineSegments(new THREE.EdgesGeometry(coreGeometry), new THREE.LineBasicMaterial({ color: '#b2fae5', transparent: true, opacity: 0.25 }));
    core.add(coreEdges);

    const rings: THREE.Group[] = [];
    for (let i = 0; i < 3; i++) {
      const orbit = new THREE.Group();
      orbit.rotation.set(i * 0.9 + 0.7, i * 0.6, i * 0.45);
      const points = Array.from({ length: 161 }, (_, n) => { const angle = n / 160 * Math.PI * 2; return new THREE.Vector3(Math.cos(angle) * (2.25 + i * 0.15), Math.sin(angle) * (2.25 + i * 0.15), 0); });
      const line = new THREE.Line(new THREE.BufferGeometry().setFromPoints(points), new THREE.LineBasicMaterial({ color: i === 1 ? '#adecd9' : '#a994ee', transparent: true, opacity: 0.2 }));
      const node = new THREE.Mesh(new THREE.SphereGeometry(0.037, 10, 10), new THREE.MeshBasicMaterial({ color: i === 1 ? '#b1ffec' : '#d0bfff' }));
      node.position.x = 2.25 + i * 0.15;
      orbit.add(line, node);
      group.add(orbit); rings.push(orbit);
    }

    // A deterministic spherical point distribution avoids hydration and random-seed drift.
    const count = mobile ? 110 : 240;
    const coordinates = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const theta = i * 2.3999632297;
      const y = 1 - (i / (count - 1)) * 2;
      const r = Math.sqrt(1 - y * y);
      const spread = 3.1 + (i % 7) * 0.19;
      coordinates.set([Math.cos(theta) * r * spread, y * spread, Math.sin(theta) * r * spread], i * 3);
    }
    const particlesGeometry = new THREE.BufferGeometry();
    particlesGeometry.setAttribute('position', new THREE.BufferAttribute(coordinates, 3));
    const particles = new THREE.Points(particlesGeometry, new THREE.PointsMaterial({ color: '#a49fc5', size: 0.017, transparent: true, opacity: 0.5, sizeAttenuation: true }));
    scene.add(particles);
    scene.add(new THREE.AmbientLight('#b8b2cf', 1));
    const violet = new THREE.PointLight('#a387ff', 42, 15); violet.position.set(-3, 3, 3); scene.add(violet);
    const cyan = new THREE.PointLight('#a0ffe4', 32, 15); cyan.position.set(3, -1, 3); scene.add(cyan);
    const white = new THREE.DirectionalLight('#ffffff', 3); white.position.set(1, 4, 3); scene.add(white);

    let frame = 0;
    let visible = true;
    let disposed = false;
    let last = 0;
    let time = 0;
    let signal = 0;
    let scroll = 0;
    let contextAvailable = true;
    let renderedAt = 0;
    let didRender = false;
    const pointer = { x: 0, y: 0 };
    const render = (timestamp = 0) => {
      frame = 0;
      if (disposed || !visible || document.hidden || !contextAvailable) return;
      const { paused: isPaused, mode: currentMode } = current.current;
      if (!isPaused && timestamp - renderedAt < 32) { frame = requestAnimationFrame(render); return; }
      renderedAt = timestamp;
      const dt = Math.min((timestamp - last) / 1000, 0.05);
      last = timestamp;
      if (!isPaused) time += dt;
      signal += ((currentMode === 'signal' ? 1 : 0) - signal) * (isPaused ? 1 : 0.07);
      wire.visible = signal > 0.005;
      material.transparent = true; material.opacity = 1 - signal * 0.96;
      (wire.material as THREE.LineBasicMaterial).opacity = signal * 0.6;
      if (!isPaused) {
        group.rotation.y += (pointer.x * 0.25 + time * 0.14 - group.rotation.y) * 0.025;
        group.rotation.x += (0.32 + pointer.y * 0.15 - group.rotation.x) * 0.025;
        group.rotation.z = -0.52 + Math.sin(time * 0.15) * 0.15;
        group.position.y = Math.sin(time * 0.45) * 0.09;
        particles.rotation.y = time * 0.022;
        rings.forEach((ring, i) => { ring.rotation.z = time * (0.075 + i * 0.035); });
        core.rotation.y = -time * 0.13;
        camera.position.z += (9.5 + scroll * 2 - camera.position.z) * 0.04;
        group.position.x += (scroll * 0.5 - group.position.x) * 0.04;
      }
      renderer.render(scene, camera);
      if (!didRender) { didRender = true; setReady(true); }
      if (!isPaused) frame = requestAnimationFrame(render);
    };
    const start = () => { if (!frame && !disposed && visible && !document.hidden && contextAvailable) { last = performance.now(); frame = requestAnimationFrame(render); } };
    wake.current = start;
    const resize = () => { const { width, height } = element.getBoundingClientRect(); renderer.setSize(width, height); camera.aspect = width / Math.max(height, 1); camera.updateProjectionMatrix(); start(); };
    const observer = new ResizeObserver(resize); observer.observe(element);
    const intersection = new IntersectionObserver(([entry]) => { visible = entry.isIntersecting; if (visible) start(); else { cancelAnimationFrame(frame); frame = 0; } });
    intersection.observe(element);
    const visibility = () => { if (document.hidden) { cancelAnimationFrame(frame); frame = 0; } else start(); };
    const move = (event: PointerEvent) => { pointer.x = (event.clientX / innerWidth - 0.5) * 2; pointer.y = (event.clientY / innerHeight - 0.5) * 2; };
    const onScroll = () => { scroll = Math.min(window.scrollY / innerHeight, 1); };
    const contextLost = (event: Event) => { event.preventDefault(); contextAvailable = false; cancelAnimationFrame(frame); frame = 0; setReady(false); };
    const contextRestored = () => { contextAvailable = true; setReady(true); start(); };
    document.addEventListener('visibilitychange', visibility);
    if (!mobile) window.addEventListener('pointermove', move, { passive: true });
    window.addEventListener('scroll', onScroll, { passive: true });
    renderer.domElement.addEventListener('webglcontextlost', contextLost);
    renderer.domElement.addEventListener('webglcontextrestored', contextRestored);
    resize();

    return () => {
      disposed = true; wake.current = null; cancelAnimationFrame(frame);
      observer.disconnect(); intersection.disconnect();
      document.removeEventListener('visibilitychange', visibility); window.removeEventListener('pointermove', move);
      window.removeEventListener('scroll', onScroll);
      renderer.domElement.removeEventListener('webglcontextlost', contextLost);
      renderer.domElement.removeEventListener('webglcontextrestored', contextRestored);
      const geometries = new Set<THREE.BufferGeometry>(); const materials = new Set<THREE.Material>();
      scene.traverse((object) => { const mesh = object as THREE.Mesh; if (mesh.geometry) geometries.add(mesh.geometry); if (mesh.material) (Array.isArray(mesh.material) ? mesh.material : [mesh.material]).forEach((item) => materials.add(item)); });
      geometries.forEach((item) => item.dispose()); materials.forEach((item) => item.dispose());
      environment.dispose(); renderer.dispose(); renderer.domElement.remove();
    };
  }, []);

  return <div ref={host} className={`signal-core ${ready ? 'is-ready' : ''}`}><div className="core-fallback"><CorePoster mode={mode} /></div></div>;
}
