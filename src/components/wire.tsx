"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

/**
 * Wireframes for the dark islands. White lines on black, fog for depth, slow
 * continuous motion. Three scenes share one renderer setup:
 *  - wave:  a grid that breathes, one lit line through it, and the six stages
 *           of a change travelling along that line as labelled points
 *  - globe: a wire sphere with three orbit rings
 *  - train: wire packages running on one pair of rails
 * Pauses when off screen, stops under reduced motion, caps DPR at 2.
 */
type Variant = "wave" | "globe" | "train";

const LINE = 0xffffff;
const ACCENT = 0xc7d4ff;
const STAGES = ["Extracted", "Proven", "Specified", "Implemented", "Re-proven", "Released"];

type Ctx = { scene: THREE.Scene; camera: THREE.PerspectiveCamera; host: HTMLDivElement };

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

const waveZ = (x: number, y: number, t: number) =>
  Math.sin(x * 0.32 + t * 0.7) * 0.9 + Math.cos(y * 0.55 - t * 0.5) * 0.6 + Math.sin((x + y) * 0.18 + t * 0.35) * 0.5;

function buildWave({ scene, camera, host }: Ctx) {
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
  const lit = new THREE.Line(rowGeo, new THREE.LineBasicMaterial({ color: ACCENT, transparent: true, opacity: 0.95 }));
  lit.rotation.copy(lines.rotation);
  lit.position.copy(lines.position);
  scene.add(lit);
  const base = grid.geometry.attributes.position as THREE.BufferAttribute;
  const n = base.count;
  // faint traffic on the other rows
  const P = 90;
  const pPos = new Float32Array(P * 3);
  const pRow = new Int16Array(P);
  const pSpeed = new Float32Array(P);
  const pPhase = new Float32Array(P);
  for (let i = 0; i < P; i++) {
    pRow[i] = Math.floor(Math.random() * (grid.rows + 1));
    pSpeed[i] = 0.04 + Math.random() * 0.05;
    pPhase[i] = Math.random();
  }
  const pGeo = new THREE.BufferGeometry();
  pGeo.setAttribute("position", new THREE.BufferAttribute(pPos, 3));
  const points = new THREE.Points(pGeo, new THREE.PointsMaterial({ color: LINE, size: 0.18, transparent: true, opacity: 0.5, sizeAttenuation: true }));
  points.rotation.copy(lines.rotation); points.position.copy(lines.position);
  scene.add(points);
  // the six stages: bright points on the lit line, each with an HTML label projected from 3D
  const stages = STAGES.map((name, i) => {
    const dot = new THREE.Mesh(new THREE.SphereGeometry(0.17, 12, 12), new THREE.MeshBasicMaterial({ color: 0xffffff, transparent: true }));
    scene.add(dot);
    const el = document.createElement("div");
    el.className = "wire-label";
    el.innerHTML = `<span class="wire-label-no">0${i + 1}</span>${name}`;
    host.appendChild(el);
    return { dot, el, offset: i / STAGES.length };
  });
  const tmp = new THREE.Vector3();
  const rowY = (row / grid.rows - 0.5) * grid.h;
  return (t: number) => {
    for (let k = 0; k < n; k++) base.setZ(k, waveZ(base.getX(k), base.getY(k), t));
    base.needsUpdate = true;
    for (let i = 0; i <= grid.cols; i++) {
      const k = row * (grid.cols + 1) + i;
      rowPos[i * 3] = base.getX(k); rowPos[i * 3 + 1] = base.getY(k); rowPos[i * 3 + 2] = base.getZ(k) + 0.02;
    }
    (rowGeo.attributes.position as THREE.BufferAttribute).needsUpdate = true;
    for (let i = 0; i < P; i++) {
      const u = (pPhase[i] + t * pSpeed[i]) % 1;
      const x = (u - 0.5) * grid.w, y = (pRow[i] / grid.rows - 0.5) * grid.h;
      pPos[i * 3] = x; pPos[i * 3 + 1] = y; pPos[i * 3 + 2] = waveZ(x, y, t) + 0.06;
    }
    (pGeo.attributes.position as THREE.BufferAttribute).needsUpdate = true;
    const w = host.clientWidth, h = host.clientHeight;
    stages.forEach(({ dot, el, offset }) => {
      const u = (offset + t * 0.028) % 1;
      const x = (u - 0.5) * grid.w;
      dot.position.set(x, rowY, waveZ(x, rowY, t) + 0.1).applyEuler(lines.rotation).add(lines.position);
      const fade = Math.min(1, Math.sin(u * Math.PI) * 2.2);
      (dot.material as THREE.MeshBasicMaterial).opacity = fade;
      tmp.copy(dot.position).project(camera);
      el.style.transform = `translate(${((tmp.x + 1) / 2) * w}px, ${((1 - tmp.y) / 2) * h}px)`;
      el.style.opacity = String(fade);
    });
  };
}

function circle(r: number, segments = 160) {
  const pts: THREE.Vector3[] = [];
  for (let i = 0; i <= segments; i++) { const a = (i / segments) * Math.PI * 2; pts.push(new THREE.Vector3(Math.cos(a) * r, Math.sin(a) * r, 0)); }
  return new THREE.BufferGeometry().setFromPoints(pts);
}

function buildGlobe({ scene }: Ctx) {
  // a calm sphere: three latitudes, four meridians, the equator lit, three orbit rings
  const group = new THREE.Group();
  const mat = new THREE.LineBasicMaterial({ color: LINE, transparent: true, opacity: 0.2 });
  const R = 6;
  for (const lat of [-Math.PI / 4, Math.PI / 4]) {
    const l = new THREE.Line(circle(Math.cos(lat) * R), mat);
    l.rotation.x = Math.PI / 2; l.position.y = Math.sin(lat) * R; group.add(l);
  }
  for (let i = 0; i < 4; i++) { const l = new THREE.Line(circle(R), mat); l.rotation.y = (i / 4) * Math.PI; group.add(l); }
  const equator = new THREE.Line(circle(R), new THREE.LineBasicMaterial({ color: ACCENT, transparent: true, opacity: 0.85 }));
  equator.rotation.x = Math.PI / 2; group.add(equator);
  // the silhouette, so the sphere reads as a solid even between meridians
  const rim = new THREE.Line(circle(R), new THREE.LineBasicMaterial({ color: LINE, transparent: true, opacity: 0.4 }));
  scene.add(rim);
  scene.add(group);
  const rings = new THREE.Group();
  const ringMat = new THREE.LineBasicMaterial({ color: LINE, transparent: true, opacity: 0.6 });
  const tilts = [[0.45, 0.1], [-0.35, 1.0], [1.0, -0.7]];
  const ringObjs = tilts.map(([a, b]) => { const l = new THREE.Line(circle(R * 1.42), ringMat); l.rotation.set(a, b, 0); rings.add(l); return l; });
  scene.add(rings);
  // three travellers, one per ring
  const dots = tilts.map(() => { const d = new THREE.Mesh(new THREE.SphereGeometry(0.2, 12, 12), new THREE.MeshBasicMaterial({ color: 0xffffff })); scene.add(d); return d; });
  return (t: number) => {
    group.rotation.y = t * 0.1; group.rotation.x = 0.3 + Math.sin(t * 0.1) * 0.06;
    rings.rotation.y = -t * 0.04;
    ringObjs.forEach((ring, i) => {
      const a = t * (0.3 + i * 0.07) + i * 2.1;
      const p = new THREE.Vector3(Math.cos(a) * R * 1.42, Math.sin(a) * R * 1.42, 0);
      p.applyEuler(ring.rotation); p.applyEuler(rings.rotation);
      dots[i].position.copy(p);
    });
  };
}

function buildTrain({ scene }: Ctx) {
  const group = new THREE.Group();
  group.rotation.y = -0.62;
  const span = 36, gap = 6, count = 6, size = 2.6, railZ = 1.7, railY = -size / 2 - 0.35;
  // two rails and their sleepers
  const railMat = new THREE.LineBasicMaterial({ color: LINE, transparent: true, opacity: 0.5 });
  for (const z of [-railZ, railZ]) {
    const g = new THREE.BufferGeometry().setFromPoints([new THREE.Vector3(-60, railY, z), new THREE.Vector3(60, railY, z)]);
    group.add(new THREE.Line(g, railMat));
  }
  const sleeperPts: THREE.Vector3[] = [];
  for (let x = -60; x <= 60; x += 2) sleeperPts.push(new THREE.Vector3(x, railY, -railZ - 0.6), new THREE.Vector3(x, railY, railZ + 0.6));
  group.add(new THREE.LineSegments(new THREE.BufferGeometry().setFromPoints(sleeperPts), new THREE.LineBasicMaterial({ color: LINE, transparent: true, opacity: 0.14 })));
  // the packages: wire boxes, one of them lit
  const edges = new THREE.EdgesGeometry(new THREE.BoxGeometry(size, size, size));
  const boxMat = new THREE.LineBasicMaterial({ color: LINE, transparent: true, opacity: 0.55 });
  const litMat = new THREE.LineBasicMaterial({ color: ACCENT, transparent: true, opacity: 0.95 });
  const boxes = Array.from({ length: count }, (_, i) => {
    const b = new THREE.LineSegments(edges, i === 0 ? litMat : boxMat);
    group.add(b);
    return b;
  });
  // the inner box of the lit package: the signed content
  const inner = new THREE.LineSegments(new THREE.EdgesGeometry(new THREE.BoxGeometry(size * 0.5, size * 0.5, size * 0.5)), new THREE.LineBasicMaterial({ color: ACCENT, transparent: true, opacity: 0.6 }));
  group.add(inner);
  scene.add(group);
  return (t: number) => {
    boxes.forEach((b, i) => {
      const x = ((i * gap + t * 2.2) % span) - span / 2;
      b.position.set(x, Math.sin(t * 1.3 + i) * 0.05, 0);
      b.rotation.y = Math.sin(t * 0.4 + i * 1.7) * 0.08;
      if (i === 0) { inner.position.copy(b.position); inner.rotation.y = t * 0.6; inner.rotation.x = t * 0.4; }
    });
    group.rotation.x = 0.08 + Math.sin(t * 0.2) * 0.03;
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
    scene.fog = new THREE.Fog(0x101010, variant === "train" ? 16 : 22, variant === "train" ? 46 : 58);
    const camera = new THREE.PerspectiveCamera(38, 1, 0.1, 200);
    if (variant === "wave") { camera.position.set(0, 8, 28); camera.lookAt(0, -1, 0); }
    if (variant === "globe") { camera.position.set(0, 2, 34); camera.lookAt(0, 0, 0); }
    if (variant === "train") { camera.position.set(2, 5, 22); camera.lookAt(0, -0.4, 0); }
    const ctx: Ctx = { scene, camera, host };
    const tick = variant === "wave" ? buildWave(ctx) : variant === "globe" ? buildGlobe(ctx) : buildTrain(ctx);

    const resize = () => {
      const w = host.clientWidth, h = host.clientHeight;
      if (!w || !h) return;
      renderer.setSize(w, h, false);
      camera.aspect = w / h; camera.updateProjectionMatrix();
    };
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(host);

    let raf = 0, visible = true;
    const t0 = performance.now();
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
      renderer.dispose(); host.replaceChildren();
    };
  }, [variant]);
  return <div ref={ref} className={`relative h-full w-full overflow-hidden ${className}`} aria-hidden="true" />;
}
