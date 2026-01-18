import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const Header = () => {
  const { user, logout } = useAuth();
  const isAuthenticated = !!user;

  const activeLinkClass = "bg-brand-pink text-white";
  const inactiveLinkClass = "text-slate-600 hover:bg-slate-100";
  const baseLinkClass = "px-3 py-2 rounded-md text-sm font-medium transition-colors";

  return (
    <header className="bg-white/80 backdrop-blur-lg sticky top-0 z-50 border-b border-slate-200 w-full">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="shrink-0 text-xl md:text-2xl font-bold text-brand-pink">
              Un Detallico
            </Link>
          </div>
          <div className="flex items-center gap-1 md:gap-2">
            {isAuthenticated ? (
              <>
                <NavLink 
                  to="/dashboard"
                  className={({ isActive }) => `${baseLinkClass} ${isActive ? activeLinkClass : inactiveLinkClass} whitespace-nowrap`}
                >
                  <span className="hidden xs:inline">Mis Detallicos</span>
                  <span className="xs:hidden">Mis tarjetas</span>
                </NavLink>
                {user?.role === 'admin' && (
                  <NavLink 
                    to="/create"
                    className={({ isActive }) => `${baseLinkClass} ${isActive ? activeLinkClass : inactiveLinkClass} whitespace-nowrap`}
                  >
                    <span className="hidden xs:inline">Crear Tarjeta</span>
                    <span className="xs:hidden">Crear</span>
                  </NavLink>
                )}
                <button 
                  onClick={logout}
                  className={`${baseLinkClass} ${inactiveLinkClass}`}
                >
                  Salir
                </button>
              </>
            ) : (
              <NavLink 
                to="/login"
                className={({ isActive }) => `${baseLinkClass} ${isActive ? activeLinkClass : inactiveLinkClass}`}
              >
                Iniciar Sesión
              </NavLink>
            )}
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;