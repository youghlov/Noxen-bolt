import { useEffect, useRef, useState } from 'react';
import { PHeading, PText, PTag } from '@porsche-design-system/components-react';

const services = [
  {
    number: '01',
    title: 'Brand Identity',
    description: 'Strategic brand systems that command attention. From visual identity to brand language — every element crafted with precision.',
    tags: ['Strategy', 'Visual Identity', 'Guidelines'],
    icon: (
      <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
        <circle cx="16" cy="16" r="12" stroke="url(#sg1)" strokeWidth="1" />
        <circle cx="16" cy="16" r="6" stroke="url(#sg1)" strokeWidth="0.5" opacity="0.5" />
        <line x1="16" y1="4" x2="16" y2="28" stroke="url(#sg1)" strokeWidth="0.5" opacity="0.3" />
        <line x1="4" y1="16" x2="28" y2="16" stroke="url(#sg1)" strokeWidth="0.5" opacity="0.3" />
        <defs>
          <linearGradient id="sg1" x1="0" y1="0" x2="32" y2="32" gradientUnits="userSpaceOnUse">
            <stop stopColor="#B0B0B0" />
            <stop offset="1" stopColor="#E0E0E0" />
          </linearGradient>
        </defs>
      </svg>
    ),
  },
  {
    number: '02',
    title: 'Digital Design',
    description: 'UI/UX design that elevates user interaction to an art form. Interfaces that feel intuitive, look extraordinary.',
    tags: ['UI/UX', 'Prototyping', 'Systems'],
    icon: (
      <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
        <rect x="4" y="6" width="24" height="18" rx="2" stroke="url(#sg2)" strokeWidth="1" />
        <rect x="8" y="10" width="10" height="7" rx="1" stroke="url(#sg2)" strokeWidth="0.5" opacity="0.5" />
        <line x1="20" y1="11" x2="26" y2="11" stroke="url(#sg2)" strokeWidth="0.5" opacity="0.5" />
        <line x1="20" y1="14" x2="24" y2="14" stroke="url(#sg2)" strokeWidth="0.5" opacity="0.3" />
        <defs>
          <linearGradient id="sg2" x1="0" y1="0" x2="32" y2="32" gradientUnits="userSpaceOnUse">
            <stop stopColor="#B0B0B0" />
            <stop offset="1" stopColor="#E0E0E0" />
          </linearGradient>
        </defs>
      </svg>
    ),
  },
  {
    number: '03',
    title: 'Immersive Web',
    description: 'WebGL experiences, 3D environments, and interactive narratives. We build the web as it was meant to be experienced.',
    tags: ['WebGL', 'Three.js', 'Interactive'],
    icon: (
      <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
        <polygon points="16,4 28,22 4,22" stroke="url(#sg3)" strokeWidth="1" />
        <polygon points="16,10 24,22 8,22" stroke="url(#sg3)" strokeWidth="0.5" opacity="0.4" />
        <defs>
          <linearGradient id="sg3" x1="0" y1="0" x2="32" y2="32" gradientUnits="userSpaceOnUse">
            <stop stopColor="#B0B0B0" />
            <stop offset="1" stopColor="#E0E0E0" />
          </linearGradient>
        </defs>
      </svg>
    ),
  },
  {
    number: '04',
    title: 'Digital Content',
    description: 'Content strategy and creation that resonates. From editorial to social — compelling narratives at every touchpoint.',
    tags: ['Strategy', 'Copywriting', 'Social'],
    icon: (
      <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
        <rect x="6" y="4" width="20" height="24" rx="2" stroke="url(#sg4)" strokeWidth="1" />
        <line x1="10" y1="10" x2="22" y2="10" stroke="url(#sg4)" strokeWidth="0.5" opacity="0.5" />
        <line x1="10" y1="14" x2="22" y2="14" stroke="url(#sg4)" strokeWidth="0.5" opacity="0.3" />
        <line x1="10" y1="18" x2="18" y2="18" stroke="url(#sg4)" strokeWidth="0.5" opacity="0.3" />
        <defs>
          <linearGradient id="sg4" x1="0" y1="0" x2="32" y2="32" gradientUnits="userSpaceOnUse">
            <stop stopColor="#B0B0B0" />
            <stop offset="1" stopColor="#E0E0E0" />
          </linearGradient>
        </defs>
      </svg>
    ),
  },
  {
    number: '05',
    title: 'Visual Production',
    description: 'AI-assisted visual production at cinematic quality. Photography direction, CGI, motion — tech-accelerated creativity.',
    tags: ['AI-Assisted', 'CGI', 'Motion'],
    icon: (
      <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
        <circle cx="16" cy="16" r="10" stroke="url(#sg5)" strokeWidth="1" />
        <circle cx="16" cy="16" r="4" fill="url(#sg5)" opacity="0.2" />
        <line x1="16" y1="6" x2="16" y2="10" stroke="url(#sg5)" strokeWidth="1" />
        <line x1="16" y1="22" x2="16" y2="26" stroke="url(#sg5)" strokeWidth="1" />
        <line x1="6" y1="16" x2="10" y2="16" stroke="url(#sg5)" strokeWidth="1" />
        <line x1="22" y1="16" x2="26" y2="16" stroke="url(#sg5)" strokeWidth="1" />
        <defs>
          <linearGradient id="sg5" x1="0" y1="0" x2="32" y2="32" gradientUnits="userSpaceOnUse">
            <stop stopColor="#B0B0B0" />
            <stop offset="1" stopColor="#E0E0E0" />
          </linearGradient>
        </defs>
      </svg>
    ),
  },
  {
    number: '06',
    title: 'Tech Consulting',
    description: 'Future-forward technology strategy. We architect digital transformation that positions your brand ahead of tomorrow.',
    tags: ['Strategy', 'Architecture', 'AI'],
    icon: (
      <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
        <rect x="4" y="12" width="8" height="8" rx="1" stroke="url(#sg6)" strokeWidth="1" />
        <rect x="20" y="6" width="8" height="8" rx="1" stroke="url(#sg6)" strokeWidth="1" />
        <rect x="20" y="18" width="8" height="8" rx="1" stroke="url(#sg6)" strokeWidth="1" />
        <line x1="12" y1="16" x2="20" y2="10" stroke="url(#sg6)" strokeWidth="0.5" opacity="0.5" />
        <line x1="12" y1="16" x2="20" y2="22" stroke="url(#sg6)" strokeWidth="0.5" opacity="0.5" />
        <defs>
          <linearGradient id="sg6" x1="0" y1="0" x2="32" y2="32" gradientUnits="userSpaceOnUse">
            <stop stopColor="#B0B0B0" />
            <stop offset="1" stopColor="#E0E0E0" />
          </linearGradient>
        </defs>
      </svg>
    ),
  },
];

function ServiceCard({ service, index }: { service: typeof services[0]; index: number }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  const [hovered, setHovered] = useState(false);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.15 }
    );
    if (cardRef.current) obs.observe(cardRef.current);
    return () => obs.disconnect();
  }, []);

  const onMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientY - rect.top) / rect.height - 0.5) * 10;
    const y = ((e.clientX - rect.left) / rect.width - 0.5) * -10;
    setTilt({ x, y });
  };

  return (
    <div
      ref={cardRef}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => { setHovered(false); setTilt({ x: 0, y: 0 }); }}
      onMouseMove={onMouseMove}
      style={{
        background: hovered
          ? 'rgba(255,255,255,0.04)'
          : 'rgba(255,255,255,0.02)',
        border: `1px solid ${hovered ? 'rgba(176,176,176,0.15)' : 'rgba(176,176,176,0.06)'}`,
        borderRadius: '12px',
        padding: '40px 36px',
        cursor: 'default',
        backdropFilter: hovered ? 'blur(10px)' : 'none',
        transform: visible
          ? `perspective(800px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg) scale(${hovered ? 1.02 : 1})`
          : 'translateY(30px) scale(0.97)',
        opacity: visible ? 1 : 0,
        transition: `opacity 0.6s ease ${index * 0.1}s, transform 0.6s ease ${index * 0.1}s, background 0.3s ease, border-color 0.3s ease, backdrop-filter 0.3s ease`,
        boxShadow: hovered ? '0 8px 40px rgba(0,0,0,0.4), inset 0 1px 0 rgba(224,224,224,0.05)' : 'none',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Inner glow on hover */}
      {hovered && (
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            height: '1px',
            background: 'linear-gradient(90deg, transparent, rgba(224,224,224,0.15), transparent)',
            pointerEvents: 'none',
          }}
        />
      )}

      <div style={{ marginBottom: '24px', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        {service.icon}
        <span
          style={{
            fontFamily: "'Space Grotesk', 'Arial', sans-serif",
            fontSize: '11px',
            letterSpacing: '3px',
            color: 'rgba(176,176,176,0.25)',
          }}
        >
          {service.number}
        </span>
      </div>

      <PHeading size="large" theme="dark" tag="h3" style={{ marginBottom: '16px' }}>
        {service.title}
      </PHeading>

      <PText size="small" color="contrast-medium" theme="dark" style={{ marginBottom: '28px', lineHeight: '1.7' }}>
        {service.description}
      </PText>

      <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
        {service.tags.map((tag) => (
          <PTag key={tag} theme="dark" compact>
            {tag}
          </PTag>
        ))}
      </div>
    </div>
  );
}

export default function Services() {
  const headerRef = useRef<HTMLDivElement>(null);
  const [headerVisible, setHeaderVisible] = useState(false);

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setHeaderVisible(true); },
      { threshold: 0.3 }
    );
    if (headerRef.current) obs.observe(headerRef.current);
    return () => obs.disconnect();
  }, []);

  return (
    <section
      id="services"
      style={{
        padding: 'clamp(80px, 10vw, 160px) clamp(24px, 6vw, 96px)',
        background: '#0A0A0A',
        position: 'relative',
      }}
    >
      {/* Subtle background accent */}
      <div
        style={{
          position: 'absolute',
          top: '20%',
          right: '-10%',
          width: '600px',
          height: '600px',
          borderRadius: '50%',
          background: 'radial-gradient(ellipse, rgba(10,20,40,0.4) 0%, transparent 70%)',
          pointerEvents: 'none',
        }}
      />

      <div ref={headerRef} style={{ marginBottom: '80px' }}>
        <div
          style={{
            fontFamily: "'Space Grotesk', 'Arial', sans-serif",
            fontSize: '11px',
            letterSpacing: '6px',
            color: '#3a3a3a',
            textTransform: 'uppercase',
            marginBottom: '20px',
            opacity: headerVisible ? 1 : 0,
            transform: headerVisible ? 'none' : 'translateY(20px)',
            transition: 'all 0.6s ease',
          }}
        >
          What We Do
        </div>
        <PHeading
          size={{ base: 'x-large', l: 'xx-large' }}
          theme="dark"
          tag="h2"
          style={{
            opacity: headerVisible ? 1 : 0,
            transform: headerVisible ? 'none' : 'translateY(30px)',
            transition: 'all 0.6s ease 0.1s',
            maxWidth: '600px',
          }}
        >
          Services for the
          <br />
          <span
            style={{
              background: 'linear-gradient(90deg, #B0B0B0, #E0E0E0)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}
          >
            Ambitious Few
          </span>
        </PHeading>
      </div>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: '24px',
          maxWidth: '1400px',
          margin: '0 auto',
        }}
      >
        {services.map((s, i) => (
          <ServiceCard key={s.number} service={s} index={i} />
        ))}
      </div>
    </section>
  );
}
