import React from 'react';
import { Link } from 'react-router-dom';

const Hero = () => {
  return (
    <div className="relative pt-32 pb-24 overflow-hidden">
      {/* Brand Gradient Background Accents using brand palette exact hexes */}
      <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/4 w-200 h-200 bg-brand-yellow/10 rounded-full blur-[120px]"></div>
      <div className="absolute bottom-0 left-0 translate-y-1/2 -translate-x-1/4 w-150 h-150 bg-brand-purple/10 rounded-full blur-[120px]"></div>
      <div className="absolute top-1/4 left-1/4 w-75 h-75 bg-brand-cyan/5 rounded-full blur-[80px]"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex flex-col items-center text-center max-w-4xl mx-auto">
          <div className="mb-8 p-0.5 rounded-full bg-brand-gradient inline-block shadow-xl">
             <div className="bg-white px-6 py-2 rounded-full">
                <span className="text-brand-pink font-extrabold text-sm uppercase tracking-widest">Digital Detallico Experience</span>
             </div>
          </div>
          
          <h1 className="text-5xl md:text-8xl font-extrabold text-slate-900 leading-[1.1] mb-8">
            Emociones que viajan en un <span className="text-brand-gradient">Enlace</span>
          </h1>
          
          <p className="text-xl md:text-2xl text-slate-600 mb-12 leading-relaxed">
            En <strong>Un Detallico!</strong> convertimos tus felicitaciones en experiencias digitales mágicas. 
            Diseños exclusivos, mensajes con alma y entrega instantánea mediante enlace privado.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-6">
            <a href="#templates" className="bg-brand-pink text-white px-10 py-5 rounded-2xl font-extrabold text-xl shadow-2xl shadow-pink-200 hover:-translate-y-1 transition-all active:scale-95">
              Explorar Catálogo
            </a>
            <Link to="/login">
              <button className="bg-white text-slate-800 border-2 border-slate-100 px-10 py-5 rounded-2xl font-extrabold text-xl hover:bg-slate-50 transition-all shadow-sm">
                Login
              </button>
            </Link>
          </div>

          <div className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-8 w-full max-w-3xl border-t border-slate-100 pt-12">
            {[
              { label: 'Ocasión', val: 'Cumpleaños', color: '#FFDC42' },
              { label: 'Especial', val: 'San Valentín', color: '#F7067F' },
              { label: 'Elegante', val: 'Aniversarios', color: '#954892' },
              { label: 'Único', val: 'Fechas clave', color: '#0AA5AC' }
            ].map((item) => (
              <div key={item.label} className="flex flex-col items-center md:items-start">
                <span className="text-[10px] uppercase tracking-tighter text-slate-400 font-black mb-1">{item.label}</span>
                <span className="text-lg font-bold text-slate-800 flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full" style={{ backgroundColor: item.color }}></div>
                  {item.val}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
