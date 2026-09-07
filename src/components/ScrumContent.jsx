import React, { useState } from 'react';
import {
  scrumTheory,
  scrumRoles,
  scrumEvents,
  scrumArtifacts,
  initialKanbanTasks,
  scrumProjectApplication,
} from '../data/scrumData';

export default function ScrumContent() {
  const [tasks, setTasks] = useState(initialKanbanTasks);
  const [filterVertical, setFilterVertical] = useState('Todas');

  const columns = [
    { id: 'todo', title: 'Por Hacer (Backlog)', badgeClass: 'badge-todo' },
    { id: 'in-progress', title: 'En Progreso', badgeClass: 'badge-progress' },
    { id: 'qa-review', title: 'Revisión QA', badgeClass: 'badge-review' },
    { id: 'done', title: 'Terminado (DoD)', badgeClass: 'badge-done' },
  ];

  const verticals = ['Todas', 'Cloud', 'Calidad', 'Hardware', 'Seguridad', 'Software', 'Big Data', 'Redes'];

  const moveTaskNext = (taskId) => {
    const statusOrder = ['todo', 'in-progress', 'qa-review', 'done'];
    setTasks((prev) =>
      prev.map((task) => {
        if (task.id === taskId) {
          const currentIndex = statusOrder.indexOf(task.status);
          const nextIndex = (currentIndex + 1) % statusOrder.length;
          return { ...task, status: statusOrder[nextIndex] };
        }
        return task;
      })
    );
  };

  const filteredTasks = filterVertical === 'Todas'
    ? tasks
    : tasks.filter((t) => t.vertical === filterVertical);

  return (
    <div className="scrum-content-container">
      {/* Badge de Sección */}
      <div className="section-badge">
        <span className="badge-dot" />
        <span>{scrumTheory.badge}</span>
      </div>

      {/* Encabezado Principal */}
      <h2 className="section-heading-xl">
        {scrumTheory.title}
      </h2>

      <p className="section-desc-lead" style={{ marginBottom: '3rem' }}>
        {scrumTheory.lead}
      </p>

      {/* ====================================================================
          1. PILARES Y VALORES EMPÍRICOS DE SCRUM
          ==================================================================== */}
      <div className="scrum-subheading-group">
        <div className="section-badge" style={{ marginBottom: '1rem' }}>
          <span className="badge-dot" />
          <span>FUNDAMENTOS EMPÍRICOS</span>
        </div>
        <h3 className="mbti-subheading">Los 3 Pilares y 5 Valores de Scrum</h3>
        <p className="mbti-sublead">
          El empirismo establece que el conocimiento proviene de la experiencia y de tomar decisiones basadas en lo observado.
        </p>
      </div>

      <div className="scrum-pillars-grid">
        {scrumTheory.pillars.map((pillar) => (
          <div key={pillar.id} className="scrum-pillar-card">
            <div className="pillar-header-row">
              <span className="pillar-icon-badge">
                {pillar.id === 'transparencia' && (
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                    <circle cx="12" cy="12" r="3" />
                  </svg>
                )}
                {pillar.id === 'inspeccion' && (
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <circle cx="11" cy="11" r="8" />
                    <line x1="21" y1="21" x2="16.65" y2="16.65" />
                  </svg>
                )}
                {pillar.id === 'adaptacion' && (
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <polyline points="23 4 23 10 17 10" />
                    <polyline points="1 20 1 14 7 14" />
                    <path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15" />
                  </svg>
                )}
              </span>
              <div>
                <h4 className="pillar-name">{pillar.name}</h4>
                <span className="pillar-tag-pill">{pillar.tag}</span>
              </div>
            </div>
            <p className="pillar-description">{pillar.desc}</p>
          </div>
        ))}
      </div>

      {/* Valores de Scrum */}
      <div className="scrum-values-box">
        <div className="values-header">
          <h4>Los 5 Valores del Equipo</h4>
          <span>Pilares del comportamiento ético y profesional en Dinastía Arias</span>
        </div>
        <div className="values-chips-grid">
          {scrumTheory.values.map((val) => (
            <div key={val.name} className="value-chip-card">
              <span className="value-bullet">✓</span>
              <div>
                <strong>{val.name}:</strong> <span>{val.desc}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ====================================================================
          2. ROLES DE SCRUM EN AITECH (PRODUCT OWNER & SCRUM MASTER)
          ==================================================================== */}
      <div className="scrum-subheading-group" style={{ marginTop: '5rem' }}>
        <div className="section-badge" style={{ marginBottom: '1rem' }}>
          <span className="badge-dot" />
          <span>ESTRUCTURA DE LIDERAZGO ÁGIL</span>
        </div>
        <h3 className="mbti-subheading">{scrumRoles.title}</h3>
        <p className="mbti-sublead">{scrumRoles.subtitle}</p>
      </div>

      <div className="scrum-leadership-grid">
        {/* Product Owner: Cárdenas */}
        <div className="scrum-role-card dark-role-card">
          <div className="role-card-badge-top">
            <span className="role-category-tag">{scrumRoles.productOwner.roleTag}</span>
            <span className="role-icon-symbol">👑</span>
          </div>

          <span className="role-sublabel">PRODUCT OWNER</span>
          <h4 className="role-person-name">{scrumRoles.productOwner.personName}</h4>

          <p className="role-desc-lead">{scrumRoles.productOwner.responsibility}</p>

          <div className="role-functions-list">
            <span className="functions-title">Responsabilidades Clave:</span>
            <ul>
              {scrumRoles.productOwner.keyFunctions.map((fn, idx) => (
                <li key={idx}>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="var(--color-lime)" strokeWidth="2.5">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                  <span>{fn}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Scrum Master: Ingeniero Cárdenas */}
        <div className="scrum-role-card dark-role-card">
          <div className="role-card-badge-top">
            <span className="role-category-tag">{scrumRoles.scrumMaster.roleTag}</span>
            <span className="role-icon-symbol">⚡</span>
          </div>

          <span className="role-sublabel">SCRUM MASTER</span>
          <h4 className="role-person-name">{scrumRoles.scrumMaster.personName}</h4>

          <p className="role-desc-lead">{scrumRoles.scrumMaster.responsibility}</p>

          <div className="role-functions-list">
            <span className="functions-title">Responsabilidades Clave:</span>
            <ul>
              {scrumRoles.scrumMaster.keyFunctions.map((fn, idx) => (
                <li key={idx}>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="var(--color-lime)" strokeWidth="2.5">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                  <span>{fn}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Development Team / Especialistas de Calidad */}
      <div className="scrum-dev-team-card">
        <div className="dev-team-header">
          <div>
            <span className="dev-tag">DEVELOPMENT TEAM</span>
            <h4>{scrumRoles.developers.teamName}</h4>
            <p>{scrumRoles.developers.responsibility}</p>
          </div>
          <span className="dev-team-icon">🛠️</span>
        </div>

        <div className="dev-members-subgrid">
          {scrumRoles.developers.members.map((dev) => (
            <div key={dev.name} className="dev-member-item">
              <div className="dev-name-row">
                <strong className="dev-name">{dev.name}</strong>
                <span className="dev-mbti-tag">{dev.mbti}</span>
              </div>
              <span className="dev-specialty">{dev.specialty}</span>
            </div>
          ))}
        </div>
      </div>

      {/* ====================================================================
          3. EVENTOS Y ARTEFACTOS DE SCRUM
          ==================================================================== */}
      <div className="scrum-subheading-group" style={{ marginTop: '5.5rem' }}>
        <div className="section-badge" style={{ marginBottom: '1rem' }}>
          <span className="badge-dot" />
          <span>CICLOS & COMPROMISOS</span>
        </div>
        <h3 className="mbti-subheading">Eventos y Artefactos de Scrum</h3>
        <p className="mbti-sublead">
          Eventos estructurados con timebox específico para crear regularidad y minimizar reuniones innecesarias.
        </p>
      </div>

      {/* Eventos Grid */}
      <div className="scrum-events-grid">
        {scrumEvents.map((evt) => (
          <div key={evt.id} className="scrum-event-card">
            <div className="event-top-row">
              <span className="event-number">{evt.number}</span>
              <span className="event-timebox-badge">{evt.timebox}</span>
            </div>
            <h4 className="event-name">{evt.name}</h4>
            <span className="event-freq">{evt.frequency}</span>
            <p className="event-desc">{evt.desc}</p>
          </div>
        ))}
      </div>

      {/* Artefactos Grid con Compromisos Asociados */}
      <div className="scrum-artifacts-container">
        <h4 className="artifacts-title">Artefactos de Scrum y sus Compromisos</h4>
        <div className="artifacts-grid">
          {scrumArtifacts.map((art) => (
            <div key={art.id} className="artifact-card">
              <span className="artifact-scope-tag">{art.tag}</span>
              <h5 className="artifact-name">{art.name}</h5>
              <div className="artifact-commitment-pill">
                <strong>Compromiso:</strong> {art.commitment}
              </div>
              <p className="artifact-desc">{art.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* ====================================================================
          4. TABLERO KANBAN INTERACTIVO DE CALIDAD
          ==================================================================== */}
      <div className="scrum-subheading-group" style={{ marginTop: '5.5rem' }}>
        <div className="section-badge" style={{ marginBottom: '1rem' }}>
          <span className="badge-dot" />
          <span>VISIBILIDAD OPERATIVA</span>
        </div>
        <h3 className="mbti-subheading">Tablero Kanban de Aseguramiento de Calidad</h3>
        <p className="mbti-sublead">
          Flujo de trabajo visual en tiempo real para supervisar los entregables de calidad en cada una de las 7 verticales tecnológicas de AITECH. Haz clic en cualquier tarjeta para avanzar su estado en el flujo.
        </p>
      </div>

      {/* Filtros de vertical */}
      <div className="kanban-filters-row">
        <span className="filters-label">Filtrar por Vertical:</span>
        <div className="filters-pills-list">
          {verticals.map((v) => (
            <button
              key={v}
              type="button"
              className={`kanban-filter-btn ${filterVertical === v ? 'active' : ''}`}
              onClick={() => setFilterVertical(v)}
            >
              {v}
            </button>
          ))}
        </div>
      </div>

      {/* Tablero Kanban */}
      <div className="kanban-board-wrapper">
        {columns.map((col) => {
          const colTasks = filteredTasks.filter((t) => t.status === col.id);
          return (
            <div key={col.id} className="kanban-column">
              <div className="kanban-col-header">
                <span className={`col-status-badge ${col.badgeClass}`} />
                <h5 className="col-title">{col.title}</h5>
                <span className="col-count-pill">{colTasks.length}</span>
              </div>

              <div className="kanban-tasks-list">
                {colTasks.length === 0 ? (
                  <div className="kanban-empty-slot">Sin tareas en este estado</div>
                ) : (
                  colTasks.map((task) => (
                    <div
                      key={task.id}
                      className="kanban-task-card"
                      onClick={() => moveTaskNext(task.id)}
                      title="Haz clic para avanzar de columna"
                    >
                      <div className="task-card-meta">
                        <span className={`task-priority-pill priority-${task.priority.toLowerCase()}`}>
                          {task.priority}
                        </span>
                        <span className="task-vertical-tag">{task.vertical}</span>
                      </div>

                      <h6 className="task-title">{task.title}</h6>

                      <div className="task-card-footer">
                        <div className="task-assignee-box">
                          <span className="task-avatar-circle">{task.assigneeInitials}</span>
                          <span className="task-assignee-name">{task.assignee}</span>
                        </div>
                        <span className="task-mbti-sub">{task.mbti}</span>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* ====================================================================
          5. APLICACIÓN AL PROYECTO AITECH CALIDAD
          ==================================================================== */}
      <div className="scrum-application-box">
        <div className="app-badge-row">
          <span className="badge-dot" />
          <span>CASO DE USO DINASTÍA ARIAS</span>
        </div>
        <h4>{scrumProjectApplication.title}</h4>
        <h5 className="app-subtitle">{scrumProjectApplication.subtitle}</h5>
        <p className="app-lead">{scrumProjectApplication.lead}</p>

        <div className="app-pillars-list">
          {scrumProjectApplication.pillarsList.map((item, idx) => (
            <div key={idx} className="app-pillar-item">
              <div className="app-pillar-num">0{idx + 1}</div>
              <div className="app-pillar-body">
                <strong>{item.title}</strong>
                <p>{item.desc}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="scrum-closing-banner">
          <span className="closing-sparkle">✦</span>
          <span>Agilidad rigurosa, entrega predecible y estándares de excelencia internacional en AITECH</span>
          <span className="closing-sparkle">✦</span>
        </div>
      </div>
    </div>
  );
}
