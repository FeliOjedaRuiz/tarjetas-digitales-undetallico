import React, { useState, useRef } from 'react';
import PropTypes from 'prop-types';

// --- Subcomponentes Internos para mantener el diseño modular ---

const GiftCover = ({ onClick, coverImage, recipient }) => (
	<div
		onClick={onClick}
		className="absolute inset-0 z-50 flex flex-col items-center justify-center bg-slate-900 cursor-pointer transition-all duration-1000 ease-in-out"
	>
		{/* Imagen de fondo con overlay */}
		<div className="absolute inset-0">
			{coverImage ? (
				<img
					src={coverImage}
					alt="Cover"
					className="w-full h-full object-cover opacity-60"
				/>
			) : (
				<div className="w-full h-full bg-linear-to-br from-pink-500 to-purple-600 opacity-50" />
			)}
			<div className="absolute inset-0 bg-black/30 backdrop-blur-[2px]" />
		</div>

		{/* Portada del Regalo */}
		<div className="relative z-10 text-center p-6 animate-bounce">
			<h1
				className="text-4xl md:text-6xl text-white mb-4 tracking-wide drop-shadow-lg"
				style={{ fontFamily: "'Playfair Display', serif" }}
			>
				{recipient ? `Para ${recipient}` : 'Un Regalo Para Ti'}
			</h1>
			<div className="w-24 h-24 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center mx-auto mb-6 border-2 border-white/40 shadow-[0_0_30px_rgba(255,255,255,0.3)] transition-transform hover:scale-110">
				<svg
					xmlns="http://www.w3.org/2000/svg"
					className="h-10 w-10 text-white"
					fill="none"
					viewBox="0 0 24 24"
					stroke="currentColor"
				>
					<path
						strokeLinecap="round"
						strokeLinejoin="round"
						strokeWidth={2}
						d="M12 8v13m0-13V6a2 2 0 112 2h-2zm0 0V5.5A2.5 2.5 0 109.5 8H12zm-7 4h14M5 12a2 2 0 110-4h14a2 2 0 110 4M5 12v7a2 2 0 002 2h10a2 2 0 002-2v-7"
					/>
				</svg>
			</div>

			<p className="text-white/90 text-sm md:text-lg font-medium uppercase tracking-[0.2em] animate-pulse">
				Toca para abrir
			</p>
		</div>
	</div>
);

GiftCover.propTypes = {
	onClick: PropTypes.func.isRequired,
	coverImage: PropTypes.string,
	recipient: PropTypes.string,
};

const SectionDivider = () => (
	<div className="flex justify-center py-12 opacity-60">
		<div className="w-16 h-1 bg-linear-to-r from-transparent via-pink-300 to-transparent rounded-full" />
	</div>
);

// --- Componente Principal ---

const MasterTemplate = ({ card }) => {
	const [isOpen, setIsOpen] = useState(false);
	const audioRef = useRef(null);

	// Extraemos datos de forma segura
	const { content, recipient, sender, templateId } = card || {};
	const styles = templateId?.defaultStyles || {};

	const {
		mainTitle,
		message,
		finalMessage,
		finalSubtitle,
		coverImage,
		gallery = [],
		song,
		video,
		videoCaption,
	} = content || {};

	// Detectamos si es un enlace de Spotify o un archivo directo
	const isSpotify = song && song.includes('spotify.com');

	const handleOpen = () => {
		setIsOpen(true);
		// Solo intentamos autoplay si es un archivo de audio directo (MP3)
		if (audioRef.current && song && !isSpotify) {
			setTimeout(() => {
				audioRef.current
					.play()
					.catch((e) => console.log('Autoplay bloqueado o error:', e));
			}, 500);
		}
	};

	// Estilos dinámicos basados en la configuración de la plantilla
	const fontTitle = styles.fonts?.title || "'Playfair Display', serif";
	const fontBody = styles.fonts?.body || "'Lato', sans-serif";
	const fontAccent = styles.fonts?.accent || "'Dancing Script', cursive";
	const colorPrimary = styles.colors?.primary || '#ec4899';

	return (
		<div className="min-h-screen bg-linear-to-b from-pink-50 via-white to-rose-50 text-slate-800 overflow-hidden relative selection:bg-pink-200">
			{/* Portada (Overlay) */}
			{!isOpen && (
				<GiftCover
					onClick={handleOpen}
					coverImage={coverImage}
					recipient={recipient}
				/>
			)}

			{/* Contenido Principal - Se revela al abrir */}
			<div
				className={`transition-all duration-1000 ease-in-out ${
					isOpen
						? 'opacity-100 translate-y-0'
						: 'opacity-0 translate-y-10 h-0 overflow-hidden'
				}`}
				style={{ fontFamily: fontBody }}
			>
				{/* 1. Hero Section */}
				<section className="min-h-[70vh] md:min-h-[85vh] flex flex-col items-center justify-center text-center p-6 relative">
					{/* Decoración de fondo (Blobs) */}
					<div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10 pointer-events-none opacity-40">
						<div className="absolute top-[10%] left-[10%] w-72 h-72 bg-pink-300 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-pulse" />
						<div
							className="absolute top-[10%] right-[10%] w-72 h-72 bg-purple-300 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-pulse"
							style={{ animationDelay: '2s' }}
						/>
					</div>

					<h2 className="text-sm font-bold tracking-[0.3em] uppercase mb-8 text-slate-500">
						{recipient ? `Hola ${recipient}` : 'Hola'}
					</h2>

					<h1
						className="text-4xl md:text-7xl lg:text-8xl mb-6 md:mb-10 leading-tight text-slate-900 drop-shadow-sm px-2"
						style={{ fontFamily: fontTitle }}
					>
						{mainTitle || 'Un detalle especial'}
					</h1>

					<div className="animate-bounce mt-12 text-slate-400">
						<svg
							className="w-8 h-8 mx-auto"
							fill="none"
							stroke="currentColor"
							viewBox="0 0 24 24"
						>
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								strokeWidth={1.5}
								d="M19 14l-7 7m0 0l-7-7m7 7V3"
							/>
						</svg>
					</div>
				</section>

				{/* 2. Message Section */}
				<section className="max-w-3xl mx-auto px-6 py-12 text-center">
					<p className="text-xl md:text-2xl leading-relaxed font-light text-slate-700 whitespace-pre-line">
						{message}
					</p>
				</section>

				{/* 3. Gallery Section */}
				{gallery && gallery.length > 0 && (
					<>
						<SectionDivider />
						<section className="max-w-5xl mx-auto px-4 py-8">
							<h3
								className="text-center text-3xl mb-12 italic text-slate-500"
								style={{ fontFamily: fontTitle }}
							>
								Nuestros Momentos
							</h3>
							<div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8">
								{gallery.map((img, idx) => (
									<div
										key={idx}
										className={`relative group overflow-hidden rounded-2xl shadow-lg md:shadow-xl transition-all hover:shadow-2xl ${
											idx % 3 === 0
												? 'md:col-span-2 aspect-video'
												: 'aspect-square'
										}`}
									>
										<img
											src={typeof img === 'string' ? img : img.url}
											alt={`Recuerdo ${idx}`}
											className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
										/>
									</div>
								))}
							</div>
						</section>
					</>
				)}

				{/* 4. Video Section */}
				{video && (
					<>
						<SectionDivider />
						<section className="max-w-4xl mx-auto px-4 py-8 text-center">
							{videoCaption && (
								<h3
									className="text-2xl mb-8 text-slate-600"
									style={{ fontFamily: fontTitle }}
								>
									{videoCaption}
								</h3>
							)}
							<div className="relative pt-[56.25%] rounded-3xl overflow-hidden shadow-2xl bg-black ring-4 ring-white/50">
								<iframe
									className="absolute top-0 left-0 w-full h-full"
									src={(function (url) {
										if (!url) return '';
										// Regex mejorado
										const regExp =
											/^.*(youtu\.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=|shorts\/)([^#&?]*).*/;
										const match = url.match(regExp);
										const videoId =
											match && match[2].length === 11 ? match[2] : null;

										if (videoId) {
											// Usamos youtube-nocookie.com para mejor compatibilidad en móviles y desarrollo local (HTTP)
											return `https://www.youtube-nocookie.com/embed/${videoId}?playsinline=1&rel=0`;
										}

										return ''; // Nunca devolver url cruda para evitar bloqueos de X-Frame-Options
									})(video)}
									title="Video Especial"
									allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
									allowFullScreen
								/>
							</div>
						</section>
					</>
				)}

				<SectionDivider />

				{/* 5. Final Section */}
				<section className="min-h-[60vh] flex flex-col items-center justify-center text-center p-8 bg-linear-to-t from-pink-100/50 to-transparent">
					<h2
						className="text-3xl md:text-6xl text-slate-800 mb-6 px-4"
						style={{ fontFamily: fontTitle }}
					>
						{finalMessage || 'Te quiero'}
					</h2>
					{finalSubtitle && (
						<p
							className="font-medium text-xl mb-12"
							style={{ color: colorPrimary }}
						>
							{finalSubtitle}
						</p>
					)}
					<div className="mt-8 transform -rotate-2">
						<p className="text-xs text-slate-400 uppercase tracking-widest mb-2">
							Con amor
						</p>
						<p
							className="text-5xl text-slate-700"
							style={{ fontFamily: fontAccent }}
						>
							{sender}
						</p>
					</div>

					<div className="mt-24 mb-4 text-center">
						<p className="text-[10px] uppercase tracking-widest text-slate-300 font-medium">
							Creado con{' '}
							<a href="/" className="hover:text-pink-400 transition-colors">
								Un Detallico
							</a>
						</p>
					</div>
				</section>

				<div className="h-24" />
			</div>

			{/* Lógica de Música Híbrida */}
			{song && (
				<>
					{/* Caso 1: Archivo MP3 (Autoplay invisible) */}
					{!isSpotify && <audio ref={audioRef} src={song} loop />}

					{/* Caso 2: Widget de Spotify (Visible al abrir) */}
					{isSpotify && isOpen && (
						<div className="fixed bottom-4 left-4 right-4 md:left-auto md:right-4 z-40 animate-bounce-in-up">
							<div className="bg-white/90 backdrop-blur-sm p-2 rounded-xl shadow-2xl border border-pink-100">
								<iframe
									style={{ borderRadius: '12px' }}
									src={song.replace('/track/', '/embed/track/')}
									width="100%"
									height="80"
									frameBorder="0"
									allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
									loading="lazy"
								></iframe>
							</div>
						</div>
					)}
				</>
			)}
		</div>
	);
};

MasterTemplate.propTypes = {
	card: PropTypes.shape({
		content: PropTypes.object,
		recipient: PropTypes.string,
		sender: PropTypes.string,
		templateId: PropTypes.object,
	}),
};

export default MasterTemplate;
