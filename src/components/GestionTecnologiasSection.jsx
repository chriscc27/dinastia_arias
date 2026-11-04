import MarqueeBanner from './MarqueeBanner';

export default function GestionTecnologiasSection() {
  return (
    <section id="gestion-tecnologias" className="light-section consolidated-intro">
      <div className="section-hero-split">
        {/* Columna Izquierda: Badge + Arte Gráfico 3D Glass */}
        <div className="split-left">
          <div className="section-badge">
            <span className="badge-dot" />
            <span>GESTIÓN DE TECNOLOGÍAS</span>
          </div>

          <div className="split-image-wrapper">
            <img
              src={`${import.meta.env.BASE_URL}assets/gestion_hero_art.jpg`}
              alt="Gestión de Tecnologías AITECH"
              className="split-hero-image"
            />
          </div>
        </div>

        {/* Introducción del tema, integrada en la página completa. */}
        <div className="split-right">
          <h2 className="section-heading-xl">
            Combinando estrategia operativa, procesos y control en{' '}
            <span className="text-muted-accent">un motor de excelencia.</span>
          </h2>

          <p className="section-desc-lead">
            La Gestión es nuestra estrategia operativa para la correcta planificación, organización, dirección y control de los recursos para alcanzar los objetivos de forma eficiente.
          </p>

        </div>
      </div>

      {/* Síntesis Teórica de Gestión Tecnológica y Calidad */}
      <div className="theory-inline-summary-grid">
        <div className="theory-inline-card">
          <span className="theory-inline-tag">CICLO PHVA (DEMING)</span>
          <h4>Mejora Continua Sistemática</h4>
          <p>
            Toda gestión tecnológica rigurosa se articula sobre las cuatro fases de W. Edwards Deming: <strong>Planificar</strong> objetivos y estándares, <strong>Hacer</strong> e implementar procesos, <strong>Verificar</strong> mediante métricas y auditorías, y <strong>Actuar</strong> para estandarizar mejoras.
          </p>
        </div>
        <div className="theory-inline-card">
          <span className="theory-inline-tag">TRILOGÍA DE JURAN & TQM</span>
          <h4>Gobierno y Control de Calidad</h4>
          <p>
            Integra la planificación de la calidad, el control estadístico de defectos y la mejora continua en cada activo tecnológico, reduciendo el costo de la mala calidad en sistemas críticos.
          </p>
        </div>
        <div className="theory-inline-card">
          <span className="theory-inline-tag">NORMATIVA ISO/IEC 25010 & 9001</span>
          <h4>Estandarización Internacional</h4>
          <p>
            Evalúa la calidad del producto de software bajo atributos formales de fiabilidad, eficiencia de desempeño, seguridad, mantenibilidad y adecuación funcional.
          </p>
        </div>
      </div>

      <MarqueeBanner text="El Futuro de la Ingeniería de Calidad — Estándares Internacionales ISO/IEEE — Dinastía Arias — AITECH — " />
    </section>
  );
}
