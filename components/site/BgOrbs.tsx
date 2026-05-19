export default function BgOrbs() {
  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      {/* Soft conic mesh */}
      <div
        className="absolute -top-40 left-1/2 h-[800px] w-[1200px] -translate-x-1/2 opacity-40 blur-3xl"
        style={{
          background:
            'conic-gradient(from 90deg at 50% 50%, rgba(124,58,237,0.35), rgba(6,182,212,0.20), rgba(79,70,229,0.30), rgba(124,58,237,0.35))',
        }}
      />
      <span
        className="absolute -left-32 -top-40 h-[520px] w-[520px] rounded-full opacity-50 blur-[90px] animate-float"
        style={{ background: '#7c3aed' }}
      />
      <span
        className="absolute right-[-140px] top-[30%] h-[460px] w-[460px] rounded-full opacity-45 blur-[90px] animate-float-rev"
        style={{ background: '#06b6d4' }}
      />
      <span
        className="absolute -bottom-40 left-[30%] h-[380px] w-[380px] rounded-full opacity-45 blur-[90px] animate-float"
        style={{ background: '#4f46e5' }}
      />
      <div className="absolute inset-0 bg-grid" />
      <div
        className="absolute inset-0 opacity-[0.08]"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='160' height='160'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/><feColorMatrix values='0 0 0 0 1  0 0 0 0 1  0 0 0 0 1  0 0 0 0.1 0'/></filter><rect width='100%' height='100%' filter='url(%23n)'/></svg>\")",
        }}
      />
    </div>
  );
}
