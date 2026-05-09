import { useEffect, useRef, useState } from 'react';
import { PButton, PIcon } from '@porsche-design-system/components-react';
import Particles from './Particles';
import HeroVideo from './HeroVideo';

const TITLE = 'Digital Experiences';

const SERVICES = [
  { icon: 'palette', label: 'Brand Identity' },
  { icon: 'edit', label: 'Digital Design' },
  { icon: 'globe', label: 'Immersive Web' },
  { icon: 'image', label: 'Visual Production' },
  { icon: 'brain', label: 'AI Integration' },
];

export default function Hero() {
  const [revealed, setRevealed] = useState<boolean[]>([]);
  const [glitch, setGlitch] = useState(false);
  const [parallaxY, setParallaxY] = useState(0);
  const heroRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLAnchorElement>(null);

  useEffect(() => {
    const chars = TITLE.split('');
    let i = 0;
    const interval = setInterval(() => {
      setRevealed((prev) => {
        const next = [...prev];
        next[i] = true;
        return next;
      });
      i++;
      if (i >= chars.length) clearInterval(interval);
    }, 55);

    const glitchInterval = setInterval(() => {
      setGlitch(true);
      setTimeout(() => setGlitch(false), 120);
    }, 4000);

    return () => {
      clearInterval(interval);
      clearInterval(glitchInterval);
    };
  }, []);

  useEffect(() => {
    const onScroll = () => {
      setParallaxY(window.scrollY * 0.35);
    };
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Magnetic CTA
  useEffect(() => {
    const btn = ctaRef.current;
    if (!btn) return;
    const onMove = (e: MouseEvent) => {
      const rect = btn.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      const dx = (e.clientX - cx) * 0.25;
      const dy = (e.clientY - cy) * 0.25;
      btn.style.transform = `translate(${dx}px, ${dy}px)`;
    };
    const onLeave = () => {
      btn.style.transform = 'translate(0,0)';
    };
    btn.addEventListener('mousemove', onMove);
    btn.addEventListener('mouseleave', onLeave);
    return () => {
      btn.removeEventListener('mousemove', onMove);
      btn.removeEventListener('mouseleave', onLeave);
    };
  }, []);

  const scrollToServices = () => {
    document.querySelector('#services')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section
      ref={heroRef}
      id="hero"
      style={{
        position: 'relative',
        height: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
        background: '#0A0A0A',
      }}
    >
      {/* Interactive video background */}
      <HeroVideo />

      {/* Top gradient overlay (black fade) */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          height: '35%',
          background: 'linear-gradient(to bottom, rgba(10,10,10,0.92) 0%, rgba(10,10,10,0.6) 50%, transparent 100%)',
          pointerEvents: 'none',
          zIndex: 2,
        }}
      />

      {/* Bottom gradient overlay (black fade) */}
      <div
        style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          height: '35%',
          background: 'linear-gradient(to top, rgba(10,10,10,0.92) 0%, rgba(10,10,10,0.6) 50%, transparent 100%)',
          pointerEvents: 'none',
          zIndex: 2,
        }}
      />

      {/* Parallax background texture overlay */}
      <div
        style={{
          position: 'absolute',
          inset: '-20%',
          backgroundImage: `
            radial-gradient(ellipse 80% 60% at 50% 40%, rgba(10,20,40,0.4) 0%, transparent 70%),
            radial-gradient(ellipse 40% 30% at 20% 60%, rgba(176,176,176,0.02) 0%, transparent 60%),
            radial-gradient(ellipse 40% 30% at 80% 30%, rgba(224,224,224,0.02) 0%, transparent 60%)
          `,
          transform: `translateY(${parallaxY * 0.5}px)`,
          transition: 'transform 0.05s linear',
          zIndex: 1,
        }}
      />

      {/* Grid lines */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          backgroundImage: `
            linear-gradient(rgba(176,176,176,0.03) 1px, transparent 1px),
            linear-gradient(90deg, rgba(176,176,176,0.03) 1px, transparent 1px)
          `,
          backgroundSize: '80px 80px',
          transform: `translateY(${parallaxY * 0.15}px)`,
          zIndex: 3,
        }}
      />

      <Particles />

      {/* Content */}
      <div
        style={{
          position: 'relative',
          zIndex: 20,
          textAlign: 'center',
          padding: '0 24px',
          transform: `translateY(${-parallaxY * 0.2}px)`,
          transition: 'transform 0.05s linear',
        }}
      >
        {/* Animated logo mark */}
        <div style={{ marginBottom: '40px', display: 'flex', justifyContent: 'center' }}>
          <svg
            width="90"
            height="90"
            viewBox="0 0 90 90"
            style={{ animation: 'heroLogoSpin 20s linear infinite' }}
          >
            <defs>
              <linearGradient id="heroGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#B0B0B0" />
                <stop offset="50%" stopColor="#E0E0E0" />
                <stop offset="100%" stopColor="#B0B0B0" />
              </linearGradient>
              <filter id="glow">
                <feGaussianBlur stdDeviation="2" result="blur" />
                <feMerge>
                  <feMergeNode in="blur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            </defs>
            <polygon
              points="45,4 86,26 86,64 45,86 4,64 4,26"
              fill="none"
              stroke="url(#heroGrad)"
              strokeWidth="1"
              filter="url(#glow)"
              opacity="0.8"
            />
            <polygon
              points="45,16 74,32 74,58 45,74 16,58 16,32"
              fill="none"
              stroke="url(#heroGrad)"
              strokeWidth="0.5"
              opacity="0.3"
              style={{ animation: 'heroLogoSpin 15s linear infinite reverse' }}
            />
            <text
              x="45"
              y="52"
              textAnchor="middle"
              fill="url(#heroGrad)"
              fontFamily="'Inter', sans-serif"
              fontWeight="700"
              fontSize="18"
              letterSpacing="3"
              filter="url(#glow)"
            >
              NX
            </text>
          </svg>
        </div>

        {/* Agency label */}
        <div
          style={{
            fontFamily: "'Space Grotesk', 'Arial', sans-serif",
            fontSize: '11px',
            letterSpacing: '6px',
            color: '#4a4a4a',
            textTransform: 'uppercase',
            marginBottom: '24px',
          }}
        >
          Noxen Digital Agency
        </div>

        {/* Main title with letter-by-letter reveal */}
        <h1
          style={{
            fontFamily: "'Inter', 'Arial Narrow', sans-serif",
            fontWeight: '700',
            fontSize: 'clamp(36px, 6vw, 96px)',
            letterSpacing: '-0.02em',
            lineHeight: '1.0',
            color: '#FAFAFA',
            margin: '0 0 32px',
            filter: glitch ? 'url(#glitch)' : 'none',
            position: 'relative',
          }}
        >
          {TITLE.split('').map((char, i) => (
            <span
              key={i}
              style={{
                display: 'inline-block',
                opacity: revealed[i] ? 1 : 0,
                transform: revealed[i] ? 'translateY(0)' : 'translateY(20px)',
                transition: 'opacity 0.4s ease, transform 0.4s ease',
                whiteSpace: char === ' ' ? 'pre' : 'normal',
                color: '#FAFAFA',
              }}
            >
              {char}
            </span>
          ))}
          {glitch && (
            <span
              style={{
                position: 'absolute',
                top: '2px',
                left: '2px',
                width: '100%',
                color: 'rgba(10,20,40,0.6)',
                clipPath: 'inset(30% 0 40% 0)',
                animation: 'none',
                pointerEvents: 'none',
              }}
            >
              {TITLE}
            </span>
          )}
        </h1>

        {/* Subtitle */}
        <p
          style={{
            fontFamily: "'Space Grotesk', 'Arial', sans-serif",
            fontSize: 'clamp(14px, 1.5vw, 18px)',
            color: '#4a4a4a',
            letterSpacing: '1px',
            marginBottom: '56px',
            maxWidth: '560px',
            margin: '0 auto 56px',
            lineHeight: 1.7,
          }}
        >
          Branding. Design. Immersive Web. Visual Production.
          <br />
          <span style={{ color: '#2a2a2a', fontSize: '0.9em' }}>
            Where technology meets luxury aesthetics.
          </span>
        </p>

        {/* CTA */}
        <a
          ref={ctaRef}
          href="#services"
          onClick={(e) => { e.preventDefault(); scrollToServices(); }}
          style={{
            display: 'inline-block',
            transition: 'transform 0.3s cubic-bezier(0.25,0.1,0.25,1)',
            marginBottom: '60px',
          }}
        >
          <PButton
            theme="dark"
            variant="primary"
            icon="arrow-head-down"
          >
            Explore Our Work
          </PButton>
        </a>

        {/* Service icons grid */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            gap: 'clamp(12px, 3vw, 28px)',
            flexWrap: 'wrap',
            marginBottom: '80px',
            maxWidth: '600px',
            margin: '0 auto 80px',
          }}
        >
          {SERVICES.map((service) => (
            <div
              key={service.label}
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '8px',
              }}
            >
              <div
                style={{
                  width: '48px',
                  height: '48px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  borderRadius: '8px',
                  border: '1px solid rgba(176,176,176,0.2)',
                  backgroundColor: 'rgba(176,176,176,0.05)',
                  transition: 'all 0.3s ease',
                  cursor: 'pointer',
                }}
                onMouseEnter={(e) => {
                  const el = e.currentTarget as HTMLElement;
                  el.style.borderColor = 'rgba(176,176,176,0.5)';
                  el.style.backgroundColor = 'rgba(176,176,176,0.15)';
                }}
                onMouseLeave={(e) => {
                  const el = e.currentTarget as HTMLElement;
                  el.style.borderColor = 'rgba(176,176,176,0.2)';
                  el.style.backgroundColor = 'rgba(176,176,176,0.05)';
                }}
              >
                <PIcon
                  name={service.icon as any}
                  theme="dark"
                  size="large"
                  aria-label={service.label}
                />
              </div>
              <span
                style={{
                  fontSize: '11px',
                  color: '#4a4a4a',
                  letterSpacing: '0.5px',
                  textTransform: 'uppercase',
                  textAlign: 'center',
                  lineHeight: 1.3,
                  maxWidth: '70px',
                }}
              >
                {service.label}
              </span>
            </div>
          ))}
        </div>

        {/* Scroll indicator */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '8px',
            opacity: 0.3,
          }}
        >
          <div
            style={{
              width: '1px',
              height: '60px',
              background: 'linear-gradient(to bottom, transparent, #B0B0B0)',
              animation: 'scrollPulse 2s ease-in-out infinite',
            }}
          />
        </div>
      </div>

      <style>{`
        @keyframes heroLogoSpin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        @keyframes scrollPulse {
          0%,100% { opacity: 0.3; transform: scaleY(1); }
          50% { opacity: 0.8; transform: scaleY(1.1); }
        }
      `}</style>
    </section>
  );
}
