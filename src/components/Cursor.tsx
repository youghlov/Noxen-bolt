import { useEffect, useRef } from 'react';

export default function Cursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const trailRef = useRef<HTMLDivElement>(null);
  const mouse = useRef({ x: 0, y: 0 });
  const trail = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      mouse.current = { x: e.clientX, y: e.clientY };
      if (dotRef.current) {
        dotRef.current.style.transform = `translate(${e.clientX - 4}px, ${e.clientY - 4}px)`;
      }
    };
    window.addEventListener('mousemove', onMove);

    let raf: number;
    const loop = () => {
      trail.current.x += (mouse.current.x - trail.current.x) * 0.1;
      trail.current.y += (mouse.current.y - trail.current.y) * 0.1;
      if (trailRef.current) {
        trailRef.current.style.transform = `translate(${trail.current.x - 16}px, ${trail.current.y - 16}px)`;
      }
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);

    return () => {
      window.removeEventListener('mousemove', onMove);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <>
      <div
        ref={dotRef}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '8px',
          height: '8px',
          borderRadius: '50%',
          background: 'linear-gradient(135deg, #B0B0B0, #E0E0E0)',
          pointerEvents: 'none',
          zIndex: 9998,
          willChange: 'transform',
        }}
      />
      <div
        ref={trailRef}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '32px',
          height: '32px',
          borderRadius: '50%',
          border: '1px solid rgba(176,176,176,0.3)',
          pointerEvents: 'none',
          zIndex: 9997,
          willChange: 'transform',
        }}
      />
    </>
  );
}
