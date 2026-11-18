import { Link } from 'react-router-dom';
import {
  ArrowUpRight,
  CheckCircle2,
  Compass,
  Cpu,
  Layers,
  Target,
} from 'lucide-react';
import TopicPage from '../components/TopicPage';
import { conclusionesRecomendacionesData } from '../data/conclusionesRecomendacionesData';

const axisIcon = {
  General: Layers,
  Objetivo: Target,
  Tecnológicas: Cpu,
};

export default function ConclusionesRecomendacionesPage() {
  const { conclusiones, recomendaciones, matrix } = conclusionesRecomendacionesData;

  return (
    <TopicPage
      topicId="conclusiones-recomendaciones"
      related={['mision-vision', 'alcance', 'herramientas', 'contacto']}
    >
      <nav className="organization-index" aria-label="Contenido de Conclusiones y Recomendaciones">
        <Link to="/conclusiones-recomendaciones#conclusiones">
          Conclusiones (Aporte del equipo) <span aria-hidden="true">↓</span>
        </Link>
        <Link to="/conclusiones-recomendaciones#recomendaciones">
          Recomendaciones (A futuro) <span aria-hidden="true">↓</span>
        </Link>
        <Link to="/conclusiones-recomendaciones#sintesis-cierre">
          Síntesis comparativa <span aria-hidden="true">↓</span>
        </Link>
      </nav>

      {/* BLOQUE 1: CONCLUSIONES (APORTE DEL EQUIPO) */}
      <section
        id="conclusiones"
        className="light-section cr-section"
        aria-labelledby="titulo-conclusiones"
      >
        <div className="section-badge">
          <span className="badge-dot" />
          <span>{conclusiones.badge}</span>
        </div>

        <div className="summary-section-heading">
          <h2 id="titulo-conclusiones" className="section-heading-xl">
            {conclusiones.title}
          </h2>
          <p className="section-desc-lead">{conclusiones.lead}</p>
        </div>

        <div className="cr-detail-grid">
          {conclusiones.items.map((item) => {
            const Icon = axisIcon[item.tipo] || CheckCircle2;
            return (
              <article key={item.id} className={`cr-detail-card is-${item.theme}`}>
                <div className="cr-card-top">
                  <div className="cr-card-badges">
                    <span className="cr-axis-badge">
                      <Icon size={15} aria-hidden="true" />
                      <span>{item.tipo}</span>
                    </span>
                    <span className="cr-scope-badge">{item.enfoque}</span>
                  </div>
                  <span className="cr-card-num">{item.number}.</span>
                </div>

                <h3>{item.title}</h3>
                <p className="cr-card-detail">{item.detail}</p>

                <div className="cr-card-subblock">
                  <span className="cr-sublabel">Aportes verificables del equipo</span>
                  <ul className="cr-bullet-list">
                    {item.highlights.map((point) => (
                      <li key={point}>
                        <CheckCircle2 size={16} aria-hidden="true" />
                        <span>{point}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {item.links?.length > 0 && (
                  <div className="cr-evidence-links" aria-label={`Evidencias relacionadas a ${item.tipo}`}>
                    {item.links.map((link) => (
                      <Link key={link.to} to={link.to} className="cr-evidence-chip">
                        <span>{link.label}</span>
                        <ArrowUpRight size={14} aria-hidden="true" />
                      </Link>
                    ))}
                  </div>
                )}
              </article>
            );
          })}
        </div>
      </section>

      {/* BLOQUE 2: RECOMENDACIONES (A FUTURO) */}
      <section
        id="recomendaciones"
        className="light-section cr-section cr-section-bordered"
        aria-labelledby="titulo-recomendaciones"
      >
        <div className="section-badge">
          <span className="badge-dot" />
          <span>{recomendaciones.badge}</span>
        </div>

        <div className="summary-section-heading">
          <h2 id="titulo-recomendaciones" className="section-heading-xl">
            {recomendaciones.title}
          </h2>
          <p className="section-desc-lead">{recomendaciones.lead}</p>
        </div>

        <div className="cr-detail-grid">
          {recomendaciones.items.map((item) => {
            const Icon = axisIcon[item.tipo] || Compass;
            return (
              <article key={item.id} className={`cr-detail-card is-${item.theme}`}>
                <div className="cr-card-top">
                  <div className="cr-card-badges">
                    <span className="cr-axis-badge">
                      <Icon size={15} aria-hidden="true" />
                      <span>{item.tipo}</span>
                    </span>
                    <span className="cr-scope-badge">{item.enfoque}</span>
                  </div>
                  <span className="cr-card-num">{item.number}.</span>
                </div>

                <h3>{item.title}</h3>
                <p className="cr-card-detail">{item.detail}</p>

                <div className="cr-card-subblock">
                  <span className="cr-sublabel">Líneas de acción recomendadas</span>
                  <ol className="cr-roadmap-list">
                    {item.actions.map((action) => (
                      <li key={action.horizon}>
                        <span className="cr-horizon-tag">{action.horizon}</span>
                        <p>{action.text}</p>
                      </li>
                    ))}
                  </ol>
                </div>
              </article>
            );
          })}
        </div>
      </section>

      {/* BLOQUE 3: MATRIZ COMPARATIVA */}
      <section
        id="sintesis-cierre"
        className="light-section cr-section cr-section-bordered"
        aria-labelledby="titulo-sintesis"
      >
        <div className="section-badge">
          <span className="badge-dot" />
          <span>SÍNTESIS COMPARATIVA · HOY VS. FUTURO</span>
        </div>

        <div className="summary-section-heading">
          <h2 id="titulo-sintesis" className="section-heading-xl">
            Del aporte consolidado a la proyección futura.
          </h2>
          <p className="section-desc-lead">
            Resumen comparativo que vincula directamente cada logro construido por el equipo Dinastía Arias con la evolución estratégica recomendada para AITECH.
          </p>
        </div>

        <div className="cr-matrix">
          {matrix.map((row, idx) => (
            <div key={row.eje} className="cr-matrix-row">
              <div className="cr-matrix-axis">
                <span>{String(idx + 1).padStart(2, '0')}</span>
                <h3>{row.eje}</h3>
              </div>
              <div className="cr-matrix-cell">
                <span className="cr-matrix-label">Conclusión · Aporte del equipo</span>
                <p>{row.aporte}</p>
              </div>
              <div className="cr-matrix-cell is-future">
                <span className="cr-matrix-label">Recomendación · A futuro</span>
                <p>{row.futuro}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </TopicPage>
  );
}
