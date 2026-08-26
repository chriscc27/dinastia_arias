import { positions } from '../data/positionsData';

export default function OrgChartSection() {
  return (
    <section id="organigrama" className="org-section">
      <h2 className="section-title">Estructura Organizacional</h2>
      <p className="section-subtitle">Organigrama de Jefatura de Calidad y Áreas Especializadas</p>

      <div className="org-chart">
        <div className="org-node lead-node">
          Jefatura de Calidad (QA Lead)
        </div>
        <div className="org-lines"></div>
        <div className="org-branches">
          <div className="org-node">Área de<br />Automatización</div>
          <div className="org-node">Área de<br />Calidad Funcional</div>
          <div className="org-node">Área de<br />Rendimiento</div>
          <div className="org-node">Área de<br />Integración</div>
        </div>
      </div>

      <h3 className="subsection-title">Descripción de Posiciones</h3>

      <div className="positions-grid">
        {positions.map((pos) => (
          <div
            className={`pos-card${pos.isGoldBorder ? ' gold-border' : ''}`}
            key={pos.id}
          >
            <h4>{pos.title}</h4>
            <p><strong>Misión:</strong> {pos.mision}</p>
            <p><strong>Funciones:</strong> {pos.funciones}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
