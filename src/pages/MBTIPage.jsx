import TopicPage from '../components/TopicPage';
import MBTISection from '../components/MBTISection';

export default function MBTIPage() {
  return <TopicPage topicId="mbti" related={["equipo","organizacion","scrum"]}><MBTISection /></TopicPage>;
}
