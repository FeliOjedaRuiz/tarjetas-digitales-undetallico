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
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-8">
          <div className="max-w-xl">
            <h2 className="text-4xl md:text-5xl font-extrabold text-slate-900 mb-6 tracking-tight">
              Nuestro Catálogo <span className="text-brand-pink">Exclusivo</span>
            </h2>
            <p className="text-lg text-slate-500">
              Cada diseño ha sido creado pensando en las emociones que quieres transmitir. Previsualiza cómo quedará tu detalle digital.
            </p>
          </div>
          <div className="flex flex-wrap gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setFilter(cat)}
                className={`px-5 py-2.5 rounded-xl text-sm font-bold transition-all ${
                  filter === cat
                    ? 'bg-brand-pink text-white shadow-lg shadow-pink-100'
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
              className="group cursor-pointer"
            >
              <div className="relative aspect-4/5 overflow-hidden rounded-[40px] bg-slate-100 shadow-sm border border-slate-50 transition-all duration-500 group-hover:shadow-2xl group-hover:shadow-pink-100 group-hover:-translate-y-2">
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

                <div className="absolute bottom-8 left-8 right-8">
                  <span 
                    className="inline-block px-3 py-1 rounded-lg text-white text-[10px] font-black uppercase tracking-widest mb-3"
                    style={{ backgroundColor: template.primaryColor }}
                  >
                    {template.occasion}
                  </span>
                  <h3 className="text-2xl font-bold text-white mb-4">{template.name}</h3>
                  <div className="flex items-center gap-2 text-white/90 text-sm font-bold opacity-0 group-hover:opacity-100 transition-all translate-y-4 group-hover:translate-y-0 duration-300">
                    <span className="bg-white/20 backdrop-blur-md px-4 py-2 rounded-full border border-white/30">
                      Gestionar esta tarjeta
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TemplateGallery;
