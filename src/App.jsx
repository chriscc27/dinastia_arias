import { Routes, Route } from 'react-router-dom';
import ScrollHandler from './components/ScrollHandler';
import HomePage from './pages/HomePage';
import CienciaTecnologiaPage from './pages/CienciaTecnologiaPage';
import GestionTecnologiasPage from './pages/GestionTecnologiasPage';
import MisionVisionPage from './pages/MisionVisionPage';

export default function App() {
  return (
    <>
      <ScrollHandler />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/ciencia-tecnologia-innovacion" element={<CienciaTecnologiaPage />} />
        <Route path="/gestion-tecnologias" element={<GestionTecnologiasPage />} />
        <Route path="/mision-vision" element={<MisionVisionPage />} />
      </Routes>
    </>
  );
}
