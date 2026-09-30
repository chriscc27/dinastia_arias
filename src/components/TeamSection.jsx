import { useState } from 'react';
import { teamMembers } from '../data/teamData';
import { teamMbtiMembers } from '../data/mbtiData';

export default function TeamSection() {
  const [activeMemberId, setActiveMemberId] = useState(null);

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
        {teamMembers.map((member) => {
          const mbtiMember = teamMbtiMembers.find((profile) => profile.name === member.name);
          const isActive = activeMemberId === mbtiMember?.id;

          return (
          <article className={`team-card-bio ${isActive ? 'is-expanded' : ''}`} key={member.name}>
            <div className="avatar-circle">{member.initials}</div>
            <h3>{member.name}</h3>
            <p>{member.role}</p>
            {mbtiMember && (
              <>
                <button
                  type="button"
                  className="team-mbti-trigger"
                  aria-expanded={isActive}
                  aria-controls={`mbti-summary-${mbtiMember.id}`}
                  onClick={() => setActiveMemberId(isActive ? null : mbtiMember.id)}
                >
                  <span>{isActive ? 'Ocultar perfil' : 'Ver perfil MBTI'}</span>
                  <span className="team-mbti-trigger-icon" aria-hidden="true">{isActive ? '−' : '+'}</span>
                </button>

                {isActive && (
                  <div className="team-mbti-summary" id={`mbti-summary-${mbtiMember.id}`}>
                    <div className="team-mbti-summary-heading">
                      <span className="team-mbti-type">{mbtiMember.type}</span>
                      <span className="team-mbti-archetype">{mbtiMember.roleArchetype.split(' — ')[1]}</span>
                    </div>
                    <span className="team-mbti-letters">{mbtiMember.letterSummary}</span>
                    <p>{mbtiMember.description}</p>
                    <div className="team-mbti-contribution">
                      <span>Aporta al equipo</span>
                      <strong>{mbtiMember.contributions.slice(0, 3).join(' · ')}</strong>
                    </div>
                  </div>
                )}
              </>
            )}
          </article>
          );
        })}
      </div>
    </section>
  );
}
