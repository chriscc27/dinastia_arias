import Header from '../components/Header';
import Hero from '../components/Hero';
import GestionTecnologiasSection from '../components/GestionTecnologiasSection';
import CienciaTecnologiaSection from '../components/CienciaTecnologiaSection';
import MissionVisionSection from '../components/MissionVisionSection';
import TeamSection from '../components/TeamSection';
import OrgChartSection from '../components/OrgChartSection';
import MBTISection from '../components/MBTISection';
import AitechScopeSection from '../components/AitechScopeSection';
import Footer from '../components/Footer';

export default function HomePage() {
  return (
    <>
      <Header />
      <Hero />
      <GestionTecnologiasSection />
      <CienciaTecnologiaSection />
      <MissionVisionSection />
      <TeamSection />
      <OrgChartSection />
      <MBTISection />
      <AitechScopeSection />
      <Footer />
    </>
  );
}
