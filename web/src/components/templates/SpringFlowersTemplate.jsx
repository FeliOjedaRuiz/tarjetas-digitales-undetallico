import React, { useState, useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import { getOptimizedImageUrl } from '../../utils/imageOptimizer';
import coverImg from '../../assets/Spring_pink_flower_background_with_watercolor.webp';

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

// --- Subcomponentes Internos ---

const GiftCover = ({ onClick, recipient, hasMusic }) => (
  <div
    onClick={onClick}
    className="absolute inset-0 z-50 flex flex-col items-center justify-center bg-pink-50 cursor-pointer transition-all duration-1000 ease-in-out"
  >
    {/* Imagen de fondo fija (Asset importado) */}
    <div className="absolute inset-0">
      <img
        src={coverImg}
        alt="Cover"
        className="w-full h-full object-cover opacity-90"
      />
      <div className="absolute inset-0 bg-white/40 backdrop-blur-[2px]" />
    </div>

    {/* Contenido del Cover */}
    <h1
      className="text-4xl text-center md:text-6xl font-serif text-slate-800 mb-14 tracking-wide drop-shadow-sm relative z-10"
      style={{ fontFamily: "'Playfair Display', serif", color: '#D4AF37' }}
    >
      {recipient ? `Para: ${recipient}` : 'Un Detalle Especial'}
    </h1>

    <div className="relative z-10 text-center p-6 flex flex-col items-center">
      {hasMusic && (
        <p className="text-slate-600 text-sm mb-10 font-light bg-white/60 px-4 py-1 rounded-full backdrop-blur-sm">
          Sube el volumen 🔊
        </p>
      )}
      <p className="text-slate-700 text-sm md:text-lg font-medium uppercase mb-12 tracking-[0.2em] animate-pulse">
        Toca para abrir
      </p>
      
      {/* Botón decorativo */}
      <div className="w-24 h-24 bg-white/40 backdrop-blur-md rounded-full flex items-center justify-center mx-auto mb-6 border-2 border-white/60 shadow-lg animate-bounce text-[#D4AF37]">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-10 h-10">
          <path strokeLinecap="round" strokeLinejoin="round" d="M21 11.25v8.25a1.5 1.5 0 0 1-1.5 1.5H4.5a1.5 1.5 0 0 1-1.5-1.5v-8.25M12 4.875A2.625 2.625 0 1 0 9.375 7.5H12m0-2.625V7.5m0-2.625A2.625 2.625 0 1 1 14.625 7.5H12m0 0V21m-8.625-9.75h18c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125h-18c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125Z" />
        </svg>
      </div>
    </div>
  </div>
);

GiftCover.propTypes = {
  onClick: PropTypes.func.isRequired,
  recipient: PropTypes.string,
  hasMusic: PropTypes.bool,
};

const SectionDivider = () => (
  <div className="flex justify-center py-12 opacity-60">
    <div className="w-16 h-1 bg-[#D4AF37] rounded-full opacity-50" />
  </div>
);

// --- Componente Principal ---

const SpringFlowersTemplate = ({ card }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const playerRef = useRef(null);

  const { content, recipient, sender, templateId } = card || {};
  const styles = templateId?.defaultStyles || {};

  const {
    mainTitle,
    message,
    finalMessage,
    finalSubtitle,
    gallery = [],
    musicUrl,
    showVideo,
    videoCaption,
  } = content || {};

  const handleOpen = () => {
    setIsOpen(true);
    if (musicUrl && playerRef.current) {
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
    playerRef.current.contentWindow.postMessage(JSON.stringify({ event: 'command', func: 'seekTo', args: [0, true] }), '*');
    playerRef.current.contentWindow.postMessage(JSON.stringify({ event: 'command', func: 'playVideo', args: '' }), '*');
    setIsPlaying(true);
  };
  
  // Estilos específicos para este template (Dorados y Rosas)
  const goldColor = '#D4AF37';
  const gradientBg = 'linear-gradient(180deg, #FFF0F5 0%, #FFF5EE 50%, #FFFFFF 100%)'; // LavenderBlush -> Seashell -> White
  
  const fontTitle = styles.fonts?.title || "'Playfair Display', serif";
  const fontBody = styles.fonts?.body || "'Lato', sans-serif";
  const fontAccent = styles.fonts?.accent || "'Dancing Script', cursive";

  return (
    <div 
      className="min-h-screen w-full overflow-x-hidden relative selection:bg-pink-200"
      style={{ background: gradientBg, fontFamily: fontBody }}
    >
      {/* --- PORTADA (GiftCover) --- */}
      {!isOpen && (
        <GiftCover
          onClick={handleOpen}
          recipient={recipient}
          hasMusic={!!musicUrl}
        />
      )}

      {/* --- CONTENIDO PRINCIPAL (Se revela al abrir) --- */}
      <div
        className={`transition-all duration-1000 ease-in-out ${
          isOpen
            ? 'opacity-100 translate-y-0'
            : 'opacity-0 translate-y-10 h-0 overflow-hidden'
        }`}
      >
        {/* 1. Hero Section */}
        <section className="min-h-[70vh] flex flex-col items-center justify-center text-center p-6 relative">
          <h2 className="text-sm font-bold tracking-[0.3em] uppercase mb-8 text-gray-400">
            {recipient ? `Para ${recipient}` : 'Para ti'}
          </h2>

          <div className="max-w-5xl flex items-center justify-center">
            <h1 
              className="text-5xl md:text-7xl mb-6 md:mb-10 drop-shadow-sm px-2 font-bold"
              style={{ fontFamily: fontTitle, color: goldColor }}
            >
              {mainTitle || 'Nuestro Amor Florece'}
            </h1>
          </div>

          <div className="animate-bounce mt-12 text-[#D4AF37]">
             <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8">
              <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
            </svg>
          </div>
        </section>

        {/* 2. Message Section */}
        <section className="px-8 mt-12 max-w-2xl text-center mx-auto">
          <p 
            className="text-xl md:text-2xl leading-relaxed text-gray-700 whitespace-pre-line font-light"
            style={{ fontFamily: fontBody }}
          >
            {message}
          </p>
        </section>

        {/* 3. Gallery Section */}
        {gallery && gallery.length > 0 && (
          <>
            <SectionDivider />
            <section className="w-full px-4 mt-8 max-w-5xl mx-auto">
              <h3
                className="text-center text-3xl mb-12 italic"
                style={{ fontFamily: fontTitle, color: goldColor }}
              >
                Nuestros Recuerdos
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8">
                {gallery.map((img, idx) => (
                  <div key={idx} className={`relative group overflow-hidden rounded-lg shadow-md bg-white p-2 transition-all hover:shadow-xl ${idx % 3 === 0 ? 'md:col-span-2 aspect-video' : 'aspect-square'}`}>
                    <img 
                      src={getOptimizedImageUrl(typeof img === 'string' ? img : img.url, 800)}
                      alt={`Momento ${idx}`} 
                      className="w-full h-full object-cover rounded-sm"
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
            <section className="w-full px-6 mt-8 max-w-4xl mx-auto">
              <div className="bg-white/80 backdrop-blur-sm p-6 rounded-2xl shadow-xl border border-pink-100">
                {videoCaption && (
                  <h3 
                    className="text-2xl text-center mb-6 font-semibold"
                    style={{ color: goldColor, fontFamily: fontTitle }}
                  >
                    {videoCaption}
                  </h3>
                )}
                <div className="aspect-video w-full rounded-lg overflow-hidden bg-black">
                  <iframe 
                    ref={playerRef}
                    src={getYouTubeEmbedUrl(musicUrl)}
                    className="w-full h-full"
                    allow="autoplay; encrypted-media"
                    title={videoCaption || 'Video musical'}
                  />
                </div>
              </div>
            </section>
          </>
        )}

        {/* 5. Final Section */}
        <section className="mt-20 px-6 text-center mb-10 min-h-[50vh] flex flex-col justify-center items-center">
          <h2 
            className="text-4xl md:text-6xl italic mb-6"
            style={{ fontFamily: fontAccent, color: goldColor }}
          >
            {finalMessage || 'Te amo hoy y siempre'}
          </h2>
          {finalSubtitle && (
            <p className="font-medium text-xl mb-12 text-gray-500">
              {finalSubtitle}
            </p>
          )}
          
          <div className="mt-12">
            <p className="text-xs text-gray-400 uppercase tracking-widest mb-4">
              Con amor
            </p>
            <p
              className="text-5xl text-gray-800"
              style={{ fontFamily: fontAccent }}
            >
              {sender}
            </p>
          </div>

          <div className="mt-24 mb-4 text-center opacity-60">
            <p className="text-[10px] uppercase tracking-widest text-gray-400 font-medium">
              Creado con{' '}
              <a href="/" className="hover:text-pink-400 transition-colors">
                Un Detallico Tarjetas
              </a>
            </p>
          </div>
        </section>
      </div>

      {/* --- SISTEMA DE AUDIO (Controles Flotantes) --- */}
      {musicUrl && (
        <>
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

          {isOpen && (
            <div className="fixed bottom-4 right-4 z-50 flex items-center gap-2 animate-in slide-in-from-bottom-4 duration-700">
              <div className="bg-white/90 backdrop-blur-md p-1.5 rounded-full shadow-lg border border-pink-100 flex gap-1">
                <button
                  onClick={togglePlay}
                  className="w-10 h-10 flex items-center justify-center rounded-full bg-pink-50 text-[#D4AF37] hover:bg-pink-100 transition-colors"
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

SpringFlowersTemplate.propTypes = {
  card: PropTypes.shape({
    content: PropTypes.object,
    recipient: PropTypes.string,
    sender: PropTypes.string,
    templateId: PropTypes.object,
  }),
};

export default SpringFlowersTemplate;
