import { teamMembers } from '../data/teamData';

export default function TeamSection() {
  return (
    <section
      id="equipo"
      className="light-section"
      style={{ borderTop: '1px solid rgba(34, 47, 48, 0.08)' }}
    >
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
        {teamMembers.map((member) => (
          <div className="team-card-bio" key={member.initials}>
            <div className="avatar-circle">{member.initials}</div>

            <h3>{member.name}</h3>
            <p>{member.role}</p>

            <div
              style={{
                marginTop: '1rem',
                paddingTop: '1rem',
                borderTop: '1px solid rgba(34, 47, 48, 0.12)',
                textAlign: 'left',
              }}
            >
              <h4
                style={{
                  margin: '0 0 0.35rem',
                  fontSize: '0.8rem',
                  letterSpacing: '0.08em',
                }}
              >
                MISIÓN
              </h4>

              <p style={{ margin: '0 0 0.9rem' }}>{member.mission}</p>

              <h4
                style={{
                  margin: '0 0 0.35rem',
                  fontSize: '0.8rem',
                  letterSpacing: '0.08em',
                }}
              >
                VISIÓN
              </h4>

              <p style={{ margin: 0 }}>{member.vision}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
