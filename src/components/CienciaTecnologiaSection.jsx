import { Link } from 'react-router-dom';

export default function CienciaTecnologiaSection() {
  return (
    <section id="ciencia-tecnologia" className="light-section" style={{ borderTop: '1px solid rgba(34, 47, 48, 0.08)' }}>
      <div className="section-badge">
        <span className="badge-dot" />
        <span>CIENCIA, TECNOLOGÍA E INNOVACIÓN</span>
      </div>

      <h2 className="section-heading-xl">
        Integrando rigor científico, soluciones tecnológicas e innovación continua.
      </h2>

      <p className="section-desc-lead">
        El conocimiento estructurado y la investigación aplicada nos permiten diseñar frameworks predictivos de calidad que previenen incidencias antes de que ocurran.
      </p>

      {/* Grid USP de 3 Columnas */}
      <div className="usp-grid">
        {/* Tarjeta 01 */}
        <div className="usp-card">
          <div className="usp-card-top">
            <div className="usp-icon-wrapper">
              <svg width="44" height="44" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M10 2v7.31M14 9.3V1.99M8.5 2h7M14 9.3a6.5 6.5 0 1 1-4 0" />
              </svg>
            </div>
            <span className="usp-number">01 .</span>
          </div>
          <div className="usp-card-body">
            <h3>Ciencia</h3>
            <p>
              Sabiduría estructurada obtenida mediante observación y razonamiento para descubrir las verdades y causas raíz en los sistemas.
            </p>
          </div>
        </div>

        {/* Tarjeta 02 (Highlight Lime Green) */}
        <div className="usp-card highlight">
          <div className="usp-card-top">
            <div className="usp-icon-wrapper">
              <svg width="44" height="44" viewBox="0 0 24 24" fill="none" stroke="#222f30" strokeWidth="1.5">
                <rect x="2" y="3" width="20" height="14" rx="2" ry="2" />
                <line x1="8" y1="21" x2="16" y2="21" />
                <line x1="12" y1="17" x2="12" y2="21" />
              </svg>
            </div>
            <span className="usp-number">02 .</span>
          </div>
          <div className="usp-card-body">
            <h3>Tecnología</h3>
            <p>
              El canal donde el conocimiento se transforma en herramientas y soluciones robustas que resuelven problemas del mundo real.
            </p>
          </div>
        </div>

        {/* Tarjeta 03 */}
        <div className="usp-card">
          <div className="usp-card-top">
            <div className="usp-icon-wrapper">
              <svg width="44" height="44" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
              </svg>
            </div>
            <span className="usp-number">03 .</span>
          </div>
          <div className="usp-card-body">
            <h3>Innovación</h3>
            <p>
              El motor que nos impulsa hacia nuevos horizontes, optimizando procesos y garantizando la excelencia en cada entrega.
            </p>
          </div>
        </div>
      </div>

      <div style={{ marginTop: '3.5rem', display: 'flex', justifyContent: 'flex-end' }}>
        <Link to="/ciencia-tecnologia-innovacion" className="u-btn--1">
          <span className="btn_label">
            Explorar Página Completa
            <div className="label_corner">
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="48" fill="none" viewBox="0 0 18 48">
                <path fill="#222F30" d="M0 0h5.63c7.808 0 13.536 7.337 11.642 14.91l-6.09 24.359A11.527 11.527 0 0 1 0 48V0Z" />
              </svg>
            </div>
          </span>
          <i className="btn_icon">
            <svg xmlns="http://www.w3.org/2000/svg" width="51" height="48" fill="none" viewBox="0 0 51 48">
              <path fill="currentColor" d="M6.728 9.09A12 12 0 0 1 18.369 0H39c6.627 0 12 5.373 12 12v24c0 6.627-5.373 12-12 12H12.37C4.561 48-1.167 40.663.727 33.09l6-24Z" />
            </svg>
          </i>
        </Link>
      </div>
    </section>
  );
}
