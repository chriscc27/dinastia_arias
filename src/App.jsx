import { lazy } from 'react';
import { Route, Routes } from 'react-router-dom';
import SiteLayout from './components/SiteLayout';
import HomePage from './pages/HomePage';
import NotFoundPage from './pages/NotFoundPage';

const GestionTecnologiasPage = lazy(() => import('./pages/GestionTecnologiasPage'));
const CienciaTecnologiaPage = lazy(() => import('./pages/CienciaTecnologiaPage'));
const MisionVisionPage = lazy(() => import('./pages/MisionVisionPage'));
const TrabajaConNosotrosPage = lazy(() => import('./pages/TrabajaConNosotrosPage'));
const EquipoPage = lazy(() => import('./pages/EquipoPage'));
const OrganizacionPage = lazy(() => import('./pages/OrganizacionPage'));
const MBTIPage = lazy(() => import('./pages/MBTIPage'));
const ScrumPage = lazy(() => import('./pages/ScrumPage'));
const IDEF0Page = lazy(() => import('./pages/IDEF0Page'));
const BPMNPage = lazy(() => import('./pages/BPMNPage'));
const HerramientasPage = lazy(() => import('./pages/HerramientasPage'));
const AlcancePage = lazy(() => import('./pages/AlcancePage'));
const TableauPage = lazy(() => import('./pages/TableauPage'));
const WekaPage = lazy(() => import('./pages/WekaPage'));
const MonitoreoPage = lazy(() => import('./pages/MonitoreoPage'));
const PresupuestoPage = lazy(() => import('./pages/PresupuestoPage'));
const SoporteExternoPage = lazy(() => import('./pages/SoporteExternoPage'));

export default function App() {
  return (
    <Routes>
      <Route element={<SiteLayout />}>
        <Route index element={<HomePage />} />
        <Route path="gestion-tecnologias" element={<GestionTecnologiasPage />} />
        <Route path="ciencia-tecnologia-innovacion" element={<CienciaTecnologiaPage />} />
        <Route path="mision-vision" element={<MisionVisionPage />} />
        <Route path="trabaja-con-nosotros" element={<TrabajaConNosotrosPage />} />
        <Route path="equipo" element={<EquipoPage />} />
        <Route path="organizacion" element={<OrganizacionPage />} />
        <Route path="mbti" element={<MBTIPage />} />
        <Route path="scrum" element={<ScrumPage />} />
        <Route path="idef-0" element={<IDEF0Page />} />
        <Route path="bpmn" element={<BPMNPage />} />
        <Route path="herramientas" element={<HerramientasPage />} />
        <Route path="alcance" element={<AlcancePage />} />
        <Route path="tableau" element={<TableauPage />} />
        <Route path="weka" element={<WekaPage />} />
        <Route path="monitoreo" element={<MonitoreoPage />} />
        <Route path="presupuesto" element={<PresupuestoPage />} />
        <Route path="soporte-externo" element={<SoporteExternoPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  );
}
