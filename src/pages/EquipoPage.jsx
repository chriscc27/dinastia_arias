import TopicPage from '../components/TopicPage';
import TeamSection from '../components/TeamSection';

export default function EquipoPage() {
  return <TopicPage topicId="equipo" related={["organizacion","mbti","contacto"]}><TeamSection /></TopicPage>;
}
