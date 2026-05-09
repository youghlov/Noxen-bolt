import { useEffect, useRef, useState } from 'react';
import { PHeading, PText, PButton, PInputText, PTextarea } from '@porsche-design-system/components-react';

interface FormState {
  name: string;
  email: string;
  company: string;
  message: string;
}

export default function Contact() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  const [form, setForm] = useState<FormState>({ name: '', email: '', company: '', message: '' });
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [particles, setParticles] = useState<{ id: number; x: number; y: number }[]>([]);
  const gridRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setVisible(true); },
      { threshold: 0.2 }
    );
    if (sectionRef.current) obs.observe(sectionRef.current);
    return () => obs.disconnect();
  }, []);

  // Animated grid canvas
  useEffect(() => {
    const canvas = gridRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };
    resize();

    let offset = 0;
    let raf: number;
    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const spacing = 60;
      ctx.strokeStyle = 'rgba(176,176,176,0.04)';
      ctx.lineWidth = 0.5;

      for (let x = -spacing; x < canvas.width + spacing; x += spacing) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, canvas.height);
        ctx.stroke();
      }
      for (let y = (offset % spacing) - spacing; y < canvas.height + spacing; y += spacing) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(canvas.width, y);
        ctx.stroke();
      }

      // Occasional bright node
      const nodes: [number, number][] = [];
      for (let x = 0; x < canvas.width; x += spacing) {
        for (let y = 0; y < canvas.height; y += spacing) {
          if (Math.sin(x * 0.01 + y * 0.01 + offset * 0.005) > 0.96) {
            nodes.push([x, y]);
          }
        }
      }
      nodes.forEach(([nx, ny]) => {
        const grad = ctx.createRadialGradient(nx, ny, 0, nx, ny, 8);
        grad.addColorStop(0, 'rgba(224,224,224,0.15)');
        grad.addColorStop(1, 'rgba(224,224,224,0)');
        ctx.beginPath();
        ctx.arc(nx, ny, 8, 0, Math.PI * 2);
        ctx.fillStyle = grad;
        ctx.fill();
      });

      offset += 0.5;
      raf = requestAnimationFrame(draw);
    };
    raf = requestAnimationFrame(draw);
    return () => cancelAnimationFrame(raf);
  }, [visible]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);

    // Spawn validation particles
    const newParticles = Array.from({ length: 8 }, (_, i) => ({
      id: Date.now() + i,
      x: Math.random() * 100,
      y: Math.random() * 100,
    }));
    setParticles(newParticles);

    setTimeout(() => {
      setSubmitting(false);
      setSubmitted(true);
      setParticles([]);
    }, 1800);
  };

  return (
    <section
      id="contact"
      ref={sectionRef}
      style={{
        padding: 'clamp(80px, 10vw, 160px) clamp(24px, 6vw, 96px)',
        background: '#0A0A0A',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Animated grid background */}
      {visible && (
        <canvas
          ref={gridRef}
          style={{
            position: 'absolute',
            inset: 0,
            width: '100%',
            height: '100%',
            pointerEvents: 'none',
          }}
        />
      )}

      <div style={{ maxWidth: '1200px', margin: '0 auto', position: 'relative', zIndex: 1 }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'clamp(40px, 6vw, 96px)', alignItems: 'start' }} className="contact-grid">
          {/* Left */}
          <div>
            <div
              style={{
                fontFamily: "'Space Grotesk', 'Arial', sans-serif",
                fontSize: '11px',
                letterSpacing: '6px',
                color: '#3a3a3a',
                textTransform: 'uppercase',
                marginBottom: '20px',
                opacity: visible ? 1 : 0,
                transform: visible ? 'none' : 'translateY(20px)',
                transition: 'all 0.6s ease',
              }}
            >
              Get in Touch
            </div>
            <PHeading
              size={{ base: 'x-large', l: 'xx-large' }}
              theme="dark"
              tag="h2"
              style={{
                opacity: visible ? 1 : 0,
                transform: visible ? 'none' : 'translateY(30px)',
                transition: 'all 0.6s ease 0.1s',
                marginBottom: '32px',
              }}
            >
              Let's build
              <br />
              <span
                style={{
                  background: 'linear-gradient(90deg, #B0B0B0, #E0E0E0)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                }}
              >
                something iconic
              </span>
            </PHeading>

            <PText
              size="small"
              color="contrast-medium"
              theme="dark"
              style={{
                opacity: visible ? 1 : 0,
                transform: visible ? 'none' : 'translateY(20px)',
                transition: 'all 0.6s ease 0.2s',
                lineHeight: '1.8',
                marginBottom: '48px',
              }}
            >
              We work with brands that understand the value of exceptional creative work. If that sounds like you, we'd like to hear about your project.
            </PText>

            {/* Contact details */}
            {[
              { label: 'Email', value: 'studio@noxen.agency' },
              { label: 'Location', value: 'Paris · Amsterdam · New York' },
              { label: 'New Business', value: 'projects@noxen.agency' },
            ].map((item, i) => (
              <div
                key={item.label}
                style={{
                  marginBottom: '20px',
                  opacity: visible ? 1 : 0,
                  transform: visible ? 'none' : 'translateX(-20px)',
                  transition: `all 0.6s ease ${0.3 + i * 0.1}s`,
                }}
              >
                <div
                  style={{
                    fontFamily: "'Space Grotesk', 'Arial', sans-serif",
                    fontSize: '10px',
                    letterSpacing: '3px',
                    color: '#3a3a3a',
                    textTransform: 'uppercase',
                    marginBottom: '4px',
                  }}
                >
                  {item.label}
                </div>
                <PText size="small" color="contrast-high" theme="dark">
                  {item.value}
                </PText>
              </div>
            ))}
          </div>

          {/* Form */}
          <div
            style={{
              background: 'rgba(255,255,255,0.02)',
              border: '1px solid rgba(176,176,176,0.08)',
              borderRadius: '12px',
              padding: 'clamp(32px, 4vw, 56px)',
              position: 'relative',
              opacity: visible ? 1 : 0,
              transform: visible ? 'none' : 'translateY(30px) scale(0.98)',
              transition: 'all 0.7s ease 0.2s',
            }}
          >
            {/* Top shimmer */}
            <div
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                height: '1px',
                background: 'linear-gradient(90deg, transparent, rgba(224,224,224,0.1), transparent)',
              }}
            />

            {/* Validation particles */}
            {particles.map((p) => (
              <div
                key={p.id}
                style={{
                  position: 'absolute',
                  left: `${p.x}%`,
                  top: `${p.y}%`,
                  width: '4px',
                  height: '4px',
                  borderRadius: '50%',
                  background: 'linear-gradient(135deg, #B0B0B0, #E0E0E0)',
                  animation: 'particleFly 1.8s ease-out forwards',
                  pointerEvents: 'none',
                }}
              />
            ))}

            {submitted ? (
              <div style={{ textAlign: 'center', padding: '40px 0' }}>
                <div
                  style={{
                    width: '64px',
                    height: '64px',
                    borderRadius: '50%',
                    background: 'rgba(176,176,176,0.05)',
                    border: '1px solid rgba(176,176,176,0.15)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    margin: '0 auto 24px',
                  }}
                >
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                    <polyline points="4,12 10,18 20,6" stroke="#E0E0E0" strokeWidth="1.5" strokeLinecap="round" />
                  </svg>
                </div>
                <PHeading size="large" theme="dark" tag="h3" style={{ marginBottom: '12px' }}>
                  Message Received
                </PHeading>
                <PText size="small" color="contrast-medium" theme="dark">
                  We'll be in touch within 48 hours.
                </PText>
              </div>
            ) : (
              <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
                <PInputText
                  name="name"
                  label="Full Name"
                  value={form.name}
                  theme="dark"
                  required
                  onInput={(e) => setForm((f) => ({ ...f, name: (e.target as HTMLInputElement).value }))}
                />
                <PInputText
                  name="email"
                  label="Email Address"
                  value={form.email}
                  theme="dark"
                  required
                  onInput={(e) => setForm((f) => ({ ...f, email: (e.target as HTMLInputElement).value }))}
                />
                <PInputText
                  name="company"
                  label="Company"
                  value={form.company}
                  theme="dark"
                  onInput={(e) => setForm((f) => ({ ...f, company: (e.target as HTMLInputElement).value }))}
                />
                <PTextarea
                  name="message"
                  label="Project Brief"
                  value={form.message}
                  theme="dark"
                  required
                  rows={4}
                  onInput={(e) => setForm((f) => ({ ...f, message: (e.target as HTMLTextAreaElement).value }))}
                />
                <PButton
                  type="submit"
                  theme="dark"
                  variant="primary"
                  loading={submitting}
                  icon="arrow-right"
                >
                  Send Message
                </PButton>
              </form>
            )}
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 760px) {
          .contact-grid { grid-template-columns: 1fr !important; }
        }
        @keyframes particleFly {
          0% { opacity: 1; transform: translate(0, 0) scale(1); }
          100% { opacity: 0; transform: translate(${Math.random() * 60 - 30}px, -80px) scale(0); }
        }
      `}</style>
    </section>
  );
}
