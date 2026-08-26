import { Link } from 'react-router-dom';
import { gestionTecnologiasData } from '../data/knowledgeDetailData';
import Footer from '../components/Footer';

export default function GestionTecnologiasPage() {
  return (
    <div className="subpage-wrapper" style={{ background: 'var(--color-offwhite)', minHeight: '100vh', position: 'relative', overflowX: 'hidden' }}>
      {/* Header Flotante Sticky (Misma clase site-header que en inicio para acompañar el scroll) */}
      <header className="site-header">
        <div className="header-left">
          <Link to="/#inicio" className="logo-link">
            <span className="logo-text">
              AITECH <span>| CALIDAD</span>
            </span>
          </Link>
        </div>

        <div className="header-right">
          {/* Cápsula Liquid Glass idéntica a la barra de navegación del inicio */}
          <div className="nav-pill-container">
            <nav className="nav-scrollable-inner">
              <Link to="/#gestion-tecnologias" className="nav-item-link active" style={{ textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '8px' }}>
                <span>← VOLVER A INICIO</span>
                <span style={{ width: '22px', height: '22px', borderRadius: '50%', background: 'var(--color-lime)', color: 'var(--color-charcoal)', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.75rem', fontWeight: 'bold' }}>↑</span>
              </Link>
            </nav>
          </div>
        </div>
      </header>

      {/* Hero Full-Width a Pantalla Completa sin Marcos */}
      <section
        style={{
          position: 'relative',
          width: '100%',
          minHeight: '80vh',
          padding: '150px 6% 80px 6%',
          background: "linear-gradient(180deg, rgba(16, 25, 26, 0.78) 0%, rgba(18, 27, 28, 0.94) 100%), url('/assets/gestion_hero_art.jpg') center/cover no-repeat",
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
            <span>ESTRATEGIA & GOBIERNO DE TECNOLOGÍA</span>
          </div>

          <h1 className="section-heading-xl" style={{ fontSize: 'max(2.8rem, min(5vw, 4.4rem))', color: '#ffffff', lineHeight: '1.12', marginBottom: '1.6rem' }}>
            {gestionTecnologiasData.title}:{' '}
            <span style={{ color: 'var(--color-lime)' }}>Estrategia, gobierno y estándares globales en AITECH.</span>
          </h1>

          <p style={{ fontSize: '1.25rem', lineHeight: '1.8', color: 'rgba(255, 255, 255, 0.92)', marginBottom: '2.5rem', maxWidth: '850px' }}>
            {gestionTecnologiasData.subtitle}
          </p>

          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px' }}>
            <span className="card-meta-badge lime-badge" style={{ padding: '7px 16px', fontSize: '0.8rem' }}>PDCA DEMING</span>
            <span className="card-meta-badge dark-badge" style={{ padding: '7px 16px', fontSize: '0.8rem', background: 'rgba(255, 255, 255, 0.18)', color: '#ffffff' }}>TQM JURAN</span>
            <span className="card-meta-badge lime-badge" style={{ padding: '7px 16px', fontSize: '0.8rem' }}>ISO/IEC 25010</span>
            <span className="card-meta-badge dark-badge" style={{ padding: '7px 16px', fontSize: '0.8rem', background: 'rgba(255, 255, 255, 0.18)', color: '#ffffff' }}>ITIL v4 & COBIT</span>
          </div>
        </div>
      </section>

      {/* Contenido Principal con Margen Lateral Estándar */}
      <div style={{ paddingLeft: '4%', paddingRight: '4%' }}>
        {/* Sección de Citas Destacadas en Tarjetas Interactivas Oscuras */}
        <div style={{ marginBottom: '5rem' }}>
          <div className="section-badge">
            <span className="badge-dot" />
            <span>PENSAMIENTO DE LOS PIONEROS DE LA CALIDAD</span>
          </div>

          <div className="split-grid" style={{ marginTop: '1.5rem' }}>
            {gestionTecnologiasData.quotes.map((quote, index) => (
              <div className="mv-card-interactive dark-theme" key={index}>
                <div className="card-meta">
                  <span className="card-meta-badge lime-badge">CITA DE REFERENCIA</span>
                  <div className="mv-icon-box">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="var(--color-lime)" strokeWidth="2">
                      <path d="M3 21c3 0 7-1 7-8V5c0-1.25-.75-2-2-2H4c-1.25 0-2 .75-2 2v6c0 1.25.75 2 2 2h4c0 2.5-1 4-3 5.5" />
                      <path d="M15 21c3 0 7-1 7-8V5c0-1.25-.75-2-2-2h-4c-1.25 0-2 .75-2 2v6c0 1.25.75 2 2 2h4c0 2.5-1 4-3 5.5" />
                    </svg>
                  </div>
                </div>

                <p style={{ fontSize: '1.15rem', fontStyle: 'italic', lineHeight: '1.7', marginBottom: '1.8rem', color: '#ffffff' }}>
                  "{quote.text}"
                </p>

                <div>
                  <h3 style={{ fontSize: '1.3rem', color: 'var(--color-lime)', fontWeight: 600, margin: 0 }}>
                    {quote.author}
                  </h3>
                  <span style={{ fontSize: '0.85rem', color: 'rgba(255, 255, 255, 0.75)', fontFamily: 'var(--font-mono)' }}>
                    {quote.role}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Sección de "Fundamentos de Gestión y Madurez Operativa" (Texto Resumido y Diagramación Limpia) */}
        <div style={{ marginBottom: '5rem' }}>
          <div className="section-badge">
            <span className="badge-dot" />
            <span>MARCOS TEÓRICOS Y GOBIERNO DE CALIDAD</span>
          </div>

          <h2 style={{ fontSize: '2.2rem', fontWeight: 400, marginBottom: '2.5rem', letterSpacing: '-0.02em', color: 'var(--color-charcoal)' }}>
            Fundamentos de Gestión y Madurez Operativa
          </h2>

          {/* Cuadrícula de 3 Columnas Equilibra con Íconos Lineales y Texto Resumido */}
          <div className="tqm-three-column-grid">
            {/* Tarjeta 01 - Verde Lime */}
            <div className="tqm-feature-card tqm-card-lime">
              <div className="tqm-card-top">
                <svg width="48" height="48" viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <circle cx="24" cy="24" r="6" />
                  <line x1="24" y1="2" x2="24" y2="12" />
                  <line x1="24" y1="36" x2="24" y2="46" />
                  <line x1="2" y1="24" x2="12" y2="24" />
                  <line x1="36" y1="24" x2="46" y2="24" />
                  <line x1="8.44" y1="8.44" x2="15.51" y2="15.51" />
                  <line x1="32.49" y1="32.49" x2="39.56" y2="39.56" />
                  <line x1="8.44" y1="39.56" x2="15.51" y2="32.49" />
                  <line x1="32.49" y1="15.51" x2="39.56" y2="8.44" />
                </svg>

                <span className="tqm-card-counter">01.</span>
              </div>

              <div className="tqm-card-body">
                <h3>{gestionTecnologiasData.sections[0].heading}</h3>
                <p>{gestionTecnologiasData.sections[0].content}</p>
              </div>
            </div>

            {/* Tarjeta 02 - Carbón Oscuro */}
            <div className="tqm-feature-card tqm-card-dark">
              <div className="tqm-card-top">
                <svg width="48" height="48" viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M24 4 L42 14 L42 34 L24 44 L6 34 L6 14 Z" />
                  <path d="M24 10 L36 17 L36 31 L24 38 L12 31 L12 17 Z" />
                  <path d="M24 16 L30 20 L30 28 L24 32 L18 28 L18 20 Z" />
                </svg>

                <span className="tqm-card-counter">02.</span>
              </div>

              <div className="tqm-card-body">
                <h3>{gestionTecnologiasData.sections[1].heading}</h3>
                <p>{gestionTecnologiasData.sections[1].content}</p>
              </div>
            </div>

            {/* Tarjeta 03 - Offwhite Menta */}
            <div className="tqm-feature-card tqm-card-light">
              <div className="tqm-card-top">
                <svg width="48" height="48" viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M24 4 L42 14 L42 34 L24 44 L6 34 L6 14 Z" />
                  <path d="M24 4 L24 44" />
                  <path d="M42 14 L24 24 L6 14" />
                  <path d="M42 34 L24 24 L6 34" />
                </svg>

                <span className="tqm-card-counter">03.</span>
              </div>

              <div className="tqm-card-body">
                <h3>{gestionTecnologiasData.sections[2].heading}</h3>
                <p>{gestionTecnologiasData.sections[2].content}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Aplicación en AITECH - Banner Destacado */}
        <div
          className="mv-card-interactive dark-theme"
          style={{
            background: 'linear-gradient(145deg, #1c2728 0%, #121c1d 100%)',
            border: '2px solid var(--color-lime)',
            boxShadow: '0 20px 50px rgba(167, 226, 110, 0.2)',
            marginBottom: '6rem',
          }}
        >
          <div className="card-meta">
            <span className="card-meta-badge lime-badge">EJECUCIÓN CORPORATIVA</span>
            <span>AITECH CALIDAD</span>
          </div>

          <h3 style={{ fontSize: '1.8rem', color: '#ffffff', marginBottom: '1.2rem', fontWeight: 500 }}>
            Estrategia de Gestión de Tecnologías en AITECH
          </h3>

          <p style={{ fontSize: '1.1rem', lineHeight: '1.85', color: 'rgba(255, 255, 255, 0.9)' }}>
            {gestionTecnologiasData.aitechApplication}
          </p>
        </div>

        {/* Estándares Internacionales y Publicaciones (Cutout Corner Cards) con enlaces directos */}
        <div style={{ marginBottom: '6rem' }}>
          <div className="section-badge">
            <span className="badge-dot" />
            <span>ESTÁNDARES E INVESTIGACIÓN ACADÉMICA</span>
          </div>

          <h2 style={{ fontSize: '2.2rem', fontWeight: 400, marginBottom: '2.5rem', letterSpacing: '-0.02em', color: 'var(--color-charcoal)' }}>
            Publicaciones de Referencia y Normativa Global
          </h2>

          <div className="cutout-grid">
            {gestionTecnologiasData.papers.map((paper, index) => {
              const themes = ['theme-white', 'theme-slate', 'theme-charcoal'];
              const currentTheme = themes[index % themes.length];

              return (
                <div className={`cutout-card-wrapper ${currentTheme}`} key={index}>
                  <a
                    href={paper.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="cutout-card-inner"
                  >
                    <div className="cutout-card-content">
                      <div className="card-meta">
                        <span className="card-meta-badge">PUBLICACIÓN {index + 1}</span>
                        <span className="meta-date">{paper.source}</span>
                      </div>

                      <h4 className="pos-title">{paper.title}</h4>

                      <p className="pos-mision">
                        <strong>Autor:</strong> {paper.author}
                      </p>

                      <p className="pos-funciones">
                        {paper.description}
                      </p>

                      <div className="cutout-action-row">
                        <span className="cutout-link-text">VER ESTÁNDAR ↗</span>
                      </div>
                    </div>
                  </a>

                  <a
                    href={paper.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="cutout-pocket-arrow-btn"
                    aria-label={`Ver estándar ${paper.title}`}
                  >
                    <svg width="14" height="14" viewBox="0 0 10 10" fill="none">
                      <path fill="currentColor" d="M7.703 5.8H.398V4.6h7.305l-3.36-3.36.855-.84 4.8 4.8-4.8 4.8-.855-.84 3.36-3.36Z" />
                    </svg>
                  </a>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
