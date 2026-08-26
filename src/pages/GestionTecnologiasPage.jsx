import { Link } from 'react-router-dom';
import { gestionTecnologiasData } from '../data/knowledgeDetailData';
import Footer from '../components/Footer';

export default function GestionTecnologiasPage() {
  return (
    <div>
      {/* Header con botón de regreso */}
      <header style={{ position: 'sticky', top: 0 }}>
        <div className="logo">
          <Link to="/#inicio" style={{ textDecoration: 'none', color: 'inherit' }}>
            AITECH <span>| Calidad</span>
          </Link>
        </div>
        <nav>
          <ul>
            <li>
              <Link to="/#conocimiento" style={{ color: 'var(--gold-primary)', fontWeight: 'bold' }}>
                ← Volver a Ciencia y Gestión
              </Link>
            </li>
          </ul>
        </nav>
      </header>

      {/* Hero de la Página */}
      <section className="hero" style={{ minHeight: '60vh', padding: '120px 5% 60px 5%' }}>
        <div className="hero-content">
          <h1>{gestionTecnologiasData.title}</h1>
          <p>{gestionTecnologiasData.subtitle}</p>
        </div>
      </section>

      {/* Citas Destacadas */}
      <section style={{ background: 'var(--bg-surface-light)', padding: '60px 5%' }}>
        <div className="mv-grid">
          {gestionTecnologiasData.quotes.map((quote, index) => (
            <div
              className="mv-card"
              key={index}
              style={{
                borderLeft: '4px solid var(--gold-primary)',
                background: 'var(--bg-surface)',
              }}
            >
              <p style={{ fontStyle: 'italic', fontSize: '1.1rem', marginBottom: '1rem', color: 'var(--text-main)' }}>
                "{quote.text}"
              </p>
              <h4 style={{ color: 'var(--gold-primary)', fontFamily: 'var(--font-title)' }}>{quote.author}</h4>
              <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>{quote.role}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Desarrollo Teórico */}
      <section style={{ padding: '80px 5%', maxWidth: '1100px', margin: '0 auto' }}>
        <h2 className="section-title" style={{ marginBottom: '2.5rem' }}>
          Marcos Teóricos y Gobierno de Calidad
        </h2>

        {gestionTecnologiasData.sections.map((sec, index) => (
          <div key={index} style={{ marginBottom: '2.5rem' }}>
            <h3 style={{ fontFamily: 'var(--font-title)', color: 'var(--gold-light)', fontSize: '1.6rem', marginBottom: '1rem' }}>
              {sec.heading}
            </h3>
            <p style={{ fontSize: '1.05rem', lineHeight: '1.8', color: 'var(--text-muted)', whiteSpace: 'pre-line' }}>
              {sec.content}
            </p>
          </div>
        ))}

        {/* Aplicación en AITECH */}
        <div
          style={{
            background: 'linear-gradient(135deg, rgba(184, 134, 11, 0.08), rgba(248, 250, 252, 0.9))',
            padding: '2.5rem',
            borderRadius: '12px',
            border: '1px solid var(--gold-dim)',
            marginTop: '3rem',
          }}
        >
          <h3 style={{ fontFamily: 'var(--font-title)', color: 'var(--gold-primary)', fontSize: '1.5rem', marginBottom: '1rem' }}>
            Estrategia de Gestión en AITECH
          </h3>
          <p style={{ fontSize: '1.05rem', lineHeight: '1.8', color: 'var(--text-main)' }}>
            {gestionTecnologiasData.aitechApplication}
          </p>
        </div>
      </section>

      {/* Enlaces a Estándares y Publicaciones */}
      <section style={{ background: 'var(--bg-surface-light)', padding: '80px 5%' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
          <h2 className="section-title" style={{ marginBottom: '1rem' }}>
            Estándares Internacionales y Publicaciones de Referencia
          </h2>
          <p className="section-subtitle">
            Marcos normativos e investigación en gestión del desempeño y calidad total.
          </p>

          <div className="positions-grid">
            {gestionTecnologiasData.papers.map((paper, index) => (
              <div className="pos-card" key={index} style={{ background: 'var(--bg-surface)' }}>
                <h4 style={{ fontSize: '1.15rem' }}>{paper.title}</h4>
                <p style={{ fontSize: '0.9rem', color: 'var(--gold-light)', fontWeight: 'bold' }}>
                  {paper.author} — <em style={{ fontWeight: 'normal' }}>{paper.source}</em>
                </p>
                <p style={{ fontSize: '0.95rem', marginY: '0.8rem' }}>{paper.description}</p>
                <a
                  href={paper.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn"
                  style={{ fontSize: '0.8rem', padding: '0.5rem 1rem', marginTop: '0.8rem', display: 'inline-block' }}
                >
                  Ver Estándar / Publicación ↗
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
