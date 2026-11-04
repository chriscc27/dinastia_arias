import TopicPage from '../components/TopicPage';
import ScrumSection from '../components/ScrumSection';

export default function ScrumPage() {
  return <TopicPage topicId="scrum" related={["organizacion","idef-0","bpmn"]}><ScrumSection /></TopicPage>;
}
