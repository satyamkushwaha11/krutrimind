'use client';

/**
 * Decorative animated neural-network orb for the hero.
 * Pure SVG + CSS keyframes — no JS runtime cost.
 */
export default function NeuralOrb({ className = '' }: { className?: string }) {
  // Pre-baked node positions on a unit circle for a clean look
  const nodes = [
    { x: 50, y: 12, r: 4, d: 0 },
    { x: 84, y: 30, r: 3.5, d: 0.4 },
    { x: 90, y: 60, r: 3.5, d: 0.8 },
    { x: 72, y: 86, r: 4, d: 1.2 },
    { x: 28, y: 86, r: 3.5, d: 1.6 },
    { x: 10, y: 60, r: 3.5, d: 0.2 },
    { x: 16, y: 30, r: 4, d: 0.6 },
    { x: 50, y: 50, r: 5, d: 1.0, hub: true },
    { x: 38, y: 32, r: 3, d: 1.4 },
    { x: 64, y: 70, r: 3, d: 1.8 },
  ];
  // Connections from hub (index 7) to others + a ring of outer connections
  const hub = nodes[7];
  const outer = nodes.filter((_, i) => i !== 7);

  return (
    <div className={`relative ${className}`} aria-hidden>
      <svg viewBox="0 0 100 100" className="h-full w-full">
        <defs>
          <radialGradient id="orb-bg" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="rgba(124,58,237,0.35)" />
            <stop offset="60%" stopColor="rgba(79,70,229,0.10)" />
            <stop offset="100%" stopColor="rgba(6,182,212,0)" />
          </radialGradient>
          <linearGradient id="orb-line" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#a78bfa" />
            <stop offset="100%" stopColor="#22d3ee" />
          </linearGradient>
          <filter id="orb-glow" x="-30%" y="-30%" width="160%" height="160%">
            <feGaussianBlur stdDeviation="1.2" result="b" />
            <feMerge>
              <feMergeNode in="b" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        <circle cx="50" cy="50" r="48" fill="url(#orb-bg)" />

        {/* Spokes from hub */}
        {outer.map((n, i) => (
          <line
            key={`s-${i}`}
            x1={hub.x}
            y1={hub.y}
            x2={n.x}
            y2={n.y}
            stroke="url(#orb-line)"
            strokeWidth="0.4"
            strokeOpacity="0.45"
            filter="url(#orb-glow)"
          />
        ))}
        {/* Ring */}
        {outer.map((n, i) => {
          const next = outer[(i + 1) % outer.length];
          return (
            <line
              key={`r-${i}`}
              x1={n.x}
              y1={n.y}
              x2={next.x}
              y2={next.y}
              stroke="url(#orb-line)"
              strokeWidth="0.3"
              strokeOpacity="0.25"
            />
          );
        })}

        {/* Pulses traveling from hub outward */}
        {outer.slice(0, 5).map((n, i) => (
          <circle
            key={`p-${i}`}
            r="0.9"
            fill="#22d3ee"
            filter="url(#orb-glow)"
            style={{
              animation: `pulseLine 3.6s ${i * 0.55}s linear infinite`,
              offsetPath: `path('M ${hub.x} ${hub.y} L ${n.x} ${n.y}')`,
              ['offsetRotate' as never]: '0deg',
            } as React.CSSProperties}
          />
        ))}

        {/* Nodes */}
        {nodes.map((n, i) => (
          <circle
            key={`n-${i}`}
            cx={n.x}
            cy={n.y}
            r={n.r}
            fill={n.hub ? 'url(#orb-line)' : '#a78bfa'}
            opacity={n.hub ? 1 : 0.85}
            filter="url(#orb-glow)"
            style={{ animation: `nodePulse 3.6s ${n.d}s ease-in-out infinite` }}
          />
        ))}
      </svg>

      {/* Orbiting halo */}
      <div className="pointer-events-none absolute inset-0 animate-[spin_24s_linear_infinite]">
        <div className="absolute inset-[6%] rounded-full border border-violet-400/15" />
      </div>
      <div className="pointer-events-none absolute inset-0 animate-[spin_36s_linear_infinite_reverse]">
        <div className="absolute inset-[14%] rounded-full border border-cyan-400/15" />
      </div>

      <style>{`
        @keyframes pulseLine {
          0%   { offset-distance: 0%;   opacity: 0; }
          10%  { opacity: 1; }
          90%  { opacity: 1; }
          100% { offset-distance: 100%; opacity: 0; }
        }
        @keyframes nodePulse {
          0%, 100% { transform: scale(1); }
          50%      { transform: scale(1.35); }
        }
      `}</style>
    </div>
  );
}
