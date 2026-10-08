/**
 * One trail: a single line across the island, six nodes along it, and a pulse
 * that travels the line and lights each node as it passes. SMIL, so it ships
 * as plain SVG and loops without a script.
 */
const NODES = ["Extracted", "Proven", "Specified", "Implemented", "Re-proven", "Released"];
const W = 1200, H = 260;
const Y = 150;
const XS = NODES.map((_, i) => 100 + (i * (W - 200)) / (NODES.length - 1));
const DUR = 12;

function yAt(x: number) {
  // The curve is gentle; nodes sit on it by sampling the same cubic in three segments.
  const t = x / W;
  return Y + Math.sin(t * Math.PI * 2) * -28;
}

export function TrailLine() {
  const path = `M 0 ${Y} ` + Array.from({ length: 60 }).map((_, i) => { const x = ((i + 1) / 60) * W; return `L ${x.toFixed(1)} ${yAt(x).toFixed(1)}`; }).join(" ");
  return (
    <svg viewBox={`0 0 ${W} ${H}`} className="h-auto w-full" aria-hidden="true">
      <defs>
        <linearGradient id="trail-fade" x1="0" x2="1">
          <stop offset="0" stopColor="#fff" stopOpacity="0" />
          <stop offset="0.12" stopColor="#fff" stopOpacity="0.28" />
          <stop offset="0.88" stopColor="#fff" stopOpacity="0.28" />
          <stop offset="1" stopColor="#fff" stopOpacity="0" />
        </linearGradient>
        <radialGradient id="pulse-glow">
          <stop offset="0" stopColor="#9db4ff" stopOpacity="0.9" />
          <stop offset="1" stopColor="#9db4ff" stopOpacity="0" />
        </radialGradient>
      </defs>
      <path d={path} fill="none" stroke="url(#trail-fade)" strokeWidth="1" />
      {/* the lit segment that follows the pulse */}
      <path d={path} fill="none" stroke="#c7d4ff" strokeWidth="1.5" strokeDasharray="160 2000" strokeLinecap="round">
        <animate attributeName="stroke-dashoffset" from="160" to="-2000" dur={`${DUR}s`} repeatCount="indefinite" />
      </path>
      {NODES.map((label, i) => {
        const x = XS[i], y = yAt(x);
        const begin = (i / (NODES.length - 1)) * (DUR * 0.92);
        return (
          <g key={label}>
            <circle cx={x} cy={y} r="14" fill="none" stroke="rgb(255 255 255 / 0.12)" />
            <circle cx={x} cy={y} r="4" className="trail-node">
              <animate attributeName="fill" values="#101010;#ffffff;#ffffff;#101010" keyTimes="0;0.02;0.5;0.6" dur={`${DUR}s`} begin={`${begin.toFixed(2)}s`} repeatCount="indefinite" />
            </circle>
            <circle cx={x} cy={y} r="14" fill="none" stroke="#ffffff" strokeOpacity="0">
              <animate attributeName="r" values="4;22" dur="1.2s" begin={`${begin.toFixed(2)}s`} repeatCount="indefinite" repeatDur={`${DUR}s`} />
              <animate attributeName="stroke-opacity" values="0.5;0" dur="1.2s" begin={`${begin.toFixed(2)}s`} repeatCount="indefinite" repeatDur={`${DUR}s`} />
            </circle>
            <text x={x} y={y + 40} textAnchor="middle" className="trail-label">{label}</text>
            <text x={x} y={y - 26} textAnchor="middle" className="trail-label" fontSize="11" opacity="0.45">0{i + 1}</text>
          </g>
        );
      })}
      <circle r="18" fill="url(#pulse-glow)">
        <animateMotion dur={`${DUR}s`} repeatCount="indefinite" path={path} />
      </circle>
      <circle r="3.5" fill="#fff">
        <animateMotion dur={`${DUR}s`} repeatCount="indefinite" path={path} />
      </circle>
    </svg>
  );
}
