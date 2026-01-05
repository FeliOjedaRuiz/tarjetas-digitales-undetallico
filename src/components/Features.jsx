import React from 'react';

const Features = () => {
  const features = [
    {
      title: "100% Personalizado",
      desc: "Adaptamos cada detalle digital al gusto del cliente, manteniendo la esencia de nuestra regalería.",
      icon: (
        <svg className="w-6 h-6 text-brand-pink" viewBox="0 0 24 24" fill="currentColor"><path d="M12,10.5c-2.5-2.5-6-3-6-3s0.5,3.5,3,6l3-3L12,10.5z M12,10.5c2.5-2.5,6-3,6-3s-0.5,3.5-3,6l-3-3L12,10.5z M12,11.5c-1,1-2,4-2,4l2-1l2,1C14,15.5,13,12.5,12,11.5z" /></svg>
      )
    },
    {
      title: "Privado & Seguro",
      desc: "Sin perfiles públicos. Solo la persona con el enlace podrá ver la sorpresa. Es vuestro secreto.",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-blue-500"><rect width="18" height="11" x="3" y="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
      )
    },
    {
      title: "IA de Redacción",
      desc: "Usamos inteligencia de vanguardia para ayudarte a redactar textos que toquen el corazón.",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-yellow-500"><path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z"/></svg>
      )
    },
    {
      title: "Sello Detallico!",
      desc: "Toda la calidad de nuestros regalos físicos, ahora optimizada para smartphones.",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-green-500"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10"/></svg>
      )
    }
  ];

  return (
    <section id="how-it-works" className="py-24 bg-[#F8F9FA]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center text-center mb-20">
          <span className="text-brand-pink font-bold text-xs uppercase tracking-widest mb-4">Nuestro ADN</span>
          <h2 className="text-4xl md:text-5xl font-extrabold text-slate-900 mb-6">¿Por qué un Detalle Digital?</h2>
          <p className="text-xl text-slate-500 max-w-2xl">Llevamos años creando sonrisas con regalos. Ahora, la distancia ya no es una barrera.</p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-10">
          {features.map((f, i) => (
            <div key={i} className="group bg-white p-10 rounded-[40px] shadow-sm hover:shadow-xl transition-all border border-slate-50">
              <div className="w-14 h-14 bg-slate-50 rounded-2xl flex items-center justify-center mb-8 group-hover:brand-gradient group-hover:text-white transition-all">
                {f.icon}
              </div>
              <h3 className="text-2xl font-extrabold mb-4 text-slate-800">{f.title}</h3>
              <p className="text-slate-500 leading-relaxed font-medium">{f.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
