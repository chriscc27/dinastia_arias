import TopicPage from '../components/TopicPage';
import IDEF0Section from '../components/IDEF0Section';

export default function IDEF0Page() {
  return <TopicPage topicId="idef-0" related={["scrum","bpmn","gestion-tecnologias"]}><IDEF0Section /></TopicPage>;
}
