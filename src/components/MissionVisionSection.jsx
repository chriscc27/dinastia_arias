import { Link } from 'react-router-dom';

export default function MissionVisionSection() {
  return (
    <section id="mision-vision" className="light-section" style={{ borderTop: '1px solid rgba(34, 47, 48, 0.08)' }}>
      <div className="section-badge">
        <span className="badge-dot" />
        <span>MISIÓN Y VISIÓN</span>
      </div>

      <h2 className="section-heading-xl">
        Compromiso innegociable con la excelencia técnica y el impacto sostenible.
      </h2>

      <p className="section-desc-lead">
        Nuestros principios rectores aseguran que cada software, infraestructura y dato cumpla con los más altos estándares globales de calidad.
      </p>

      {/* Grid de 2 Columnas Interactivas y Animadas */}
      <div className="split-grid">
        {/* Tarjeta Misión - Dark Charcoal & Lime Accent */}
        <div className="mv-card-interactive dark-theme">
          <div className="card-meta">
            <div className="card-meta-left">
              <span className="card-meta-badge lime-badge">MISIÓN</span>
              <span>AITECH CALIDAD</span>
            </div>
            <div className="mv-icon-box">
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="var(--color-lime)" strokeWidth="2">
                <circle cx="12" cy="12" r="10" />
                <circle cx="12" cy="12" r="6" />
                <circle cx="12" cy="12" r="2" />
              </svg>
            </div>
          </div>
          <h2>Nuestra Misión</h2>
          <p>
            Garantizar la <span className="mv-highlight">excelencia operativa</span> de la empresa mediante la integración de <span className="mv-highlight">calidad intrínseca</span> en cada proceso y resultado entregado. Actuamos como administradores diligentes de los recursos de salud, asegurando soluciones plenamente aptas para su uso que protejan la <span className="mv-highlight">seguridad de los pacientes</span>.
          </p>
        </div>

        {/* Tarjeta Visión - Light Glass & Mint Accent */}
        <div className="mv-card-interactive light-theme">
          <div className="card-meta">
            <div className="card-meta-left">
              <span className="card-meta-badge dark-badge">VISIÓN</span>
              <span>HORIZONTE 2030</span>
            </div>
            <div className="mv-icon-box">
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="var(--color-charcoal)" strokeWidth="2">
                <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83" />
              </svg>
            </div>
          </div>
          <h2>Nuestra Visión</h2>
          <p>
            Ser el <span className="mv-highlight-dark">referente global</span> de precisión y confiabilidad en tecnología médica, donde la calidad innegociable sea el motor fundamental de la <span className="mv-highlight-dark">confianza en la salud digital</span>. Aspiramos a superar las expectativas mediante la <span className="mv-highlight-dark">perfección técnica</span> y el bienestar sostenible.
          </p>
        </div>
      </div>

      <div style={{ marginTop: '3.5rem', display: 'flex', justifyContent: 'flex-end' }}>
        <Link to="/mision-vision" className="u-btn--1">
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
