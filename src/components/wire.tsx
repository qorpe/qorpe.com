"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

/**
 * Wireframes for the dark islands. White lines on black, fog for depth, slow
 * continuous motion. Three scenes share one renderer setup:
 *  - wave:  a grid that breathes, with one lit line running through it
 *  - globe: a wire sphere with three orbit rings
 *  - tunnel: hexagons receding into the dark
 * Pauses when off screen, stops under reduced motion, caps DPR at 2.
 */
type Variant = "wave" | "globe" | "tunnel";

const LINE = 0xffffff;

function gridLines(cols: number, rows: number, w: number, h: number) {
  // Positions for a (cols+1)x(rows+1) lattice and an index buffer that draws only quads (no diagonals).
  const pos: number[] = [];
  for (let j = 0; j <= rows; j++) for (let i = 0; i <= cols; i++) pos.push((i / cols - 0.5) * w, (j / rows - 0.5) * h, 0);
  const idx: number[] = [];
  const id = (i: number, j: number) => j * (cols + 1) + i;
  for (let j = 0; j <= rows; j++) for (let i = 0; i < cols; i++) idx.push(id(i, j), id(i + 1, j));
  for (let j = 0; j < rows; j++) for (let i = 0; i <= cols; i++) idx.push(id(i, j), id(i, j + 1));
  const g = new THREE.BufferGeometry();
  g.setAttribute("position", new THREE.Float32BufferAttribute(pos, 3));
  g.setIndex(idx);
  return { geometry: g, cols, rows, w, h };
}

function buildWave(scene: THREE.Scene) {
  const grid = gridLines(90, 36, 60, 24);
  const lines = new THREE.LineSegments(grid.geometry, new THREE.LineBasicMaterial({ color: LINE, transparent: true, opacity: 0.26 }));
  lines.rotation.x = -Math.PI / 2.6;
  lines.position.y = -2.5;
  scene.add(lines);
  // the one lit line: the middle row, drawn again in the accent
  const row = Math.floor(grid.rows / 2);
  const rowPos = new Float32Array((grid.cols + 1) * 3);
  const rowGeo = new THREE.BufferGeometry();
  rowGeo.setAttribute("position", new THREE.BufferAttribute(rowPos, 3));
  const lit = new THREE.Line(rowGeo, new THREE.LineBasicMaterial({ color: 0xc7d4ff, transparent: true, opacity: 0.95 }));
  lit.rotation.copy(lines.rotation);
  lit.position.copy(lines.position);
  scene.add(lit);
  const base = grid.geometry.attributes.position as THREE.BufferAttribute;
  const n = base.count;
  return (t: number) => {
    for (let k = 0; k < n; k++) {
      const x = base.getX(k), y = base.getY(k);
      const z = Math.sin(x * 0.32 + t * 0.7) * 0.9 + Math.cos(y * 0.55 - t * 0.5) * 0.6 + Math.sin((x + y) * 0.18 + t * 0.35) * 0.5;
      base.setZ(k, z);
    }
    base.needsUpdate = true;
    for (let i = 0; i <= grid.cols; i++) {
      const k = row * (grid.cols + 1) + i;
      rowPos[i * 3] = base.getX(k); rowPos[i * 3 + 1] = base.getY(k); rowPos[i * 3 + 2] = base.getZ(k) + 0.02;
    }
    (rowGeo.attributes.position as THREE.BufferAttribute).needsUpdate = true;
  };
}

function circle(r: number, segments = 160) {
  const pts: THREE.Vector3[] = [];
  for (let i = 0; i <= segments; i++) { const a = (i / segments) * Math.PI * 2; pts.push(new THREE.Vector3(Math.cos(a) * r, Math.sin(a) * r, 0)); }
  return new THREE.BufferGeometry().setFromPoints(pts);
}

function buildGlobe(scene: THREE.Scene) {
  const group = new THREE.Group();
  const mat = new THREE.LineBasicMaterial({ color: LINE, transparent: true, opacity: 0.2 });
  const R = 6;
  for (let i = 1; i < 8; i++) {
    const lat = (i / 8) * Math.PI - Math.PI / 2;
    const l = new THREE.Line(circle(Math.cos(lat) * R), mat);
    l.rotation.x = Math.PI / 2; l.position.y = Math.sin(lat) * R; group.add(l);
  }
  for (let i = 0; i < 12; i++) { const l = new THREE.Line(circle(R), mat); l.rotation.y = (i / 12) * Math.PI; group.add(l); }
  scene.add(group);
  const rings = new THREE.Group();
  const ringMat = new THREE.LineBasicMaterial({ color: LINE, transparent: true, opacity: 0.45 });
  const tilts = [[0.5, 0.2], [-0.4, 0.9], [0.9, -0.6]];
  const ringObjs = tilts.map(([a, b]) => { const l = new THREE.Line(circle(R * 1.55), ringMat); l.rotation.set(a, b, 0); rings.add(l); return l; });
  scene.add(rings);
  // three travellers, one per ring
  const dots = tilts.map(() => { const d = new THREE.Mesh(new THREE.SphereGeometry(0.16, 12, 12), new THREE.MeshBasicMaterial({ color: 0xffffff })); scene.add(d); return d; });
  return (t: number) => {
    group.rotation.y = t * 0.12; group.rotation.x = Math.sin(t * 0.1) * 0.15;
    rings.rotation.y = -t * 0.05;
    ringObjs.forEach((ring, i) => {
      const a = t * (0.35 + i * 0.08) + i * 2.1;
      const p = new THREE.Vector3(Math.cos(a) * R * 1.55, Math.sin(a) * R * 1.55, 0);
      p.applyEuler(ring.rotation); p.applyEuler(rings.rotation);
      dots[i].position.copy(p);
    });
  };
}

function hexagon(r: number) {
  const pts: THREE.Vector3[] = [];
  for (let i = 0; i <= 6; i++) { const a = (i / 6) * Math.PI * 2 + Math.PI / 6; pts.push(new THREE.Vector3(Math.cos(a) * r, Math.sin(a) * r, 0)); }
  return new THREE.BufferGeometry().setFromPoints(pts);
}

function buildTunnel(scene: THREE.Scene) {
  const group = new THREE.Group();
  const mat = new THREE.LineBasicMaterial({ color: LINE, transparent: true, opacity: 0.3 });
  const count = 14, gap = 3.2, r = 5;
  const hexes: THREE.Line[] = [];
  for (let i = 0; i < count; i++) { const h = new THREE.Line(hexagon(r), mat); h.position.z = -i * gap; group.add(h); hexes.push(h); }
  // six rails along the corners
  const railMat = new THREE.LineBasicMaterial({ color: LINE, transparent: true, opacity: 0.14 });
  for (let k = 0; k < 6; k++) {
    const a = (k / 6) * Math.PI * 2 + Math.PI / 6;
    const g = new THREE.BufferGeometry().setFromPoints([new THREE.Vector3(Math.cos(a) * r, Math.sin(a) * r, 0), new THREE.Vector3(Math.cos(a) * r, Math.sin(a) * r, -(count - 1) * gap)]);
    group.add(new THREE.Line(g, railMat));
  }
  const pulse = new THREE.Line(hexagon(r), new THREE.LineBasicMaterial({ color: 0xc7d4ff, transparent: true, opacity: 0.9 }));
  group.add(pulse);
  scene.add(group);
  return (t: number) => {
    group.rotation.z = t * 0.06;
    group.rotation.x = Math.sin(t * 0.3) * 0.06;
    group.rotation.y = Math.cos(t * 0.25) * 0.08;
    const cycle = 6, z = -((t % cycle) / cycle) * (count - 1) * gap;
    pulse.position.z = z;
    (pulse.material as THREE.LineBasicMaterial).opacity = 0.9 * (1 - (t % cycle) / cycle);
  };
}

export function Wire({ variant, className = "" }: { variant: Variant; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const host = ref.current;
    if (!host) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: "low-power" });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setClearColor(0x000000, 0);
    host.appendChild(renderer.domElement);
    renderer.domElement.style.width = "100%"; renderer.domElement.style.height = "100%"; renderer.domElement.style.display = "block";
    const scene = new THREE.Scene();
    scene.fog = new THREE.Fog(0x101010, variant === "tunnel" ? 6 : 18, variant === "tunnel" ? 42 : 48);
    const camera = new THREE.PerspectiveCamera(variant === "tunnel" ? 46 : 38, 1, 0.1, 200);
    if (variant === "wave") camera.position.set(0, 6, 22);
    if (variant === "globe") camera.position.set(0, 2, 26);
    if (variant === "tunnel") camera.position.set(0, 0, 17);
    camera.lookAt(0, variant === "wave" ? -1 : 0, variant === "tunnel" ? -20 : 0);
    const tick = variant === "wave" ? buildWave(scene) : variant === "globe" ? buildGlobe(scene) : buildTunnel(scene);

    const resize = () => {
      const w = host.clientWidth, h = host.clientHeight;
      if (!w || !h) return;
      renderer.setSize(w, h, false);
      camera.aspect = w / h; camera.updateProjectionMatrix();
    };
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(host);

    let raf = 0, visible = true, t0 = performance.now();
    const io = new IntersectionObserver((es) => { visible = es.some((e) => e.isIntersecting); if (visible) loop(); }, { threshold: 0.05 });
    io.observe(host);
    const loop = () => {
      cancelAnimationFrame(raf);
      const t = (performance.now() - t0) / 1000;
      tick(reduce ? 0 : t);
      renderer.render(scene, camera);
      if (!reduce && visible) raf = requestAnimationFrame(loop);
    };
    loop();
    return () => {
      cancelAnimationFrame(raf); ro.disconnect(); io.disconnect();
      renderer.dispose(); host.removeChild(renderer.domElement);
    };
  }, [variant]);
  return <div ref={ref} className={`h-full w-full ${className}`} aria-hidden="true" />;
}
