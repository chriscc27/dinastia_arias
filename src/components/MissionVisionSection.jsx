export default function MissionVisionSection() {
  return (
    <section id="mision-vision" className="light-section consolidated-intro" style={{ borderTop: '1px solid rgba(34, 47, 48, 0.08)' }}>
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

      {/* Marco Teórico de Planeación Estratégica */}
      <div className="theory-inline-summary-grid" style={{ marginBottom: '2.5rem' }}>
        <div className="theory-inline-card">
          <span className="theory-inline-tag">TEORÍA DE LA MISIÓN</span>
          <h4>¿Qué es la Misión Organizacional?</h4>
          <p>
            Define la <strong>razón de ser presente</strong> de la organización: responde a <em>¿quiénes somos?, ¿qué hacemos?, ¿para quién lo hacemos?</em> y cuál es el aporte diferencial que justifica su operación diaria.
          </p>
        </div>
        <div className="theory-inline-card">
          <span className="theory-inline-tag">TEORÍA DE LA VISIÓN</span>
          <h4>¿Qué es la Visión Estratégica?</h4>
          <p>
            Representa la <strong>imagen futura deseada</strong> a mediano y largo plazo: responde a <em>¿hacia dónde nos dirigimos?</em> y establece una meta inspiradora, medible y retadora que orienta las decisiones estratégicas.
          </p>
        </div>
        <div className="theory-inline-card">
          <span className="theory-inline-tag">ALINEACIÓN NORMATIVA</span>
          <h4>Coherencia con Políticas de Calidad</h4>
          <p>
            Bajo la norma ISO 9001, el propósito y la dirección estratégica del área de Calidad deben traducirse en objetivos medibles, cultura de prevención de riesgos y mejora continua.
          </p>
        </div>
      </div>
    </section>
  );
}
