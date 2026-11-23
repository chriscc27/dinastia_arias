import { useState } from 'react';
import { 
  Target, Users, CheckCircle2, Calendar, Shield, Flag, Award, 
  ArrowRight, BarChart2, Clock, Sparkles 
} from 'lucide-react';
import TopicPage from '../components/TopicPage';
import KanbanBoard from '../components/KanbanBoard';
import { teamMembers } from '../data/teamData';
import { initialKanbanTasks } from '../data/scrumData';

export default function GoalsPage() {
  const [activeSprint, setActiveSprint] = useState('sprint-4');

  const sprintGoals = [
    {
      id: 'sprint-1',
      sprintNumber: 'Sprint 01',
      title: 'Fundamentos de Calidad & Gobernanza',
      period: '02 Ene 2026 – 16 Ene 2026',
      status: 'Completado',
      statusClass: 'is-done',
      goalStatement: 'Establecer la gobernanza del área, normalizar la taxonomía del inventario de 1.200 herramientas y formalizar el organigrama operativo.',
      keyDeliverables: [
        'Modelo funcional IDEF-0 de procesos de aseguramiento aprobado',
        'Consolidación del inventario inicial de herramientas en formato tabular',
        'Definición formal de los 5 puestos clave de QA y organigrama'
      ],
      dodMet: true,
      velocity: '24 Story Points',
      leadMember: 'Alan Flores'
    },
    {
      id: 'sprint-2',
      sprintNumber: 'Sprint 02',
      title: 'Automatización E2E & Pipelines CI/CD',
      period: '19 Ene 2026 – 02 Feb 2026',
      status: 'Completado',
      statusClass: 'is-done',
      goalStatement: 'Diseñar y desplegar la suite de pruebas automatizadas con Playwright y orquestar la integración continua en GitHub Actions.',
      keyDeliverables: [
        'Framework de pruebas E2E con Playwright para vertical Cloud y Software',
        'Pipeline automatizado en GitHub Actions con ejecución en cada pull request',
        'Reducción del 45% en tiempos de regresión manual'
      ],
      dodMet: true,
      velocity: '28 Story Points',
      leadMember: 'Sergio Arias & Christian Coronel'
    },
    {
      id: 'sprint-3',
      sprintNumber: 'Sprint 03',
      title: 'Observabilidad Zabbix & Pruebas de Carga',
      period: '05 Feb 2026 – 19 Feb 2026',
      status: 'Completado',
      statusClass: 'is-done',
      goalStatement: 'Implementar observabilidad en tiempo real con Zabbix 7.0 y ejecutar pruebas de carga sobre brokers de mensajería MQTT.',
      keyDeliverables: [
        'Integración de Zabbix 7.0 con triggers automáticos según criticidad',
        'Pruebas de estrés y benchmarking de latencia con JMeter en Hardware/IoT',
        'Tablero de observabilidad técnica en QA Hub'
      ],
      dodMet: true,
      velocity: '26 Story Points',
      leadMember: 'Daniel Zamorano'
    },
    {
      id: 'sprint-4',
      sprintNumber: 'Sprint 04',
      title: 'Auditoría Regulatoria & Certificación DoD',
      period: '22 Feb 2026 – 08 Mar 2026',
      status: 'En curso',
      statusClass: 'is-active',
      goalStatement: 'Auditar la trazabilidad de requisitos bajo ISO/IEC 25010, validar la calidad del dato y aprobar formalmente la Definición de Terminado con el Product Owner.',
      keyDeliverables: [
        'Matriz de trazabilidad de requisitos ISO 25010 completa',
        'Auditoría de seguridad y penetración en API Gateway',
        'Definición de Terminado (DoD) formalmente firmada con el Ing. Cárdenas'
      ],
      dodMet: false,
      velocity: '30 Story Points (Proyectado)',
      leadMember: 'Leonardo Delgado & Alan Flores'
    }
  ];

  // Cálculo de asignación de personal basado en initialKanbanTasks y teamMembers
  const memberAllocation = teamMembers.map((member) => {
    const assignedTasks = initialKanbanTasks.filter((t) => 
      t.assignee.toLowerCase().includes(member.name.split(' ')[0].toLowerCase()) ||
      t.assignee.toLowerCase().includes(member.name.split(' ')[1]?.toLowerCase() || '')
    );

    return {
      ...member,
      assignedTasksCount: assignedTasks.length,
      assignedTasksList: assignedTasks,
      workloadPct: Math.min(100, assignedTasks.length * 28 + 20),
    };
  });

  return (
    <TopicPage topicId="goals" related={['scrum', 'organizacion', 'descripcion-posiciones', 'inventarios']}>
      <section className="light-section" style={{ paddingBottom: '3rem' }}>
        <div className="section-badge">
          <span className="badge-dot" />
          <span>ALINEACIÓN ESTRATÉGICA Y GESTIÓN DE PERSONAL</span>
        </div>

        <div className="summary-section-heading">
          <h2 className="section-heading-xl">
            Goals: Objetivos Estratégicos y Asignación de Personal.{' '}
            <span className="text-muted-accent">Del Product Goal al tablero de ejecución diaria.</span>
          </h2>
          <p className="section-desc-lead">
            Conectamos los objetivos de largo plazo del Área de Calidad con los compromisos tácticos de cada Sprint y la distribución de carga de trabajo entre los especialistas de Dinastía Arias.
          </p>
        </div>

        {/* 1. OBJETIVO DEL PRODUCTO (PRODUCT GOAL) */}
        <div style={{
          background: 'linear-gradient(135deg, rgba(34, 47, 48, 0.96) 0%, rgba(34, 47, 48, 0.88) 100%)',
          color: '#ffffff',
          borderRadius: '24px',
          padding: '2.5rem',
          border: '1px solid rgba(206, 247, 158, 0.25)',
          boxShadow: '0 16px 44px rgba(0,0,0,0.14)',
          marginBottom: '3.5rem'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '1rem' }}>
            <span style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              padding: '6px 14px',
              borderRadius: '999px',
              background: 'rgba(167, 226, 110, 0.18)',
              color: 'var(--color-lime)',
              fontFamily: 'var(--font-mono)',
              fontSize: '0.75rem',
              letterSpacing: '0.04em'
            }}>
              <Flag size={14} /> PRODUCT GOAL · VISIÓN ESTRATÉGICA AITECH
            </span>
          </div>

          <h3 style={{ fontSize: 'clamp(1.6rem, 3vw, 2.4rem)', fontWeight: 400, letterSpacing: '-0.02em', marginBottom: '1.25rem' }}>
            Aseguramiento de Calidad Predictivo en las 7 Verticales y Preparación para Certificación ISO 13485:2016
          </h3>

          <p style={{ color: '#d2dacf', fontSize: '1.05rem', lineHeight: 1.7, maxWidth: '880px', marginBottom: '2rem' }}>
            Establecer un ecosistema unificado de aseguramiento que erradique fallas críticas en producción, garantice un umbral de cobertura automatizada superior al 85%, normalice el inventario de herramientas y asegure trazabilidad regulatoria de extremo a extremo para las soluciones de salud digital y tecnología hospitalaria.
          </p>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
            gap: '16px',
            borderTop: '1px solid rgba(255, 255, 255, 0.12)',
            paddingTop: '1.75rem'
          }}>
            <div>
              <span style={{ fontSize: '0.72rem', fontFamily: 'var(--font-mono)', color: 'var(--color-mint)', textTransform: 'uppercase' }}>
                Meta de Cobertura
              </span>
              <strong style={{ display: 'block', fontSize: '1.6rem', color: '#ffffff', marginTop: '4px' }}>
                ≥ 85 %
              </strong>
              <span style={{ fontSize: '0.8rem', color: '#a0b0a8' }}>En pruebas unitarias y de integración</span>
            </div>
            <div>
              <span style={{ fontSize: '0.72rem', fontFamily: 'var(--font-mono)', color: 'var(--color-mint)', textTransform: 'uppercase' }}>
                Vulnerabilidades Críticas
              </span>
              <strong style={{ display: 'block', fontSize: '1.6rem', color: '#ffffff', marginTop: '4px' }}>
                0 Permitidas
              </strong>
              <span style={{ fontSize: '0.8rem', color: '#a0b0a8' }}>Análisis SAST/DAST en CI/CD</span>
            </div>
            <div>
              <span style={{ fontSize: '0.72rem', fontFamily: 'var(--font-mono)', color: 'var(--color-mint)', textTransform: 'uppercase' }}>
                Conformidad del Inventario
              </span>
              <strong style={{ display: 'block', fontSize: '1.6rem', color: '#ffffff', marginTop: '4px' }}>
                ≥ 75 % Meta
              </strong>
              <span style={{ fontSize: '0.8rem', color: '#a0b0a8' }}>Actual: 68,3 % con 23 en riesgo</span>
            </div>
            <div>
              <span style={{ fontSize: '0.72rem', fontFamily: 'var(--font-mono)', color: 'var(--color-mint)', textTransform: 'uppercase' }}>
                Definición de Terminado
              </span>
              <strong style={{ display: 'block', fontSize: '1.6rem', color: '#ffffff', marginTop: '4px' }}>
                DoD 100% Verificable
              </strong>
              <span style={{ fontSize: '0.8rem', color: '#a0b0a8' }}>Validación por Product Owner</span>
            </div>
          </div>
        </div>

        {/* 2. OBJETIVOS DEL SPRINT (SPRINT GOALS) */}
        <div className="section-badge" style={{ marginBottom: '1rem' }}>
          <span className="badge-dot" />
          <span>METAS TÁCTICAS ITERATIVAS</span>
        </div>
        <h3 style={{ fontSize: '2rem', fontWeight: 400, marginBottom: '1rem' }}>
          Sprint Goals: Ciclos de Entrega de Dinastía Arias
        </h3>
        <p className="section-desc-lead" style={{ marginBottom: '2rem' }}>
          Cada Sprint de 2 semanas persigue un objetivo enfocado e indivisible que guía las decisiones técnicas diarias del equipo.
        </p>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '20px', marginBottom: '3.5rem' }}>
          {sprintGoals.map((sg) => {
            const isSelected = activeSprint === sg.id;
            return (
              <div
                key={sg.id}
                onClick={() => setActiveSprint(sg.id)}
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  padding: '24px',
                  borderRadius: '20px',
                  background: isSelected ? 'var(--color-charcoal)' : '#ffffff',
                  color: isSelected ? '#ffffff' : 'var(--color-charcoal)',
                  border: isSelected ? '2px solid var(--color-slate)' : '1px solid rgba(34, 47, 48, 0.12)',
                  cursor: 'pointer',
                  transition: 'all 0.25s ease',
                  boxShadow: isSelected ? '0 12px 30px rgba(34,47,48,0.18)' : '0 4px 16px rgba(0,0,0,0.03)',
                  transform: isSelected ? 'translateY(-3px)' : 'none'
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px' }}>
                  <span style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: '0.72rem',
                    color: isSelected ? 'var(--color-lime)' : 'var(--color-slate)',
                    letterSpacing: '0.04em'
                  }}>
                    {sg.sprintNumber}
                  </span>
                  <span style={{
                    fontSize: '0.72rem',
                    padding: '4px 10px',
                    borderRadius: '999px',
                    background: sg.status === 'Completado' 
                      ? (isSelected ? 'rgba(167, 226, 110, 0.2)' : '#e2ecd9')
                      : (isSelected ? 'rgba(255, 255, 255, 0.15)' : '#edf0e7'),
                    color: sg.status === 'Completado'
                      ? (isSelected ? 'var(--color-lime)' : '#257a41')
                      : (isSelected ? '#ffffff' : 'var(--color-slate)'),
                    fontFamily: 'var(--font-mono)'
                  }}>
                    {sg.status}
                  </span>
                </div>

                <h4 style={{ fontSize: '1.25rem', fontWeight: 600, lineHeight: 1.3, marginBottom: '10px' }}>
                  {sg.title}
                </h4>

                <p style={{
                  fontSize: '0.9rem',
                  lineHeight: 1.6,
                  color: isSelected ? '#d2dacf' : 'var(--color-slate)',
                  marginBottom: '18px'
                }}>
                  {sg.goalStatement}
                </p>

                <div style={{
                  marginTop: 'auto',
                  paddingTop: '16px',
                  borderTop: isSelected ? '1px solid rgba(255,255,255,0.12)' : '1px solid rgba(34,47,48,0.08)'
                }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.78rem', marginBottom: '6px' }}>
                    <span style={{ color: isSelected ? '#c9d2c7' : 'var(--color-slate)' }}>Período:</span>
                    <strong style={{ color: isSelected ? '#ffffff' : 'var(--color-charcoal)' }}>{sg.period}</strong>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.78rem' }}>
                    <span style={{ color: isSelected ? '#c9d2c7' : 'var(--color-slate)' }}>Liderazgo técnico:</span>
                    <strong style={{ color: isSelected ? 'var(--color-mint)' : '#257a41' }}>{sg.leadMember}</strong>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* 3. MATRIZ DE ASIGNACIÓN DE PERSONAL (STAFFING & ROLES) */}
        <div className="section-badge" style={{ marginBottom: '1rem' }}>
          <span className="badge-dot" />
          <span>CAPACIDAD Y DISTRIBUCIÓN DE TALENTO</span>
        </div>
        <h3 style={{ fontSize: '2rem', fontWeight: 400, marginBottom: '1rem' }}>
          Asignación de Personal: Equipo Dinastía Arias
        </h3>
        <p className="section-desc-lead" style={{ marginBottom: '2.5rem' }}>
          Distribución de responsabilidades, roles de gobernanza y carga de trabajo asignada según especialidad técnica y perfil tipológico MBTI.
        </p>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '20px', marginBottom: '3.5rem' }}>
          {memberAllocation.map((m) => (
            <div
              key={m.id}
              style={{
                background: '#ffffff',
                border: '1px solid rgba(34, 47, 48, 0.12)',
                borderRadius: '22px',
                padding: '24px',
                display: 'flex',
                flexDirection: 'column',
                boxShadow: '0 6px 20px rgba(34,47,48,0.04)',
                transition: 'transform 0.2s, box-shadow 0.2s'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '16px' }}>
                <div style={{
                  width: '54px',
                  height: '54px',
                  borderRadius: '50%',
                  background: 'linear-gradient(135deg, #edf0e7 0%, var(--color-mint) 100%)',
                  display: 'grid',
                  placeItems: 'center',
                  fontFamily: 'var(--font-mono)',
                  fontSize: '1rem',
                  fontWeight: 600,
                  color: 'var(--color-charcoal)',
                  border: '2px solid #ffffff',
                  boxShadow: '0 4px 10px rgba(0,0,0,0.08)'
                }}>
                  {m.avatar}
                </div>
                <div>
                  <h4 style={{ margin: 0, fontSize: '1.2rem', fontWeight: 600, color: 'var(--color-charcoal)' }}>
                    {m.name}
                  </h4>
                  <span style={{ fontSize: '0.82rem', color: '#257a41', fontWeight: 600 }}>
                    {m.role}
                  </span>
                </div>
              </div>

              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginBottom: '16px' }}>
                <span className="home-closing-pill">
                  MBTI: {m.mbti}
                </span>
                <span className="home-closing-pill is-lime">
                  {m.assignedTasksCount} tareas asignadas
                </span>
              </div>

              <p style={{ fontSize: '0.88rem', color: 'var(--color-slate)', lineHeight: 1.6, marginBottom: '18px' }}>
                {m.bio}
              </p>

              {/* Tareas Asignadas en el Sprint Actual */}
              <div style={{
                marginTop: 'auto',
                background: '#f8faf6',
                padding: '14px',
                borderRadius: '14px',
                border: '1px solid rgba(34,47,48,0.06)'
              }}>
                <span style={{
                  display: 'block',
                  fontSize: '0.72rem',
                  fontFamily: 'var(--font-mono)',
                  color: 'var(--color-slate)',
                  textTransform: 'uppercase',
                  marginBottom: '8px'
                }}>
                  Entregables Asignados en el Backlog:
                </span>
                <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '6px' }}>
                  {m.assignedTasksList.length > 0 ? m.assignedTasksList.map((t) => (
                    <li key={t.id} style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.82rem', color: 'var(--color-charcoal)' }}>
                      <CheckCircle2 size={13} color="#257a41" />
                      <span style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                        {t.title}
                      </span>
                    </li>
                  )) : (
                    <li style={{ fontSize: '0.82rem', color: 'var(--color-slate)', fontStyle: 'italic' }}>
                      Coordinación y supervisión transversal de vertical
                    </li>
                  )}
                </ul>
              </div>
            </div>
          ))}
        </div>

        {/* 4. TABLERO KANBAN DE ASIGNACIÓN INTERACTIVO */}
        <div className="section-badge" style={{ marginBottom: '1rem' }}>
          <span className="badge-dot" />
          <span>EJECUCIÓN OPERATIVA EN VIVO</span>
        </div>
        <h3 style={{ fontSize: '2rem', fontWeight: 400, marginBottom: '1rem' }}>
          Tablero Kanban: Asignación y Flujo de Trabajo
        </h3>
        <p className="section-desc-lead" style={{ marginBottom: '2.5rem' }}>
          Administra en tiempo real los entregables del equipo, asigna responsables, mueve tareas por las etapas del flujo de calidad y supervisa el progreso del Sprint Goal.
        </p>

        <KanbanBoard />
      </section>
    </TopicPage>
  );
}
