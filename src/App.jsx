import { lazy, Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';
import ScrollHandler from './components/ScrollHandler';
import HomePage from './pages/HomePage';
import CienciaTecnologiaPage from './pages/CienciaTecnologiaPage';
import GestionTecnologiasPage from './pages/GestionTecnologiasPage';
import MisionVisionPage from './pages/MisionVisionPage';
import TrabajaConNosotrosPage from './pages/TrabajaConNosotrosPage';

// Páginas de herramientas del área: se cargan bajo demanda para no engordar el home
const TableauPage = lazy(() => import('./pages/TableauPage'));
const WekaPage = lazy(() => import('./pages/WekaPage'));
const MonitoreoPage = lazy(() => import('./pages/MonitoreoPage'));
const PresupuestoPage = lazy(() => import('./pages/PresupuestoPage'));
const SoporteExternoPage = lazy(() => import('./pages/SoporteExternoPage'));

export default function App() {
  return (
    <>
      <ScrollHandler />
      <Suspense fallback={<div style={{ minHeight: '100vh', background: 'var(--color-offwhite)' }} />}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/ciencia-tecnologia-innovacion" element={<CienciaTecnologiaPage />} />
          <Route path="/gestion-tecnologias" element={<GestionTecnologiasPage />} />
          <Route path="/mision-vision" element={<MisionVisionPage />} />
          <Route path="/trabaja-con-nosotros" element={<TrabajaConNosotrosPage />} />
          <Route path="/tableau" element={<TableauPage />} />
          <Route path="/weka" element={<WekaPage />} />
          <Route path="/monitoreo" element={<MonitoreoPage />} />
          <Route path="/presupuesto" element={<PresupuestoPage />} />
          <Route path="/soporte-externo" element={<SoporteExternoPage />} />
        </Routes>
      </Suspense>
    </>
  );
}
