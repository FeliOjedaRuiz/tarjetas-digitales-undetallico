import Hero from '../components/Hero';
import Features from '../components/Features';
import TemplateGallery from '../components/TemplateGallery';

export default function HomePage() {
	return (
		<>
			<Hero />
			<Features />
			<TemplateGallery />

			{/* Why Now Section - Updated with Brand Pink */}
			<section className="py-24 bg-brand-pink overflow-hidden relative">
				<div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2 blur-2xl"></div>
				<div className="absolute bottom-0 left-0 w-96 h-96 bg-black/10 rounded-full translate-y-1/2 -translate-x-1/2 blur-2xl"></div>

				<div className="max-w-4xl mx-auto px-4 text-center relative z-10">
					<h2 className="text-3xl md:text-5xl font-extrabold text-white mb-8 tracking-tight">
						¿Buscas algo diferente para hoy?
					</h2>
					<p className="text-xl text-white/90 mb-12 font-medium">
						Pide tu detalle digital a través de nuestro staff. Un regalo que viaja a la velocidad de un clic.
					</p>
					<a href="#templates" className="inline-block bg-white text-brand-pink px-10 py-5 rounded-2xl font-black text-xl shadow-2xl hover:bg-slate-50 transition-all hover:-translate-y-1 active:scale-95">
						Ver Modelos Disponibles
					</a>
				</div>
			</section>
		</>
	);
}
