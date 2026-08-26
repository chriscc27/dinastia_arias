import { Link } from 'react-router-dom';

export default function CienciaTecnologiaSection() {
  return (
    <section id="ciencia-tecnologia" style={{ padding: '100px 5%', background: 'var(--bg-base)' }}>
      <div style={{ maxWidth: '1000px', margin: '0 auto', textAlign: 'center' }}>
        <h2 className="section-title">Ciencia, Tecnología e Innovación</h2>
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
            La <strong>Ciencia</strong> es la sabiduría estructurada obtenida mediante observación y
            razonamiento. Su objetivo es descubrir las verdades fundamentales de nuestro entorno.
          </p>
          <p style={{ fontSize: '1.1rem', lineHeight: '1.85', color: 'var(--text-muted)', marginTop: '1.2rem' }}>
            La <strong>Tecnología</strong> es el canal donde ese conocimiento se transforma en soluciones
            robustas. Es el puente entre la teoría y la realidad, proporcionando herramientas para resolver
            problemas reales.
          </p>
          <p style={{ fontSize: '1.1rem', lineHeight: '1.85', color: 'var(--text-muted)', marginTop: '1.2rem' }}>
            La <strong>Innovación</strong> es el motor que nos impulsa hacia nuevos
            horizontes, optimizando procesos y garantizando la excelencia en cada entrega.
          </p>

          <div style={{ textAlign: 'center', marginTop: '2.5rem' }}>
            <Link to="/ciencia-tecnologia-innovacion" className="btn">
              Explorar Página Completa →
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
