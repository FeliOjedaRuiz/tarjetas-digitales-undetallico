module.exports = [
  {
    name: 'Master Template (Todo Incluido)',
    slug: 'master-template',
    description: 'Plantilla base con sistema de diseño avanzado y todos los campos.',
    thumbnailUrl: 'https://res.cloudinary.com/demo/image/upload/v1312461204/sample.jpg',
    categories: ['Master'],
    price: 0,
    isPremium: false,

    defaultStyles: {
      colors: {
        background: '#f3f4f6',  // Un gris muy suave para el fondo web
        card: '#ffffff',        // Blanco puro para la tarjeta
        primary: '#ec4899',     // Un rosa vibrante para botones
        text: '#1f2937'         // Gris oscuro casi negro para leer bien
      },
      fonts: {
        title: 'Playfair Display', // Una fuente con serifa elegante
        body: 'Lato',              // Una sans-serif limpia para leer
        accent: 'Dancing Script'   // Una cursiva manual para firmas
      }
    },

    structure: [
      {
        key: 'coverImage',
        label: 'Foto de Portada (Regalo)',
        type: 'image',
        required: true
      },
      {
        key: 'mainTitle',
        label: 'Título Principal (Hero)',
        type: 'text',
        placeholder: 'Para ti, con todo mi amor',
        required: true
      },
      {
        key: 'message',
        label: 'Dedicatoria',
        type: 'textarea',
        placeholder: 'Escribe aquí tu mensaje bonito...',
        required: true
      },
      {
        key: 'gallery',
        label: 'Galería de Fotos',
        type: 'image_array',
        maxItems: 8,
        required: false
      },
      {
        key: 'video',
        label: 'Enlace a video de YouTube',
        type: 'youtube_url',
        required: false
      },
      {
        key: 'videoCaption',
        label: 'Título del Video',
        type: 'text',
        placeholder: 'Nuestra canción',
        required: false
      },
      {
        key: 'finalMessage',
        label: 'Mensaje Final',
        type: 'text',
        placeholder: 'Gracias por ser mi persona favorita',
        required: true
      },
      {
        key: 'finalSubtitle',
        label: 'Subtítulo Final',
        type: 'text',
        placeholder: 'Feliz San Valentín 💕',
        required: false
      },
      {
        key: 'song',
        label: 'Música (Spotify o MP3)',
        type: 'spotify_url',
        required: false,
        helpText: 'Pega un enlace de Spotify para mostrar el reproductor, o un enlace directo .mp3 para reproducción automática al abrir.'
      }
    ]
  }
];