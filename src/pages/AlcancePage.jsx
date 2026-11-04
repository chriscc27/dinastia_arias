import TopicPage from '../components/TopicPage';
import AitechScopeSection from '../components/AitechScopeSection';

export default function AlcancePage() {
  return <TopicPage topicId="alcance" related={["gestion-tecnologias","organizacion","herramientas"]}><AitechScopeSection /></TopicPage>;
}
