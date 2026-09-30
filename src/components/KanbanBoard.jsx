import { useEffect, useMemo, useState } from 'react';
import { initialKanbanTasks, scrumRoles } from '../data/scrumData';

const COLUMNS = [
  { id: 'todo', title: 'Por hacer', badgeClass: 'badge-todo' },
  { id: 'in-progress', title: 'En progreso', badgeClass: 'badge-progress' },
  { id: 'qa-review', title: 'Revisión QA', badgeClass: 'badge-review' },
  { id: 'done', title: 'Terminado', badgeClass: 'badge-done' },
];
const VERTICALS = ['Todas', 'Cloud', 'Calidad', 'Hardware', 'Seguridad', 'Software', 'Big Data', 'Redes', 'Gobernanza'];
const STORAGE_KEY = 'dinastia-arias-scrum-kanban-tasks';
const EMPTY_TASK = { title: '', assignee: '', vertical: 'Calidad', priority: 'Media', status: 'todo' };

function readTasks() {
  try {
    const storedTasks = window.localStorage.getItem(STORAGE_KEY);
    return storedTasks ? JSON.parse(storedTasks) : initialKanbanTasks;
  } catch {
    return initialKanbanTasks;
  }
}

export default function KanbanBoard() {
  const [tasks, setTasks] = useState(readTasks);
  const [filterVertical, setFilterVertical] = useState('Todas');
  const [searchTerm, setSearchTerm] = useState('');
  const [taskForm, setTaskForm] = useState(EMPTY_TASK);
  const [editingTaskId, setEditingTaskId] = useState(null);
  const [notice, setNotice] = useState('Cambios guardados localmente');

  useEffect(() => window.localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks)), [tasks]);

  const stats = useMemo(() => COLUMNS.reduce((result, column) => {
    result[column.id] = tasks.filter((task) => task.status === column.id).length;
    return result;
  }, {}), [tasks]);

  const visibleTasks = useMemo(() => {
    const normalizedSearch = searchTerm.trim().toLowerCase();
    return tasks.filter((task) => {
      const matchesVertical = filterVertical === 'Todas' || task.vertical === filterVertical;
      const matchesSearch = !normalizedSearch || `${task.title} ${task.assignee}`.toLowerCase().includes(normalizedSearch);
      return matchesVertical && matchesSearch;
    });
  }, [filterVertical, searchTerm, tasks]);

  const moveTask = (taskId, direction) => {
    setTasks((current) => current.map((task) => {
      if (task.id !== taskId) return task;
      const currentIndex = COLUMNS.findIndex((column) => column.id === task.status);
      const nextIndex = Math.min(Math.max(currentIndex + direction, 0), COLUMNS.length - 1);
      return { ...task, status: COLUMNS[nextIndex].id };
    }));
    setNotice('Flujo actualizado y guardado');
  };

  const submitTask = (event) => {
    event.preventDefault();
    if (!taskForm.title.trim() || !taskForm.assignee.trim()) return;
    const taskData = { ...taskForm, title: taskForm.title.trim(), assignee: taskForm.assignee.trim() };
    if (editingTaskId) {
      setTasks((current) => current.map((task) => (task.id === editingTaskId ? { ...task, ...taskData } : task)));
      setNotice('Tarea actualizada y guardada');
    } else {
      setTasks((current) => [...current, { ...taskData, id: `task-${Date.now()}`, assigneeInitials: taskData.assignee.slice(0, 2).toUpperCase(), mbti: 'Equipo QA' }]);
      setNotice('Tarea creada y guardada');
    }
    setTaskForm(EMPTY_TASK);
    setEditingTaskId(null);
  };

  const editTask = (task) => {
    setTaskForm({ title: task.title, assignee: task.assignee, vertical: task.vertical, priority: task.priority, status: task.status });
    setEditingTaskId(task.id);
  };

  const deleteTask = (taskId) => {
    if (!window.confirm('¿Quieres eliminar esta tarea?')) return;
    setTasks((current) => current.filter((task) => task.id !== taskId));
    setNotice('Tarea eliminada y cambios guardados');
  };

  const resetBoard = () => {
    if (!window.confirm('¿Quieres restaurar el tablero inicial? Se perderán los cambios guardados.')) return;
    setTasks(initialKanbanTasks);
    setNotice('Tablero restaurado y guardado');
  };

  return (
    <section className="scrum-kanban-section" aria-labelledby="scrum-kanban-title">
      <div className="scrum-subheading-group">
        <div className="section-badge"><span className="badge-dot" /><span>VISIBILIDAD OPERATIVA</span></div>
        <h3 id="scrum-kanban-title" className="mbti-subheading">Tablero Kanban de Aseguramiento de Calidad</h3>
        <p className="mbti-sublead">Convierte el marco Scrum en trabajo visible: prioriza, asigna y mueve cada entregable hasta cumplir la Definición de Terminado.</p>
      </div>
      <div className="kanban-live-summary">
        <div><span>Sprint activo</span><strong>Sprint 04</strong></div>
        <div><span>Equipo QA</span><strong>{scrumRoles.developers.members.length} especialistas</strong></div>
        <div><span>Entrega completada</span><strong>{tasks.length ? Math.round((stats.done / tasks.length) * 100) : 0}%</strong></div>
      </div>
      <div className="kanban-task-form-panel">
        <div className="section-badge"><span className="badge-dot" /><span>{editingTaskId ? 'EDITAR TAREA' : 'AÑADIR AL SPRINT'}</span></div>
        <form onSubmit={submitTask} className="kanban-task-form">
          <input value={taskForm.title} onChange={(event) => setTaskForm((current) => ({ ...current, title: event.target.value }))} placeholder="Título del entregable" aria-label="Título del entregable" required />
          <input value={taskForm.assignee} onChange={(event) => setTaskForm((current) => ({ ...current, assignee: event.target.value }))} placeholder="Responsable" aria-label="Responsable" required />
          <select value={taskForm.vertical} onChange={(event) => setTaskForm((current) => ({ ...current, vertical: event.target.value }))} aria-label="Vertical">{VERTICALS.filter((vertical) => vertical !== 'Todas').map((vertical) => <option key={vertical}>{vertical}</option>)}</select>
          <select value={taskForm.priority} onChange={(event) => setTaskForm((current) => ({ ...current, priority: event.target.value }))} aria-label="Prioridad">{['Crítica', 'Alta', 'Media'].map((priority) => <option key={priority}>{priority}</option>)}</select>
          <button type="submit">{editingTaskId ? 'Guardar cambios' : 'Añadir tarea'}</button>
          {editingTaskId && <button type="button" className="kanban-secondary-button" onClick={() => { setTaskForm(EMPTY_TASK); setEditingTaskId(null); }}>Cancelar</button>}
        </form>
      </div>
      <div className="kanban-controls-panel" aria-label="Filtros del tablero">
        <label className="kanban-search-field">Buscar<input value={searchTerm} onChange={(event) => setSearchTerm(event.target.value)} placeholder="Título o responsable" /></label>
        <label>Vertical<select value={filterVertical} onChange={(event) => setFilterVertical(event.target.value)}>{VERTICALS.map((vertical) => <option key={vertical}>{vertical}</option>)}</select></label>
        <button type="button" className="kanban-secondary-button" onClick={resetBoard}>Restaurar tablero</button>
        <span className="kanban-save-notice" role="status">{notice}</span>
      </div>
      <div className="kanban-board-grid">
        {COLUMNS.map((column, index) => {
          const columnTasks = visibleTasks.filter((task) => task.status === column.id);
          return <article key={column.id} className={`kanban-column kanban-column-${column.id}`}>
            <header><div><span className={`col-status-badge ${column.badgeClass}`} /><h2>{column.title}</h2></div><span>{stats[column.id] || 0}</span></header>
            <div className="kanban-column-body">
              {columnTasks.map((task) => <div key={task.id} className="kanban-task-card">
                <div className="task-card-meta"><span className={`task-priority-pill priority-${task.priority.toLowerCase()}`}>{task.priority}</span><span className="task-vertical-tag">{task.vertical}</span></div>
                <h3>{task.title}</h3><p>Responsable: {task.assignee}</p>
                <div className="kanban-task-actions"><button type="button" onClick={() => editTask(task)}>Editar</button>{index > 0 && <button type="button" aria-label="Mover a la columna anterior" onClick={() => moveTask(task.id, -1)}>←</button>}{index < COLUMNS.length - 1 && <button type="button" aria-label="Mover a la siguiente columna" onClick={() => moveTask(task.id, 1)}>→</button>}<button type="button" onClick={() => deleteTask(task.id)}>Eliminar</button></div>
              </div>)}
              {columnTasks.length === 0 && <p className="kanban-empty-state">Sin tareas visibles en esta etapa.</p>}
            </div>
          </article>;
        })}
      </div>
    </section>
  );
}
