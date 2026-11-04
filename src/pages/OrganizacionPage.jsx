import TopicPage from '../components/TopicPage';
import OrgChartSection from '../components/OrgChartSection';
import TeamSection from '../components/TeamSection';
import { Link } from 'react-router-dom';

export default function OrganizacionPage() {
  return (
    <TopicPage topicId="organizacion" related={['mbti', 'scrum', 'contacto']}>
      <nav className="organization-index" aria-label="Contenido de Organización">
        <Link to="/organizacion#organizacion">Organigrama y cargos <span aria-hidden="true">↓</span></Link>
        <Link to="/organizacion#equipo">Conoce al equipo <span aria-hidden="true">↓</span></Link>
      </nav>
      <OrgChartSection />
      <TeamSection />
    </TopicPage>
  );
}
