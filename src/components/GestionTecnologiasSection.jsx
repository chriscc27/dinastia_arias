import { Link } from 'react-router-dom';

export default function GestionTecnologiasSection() {
  return (
    <section id="gestion-tecnologias" className="info-section">
      <div style={{ maxWidth: '1000px', margin: '0 auto', textAlign: 'center' }}>
        <h2 className="section-title">Gestión de Tecnologías</h2>
        <div
          className="mv-card"
          style={{
            background: 'var(--bg-surface)',
            padding: '3rem',
            borderRadius: '16px',
            boxShadow: '0 15px 35px rgba(0,0,0,0.05)',
            textAlign: 'left',
            marginTop: '2rem',
          }}
        >
          <p style={{ fontSize: '1.1rem', lineHeight: '1.85', color: 'var(--text-main)' }}>
            La <strong>Gestión</strong> es nuestra estrategia operativa. Consiste en la correcta
            planificación, organización, dirección y control de los recursos para alcanzar los objetivos de
            forma eficiente.
          </p>
          <p style={{ fontSize: '1.1rem', lineHeight: '1.85', color: 'var(--text-muted)', marginTop: '1.5rem' }}>
            En un mundo de transformación constante, una gestión efectiva nos permite
            adaptarnos al cambio, liderar con propósito y maximizar el impacto de las nuevas herramientas. En la{' '}
            <em>Dinastía Arias</em>, la gestión inteligente es el pilar que asegura nuestro éxito sostenible.
          </p>

          <div style={{ textAlign: 'center', marginTop: '2.5rem' }}>
            <Link to="/gestion-tecnologias" className="btn">
              Explorar Página Completa →
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
