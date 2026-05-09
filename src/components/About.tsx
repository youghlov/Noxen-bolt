import { useEffect, useRef, useState } from 'react';
import { PHeading, PText, PDivider } from '@porsche-design-system/components-react';

const milestones = [
  { year: '2019', title: 'Founded in Paris', description: 'Born from a conviction that digital aesthetics had fallen behind the luxury it was meant to represent.' },
  { year: '2020', title: 'First Major Brand', description: 'Delivered complete identity system for a global fashion house. Set the standard for what we would become.' },
  { year: '2021', title: 'Studio Expansion', description: 'Opened Amsterdam studio. Grew to 24 specialists across design, technology, and content.' },
  { year: '2022', title: 'WebGL Division', description: 'Pioneered immersive web experiences. First agency to deliver production-grade WebGL for Fortune 500 brands.' },
  { year: '2023', title: 'AI Integration', description: 'Launched tech-assisted visual production. Multiplied creative output 10x without sacrificing quality.' },
  { year: '2024', title: 'Global Presence', description: '60+ team members. Studios in Paris, Amsterdam, New York. Serving clients across 28 countries.' },
  { year: '2025', title: 'The Future', description: 'Pushing beyond screens. Spatial computing, ambient interfaces, AI co-creation. The next chapter begins.' },
];

const stats = [
  { value: '60+', label: 'Specialists' },
  { value: '28', label: 'Countries Served' },
  { value: '200+', label: 'Projects Delivered' },
  { value: '12', label: 'Awards Won' },
];

function TypewriterText({ text, trigger }: { text: string; trigger: boolean }) {
  const [displayed, setDisplayed] = useState('');

  useEffect(() => {
    if (!trigger) return;
    let i = 0;
    setDisplayed('');
    const interval = setInterval(() => {
      setDisplayed(text.slice(0, i + 1));
      i++;
      if (i >= text.length) clearInterval(interval);
    }, 30);
    return () => clearInterval(interval);
  }, [trigger, text]);

  return <>{displayed}<span style={{ opacity: trigger && displayed.length < text.length ? 1 : 0, borderRight: '2px solid #B0B0B0' }}>&nbsp;</span></>;
}

function TimelineNode({ milestone, index }: { milestone: typeof milestones[0]; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setVisible(true); },
      { threshold: 0.4 }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  const isEven = index % 2 === 0;

  return (
    <div
      ref={ref}
      style={{
        display: 'grid',
        gridTemplateColumns: '1fr 40px 1fr',
        gap: '24px',
        alignItems: 'start',
        marginBottom: '48px',
      }}
    >
      {/* Left content */}
      <div
        style={{
          textAlign: 'right',
          opacity: visible ? 1 : 0,
          transform: visible ? 'none' : 'translateX(-30px)',
          transition: `all 0.6s ease ${index * 0.1}s`,
        }}
      >
        {!isEven && (
          <>
            <div
              style={{
                fontFamily: "'Inter', sans-serif",
                fontWeight: '700',
                fontSize: '13px',
                letterSpacing: '3px',
                color: '#3a3a3a',
                marginBottom: '8px',
              }}
            >
              {milestone.year}
            </div>
            <PHeading size="medium" theme="dark" tag="h3" style={{ marginBottom: '8px' }}>
              {milestone.title}
            </PHeading>
            <PText size="x-small" color="contrast-medium" theme="dark">
              {visible && isEven === false ? (
                <TypewriterText text={milestone.description} trigger={visible} />
              ) : milestone.description}
            </PText>
          </>
        )}
      </div>

      {/* Center node */}
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <div
          style={{
            width: '12px',
            height: '12px',
            borderRadius: '50%',
            background: visible
              ? 'linear-gradient(135deg, #B0B0B0, #E0E0E0)'
              : 'rgba(176,176,176,0.1)',
            border: `2px solid ${visible ? 'transparent' : 'rgba(176,176,176,0.2)'}`,
            boxShadow: visible ? '0 0 16px rgba(176,176,176,0.3)' : 'none',
            transition: `all 0.5s ease ${index * 0.1}s`,
            marginTop: '4px',
            flexShrink: 0,
          }}
        />
        <div
          style={{
            width: '1px',
            flex: 1,
            minHeight: '60px',
            background: 'linear-gradient(to bottom, rgba(176,176,176,0.2), rgba(176,176,176,0.05))',
            marginTop: '8px',
          }}
        />
      </div>

      {/* Right content */}
      <div
        style={{
          opacity: visible ? 1 : 0,
          transform: visible ? 'none' : 'translateX(30px)',
          transition: `all 0.6s ease ${index * 0.1}s`,
        }}
      >
        {isEven && (
          <>
            <div
              style={{
                fontFamily: "'Inter', sans-serif",
                fontWeight: '700',
                fontSize: '13px',
                letterSpacing: '3px',
                color: '#3a3a3a',
                marginBottom: '8px',
              }}
            >
              {milestone.year}
            </div>
            <PHeading size="medium" theme="dark" tag="h3" style={{ marginBottom: '8px' }}>
              {milestone.title}
            </PHeading>
            <PText size="x-small" color="contrast-medium" theme="dark">
              {milestone.description}
            </PText>
          </>
        )}
      </div>
    </div>
  );
}

export default function About() {
  const headerRef = useRef<HTMLDivElement>(null);
  const [headerVisible, setHeaderVisible] = useState(false);
  const statsRef = useRef<HTMLDivElement>(null);
  const [statsVisible, setStatsVisible] = useState(false);

  useEffect(() => {
    const obs1 = new IntersectionObserver(([e]) => { if (e.isIntersecting) setHeaderVisible(true); }, { threshold: 0.3 });
    const obs2 = new IntersectionObserver(([e]) => { if (e.isIntersecting) setStatsVisible(true); }, { threshold: 0.3 });
    if (headerRef.current) obs1.observe(headerRef.current);
    if (statsRef.current) obs2.observe(statsRef.current);
    return () => { obs1.disconnect(); obs2.disconnect(); };
  }, []);

  return (
    <section
      id="about"
      style={{
        padding: 'clamp(80px, 10vw, 160px) clamp(24px, 6vw, 96px)',
        background: '#0A0A0A',
        position: 'relative',
      }}
    >
      {/* Background accent */}
      <div
        style={{
          position: 'absolute',
          top: '10%',
          left: '-20%',
          width: '700px',
          height: '700px',
          borderRadius: '50%',
          background: 'radial-gradient(ellipse, rgba(10,20,40,0.3) 0%, transparent 70%)',
          pointerEvents: 'none',
        }}
      />

      <div ref={headerRef} style={{ maxWidth: '1200px', margin: '0 auto' }}>
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
          Our Story
        </div>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: 'clamp(40px, 6vw, 96px)',
            marginBottom: '80px',
            alignItems: 'start',
          }}
          className="about-grid"
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
            Built for those who
            <br />
            <span
              style={{
                background: 'linear-gradient(90deg, #B0B0B0, #E0E0E0)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}
            >
              refuse ordinary
            </span>
          </PHeading>

          <div
            style={{
              opacity: headerVisible ? 1 : 0,
              transform: headerVisible ? 'none' : 'translateY(30px)',
              transition: 'all 0.6s ease 0.2s',
            }}
          >
            <PText size="medium" color="contrast-medium" theme="dark" style={{ marginBottom: '24px', lineHeight: '1.8' }}>
              Noxen was founded on a single belief: that the most ambitious brands deserve experiences that match their ambition. Not templates. Not trends. Deliberate, original, unmistakable work.
            </PText>
            <PText size="small" color="contrast-medium" theme="dark" style={{ lineHeight: '1.8' }}>
              We are technologists who think like designers, and designers who understand code. This rare fluency lets us build things that look impossible — and work flawlessly.
            </PText>
          </div>
        </div>

        <PDivider color="contrast-low" theme="dark" style={{ marginBottom: '80px' }} />

        {/* Stats */}
        <div
          ref={statsRef}
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(4, 1fr)',
            gap: '48px',
            marginBottom: '120px',
          }}
          className="stats-grid"
        >
          {stats.map((stat, i) => (
            <div
              key={stat.label}
              style={{
                opacity: statsVisible ? 1 : 0,
                transform: statsVisible ? 'none' : 'translateY(20px)',
                transition: `all 0.6s ease ${i * 0.1}s`,
              }}
            >
              <div
                style={{
                  fontFamily: "'Inter', sans-serif",
                  fontWeight: '700',
                  fontSize: 'clamp(32px, 4vw, 56px)',
                  background: 'linear-gradient(135deg, #B0B0B0, #E0E0E0)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  letterSpacing: '-1px',
                  lineHeight: 1,
                  marginBottom: '8px',
                }}
              >
                {stat.value}
              </div>
              <PText size="x-small" color="contrast-medium" theme="dark" style={{ letterSpacing: '2px', textTransform: 'uppercase' }}>
                {stat.label}
              </PText>
            </div>
          ))}
        </div>

        {/* Timeline */}
        <div style={{ marginBottom: '40px' }}>
          <div
            style={{
              fontFamily: "'Space Grotesk', 'Arial', sans-serif",
              fontSize: '11px',
              letterSpacing: '6px',
              color: '#3a3a3a',
              textTransform: 'uppercase',
              marginBottom: '60px',
              textAlign: 'center',
            }}
          >
            Timeline
          </div>
          <div style={{ maxWidth: '800px', margin: '0 auto' }}>
            {milestones.map((m, i) => (
              <TimelineNode key={m.year} milestone={m} index={i} />
            ))}
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 760px) {
          .about-grid { grid-template-columns: 1fr !important; }
          .stats-grid { grid-template-columns: repeat(2, 1fr) !important; }
        }
      `}</style>
    </section>
  );
}
