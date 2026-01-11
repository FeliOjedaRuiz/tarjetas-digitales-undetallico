import React from 'react';

const MasterTemplate = ({ card }) => {
  if (!card) {
    return <div className="min-h-screen flex items-center justify-center">Tarjeta no encontrada</div>;
  }

  const content = card.content || {};
  const template = card.templateId || {};
  const defaultStyles = template.defaultStyles || {};
  const colors = defaultStyles.colors || {};
  
  const primaryColor = colors.primary || '#000000';
  const cardBgColor = colors.card || '#ffffff';
  
  // Helper para extraer URL de YouTube
  const getYouTubeEmbedUrl = (url) => {
    if (!url) return null;
    const youtubeRegex = /(?:youtube\.com\/watch\?v=|youtu\.be\/)([a-zA-Z0-9_-]+)/;
    const match = url.match(youtubeRegex);
    return match ? `https://www.youtube.com/embed/${match[1]}` : null;
  };

  // Helper para extraer URL de Spotify
  const getSpotifyEmbedUrl = (url) => {
    if (!url) return null;
    // Spotify URLs usualmente vienen como spotify:track:id o https://open.spotify.com/track/id
    const spotifyRegex = /spotify\.com\/(track|playlist|album)\/([a-zA-Z0-9]+)/;
    const match = url.match(spotifyRegex);
    return match ? `https://open.spotify.com/embed/${match[1]}/${match[2]}` : url;
  };

  const youtubeUrl = getYouTubeEmbedUrl(content.video);
  const spotifyUrl = content.spotifyUrl ? getSpotifyEmbedUrl(content.spotifyUrl) : null;
  
  const gallery = content.gallery && Array.isArray(content.gallery) ? content.gallery : [];
  const hasGallery = gallery.length > 0;
  const hasVideo = youtubeUrl || spotifyUrl;

  return (
    <div
      className="min-h-screen w-full flex items-center justify-center py-8 px-4"
      style={{ backgroundColor: primaryColor }}
    >
      <div className="w-full max-w-2xl">
        {/* PORTADA - Imagen de Inicio */}
        {content.coverImage && (
          <div className="mb-6 rounded-lg overflow-hidden shadow-lg">
            <img
              src={content.coverImage}
              alt="Portada de la tarjeta"
              className="w-full h-auto object-cover max-h-96"
            />
          </div>
        )}

        {/* CABECERA - Título Principal */}
        {content.mainTitle && (
          <div className="text-center mb-8">
            <h1
              className="font-brand text-4xl md:text-5xl font-bold text-white drop-shadow-lg"
              style={{ textShadow: '2px 2px 4px rgba(0,0,0,0.3)' }}
            >
              {content.mainTitle}
            </h1>
          </div>
        )}

        {/* CUERPO PRINCIPAL - Glassmorphism */}
        <div
          className="rounded-2xl backdrop-blur-md shadow-2xl p-8 md:p-12 mb-8 border border-white/20"
          style={{
            backgroundColor: cardBgColor + 'f0',
            boxShadow: '0 8px 32px rgba(31, 38, 135, 0.37)'
          }}
        >
          {/* Mensaje Principal */}
          {content.message && (
            <div className="mb-8">
              <p className="font-sans text-base md:text-lg leading-relaxed text-gray-800">
                {content.message}
              </p>
            </div>
          )}

          {/* Destinatario */}
          {card.recipient && (
            <div className="mb-6 text-center">
              <p className="text-sm md:text-base text-gray-600">
                <span className="font-semibold">Para: </span>
                {card.recipient}
              </p>
            </div>
          )}

          {/* VIDEO - YouTube */}
          {youtubeUrl && (
            <div className="mb-8">
              <h3 className="font-brand text-lg md:text-xl font-semibold mb-4 text-gray-800">
                Video
              </h3>
              <div className="relative w-full aspect-video rounded-lg overflow-hidden">
                <iframe
                  width="100%"
                  height="100%"
                  src={youtubeUrl}
                  title="YouTube video"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="absolute top-0 left-0 w-full h-full"
                />
              </div>
            </div>
          )}

          {/* VIDEO - Spotify */}
          {spotifyUrl && (
            <div className="mb-8">
              <h3 className="font-brand text-lg md:text-xl font-semibold mb-4 text-gray-800">
                Música
              </h3>
              <div className="flex justify-center">
                <iframe
                  src={spotifyUrl}
                  width="100%"
                  height="352"
                  frameBorder="0"
                  allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                  loading="lazy"
                />
              </div>
            </div>
          )}

          {/* GALERÍA - Grid de Fotos */}
          {hasGallery && (
            <div className="mb-8">
              <h3 className="font-brand text-lg md:text-xl font-semibold mb-4 text-gray-800">
                Galería
              </h3>
              <div className={`grid gap-4 ${gallery.length === 1 ? 'grid-cols-1' : gallery.length === 2 ? 'grid-cols-2' : 'grid-cols-2 md:grid-cols-3'}`}>
                {gallery.map((image, index) => (
                  <div
                    key={index}
                    className="rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow"
                  >
                    <img
                      src={image}
                      alt={`Galería ${index + 1}`}
                      className="w-full h-48 object-cover hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* PIE - Mensaje Final y Remitente */}
        <div className="text-center text-white">
          {content.finalMessage && (
            <p className="font-sans text-base md:text-lg mb-4 drop-shadow">
              {content.finalMessage}
            </p>
          )}
          
          {card.sender && (
            <p className="font-brand text-lg md:text-xl font-semibold drop-shadow">
              De: {card.sender}
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default MasterTemplate;
