import { aitechAreas } from '../data/aitechData';

export default function AitechScopeSection() {
  return (
    <section id="alcance" className="info-section">
      <h2 className="section-title">Cobertura de Calidad en AITECH</h2>
      <p className="section-subtitle">
        El Área de Calidad supervisa y garantiza la excelencia operativa y técnica en las 7 áreas tecnológicas de la compañía.
      </p>

      <div className="positions-grid">
        {aitechAreas.map((area) => (
          <div className="pos-card" key={area.id}>
            <h4 style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <span style={{ fontSize: '1.4rem' }}>{area.icon}</span>
              {area.title}
            </h4>
            <p style={{ marginTop: '0.5rem' }}>{area.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
