import { Link } from 'react-router-dom';

export default function KnowledgeSection() {
  return (
    <section id="conocimiento" className="info-section">
      <div className="mv-grid">
        <div className="mv-card">
          <h2>Ciencia, Tecnología e Innovación</h2>
          <p>
            La <strong>Ciencia</strong> es la sabiduría estructurada obtenida mediante observación y
            razonamiento. Su objetivo es descubrir las verdades fundamentales de nuestro entorno.
          </p>
          <p style={{ marginTop: '1rem' }}>
            La <strong>Tecnología</strong> es el canal donde ese conocimiento se transforma en soluciones
            robustas. Es el puente entre la teoría y la realidad, proporcionando herramientas para resolver
            problemas reales.
          </p>
          <p style={{ marginTop: '1rem' }}>
            La <strong>Innovación</strong> es el motor que nos impulsa hacia nuevos
            horizontes, optimizando procesos y garantizando la excelencia en cada entrega.
          </p>
          <div style={{ marginTop: '2rem' }}>
            <Link to="/ciencia-tecnologia-innovacion" className="btn" style={{ fontSize: '0.9rem', padding: '0.8rem 1.5rem' }}>
              Explorar Página Completa →
            </Link>
          </div>
        </div>
        <div className="mv-card">
          <h2>Gestión de Tecnologías</h2>
          <p>
            La <strong>Gestión</strong> es nuestra estrategia operativa. Consiste en la correcta
            planificación, organización, dirección y control de los recursos para alcanzar los objetivos de
            forma eficiente.
          </p>
          <p style={{ marginTop: '1rem' }}>
            En un mundo de transformación constante, una gestión efectiva nos permite
            adaptarnos al cambio, liderar con propósito y maximizar el impacto de las nuevas herramientas. En la{' '}
            <em>Dinastía Arias</em>, la gestión inteligente es el pilar que asegura nuestro éxito sostenible.
          </p>
          <div style={{ marginTop: '2rem' }}>
            <Link to="/gestion-tecnologias" className="btn" style={{ fontSize: '0.9rem', padding: '0.8rem 1.5rem' }}>
              Explorar Página Completa →
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
