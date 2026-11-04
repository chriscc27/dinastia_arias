import TopicPage from '../components/TopicPage';
import HerramientasSection from '../components/HerramientasSection';

export default function HerramientasPage() {
  return <TopicPage topicId="herramientas" related={["alcance","gestion-tecnologias"]}><HerramientasSection /></TopicPage>;
}
