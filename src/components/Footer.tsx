import { PDivider, PText, PLinkPure } from '@porsche-design-system/components-react';

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer
      style={{
        padding: 'clamp(48px, 6vw, 80px) clamp(24px, 6vw, 96px) clamp(24px, 3vw, 40px)',
        background: '#0A0A0A',
        borderTop: '1px solid rgba(176,176,176,0.06)',
      }}
    >
      <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'flex-start',
            flexWrap: 'wrap',
            gap: '48px',
            marginBottom: '60px',
          }}
          className="footer-top"
        >
          {/* Brand */}
          <div style={{ maxWidth: '320px' }}>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                marginBottom: '20px',
              }}
            >
              <svg width="28" height="28" viewBox="0 0 28 28">
                <defs>
                  <linearGradient id="footerGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#B0B0B0" />
                    <stop offset="100%" stopColor="#E0E0E0" />
                  </linearGradient>
                </defs>
                <polygon
                  points="14,2 26,8 26,20 14,26 2,20 2,8"
                  fill="none"
                  stroke="url(#footerGrad)"
                  strokeWidth="1.2"
                />
                <text
                  x="14"
                  y="17"
                  textAnchor="middle"
                  fill="url(#footerGrad)"
                  fontFamily="'Inter', sans-serif"
                  fontWeight="700"
                  fontSize="7"
                  letterSpacing="1"
                >
                  NX
                </text>
              </svg>
              <span
                style={{
                  fontFamily: "'Inter', 'Arial Narrow', sans-serif",
                  fontWeight: '700',
                  fontSize: '16px',
                  letterSpacing: '5px',
                  background: 'linear-gradient(90deg, #B0B0B0, #E0E0E0)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  textTransform: 'uppercase',
                }}
              >
                Noxen
              </span>
            </div>
            <PText size="x-small" color="contrast-medium" theme="dark" style={{ lineHeight: '1.7' }}>
              Premium digital agency specialising in brand identity, immersive web, and tech-assisted visual production.
            </PText>
          </div>

          {/* Links */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(3, 140px)',
              gap: '48px',
            }}
            className="footer-links"
          >
            {[
              {
                title: 'Agency',
                links: ['About', 'Services', 'Portfolio', 'Careers'],
              },
              {
                title: 'Connect',
                links: ['Instagram', 'LinkedIn', 'Twitter / X', 'Behance'],
              },
              {
                title: 'Legal',
                links: ['Privacy Policy', 'Terms of Use', 'Cookie Policy'],
              },
            ].map((col) => (
              <div key={col.title}>
                <div
                  style={{
                    fontFamily: "'Space Grotesk', 'Arial', sans-serif",
                    fontSize: '10px',
                    letterSpacing: '3px',
                    color: '#2a2a2a',
                    textTransform: 'uppercase',
                    marginBottom: '16px',
                  }}
                >
                  {col.title}
                </div>
                {col.links.map((link) => (
                  <div key={link} style={{ marginBottom: '10px' }}>
                    <PLinkPure
                      href="#"
                      theme="dark"
                      hideLabel={false}
                      size="x-small"
                    >
                      {link}
                    </PLinkPure>
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>

        <PDivider color="contrast-low" theme="dark" style={{ marginBottom: '24px' }} />

        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: '12px',
          }}
        >
          <PText size="xx-small" color="contrast-medium" theme="dark" style={{ letterSpacing: '1px' }}>
            © {year} Noxen Digital Agency. All rights reserved.
          </PText>
          <PText size="xx-small" color="contrast-medium" theme="dark" style={{ letterSpacing: '1px' }}>
            Paris · Amsterdam · New York
          </PText>
        </div>
      </div>

      <style>{`
        @media (max-width: 760px) {
          .footer-top { flex-direction: column; }
          .footer-links { grid-template-columns: repeat(2, 1fr) !important; }
        }
      `}</style>
    </footer>
  );
}
