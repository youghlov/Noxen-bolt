import { useEffect, useRef } from 'react';

interface Props {
  visible: boolean;
}

export default function LoadingScreen({ visible }: Props) {
  const progressRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!visible) return;
    const start = performance.now();
    const duration = 2200;

    const animate = (now: number) => {
      const elapsed = now - start;
      const pct = Math.min((elapsed / duration) * 100, 100);
      if (progressRef.current) {
        progressRef.current.style.width = `${pct}%`;
      }
      if (elapsed < duration) requestAnimationFrame(animate);
    };
    requestAnimationFrame(animate);
  }, [visible]);

  if (!visible) return null;

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        background: '#0A0A0A',
        zIndex: 9999,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '48px',
      }}
    >
      <svg
        width="120"
        height="120"
        viewBox="0 0 120 120"
        style={{ animation: 'noxenMorph 2s ease-in-out infinite' }}
      >
        <defs>
          <linearGradient id="chromGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#B0B0B0" />
            <stop offset="50%" stopColor="#E0E0E0" />
            <stop offset="100%" stopColor="#B0B0B0" />
          </linearGradient>
        </defs>
        <polygon
          points="60,8 112,40 112,80 60,112 8,80 8,40"
          fill="none"
          stroke="url(#chromGrad)"
          strokeWidth="1.5"
          style={{ animation: 'noxenRotate 4s linear infinite' }}
          strokeDasharray="300"
          strokeDashoffset="0"
        />
        <polygon
          points="60,22 98,44 98,76 60,98 22,76 22,44"
          fill="none"
          stroke="url(#chromGrad)"
          strokeWidth="1"
          opacity="0.4"
          style={{ animation: 'noxenRotate 4s linear infinite reverse' }}
        />
        <text
          x="60"
          y="66"
          textAnchor="middle"
          fill="url(#chromGrad)"
          fontFamily="'Inter', 'Arial Narrow', sans-serif"
          fontWeight="700"
          fontSize="22"
          letterSpacing="4"
        >
          NX
        </text>
      </svg>

      <div style={{ width: '240px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
        <div
          style={{
            height: '1px',
            background: '#1a1a1a',
            borderRadius: '1px',
            overflow: 'hidden',
          }}
        >
          <div
            ref={progressRef}
            style={{
              height: '100%',
              width: '0%',
              background: 'linear-gradient(90deg, #B0B0B0, #E0E0E0)',
              transition: 'width 0.05s linear',
            }}
          />
        </div>
        <span
          style={{
            fontFamily: "'Space Grotesk', 'Arial', sans-serif",
            fontSize: '10px',
            letterSpacing: '4px',
            color: '#4a4a4a',
            textTransform: 'uppercase',
          }}
        >
          Initialising Experience
        </span>
      </div>

      <style>{`
        @keyframes noxenRotate {
          from { transform-origin: 60px 60px; transform: rotate(0deg); }
          to   { transform-origin: 60px 60px; transform: rotate(360deg); }
        }
        @keyframes noxenMorph {
          0%,100% { opacity: 1; }
          50% { opacity: 0.7; }
        }
      `}</style>
    </div>
  );
}
