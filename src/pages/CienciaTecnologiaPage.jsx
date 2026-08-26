import { Link } from 'react-router-dom';
import { cienciaTecnologiaData } from '../data/knowledgeDetailData';
import Footer from '../components/Footer';

export default function CienciaTecnologiaPage() {
  return (
    <div>
      {/* Header con botón de regreso */}
      <header style={{ position: 'sticky', top: 0, zIndex: 1000 }}>
        <div className="logo">
          <Link to="/#inicio" style={{ textDecoration: 'none', color: 'inherit' }}>
            AITECH <span>| Calidad</span>
          </Link>
        </div>
        <nav>
          <ul>
            <li>
              <Link to="/#ciencia-tecnologia" style={{ color: 'var(--gold-primary)', fontWeight: 'bold' }}>
                ← Volver a Ciencia y Tecnología
              </Link>
            </li>
          </ul>
        </nav>
      </header>

      {/* Hero de la Página */}
      <section className="hero" style={{ minHeight: '50vh', padding: '120px 5% 50px 5%' }}>
        <div className="hero-content">
          <h1>{cienciaTecnologiaData.title}</h1>
          <p>{cienciaTecnologiaData.subtitle}</p>
        </div>
      </section>

      {/* Citas Destacadas */}
      <section style={{ background: 'rgba(12, 14, 21, 0.6)', padding: '60px 5%' }}>
        <div className="mv-grid">
          {cienciaTecnologiaData.quotes.map((quote, index) => (
            <div
              className="mv-card"
              key={index}
              style={{
                borderLeft: '4px solid var(--gold-primary)',
                background: 'var(--bg-surface)',
              }}
            >
              <p style={{ fontStyle: 'italic', fontSize: '1.1rem', marginBottom: '1.2rem', color: 'var(--text-main)' }}>
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
        <h2 className="section-title" style={{ marginBottom: '2.8rem' }}>
          Fundamentación Teórica y Metodológica
        </h2>

        {cienciaTecnologiaData.sections.map((sec, index) => (
          <div
            key={index}
            style={{
              background: 'var(--bg-surface)',
              backdropFilter: 'blur(16px)',
              border: '1px solid var(--border-glass)',
              borderRadius: '16px',
              padding: '2.5rem',
              marginBottom: '2.2rem',
            }}
          >
            <h3 style={{ fontFamily: 'var(--font-title)', color: 'var(--gold-light)', fontSize: '1.6rem', marginBottom: '1rem' }}>
              {sec.heading}
            </h3>
            <p style={{ fontSize: '1.08rem', lineHeight: '1.85', color: 'var(--text-muted)' }}>
              {sec.content}
            </p>
          </div>
        ))}

        {/* Aplicación en AITECH */}
        <div
          style={{
            background: 'linear-gradient(135deg, rgba(245, 197, 66, 0.1), rgba(18, 20, 29, 0.95))',
            padding: '2.8rem',
            borderRadius: '16px',
            border: '1px solid var(--gold-primary)',
            boxShadow: '0 0 30px rgba(245, 197, 66, 0.15)',
            marginTop: '3.5rem',
          }}
        >
          <h3 style={{ fontFamily: 'var(--font-title)', color: 'var(--gold-primary)', fontSize: '1.6rem', marginBottom: '1rem' }}>
            Aplicación en el Área de Calidad AITECH
          </h3>
          <p style={{ fontSize: '1.08rem', lineHeight: '1.85', color: 'var(--text-main)' }}>
            {cienciaTecnologiaData.aitechApplication}
          </p>
        </div>
      </section>

      {/* Enlaces a Papers y Publicaciones */}
      <section style={{ background: 'rgba(12, 14, 21, 0.6)', padding: '80px 5%' }}>
        <div style={{ maxWidth: '1150px', margin: '0 auto' }}>
          <h2 className="section-title" style={{ marginBottom: '1rem' }}>
            Literatura Científica y Estándares de Referencia
          </h2>
          <p className="section-subtitle">
            Referencias fundamentales y publicaciones académicas que sustentan nuestra metodología.
          </p>

          <div className="positions-grid">
            {cienciaTecnologiaData.papers.map((paper, index) => (
              <div className="pos-card" key={index}>
                <h4 style={{ fontSize: '1.2rem' }}>{paper.title}</h4>
                <p style={{ fontSize: '0.9rem', color: 'var(--gold-light)', fontWeight: 'bold' }}>
                  {paper.author} — <em style={{ fontWeight: 'normal' }}>{paper.source}</em>
                </p>
                <p style={{ fontSize: '0.95rem', marginY: '0.8rem' }}>{paper.description}</p>
                <a
                  href={paper.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn"
                  style={{ fontSize: '0.8rem', padding: '0.6rem 1.2rem', marginTop: '0.8rem', display: 'inline-block' }}
                >
                  Ver Publicación / Paper ↗
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
