import { useState } from 'react';
import { positions } from '../data/positionsData';

export default function OrgChartSection() {
  const [activeArea, setActiveArea] = useState(null);

  const areas = [
    {
      id: 'auto',
      name: 'Área de Automatización',
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
        </svg>
      ),
      positionId: 2,
    },
    {
      id: 'func',
      name: 'Área de Calidad Funcional',
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
        </svg>
      ),
      positionId: 3,
    },
    {
      id: 'rend',
      name: 'Área de Rendimiento',
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <circle cx="12" cy="12" r="10" />
          <path d="M16 8l-4 4-4-4" />
          <path d="M12 12v6" />
        </svg>
      ),
      positionId: 4,
    },
    {
      id: 'integ',
      name: 'Área de Integración',
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
          <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
        </svg>
      ),
      positionId: 5,
    },
  ];

  return (
    <section id="organizacion" className="light-section" style={{ borderTop: '1px solid rgba(34, 47, 48, 0.08)' }}>
      <div className="section-badge">
        <span className="badge-dot" />
        <span>ESTRUCTURA ORGANIZACIONAL</span>
      </div>

      <h2 className="section-heading-xl">
        Organigrama de Jefatura de Calidad y Áreas Especializadas.
      </h2>

      <p className="section-desc-lead">
        Estructura modular y coordinada para dar soporte y cobertura integral a todas las iniciativas del ecosistema.
      </p>

      {/* Organigrama Interactivo con Conectores sin Fisuras */}
      <div className="org-interactive-wrapper">
        {/* Nodo Raíz (Jefatura) */}
        <div className="org-root-node-container">
          <div
            className={`org-lead-card ${activeArea === 1 ? 'is-active' : ''}`}
            onMouseEnter={() => setActiveArea(1)}
            onMouseLeave={() => setActiveArea(null)}
          >
            <span className="lead-pulse-dot" />
            <div className="lead-text-group">
              <span className="lead-role">Jefatura de Calidad (QA Lead)</span>
              <span className="lead-tag">Liderazgo & Gobernanza</span>
            </div>
          </div>
          <div className="org-root-stem-line" />
        </div>

        {/* Ramas y Nodos Hijos */}
        <div className="org-branches-row">
          {areas.map((area, index) => {
            const isFirst = index === 0;
            const isLast = index === areas.length - 1;
            const connectorClass = isFirst
              ? 'line-first'
              : isLast
              ? 'line-last'
              : 'line-middle';

            const isActive = activeArea === area.positionId;

            return (
              <div className="org-branch-col" key={area.id}>
                <div className={`org-line-connector ${connectorClass} ${isActive ? 'active-line' : ''}`} />
                <div
                  className={`org-child-card ${isActive ? 'is-active' : ''}`}
                  onMouseEnter={() => setActiveArea(area.positionId)}
                  onMouseLeave={() => setActiveArea(null)}
                >
                  <div className="child-icon-box">{area.icon}</div>
                  <span className="child-name-text">{area.name}</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <div className="section-badge" style={{ marginTop: '4.5rem' }}>
        <span className="badge-dot" />
        <span>DESCRIPCIÓN DE POSICIONES</span>
      </div>

      <h3 style={{ fontSize: '2.2rem', fontWeight: 400, marginBottom: '2.5rem', letterSpacing: '-0.02em' }}>
        Roles y Responsabilidades Clave
      </h3>

      {/* Grid de Posiciones Estilo IntegratedBio Irregular Cutout Corner */}
      <div className="cutout-grid">
        {positions.map((pos) => {
          const isHighlighted = activeArea === pos.id;
          return (
            <div
              className={`cutout-card-wrapper ${pos.themeClass} ${isHighlighted ? 'active-highlight' : ''}`}
              key={pos.id}
              onMouseEnter={() => setActiveArea(pos.id)}
              onMouseLeave={() => setActiveArea(null)}
            >
              {/* Tarjeta Irregular con la Máscara del Cutout Corner */}
              <a
                href={pos.pdfUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="cutout-card-inner"
              >
                <div className="cutout-card-content">
                  <div className="card-meta">
                    <span className="card-meta-badge">
                      POSICIÓN {pos.id}
                    </span>
                    <span className="meta-date">CALIDAD AITECH</span>
                  </div>

                  <h4 className="pos-title">{pos.title}</h4>

                  <p className="pos-mision">
                    <strong>Misión:</strong> {pos.mision}
                  </p>

                  <p className="pos-funciones">
                    <strong>Funciones:</strong> {pos.funciones}
                  </p>

                  {/* Texto de Acción "VER MÁS DETALLES" */}
                  <div className="cutout-action-row">
                    <span className="cutout-link-text">VER MÁS DETALLES</span>
                  </div>
                </div>
              </a>

              {/* Botón Verde con Flecha alojado exactamente en la Muesca / Pocket del Cutout */}
              <a
                href={pos.pdfUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="cutout-pocket-arrow-btn"
                aria-label={`Ver más detalles de ${pos.title}`}
              >
                <svg width="14" height="14" viewBox="0 0 10 10" fill="none">
                  <path fill="currentColor" d="M7.703 5.8H.398V4.6h7.305l-3.36-3.36.855-.84 4.8 4.8-4.8 4.8-.855-.84 3.36-3.36Z" />
                </svg>
              </a>
            </div>
          );
        })}
      </div>
    </section>
  );
}
