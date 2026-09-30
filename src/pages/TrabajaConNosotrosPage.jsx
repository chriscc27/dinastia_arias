import { Link } from 'react-router-dom';
import Footer from '../components/Footer';

export default function TrabajaConNosotrosPage() {
  const teamMembers = [
    { name: 'Leonardo Delgado', email: 'leonardo.delgado@ucb.edu.bo' },
    { name: 'Alan Flores', email: 'alan.flores.c@ucb.edu.bo' },
    { name: 'Christian Coronel', email: 'christian.coronel@ucb.edu.bo' },
    { name: 'Sergio Arias', email: 'sergio.arias@ucb.edu.bo' },
    { name: 'Alejandro Zamorano', email: 'alejandro.zamorano@ucb.edu.bo' },
  ];

  return (
    <div className="subpage-wrapper" style={{ background: 'var(--color-offwhite)', minHeight: '100vh', position: 'relative', overflowX: 'hidden' }}>
      <header className="site-header">
        <div className="header-left">
          <Link to="/#inicio" className="logo-link">
            <span className="logo-text">
              AITECH <span>| CALIDAD</span>
            </span>
          </Link>
        </div>

        <div className="header-right">
          <div className="nav-pill-container">
            <nav className="nav-scrollable-inner">
              <Link to="/#inicio" className="nav-item-link active" style={{ textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '8px' }}>
                <span>← VOLVER A INICIO</span>
                <span style={{ width: '22px', height: '22px', borderRadius: '50%', background: 'var(--color-lime)', color: 'var(--color-charcoal)', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.75rem', fontWeight: 'bold' }}>↑</span>
              </Link>
            </nav>
          </div>
        </div>
      </header>

      <section
        style={{
          position: 'relative',
          width: '100%',
          minHeight: '60vh',
          padding: '150px 6% 80px 6%',
          background: `linear-gradient(180deg, rgba(16, 25, 26, 0.78) 0%, rgba(18, 27, 28, 0.94) 100%), url('${import.meta.env.BASE_URL}assets/gestion_hero_art.jpg') center/cover no-repeat`,
          borderBottomLeftRadius: '36px',
          borderBottomRightRadius: '36px',
          boxShadow: '0 24px 60px rgba(0, 0, 0, 0.22)',
          color: '#ffffff',
          marginBottom: '4.5rem',
        }}
      >
        <div style={{ maxWidth: '1000px' }}>
          <div className="section-badge" style={{ background: 'rgba(255, 255, 255, 0.15)', borderColor: 'rgba(255, 255, 255, 0.25)', color: 'var(--color-lime)', marginBottom: '1.8rem' }}>
            <span className="badge-dot" style={{ background: 'var(--color-lime)' }} />
            <span>ÚNETE AL EQUIPO</span>
          </div>

          <h1 className="section-heading-xl" style={{ fontSize: 'max(2.8rem, min(5vw, 4.4rem))', color: '#ffffff', lineHeight: '1.12', marginBottom: '1.6rem' }}>
            Trabaja con Nosotros:{' '}
            <span style={{ color: 'var(--color-lime)' }}>Contáctanos.</span>
          </h1>

          <p style={{ fontSize: '1.25rem', lineHeight: '1.8', color: 'rgba(255, 255, 255, 0.92)', marginBottom: '2.5rem', maxWidth: '850px' }}>
            Conoce al equipo de Dinastía Arias. Estamos comprometidos con la excelencia técnica y operativa. Contáctate con cualquiera de nosotros.
          </p>
        </div>
      </section>

      <div style={{ paddingLeft: '4%', paddingRight: '4%', marginBottom: '6rem' }}>
        <div className="section-badge" style={{ marginBottom: '2rem' }}>
          <span className="badge-dot" />
          <span>NUESTROS CONTACTOS</span>
        </div>

        <div className="split-grid" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
          {teamMembers.map((member, index) => (
            <div className={`mv-card-interactive ${index % 2 === 0 ? 'dark-theme' : 'light-theme'}`} key={index}>
              <div className="card-meta">
                <span className={`card-meta-badge ${index % 2 === 0 ? 'lime-badge' : 'dark-badge'}`}>MIEMBRO DEL EQUIPO</span>
                <div className="mv-icon-box">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke={index % 2 === 0 ? 'var(--color-lime)' : 'var(--color-charcoal)'} strokeWidth="2">
                    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                    <circle cx="12" cy="7" r="4"></circle>
                  </svg>
                </div>
              </div>
              <h2 style={{ fontSize: '1.8rem', color: index % 2 === 0 ? '#ffffff' : 'var(--color-charcoal)', marginBottom: '1rem', fontWeight: 500 }}>
                {member.name}
              </h2>
              <p style={{ fontSize: '1.12rem', lineHeight: '1.85', color: index % 2 === 0 ? 'rgba(255, 255, 255, 0.88)' : 'rgba(34, 47, 48, 0.88)', marginBottom: '1.5rem' }}>
                Aseguramiento de Calidad AITECH.
              </p>
              <a href={`mailto:${member.email}`} style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                padding: '10px 20px',
                background: index % 2 === 0 ? 'var(--color-lime)' : 'var(--color-charcoal)',
                color: index % 2 === 0 ? 'var(--color-charcoal)' : '#ffffff',
                textDecoration: 'none',
                borderRadius: '8px',
                fontWeight: 600,
                fontFamily: 'var(--font-mono)',
                fontSize: '0.9rem',
                transition: 'transform 0.2s',
              }}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                  <polyline points="22,6 12,13 2,6"></polyline>
                </svg>
                {member.email}
              </a>
            </div>
          ))}
        </div>
      </div>

      <Footer />
    </div>
  );
}
