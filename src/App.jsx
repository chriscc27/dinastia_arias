import { lazy } from 'react';
import { Route, Routes } from 'react-router-dom';
import SiteLayout from './components/SiteLayout';
import HomePage from './pages/HomePage';
import NotFoundPage from './pages/NotFoundPage';

const GestionTecnologiasPage = lazy(() => import('./pages/GestionTecnologiasPage'));
const CienciaTecnologiaPage = lazy(() => import('./pages/CienciaTecnologiaPage'));
const MisionVisionPage = lazy(() => import('./pages/MisionVisionPage'));
const OrganizacionPage = lazy(() => import('./pages/OrganizacionPage'));
const DescripcionPosicionesPage = lazy(() => import('./pages/DescripcionPosicionesPage'));
const MBTIPage = lazy(() => import('./pages/MBTIPage'));
const ScrumPage = lazy(() => import('./pages/ScrumPage'));
const GoalsPage = lazy(() => import('./pages/GoalsPage'));
const InventariosPage = lazy(() => import('./pages/InventariosPage'));
const IDEF0Page = lazy(() => import('./pages/IDEF0Page'));
const BPMNPage = lazy(() => import('./pages/BPMNPage'));
const TableauPage = lazy(() => import('./pages/TableauPage'));
const WekaPage = lazy(() => import('./pages/WekaPage'));
const MonitoreoPage = lazy(() => import('./pages/MonitoreoPage'));
const PresupuestoPage = lazy(() => import('./pages/PresupuestoPage'));
const SoporteExternoPage = lazy(() => import('./pages/SoporteExternoPage'));
const PlanContingenciaPage = lazy(() => import('./pages/PlanContingenciaPage'));
const ConclusionesRecomendacionesPage = lazy(() => import('./pages/ConclusionesRecomendacionesPage'));
const TrabajaConNosotrosPage = lazy(() => import('./pages/TrabajaConNosotrosPage'));

// Rutas de compatibilidad histórica
const EquipoPage = lazy(() => import('./pages/EquipoPage'));
const AlcancePage = lazy(() => import('./pages/AlcancePage'));
const HerramientasPage = lazy(() => import('./pages/HerramientasPage'));

export default function App() {
  return (
    <Routes>
      <Route element={<SiteLayout />}>
        {/* 1. Inicio */}
        <Route index element={<HomePage />} />
        <Route path="inicio" element={<HomePage />} />

        {/* 2. Gestión */}
        <Route path="gestion-tecnologias" element={<GestionTecnologiasPage />} />

        {/* 3. Ciencia, Tecnología e Innovación */}
        <Route path="ciencia-tecnologia-innovacion" element={<CienciaTecnologiaPage />} />

        {/* 4. Misión y Visión */}
        <Route path="mision-vision" element={<MisionVisionPage />} />

        {/* 5. Organización */}
        <Route path="organizacion" element={<OrganizacionPage />} />

        {/* 6. Descripción de Posiciones */}
        <Route path="descripcion-posiciones" element={<DescripcionPosicionesPage />} />
        <Route path="posiciones" element={<DescripcionPosicionesPage />} />

        {/* 7. MBTI */}
        <Route path="mbti" element={<MBTIPage />} />

        {/* 8. SCRUM */}
        <Route path="scrum" element={<ScrumPage />} />

        {/* 9. Goals: Objetivos y asignación de personal */}
        <Route path="goals" element={<GoalsPage />} />
        <Route path="objetivos-personal" element={<GoalsPage />} />

        {/* 10. Inventarios */}
        <Route path="inventarios" element={<InventariosPage />} />

        {/* 11. IDEF0 */}
        <Route path="idef-0" element={<IDEF0Page />} />

        {/* 12. BPMN */}
        <Route path="bpmn" element={<BPMNPage />} />

        {/* 13. Datos Tableau */}
        <Route path="tableau" element={<TableauPage />} />

        {/* 14. Patrones Weka */}
        <Route path="weka" element={<WekaPage />} />

        {/* 15. Monitoreo */}
        <Route path="monitoreo" element={<MonitoreoPage />} />

        {/* 16. Presupuesto */}
        <Route path="presupuesto" element={<PresupuestoPage />} />

        {/* 17. Soporte externo */}
        <Route path="soporte-externo" element={<SoporteExternoPage />} />

        {/* 18. Plan de Contingencia */}
        <Route path="plan-contingencia" element={<PlanContingenciaPage />} />

        {/* 19. Conclusiones y Recomendaciones */}
        <Route path="conclusiones-recomendaciones" element={<ConclusionesRecomendacionesPage />} />

        {/* 20. Contactos */}
        <Route path="trabaja-con-nosotros" element={<TrabajaConNosotrosPage />} />
        <Route path="contactos" element={<TrabajaConNosotrosPage />} />
        <Route path="contacto" element={<TrabajaConNosotrosPage />} />

        {/* Compatibilidad previa */}
        <Route path="equipo" element={<EquipoPage />} />
        <Route path="alcance" element={<AlcancePage />} />
        <Route path="herramientas" element={<HerramientasPage />} />

        {/* 404 Not Found */}
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  );
}
