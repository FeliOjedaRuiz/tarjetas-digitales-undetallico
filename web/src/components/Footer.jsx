import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-slate-900 text-white pt-24 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-4 gap-16 mb-20">
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center gap-3 mb-8">
              <div className="w-10 h-10 brand-gradient rounded-full shadow-lg flex items-center justify-center">
                <svg className="w-6 h-6 text-white" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12,10.5c-2.5-2.5-6-3-6-3s0.5,3.5,3,6l3-3L12,10.5z M12,10.5c2.5-2.5,6-3,6-3s-0.5,3.5-3,6l-3-3L12,10.5z M12,11.5c-1,1-2,4-2,4l2-1l2,1C14,15.5,13,12.5,12,11.5z" />
                </svg>
              </div>
              <div className="flex flex-col">
                <span className="text-3xl font-brand text-white font-bold leading-none">Un Detallico!</span>
                <span className="text-[10px] font-bold tracking-[0.3em] text-slate-500 uppercase">Regalería & Detallicos</span>
              </div>
            </div>
            <p className="text-slate-400 max-w-sm mb-10 text-lg leading-relaxed">
              Expertos en crear momentos inolvidables. Desde nuestra regalería física a tu pantalla, cuidamos cada detalle.
            </p>
            <div className="flex gap-4">
              {['facebook', 'instagram', 'whatsapp'].map(platform => (
                <a key={platform} href="#" className="w-12 h-12 bg-white/5 rounded-2xl flex items-center justify-center hover:bg-brand-pink transition-all border border-white/10">
                   <span className="text-xs font-bold uppercase tracking-tighter">{platform[0]}</span>
                </a>
              ))}
            </div>
          </div>
          <div>
            <h4 className="text-sm font-black uppercase tracking-[0.2em] mb-8 text-white">Servicios</h4>
            <ul className="space-y-4 text-slate-400 font-bold">
              <li><a href="#" className="hover:text-brand-pink transition-colors">Tarjetas Digitales</a></li>
              <li><a href="#" className="hover:text-brand-pink transition-colors">Cestas de Regalo</a></li>
              <li><a href="#" className="hover:text-brand-pink transition-colors">Decoración Eventos</a></li>
              <li><a href="#" className="hover:text-brand-pink transition-colors">Detalles Invitados</a></li>
            </ul>
          </div>
          <div>
            <h4 className="text-sm font-black uppercase tracking-[0.2em] mb-8 text-white">Nosotros</h4>
            <ul className="space-y-4 text-slate-400 font-bold">
              <li><a href="#" className="hover:text-brand-pink transition-colors">La Tienda</a></li>
              <li><a href="#" className="hover:text-brand-pink transition-colors">Blog de Ideas</a></li>
              <li><a href="#" className="hover:text-brand-pink transition-colors">Contacto</a></li>
              <li><a href="#" className="hover:text-brand-pink transition-colors">Aviso Legal</a></li>
            </ul>
          </div>
        </div>
        <div className="pt-12 border-t border-white/5 text-center flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-slate-500 text-sm font-bold">© {new Date().getFullYear()} Un Detallico! - Made with Love.</p>
          <div className="flex gap-8 text-slate-500 text-[10px] font-black uppercase tracking-widest">
            <span>Privacidad</span>
            <span>Cookies</span>
            <span>Términos</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
