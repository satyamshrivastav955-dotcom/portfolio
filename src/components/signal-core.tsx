'use client';

import { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { RoomEnvironment } from 'three/addons/environments/RoomEnvironment.js';
import type { ArtifactMode } from '@/content/artifact';
import { useMotionPreference } from './motion-provider';
import { CorePoster } from './core-poster';

function frameGeometry() {
  const shape = new THREE.Shape();
  shape.moveTo(-1.55, -1.55);
  shape.lineTo(1.55, -1.55);
  shape.lineTo(1.55, 1.55);
  shape.lineTo(-1.55, 1.55);
  shape.closePath();
  const hole = new THREE.Path();
  hole.moveTo(-1.19, -1.19);
  hole.lineTo(-1.19, 1.19);
  hole.lineTo(1.19, 1.19);
  hole.lineTo(1.19, -1.19);
  hole.closePath();
  shape.holes.push(hole);
  const geometry = new THREE.ExtrudeGeometry(shape, { depth: 0.13, bevelEnabled: true, bevelThickness: 0.025, bevelSize: 0.025, bevelSegments: 2, steps: 1 });
  geometry.center();
  geometry.rotateX(-Math.PI / 2);
  return geometry;
}

/** A four-layer machined assembly. This component owns every GPU resource and listener. */
export default function SignalCore({ mode }: { mode: ArtifactMode }) {
  const host = useRef<HTMLDivElement>(null);
  const { paused } = useMotionPreference();
  const current = useRef({ paused, mode });
  const wake = useRef<(() => void) | null>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => { current.current = { paused, mode }; wake.current?.(); }, [paused, mode]);

  useEffect(() => {
    const element = host.current;
    if (!element) return;
    let renderer: THREE.WebGLRenderer;
    try { renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: 'low-power' }); }
    catch { return; }
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.25));
    renderer.setClearColor(0x000000, 0);
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.05;
    element.appendChild(renderer.domElement);

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(34, 1, 0.1, 50);
    camera.position.set(0, 1.6, 9.2);
    camera.lookAt(0, 0, 0);
    const pmrem = new THREE.PMREMGenerator(renderer);
    const room = new RoomEnvironment();
    const environment = pmrem.fromScene(room, 0.04);
    scene.environment = environment.texture;
    room.dispose();
    pmrem.dispose();

    const assembly = new THREE.Group();
    assembly.scale.setScalar(0.9);
    assembly.rotation.set(0.36, -0.48, -0.12);
    scene.add(assembly);

    const geometry = frameGeometry();
    const edgeGeometry = new THREE.EdgesGeometry(geometry, 25);
    const metal = new THREE.MeshPhysicalMaterial({ color: '#bfc1b9', metalness: 0.94, roughness: 0.33, clearcoat: 0.45, clearcoatRoughness: 0.3, transparent: true });
    const wireMaterial = new THREE.LineBasicMaterial({ color: '#e5e6db', transparent: true, opacity: 0.2, depthWrite: false });
    const inlayMaterial = new THREE.MeshStandardMaterial({ color: '#333a37', metalness: 0.72, roughness: 0.44, transparent: true });
    const inlayGeometry = new THREE.BoxGeometry(2.08, 0.035, 2.08);
    const detailMaterial = new THREE.LineBasicMaterial({ color: '#aeb8ae', transparent: true, opacity: 0.6 });
    const layers: THREE.Group[] = [];

    for (let index = 0; index < 4; index++) {
      const layer = new THREE.Group();
      layer.add(new THREE.Mesh(geometry, metal));
      layer.add(new THREE.LineSegments(edgeGeometry, wireMaterial));
      if (index === 0 || index === 2) layer.add(new THREE.Mesh(inlayGeometry, inlayMaterial));
      const traces: THREE.Vector3[] = [];
      for (let lane = 0; lane < 6; lane++) {
        const x = -0.84 + lane * 0.335;
        traces.push(new THREE.Vector3(x, 0.082, 1.23), new THREE.Vector3(x, 0.082, 1.46));
        traces.push(new THREE.Vector3(-1.46, 0.082, x), new THREE.Vector3(-1.23, 0.082, x));
      }
      layer.add(new THREE.LineSegments(new THREE.BufferGeometry().setFromPoints(traces), detailMaterial));
      assembly.add(layer);
      layers.push(layer);
    }

    const coreGeometry = new THREE.BoxGeometry(0.85, 0.7, 0.85);
    const coreMaterial = new THREE.MeshPhysicalMaterial({ color: '#353b37', metalness: 0.86, roughness: 0.23, clearcoat: 0.5 });
    const core = new THREE.Mesh(coreGeometry, coreMaterial);
    core.add(new THREE.LineSegments(new THREE.EdgesGeometry(coreGeometry), detailMaterial));
    assembly.add(core);

    const guidePoints: THREE.Vector3[] = [];
    for (const x of [-1.38, 1.38]) for (const z of [-1.38, 1.38]) {
      guidePoints.push(new THREE.Vector3(x, -1, z), new THREE.Vector3(x, 1, z));
    }
    const guides = new THREE.LineSegments(new THREE.BufferGeometry().setFromPoints(guidePoints), new THREE.LineDashedMaterial({ color: '#c4c8bc', transparent: true, opacity: 0.28, dashSize: 0.06, gapSize: 0.06 }));
    guides.computeLineDistances();
    assembly.add(guides);

    scene.add(new THREE.AmbientLight('#dbded5', 1.2));
    const key = new THREE.DirectionalLight('#fffaf0', 3);
    key.position.set(-3, 5, 4);
    scene.add(key);
    const fill = new THREE.PointLight('#c7d3ce', 28, 16);
    fill.position.set(3, 1, 3);
    scene.add(fill);
    const rim = new THREE.PointLight('#dcd7c7', 25, 16);
    rim.position.set(-2, -1, -3);
    scene.add(rim);

    let frame = 0;
    let visible = true;
    let disposed = false;
    let contextAvailable = true;
    let last = 0;
    let renderedAt = 0;
    let time = 0;
    let wireAmount = 0;
    let separation = 0;
    let scroll = 0;
    let didRender = false;
    const pointer = { x: 0, y: 0 };

    const render = (timestamp = 0) => {
      frame = 0;
      if (disposed || !visible || document.hidden || !contextAvailable) return;
      const { paused: isPaused, mode: appearance } = current.current;
      if (!isPaused && timestamp - renderedAt < 32) { frame = requestAnimationFrame(render); return; }
      renderedAt = timestamp;
      const delta = Math.min((timestamp - last) / 1000, 0.05);
      last = timestamp;
      if (!isPaused) time += delta;

      const easing = isPaused ? 1 : 0.085;
      wireAmount += ((appearance === 'signal' ? 1 : 0) - wireAmount) * easing;
      separation += ((appearance === 'layers' ? 1 : scroll * 0.5) - separation) * easing;
      metal.opacity = 1 - wireAmount * 0.965;
      inlayMaterial.opacity = 1 - wireAmount * 0.985;
      wireMaterial.opacity = 0.16 + wireAmount * 0.62;
      layers.forEach((layer, index) => {
        layer.position.y = (index - 1.5) * (0.43 + separation * 0.49);
        layer.position.x = (index - 1.5) * separation * 0.1;
        layer.rotation.y = (index % 2 ? 1 : -1) * (0.025 + separation * 0.06);
      });
      guides.scale.y = 0.75 + separation * 0.82;
      if (!isPaused) {
        assembly.rotation.y += (-0.48 + pointer.x * 0.22 + Math.sin(time * 0.11) * 0.14 - assembly.rotation.y) * 0.045;
        assembly.rotation.x += (0.36 + pointer.y * 0.13 + scroll * 0.15 - assembly.rotation.x) * 0.045;
        assembly.position.y = Math.sin(time * 0.45) * 0.05;
        camera.position.z += (9.2 + scroll * 1.2 - camera.position.z) * 0.045;
      }
      renderer.render(scene, camera);
      if (!didRender) { didRender = true; setReady(true); }
      if (!isPaused) frame = requestAnimationFrame(render);
    };

    const start = () => {
      if (!frame && !disposed && visible && !document.hidden && contextAvailable) {
        last = performance.now();
        frame = requestAnimationFrame(render);
      }
    };
    wake.current = start;
    const resize = () => {
      const { width, height } = element.getBoundingClientRect();
      renderer.setSize(width, height);
      camera.aspect = width / Math.max(height, 1);
      camera.updateProjectionMatrix();
      start();
    };
    const sizeObserver = new ResizeObserver(resize);
    sizeObserver.observe(element);
    const intersection = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      if (visible) start();
      else { cancelAnimationFrame(frame); frame = 0; }
    });
    intersection.observe(element);
    const visibility = () => { if (document.hidden) { cancelAnimationFrame(frame); frame = 0; } else start(); };
    const move = (event: PointerEvent) => { pointer.x = event.clientX / innerWidth * 2 - 1; pointer.y = event.clientY / innerHeight * 2 - 1; };
    const onScroll = () => { scroll = Math.min(window.scrollY / innerHeight, 1); };
    const lost = (event: Event) => { event.preventDefault(); contextAvailable = false; cancelAnimationFrame(frame); frame = 0; setReady(false); };
    const restored = () => { contextAvailable = true; didRender = false; start(); };
    document.addEventListener('visibilitychange', visibility);
    window.addEventListener('pointermove', move, { passive: true });
    window.addEventListener('scroll', onScroll, { passive: true });
    renderer.domElement.addEventListener('webglcontextlost', lost);
    renderer.domElement.addEventListener('webglcontextrestored', restored);
    resize();

    return () => {
      disposed = true;
      wake.current = null;
      cancelAnimationFrame(frame);
      sizeObserver.disconnect();
      intersection.disconnect();
      document.removeEventListener('visibilitychange', visibility);
      window.removeEventListener('pointermove', move);
      window.removeEventListener('scroll', onScroll);
      renderer.domElement.removeEventListener('webglcontextlost', lost);
      renderer.domElement.removeEventListener('webglcontextrestored', restored);
      const geometries = new Set<THREE.BufferGeometry>();
      const materials = new Set<THREE.Material>();
      scene.traverse((object) => {
        const mesh = object as THREE.Mesh;
        if (mesh.geometry) geometries.add(mesh.geometry);
        if (mesh.material) (Array.isArray(mesh.material) ? mesh.material : [mesh.material]).forEach((item) => materials.add(item));
      });
      geometries.forEach((item) => item.dispose());
      materials.forEach((item) => item.dispose());
      environment.dispose();
      renderer.dispose();
      renderer.domElement.remove();
    };
  }, []);

  return <div ref={host} className={`signal-core ${ready ? 'is-ready' : ''}`}><div className="core-fallback"><CorePoster mode={mode} /></div></div>;
}
