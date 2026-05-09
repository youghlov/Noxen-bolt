import { useEffect, useRef, useState } from 'react';

export default function BackToTop() {
  const [visible, setVisible] = useState(false);
  const btnRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 400);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    const btn = btnRef.current;
    if (!btn) return;
    const onMove = (e: MouseEvent) => {
      const rect = btn.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      const dx = (e.clientX - cx) * 0.3;
      const dy = (e.clientY - cy) * 0.3;
      const dist = Math.sqrt(dx * dx + dy * dy);
      if (dist < 80) {
        btn.style.transform = `translate(${dx * 0.5}px, ${dy * 0.5}px) scale(1.1)`;
      }
    };
    const onLeave = () => {
      btn.style.transform = 'translate(0,0) scale(1)';
    };
    window.addEventListener('mousemove', onMove);
    btn.addEventListener('mouseleave', onLeave);
    return () => {
      window.removeEventListener('mousemove', onMove);
      btn.removeEventListener('mouseleave', onLeave);
    };
  }, []);

  return (
    <button
      ref={btnRef}
      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      aria-label="Back to top"
      style={{
        position: 'fixed',
        bottom: '40px',
        right: '40px',
        width: '48px',
        height: '48px',
        borderRadius: '50%',
        background: 'rgba(18,18,18,0.8)',
        border: '1px solid rgba(176,176,176,0.15)',
        backdropFilter: 'blur(10px)',
        cursor: 'pointer',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 900,
        opacity: visible ? 1 : 0,
        transform: visible ? 'translate(0,0) scale(1)' : 'translate(0, 20px) scale(0.8)',
        transition: 'opacity 0.3s ease, transform 0.3s ease, box-shadow 0.3s ease',
        boxShadow: '0 4px 20px rgba(0,0,0,0.4)',
        pointerEvents: visible ? 'auto' : 'none',
      }}
      onMouseEnter={(e) => {
        (e.currentTarget as HTMLButtonElement).style.boxShadow = '0 4px 20px rgba(0,0,0,0.4), 0 0 20px rgba(176,176,176,0.1)';
        (e.currentTarget as HTMLButtonElement).style.borderColor = 'rgba(176,176,176,0.3)';
      }}
      onMouseLeave={(e) => {
        (e.currentTarget as HTMLButtonElement).style.boxShadow = '0 4px 20px rgba(0,0,0,0.4)';
        (e.currentTarget as HTMLButtonElement).style.borderColor = 'rgba(176,176,176,0.15)';
      }}
    >
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
        <polyline points="3,10 8,5 13,10" stroke="#B0B0B0" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </button>
  );
}
