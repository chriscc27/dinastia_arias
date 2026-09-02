import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import Footer from '../components/Footer';

const COLUMNS = [
  { id: 'todo', title: 'To Do' },
  { id: 'doing', title: 'Doing' },
  { id: 'done', title: 'Done' },
];

const DEFAULT_MEMBERS = {
  scrumMaster: 'Pendiente de asignar',
  productOwner: 'Pendiente de asignar',
  qaLead: 'Pendiente de asignar',
};

const ROLE_OPTIONS = ['Developer', 'QA', 'Diseño UX/UI', 'Scrum Master', 'Product Owner', 'DevOps'];

const INITIAL_TASKS = [
  { id: 1, title: 'Definir backlog del sprint', owner: 'Ana', role: 'Product Owner', status: 'todo' },
  { id: 2, title: 'Diseñar flujo de onboarding', owner: 'Carlos', role: 'Diseño UX/UI', status: 'doing' },
  { id: 3, title: 'Validar criterios de aceptación', owner: 'Luisa', role: 'QA', status: 'done' },
];

export default function KanbanBoardPage() {
  const [members, setMembers] = useState(DEFAULT_MEMBERS);
  const [tasks, setTasks] = useState(INITIAL_TASKS);
  const [newTask, setNewTask] = useState({
    title: '',
    owner: '',
    role: ROLE_OPTIONS[0],
    status: 'todo',
  });

  const sprintStats = useMemo(() => {
    return COLUMNS.reduce((acc, column) => {
      acc[column.id] = tasks.filter((task) => task.status === column.id).length;
      return acc;
    }, {});
  }, [tasks]);

  const handleCreateTask = (event) => {
    event.preventDefault();
    if (!newTask.title.trim() || !newTask.owner.trim()) return;

    setTasks((current) => [
      ...current,
      {
        id: Date.now(),
        title: newTask.title.trim(),
        owner: newTask.owner.trim(),
        role: newTask.role,
        status: newTask.status,
      },
    ]);

    setNewTask((current) => ({ ...current, title: '', owner: '', status: 'todo' }));
  };

  const moveTask = (taskId, targetStatus) => {
    setTasks((current) =>
      current.map((task) => (task.id === taskId ? { ...task, status: targetStatus } : task))
    );
  };

  const deleteTask = (taskId) => {
    setTasks((current) => current.filter((task) => task.id !== taskId));
  };

  return (
    <div className="subpage-wrapper" style={{ background: 'var(--color-offwhite)', minHeight: '100vh', position: 'relative', overflowX: 'hidden' }}>
      <header className="site-header">
        <div className="header-left">
          <Link to="/" className="logo-link">
            <span className="logo-text">
              AITECH <span>| CALIDAD</span>
            </span>
          </Link>
        </div>

        <div className="header-right">
          <div className="nav-pill-container">
            <nav className="nav-scrollable-inner">
              <Link to="/#inicio" className="nav-item-link active" style={{ textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '8px' }}>
                <span>← VOLVER A INICIO</span>
                <span style={{ width: '22px', height: '22px', borderRadius: '50%', background: 'var(--color-lime)', color: 'var(--color-charcoal)', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.75rem', fontWeight: 'bold' }}>↑</span>
              </Link>
            </nav>
          </div>
        </div>
      </header>

      <section
        style={{
          position: 'relative',
          width: '100%',
          minHeight: '56vh',
          padding: '150px 6% 70px 6%',
          background: "linear-gradient(180deg, rgba(16, 25, 26, 0.78) 0%, rgba(18, 27, 28, 0.95) 100%), url('/assets/gestion_hero_art.jpg') center/cover no-repeat",
          borderBottomLeftRadius: '36px',
          borderBottomRightRadius: '36px',
          boxShadow: '0 24px 60px rgba(0, 0, 0, 0.22)',
          color: '#ffffff',
          marginBottom: '4rem',
        }}
      >
        <div style={{ maxWidth: '1100px' }}>
          <div className="section-badge" style={{ background: 'rgba(255, 255, 255, 0.15)', borderColor: 'rgba(255, 255, 255, 0.25)', color: 'var(--color-lime)', marginBottom: '1.6rem' }}>
            <span className="badge-dot" style={{ background: 'var(--color-lime)' }} />
            <span>TABLERO KANBAN DEL SPRINT</span>
          </div>
          <h1 className="section-heading-xl" style={{ fontSize: 'max(2.6rem, min(5vw, 4rem))', color: '#ffffff', lineHeight: '1.15', marginBottom: '1.2rem' }}>
            Gestión visual de tareas para el equipo de calidad.
          </h1>
          <p style={{ fontSize: '1.1rem', lineHeight: '1.8', color: 'rgba(255, 255, 255, 0.9)', maxWidth: '800px' }}>
            Organiza actividades en To Do, Doing y Done, asigna responsables y roles Scrum, y mantén un control claro del avance semanal.
          </p>

          <div className="kanban-stats-grid">
            {COLUMNS.map((column) => (
              <article key={column.id} className="kanban-stat-card">
                <span>{column.title}</span>
                <strong>{sprintStats[column.id] || 0}</strong>
              </article>
            ))}
          </div>
        </div>
      </section>

      <div className="kanban-page-content">
        <section className="kanban-team-panel">
          <div className="section-badge">
            <span className="badge-dot" />
            <span>ROLES SCRUM</span>
          </div>
          <div className="kanban-team-grid">
            <label>
              Scrum Master
              <input
                value={members.scrumMaster}
                onChange={(event) => setMembers((current) => ({ ...current, scrumMaster: event.target.value }))}
                placeholder="Nombre del Scrum Master"
              />
            </label>
            <label>
              Product Owner
              <input
                value={members.productOwner}
                onChange={(event) => setMembers((current) => ({ ...current, productOwner: event.target.value }))}
                placeholder="Nombre del Product Owner"
              />
            </label>
            <label>
              QA Lead
              <input
                value={members.qaLead}
                onChange={(event) => setMembers((current) => ({ ...current, qaLead: event.target.value }))}
                placeholder="Nombre del QA Lead"
              />
            </label>
          </div>
        </section>

        <section className="kanban-task-form-panel">
          <div className="section-badge">
            <span className="badge-dot" />
            <span>NUEVA TAREA</span>
          </div>
          <form onSubmit={handleCreateTask} className="kanban-task-form">
            <input
              value={newTask.title}
              onChange={(event) => setNewTask((current) => ({ ...current, title: event.target.value }))}
              placeholder="Título de la tarea"
            />
            <input
              value={newTask.owner}
              onChange={(event) => setNewTask((current) => ({ ...current, owner: event.target.value }))}
              placeholder="Responsable"
            />
            <select value={newTask.role} onChange={(event) => setNewTask((current) => ({ ...current, role: event.target.value }))}>
              {ROLE_OPTIONS.map((role) => (
                <option key={role} value={role}>
                  {role}
                </option>
              ))}
            </select>
            <select value={newTask.status} onChange={(event) => setNewTask((current) => ({ ...current, status: event.target.value }))}>
              {COLUMNS.map((column) => (
                <option key={column.id} value={column.id}>
                  {column.title}
                </option>
              ))}
            </select>
            <button type="submit">Agregar tarea</button>
          </form>
        </section>

        <section className="kanban-board-grid">
          {COLUMNS.map((column, index) => (
            <article key={column.id} className="kanban-column">
              <header>
                <h2>{column.title}</h2>
                <span>{sprintStats[column.id] || 0}</span>
              </header>

              <div className="kanban-column-body">
                {tasks.filter((task) => task.status === column.id).map((task) => (
                  <div key={task.id} className="kanban-task-card">
                    <h3>{task.title}</h3>
                    <p>Responsable: {task.owner}</p>
                    <p>Rol: {task.role}</p>
                    <div className="kanban-task-actions">
                      {index > 0 && (
                        <button type="button" onClick={() => moveTask(task.id, COLUMNS[index - 1].id)}>
                          ←
                        </button>
                      )}
                      {index < COLUMNS.length - 1 && (
                        <button type="button" onClick={() => moveTask(task.id, COLUMNS[index + 1].id)}>
                          →
                        </button>
                      )}
                      <button type="button" onClick={() => deleteTask(task.id)}>
                        Eliminar
                      </button>
                    </div>
                  </div>
                ))}
                {tasks.filter((task) => task.status === column.id).length === 0 && (
                  <p className="kanban-empty-state">No hay tareas en esta columna.</p>
                )}
              </div>
            </article>
          ))}
        </section>
      </div>

      <Footer />
    </div>
  );
}
