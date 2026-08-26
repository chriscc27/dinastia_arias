import { teamMembers } from '../data/teamData';

export default function TeamSection() {
  return (
    <section id="equipo">
      <h2 className="section-title">El Equipo: Dinastía Arias</h2>
      <p className="section-subtitle">
        Los profesionales a cargo del aseguramiento de calidad en AITECH. Cada miembro aporta su experiencia,
        precisión y conocimiento para garantizar los más altos estándares en la empresa.
      </p>

      <div className="team-grid">
        {teamMembers.map((member, index) => (
          <div className="team-card" key={index}>
            <div className="avatar-placeholder">{member.initials}</div>
            <h3>{member.name}</h3>
            <p>{member.role}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
