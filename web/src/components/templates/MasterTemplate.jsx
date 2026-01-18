import React, { useState, useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import { getOptimizedImageUrl } from '../../utils/imageOptimizer';

// --- Helper para URL de YouTube ---
const getYouTubeEmbedUrl = (url) => {
	if (!url) return '';
	const regExp = /^.*(youtu\.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=|shorts\/)([^#&?]*).*/;
	const match = url.match(regExp);
	const videoId = match && match[2].length === 11 ? match[2] : null;

	if (videoId) {
		const origin = typeof window !== 'undefined' ? window.location.origin : '';
		return `https://www.youtube.com/embed/${videoId}?enablejsapi=1&autoplay=0&mute=0&controls=0&loop=1&playlist=${videoId}&origin=${origin}`;
	}
	return '';
};

// --- Subcomponentes Internos para mantener el diseño modular ---

const GiftCover = ({ onClick, coverImage, recipient, hasMusic }) => (
	<div
		onClick={onClick}
		className="absolute inset-0 z-50 flex flex-col items-center justify-center bg-slate-900 cursor-pointer transition-all duration-1000 ease-in-out"
	>
		{/* Imagen de fondo con overlay */}
		<div className="absolute inset-0">
			{coverImage ? (
				<img
					src={getOptimizedImageUrl(coverImage, 1200)}
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
				className="text-4xl md:text-6xl text-white mb-14 tracking-wide drop-shadow-lg"
				style={{ fontFamily: "'Playfair Display', serif" }}
			>
				{recipient ? `Para ${recipient}` : 'Un Regalo Para Ti'}
			</h1>

			{hasMusic && (
				<p className="text-white/70 text-xs mb-10 font-light">Sube el volumen para <br /> una mejor experiencia 🔊</p>
			)}

			<p className="text-white/90 text-sm md:text-lg font-medium uppercase mb-8 tracking-[0.2em] animate-pulse">
				Toca para abrir
			</p>

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

			
			
		</div>
	</div>
);

GiftCover.propTypes = {
	onClick: PropTypes.func.isRequired,
	coverImage: PropTypes.string,
	recipient: PropTypes.string,
	hasMusic: PropTypes.bool,
};

const SectionDivider = () => (
	<div className="flex justify-center py-12 opacity-60">
		<div className="w-16 h-1 bg-linear-to-r from-transparent via-pink-300 to-transparent rounded-full" />
	</div>
);

// --- Componente Principal ---

const MasterTemplate = ({ card }) => {
	const [isOpen, setIsOpen] = useState(false);
	const [isPlaying, setIsPlaying] = useState(false);
	const playerRef = useRef(null);

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
		musicUrl,
		showVideo,
		videoCaption,
	} = content || {};

	const handleOpen = () => {
		setIsOpen(true);
		// Iniciar reproducción de YouTube al abrir
		if (musicUrl && playerRef.current) {
			// Pequeño delay para asegurar que el usuario ha interactuado
			setTimeout(() => {
				playerRef.current.contentWindow.postMessage(
					'{"event":"command","func":"playVideo","args":""}',
					'*'
				);
				setIsPlaying(true);
			}, 300);
		}
	};

	const togglePlay = () => {
		if (!playerRef.current) return;
		const action = isPlaying ? 'pauseVideo' : 'playVideo';
		playerRef.current.contentWindow.postMessage(
			JSON.stringify({ event: 'command', func: action, args: '' }),
			'*'
		);
		setIsPlaying(!isPlaying);
	};

	const restartMusic = () => {
		if (!playerRef.current) return;
		playerRef.current.contentWindow.postMessage(
			JSON.stringify({ event: 'command', func: 'seekTo', args: [0, true] }),
			'*'
		);
		playerRef.current.contentWindow.postMessage(
			JSON.stringify({ event: 'command', func: 'playVideo', args: '' }),
			'*'
		);
		setIsPlaying(true);
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
					hasMusic={!!musicUrl}
				/>
			)}

			{/* Contenido Principal - Se revela al abrir */}
			<div
				className={`transition-all duration-1000 ease-in-out ${isOpen
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
					<div className="max-w-5xl flex items-center justify-center">
						<h1
							className="text-4xl md:text-7xl lg:text-8xl mb-6 md:mb-10 leading-tight text-slate-900 drop-shadow-sm px-2"
							style={{ fontFamily: fontTitle }}
						>
							{mainTitle || 'Un detalle especial'}
						</h1>
					</div>

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
										className={`relative group overflow-hidden rounded-2xl shadow-lg md:shadow-xl transition-all hover:shadow-2xl ${idx % 3 === 0
												? 'md:col-span-2 aspect-video'
												: 'aspect-square'
											}`}
									>
										<img
											src={getOptimizedImageUrl(typeof img === 'string' ? img : img.url, 800)}
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
				{musicUrl && showVideo && (
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
							<div className="relative pt-[56.25%] rounded-lg overflow-hidden shadow-2xl bg-black ring-4 ring-white/50">
								<iframe
									ref={playerRef}
									src={getYouTubeEmbedUrl(musicUrl)}
									className="absolute top-0 left-0 w-full h-full"
									allow="autoplay; encrypted-media"
									title={videoCaption || 'Video musical'}
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
								Un Detallico Tarjetas
							</a>
						</p>
					</div>
				</section>
			</div>

			{/* Sistema de Audio YouTube */}
			{musicUrl && (
				<>
					{/* Iframe oculto SOLO si el video NO se muestra en el contenido */}
					{!showVideo && (
						<div className="opacity-0 pointer-events-none w-1 h-1 fixed bottom-0 right-0">
							<iframe
								ref={playerRef}
								src={getYouTubeEmbedUrl(musicUrl)}
								className="w-full h-full"
								allow="autoplay; encrypted-media"
								title="Background Music"
							/>
						</div>
					)}

					{/* Controles Flotantes */}
					{isOpen && (
						<div className="fixed bottom-4 right-4 z-50 flex items-center gap-2 animate-in slide-in-from-bottom-4 duration-700">
							<div className="bg-white/90 backdrop-blur-md p-1.5 rounded-full shadow-lg border border-pink-100 flex gap-1">
								<button
									onClick={togglePlay}
									className="w-10 h-10 flex items-center justify-center rounded-full bg-pink-50 text-pink-600 hover:bg-pink-100 transition-colors"
								>
									{isPlaying ? (
										<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
											<path fillRule="evenodd" d="M6.75 5.25a.75.75 0 01.75-.75H9a.75.75 0 01.75.75v13.5a.75.75 0 01-.75.75H7.5a.75.75 0 01-.75-.75V5.25zm7.5 0A.75.75 0 0115 4.5h1.5a.75.75 0 01.75.75v13.5a.75.75 0 01-.75.75H15a.75.75 0 01-.75-.75V5.25z" clipRule="evenodd" />
										</svg>
									) : (
										<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 ml-0.5">
											<path fillRule="evenodd" d="M4.5 5.653c0-1.426 1.529-2.33 2.779-1.643l11.54 6.348c1.295.712 1.295 2.573 0 3.285L7.28 19.991c-1.25.687-2.779-.217-2.779-1.643V5.653z" clipRule="evenodd" />
										</svg>
									)}
								</button>
								<button
									onClick={restartMusic}
									className="w-10 h-10 flex items-center justify-center rounded-full bg-slate-50 text-slate-500 hover:bg-slate-100 transition-colors"
									title="Reiniciar música"
								>
									<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
										<path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99" />
									</svg>
								</button>
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
