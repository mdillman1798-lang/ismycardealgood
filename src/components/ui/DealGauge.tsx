'use client';

import { useState, useEffect } from 'react';

interface DealGaugeProps {
  tone: 'green' | 'yellow' | 'red';
  label: string;
  sublabel?: string;
}

// 5-zone scale from left (Poor) to right (Excellent)
// Arc is the upper semicircle: 270° → 450° clockwise on screen
const ZONES = [
  { color: '#ef4444', dimColor: '#ef444428', label: 'Poor'      },
  { color: '#f97316', dimColor: '#f9731628', label: 'Weak'      },
  { color: '#f59e0b', dimColor: '#f59e0b28', label: 'Fair'      },
  { color: '#84cc16', dimColor: '#84cc1628', label: 'Good'      },
  { color: '#10b981', dimColor: '#10b98128', label: 'Excellent' },
];

// 'red' → zone 0, 'yellow' → zone 2, 'green' → zone 4
const TONE_ZONE: Record<'green' | 'yellow' | 'red', number> = {
  red: 0, yellow: 2, green: 4,
};

const TONE_DISPLAY: Record<'green' | 'yellow' | 'red', string> = {
  green: 'Excellent Deal', yellow: 'Fair Deal', red: 'Poor Deal',
};

const ARC_START  = 270; // left (9 o'clock)
const ARC_END    = 450; // right (3 o'clock), going clockwise through top
const ZONE_COUNT = 5;
const RAW_ZONE   = (ARC_END - ARC_START) / ZONE_COUNT; // 36° each
const GAP        = 2;   // degrees gap between segments

// Clock-angle convention: 0° = top, increases clockwise
function toXY(deg: number, r: number, cx: number, cy: number) {
  const rad = (deg * Math.PI) / 180;
  return { x: cx + r * Math.sin(rad), y: cy - r * Math.cos(rad) };
}

function segPath(startDeg: number, endDeg: number, r: number, cx: number, cy: number) {
  const s = toXY(startDeg, r, cx, cy);
  const e = toXY(endDeg, r, cx, cy);
  const large = endDeg - startDeg > 180 ? 1 : 0;
  return `M ${s.x.toFixed(2)} ${s.y.toFixed(2)} A ${r} ${r} 0 ${large} 1 ${e.x.toFixed(2)} ${e.y.toFixed(2)}`;
}

export function DealGauge({ tone, label, sublabel }: DealGaugeProps) {
  const cx = 100;
  const cy = 90;
  const trackR     = 68;
  const trackStroke = 14;
  const activeIdx  = TONE_ZONE[tone];
  const activeColor = ZONES[activeIdx].color;

  // Animate needle to target on mount / tone change
  const targetAngle = ARC_START + activeIdx * RAW_ZONE + RAW_ZONE / 2;
  const [angle, setAngle] = useState(ARC_START + RAW_ZONE / 2); // start at Poor
  useEffect(() => {
    const id = requestAnimationFrame(() => setAngle(targetAngle));
    return () => cancelAnimationFrame(id);
  }, [targetAngle]);

  const needleLen = 55;
  const tip = toXY(angle, needleLen, cx, cy);

  // Outer label positions
  const labelR = trackR + trackStroke / 2 + 10;
  const labelPositions = [0, 2, 4].map((i) => {
    const mid = ARC_START + i * RAW_ZONE + RAW_ZONE / 2;
    const pos = toXY(mid, labelR, cx, cy);
    return { i, pos, isActive: i === activeIdx };
  });

  return (
    <div className="flex flex-col items-center py-3">
      <svg viewBox="0 0 200 100" className="w-56 h-auto overflow-visible" aria-hidden>
        {/* Zone arcs */}
        {ZONES.map((zone, i) => {
          const segStart = ARC_START + i * RAW_ZONE + GAP / 2;
          const segEnd   = segStart + RAW_ZONE - GAP;
          const isActive = i === activeIdx;
          return (
            <path
              key={i}
              d={segPath(segStart, segEnd, trackR, cx, cy)}
              fill="none"
              stroke={isActive ? zone.color : zone.dimColor}
              strokeWidth={trackStroke}
              strokeLinecap="round"
            />
          );
        })}

        {/* Tick marks at zone boundaries */}
        {Array.from({ length: ZONE_COUNT - 1 }, (_, i) => {
          const angle = ARC_START + (i + 1) * RAW_ZONE;
          const outer = toXY(angle, trackR + trackStroke / 2 + 2, cx, cy);
          const inner = toXY(angle, trackR - trackStroke / 2 - 2, cx, cy);
          return (
            <line key={i} x1={outer.x} y1={outer.y} x2={inner.x} y2={inner.y}
              stroke="#09090b" strokeWidth={1.5} />
          );
        })}

        {/* Zone labels: Poor (left), Fair (top), Excellent (right) */}
        {labelPositions.map(({ i, pos, isActive }) => (
          <text
            key={i}
            x={pos.x}
            y={pos.y + 3}
            textAnchor="middle"
            fontSize={6.5}
            fontFamily="system-ui"
            fontWeight={isActive ? 700 : 500}
            fill={isActive ? ZONES[i].color : `${ZONES[i].color}70`}
          >
            {ZONES[i].label}
          </text>
        ))}

        {/* Needle shadow */}
        <line x1={cx} y1={cy} x2={tip.x + 0.5} y2={tip.y + 0.5}
          stroke="#000" strokeWidth={2.5} strokeLinecap="round" opacity={0.2} />

        {/* Needle */}
        <line x1={cx} y1={cy} x2={tip.x} y2={tip.y}
          stroke={activeColor} strokeWidth={2.5} strokeLinecap="round"
          style={{ transition: 'all 0.5s cubic-bezier(0.34,1.56,0.64,1)' }}
        />

        {/* Hub */}
        <circle cx={cx} cy={cy} r={5.5} fill={activeColor} />
        <circle cx={cx} cy={cy} r={2.5} fill="#09090b" />
      </svg>

      <p className="text-base font-bold -mt-1" style={{ color: activeColor }}>
        {TONE_DISPLAY[tone]}
      </p>
      <p className="text-sm text-zinc-400 mt-0.5 text-center">{label}</p>
      {sublabel && <p className="text-xs text-zinc-500 mt-0.5 text-center">{sublabel}</p>}
    </div>
  );
}
