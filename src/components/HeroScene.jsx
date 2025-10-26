import React, { useEffect, useRef, useState } from 'react';
import PetalCanvas from './PetalCanvas';

// A stylized SVG scene that conveys the requested composition with parallax layers
export default function HeroScene() {
  const containerRef = useRef(null);
  const [parallax, setParallax] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const onMove = (e) => {
      const rect = containerRef.current?.getBoundingClientRect();
      if (!rect) return;
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      const dx = (e.clientX - cx) / rect.width; // -0.5..0.5
      const dy = (e.clientY - cy) / rect.height;
      setParallax({ x: dx, y: dy });
    };
    window.addEventListener('mousemove', onMove);
    return () => window.removeEventListener('mousemove', onMove);
  }, []);

  const layer = (depth) => ({
    transform: `translate3d(${parallax.x * depth}px, ${parallax.y * depth}px, 0)`
  });

  return (
    <section
      id="scene"
      ref={containerRef}
      className="relative h-screen w-full overflow-hidden bg-gradient-to-b from-rose-100/0 to-slate-900"
    >
      {/* Sky gradient with warm sunset tones */}
      <div
        className="absolute inset-0"
        style={{
          background:
            'linear-gradient(180deg, rgba(255,189,99,0.55) 0%, rgba(248,140,155,0.45) 35%, rgba(20,24,38,0.85) 100%)'
        }}
      />

      {/* Volumetric light beams */}
      <div className="pointer-events-none absolute inset-x-0 top-0 z-0 flex justify-center">
        <div className="h-[120vh] w-[120vh] -translate-y-1/3 rotate-12 bg-gradient-to-br from-amber-200/20 via-amber-100/6 to-transparent blur-3xl" />
      </div>

      {/* Mount Fuji silhouette */}
      <div className="absolute inset-0 z-0" style={layer(-30)}>
        <svg viewBox="0 0 1440 900" className="h-full w-full">
          <defs>
            <linearGradient id="snow" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#ffffff" stopOpacity="0.95" />
              <stop offset="100%" stopColor="#e6eef7" stopOpacity="0.9" />
            </linearGradient>
          </defs>
          <rect width="1440" height="900" fill="transparent" />
          <g transform="translate(0, 120)">
            <path d="M0 600 L360 420 L560 340 L720 300 L880 340 L1080 420 L1440 600 L1440 900 L0 900 Z" fill="#1c2433" opacity="0.5" />
            <path d="M360 420 L720 220 L1080 420 L880 420 L720 340 L560 420 Z" fill="url(#snow)" opacity="0.8" />
          </g>
        </svg>
      </div>

      {/* Temple structure (simplified facade) */}
      <div className="absolute inset-x-0 bottom-0 z-10 flex justify-center" style={layer(-10)}>
        <svg viewBox="0 0 1200 600" className="w-[1600px] max-w-none select-none">
          <defs>
            <linearGradient id="wood" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#4a2f2a" />
              <stop offset="100%" stopColor="#2c1a17" />
            </linearGradient>
            <linearGradient id="shadow" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#000000" stopOpacity="0.35" />
              <stop offset="100%" stopColor="#000000" stopOpacity="0.0" />
            </linearGradient>
          </defs>

          {/* Base platform stones */}
          <rect x="0" y="520" width="1200" height="80" fill="#1b1f29" />
          <rect x="50" y="500" width="1100" height="40" fill="#222735" />

          {/* Pillars */}
          {Array.from({ length: 6 }).map((_, i) => (
            <rect key={i} x={160 + i * 150} y="260" width="24" height="240" fill="url(#wood)" />
          ))}

          {/* Roofs */}
          <path d="M80 260 L1120 260 L1040 220 L160 220 Z" fill="#2a2f3f" />
          <path d="M120 220 L1080 220 L1000 180 L200 180 Z" fill="#252a39" />

          {/* Central doors (interaction focal point) */}
          <g id="central-doors">
            <rect x="540" y="300" width="120" height="160" rx="4" fill="#3b1f1a" />
            <line x1="600" y1="300" x2="600" y2="460" stroke="#5b332c" strokeWidth="4" />
            {Array.from({ length: 5 }).map((_, i) => (
              <rect key={i} x={550} y={310 + i * 30} width="100" height="6" fill="#5b332c" />
            ))}
          </g>

          {/* Stone path */}
          <g>
            <path d="M580 520 L620 520 L680 600 L520 600 Z" fill="#2a2f3a" />
            <path d="M560 520 L640 520 L620 560 L580 560 Z" fill="#2f3646" opacity="0.8" />
          </g>
        </svg>
      </div>

      {/* Foreground: Sakura tree and samurai on far left */}
      <div className="absolute inset-x-0 bottom-0 z-20" style={layer(20)}>
        <svg viewBox="0 0 1200 500" className="w-[1600px] max-w-none">
          {/* Ground stones with mossy tint */}
          <rect x="0" y="460" width="1200" height="40" fill="#141821" />
          <g opacity="0.55">
            {Array.from({ length: 18 }).map((_, i) => (
              <ellipse key={i} cx={40 + i * 65} cy="475" rx="40" ry="12" fill="#2a333f" />
            ))}
          </g>

          {/* Sakura tree trunk */}
          <path d="M160 500 C170 430, 200 390, 210 340 C220 300, 250 270, 280 250 C300 235, 320 230, 340 225" stroke="#3b251d" strokeWidth="40" fill="none" strokeLinecap="round" />

          {/* Branches */}
          <path d="M260 320 C320 300, 380 280, 460 260" stroke="#3b251d" strokeWidth="20" fill="none" strokeLinecap="round" />
          <path d="M300 290 C360 270, 420 255, 520 250" stroke="#3b251d" strokeWidth="16" fill="none" strokeLinecap="round" />

          {/* Blossom canopy */}
          <g>
            {Array.from({ length: 120 }).map((_, i) => {
              const x = 260 + Math.cos(i) * (120 + (i % 20));
              const y = 240 + Math.sin(i * 1.2) * (60 + (i % 18));
              const r = 8 + ((i * 7) % 6);
              const hue = 330 + (i % 12);
              const opacity = 0.35 + ((i % 5) * 0.1);
              return (
                <circle key={i} cx={x} cy={y} r={r} fill={`hsla(${hue},80%,75%,${opacity})`} />
              );
            })}
          </g>

          {/* Samurai silhouette seated on the far left */}
          <g transform="translate(120, 430) scale(1)">
            <path d="M0 40 C20 20, 50 10, 80 15 C110 20, 130 30, 150 50 L120 55 C90 60, 50 58, 10 54 Z" fill="#0f121a" opacity="0.95" />
            {/* Upper body */}
            <path d="M70 -10 C60 -30, 85 -40, 95 -20 C105 0, 95 10, 85 5 Z" fill="#101420" />
            {/* Head */}
            <circle cx="95" cy="-25" r="12" fill="#0a0d14" />
            {/* Katana */}
            <rect x="120" y="-5" width="140" height="6" rx="3" fill="#1c2330" />
            <circle cx="120" cy="-2" r="6" fill="#3b1f1a" />
          </g>
        </svg>
      </div>

      {/* Atmospheric fine haze */}
      <div className="pointer-events-none absolute inset-0 z-10 bg-gradient-to-t from-slate-900/60 via-transparent to-transparent" />

      {/* Petal particle layer */}
      <PetalCanvas />
    </section>
  );
}
