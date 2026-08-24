import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import GestionTecnologias from './pages/GestionTecnologias';
import CienciaInnovacion from './pages/CienciaInnovacion';
import MisionVision from './pages/MisionVision';
import Organizacion from './pages/Organizacion';
import Posiciones from './pages/Posiciones';
import PosicionDetalle from './pages/PosicionDetalle';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="gestion-tecnologias" element={<GestionTecnologias />} />
          <Route path="ciencia-innovacion" element={<CienciaInnovacion />} />
          <Route path="mision-vision" element={<MisionVision />} />
          <Route path="organizacion" element={<Organizacion />} />
          <Route path="posiciones" element={<Posiciones />} />
          <Route path="posiciones/:id" element={<PosicionDetalle />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
