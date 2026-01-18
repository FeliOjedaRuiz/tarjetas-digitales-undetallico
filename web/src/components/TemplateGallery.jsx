import React, { useState } from 'react';
import { TEMPLATES } from '../constants';

const TemplateGallery = () => {
  const [filter, setFilter] = useState('Todas');

  const filteredTemplates = filter === 'Todas'
    ? TEMPLATES
    : TEMPLATES.filter(t => t.occasion === filter);

  const categories = ['Todas', 'Cumpleaños', 'Aniversario', 'San Valentín', 'General'];

  return (
    <section id="templates" className="py-24 bg-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mb-12">
          <h2 className="text-4xl md:text-5xl font-extrabold text-slate-900 mb-6 tracking-tight">
            Nuestro Catálogo <span className="text-brand-pink">Exclusivo</span>
          </h2>
          <p className="text-lg text-slate-500">
            Cada diseño ha sido creado pensando en las emociones que quieres transmitir. Previsualiza cómo quedará tu detalle digital.
          </p>
        </div>

        {/* Filters bar - Now separate and sticky */}
        <div className="sticky top-4 z-30 mb-12 bg-white/80 backdrop-blur-md p-2 rounded-2xl shadow-sm border border-slate-100">
          <div className="flex flex-wrap gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setFilter(cat)}
                className={`flex-1 sm:flex-none px-5 py-2.5 rounded-xl text-sm font-bold transition-all ${
                  filter === cat
                    ? 'bg-brand-pink text-white shadow-lg shadow-pink-200'
                    : 'bg-slate-50 text-slate-500 hover:bg-slate-100'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
          {filteredTemplates.map((template) => (
            <div 
              key={template.id} 
              className="group cursor-pointer relative"
            >
              <div className="relative aspect-4/5 overflow-hidden rounded-[40px] bg-slate-100 shadow-sm border-4 border-transparent transition-all duration-500 group-hover:border-brand-pink group-hover:shadow-2xl group-hover:shadow-pink-100 group-hover:-translate-y-2">
                <img 
                  src={template.previewUrl} 
                  alt={template.name} 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                
                {/* Overlay dinámico con los colores de la marca */}
                <div className="absolute inset-0 bg-linear-to-t from-slate-900/90 via-slate-900/20 to-transparent opacity-70 group-hover:opacity-85 transition-opacity"></div>
                
                <div className="absolute top-6 right-6">
                  <div className="px-3 py-1 rounded-full bg-white/90 backdrop-blur-md shadow-sm flex items-center gap-2">
                    <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: template.primaryColor }}></div>
                    <span className="text-[10px] font-black text-slate-800 uppercase tracking-tighter">Estilo {template.name}</span>
                  </div>
                </div>

                <div className="absolute bottom-8 left-8 right-8 text-center sm:text-left">
                  <span 
                    className="inline-block px-3 py-1 rounded-lg text-white text-[10px] font-black uppercase tracking-widest mb-3"
                    style={{ backgroundColor: template.primaryColor }}
                  >
                    {template.occasion}
                  </span>
                  <h3 className="text-2xl font-bold text-white mb-4">{template.name}</h3>
                  <div className="flex justify-center sm:justify-start items-center gap-2 text-white/90 text-sm font-bold opacity-0 group-hover:opacity-100 transition-all translate-y-4 group-hover:translate-y-0 duration-300">
                    <span className="bg-white/20 backdrop-blur-md px-4 py-2 rounded-full border border-white/30">
                      Gestionar esta tarjeta
                    </span>
                  </div>
                </div>
              </div>

              {/* Checkmark indicator on hover/selection feel */}
              <div className="absolute -top-2 -right-2 bg-brand-pink text-white w-8 h-8 rounded-full flex items-center justify-center shadow-lg opacity-0 scale-50 group-hover:opacity-100 group-hover:scale-100 transition-all duration-300 z-10">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TemplateGallery;
