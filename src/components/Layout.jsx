import { useEffect, useState } from 'react';
import { Link, Outlet, useLocation } from 'react-router-dom';

const menuItems = [
  { id: 'gestion-tecnologias', title: 'Gestión de Tecnologías', path: '/gestion-tecnologias' },
  { id: 'ciencia-innovacion', title: 'Ciencia e Innovación', path: '/ciencia-innovacion' },
  { id: 'mision-vision', title: 'Misión y Visión', path: '/mision-vision' },
  { id: 'organizacion', title: 'Organización', path: '/organizacion' },
  { id: 'posiciones', title: 'Descripción de Posiciones', path: '/posiciones' },
];

export default function Layout() {
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="flex flex-col min-h-screen">
      <header 
        className={`fixed top-0 left-0 w-full z-50 glass-header transition-all duration-300 flex flex-col md:flex-row justify-between items-center ${
          isScrolled ? 'py-3 px-8 bg-slate-900/95 shadow-lg' : 'py-5 px-8 bg-slate-900/40'
        }`}
      >
        <Link 
          to="/"
          className="text-2xl font-extrabold text-gradient cursor-pointer mb-4 md:mb-0 shrink-0 hover:scale-105 transition-transform" 
        >
          IATech Quality
        </Link>
        <nav className="flex gap-6 overflow-x-auto no-scrollbar w-full md:w-auto items-center pb-2 md:pb-0 px-2 md:px-0">
          {menuItems.map((item) => {
            const isActive = location.pathname.startsWith(item.path);
            return (
              <Link 
                key={item.id} 
                to={item.path} 
                className={`text-sm font-semibold transition-colors whitespace-nowrap relative group py-1 ${
                  isActive ? 'text-primary' : 'text-slate-300 hover:text-primary'
                }`}
              >
                {item.title}
                <span className={`absolute bottom-0 left-0 h-0.5 bg-primary transition-all duration-300 ${
                  isActive ? 'w-full shadow-[0_0_8px_#00f2fe]' : 'w-0 group-hover:w-full'
                }`}></span>
              </Link>
            )
          })}
        </nav>
      </header>

      <main className="flex-grow pt-32 px-4 md:px-8 max-w-7xl mx-auto w-full">
        <Outlet />
      </main>

      <footer className="py-8 text-center text-slate-500 text-sm mt-12 border-t border-white/10 bg-black/20">
        &copy; {new Date().getFullYear()} Dinastía Arias - IATech Quality Group. Todos los derechos reservados.
      </footer>
    </div>
  );
}
