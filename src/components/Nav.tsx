import { useEffect, useState } from 'react';

const links = [
  { label: 'Services', href: '#services' },
  { label: 'Portfolio', href: '#portfolio' },
  { label: 'About', href: '#about' },
  { label: 'Contact', href: '#contact' },
];

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState('');
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const scrollTo = (href: string) => {
    setMenuOpen(false);
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
    setActive(href);
  };

  return (
    <nav
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 1000,
        padding: scrolled ? '16px 48px' : '28px 48px',
        background: scrolled ? 'rgba(10,10,10,0.92)' : 'transparent',
        backdropFilter: scrolled ? 'blur(20px)' : 'none',
        borderBottom: scrolled ? '1px solid rgba(176,176,176,0.08)' : 'none',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        transition: 'all 0.4s cubic-bezier(0.25,0.1,0.25,1)',
      }}
    >
      {/* Logo */}
      <button
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        style={{
          background: 'none',
          border: 'none',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          gap: '12px',
          padding: 0,
        }}
      >
        <svg width="32" height="32" viewBox="0 0 32 32">
          <defs>
            <linearGradient id="navGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#B0B0B0" />
              <stop offset="100%" stopColor="#E0E0E0" />
            </linearGradient>
          </defs>
          <polygon
            points="16,2 30,10 30,22 16,30 2,22 2,10"
            fill="none"
            stroke="url(#navGrad)"
            strokeWidth="1.5"
          />
          <text
            x="16"
            y="19"
            textAnchor="middle"
            fill="url(#navGrad)"
            fontFamily="'Inter', sans-serif"
            fontWeight="700"
            fontSize="8"
            letterSpacing="1"
          >
            NX
          </text>
        </svg>
        <span
          style={{
            fontFamily: "'Inter', 'Arial Narrow', sans-serif",
            fontWeight: '700',
            fontSize: '18px',
            letterSpacing: '6px',
            background: 'linear-gradient(90deg, #B0B0B0, #E0E0E0)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            textTransform: 'uppercase',
          }}
        >
          Noxen
        </span>
      </button>

      {/* Desktop links */}
      <ul
        style={{
          display: 'flex',
          gap: '48px',
          listStyle: 'none',
          margin: 0,
          padding: 0,
        }}
        className="nav-links"
      >
        {links.map((l) => (
          <li key={l.href}>
            <button
              onClick={() => scrollTo(l.href)}
              style={{
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                fontFamily: "'Space Grotesk', 'Arial', sans-serif",
                fontSize: '13px',
                letterSpacing: '3px',
                textTransform: 'uppercase',
                color: active === l.href ? '#E0E0E0' : '#6a6a6a',
                padding: '4px 0',
                position: 'relative',
                transition: 'color 0.3s ease',
              }}
              className="nav-link"
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLButtonElement).style.color = '#FAFAFA';
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLButtonElement).style.color =
                  active === l.href ? '#E0E0E0' : '#6a6a6a';
              }}
            >
              {l.label}
              <span
                style={{
                  position: 'absolute',
                  bottom: 0,
                  left: 0,
                  height: '1px',
                  width: active === l.href ? '100%' : '0%',
                  background: 'linear-gradient(90deg, #B0B0B0, #E0E0E0)',
                  transition: 'width 0.3s ease',
                }}
                className="nav-underline"
              />
            </button>
          </li>
        ))}
      </ul>

      {/* Mobile toggle */}
      <button
        onClick={() => setMenuOpen((o) => !o)}
        style={{
          display: 'none',
          background: 'none',
          border: 'none',
          cursor: 'pointer',
          padding: '8px',
        }}
        className="mobile-menu-btn"
        aria-label="Toggle menu"
      >
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
          {menuOpen ? (
            <>
              <line x1="5" y1="5" x2="19" y2="19" stroke="#E0E0E0" strokeWidth="1.5" />
              <line x1="19" y1="5" x2="5" y2="19" stroke="#E0E0E0" strokeWidth="1.5" />
            </>
          ) : (
            <>
              <line x1="4" y1="7" x2="20" y2="7" stroke="#E0E0E0" strokeWidth="1.5" />
              <line x1="4" y1="12" x2="20" y2="12" stroke="#B0B0B0" strokeWidth="1.5" />
              <line x1="4" y1="17" x2="20" y2="17" stroke="#6a6a6a" strokeWidth="1.5" />
            </>
          )}
        </svg>
      </button>

      {/* Mobile menu */}
      {menuOpen && (
        <div
          style={{
            position: 'fixed',
            top: '64px',
            left: 0,
            right: 0,
            background: 'rgba(10,10,10,0.96)',
            backdropFilter: 'blur(20px)',
            borderBottom: '1px solid rgba(176,176,176,0.08)',
            padding: '32px 48px',
            display: 'flex',
            flexDirection: 'column',
            gap: '24px',
          }}
          className="mobile-menu"
        >
          {links.map((l) => (
            <button
              key={l.href}
              onClick={() => scrollTo(l.href)}
              style={{
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                fontFamily: "'Space Grotesk', 'Arial', sans-serif",
                fontSize: '14px',
                letterSpacing: '3px',
                textTransform: 'uppercase',
                color: '#FAFAFA',
                textAlign: 'left',
                padding: '4px 0',
              }}
            >
              {l.label}
            </button>
          ))}
        </div>
      )}

      <style>{`
        @media (max-width: 760px) {
          .nav-links { display: none !important; }
          .mobile-menu-btn { display: block !important; }
        }
      `}</style>
    </nav>
  );
}
