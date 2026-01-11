module.exports = [
  {
    name: 'Master Template (Todo Incluido)',
    slug: 'master-template',
    description: 'Plantilla base con sistema de diseño avanzado y todos los campos.',
    thumbnailUrl: 'https://res.cloudinary.com/demo/image/upload/v1312461204/sample.jpg',
    categories: ['Pruebas', 'Master'],
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
        key: 'mainTitle',
        label: 'Título Principal',
        type: 'text',
        placeholder: 'Feliz Día',
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
        key: 'finalMessage',
        label: 'Mensaje Final',
        type: 'text',
        placeholder: 'Te amo con todo mi corazón',
        required: true
      },
      {
        key: 'coverImage',
        label: 'Foto de Portada',
        type: 'image',
        required: true
      },
      {
        key: 'gallery',
        label: 'Galería',
        type: 'image_array',
        maxItems: 8,
        required: false
      },
      {
        key: 'song',
        label: 'Canción Spotify',
        type: 'spotify_url',
        required: false
      },
      {
        key: 'video',
        label: 'Enlace a video de youTube',
        type: 'youtube_url',
        required: false
      }
    ]
  }
];