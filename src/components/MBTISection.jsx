import React, { useState } from 'react';
import { mbtiTheory, teamMbtiMembers, mbtiRoleDistribution } from '../data/mbtiData';

export default function MBTISection() {
  const [activeDimension, setActiveDimension] = useState(0);
  const [activeRoleNode, setActiveRoleNode] = useState(null);

  return (
    <section id="mbti" className="light-section mbti-section" style={{ borderTop: '1px solid rgba(34, 47, 48, 0.08)' }}>
      {/* ====================================================================
          PARTE 1 — TEORÍA / EXPLICACIÓN DEL MBTI
          ==================================================================== */}
      <div className="mbti-theory-container">
        {/* Badge de Sección */}
        <div className="section-badge">
          <span className="badge-dot" />
          <span>{mbtiTheory.badge}</span>
        </div>

        {/* Encabezado Principal */}
        <h2 className="section-heading-xl">
          {mbtiTheory.title}
        </h2>

        {/* Descripción Introductoria */}
        <p className="section-desc-lead" style={{ marginBottom: '2rem' }}>
          {mbtiTheory.lead}
        </p>

        {/* Nota Metodológica Importante: No es diagnóstico psicológico */}
        <div className="mbti-notice-box">
          <div className="notice-icon-wrapper">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="12" cy="12" r="10" />
              <line x1="12" y1="8" x2="12" y2="12" />
              <line x1="12" y1="16" x2="12.01" y2="16" />
            </svg>
          </div>
          <div className="notice-content">
            <h4>Enfoque Metodológico</h4>
            <p>{mbtiTheory.clarification}</p>
            <div className="preference-pillars-grid">
              {mbtiTheory.preferenceAreas.map((area) => (
                <div key={area.id} className="pillar-item">
                  <span className="pillar-dot" />
                  <div>
                    <strong className="pillar-label">{area.label}:</strong>{' '}
                    <span className="pillar-desc">{area.desc}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ==================================================================
            LAS 4 DIMENSIONES DEL MBTI
            ================================================================== */}
        <div className="mbti-subheading-group">
          <div className="section-badge" style={{ marginBottom: '1rem' }}>
            <span className="badge-dot" />
            <span>ARQUITECTURA DEL MODELO</span>
          </div>
          <h3 className="mbti-subheading">Las 4 Dimensiones del MBTI</h3>
          <p className="mbti-sublead">
            Cada dimensión representa una dicotomía de preferencias complementarias. Ninguna preferencia es mejor que otra; describen diferentes formas de procesar la realidad.
          </p>
        </div>

        {/* Grid de las 4 Dimensiones */}
        <div className="dimensions-grid">
          {mbtiTheory.dimensions.map((dim, idx) => (
            <div
              key={dim.id}
              className={`dimension-card ${activeDimension === idx ? 'is-active-dim' : ''}`}
              onMouseEnter={() => setActiveDimension(idx)}
            >
              <div className="dim-card-header">
                <span className="dim-number">{dim.number}</span>
                <h4 className="dim-title">{dim.title}</h4>
              </div>

              {/* Dicotomía Visual: Opción A vs Opción B */}
              <div className="dim-options-wrapper">
                {dim.options.map((opt, oIdx) => (
                  <div key={opt.letter} className={`dim-opt-block ${oIdx === 0 ? 'opt-left' : 'opt-right'}`}>
                    <div className="dim-opt-badge-row">
                      <span className="dim-letter-badge">{opt.letter}</span>
                      <span className="dim-opt-name">{opt.nameEs}</span>
                      <span className="dim-opt-en">({opt.name})</span>
                    </div>
                    <span className="dim-opt-tag">{opt.tag}</span>
                    <p className="dim-opt-desc">{opt.description}</p>
                  </div>
                ))}
              </div>

              {/* Aclaración especial si corresponde (p.ej. por qué se usa N para Intuición) */}
              {dim.letterClarification && (
                <div className="dim-clarification-pill">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <circle cx="12" cy="12" r="10" />
                    <line x1="12" y1="16" x2="12" y2="12" />
                    <line x1="12" y1="8" x2="12.01" y2="8" />
                  </svg>
                  <span>{dim.letterClarification}</span>
                </div>
              )}

              {dim.note && (
                <div className="dim-note-footer">
                  <span>{dim.note}</span>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* ==================================================================
            EXPLICACIÓN DE LAS SIGLAS (VISUAL Y ESCANEABLE)
            ================================================================== */}
        <div className="siglas-section-block">
          <div className="siglas-header">
            <h4>Guía Rápida de Siglas</h4>
            <p>Estructura de referencia para escanear y comprender cada letra del sistema:</p>
          </div>

          <div className="siglas-grid">
            <div className="siglas-pair-card">
              <div className="siglas-pair-header">Fuente de Energía</div>
              <div className="siglas-row">
                <div className="sigla-item">
                  <span className="sigla-badge">E</span>
                  <div className="sigla-info">
                    <strong>Extravertido</strong>
                    <span>Enfoque en el entorno social y acción externa</span>
                  </div>
                </div>
                <div className="siglas-divider">vs</div>
                <div className="sigla-item">
                  <span className="sigla-badge">I</span>
                  <div className="sigla-info">
                    <strong>Introvertido</strong>
                    <span>Enfoque en el mundo interno y reflexión autónoma</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="siglas-pair-card">
              <div className="siglas-pair-header">Procesamiento de Datos</div>
              <div className="siglas-row">
                <div className="sigla-item">
                  <span className="sigla-badge">S</span>
                  <div className="sigla-info">
                    <strong>Sensación</strong>
                    <span>Preferencia por hechos concretos y detalles observables</span>
                  </div>
                </div>
                <div className="siglas-divider">vs</div>
                <div className="sigla-item">
                  <span className="sigla-badge">N</span>
                  <div className="sigla-info">
                    <strong>Intuición</strong>
                    <span>Preferencia por patrones, conceptos e ideas de futuro</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="siglas-pair-card">
              <div className="siglas-pair-header">Criterio de Decisión</div>
              <div className="siglas-row">
                <div className="sigla-item">
                  <span className="sigla-badge">T</span>
                  <div className="sigla-info">
                    <strong>Pensamiento</strong>
                    <span>Preferencia por lógica, criterios objetivos y consistencia</span>
                  </div>
                </div>
                <div className="siglas-divider">vs</div>
                <div className="sigla-item">
                  <span className="sigla-badge">F</span>
                  <div className="sigla-info">
                    <strong>Sentimiento</strong>
                    <span>Preferencia por valores humanos, impacto y empatía</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="siglas-pair-card">
              <div className="siglas-pair-header">Estilo de Organización</div>
              <div className="siglas-row">
                <div className="sigla-item">
                  <span className="sigla-badge">J</span>
                  <div className="sigla-info">
                    <strong>Juicio</strong>
                    <span>Preferencia por planificación, estructura y orden</span>
                  </div>
                </div>
                <div className="siglas-divider">vs</div>
                <div className="sigla-item">
                  <span className="sigla-badge">P</span>
                  <div className="sigla-info">
                    <strong>Percepción</strong>
                    <span>Preferencia por flexibilidad, adaptación y exploración</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ==================================================================
            ¿CÓMO SE FORMA UN TIPO MBTI? + EJEMPLO
            ================================================================== */}
        <div className="mbti-formula-container">
          <div className="formula-header-col">
            <span className="formula-badge">COMBINATORIA</span>
            <h4 className="formula-title">{mbtiTheory.formula.title}</h4>
            <p className="formula-explanation">{mbtiTheory.formula.explanation}</p>

            <div className="formula-math-display">
              <span className="formula-box-part">E / I</span>
              <span className="formula-plus">+</span>
              <span className="formula-box-part">S / N</span>
              <span className="formula-plus">+</span>
              <span className="formula-box-part">T / F</span>
              <span className="formula-plus">+</span>
              <span className="formula-box-part">J / P</span>
            </div>
          </div>

          <div className="formula-example-card">
            <div className="example-badge-top">
              <span>EJEMPLO ILUSTRATIVO</span>
              <strong className="example-type-highlight">{mbtiTheory.formula.example.type}</strong>
            </div>

            <div className="example-steps-list">
              {mbtiTheory.formula.example.letters.map((item) => (
                <div key={item.letter} className="example-step-item">
                  <span className="example-step-letter">{item.letter}</span>
                  <div className="example-step-text">
                    <strong>→ {item.name}:</strong> <span>{item.meaning}</span>
                  </div>
                </div>
              ))}
            </div>

            <div className="example-summary-footer">
              <p>{mbtiTheory.formula.example.summary}</p>
            </div>
          </div>
        </div>

        {/* ==================================================================
            SUFIJOS A / T (ACLARACIÓN METODOLÓGICA 16PERSONALITIES)
            ================================================================== */}
        <div className="suffix-section-box">
          <div className="suffix-header">
            <div className="section-badge" style={{ marginBottom: '0.8rem' }}>
              <span className="badge-dot" />
              <span>{mbtiTheory.suffixClarification.badge}</span>
            </div>
            <h4>{mbtiTheory.suffixClarification.title}</h4>
            <p className="suffix-lead">{mbtiTheory.suffixClarification.lead}</p>
            <div className="suffix-alert-callout">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
                <line x1="12" y1="9" x2="12" y2="13" />
                <line x1="12" y1="17" x2="12.01" y2="17" />
              </svg>
              <span>{mbtiTheory.suffixClarification.alertNote}</span>
            </div>
          </div>

          <div className="suffix-cards-grid">
            {mbtiTheory.suffixClarification.suffixes.map((suf) => (
              <div key={suf.letter} className="suffix-card">
                <div className="suffix-card-top">
                  <span className="suffix-letter-pill">-{suf.letter}</span>
                  <div>
                    <h5>{suf.name}</h5>
                    <span className="suffix-tag">{suf.tag}</span>
                  </div>
                </div>
                <p>{suf.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ====================================================================
          TRANSICIÓN VISUAL / SEPARADOR ELEGANTE
          ==================================================================== */}
      <div className="mbti-transition-divider">
        <div className="transition-line-left" />
        <div className="transition-center-badge">
          <span className="transition-sparkle">✦</span>
          <span className="transition-text">
            Ahora que conocemos el modelo, veamos cómo se refleja en nuestro equipo
          </span>
          <span className="transition-sparkle">✦</span>
        </div>
        <div className="transition-line-right" />
      </div>

      {/* ====================================================================
          PARTE 2 — MBTI DEL EQUIPO AITECH
          ==================================================================== */}
      <div className="mbti-team-container">
        <div className="section-badge">
          <span className="badge-dot" />
          <span>PERFILES DE PERSONALIDAD AITECH</span>
        </div>

        <h3 className="section-heading-xl" style={{ marginBottom: '1.2rem' }}>
          Nuestro equipo según MBTI.
        </h3>

        <p className="section-desc-lead" style={{ marginBottom: '3.5rem' }}>
          La sinergia de la Dirección de Calidad de AITECH se fundamenta en perfiles complementarios: visión analítica, rigor estructurado, liderazgo estratégico, pragmatismo técnico y dinamismo creativo trabajando en armonía.
        </p>

        {/* Grid con los 5 Integrantes */}
        <div className="mbti-team-grid">
          {teamMbtiMembers.map((member) => (
            <div key={member.id} className={`mbti-member-card ${member.themeClass}`}>
              {/* Encabezado de la Tarjeta: Avatar abstracto + Código MBTI */}
              <div className="member-card-top">
                <div className="member-avatar-box">
                  <span className="member-initials">{member.initials}</span>
                  <span className="member-status-dot" />
                </div>

                <div className="member-type-badge-box">
                  <span className="member-type-code">{member.type}</span>
                  <span className="member-archetype-name">{member.roleArchetype}</span>
                </div>
              </div>

              {/* Nombre del Integrante */}
              <h4 className="member-name">{member.name}</h4>

              {/* Resumen de letras */}
              <div className="member-letter-summary">
                <span>{member.letterSummary}</span>
              </div>

              {/* Desglose individual de cada letra */}
              <div className="member-letters-breakdown">
                {member.lettersBreakdown.map((item, lIdx) => (
                  <div key={lIdx} className={`letter-badge-item ${item.isSpecial ? 'special-t-highlight' : ''}`}>
                    <span className="breakdown-letter">{item.letter}</span>
                    <div className="breakdown-info">
                      <span className="breakdown-label">{item.label}</span>
                      <span className="breakdown-desc">{item.desc}</span>
                    </div>
                  </div>
                ))}
              </div>

              {/* Nota especial para Sergio Arias (diferenciación primera T vs segunda T) */}
              {member.specialNote && (
                <div className="member-special-clarification">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <circle cx="12" cy="12" r="10" />
                    <line x1="12" y1="16" x2="12" y2="12" />
                    <line x1="12" y1="8" x2="12.01" y2="8" />
                  </svg>
                  <span>{member.specialNote}</span>
                </div>
              )}

              {/* Descripción de Personalidad */}
              <div className="member-desc-block">
                <p>{member.description}</p>
              </div>

              {/* Aporte al Equipo */}
              <div className="member-contributions-block">
                <span className="contrib-title">Aporte al equipo:</span>
                <ul className="contrib-chips-list">
                  {member.contributions.map((item, cIdx) => (
                    <li key={cIdx} className="contrib-chip">
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>

        {/* ====================================================================
            SUBSECCIÓN — DISTRIBUCIÓN DE ROLES ("DEL PERFIL A LA FUNCIÓN")
            ==================================================================== */}
        <div className="mbti-roles-section-wrapper">
          <div className="section-badge" style={{ marginTop: '5.5rem', marginBottom: '1.2rem' }}>
            <span className="badge-dot" />
            <span>{mbtiRoleDistribution.sectionBadge}</span>
          </div>

          <h3 className="section-heading-xl" style={{ fontSize: 'clamp(2rem, 3.2vw, 2.8rem)', marginBottom: '1rem' }}>
            {mbtiRoleDistribution.title}
          </h3>

          <p className="section-desc-lead" style={{ marginBottom: '1.2rem', maxWidth: '850px' }}>
            {mbtiRoleDistribution.intro}
          </p>

          <p className="mbti-roles-justification">
            {mbtiRoleDistribution.justification}
          </p>

          {/* Organigrama Visual: MBTI → INTEGRANTE → ROL */}
          <div className="mbti-org-wrapper">
            {/* Nodo Principal: ALAN FLORES / ENTJ-A / QA LEAD */}
            <div className="mbti-org-root-container">
              <div
                className={`mbti-org-node-card root-node ${activeRoleNode === 'alan' ? 'is-active' : ''}`}
                onMouseEnter={() => setActiveRoleNode('alan')}
                onMouseLeave={() => setActiveRoleNode(null)}
              >
                <div className="mbti-node-header">
                  <span className="lead-pulse-dot" />
                  <span className="mbti-node-name">{mbtiRoleDistribution.rootLeader.name}</span>
                </div>
                <span className="mbti-node-badge-pill">{mbtiRoleDistribution.rootLeader.mbti}</span>
                <span className="mbti-node-role">{mbtiRoleDistribution.rootLeader.role}</span>
              </div>
              <div className="org-root-stem-line" />
            </div>

            {/* Ramas y Nodos Hijos: SERGIO, LEONARDO, DANIEL, CHRISTIAN */}
            <div className="mbti-org-branches-row">
              {mbtiRoleDistribution.branches.map((branch, index) => {
                const isFirst = index === 0;
                const isLast = index === mbtiRoleDistribution.branches.length - 1;
                const connectorClass = isFirst
                  ? 'line-first'
                  : isLast
                  ? 'line-last'
                  : 'line-middle';

                const isActive = activeRoleNode === branch.id || activeRoleNode === 'alan';

                return (
                  <div className="mbti-org-branch-col" key={branch.id}>
                    <div className={`org-line-connector ${connectorClass} ${isActive ? 'active-line' : ''}`} />
                    <div
                      className={`mbti-org-node-card child-node ${activeRoleNode === branch.id ? 'is-active' : ''}`}
                      onMouseEnter={() => setActiveRoleNode(branch.id)}
                      onMouseLeave={() => setActiveRoleNode(null)}
                    >
                      <div className="mbti-node-header">
                        <div className="mbti-node-icon-box">
                          {branch.id === 'sergio' && (
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                              <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
                            </svg>
                          )}
                          {branch.id === 'leonardo' && (
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                              <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                            </svg>
                          )}
                          {branch.id === 'daniel' && (
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                              <circle cx="12" cy="12" r="10" />
                              <path d="M16 8l-4 4-4-4" />
                              <path d="M12 12v6" />
                            </svg>
                          )}
                          {branch.id === 'christian' && (
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                              <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
                              <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
                            </svg>
                          )}
                        </div>
                        <span className="mbti-node-name">{branch.name}</span>
                      </div>
                      <span className="mbti-node-badge-pill">{branch.mbti}</span>
                      <span className="mbti-node-role">{branch.role}</span>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Frase breve de cierre */}
            <div className="mbti-roles-closing">
              <span className="closing-sparkle">✦</span>
              <span>{mbtiRoleDistribution.closingPhrase}</span>
              <span className="closing-sparkle">✦</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
