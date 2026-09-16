import React, { useState } from 'react';
import { bpmnGeneralTheory } from '../data/bpmnData';
import { bpmnDiagramConfig, generateBpmnXml } from '../data/bpmnDiagramLayout';

// Subcomponente de glifos estándar BPMN para esquinas superiores de tareas
function TaskTypeIcon({ type }) {
  if (type === 'service') {
    // Engranaje (Service / Automated Task)
    return (
      <g transform="translate(6, 6) scale(0.85)" stroke="#334155" fill="none" strokeWidth="1.3">
        <circle cx="8" cy="8" r="3" />
        <path d="M 8 1 v 2 M 8 13 v 2 M 1 8 h 2 M 13 8 h 2 M 3 3 l 1.5 1.5 M 11.5 11.5 l 1.5 1.5 M 3 13 l 1.5 -1.5 M 11.5 4.5 l 1.5 -1.5" />
      </g>
    );
  }
  if (type === 'send') {
    // Sobre (Send Task)
    return (
      <g transform="translate(6, 6) scale(0.85)" stroke="#334155" fill="none" strokeWidth="1.3">
        <rect x="1" y="2" width="14" height="10" rx="1.5" />
        <path d="M 1 3.5 L 8 8.5 L 15 3.5" />
      </g>
    );
  }
  if (type === 'manual') {
    // Manual / Checklist Task
    return (
      <g transform="translate(6, 6) scale(0.85)" stroke="#334155" fill="none" strokeWidth="1.3">
        <rect x="2" y="2" width="12" height="12" rx="1.5" />
        <path d="M 5 5 h 6 M 5 8 h 6 M 5 11 h 3" />
      </g>
    );
  }
  if (type === 'user') {
    // Usuario / Persona (User Task)
    return (
      <g transform="translate(6, 6) scale(0.85)" stroke="#334155" fill="none" strokeWidth="1.3">
        <circle cx="8" cy="5" r="2.8" />
        <path d="M 2.5 13.5 c 0 -2.5 2.5 -3.5 5.5 -3.5 s 5.5 1 5.5 3.5" />
      </g>
    );
  }
  return null;
}

// Convierte array de puntos ortogonales a string path SVG
function pointsToSvgPath(points) {
  if (!points || points.length === 0) return '';
  return points.map((p, idx) => (idx === 0 ? `M ${p.x} ${p.y}` : `L ${p.x} ${p.y}`)).join(' ');
}

// Divide texto de etiqueta para renderizado multilínea
function splitLabelText(text) {
  if (!text) return [];
  return text.split('\n');
}

export default function BPMNSection() {
  const { canvasWidth, canvasHeight, poolHeaderWidth, laneHeaderWidth, poolTitle, lanes, nodes, flows } = bpmnDiagramConfig;

  // Nodo activo seleccionado
  const [selectedNodeId, setSelectedNodeId] = useState('start-event');
  // Elemento BPMN seleccionado en la teoría superior
  const [selectedElementId, setSelectedElementId] = useState('actividad');

  // Controles de zoom y paneo interactivo
  const [zoomLevel, setZoomLevel] = useState(1);
  const [panOffset, setPanOffset] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragOrigin, setDragOrigin] = useState({ x: 0, y: 0 });

  // Nodo actualmente activo para el inspector
  const activeNode = nodes.find((n) => n.id === selectedNodeId) || nodes[0];
  const sortedSteps = [...nodes].sort((a, b) => a.stepNumber - b.stepNumber);

  // Manejo de zoom
  const handleZoomIn = () => {
    setZoomLevel((z) => Math.min(1.8, Number((z + 0.15).toFixed(2))));
  };

  const handleZoomOut = () => {
    setZoomLevel((z) => Math.max(0.55, Number((z - 0.15).toFixed(2))));
  };

  const handleResetZoom = () => {
    setZoomLevel(1);
    setPanOffset({ x: 0, y: 0 });
  };

  // Descarga del archivo oficial XML .bpmn
  const handleDownloadBpmn = () => {
    const xmlContent = generateBpmnXml();
    const blob = new Blob([xmlContent], { type: 'application/xml;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', 'aitech-evaluacion-calidad.bpmn');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  // Paneo con ratón (arrastrar sobre el lienzo)
  const handleMouseDown = (e) => {
    if (e.button !== 0) return;
    if (e.target.closest('.bpmn-interactive-node')) return;
    setIsDragging(true);
    setDragOrigin({ x: e.clientX - panOffset.x, y: e.clientY - panOffset.y });
  };

  const handleMouseMove = (e) => {
    if (!isDragging) return;
    setPanOffset({
      x: e.clientX - dragOrigin.x,
      y: e.clientY - dragOrigin.y,
    });
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  return (
    <section
      id="bpmn"
      className="light-section mbti-section bpmn-main-section"
      style={{ borderTop: '1px solid rgba(34, 47, 48, 0.08)' }}
    >
      <div className="scrum-content-container">
        {/* ====================================================================
            1. HERO & DEFINICIÓN DIDÁCTICA GENERAL DE BPMN 2.0.2
            ==================================================================== */}
        <div className="section-badge">
          <span className="badge-dot" />
          <span>{bpmnGeneralTheory.badge}</span>
        </div>

        <h2 className="section-heading-xl">{bpmnGeneralTheory.title}</h2>
        <p className="section-desc-lead" style={{ marginBottom: '1.25rem' }}>
          <strong>{bpmnGeneralTheory.subtitle}</strong> — {bpmnGeneralTheory.lead}
        </p>

        {/* Banner de Referencia Formal */}
        <div className="bpmn-origin-banner">
          <div className="origin-badge-col">
            <span className="origin-pill">NOTACIÓN ESTÁNDAR</span>
            <span className="origin-code">{bpmnGeneralTheory.standardRef}</span>
          </div>
          <div className="origin-desc-col">
            <p>
              Mientras IDEF-0 responde a <em>«¿Qué funciones realiza la calidad?»</em>, <strong>BPMN 2.0.2</strong> responde a <strong>«{bpmnGeneralTheory.coreQuestion}»</strong> mediante la orquestación temporal de actividades, responsables en carriles (lanes), compuertas de decisión y eventos de ciclo de vida.
            </p>
          </div>
        </div>

        {/* Anatomía de Elementos BPMN */}
        <div className="bpmn-elements-grid">
          {bpmnGeneralTheory.elements.map((elem) => {
            const isSelected = selectedElementId === elem.id;
            return (
              <div
                key={elem.id}
                className={`bpmn-element-card ${isSelected ? 'active' : ''}`}
                onClick={() => setSelectedElementId(elem.id)}
              >
                <div className="elem-card-header">
                  <span className="elem-symbol" style={{ color: elem.color }}>
                    {elem.symbol}
                  </span>
                  <div>
                    <h4 className="elem-name">{elem.name}</h4>
                    <span className="elem-type-tag">{elem.type}</span>
                  </div>
                </div>
                <p className="elem-desc">{elem.desc}</p>
              </div>
            );
          })}
        </div>

        {/* Separador editorial sutil */}
        <div className="idef0-divider-editorial" />

        {/* ====================================================================
            2. DIAGRAMA BPMN ESTÁNDAR (SWIMLANES SVG INTERACTIVO)
            ==================================================================== */}
        <div className="bpmn-subheading-group">
          <div className="section-badge" style={{ marginBottom: '0.75rem' }}>
            <span className="badge-dot" />
            <span>MODELO DE PROCESO OFICIAL</span>
          </div>
          <h3 className="mbti-subheading">Evaluación y aprobación de una versión de software</h3>
          <p className="mbti-sublead">
            Flujo estándar BPMN 2.0.2 organizado en el Pool <strong>«AITECH — Calidad de Software»</strong>. Haz clic sobre cualquier actividad o compuerta para inspeccionar sus especificaciones técnicas:
          </p>
        </div>

        {/* Contenedor Exterior del Diagrama con Barra de Herramientas Estándar */}
        <div className="bpmn-standard-container">
          {/* Barra de Herramientas Estilo Oficial Camunda / Modeler */}
          <div className="bpmn-canvas-toolbar">
            <button
              type="button"
              className="bpmn-tool-btn bpmn-tool-round"
              onClick={handleZoomIn}
              title="Acercar zoom"
            >
              +
            </button>
            <button
              type="button"
              className="bpmn-tool-btn bpmn-tool-round"
              onClick={handleZoomOut}
              title="Alejar zoom"
            >
              −
            </button>
            <button
              type="button"
              className="bpmn-tool-btn bpmn-tool-pill"
              onClick={handleResetZoom}
              title="Restablecer vista centrada"
            >
              Ajustar
            </button>
            <button
              type="button"
              className="bpmn-tool-btn bpmn-tool-pill bpmn-tool-download"
              onClick={handleDownloadBpmn}
              title="Descargar archivo XML estándar BPMN 2.0.2"
            >
              Descargar .bpmn
            </button>
          </div>

          {/* Lienzo SVG con Paneo y Zoom */}
          <div
            className={`bpmn-svg-canvas-wrapper ${isDragging ? 'is-dragging' : ''}`}
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseUp}
          >
            <svg
              className="bpmn-svg-root"
              viewBox={`0 0 ${canvasWidth} ${canvasHeight}`}
              style={{
                transform: `translate(${panOffset.x}px, ${panOffset.y}px) scale(${zoomLevel})`,
                transformOrigin: 'top left',
              }}
            >
              {/* Definición de Marcador de Flecha BPMN estándar */}
              <defs>
                <marker
                  id="bpmn-arrowhead"
                  viewBox="0 0 10 10"
                  refX="8"
                  refY="5"
                  markerWidth="7"
                  markerHeight="7"
                  orient="auto"
                >
                  <path d="M 0 1.5 L 8 5 L 0 8.5 z" fill="#111827" />
                </marker>
                <filter id="node-active-glow" x="-20%" y="-20%" width="140%" height="140%">
                  <feDropShadow dx="0" dy="2" stdDeviation="3" floodColor="#10b981" floodOpacity="0.45" />
                </filter>
              </defs>

              {/* Fondo global blanco */}
              <rect x="0" y="0" width={canvasWidth} height={canvasHeight} fill="#ffffff" />

              {/* ==========================================================
                  POOL & SWIMLANES
                  ========================================================== */}
              {/* Marco exterior del Pool */}
              <rect
                x="0"
                y="0"
                width={canvasWidth}
                height={canvasHeight}
                fill="none"
                stroke="#111827"
                strokeWidth="2"
              />

              {/* Encabezado vertical del Pool (Columna izquierda) */}
              <rect
                x="0"
                y="0"
                width={poolHeaderWidth}
                height={canvasHeight}
                fill="#f8fafc"
                stroke="#111827"
                strokeWidth="1.5"
              />
              <text
                x={poolHeaderWidth / 2 + 1}
                y={canvasHeight / 2}
                textAnchor="middle"
                fontSize="11.5"
                fontFamily="var(--font-mono, monospace)"
                fontWeight="700"
                letterSpacing="0.08em"
                fill="#0f172a"
                transform={`rotate(-90, ${poolHeaderWidth / 2 + 1}, ${canvasHeight / 2})`}
              >
                {poolTitle}
              </text>

              {/* Carriles (Lanes) */}
              {lanes.map((lane) => {
                const headerWidth = laneHeaderWidth;
                const headerX = poolHeaderWidth;
                const laneContentX = poolHeaderWidth + headerWidth;
                const laneContentWidth = canvasWidth - laneContentX;

                return (
                  <g key={lane.id} className="bpmn-lane-group">
                    {/* Línea horizontal divisoria de carril */}
                    <line
                      x1={headerX}
                      y1={lane.y}
                      x2={canvasWidth}
                      y2={lane.y}
                      stroke="#111827"
                      strokeWidth="1.5"
                    />

                    {/* Encabezado vertical del carril */}
                    <rect
                      x={headerX}
                      y={lane.y}
                      width={headerWidth}
                      height={lane.height}
                      fill="#ffffff"
                      stroke="#111827"
                      strokeWidth="1.2"
                    />
                    <text
                      x={headerX + headerWidth / 2 + 1}
                      y={lane.y + lane.height / 2}
                      textAnchor="middle"
                      fontSize="11"
                      fontFamily="var(--font-sans, Inter, sans-serif)"
                      fontWeight="600"
                      fill="#1e293b"
                      transform={`rotate(-90, ${headerX + headerWidth / 2 + 1}, ${lane.y + lane.height / 2})`}
                    >
                      {lane.name}
                    </text>

                    {/* Fondo del carril */}
                    <rect
                      x={laneContentX}
                      y={lane.y}
                      width={laneContentWidth}
                      height={lane.height}
                      fill={lane.id === 'lane-qa' ? '#fafbfd' : '#ffffff'}
                    />
                  </g>
                );
              })}

              {/* Línea divisoria vertical entre encabezado de lanes y contenido */}
              <line
                x1={poolHeaderWidth + laneHeaderWidth}
                y1="0"
                x2={poolHeaderWidth + laneHeaderWidth}
                y2={canvasHeight}
                stroke="#111827"
                strokeWidth="1.5"
              />

              {/* ==========================================================
                  FLUJOS DE SECUENCIA (SEQUENCE FLOWS)
                  ========================================================== */}
              <g className="bpmn-flows-group">
                {flows.map((flow) => {
                  const pathData = pointsToSvgPath(flow.points);
                  return (
                    <g key={flow.id} className="bpmn-flow-item">
                      <path
                        d={pathData}
                        fill="none"
                        stroke="#111827"
                        strokeWidth="1.6"
                        strokeLinejoin="round"
                        strokeLinecap="round"
                        markerEnd="url(#bpmn-arrowhead)"
                      />

                      {/* Etiqueta de condición en la rama (ej. Si / No) */}
                      {flow.label && flow.labelX && flow.labelY && (
                        <g transform={`translate(${flow.labelX}, ${flow.labelY})`}>
                          <rect
                            x="-4"
                            y="-11"
                            width={flow.label.length * 6.8 + 10}
                            height="16"
                            rx="3"
                            fill="#ffffff"
                            stroke="rgba(17, 24, 39, 0.2)"
                            strokeWidth="0.8"
                          />
                          <text
                            x="2"
                            y="1"
                            fontSize="10"
                            fontFamily="var(--font-sans, Inter, sans-serif)"
                            fontWeight="600"
                            fill="#0f172a"
                          >
                            {flow.label}
                          </text>
                        </g>
                      )}
                    </g>
                  );
                })}
              </g>

              {/* ==========================================================
                  NODOS DEL PROCESO (EVENTOS, TAREAS, GATEWAYS)
                  ========================================================== */}
              <g className="bpmn-nodes-group">
                {nodes.map((node) => {
                  const isActive = node.id === activeNode.id;
                  const labelLines = splitLabelText(node.label);

                  // 1. EVENTO DE INICIO
                  if (node.type === 'event-start') {
                    const radius = node.width / 2;
                    const cx = node.x + radius;
                    const cy = node.y + radius;
                    return (
                      <g
                        key={node.id}
                        className={`bpmn-interactive-node ${isActive ? 'node-active' : ''}`}
                        onClick={() => setSelectedNodeId(node.id)}
                        style={{ cursor: 'pointer' }}
                        filter={isActive ? 'url(#node-active-glow)' : undefined}
                      >
                        <circle
                          cx={cx}
                          cy={cy}
                          r={radius}
                          fill={isActive ? '#f0fdf4' : '#ffffff'}
                          stroke={isActive ? '#10b981' : '#111827'}
                          strokeWidth={isActive ? '2.5' : '1.8'}
                        />
                        {/* Etiqueta debajo del evento */}
                        <g transform={`translate(${cx}, ${cy + radius + 14})`}>
                          {labelLines.map((line, idx) => (
                            <text
                              key={idx}
                              x="0"
                              y={idx * 13}
                              textAnchor="middle"
                              fontSize="10"
                              fontFamily="var(--font-sans, Inter, sans-serif)"
                              fontWeight={isActive ? '700' : '500'}
                              fill="#1e293b"
                            >
                              {line}
                            </text>
                          ))}
                        </g>
                      </g>
                    );
                  }

                  // 2. EVENTO DE FIN
                  if (node.type === 'event-end') {
                    const radius = node.width / 2;
                    const cx = node.x + radius;
                    const cy = node.y + radius;
                    return (
                      <g
                        key={node.id}
                        className={`bpmn-interactive-node ${isActive ? 'node-active' : ''}`}
                        onClick={() => setSelectedNodeId(node.id)}
                        style={{ cursor: 'pointer' }}
                        filter={isActive ? 'url(#node-active-glow)' : undefined}
                      >
                        <circle
                          cx={cx}
                          cy={cy}
                          r={radius}
                          fill={isActive ? '#f0fdf4' : '#ffffff'}
                          stroke={isActive ? '#10b981' : '#111827'}
                          strokeWidth={isActive ? '4' : '3.5'}
                        />
                        {/* Etiqueta debajo del evento */}
                        <g transform={`translate(${cx}, ${cy + radius + 14})`}>
                          {labelLines.map((line, idx) => (
                            <text
                              key={idx}
                              x="0"
                              y={idx * 13}
                              textAnchor="middle"
                              fontSize="10"
                              fontFamily="var(--font-sans, Inter, sans-serif)"
                              fontWeight={isActive ? '700' : '500'}
                              fill="#1e293b"
                            >
                              {line}
                            </text>
                          ))}
                        </g>
                      </g>
                    );
                  }

                  // 3. COMPUERTA EXCLUSIVA (GATEWAY XOR)
                  if (node.type === 'gateway') {
                    const halfW = node.width / 2;
                    const halfH = node.height / 2;
                    const pointsStr = `${halfW},0 ${node.width},${halfH} ${halfW},${node.height} 0,${halfH}`;
                    return (
                      <g
                        key={node.id}
                        className={`bpmn-interactive-node ${isActive ? 'node-active' : ''}`}
                        transform={`translate(${node.x}, ${node.y})`}
                        onClick={() => setSelectedNodeId(node.id)}
                        style={{ cursor: 'pointer' }}
                        filter={isActive ? 'url(#node-active-glow)' : undefined}
                      >
                        <polygon
                          points={pointsStr}
                          fill={isActive ? '#f0fdf4' : '#ffffff'}
                          stroke={isActive ? '#10b981' : '#111827'}
                          strokeWidth={isActive ? '2.5' : '1.8'}
                        />
                        {/* Marcador XOR (cruz interna) */}
                        <text
                          x={halfW}
                          y={halfH + 4.5}
                          textAnchor="middle"
                          fontSize="15"
                          fontWeight="700"
                          fontFamily="sans-serif"
                          fill={isActive ? '#10b981' : '#334155'}
                        >
                          ✕
                        </text>
                        {/* Etiqueta de decisión debajo */}
                        <g transform={`translate(${halfW}, ${node.height + 14})`}>
                          {labelLines.map((line, idx) => (
                            <text
                              key={idx}
                              x="0"
                              y={idx * 12}
                              textAnchor="middle"
                              fontSize="10"
                              fontFamily="var(--font-sans, Inter, sans-serif)"
                              fontStyle="italic"
                              fontWeight={isActive ? '700' : '500'}
                              fill="#0f172a"
                            >
                              {line}
                            </text>
                          ))}
                        </g>
                      </g>
                    );
                  }

                  // 4. TAREAS / ACTIVIDADES (Rectángulos con bordes redondeados)
                  return (
                    <g
                      key={node.id}
                      className={`bpmn-interactive-node ${isActive ? 'node-active' : ''}`}
                      transform={`translate(${node.x}, ${node.y})`}
                      onClick={() => setSelectedNodeId(node.id)}
                      style={{ cursor: 'pointer' }}
                      filter={isActive ? 'url(#node-active-glow)' : undefined}
                    >
                      <rect
                        x="0"
                        y="0"
                        width={node.width}
                        height={node.height}
                        rx="9"
                        ry="9"
                        fill={isActive ? '#f0fdf4' : '#ffffff'}
                        stroke={isActive ? '#10b981' : '#111827'}
                        strokeWidth={isActive ? '2.4' : '1.8'}
                      />

                      {/* Ícono de tipo de tarea en esquina superior izquierda */}
                      <TaskTypeIcon type={node.taskType} />

                      {/* Texto de la actividad centrado */}
                      <text
                        x={node.width / 2}
                        y={node.height / 2 - ((labelLines.length - 1) * 13) / 2 + 3}
                        textAnchor="middle"
                        fontSize="11"
                        fontFamily="var(--font-sans, Inter, sans-serif)"
                        fontWeight={isActive ? '700' : '500'}
                        fill="#0f172a"
                      >
                        {labelLines.map((line, idx) => (
                          <tspan
                            key={idx}
                            x={node.width / 2}
                            dy={idx === 0 ? 0 : 13}
                          >
                            {line}
                          </tspan>
                        ))}
                      </text>
                    </g>
                  );
                })}
              </g>
            </svg>
          </div>
        </div>

        {/* ====================================================================
            Rastreador Rápido de Pasos (Pills Sincronizadas)
            ==================================================================== */}
        <div className="bpmn-pills-row">
          <span className="pills-label">SECUENCIA DE PASOS:</span>
          <div className="pills-track">
            {sortedSteps.map((st) => {
              const isSel = st.id === activeNode.id;
              return (
                <button
                  key={st.id}
                  type="button"
                  className={`tracker-pill ${isSel ? 'active' : ''}`}
                  onClick={() => setSelectedNodeId(st.id)}
                  title={`Paso ${st.stepNumber}: ${st.title}`}
                >
                  {st.stepNumber}
                </button>
              );
            })}
          </div>
        </div>

        {/* ====================================================================
            3. PANEL DE DETALLE DE ACTIVIDAD / GATEWAY ACTIVO (INSPECTOR)
            ==================================================================== */}
        <div className="bpmn-inspector-card">
          <div className="bpmn-inspector-header">
            <div>
              <div className="inspector-meta-row">
                <span className="inspector-badge">
                  PASO {String(activeNode.stepNumber).padStart(2, '0')} · {activeNode.type.toUpperCase()}
                </span>
                <span className="inspector-lane-pill">{activeNode.laneName}</span>
              </div>
              <h4 className="bpmn-inspector-title">{activeNode.title}</h4>
              <p className="bpmn-inspector-lead">{activeNode.shortDesc}</p>
            </div>
            <div className="bpmn-objective-callout">
              <span className="callout-tag">OBJETIVO OPERATIVO</span>
              <p className="callout-text">{activeNode.objective}</p>
            </div>
          </div>

          <div className="bpmn-attributes-grid">
            <div className="attr-box">
              <span className="attr-label">Entrada Requerida (Input)</span>
              <p className="attr-val">{activeNode.input}</p>
            </div>
            <div className="attr-box highlight-control">
              <span className="attr-label">Control Aplicado (Norma / Criterio)</span>
              <p className="attr-val">{activeNode.controlApplied}</p>
            </div>
            <div className="attr-box">
              <span className="attr-label">Actividad Concreta</span>
              <p className="attr-val">{activeNode.activityDetails}</p>
            </div>
            <div className="attr-box highlight-output">
              <span className="attr-label">Salida Generada (Output)</span>
              <p className="attr-val">{activeNode.output}</p>
            </div>
          </div>

          {/* Rutas condicionales en caso de ser Gateway */}
          {activeNode.gatewayRoutes && (
            <div className="bpmn-gateway-routes-box">
              <span className="routes-box-title">BIFURCACIÓN CONDICIONAL DEL GATEWAY:</span>
              <div className="gateway-routes-grid">
                {activeNode.gatewayRoutes.map((route, i) => (
                  <div
                    key={i}
                    className={`gateway-route-item ${
                      route.condition.includes('SI') || route.condition.includes('SIN') || route.condition.includes('Conforme')
                        ? 'route-yes'
                        : 'route-no'
                    }`}
                  >
                    <div className="route-badge-row">
                      <span className="route-cond-pill">{route.condition}</span>
                      <span className="route-target-tag">→ {route.target}</span>
                    </div>
                    <p className="route-action-text">{route.action}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
