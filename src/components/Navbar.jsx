import React from 'react';

const Navbar = () => {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-lg border-b border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20 items-center">
          <div className="flex items-center gap-3 group cursor-pointer">
            <div className="relative w-12 h-12 flex items-center justify-center shrink-0 transition-transform group-hover:scale-110">
              <div className="absolute inset-0 brand-gradient rounded-full shadow-lg"></div>
              {/* Bow SVG for the logo icon with exact pink */}
              <svg className="relative z-10 w-8 h-8 text-white drop-shadow-md" viewBox="0 0 24 24" fill="#F7067F">
                <path d="M12,10.5c-2.5-2.5-6-3-6-3s0.5,3.5,3,6l3-3L12,10.5z M12,10.5c2.5-2.5,6-3,6-3s-0.5,3.5-3,6l-3-3L12,10.5z M12,11.5c-1,1-2,4-2,4l2-1l2,1C14,15.5,13,12.5,12,11.5z" />
              </svg>
            </div>
            <div className="flex flex-col">
              <span className="text-2xl font-brand text-slate-800 font-bold leading-none">Un Detallico!</span>
              <span className="text-[10px] font-bold tracking-[0.2em] text-slate-400 uppercase">Regalería</span>
            </div>
          </div>
          
          <div className="hidden md:flex items-center space-x-10 text-sm font-semibold text-slate-600">
            <a href="#templates" className="hover:text-brand-pink transition-colors">Nuestro Catálogo</a>
            <a href="#how-it-works" className="hover:text-brand-pink transition-colors">Servicio Digital</a>
            <a href="https://undetallico.es" target="_blank" className="hover:text-brand-pink transition-colors">Regalos Físicos</a>
            <button className="bg-brand-pink text-white px-6 py-2.5 rounded-full hover:opacity-90 transition-all active:scale-95 font-bold shadow-lg shadow-pink-100">
              Staff Portal
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
