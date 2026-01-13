import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { HashLink } from 'react-router-hash-link';
import logo from '../assets/Un Detallico Logo.svg';
import { useAuth } from '../contexts/AuthContext';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user, logout } = useAuth();

  // Cierra el menú móvil cuando se hace clic en un enlace
  const closeMenu = () => setIsMenuOpen(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-lg border-b border-slate-100 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20 items-center">
          {/* Logo */}
          <Link to="/" onClick={closeMenu} className="flex-shrink-0 flex items-center">
            <img className="h-14 w-auto" src={logo} alt="Logo Un Detallico" />
          </Link>

          {/* Menú de escritorio */}
          <div className="hidden md:flex items-center space-x-8">
            <HashLink smooth to="/#templates" className="text-slate-600 font-semibold hover:text-brand-pink transition-colors">Nuestro Catálogo</HashLink>
            <HashLink smooth to="/#how-it-works" className="text-slate-600 font-semibold hover:text-brand-pink transition-colors">Servicio Digital</HashLink>
            <a href="/" className="text-slate-600 font-semibold hover:text-brand-pink transition-colors">Regalos Físicos</a>
            
            {user ? (
              <div className="flex items-center gap-4">
                <Link to="/dashboard" className="text-slate-600 font-semibold hover:text-brand-pink transition-colors">Mis Detallicos</Link>
                <button onClick={logout} className="bg-slate-100 text-slate-600 px-4 py-2 rounded-full hover:bg-slate-200 transition-all font-bold text-sm">
                  Salir
                </button>
              </div>
            ) : (
              <Link to="/login">
                <button className="bg-brand-pink text-white px-6 py-2.5 rounded-full hover:opacity-90 transition-all active:scale-95 font-bold shadow-lg shadow-pink-100">
                  Acceso Staff
                </button>
              </Link>
            )}
          </div>

          {/* Botón del menú móvil */}
          <div className="md:hidden flex items-center">
            <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="inline-flex items-center justify-center p-2 rounded-md text-slate-600 hover:text-brand-pink hover:bg-slate-100 focus:outline-none">
              <span className="sr-only">Abrir menú principal</span>
              {isMenuOpen ? (
                <svg className="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg className="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Menú móvil */}
      <div className={`${isMenuOpen ? 'block' : 'hidden'} md:hidden border-t border-slate-200`}>
        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
          <HashLink smooth to="/#templates" onClick={closeMenu} className="text-slate-600 hover:bg-slate-100 hover:text-brand-pink block px-3 py-2 rounded-md text-base font-medium">Nuestro Catálogo</HashLink>
          <HashLink smooth to="/#how-it-works" onClick={closeMenu} className="text-slate-600 hover:bg-slate-100 hover:text-brand-pink block px-3 py-2 rounded-md text-base font-medium">Servicio Digital</HashLink>
          <a href="/" onClick={closeMenu} className="text-slate-600 hover:bg-slate-100 hover:text-brand-pink block px-3 py-2 rounded-md text-base font-medium">Regalos Físicos</a>
          
          {user ? (
            <>
              <Link to="/dashboard" onClick={closeMenu} className="text-slate-600 hover:bg-slate-100 hover:text-brand-pink block px-3 py-2 rounded-md text-base font-medium">Mis Detallicos</Link>
              <button onClick={() => { logout(); closeMenu(); }} className="w-full text-left text-slate-600 hover:bg-slate-100 hover:text-brand-pink block px-3 py-2 rounded-md text-base font-medium">
                Salir
              </button>
            </>
          ) : (
            <Link to="/login" onClick={closeMenu} className="w-full text-center">
              <button className="bg-brand-pink text-white w-full mt-2 px-3 py-2 rounded-md text-base font-medium">
                  Acceso Staff
                </button>
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
