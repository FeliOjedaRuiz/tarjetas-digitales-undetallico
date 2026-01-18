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
        required: false
      },
      {
        key: 'mainTitle',
        label: 'Título Principal (Hero)',
        type: 'text',
        placeholder: 'Para ti, con todo mi amor',
        required: false
      },
      {
        key: 'message',
        label: 'Dedicatoria',
        type: 'textarea',
        placeholder: 'Escribe aquí tu mensaje bonito...',
        required: false
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
        type: 'video_caption',
        placeholder: 'Nuestra canción',
        required: false
      },
      {
        key: 'finalMessage',
        label: 'Mensaje Final',
        type: 'text',
        placeholder: 'Gracias por ser mi persona favorita',
        required: false
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
  },
  {
    name: 'Corazones Mágicos',
    slug: 'valentine-hearts',
    description: 'Diseño romántico con corazones flotantes y tonos rosa/rojo.',
    thumbnailUrl: 'https://images.unsplash.com/photo-1518199266791-5375a83190b7?auto=format&fit=crop&q=80&w=600&h=800',
    categories: ['San Valentín'],
    price: 0,
    isPremium: false,

    defaultStyles: {
      colors: {
        background: '#fff1f2',
        card: '#ffffff',
        primary: '#E11D48',
        text: '#4c0519'
      },
      fonts: {
        title: 'Dancing Script',
        body: 'Outfit',
        accent: 'Dancing Script'
      }
    },

    structure: [
      {
        key: 'coverImage',
        label: 'Foto de Portada',
        type: 'image',
        required: false
      },
      {
        key: 'mainTitle',
        label: 'Título Principal',
        type: 'text',
        placeholder: 'Porque eres mi persona favorita, quería decirte...',
        required: false
      },
      {
        key: 'message',
        label: 'Tu Mensaje',
        type: 'textarea',
        placeholder: 'Escribe aquí todo lo que sientes...',
        required: false
      },
      {
        key: 'gallery',
        label: 'Galería de Momentos',
        type: 'image_array',
        maxItems: 6,
        required: false
      },
      {
        key: 'video',
        label: 'Vídeo Especial (YouTube)',
        type: 'youtube_url',
        required: false
      },
      {
        key: 'videoCaption',
        label: 'Título del Vídeo',
        type: 'video_caption',
        placeholder: 'Nuestra canción favorita',
        required: false
      },
      {
        key: 'finalMessage',
        label: 'Mensaje Final',
        type: 'text',
        placeholder: 'Queria desearte: ¡Feliz San Valentín ❤️!',
        required: false
      },
      {
        key: 'song',
        label: 'Canción (Spotify o MP3)',
        type: 'spotify_url',
        required: false
      }
    ]
  }
];