import TopicPage from '../components/TopicPage';
import OrgChartSection from '../components/OrgChartSection';

export default function OrganizacionPage() {
  return <TopicPage topicId="organizacion" related={["equipo","mbti","scrum"]}><OrgChartSection /></TopicPage>;
}
