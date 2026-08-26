import { teamMembers } from '../data/teamData';

export default function TeamSection() {
  return (
    <section id="equipo" className="light-section" style={{ borderTop: '1px solid rgba(34, 47, 48, 0.08)' }}>
      <div className="section-badge">
        <span className="badge-dot" />
        <span>EL EQUIPO</span>
      </div>

      <h2 className="section-heading-xl">
        Dinastía Arias: Especialistas en Excelencia y Calidad.
      </h2>

      <p className="section-desc-lead">
        Los profesionales a cargo del aseguramiento de calidad en AITECH. Cada miembro aporta su experiencia, precisión y conocimiento para garantizar los más altos estándares.
      </p>

      <div className="team-grid-bio">
        {teamMembers.map((member, index) => (
          <div className="team-card-bio" key={index}>
            <div className="avatar-circle">{member.initials}</div>
            <h3>{member.name}</h3>
            <p>{member.role}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
