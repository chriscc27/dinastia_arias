import React, { useState } from 'react';
import {
  idef0GeneralTheory,
  idef0QualityContext,
} from '../data/idef0Data';

export default function IDEF0Section() {
  // Estado para el cuadrante ICOM seleccionado en el diagrama A-0 ('controls', 'inputs', 'outputs', 'mechanisms')
  const [selectedIcomType, setSelectedIcomType] = useState('controls');
  // Estado para expandir la lista completa o mantener solo los 4-5 principales
  const [showAllIcomItems, setShowAllIcomItems] = useState(false);

  const { icomData, mainFunction } = idef0QualityContext;

  // Filtrar items según si se muestra la lista compacta (4-5 primarios) o completa
  const getDisplayedItems = (type) => {
    const list = icomData[type] || [];
    if (showAllIcomItems) return list;
    return list.filter((item) => item.isPrimary);
  };

  return (
    <section
      id="idef-0"
      className="light-section mbti-section idef0-main-section"
      style={{ borderTop: '1px solid rgba(34, 47, 48, 0.08)' }}
    >
      <div className="scrum-content-container">
        {/* ====================================================================
            1. DEFINICIÓN GENERAL DE IDEF-0 (PRIMERO Y DIDÁCTICO)
            ==================================================================== */}
        <div className="section-badge">
          <span className="badge-dot" />
          <span>{idef0GeneralTheory.badge}</span>
        </div>

        <h2 className="section-heading-xl">{idef0GeneralTheory.title}</h2>
        <p className="section-desc-lead" style={{ marginBottom: '1.25rem' }}>
          <strong>{idef0GeneralTheory.subtitle}</strong> — {idef0GeneralTheory.lead}
        </p>

        {/* Bloque de Origen y Estandarización */}
        <div className="idef0-origin-banner">
          <div className="origin-badge-col">
            <span className="origin-pill">ESTÁNDAR FORMAL</span>
            <span className="origin-code">{idef0GeneralTheory.origin.standard}</span>
          </div>
          <div className="origin-desc-col">
            <p>{idef0GeneralTheory.origin.description}</p>
          </div>
        </div>

        {/* Principios Fundamentales */}
        <div className="idef0-principles-grid">
          {idef0GeneralTheory.corePrinciples.map((principle) => (
            <div key={principle.id} className="idef0-principle-card">
              <span className="principle-tag">{principle.tag}</span>
              <h4 className="principle-title">{principle.title}</h4>
              <p className="principle-desc">{principle.desc}</p>
            </div>
          ))}
        </div>

        {/* Anatomía ICOM Didáctica */}
        <div className="idef0-subheading-group" style={{ marginTop: '3.5rem' }}>
          <div className="section-badge" style={{ marginBottom: '0.75rem' }}>
            <span className="badge-dot" />
            <span>SINTAXIS UNIVERSAL</span>
          </div>
          <h3 className="mbti-subheading">La Estructura ICOM: ¿Cómo funciona un bloque IDEF-0?</h3>
          <p className="mbti-sublead">
            En IDEF-0 cada función es una caja rectangular donde la posición geométrica de cada flecha define unívocamente su rol sistémico:
          </p>
        </div>

        <div className="idef0-icom-anatomy-grid">
          {idef0GeneralTheory.icomElements.map((elem) => (
            <div key={elem.id} className={`icom-element-box ${elem.borderClass}`}>
              <div className="icom-header-row">
                <span className="icom-char-badge" style={{ color: elem.color }}>
                  {elem.code}
                </span>
                <div>
                  <h4 className="icom-elem-title">{elem.name}</h4>
                  <span className="icom-dir-tag">Flecha: {elem.direction}</span>
                </div>
              </div>
              <p className="icom-def-text">{elem.definition}</p>
              <div className="icom-question-box">
                <span className="question-icon">?</span>
                <em>{elem.question}</em>
              </div>
            </div>
          ))}
        </div>

        {/* Separador editorial sutil */}
        <div className="idef0-divider-editorial" />

        {/* ====================================================================
            2. MODELADO DE LA FUNCIÓN DE CALIDAD EN AITECH (A-0)
            ==================================================================== */}
        <div className="idef0-subheading-group" style={{ marginTop: '2rem' }}>
          <div className="section-badge" style={{ marginBottom: '0.75rem' }}>
            <span className="badge-dot" />
            <span>{idef0QualityContext.badge}</span>
          </div>
          <h3 className="mbti-subheading">{idef0QualityContext.title}</h3>
          <p className="mbti-sublead">{idef0QualityContext.lead}</p>
        </div>

        {/* Barra de control para el diagrama A-0: Vista compacta vs completa */}
        <div className="idef0-view-toggle-bar">
          <div className="view-toggle-info">
            <span className="view-toggle-label">Visualización del diagrama A-0:</span>
            <span className="view-toggle-status">
              {showAllIcomItems
                ? 'Mostrando todos los flujos exhaustivos'
                : 'Mostrando los 4-5 flujos más relevantes (visión limpia sin saturación)'}
            </span>
          </div>
          <button
            type="button"
            className="idef0-toggle-btn"
            onClick={() => setShowAllIcomItems(!showAllIcomItems)}
          >
            {showAllIcomItems ? '← Mostrar solo los 4-5 principales' : '🔍 Ver todos los flujos detallados'}
          </button>
        </div>

        {/* ====================================================================
            DIAGRAMA VISUAL A-0 INTERACTIVO
            ==================================================================== */}
        <div className="idef0-diagram-container">
          {/* Fila Superior: CONTROLS */}
          <div className="idef0-row-controls">
            <div className="icom-port-header">
              <button
                type="button"
                className={`icom-port-btn ${selectedIcomType === 'controls' ? 'active' : ''}`}
                onClick={() => setSelectedIcomType('controls')}
              >
                <span className="port-icon">↓</span>
                <span className="port-label">CONTROLES (C)</span>
                <span className="port-count">{icomData.controls.length} normas & criterios</span>
              </button>
            </div>
            <div className="icom-flow-chips">
              {getDisplayedItems('controls').map((c) => (
                <div
                  key={c.id}
                  className="flow-chip chip-control"
                  onClick={() => setSelectedIcomType('controls')}
                  title={c.desc}
                >
                  <span className="chip-arrow">↓</span>
                  <span className="chip-text">{c.title}</span>
                </div>
              ))}
              {!showAllIcomItems && (
                <button
                  type="button"
                  className="flow-chip-more"
                  onClick={() => {
                    setSelectedIcomType('controls');
                    setShowAllIcomItems(true);
                  }}
                >
                  +{icomData.controls.length - 5} controles más...
                </button>
              )}
            </div>
          </div>

          {/* Fila Central: INPUTS -> FUNCIÓN A-0 -> OUTPUTS */}
          <div className="idef0-row-center">
            {/* Lado Izquierdo: INPUTS */}
            <div className="idef0-col-inputs">
              <button
                type="button"
                className={`icom-port-btn ${selectedIcomType === 'inputs' ? 'active' : ''}`}
                onClick={() => setSelectedIcomType('inputs')}
              >
                <span className="port-icon">→</span>
                <span className="port-label">ENTRADAS (I)</span>
                <span className="port-count">{icomData.inputs.length} artefactos</span>
              </button>
              <div className="icom-flow-chips vertical">
                {getDisplayedItems('inputs').map((i) => (
                  <div
                    key={i.id}
                    className="flow-chip chip-input"
                    onClick={() => setSelectedIcomType('inputs')}
                    title={i.desc}
                  >
                    <span className="chip-arrow">→</span>
                    <span className="chip-text">{i.title}</span>
                  </div>
                ))}
                {!showAllIcomItems && (
                  <button
                    type="button"
                    className="flow-chip-more"
                    onClick={() => {
                      setSelectedIcomType('inputs');
                      setShowAllIcomItems(true);
                    }}
                  >
                    +{icomData.inputs.length - 5} entradas más...
                  </button>
                )}
              </div>
            </div>

            {/* Núcleo Central: CAJA FUNCIONAL A-0 */}
            <div className="idef0-center-box">
              <div className="a0-box-header">
                <span className="a0-node-badge">{mainFunction.code}</span>
                <span className="a0-level-label">NIVEL DE CONTEXTO</span>
              </div>
              <h3 className="a0-function-title">{mainFunction.title}</h3>
              <p className="a0-function-purpose">{mainFunction.purpose}</p>
              <div className="a0-box-footer">
                <span className="a0-viewpoint-label">Punto de vista:</span>
                <span className="a0-viewpoint-val">{mainFunction.viewpoint}</span>
              </div>
            </div>

            {/* Lado Derecho: OUTPUTS */}
            <div className="idef0-col-outputs">
              <button
                type="button"
                className={`icom-port-btn ${selectedIcomType === 'outputs' ? 'active' : ''}`}
                onClick={() => setSelectedIcomType('outputs')}
              >
                <span className="port-icon">→</span>
                <span className="port-label">SALIDAS (O)</span>
                <span className="port-count">{icomData.outputs.length} resultados</span>
              </button>
              <div className="icom-flow-chips vertical">
                {getDisplayedItems('outputs').map((o) => (
                  <div
                    key={o.id}
                    className="flow-chip chip-output"
                    onClick={() => setSelectedIcomType('outputs')}
                    title={o.desc}
                  >
                    <span className="chip-arrow">→</span>
                    <span className="chip-text">{o.title}</span>
                  </div>
                ))}
                {!showAllIcomItems && (
                  <button
                    type="button"
                    className="flow-chip-more"
                    onClick={() => {
                      setSelectedIcomType('outputs');
                      setShowAllIcomItems(true);
                    }}
                  >
                    +{icomData.outputs.length - 5} salidas más...
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* Fila Inferior: MECHANISMS */}
          <div className="idef0-row-mechanisms">
            <div className="icom-flow-chips">
              {getDisplayedItems('mechanisms').map((m) => (
                <div
                  key={m.id}
                  className="flow-chip chip-mechanism"
                  onClick={() => setSelectedIcomType('mechanisms')}
                  title={m.desc}
                >
                  <span className="chip-arrow">↑</span>
                  <span className="chip-text">{m.title}</span>
                </div>
              ))}
              {!showAllIcomItems && (
                <button
                  type="button"
                  className="flow-chip-more"
                  onClick={() => {
                    setSelectedIcomType('mechanisms');
                    setShowAllIcomItems(true);
                  }}
                >
                  +{icomData.mechanisms.length - 5} mecanismos más...
                </button>
              )}
            </div>
            <div className="icom-port-header" style={{ marginTop: '0.75rem' }}>
              <button
                type="button"
                className={`icom-port-btn ${selectedIcomType === 'mechanisms' ? 'active' : ''}`}
                onClick={() => setSelectedIcomType('mechanisms')}
              >
                <span className="port-icon">↑</span>
                <span className="port-label">MECANISMOS (M)</span>
                <span className="port-count">{icomData.mechanisms.length} recursos y herramientas</span>
              </button>
            </div>
          </div>
        </div>

        {/* ====================================================================
            PANEL DE INSPECCIÓN ICOM DINÁMICO
            ==================================================================== */}
        <div className="idef0-inspector-card">
          <div className="inspector-header">
            <div className="inspector-title-row">
              <span className="inspector-badge">
                DETALLE ICOM: {selectedIcomType.toUpperCase()}
              </span>
              <h4 className="inspector-heading">
                {selectedIcomType === 'controls' && 'Controles de Calidad: Normas, Criterios y Políticas'}
                {selectedIcomType === 'inputs' && 'Entradas Tecnológicas del Proceso de Calidad'}
                {selectedIcomType === 'outputs' && 'Salidas y Entregables Formales del Área de QA'}
                {selectedIcomType === 'mechanisms' && 'Mecanismos: Roles, Herramientas y Plataformas'}
              </h4>
            </div>
            <div className="inspector-tabs">
              {['controls', 'inputs', 'outputs', 'mechanisms'].map((type) => (
                <button
                  key={type}
                  type="button"
                  className={`inspector-tab-btn ${selectedIcomType === type ? 'active' : ''}`}
                  onClick={() => setSelectedIcomType(type)}
                >
                  {type === 'controls' && 'Controles (C)'}
                  {type === 'inputs' && 'Entradas (I)'}
                  {type === 'outputs' && 'Salidas (O)'}
                  {type === 'mechanisms' && 'Mecanismos (M)'}
                </button>
              ))}
            </div>
          </div>

          <p className="inspector-intro">
            {selectedIcomType === 'controls' &&
              'Los controles nunca son genéricos. Regulan con precisión técnica cada prueba, revisión y decisión de pase a producción basada en normas internacionales y políticas internas.'}
            {selectedIcomType === 'inputs' &&
              'Artefactos de software, especificaciones y datos que ingresan al departamento de calidad para ser verificados, analizados o validados.'}
            {selectedIcomType === 'outputs' &&
              'Productos tangibles, dictámenes oficiales, informes ejecutivos y métricas emitidas por el equipo de aseguramiento de calidad.'}
            {selectedIcomType === 'mechanisms' &&
              'Talento humano especializado, plataformas de CI/CD, frameworks de testing y herramientas de observabilidad que soportan la ejecución técnica.'}
          </p>

          <div className="inspector-items-grid">
            {icomData[selectedIcomType].map((item, idx) => (
              <div key={item.id} className="inspector-item-card">
                <div className="item-card-top">
                  <span className="item-order-badge">#{idx + 1}</span>
                  {item.isPrimary && <span className="item-primary-pill">Prioritario en Diagrama</span>}
                  {item.reference && <span className="item-ref-pill">{item.reference}</span>}
                  {item.recipient && <span className="item-ref-pill">Destino: {item.recipient}</span>}
                  {item.type && <span className="item-ref-pill">{item.type}</span>}
                  {item.nature && <span className="item-ref-pill">{item.nature}</span>}
                </div>
                <h5 className="item-card-title">{item.title}</h5>
                <p className="item-card-desc">{item.desc}</p>
                {item.application && (
                  <div className="item-card-app">
                    <span className="app-label">Aplicación práctica en software:</span>
                    <span className="app-val">{item.application}</span>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
