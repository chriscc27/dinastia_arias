import { Link } from 'react-router-dom';
import { misionVisionData } from '../data/misionVisionDetailData';
import Footer from '../components/Footer';

export default function MisionVisionPage() {
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
              <Link to="/#mision-vision" style={{ color: 'var(--gold-primary)', fontWeight: 'bold' }}>
                ← Volver a Misión y Visión
              </Link>
            </li>
          </ul>
        </nav>
      </header>

      {/* Hero de la Página */}
      <section className="hero" style={{ minHeight: '45vh', padding: '120px 5% 40px 5%' }}>
        <div className="hero-content">
          <h1>{misionVisionData.title}</h1>
          <p>{misionVisionData.subtitle}</p>
        </div>
      </section>

      {/* SECCIÓN DE MÁXIMA RELEVANCIA: NUESTRA MISIÓN Y NUESTRA VISIÓN */}
      <section style={{ padding: '40px 5% 80px 5%', maxWidth: '1350px', margin: '0 auto' }}>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(520px, 1fr))',
            gap: '3rem',
          }}
        >
          {/* Tarjeta Nuestra Misión */}
          <div
            style={{
              background: 'var(--bg-surface)',
              backdropFilter: 'blur(16px)',
              border: '2px solid var(--gold-primary)',
              borderRadius: '20px',
              padding: '3.5rem 3rem',
              boxShadow: '0 20px 50px rgba(0, 0, 0, 0.5), 0 0 25px rgba(245, 197, 66, 0.1) inset',
              position: 'relative',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
            }}
          >
            <h2
              style={{
                fontFamily: 'var(--font-title)',
                color: 'var(--gold-primary)',
                fontSize: '2.6rem',
                marginBottom: '1.5rem',
                letterSpacing: '1px',
                lineHeight: '1.2',
                textShadow: '0 0 20px rgba(245, 197, 66, 0.3)',
              }}
            >
              Nuestra Misión
            </h2>
            <p
              style={{
                color: 'var(--text-main)',
                fontSize: '1.18rem',
                lineHeight: '1.9',
                textAlign: 'justify',
                fontWeight: '400',
              }}
            >
              {misionVisionData.nuestraMision}
            </p>
          </div>

          {/* Tarjeta Nuestra Visión */}
          <div
            style={{
              background: 'var(--bg-surface)',
              backdropFilter: 'blur(16px)',
              border: '2px solid var(--gold-primary)',
              borderRadius: '20px',
              padding: '3.5rem 3rem',
              boxShadow: '0 20px 50px rgba(0, 0, 0, 0.5), 0 0 25px rgba(245, 197, 66, 0.1) inset',
              position: 'relative',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
            }}
          >
            <h2
              style={{
                fontFamily: 'var(--font-title)',
                color: 'var(--gold-primary)',
                fontSize: '2.6rem',
                marginBottom: '1.5rem',
                letterSpacing: '1px',
                lineHeight: '1.2',
                textShadow: '0 0 20px rgba(245, 197, 66, 0.3)',
              }}
            >
              Nuestra Visión
            </h2>
            <p
              style={{
                color: 'var(--text-main)',
                fontSize: '1.18rem',
                lineHeight: '1.9',
                textAlign: 'justify',
                fontWeight: '400',
              }}
            >
              {misionVisionData.nuestraVision}
            </p>
          </div>
        </div>
      </section>

      {/* Conceptos Teóricos */}
      <section style={{ background: 'rgba(12, 14, 21, 0.6)', padding: '80px 5%' }}>
        <div style={{ maxWidth: '1250px', margin: '0 auto' }}>
          <h2 className="section-title" style={{ marginBottom: '2.5rem', fontSize: '2.2rem' }}>
            Conceptos Fundamentales de Dirección
          </h2>

          <div className="mv-grid">
            <div
              className="mv-card"
              style={{
                background: 'var(--bg-surface)',
                borderColor: 'var(--border-glass)',
                padding: '2.5rem',
                borderRadius: '16px',
              }}
            >
              <h3 style={{ fontFamily: 'var(--font-title)', color: 'var(--gold-primary)', fontSize: '1.6rem', marginBottom: '1rem' }}>
                ¿Qué es la Misión?
              </h3>
              <p style={{ color: 'var(--text-muted)', fontSize: '1.05rem', lineHeight: '1.8' }}>
                En la gestión estratégica, la <strong>Misión</strong> es el propósito fundamental o la razón de ser
                de una organización. Define la identidad actual de la empresa: <em>quiénes somos, qué hacemos y para
                quién lo hacemos</em>, estableciendo el núcleo operativo de nuestras acciones diarias.
              </p>
            </div>

            <div
              className="mv-card"
              style={{
                background: 'var(--bg-surface)',
                borderColor: 'var(--border-glass)',
                padding: '2.5rem',
                borderRadius: '16px',
              }}
            >
              <h3 style={{ fontFamily: 'var(--font-title)', color: 'var(--gold-primary)', fontSize: '1.6rem', marginBottom: '1rem' }}>
                ¿Qué es la Visión?
              </h3>
              <p style={{ color: 'var(--text-muted)', fontSize: '1.05rem', lineHeight: '1.8' }}>
                La <strong>Visión</strong> representa el estado futuro deseado o la máxima aspiración a largo plazo
                de una organización. Es la estrella polar que guía el crecimiento y la innovación, describiendo{' '}
                <em>en qué anhelamos convertirnos</em> y el impacto que deseamos dejar en el mundo.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Citas de Dirección Estratégica */}
      <section style={{ padding: '80px 5%' }}>
        <div style={{ maxWidth: '1250px', margin: '0 auto' }}>
          <h3 className="section-title" style={{ fontSize: '2.2rem', marginBottom: '2.5rem' }}>
            Perspectivas de Líderes en Management
          </h3>
          <div className="mv-grid">
            {misionVisionData.quotes.map((quote, index) => (
              <div
                className="mv-card"
                key={index}
                style={{
                  borderLeft: '4px solid var(--gold-primary)',
                  background: 'var(--bg-surface)',
                  padding: '2.5rem',
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
        </div>
      </section>

      {/* Desarrollo Teórico Completo */}
      <section style={{ background: 'rgba(12, 14, 21, 0.6)', padding: '80px 5%' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
          <h2 className="section-title" style={{ marginBottom: '2.5rem' }}>
            Fundamentos Teóricos e Integración Normativa
          </h2>

          {misionVisionData.sections.map((sec, index) => (
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
              <p style={{ fontSize: '1.05rem', lineHeight: '1.8', color: 'var(--text-muted)' }}>
                {sec.content}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Enlaces a Papers y Publicaciones */}
      <section style={{ padding: '80px 5%' }}>
        <div style={{ maxWidth: '1150px', margin: '0 auto' }}>
          <h2 className="section-title" style={{ marginBottom: '1rem' }}>
            Literatura Académica y Estándares de Dirección
          </h2>
          <p className="section-subtitle">
            Referencias en estrategia corporativa, liderazgo y gestión de la calidad.
          </p>

          <div className="positions-grid">
            {misionVisionData.papers.map((paper, index) => (
              <div className="pos-card" key={index}>
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
                  style={{ fontSize: '0.8rem', padding: '0.6rem 1.2rem', marginTop: '0.8rem', display: 'inline-block' }}
                >
                  Ver Publicación / Estándar ↗
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
