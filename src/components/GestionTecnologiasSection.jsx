import { Link } from 'react-router-dom';
import MarqueeBanner from './MarqueeBanner';

export default function GestionTecnologiasSection() {
  return (
    <section id="gestion-tecnologias" className="light-section">
      <div className="section-hero-split">
        {/* Columna Izquierda: Badge + Arte Gráfico 3D Glass */}
        <div className="split-left">
          <div className="section-badge">
            <span className="badge-dot" />
            <span>GESTIÓN DE TECNOLOGÍAS</span>
          </div>

          <div className="split-image-wrapper">
            <img
              src="/assets/gestion_hero_art.jpg"
              alt="Gestión de Tecnologías AITECH"
              className="split-hero-image"
            />
          </div>
        </div>

        {/* Columna Derecha: Heading + Descripción + Botón CTA */}
        <div className="split-right">
          <h2 className="section-heading-xl">
            Combinando estrategia operativa, procesos y control en{' '}
            <span className="text-muted-accent">un motor de excelencia.</span>
          </h2>

          <p className="section-desc-lead">
            La Gestión es nuestra estrategia operativa para la correcta planificación, organización, dirección y control de los recursos para alcanzar los objetivos de forma eficiente.
          </p>

          <div className="split-cta-wrapper">
            <Link to="/gestion-tecnologias" className="u-btn--1">
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
        </div>
      </div>

      {/* Reemplazo de las 3 tarjetas por el Marquee infinito estilo IntegratedBio */}
      <MarqueeBanner text="El Futuro de la Ingeniería de Calidad — Estándares Internacionales ISO/IEEE — Dinastía Arias — AITECH — " />
    </section>
  );
}
