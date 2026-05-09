import { useEffect, useRef, useState } from 'react';
import { PHeading, PText, PTag, PButtonPure } from '@porsche-design-system/components-react';

const projects = [
  {
    id: '01',
    title: 'Axiom Finance',
    category: 'Brand Identity',
    year: '2025',
    description: 'Complete brand overhaul for a fintech disruptor. Dark luxury system with precise typographic hierarchy.',
    tags: ['Branding', 'Identity'],
    accent: 'rgba(10,20,40,0.8)',
    gradient: 'linear-gradient(135deg, #121212 0%, #0A1428 100%)',
  },
  {
    id: '02',
    title: 'Meridian AR',
    category: 'Immersive Web',
    year: '2025',
    description: 'WebGL-powered augmented reality platform for luxury real estate. 3D spatial experiences in the browser.',
    tags: ['WebGL', '3D', 'AR'],
    accent: 'rgba(30,30,30,0.8)',
    gradient: 'linear-gradient(135deg, #0f0f0f 0%, #1a1a1a 100%)',
  },
  {
    id: '03',
    title: 'Nexum Health',
    category: 'Digital Design',
    year: '2024',
    description: 'Premium healthcare interface reimagined. Clinical precision meets human warmth in every pixel.',
    tags: ['UI/UX', 'Design System'],
    accent: 'rgba(15,25,20,0.8)',
    gradient: 'linear-gradient(135deg, #0a0a0a 0%, #0f1f18 100%)',
  },
  {
    id: '04',
    title: 'Vanta Studios',
    category: 'Visual Production',
    year: '2024',
    description: 'AI-assisted visual content pipeline for a global entertainment brand. 400+ assets delivered in 6 weeks.',
    tags: ['AI-Assisted', 'Motion'],
    accent: 'rgba(25,15,15,0.8)',
    gradient: 'linear-gradient(135deg, #0a0a0a 0%, #1a0f0f 100%)',
  },
  {
    id: '05',
    title: 'Zephyr Collection',
    category: 'Digital Content',
    year: '2024',
    description: 'Editorial content strategy for a luxury fashion house. Narrative-driven digital presence across all channels.',
    tags: ['Content', 'Strategy'],
    accent: 'rgba(20,20,25,0.8)',
    gradient: 'linear-gradient(135deg, #0a0a0a 0%, #14141e 100%)',
  },
];

function ProjectCard({ project, index }: { project: typeof projects[0]; index: number }) {
  const [visible, setVisible] = useState(false);
  const [hovered, setHovered] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setVisible(true); },
      { threshold: 0.1 }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        minWidth: '380px',
        height: '480px',
        borderRadius: '12px',
        background: project.gradient,
        border: `1px solid ${hovered ? 'rgba(176,176,176,0.15)' : 'rgba(176,176,176,0.05)'}`,
        position: 'relative',
        overflow: 'hidden',
        cursor: 'pointer',
        transition: `opacity 0.7s ease ${index * 0.1}s, transform 0.7s ease ${index * 0.1}s, border-color 0.3s ease, box-shadow 0.3s ease`,
        opacity: visible ? 1 : 0,
        transform: visible
          ? `translateX(0) scale(${hovered ? 1.02 : 1})`
          : 'translateX(40px)',
        boxShadow: hovered ? '0 20px 60px rgba(0,0,0,0.6)' : '0 4px 20px rgba(0,0,0,0.3)',
        flexShrink: 0,
      }}
    >
      {/* Background decorative geometry */}
      <svg
        style={{
          position: 'absolute',
          inset: 0,
          width: '100%',
          height: '100%',
          opacity: hovered ? 0.15 : 0.06,
          transition: 'opacity 0.4s ease',
        }}
        viewBox="0 0 380 480"
      >
        <defs>
          <linearGradient id={`pg${project.id}`} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#B0B0B0" />
            <stop offset="100%" stopColor="#E0E0E0" />
          </linearGradient>
        </defs>
        <circle cx="300" cy="100" r="180" fill="none" stroke={`url(#pg${project.id})`} strokeWidth="0.5" />
        <circle cx="300" cy="100" r="120" fill="none" stroke={`url(#pg${project.id})`} strokeWidth="0.5" />
        <circle cx="300" cy="100" r="60" fill="none" stroke={`url(#pg${project.id})`} strokeWidth="0.5" />
      </svg>

      {/* Mock device */}
      <div
        style={{
          position: 'absolute',
          top: '40px',
          right: '-20px',
          width: '200px',
          height: '140px',
          background: 'rgba(255,255,255,0.02)',
          border: '1px solid rgba(176,176,176,0.1)',
          borderRadius: '8px',
          transform: `rotate(-8deg) translateY(${hovered ? '-8px' : '0'}) scale(${hovered ? 1.05 : 1})`,
          transition: 'transform 0.5s cubic-bezier(0.25,0.1,0.25,1)',
          overflow: 'hidden',
        }}
      >
        <div style={{ padding: '10px', display: 'flex', gap: '4px' }}>
          {[...Array(3)].map((_, i) => (
            <div
              key={i}
              style={{
                width: '6px',
                height: '6px',
                borderRadius: '50%',
                background: `rgba(176,176,176,${0.1 + i * 0.05})`,
              }}
            />
          ))}
        </div>
        <div style={{ padding: '0 10px', display: 'flex', flexDirection: 'column', gap: '6px' }}>
          <div style={{ height: '2px', background: 'rgba(176,176,176,0.1)', borderRadius: '1px' }} />
          <div style={{ height: '2px', background: 'rgba(176,176,176,0.07)', borderRadius: '1px', width: '70%' }} />
          <div style={{ height: '40px', background: 'rgba(176,176,176,0.04)', borderRadius: '4px', marginTop: '4px' }} />
        </div>
      </div>

      {/* Content */}
      <div
        style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          padding: '32px',
          background: 'linear-gradient(to top, rgba(10,10,10,0.95) 0%, transparent 100%)',
        }}
      >
        <div style={{ display: 'flex', gap: '8px', marginBottom: '16px', flexWrap: 'wrap' }}>
          {project.tags.map((t) => (
            <PTag key={t} theme="dark" compact>{t}</PTag>
          ))}
        </div>
        <div
          style={{
            fontFamily: "'Space Grotesk', 'Arial', sans-serif",
            fontSize: '11px',
            letterSpacing: '3px',
            color: '#3a3a3a',
            textTransform: 'uppercase',
            marginBottom: '8px',
          }}
        >
          {project.category} · {project.year}
        </div>
        <PHeading size="large" theme="dark" tag="h3" style={{ marginBottom: '12px' }}>
          {project.title}
        </PHeading>
        <PText
          size="x-small"
          color="contrast-medium"
          theme="dark"
          style={{
            opacity: hovered ? 1 : 0,
            transform: hovered ? 'translateY(0)' : 'translateY(10px)',
            transition: 'all 0.3s ease',
          }}
        >
          {project.description}
        </PText>
      </div>

      {/* Project number */}
      <div
        style={{
          position: 'absolute',
          top: '28px',
          left: '32px',
          fontFamily: "'Inter', sans-serif",
          fontWeight: '700',
          fontSize: '48px',
          color: 'rgba(176,176,176,0.04)',
          letterSpacing: '-2px',
          userSelect: 'none',
        }}
      >
        {project.id}
      </div>
    </div>
  );
}

export default function Portfolio() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const [headerVisible, setHeaderVisible] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const dragStart = useRef(0);
  const scrollStart = useRef(0);

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setHeaderVisible(true); },
      { threshold: 0.3 }
    );
    if (headerRef.current) obs.observe(headerRef.current);
    return () => obs.disconnect();
  }, []);

  const onMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    dragStart.current = e.clientX;
    scrollStart.current = scrollRef.current?.scrollLeft ?? 0;
  };

  const onMouseMove = (e: React.MouseEvent) => {
    if (!isDragging || !scrollRef.current) return;
    const dx = e.clientX - dragStart.current;
    scrollRef.current.scrollLeft = scrollStart.current - dx;
  };

  const onMouseUp = () => setIsDragging(false);

  return (
    <section
      id="portfolio"
      style={{
        padding: 'clamp(80px, 10vw, 160px) 0',
        background: '#0A0A0A',
        overflow: 'hidden',
      }}
    >
      <div ref={headerRef} style={{ padding: '0 clamp(24px, 6vw, 96px)', marginBottom: '60px' }}>
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
          Selected Work
        </div>
        <div
          style={{
            display: 'flex',
            alignItems: 'flex-end',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: '24px',
          }}
        >
          <PHeading
            size={{ base: 'x-large', l: 'xx-large' }}
            theme="dark"
            tag="h2"
            style={{
              opacity: headerVisible ? 1 : 0,
              transform: headerVisible ? 'none' : 'translateY(30px)',
              transition: 'all 0.6s ease 0.1s',
            }}
          >
            Projects that
            <br />
            <span
              style={{
                background: 'linear-gradient(90deg, #B0B0B0, #E0E0E0)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}
            >
              Define Excellence
            </span>
          </PHeading>
          <PButtonPure
            theme="dark"
            icon="arrow-right"
            style={{ opacity: headerVisible ? 1 : 0, transition: 'opacity 0.6s ease 0.3s' }}
          >
            View All Work
          </PButtonPure>
        </div>
      </div>

      {/* Horizontal scroll carousel */}
      <div
        ref={scrollRef}
        onMouseDown={onMouseDown}
        onMouseMove={onMouseMove}
        onMouseUp={onMouseUp}
        onMouseLeave={onMouseUp}
        style={{
          display: 'flex',
          gap: '24px',
          padding: '0 clamp(24px, 6vw, 96px)',
          overflowX: 'auto',
          cursor: isDragging ? 'grabbing' : 'grab',
          scrollbarWidth: 'none',
          msOverflowStyle: 'none',
          userSelect: 'none',
        }}
      >
        {projects.map((p, i) => (
          <ProjectCard key={p.id} project={p} index={i} />
        ))}
        {/* Duplicate first two for infinite effect */}
        {projects.slice(0, 2).map((p, i) => (
          <ProjectCard key={`dup-${p.id}`} project={p} index={i + projects.length} />
        ))}
      </div>

      <style>{`
        div::-webkit-scrollbar { display: none; }
      `}</style>
    </section>
  );
}
