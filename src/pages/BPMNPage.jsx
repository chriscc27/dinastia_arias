import TopicPage from '../components/TopicPage';
import BPMNSection from '../components/BPMNSection';

export default function BPMNPage() {
  return <TopicPage topicId="bpmn" related={["idef-0","scrum","monitoreo"]}><BPMNSection /></TopicPage>;
}
